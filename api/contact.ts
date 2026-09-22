/**
 * VERCEL SERVERLESS FUNCTION — POST /api/contact
 * -----------------------------------------------------------------------------
 * Ontvangt inzendingen van het contact-, offerte- en kennismakingsformulier,
 * valideert ze server-side (zod, dezelfde schema's als de frontend), en verstuurt:
 *   1. een interne melding naar CONTACT_TO (info@meritadministratie.nl) met Reply-To = bezoeker;
 *   2. een bevestigingsmail naar de bezoeker.
 *
 * Omgevingsvariabelen (Vercel → Settings → Environment Variables; NOOIT met VITE_-prefix):
 *   RESEND_API_KEY   verplicht — API-key van Resend (server-side)
 *   RESEND_FROM      optioneel — afzender, bijv. "MERIT Administratie & Advies <noreply@meritadministratie.nl>"
 *                    (vereist een geverifieerd domein in Resend; voor testen: "onboarding@resend.dev")
 *   CONTACT_TO       optioneel — ontvanger van de interne melding (standaard info@meritadministratie.nl)
 *
 * Beveiliging: server-side validatie, lengtelimieten, e-mailvalidatie, header-injection-sanitizing,
 * honeypot, minimale invultijd, eenvoudige rate-limiting per IP en dubbele-inzending-detectie
 * (beide per functie-instantie; voldoende als basisbescherming zonder externe opslag).
 */
// LET OP: relatieve imports MET expliciete .js-extensie (ESM-conventie van TypeScript; de
// bronbestanden zijn .ts). Vercel compileert en typecheckt api/ met moduleResolution nodenext:
// extensieloze paden geven TS2835 en Node ESM vindt ze niet (ERR_MODULE_NOT_FOUND).
// Geen '@/'-aliassen gebruiken in api/.
import type { IncomingMessage, ServerResponse } from 'node:http';
import { contactSchema, kennismakingSchema, offerteSchema } from '../src/lib/forms/schemas.js';
import {
  buildConfirmationEmail,
  buildInternalEmail,
  confirmationSubject,
  internalSubjects,
  sanitizeHeaderValue,
  sendViaResend,
  SITE_NAME,
  type FormKind,
} from './_lib/email.js';

const schemas = {
  contact: contactSchema,
  offerte: offerteSchema,
  kennismaking: kennismakingSchema,
} as const;

const DEFAULT_TO = 'info@meritadministratie.nl';
const DEFAULT_FROM = `${SITE_NAME} <noreply@meritadministratie.nl>`;
const MAX_BODY_BYTES = 32 * 1024;
const MIN_FILL_TIME_MS = 3000; // sneller dan dit is vrijwel zeker een bot
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };

/* --- Eenvoudige, in-memory bescherming (per instantie) ------------------------------ */
const hitsByIp = new Map<string, number[]>();
const recentSubmissionIds = new Map<string, number>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (hitsByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  hits.push(now);
  hitsByIp.set(ip, hits);
  if (hitsByIp.size > 5000) hitsByIp.clear(); // geheugen begrenzen
  return hits.length > RATE_LIMIT.max;
}

function isDuplicate(id: string | undefined): boolean {
  if (!id) return false;
  const now = Date.now();
  for (const [key, t] of recentSubmissionIds) if (now - t > RATE_LIMIT.windowMs) recentSubmissionIds.delete(key);
  if (recentSubmissionIds.has(id)) return true;
  recentSubmissionIds.set(id, now);
  return false;
}

/* --- Node.js request/response-helpers ---------------------------------------------- */
// Vercel roept deze functie aan als Node.js serverless function: (req: IncomingMessage, res: ServerResponse).
// req.headers is dus een gewoon object (string | string[] | undefined), géén Web Headers-object.

/** Vercel vult req.body al met de (JSON-)geparsede body; anders lezen we de stream zelf. */
type NodeRequest = IncomingMessage & { body?: unknown };

/** Leest één header, ongeacht of Node hem als string of string[] aanlevert. */
function header(req: IncomingMessage, name: string): string | undefined {
  const value = req.headers[name.toLowerCase()];
  if (Array.isArray(value)) return value[0];
  return value;
}

/** Leest de ruwe body als tekst (max. MAX_BODY_BYTES); null = te groot. */
async function readBody(req: NodeRequest): Promise<string | null> {
  if (req.body !== undefined && req.body !== null) {
    const text = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    return text.length > MAX_BODY_BYTES ? null : text;
  }
  let size = 0;
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    const buf = typeof chunk === 'string' ? Buffer.from(chunk) : (chunk as Buffer);
    size += buf.length;
    if (size > MAX_BODY_BYTES) return null;
    chunks.push(buf);
  }
  return Buffer.concat(chunks).toString('utf8');
}

function json(res: ServerResponse, body: unknown, status = 200): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

const USER_ERROR = 'Er is iets misgegaan. Probeer het opnieuw of neem rechtstreeks contact met ons op.';

interface Payload {
  kind?: unknown;
  data?: unknown;
  page?: unknown;
  submissionId?: unknown;
  startedAt?: unknown;
}

