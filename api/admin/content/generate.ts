/**
 * VERCEL SERVERLESS FUNCTION — POST /api/admin/content/generate
 * -----------------------------------------------------------------------------
 * Bereidt AI-generatie voor. Er is BEWUST nog geen AI-provider gekoppeld:
 * zolang dat zo is geeft dit endpoint de volledig opgebouwde briefing terug met
 * code `not_configured`, zodat u de teksten zelf kunt (laten) schrijven.
 *
 * Zodra een provider is aangesloten (zie _lib/ai.ts) vult ditzelfde endpoint de
 * kanalen automatisch — de frontend hoeft niet te wijzigen.
 *
 * Er wordt nooit een sleutel naar de browser gestuurd; de briefing bevat
 * uitsluitend publieke bedrijfsinformatie uit de MERIT-kennisbank.
 */
import type { ServerResponse } from 'node:http';
import { generateRequestSchema } from '../../../src/lib/content/schemas.js';
import type { Channel, ContentItem, SocialPost } from '../../../src/lib/content/types.js';
import { requireAdmin } from '../_lib/auth.js';
import {
  briefFromItem,
  buildBrief,
  getAIContentService,
  type GeneratedContent,
  type GenerationInput,
} from '../_lib/ai.js';
import { json, methodNotAllowed, readJson, sameOrigin, type NodeRequest } from '../_lib/http.js';
import { logContentEvent } from '../_lib/log.js';
import { getItem, saveItem, withStore } from '../_lib/store.js';

function toSocialPost(
  channel: 'linkedin' | 'facebook' | 'instagram',
  generated: { body: string; cta: string; hashtags: string[] } | undefined,
  previous: SocialPost | null,
): SocialPost | null {
  if (!generated) return previous;
  return {
    channel,
    body: generated.body,
    cta: generated.cta,
    hashtags: generated.hashtags.map((tag) => tag.replace(/^#/, '').trim()).filter(Boolean),
    publishState: previous?.publishState,
  };
}

/** Schrijft gegenereerde teksten in het item (alleen de gevraagde kanalen). */
function applyGenerated(item: ContentItem, content: GeneratedContent, channels: Channel[]): ContentItem {
  const next: ContentItem = { ...item };
  if (channels.includes('website') && content.website) next.websiteContent = content.website;
  if (channels.includes('linkedin')) {
    next.linkedinContent = toSocialPost('linkedin', content.linkedin, item.linkedinContent);
  }
  if (channels.includes('facebook')) {
    next.facebookContent = toSocialPost('facebook', content.facebook, item.facebookContent);
  }
  if (channels.includes('instagram')) {
    next.instagramContent = toSocialPost('instagram', content.instagram, item.instagramContent);
  }
  next.updatedAt = new Date().toISOString();
  return next;
}

export default async function handler(req: NodeRequest, res: ServerResponse): Promise<void> {
  if (!sameOrigin(req, res)) return;
  if (!requireAdmin(req, res)) return;
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  const body = await readJson(req, res);
  if (body === null) return;

  const parsed = generateRequestSchema.safeParse(body);
  if (!parsed.success) {
    return json(res, { ok: false, error: 'Ongeldige aanvraag.' }, 422);
  }
  if (!parsed.data.id) {
    return json(res, { ok: false, error: 'Geen content opgegeven.' }, 400);
  }

  const found = await withStore('generate:get', () => getItem(parsed.data.id as string));
  if (!found.ok) return json(res, { ok: false, error: found.error }, 502);
  if (!found.value) return json(res, { ok: false, error: 'Content niet gevonden.' }, 404);

  const item = found.value;
  const channels = parsed.data.channels ?? item.schedule.channels;
  const input: GenerationInput = briefFromItem(item, channels);

  const service = getAIContentService();
  const result = await service.generate(input);

  if (!result.ok) {
    // Geen provider (of een fout): briefing teruggeven zodat het werk door kan.
    const generation = {
      provider: service.name,
      model: service.model,
      status: result.code === 'not_configured' ? ('not_configured' as const) : ('failed' as const),
      message: result.message,
      generatedAt: new Date().toISOString(),
      channels,
    };
    const saved = await withStore('generate:save-state', () =>
      saveItem({ ...item, generation, updatedAt: new Date().toISOString() }),
    );
    logContentEvent('generated', {
      id: item.id,
      title: item.title,
      detail: `${service.name}: ${result.code}`,
    });
    return json(
      res,
      {
        ok: false,
        code: result.code,
        error: result.message,
        brief: result.brief ?? buildBrief(input),
        item: saved.ok ? saved.value : item,
      },
      result.code === 'not_configured' ? 501 : 502,
    );
  }

  const withContent = applyGenerated(item, result.content, channels);
  withContent.generation = {
    provider: result.provider,
    model: result.model,
    status: 'success',
    message: 'Content gegenereerd.',
    generatedAt: new Date().toISOString(),
    channels,
  };

  const saved = await withStore('generate:save', () => saveItem(withContent));
  if (!saved.ok) return json(res, { ok: false, error: saved.error }, 502);

  logContentEvent('generated', {
    id: item.id,
    title: item.title,
    detail: `${result.provider} → ${channels.join(', ')}`,
  });
  return json(res, { ok: true, item: saved.value });
}
