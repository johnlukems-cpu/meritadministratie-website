/**
 * VERCEL SERVERLESS FUNCTION — /api/admin/session
 * -----------------------------------------------------------------------------
 * Inloggen op de MERIT Content Studio.
 *
 *   GET     → { ok, authenticated, configured }   sessiestatus opvragen
 *   POST    → { password }                        inloggen, zet een HttpOnly-cookie
 *   DELETE  →                                     uitloggen
 *
 * Het wachtwoord staat uitsluitend server-side (ADMIN_PASSWORD). De frontend
 * bevat geen enkel geheim en kan de sessiecookie niet lezen.
 */
import type { ServerResponse } from 'node:http';
import { loginSchema } from '../../src/lib/content/schemas.js';
import {
  clearSessionCookie,
  hasSession,
  logMissingConfig,
  readConfig,
  setSessionCookie,
  verifyPassword,
} from './_lib/auth.js';
import { json, methodNotAllowed, readJson, sameOrigin, type NodeRequest } from './_lib/http.js';
import { logAdmin } from './_lib/log.js';

export default async function handler(req: NodeRequest, res: ServerResponse): Promise<void> {
  if (!sameOrigin(req, res)) return;

  const config = readConfig();

  if (req.method === 'GET') {
    if (!config) {
      logMissingConfig();
      return json(res, { ok: true, authenticated: false, configured: false });
    }
    return json(res, { ok: true, authenticated: hasSession(req, config), configured: true });
  }

  if (req.method === 'DELETE') {
    clearSessionCookie(req, res);
    logAdmin('logout');
    return json(res, { ok: true, authenticated: false });
  }

  if (req.method !== 'POST') return methodNotAllowed(res, ['GET', 'POST', 'DELETE']);

  if (!config) {
    logMissingConfig();
    return json(
      res,
      {
        ok: false,
        code: 'not_configured',
        error:
          'Het admin-gedeelte is nog niet geconfigureerd. Zet ADMIN_PASSWORD en ADMIN_SESSION_SECRET ' +
          'in de Vercel-omgevingsvariabelen en deploy opnieuw.',
      },
      503,
    );
  }

  const body = await readJson<{ password?: unknown }>(req, res);
  if (body === null) return;

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return json(res, { ok: false, error: 'Vul het wachtwoord in.' }, 422);
  }

  const check = verifyPassword(req, parsed.data.password, config);
  if (!check.ok) {
    logAdmin('login_failed', check.status === 429 ? 'rate limit' : 'onjuist wachtwoord');
    return json(res, { ok: false, error: check.error }, check.status);
  }

  setSessionCookie(req, res, config);
  logAdmin('login');
  return json(res, { ok: true, authenticated: true, configured: true });
}