export default async function handler(req: NodeRequest, res: ServerResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, { ok: false, error: 'Method not allowed' }, 405);
  }

  // Zelfde-origin-controle (basisbescherming tegen misbruik vanaf andere sites)
  const origin = header(req, 'origin');
  const host = header(req, 'x-forwarded-host') ?? header(req, 'host');
  if (origin && host && !origin.endsWith(host)) {
    return json(res, { ok: false, error: 'Forbidden' }, 403);
  }

  // Resend-API-key: uitsluitend server-side. .trim() vangt een per ongeluk meegekopieerde
  // spatie of regeleinde af (veelvoorkomend bij plakken in het Vercel-dashboard).
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    // Alleen NAMEN loggen, nooit waarden: maakt een typefout of verkeerde omgeving direct zichtbaar.
    const related = Object.keys(process.env)
      .filter((key) => /RESEND|CONTACT/i.test(key))
      .sort();
    console.error(
      '[contact] RESEND_API_KEY ontbreekt in deze omgeving ' +
        `(VERCEL_ENV=${process.env.VERCEL_ENV ?? 'onbekend'}). ` +
        `Gerelateerde variabelen in deze omgeving: ${related.length > 0 ? related.join(', ') : 'geen'}. ` +
        'Zet RESEND_API_KEY in Vercel → Settings → Environment Variables voor zowel Preview als ' +
        'Production (zonder VITE_-prefix) en start daarna een nieuwe deployment: omgevingsvariabelen ' +
        'worden bij de deployment aan de functie gekoppeld, bestaande deployments pikken ze niet op.',
    );
    return json(res, { ok: false, error: USER_ERROR }, 500);
  }

  // Body lezen met groottelimiet
  const raw = await readBody(req);
  if (raw === null) return json(res, { ok: false, error: 'Payload too large' }, 413);
  let payload: Payload;
  try {
    payload = JSON.parse(raw) as Payload;
  } catch {
    return json(res, { ok: false, error: 'Ongeldige aanvraag.' }, 400);
  }

  const kind = payload.kind as FormKind;
  const schema = schemas[kind];
  if (!schema || typeof payload.data !== 'object' || payload.data === null) {
    return json(res, { ok: false, error: 'Ongeldige aanvraag.' }, 400);
  }

  // Rate-limiting per IP (x-forwarded-for: eerste adres is de client)
  const ip =
    header(req, 'x-forwarded-for')?.split(',')[0]?.trim() ||
    header(req, 'x-real-ip') ||
    req.socket?.remoteAddress ||
    'unknown';
  if (rateLimited(ip)) {
    return json(res, { ok: false, error: 'Te veel aanvragen. Probeer het over enkele minuten opnieuw.' }, 429);
  }

  // Dubbele inzending (zelfde submissionId) → als succes behandelen, niet nogmaals mailen
  const submissionId = typeof payload.submissionId === 'string' ? payload.submissionId.slice(0, 64) : undefined;
  if (isDuplicate(submissionId)) return json(res, { ok: true, duplicate: true });

  // Bot-signalen: honeypot gevuld of te snel ingevuld → stil "ok" (bot krijgt geen feedback)
  const data = payload.data as Record<string, unknown>;
  if (typeof data.website === 'string' && data.website.length > 0) return json(res, { ok: true });
  const startedAt = typeof payload.startedAt === 'number' ? payload.startedAt : 0;
  if (startedAt && Date.now() - startedAt < MIN_FILL_TIME_MS) return json(res, { ok: true });

  // Server-side validatie met exact dezelfde regels als de frontend
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return json(
      res,
      { ok: false, error: 'Controleer de ingevulde gegevens.', issues: parsed.error.issues.map((i) => String(i.path[0] ?? '')) },
      422,
    );
  }
  const { website: _honeypot, ...fields } = parsed.data as Record<string, string | string[] | boolean | undefined>;
  void _honeypot;

  const name = sanitizeHeaderValue(String(fields.naam ?? '')).slice(0, 100);
  const visitorEmail = sanitizeHeaderValue(String(fields.email ?? ''));
  // Weergavenaam in Reply-To altijd tussen aanhalingstekens, zonder tekens met adres-betekenis
  const replyToName = name.replace(/["<>]/g, '').trim() || 'Bezoeker';
  const page = typeof payload.page === 'string' ? sanitizeHeaderValue(payload.page).slice(0, 200) : '/';

  const from = process.env.RESEND_FROM?.trim() || DEFAULT_FROM;
  const to = process.env.CONTACT_TO?.trim() || DEFAULT_TO;

  // 1. Interne melding
  const internal = buildInternalEmail(kind, fields, page);
  const sentInternal = await sendViaResend(apiKey, {
    from,
    to: [to],
    subject: internalSubjects[kind],
    text: internal.text,
    html: internal.html,
    replyTo: `"${replyToName}" <${visitorEmail}>`,
  });
  if (!sentInternal.ok) {
    console.error('[contact] interne mail mislukt:', sentInternal.error);
    return json(res, { ok: false, error: USER_ERROR }, 502);
  }

  // 2. Bevestiging aan de bezoeker (fout hier is niet fataal: de aanvraag is binnen)
  const confirmation = buildConfirmationEmail(name);
  const sentConfirmation = await sendViaResend(apiKey, {
    from,
    to: [visitorEmail],
    subject: confirmationSubject,
    text: confirmation.text,
    html: confirmation.html,
    replyTo: to,
  });
  if (!sentConfirmation.ok) console.error('[contact] bevestigingsmail mislukt:', sentConfirmation.error);

  return json(res, { ok: true });
}
