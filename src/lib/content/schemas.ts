/**
 * Validatie voor de Content Studio — dezelfde regels in de browser én op de server.
 * De serverless functies in api/admin/ importeren dit bestand; vertrouw dus nooit
 * alleen op de frontendvalidatie.
 */
import { z } from 'zod';
// Expliciete .js-extensie: dit bestand wordt óók door de Vercel-functies in api/admin/
// geïmporteerd, en Node's ESM-resolver eist daar een extensie (zie api/contact.ts).
import { channels, contentStatuses, contentTypes } from './types.js';

const tekst = (min: number, max: number, veld: string) =>
  z
    .string()
    .trim()
    .min(min, min === 1 ? `Vul ${veld} in.` : `Vul ${veld} in (minimaal ${min} tekens).`)
    .max(max, `Maximaal ${max} tekens.`);

const optioneleTekst = (max: number) => z.string().trim().max(max, `Maximaal ${max} tekens.`).default('');

/** Datum als YYYY-MM-DD; leeg betekent "nog niet plannen". */
const datum = z
  .string()
  .trim()
  .refine((v) => v === '' || /^\d{4}-\d{2}-\d{2}$/.test(v), 'Kies een geldige datum.')
  .default('');

/** Tijd als HH:mm (24-uurs); leeg betekent "nog geen tijd gekozen". */
const tijd = z
  .string()
  .trim()
  .refine((v) => v === '' || /^([01]\d|2[0-3]):[0-5]\d$/.test(v), 'Kies een geldige tijd (uu:mm).')
  .default('');

/** Nieuwe content aanmaken (het formulier "Nieuwe content"). */
export const contentCreateSchema = z.object({
  title: tekst(3, 160, 'een titel'),
  topic: tekst(3, 300, 'een onderwerp'),
  audience: tekst(1, 120, 'een doelgroep'),
  contentType: z.enum(contentTypes, { message: 'Kies een contenttype.' }),
  goal: tekst(1, 160, 'een doel'),
  extraInstructions: optioneleTekst(2000),
  publicationDate: datum,
  publicationTime: tijd,
  channels: z.array(z.enum(channels)).min(1, 'Kies minimaal één kanaal.'),
});

export type ContentCreateValues = z.infer<typeof contentCreateSchema>;

/* --- Bijwerken --------------------------------------------------------------- */

const websiteContentSchema = z.object({
  seoTitle: optioneleTekst(200),
  metaDescription: optioneleTekst(400),
  article: optioneleTekst(20000),
  cta: optioneleTekst(400),
});

const socialPostSchema = z.object({
  body: optioneleTekst(6000),
  cta: optioneleTekst(400),
  hashtags: z.array(z.string().trim().max(60)).max(30, 'Maximaal 30 hashtags.').default([]),
});

/**
 * Gedeeltelijke update (PATCH). Alle velden zijn optioneel; alleen meegestuurde
 * velden worden overschreven. Status- en publicatievelden worden hier bewust
 * niet vrij doorgelaten: de server bepaalt publishedAt en de gebeurtenissenlijst.
 */
export const contentUpdateSchema = z.object({
  title: tekst(3, 160, 'een titel').optional(),
  topic: tekst(3, 300, 'een onderwerp').optional(),
  audience: tekst(1, 120, 'een doelgroep').optional(),
  contentType: z.enum(contentTypes).optional(),
  goal: tekst(1, 160, 'een doel').optional(),
  extraInstructions: optioneleTekst(2000).optional(),
  status: z.enum(contentStatuses).optional(),
  publicationDate: datum.optional(),
  publicationTime: tijd.optional(),
  channels: z.array(z.enum(channels)).min(1, 'Kies minimaal één kanaal.').optional(),
  websiteContent: websiteContentSchema.nullable().optional(),
  linkedinContent: socialPostSchema.nullable().optional(),
  facebookContent: socialPostSchema.nullable().optional(),
  instagramContent: socialPostSchema.nullable().optional(),
});

export type ContentUpdateValues = z.infer<typeof contentUpdateSchema>;

/* --- AI-generatie ------------------------------------------------------------ */

/** Aanvraag voor POST /api/admin/content/generate */
export const generateRequestSchema = z.object({
  /** Bestaand item genereren; of laat leeg en stuur de losse velden mee */
  id: z.string().trim().min(1).max(64).optional(),
  channels: z.array(z.enum(channels)).min(1, 'Kies minimaal één kanaal.').optional(),
});

export type GenerateRequestValues = z.infer<typeof generateRequestSchema>;

/* --- Inloggen ---------------------------------------------------------------- */

export const loginSchema = z.object({
  password: z.string().min(1, 'Vul het wachtwoord in.').max(200),
});
