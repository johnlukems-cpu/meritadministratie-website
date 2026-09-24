/**
 * Contentlogica die door meerdere endpoints wordt gebruikt:
 * aanmaken, bijwerken, statuswissels en (voorbereide) publicatie.
 * Bevat geen HTTP-afhandeling, zodat het los te lezen en te testen is.
 */
import type {
  ContentCreateValues,
  ContentUpdateValues,
} from '../../../src/lib/content/schemas.js';
import type {
  Channel,
  ContentEventName,
  ContentItem,
  ContentStatus,
  SocialChannel,
  SocialPost,
} from '../../../src/lib/content/types.js';
import { socialChannels } from '../../../src/lib/content/types.js';
import { logContentEvent } from './log.js';
import { newId } from './store.js';
import { publishToChannel, SOCIAL_NOT_CONFIGURED } from './social.js';

const MAX_HISTORY = 40;

function now(): string {
  return new Date().toISOString();
}

/** Combineert datum en tijd tot één ISO-tijdstempel; null zolang de datum ontbreekt. */
export function toScheduledAt(date: string, time: string): string | null {
  if (!date) return null;
  const value = new Date(`${date}T${time || '09:00'}:00`);
  return Number.isNaN(value.getTime()) ? null : value.toISOString();
}

function addEvent(item: ContentItem, event: ContentEventName, detail: string): void {
  item.history = [{ at: now(), event, detail }, ...item.history].slice(0, MAX_HISTORY);
}

/* --- Aanmaken ------------------------------------------------------------------- */

export function createItem(values: ContentCreateValues): ContentItem {
  const timestamp = now();
  const item: ContentItem = {
    id: newId(),
    title: values.title,
    topic: values.topic,
    audience: values.audience,
    contentType: values.contentType,
    goal: values.goal,
    extraInstructions: values.extraInstructions,
    status: 'DRAFT',
    websiteContent: null,
    linkedinContent: null,
    facebookContent: null,
    instagramContent: null,
    schedule: {
      date: values.publicationDate,
      time: values.publicationTime,
      scheduledAt: toScheduledAt(values.publicationDate, values.publicationTime),
      channels: values.channels,
    },
    scheduledAt: toScheduledAt(values.publicationDate, values.publicationTime),
    generation: null,
    createdAt: timestamp,
    updatedAt: timestamp,
    publishedAt: null,
    history: [],
  };
  addEvent(item, 'created', `Concept aangemaakt voor ${values.channels.join(', ')}`);
  logContentEvent('created', { id: item.id, title: item.title, status: item.status });
  return item;
}

/* --- Bijwerken ------------------------------------------------------------------ */

const statusEvents: Partial<Record<ContentStatus, ContentEventName>> = {
  REVIEW: 'review',
  APPROVED: 'approved',
  SCHEDULED: 'scheduled',
  PUBLISHED: 'published',
  FAILED: 'publication_failed',
};

