/**
 * AUTHENTICATIE VOOR HET ADMIN-GEDEELTE (MERIT Content Studio)
 * -----------------------------------------------------------------------------
 * Het project had nog geen authenticatie. Dit is een bewust kleine, zelfstandige
 * abstractie die past bij de bestaande architectuur (statische site + serverless
 * functies) en geen database of externe dienst nodig heeft:
 *
 *   wachtwoord  →  POST /api/admin/session  →  HttpOnly-sessiecookie (HMAC-ondertekend)
 *
 * Eigenschappen:
 *   • Het wachtwoord staat UITSLUITEND server-side in een Vercel-omgevingsvariabele.
 *   • De cookie bevat geen gegevens buiten een vervaltijd en een handtekening.
 *   • De frontend kan de sessie niet lezen (HttpOnly) en bevat geen enkel geheim.
 *   • Ontbreekt de configuratie, dan is het admin-gedeelte volledig dicht (fail closed).
 *
 * Benodigde omgevingsvariabelen (Vercel → Settings → Environment Variables,
 * nooit met VITE_-prefix, nooit in Git):
 *   ADMIN_PASSWORD         verplicht — wachtwoord voor de Content Studio
 *   ADMIN_SESSION_SECRET   verplicht — willekeurige string (≥ 32 tekens) om de cookie te ondertekenen
 *   ADMIN_SESSION_HOURS    optioneel — geldigheid van een sessie in uren (standaard 8)
 *
 * LATERE PROVIDER (TODO): wilt u meerdere gebruikers, 2FA of SSO, vervang dan
 * `verifyPassword` en `readSession` door een provider (Auth0, Clerk, Microsoft
 * Entra ID, Supabase Auth). Houd de functies `requireAdmin` en `sessionCookie`
 * als contract, dan hoeven de endpoints niet te wijzigen.
 */
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import type { ServerResponse } from 'node:http';
import { clientIp, createRateLimiter, header, json, type NodeRequest } from './http.js';

const COOKIE_NAME = 'merit_admin_session';
const DEFAULT_HOURS = 8;

/** Maximaal 10 inlogpogingen per IP per 10 minuten. */
const loginLimiter = createRateLimiter(10, 10 * 60 * 1000);

export interface AdminConfig {
  password: string;
  secret: string;
  hours: number;
}

/** Leest de configuratie; null betekent: admin-gedeelte is niet geconfigureerd. */
export function readConfig(): AdminConfig | null {
  const password = process.env.ADMIN_PASSWORD?.trim();
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!password || !secret) return null;
  const hours = Number(process.env.ADMIN_SESSION_HOURS ?? DEFAULT_HOURS);
  return {
    password,
    secret,
    hours: Number.isFinite(hours) && hours > 0 && hours <= 720 ? hours : DEFAULT_HOURS,
  };
}

/** Logt (zonder waarden) welke variabelen ontbreken, zodat configuratiefouten zichtbaar zijn. */
export function logMissingConfig(): void {
  const missing = ['ADMIN_PASSWORD', 'ADMIN_SESSION_SECRET'].filter(
    (name) => !process.env[name]?.trim(),
  );
  console.error(
    `[content-studio] admin niet geconfigureerd (VERCEL_ENV=${process.env.VERCEL_ENV ?? 'onbekend'}). ` +
      `Ontbrekende variabelen: ${missing.join(', ')}. ` +
      'Zet deze in Vercel → Settings → Environment Variables (Preview én Production) en deploy opnieuw.',
  );
}

/* --- Token --------------------------------------------------------------------- */

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function safeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Maakt een ondertekend sessietoken: <payload>.<handtekening>. */
function createToken(config: AdminConfig): { token: string; maxAgeSeconds: number } {
  const maxAgeSeconds = config.hours * 3600;
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + maxAgeSeconds * 1000, jti: randomBytes(8).toString('hex') }),
  ).toString('base64url');
  return { token: `${payload}.${sign(payload, config.secret)}`, maxAgeSeconds };
}

/** Controleert handtekening en vervaltijd van een token. */
function verifyToken(token: string, secret: string): boolean {
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  if (!safeEquals(signature, sign(payload, secret))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: number };
    return typeof data.exp === 'number' && data.exp > Date.now();
  } catch {
    return false;
  }
}

/* --- Wachtwoord ---------------------------------------------------------------- */

/** Vergelijkt het wachtwoord in constante tijd en houdt pogingen per IP bij. */
export function verifyPassword(
  req: NodeRequest,
  password: unknown,
  config: AdminConfig,
): { ok: true } | { ok: false; status: number; error: string } {
  if (loginLimiter(clientIp(req))) {
    return { ok: false, status: 429, error: 'Te veel pogingen. Probeer het over enkele minuten opnieuw.' };
  }
  if (typeof password !== 'string' || !safeEquals(password, config.password)) {
    return { ok: false, status: 401, error: 'Onjuist wachtwoord.' };
  }
  return { ok: true };
}

/* --- Cookie -------------------------------------------------------------------- */

function isSecure(req: NodeRequest): boolean {
  const proto = header(req, 'x-forwarded-proto');
  if (proto) return proto.split(',')[0]?.trim() === 'https';
  // Zonder proxy-header (lokaal met `vercel dev`) geen Secure-vlag, anders bewaart
  // de browser de cookie niet op http://localhost.
  return false;
}

/** Zet de sessiecookie na een geslaagde login. */
export function setSessionCookie(req: NodeRequest, res: ServerResponse, config: AdminConfig): void {
  const { token, maxAgeSeconds } = createToken(config);
  const parts = [
    `${COOKIE_NAME}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${maxAgeSeconds}`,
  ];
  if (isSecure(req)) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}

/** Verwijdert de sessiecookie (uitloggen). */
export function clearSessionCookie(req: NodeRequest, res: ServerResponse): void {
  const parts = [`${COOKIE_NAME}=`, 'Path=/', 'HttpOnly', 'SameSite=Strict', 'Max-Age=0'];
  if (isSecure(req)) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}

function readCookie(req: NodeRequest, name: string): string | undefined {
  const raw = header(req, 'cookie');
  if (!raw) return undefined;
  for (const part of raw.split(';')) {
    const index = part.indexOf('=');
    if (index === -1) continue;
    if (part.slice(0, index).trim() === name) return part.slice(index + 1).trim();
  }
  return undefined;
}

/** True wanneer het verzoek een geldige sessie heeft. */
export function hasSession(req: NodeRequest, config: AdminConfig): boolean {
  const token = readCookie(req, COOKIE_NAME);
  return token ? verifyToken(token, config.secret) : false;
}

/* --- Poortwachter voor endpoints ------------------------------------------------ */

/**
 * Gebruik bovenaan elk admin-endpoint:
 *   const config = requireAdmin(req, res);
 *   if (!config) return;            // antwoord is al verstuurd
 *
 * Geeft 503 wanneer het admin-gedeelte niet is geconfigureerd en 401 zonder geldige sessie.
 */
export function requireAdmin(req: NodeRequest, res: ServerResponse): AdminConfig | null {
  const config = readConfig();
  if (!config) {
    logMissingConfig();
    json(
      res,
      { ok: false, error: 'Het admin-gedeelte is nog niet geconfigureerd.', code: 'not_configured' },
      503,
    );
    return null;
  }
  if (!hasSession(req, config)) {
    json(res, { ok: false, error: 'Niet ingelogd.', code: 'unauthorized' }, 401);
    return null;
  }
  return config;
}
