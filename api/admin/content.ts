/**
 * VERCEL SERVERLESS FUNCTION — /api/admin/content
 * -----------------------------------------------------------------------------
 *   GET   → alle content + statistieken + opslag- en koppelingsstatus
 *   POST  → nieuwe content aanmaken (status DRAFT)
 *
 * Beveiligd met de sessiecookie uit /api/admin/session (zie _lib/auth.ts).
 */
import type { ServerResponse } from 'node:http';
import { contentCreateSchema } from '../../src/lib/content/schemas.js';
import { toStats } from '../../src/lib/content/types.js';
import { requireAdmin } from './_lib/auth.js';
import { createItem } from './_lib/content-service.js';
import { json, methodNotAllowed, readJson, sameOrigin, type NodeRequest } from './_lib/http.js';
import { socialStatus } from './_lib/social.js';
import { getAIContentService } from './_lib/ai.js';
import { listItems, saveItem, storeInfo, withStore } from './_lib/store.js';

export default async function handler(req: NodeRequest, res: ServerResponse): Promise<void> {
  if (!sameOrigin(req, res)) return;
  if (!requireAdmin(req, res)) return;

  if (req.method === 'GET') {
    const result = await withStore('content:list', listItems);
    if (!result.ok) return json(res, { ok: false, error: result.error }, 502);
    return json(res, {
      ok: true,
      items: result.value,
      stats: toStats(result.value),
      storage: storeInfo(),
      integrations: {
        ai: getAIContentService().isConfigured(),
        social: socialStatus(),
      },
    });
  }

  if (req.method !== 'POST') return methodNotAllowed(res, ['GET', 'POST']);

  const body = await readJson(req, res);
  if (body === null) return;

  const parsed = contentCreateSchema.safeParse(body);
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

  const item = createItem(parsed.data);
  const saved = await withStore('content:create', () => saveItem(item));
  if (!saved.ok) return json(res, { ok: false, error: saved.error }, 502);

  return json(res, { ok: true, item: saved.value }, 201);
}