function toSocialPost(
  channel: SocialChannel,
  values: { body: string; cta: string; hashtags: string[] },
  previous: SocialPost | null,
): SocialPost {
  return {
    channel,
    body: values.body,
    cta: values.cta,
    hashtags: values.hashtags.map((tag) => tag.replace(/^#/, '').trim()).filter(Boolean),
    publishState: previous?.publishState,
  };
}

/**
 * Past een gedeeltelijke update toe. De server bepaalt zelf updatedAt,
 * publishedAt en de gebeurtenissenlijst — die komen nooit uit de aanvraag.
 */
export function applyUpdate(item: ContentItem, values: ContentUpdateValues): ContentItem {
  const next: ContentItem = { ...item };

  if (values.title !== undefined) next.title = values.title;
  if (values.topic !== undefined) next.topic = values.topic;
  if (values.audience !== undefined) next.audience = values.audience;
  if (values.contentType !== undefined) next.contentType = values.contentType;
  if (values.goal !== undefined) next.goal = values.goal;
  if (values.extraInstructions !== undefined) next.extraInstructions = values.extraInstructions;

  if (values.websiteContent !== undefined) next.websiteContent = values.websiteContent;
  if (values.linkedinContent !== undefined) {
    next.linkedinContent = values.linkedinContent
      ? toSocialPost('linkedin', values.linkedinContent, item.linkedinContent)
      : null;
  }
  if (values.facebookContent !== undefined) {
    next.facebookContent = values.facebookContent
      ? toSocialPost('facebook', values.facebookContent, item.facebookContent)
      : null;
  }
  if (values.instagramContent !== undefined) {
    next.instagramContent = values.instagramContent
      ? toSocialPost('instagram', values.instagramContent, item.instagramContent)
      : null;
  }

  const date = values.publicationDate ?? item.schedule.date;
  const time = values.publicationTime ?? item.schedule.time;
  const channels = values.channels ?? item.schedule.channels;
  next.schedule = { date, time, scheduledAt: toScheduledAt(date, time), channels };
  next.scheduledAt = next.schedule.scheduledAt;

  next.history = [...item.history];
  next.updatedAt = now();

  if (values.status !== undefined && values.status !== item.status) {
    next.status = values.status;
    if (values.status === 'PUBLISHED' && !next.publishedAt) next.publishedAt = now();
    const event = statusEvents[values.status];
    if (event) addEvent(next, event, `Status gewijzigd naar ${values.status}`);
    logContentEvent(event ?? 'updated', {
      id: next.id,
      title: next.title,
      status: next.status,
    });
  } else {
    addEvent(next, 'updated', 'Gegevens bijgewerkt');
    logContentEvent('updated', { id: next.id, title: next.title, status: next.status });
  }

  return next;
}

/* --- Publiceren ----------------------------------------------------------------- */

export interface PublishOutcome {
  item: ContentItem;
  /** True wanneer alles wat automatisch kon worden gepubliceerd ook is gepubliceerd */
  published: boolean;
  message: string;
  results: Array<{ channel: Channel; ok: boolean; message: string }>;
}

function socialPostFor(item: ContentItem, channel: SocialChannel): SocialPost | null {
  if (channel === 'linkedin') return item.linkedinContent;
  if (channel === 'facebook') return item.facebookContent;
  return item.instagramContent;
}

function setSocialPost(item: ContentItem, channel: SocialChannel, post: SocialPost): void {
  if (channel === 'linkedin') item.linkedinContent = post;
  else if (channel === 'facebook') item.facebookContent = post;
  else item.instagramContent = post;
}

/**
 * Probeert de geselecteerde kanalen te publiceren.
 *
 * Zolang de social-media-API's niet gekoppeld zijn geeft elk social kanaal een
 * gecontroleerde melding terug en wordt de status NIET op PUBLISHED gezet.
 * De website is altijd handmatig: die markeren we wél als gepubliceerd,
 * want die tekst plaatst u zelf.
 */
export async function publishItem(item: ContentItem): Promise<PublishOutcome> {
  const next: ContentItem = { ...item, history: [...item.history] };
  const results: PublishOutcome['results'] = [];
  const selected = next.schedule.channels;

  for (const channel of selected) {
    if (channel === 'website') {
      results.push({
        channel,
        ok: true,
        message: 'Websitetekst is klaar om te plaatsen (handmatig).',
      });
      continue;
    }

    const socialChannel = channel as SocialChannel;
    const post = socialPostFor(next, socialChannel);
    if (!post) {
      results.push({ channel, ok: false, message: 'Er is nog geen tekst voor dit kanaal.' });
      continue;
    }

    const result = await publishToChannel(socialChannel, post);
    setSocialPost(next, socialChannel, {
      ...post,
      publishState: {
        status: result.ok ? 'published' : result.code === 'not_configured' ? 'not_configured' : 'failed',
        message: result.message,
        attemptedAt: now(),
        externalId: result.ok ? result.externalId : null,
      },
    });
    results.push({ channel, ok: result.ok, message: result.message });
    if (!result.ok) {
      logContentEvent('publication_failed', {
        id: next.id,
        title: next.title,
        channel,
        detail: result.message,
      });
    }
  }

  const socialSelected = selected.filter((c): c is SocialChannel =>
    (socialChannels as readonly string[]).includes(c),
  );
  const socialFailed = results.filter((r) => r.channel !== 'website' && !r.ok);
  const allOk = results.length > 0 && results.every((r) => r.ok);

  next.updatedAt = now();

  if (allOk) {
    next.status = 'PUBLISHED';
    next.publishedAt = now();
    addEvent(next, 'published', `Gepubliceerd op ${selected.join(', ')}`);
    logContentEvent('published', { id: next.id, title: next.title, status: next.status });
    return {
      item: next,
      published: true,
      message:
        socialSelected.length > 0
          ? 'Gepubliceerd.'
          : 'Websitetekst gemarkeerd als gepubliceerd. Plaats de tekst zelf op de website.',
      results,
    };
  }

  // Niet gekoppeld → status onveranderd laten en duidelijk melden.
  const onlyNotConfigured = socialFailed.every((r) => r.message === SOCIAL_NOT_CONFIGURED);
  if (!onlyNotConfigured) {
    next.status = 'FAILED';
    addEvent(next, 'publication_failed', socialFailed.map((r) => `${r.channel}: ${r.message}`).join(' · '));
  } else {
    addEvent(next, 'updated', `Publicatie aangevraagd — ${SOCIAL_NOT_CONFIGURED}`);
  }

  return {
    item: next,
    published: false,
    message: onlyNotConfigured
      ? SOCIAL_NOT_CONFIGURED
      : 'Publiceren is niet volledig gelukt. Zie de details per kanaal.',
    results,
  };
}
