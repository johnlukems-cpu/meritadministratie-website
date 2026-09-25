/**
 * MERIT CONTENT STUDIO — datamodel
 * -----------------------------------------------------------------------------
 * Gedeeld tussen frontend (src/**) en de serverless functies (api/admin/**),
 * net als src/lib/forms/schemas.ts. Bevat GEEN imports uit React of Node, zodat
 * beide kanten dit bestand kunnen gebruiken.
 *
 * Opslagvorm: één `ContentItem` per stuk content. `SocialPost`, `ContentSchedule`
 * en `ContentGeneration` zijn deelstructuren daarvan (zie de types hieronder) —
 * zo blijft de opslag één document per item en is een aparte database niet nodig.
 */

/* --- Statussen -------------------------------------------------------------- */

export const contentStatuses = [
  'DRAFT',
  'REVIEW',
  'APPROVED',
  'SCHEDULED',
  'PUBLISHED',
  'FAILED',
] as const;

export type ContentStatus = (typeof contentStatuses)[number];

/* --- Kanalen ---------------------------------------------------------------- */

export const channels = ['website', 'linkedin', 'facebook', 'instagram'] as const;
export type Channel = (typeof channels)[number];

/** Kanalen waarvoor (later) een publicatie-API bestaat; website is altijd handmatig. */
export const socialChannels = ['linkedin', 'facebook', 'instagram'] as const;
export type SocialChannel = (typeof socialChannels)[number];

/* --- Contenttypes ----------------------------------------------------------- */

export const contentTypes = [
  'afas',
  'administratie',
  'financieel-advies',
  'btw',
  'jaarrekening',
  'ondernemen',
  'mkb',
  'nieuws',
  'bedrijfspromotie',
] as const;

export type ContentType = (typeof contentTypes)[number];

/* --- Gegenereerde teksten per kanaal ---------------------------------------- */

/** Website-artikel: SEO-titel, meta description, artikel en call-to-action. */
export interface WebsiteContent {
  seoTitle: string;
  metaDescription: string;
  article: string;
  cta: string;
}

/**
 * Social-post (LinkedIn, Facebook, Instagram).
 * `body` is de post- of caption-tekst; `hashtags` zonder '#'-teken opslaan.
 */
export interface SocialPost {
  channel: SocialChannel;
  body: string;
  cta: string;
  hashtags: string[];
  /** Resultaat van de laatste publicatiepoging (leeg zolang er geen koppeling is) */
  publishState?: PublishState;
}

/** Uitkomst van een publicatiepoging per kanaal — nooit tokens of API-respons met secrets. */
export interface PublishState {
  status: 'not_configured' | 'pending' | 'published' | 'failed';
  message: string;
  attemptedAt: string;
  /** Id of URL van de gepubliceerde post, zodra een koppeling actief is */
  externalId?: string | null;
}

/* --- Planning --------------------------------------------------------------- */

/** Gewenste publicatiemoment. Datum en tijd worden apart ingevuld en samen opgeslagen. */
export interface ContentSchedule {
  /** Datum in ISO-notatie (YYYY-MM-DD) */
  date: string;
  /** Tijd in 24-uursnotatie (HH:mm) */
  time: string;
  /** Datum + tijd als ISO-tijdstempel; leeg wanneer er nog niets is ingepland */
  scheduledAt: string | null;
  /** Kanalen die op dit moment gepubliceerd moeten worden */
  channels: Channel[];
}

/* --- AI-generatie ----------------------------------------------------------- */

/** Administratie van een generatiepoging. Bevat nooit prompts met bedrijfsgeheimen of keys. */
export interface ContentGeneration {
  /** Naam van de provider die de tekst maakte, bijv. 'niet-geconfigureerd' of 'claude' */
  provider: string;
  /** Model-id, alleen ter referentie */
  model: string | null;
  status: 'not_configured' | 'success' | 'failed';
  message: string;
  generatedAt: string;
  /** Kanalen die door de generator zijn gevuld */
  channels: Channel[];
}

/* --- Hoofdmodel ------------------------------------------------------------- */

export interface ContentItem {
  id: string;
  title: string;
  topic: string;
  audience: string;
  contentType: ContentType;
  /** Doel van de content (bijv. bekendheid, leads, uitleg) */
  goal: string;
  /** Extra instructies voor de tekstschrijver/AI */
  extraInstructions: string;
  status: ContentStatus;

  /** Teksten per kanaal; null = nog niet gemaakt voor dat kanaal */
  websiteContent: WebsiteContent | null;
  linkedinContent: SocialPost | null;
  facebookContent: SocialPost | null;
  instagramContent: SocialPost | null;

  schedule: ContentSchedule;
  /** Afgeleid van schedule.scheduledAt; los veld zodat sorteren en filteren simpel blijft */
  scheduledAt: string | null;

  /** Laatste generatiepoging (null zolang er niets is gegenereerd) */
  generation: ContentGeneration | null;

  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;

  /** Korte gebeurtenissenlijst voor de tijdlijn in de detailweergave */
  history: ContentEvent[];
}

export interface ContentEvent {
  at: string;
  event: ContentEventName;
  /** Korte, leesbare toelichting — nooit tokens, keys of persoonsgegevens */
  detail: string;
}

export const contentEventNames = [
  'created',
  'updated',
  'generated',
  'review',
  'approved',
  'scheduled',
  'published',
  'publication_failed',
] as const;

export type ContentEventName = (typeof contentEventNames)[number];

/* --- Afgeleide weergaven ---------------------------------------------------- */

/** Samenvatting voor het dashboard. */
export interface ContentStats {
  drafts: number;
  review: number;
  approved: number;
  scheduled: number;
  published: number;
  failed: number;
  total: number;
}

/** Eén regel in de contentkalender. */
export interface CalendarEntry {
  id: string;
  title: string;
  date: string;
  time: string;
  channel: Channel;
  status: ContentStatus;
}

/* --- Helpers (puur, zonder afhankelijkheden) -------------------------------- */

export function toStats(items: ContentItem[]): ContentStats {
  const count = (status: ContentStatus) => items.filter((i) => i.status === status).length;
  return {
    drafts: count('DRAFT'),
    review: count('REVIEW'),
    approved: count('APPROVED'),
    scheduled: count('SCHEDULED'),
    published: count('PUBLISHED'),
    failed: count('FAILED'),
    total: items.length,
  };
}

/** Alle geplande momenten als losse kalenderregels, oplopend gesorteerd. */
export function toCalendarEntries(items: ContentItem[]): CalendarEntry[] {
  const entries: CalendarEntry[] = [];
  for (const item of items) {
    if (!item.schedule.date) continue;
    for (const channel of item.schedule.channels) {
      entries.push({
        id: item.id,
        title: item.title,
        date: item.schedule.date,
        time: item.schedule.time,
        channel,
        status: item.status,
      });
    }
  }
  return entries.sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
}

/** Kanaalinhoud ophalen zonder overal een switch te hoeven schrijven. */
export function channelContent(
  item: ContentItem,
  channel: Channel,
): WebsiteContent | SocialPost | null {
  switch (channel) {
    case 'website':
      return item.websiteContent;
    case 'linkedin':
      return item.linkedinContent;
    case 'facebook':
      return item.facebookContent;
    case 'instagram':
      return item.instagramContent;
  }
}

/** True zodra er voor minstens één kanaal tekst staat. */
export function hasContent(item: ContentItem): boolean {
  return channels.some((c) => channelContent(item, c) !== null);
}
