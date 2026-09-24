/**
 * VERCEL SERVERLESS FUNCTION — /api/admin/content/[id]
 * -----------------------------------------------------------------------------
 *   GET     → één item ophalen
 *   PATCH   → item bijwerken (velden, teksten per kanaal, status)
 *   DELETE  → item verwijderen
 *
 * PATCH met { "status": "PUBLISHED" } start de publicatieroute: zolang de
 * social-media-API's niet gekoppeld zijn geeft die een gecontroleerde melding
 * terug en blijft de status ongewijzigd (zie _lib/content-service.ts).
 */
import type { ServerResponse } from 'node:http';
import { contentUpdateSchema } from '../../../src/lib/content/schemas.js';
import { requireAdmin } from '../_lib/auth.js';
import { applyUpdate, publishItem } from '../_lib/content-service.js';
import { header, json, methodNotAllowed, readJson, sameOrigin, type NodeRequest } from '../_lib/http.js';
import { getItem, removeItem, saveItem, withStore } from '../_lib/store.js';
import { logContentEvent } from '../_lib/log.js';

/** Haalt de id uit het pad; Vercel levert hem ook als req.query, maar het pad is altijd aanwezig. */
function readId(req: NodeRequest): string | null {
  const host = header(req, 'x-forwarded-host') ?? header(req, 'host') ?? 'localhost';
  const url = new URL(req.url ?? '', `https://${host}`);
  const queryId = url.searchParams.get('id');
  if (queryId) return queryId.slice(0, 64);
  const segments = url.pathname.split('/').filter(Boolean);
  const last = segments[segments.length - 1];
  return last && last !== 'content' ? decodeURIComponent(last).slice(0, 64) : null;
}

export default async function handler(req: NodeRequest, res: ServerResponse): Promise<void> {
  if (!sameOrigin(req, res)) return;
  if (!requireAdmin(req, res)) return;

  const id = readId(req);
  if (!id) return json(res, { ok: false, error: 'Ongeldige aanvraag.' }, 400);

  const found = await withStore('content:get', () => getItem(id));
  if (!found.ok) return json(res, { ok: false, error: found.error }, 502);
  if (!found.value) return json(res, { ok: false, error: 'Content niet gevonden.' }, 404);
  const item = found.value;

  if (req.method === 'GET') {
    return json(res, { ok: true, item });
  }

  if (req.method === 'DELETE') {
    const removed = await withStore('content:delete', () => removeItem(id));
    if (!removed.ok) return json(res, { ok: false, error: removed.error }, 502);
    logContentEvent('updated', { id, title: item.title, detail: 'verwijderd' });
    return json(res, { ok: true, deleted: true });
  }

  if (req.method !== 'PATCH') return methodNotAllowed(res, ['GET', 'PATCH', 'DELETE']);

  const body = await readJson(req, res);
  if (body === null) return;

  const parsed = contentUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      res,
      {
        ok: false,
        error: 'Controleer de ingevulde gegevens.',
        issues: Object.fromEntries(
          parsed.error.issues.map((issue) => [String(issue.path[0] ?? 'form'), issue.message]),
        ),
      },
      422,
    );
  }

  // Publiceren loopt via de publicatieroute, zodat de social-services worden geraadpleegd.
  if (parsed.data.status === 'PUBLISHED' && item.status !== 'PUBLISHED') {
    const { status: _status, ...rest } = parsed.data;
    void _status;
    const updated = applyUpdate(item, rest);
    const outcome = await publishItem(updated);
    const saved = await withStore('content:publish', () => saveItem(outcome.item));
    if (!saved.ok) return json(res, { ok: false, error: saved.error }, 502);
    return json(res, {
      ok: true,
      item: saved.value,
      published: outcome.published,
      message: outcome.message,
      results: outcome.results,
    });
  }

  const updated = applyUpdate(item, parsed.data);
  const saved = await withStore('content:update', () => saveItem(updated));
  if (!saved.ok) return json(res, { ok: false, error: saved.error }, 502);

  return json(res, { ok: true, item: saved.value });
}
