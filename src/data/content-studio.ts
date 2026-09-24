/**
 * Keuzelijsten en labels voor de MERIT Content Studio.
 * Alleen presentatie: de geldige waarden zelf staan in src/lib/content/types.ts.
 */
import type { SelectOption } from '@/data/forms';
import type { Channel, ContentStatus, ContentType } from '@/lib/content/types';

/* --- Contenttype ------------------------------------------------------------- */

export const contentTypeLabels: Record<ContentType, string> = {
  afas: 'AFAS',
  administratie: 'Administratie',
  'financieel-advies': 'Financieel advies',
  btw: 'BTW',
  jaarrekening: 'Jaarrekening',
  ondernemen: 'Ondernemen',
  mkb: 'MKB',
  nieuws: 'Nieuws',
  bedrijfspromotie: 'Algemene bedrijfspromotie',
};

export const contentTypeOptions: SelectOption[] = (
  Object.keys(contentTypeLabels) as ContentType[]
).map((value) => ({ value, label: contentTypeLabels[value] }));

/* --- Doelgroep --------------------------------------------------------------- */

/** Suggesties; het veld blijft vrije tekst zodat u altijd kunt afwijken. */
export const audienceSuggestions: string[] = [
  'Ondernemers in het MKB',
  'Startende ondernemers',
  'Bedrijven die met AFAS werken',
  'Bedrijven die willen overstappen naar AFAS',
  'Directeur-grootaandeelhouders (dga)',
  'Bedrijven met een eigen financiële afdeling',
];

/* --- Doel van de content ----------------------------------------------------- */

export const goalOptions: SelectOption[] = [
  { value: 'naamsbekendheid', label: 'Naamsbekendheid vergroten' },
  { value: 'kennis-delen', label: 'Kennis delen / uitleggen' },
  { value: 'leads', label: 'Aanvragen genereren' },
  { value: 'dienst-uitlichten', label: 'Een dienst uitlichten' },
  { value: 'nieuws', label: 'Nieuws of update delen' },
  { value: 'vertrouwen', label: 'Vertrouwen en expertise tonen' },
];

/* --- Kanalen ----------------------------------------------------------------- */

export const channelLabels: Record<Channel, string> = {
  website: 'Website',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
};

export const channelOptions: SelectOption[] = (Object.keys(channelLabels) as Channel[]).map(
  (value) => ({ value, label: channelLabels[value] }),
);

/* --- Status ------------------------------------------------------------------ */

export interface StatusMeta {
  label: string;
  /** Tailwind-klassen voor de badge, afgeleid van de bestaande design tokens */
  className: string;
  description: string;
}

export const statusMeta: Record<ContentStatus, StatusMeta> = {
  DRAFT: {
    label: 'Concept',
    className: 'bg-surface-muted text-muted',
    description: 'Nog in bewerking; niet zichtbaar voor publicatie.',
  },
  REVIEW: {
    label: 'Ter beoordeling',
    className: 'bg-warning-soft text-warning',
    description: 'Klaar om na te lezen en goed te keuren.',
  },
  APPROVED: {
    label: 'Goedgekeurd',
    className: 'bg-primary-soft text-primary',
    description: 'Inhoudelijk akkoord; kan worden ingepland.',
  },
  SCHEDULED: {
    label: 'Ingepland',
    className: 'bg-accent-soft text-accent-text',
    description: 'Staat gepland voor een datum en tijd.',
  },
  PUBLISHED: {
    label: 'Gepubliceerd',
    className: 'bg-success-soft text-success',
    description: 'Gepubliceerd of handmatig geplaatst.',
  },
  FAILED: {
    label: 'Mislukt',
    className: 'bg-error-soft text-error',
    description: 'De laatste publicatiepoging is niet gelukt.',
  },
};

/** Volgorde waarin statussen op het dashboard worden getoond. */
export const statusOrder: ContentStatus[] = [
  'DRAFT',
  'REVIEW',
  'APPROVED',
  'SCHEDULED',
  'PUBLISHED',
  'FAILED',
];

/* --- Meldingen --------------------------------------------------------------- */

/** Vaste melding zolang de social-media-API's nog niet zijn gekoppeld. */
export const SOCIAL_NOT_CONFIGURED = 'Social media koppeling wordt binnenkort geactiveerd.';
