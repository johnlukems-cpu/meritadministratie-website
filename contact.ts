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
// LET OP: relatieve imports MET .ts-extensie. Vercel draait deze functie met Node's native
// TypeScript-ondersteuning (package.json heeft "type": "module"); Node ESM lost géén
// extensieloze paden op (→ ERR_MODULE_NOT_FOUND). Geen '@/'-aliassen gebruiken in api/.
import { contactSchema, kennismakingSchema, offerteSchema } from '../src/lib/forms/schemas.ts';
import {
  buildConfirmationEmail,
  buildInternalEmail,
  confirmationSubject,
  internalSubjects,
  sanitizeHeaderValue,
  sendViaResend,
  SITE_NAME,
  type FormKind,
} from './_lib/email.ts';

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

/* --- Response-helpers -------------------------------------------------------------- */
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

const USER_ERROR = 'Er is iets misgegaan. Probeer het opnieuw of neem rechtstreeks contact met ons op.';

interface Payload {
  kind?: unknown;
  data?: unknown;
  page?: unknown;
  submissionId?: unknown;
  startedAt?: unknown;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed' }, 405);
  }

  // Zelfde-origin-controle (basisbescherming tegen misbruik vanaf andere sites)
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (origin && host && !origin.endsWith(host)) {
    return json({ ok: false, error: 'Forbidden' }, 403);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY ontbreekt');
    return json({ ok: false, error: USER_ERROR }, 500);
  }

  // Body lezen met groottelimiet
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: 'Payload too large' }, 413);
  let payload: Payload;
  try {
    payload = JSON.parse(raw) as Payload;
  } catch {
    return json({ ok: false, error: 'Ongeldige aanvraag.' }, 400);
  }

  const kind = payload.kind as FormKind;
  const schema = schemas[kind];
  if (!schema || typeof payload.data !== 'object' || payload.data === null) {
    return json({ ok: false, error: 'Ongeldige aanvraag.' }, 400);
  }

  // Rate-limiting per IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
  if (rateLimited(ip)) {
    return json({ ok: false, error: 'Te veel aanvragen. Probeer het over enkele minuten opnieuw.' }, 429);
  }

  // Dubbele inzending (zelfde submissionId) → als succes behandelen, niet nogmaals mailen
  const submissionId = typeof payload.submissionId === 'string' ? payload.submissionId.slice(0, 64) : undefined;
  if (isDuplicate(submissionId)) return json({ ok: true, duplicate: true });

  // Bot-signalen: honeypot gevuld of te snel ingevuld → stil "ok" (bot krijgt geen feedback)
  const data = payload.data as Record<string, unknown>;
  if (typeof data.website === 'string' && data.website.length > 0) return json({ ok: true });
  const startedAt = typeof payload.startedAt === 'number' ? payload.startedAt : 0;
  if (startedAt && Date.now() - startedAt < MIN_FILL_TIME_MS) return json({ ok: true });

  // Server-side validatie met exact dezelfde regels als de frontend
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return json(
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

  const from = process.env.RESEND_FROM || DEFAULT_FROM;
  const to = process.env.CONTACT_TO || DEFAULT_TO;

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
    return json({ ok: false, error: USER_ERROR }, 502);
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

  return json({ ok: true });
}
