/**
 * Node.js request/response-helpers voor de admin-endpoints.
 * -----------------------------------------------------------------------------
 * Vercel roept serverless functies aan als Node-functie: (req: IncomingMessage,
 * res: ServerResponse). `req.headers` is dus een gewoon object en NIET het Web
 * Headers-object — gebruik daarom altijd `header()`. Zie ook api/contact.ts.
 *
 * Bestanden in een map die met _ begint worden door Vercel niet als losse
 * functie gedeployed.
 */
import type { IncomingMessage, ServerResponse } from 'node:http';

/** Vercel vult req.body al met de geparsede body; anders lezen we de stream zelf. */
export type NodeRequest = IncomingMessage & { body?: unknown };

export const MAX_BODY_BYTES = 256 * 1024; // contentteksten kunnen lang zijn

/** Leest één header, ongeacht of Node hem als string of string[] aanlevert. */
export function header(req: IncomingMessage, name: string): string | undefined {
  const value = req.headers[name.toLowerCase()];
  if (Array.isArray(value)) return value[0];
  return value;
}

/** Leest de ruwe body als tekst (max. MAX_BODY_BYTES); null = te groot. */
export async function readBody(req: NodeRequest): Promise<string | null> {
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

/** JSON-antwoord; admin-antwoorden worden nooit gecachet. */
export function json(res: ServerResponse, body: unknown, status = 200): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.end(JSON.stringify(body));
}

export function methodNotAllowed(res: ServerResponse, allowed: string[]): void {
  res.setHeader('Allow', allowed.join(', '));
  json(res, { ok: false, error: 'Methode niet toegestaan.' }, 405);
}

/** Leest en parseert de JSON-body; geeft null terug bij een ongeldige of te grote body. */
export async function readJson<T = unknown>(
  req: NodeRequest,
  res: ServerResponse,
): Promise<T | null> {
  const raw = await readBody(req);
  if (raw === null) {
    json(res, { ok: false, error: 'Verzoek te groot.' }, 413);
    return null;
  }
  try {
    return JSON.parse(raw || '{}') as T;
  } catch {
    json(res, { ok: false, error: 'Ongeldige aanvraag.' }, 400);
    return null;
  }
}

/** Client-IP achter de Vercel-proxy. */
export function clientIp(req: NodeRequest): string {
  return (
    header(req, 'x-forwarded-for')?.split(',')[0]?.trim() ||
    header(req, 'x-real-ip') ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

/**
 * Zelfde-origin-controle: weert verzoeken van andere sites (basisbescherming
 * tegen CSRF, naast de SameSite-cookie). Geeft false terug als het verzoek
 * geweigerd is; het antwoord is dan al verstuurd.
 */
export function sameOrigin(req: NodeRequest, res: ServerResponse): boolean {
  const origin = header(req, 'origin');
  const host = header(req, 'x-forwarded-host') ?? header(req, 'host');
  if (origin && host && !origin.endsWith(host)) {
    json(res, { ok: false, error: 'Niet toegestaan.' }, 403);
    return false;
  }
  return true;
}

/** Eenvoudige rate-limiting per IP, per functie-instantie (zoals in api/contact.ts). */
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return function limited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 5000) hits.clear(); // geheugen begrenzen
    return recent.length > max;
  };
}
