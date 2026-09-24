/**
 * AI CONTENT SERVICE — provider-abstractie
 * -----------------------------------------------------------------------------
 * De Content Studio is voorbereid op automatische tekstgeneratie, maar er is
 * BEWUST nog geen AI-provider gekoppeld. Dit bestand legt het contract vast:
 *
 *   AIContentService.generate(input) → GeneratedContent (website + 3 social-kanalen)
 *
 * Zolang er geen provider is geconfigureerd geeft `generate()` een gecontroleerde
 * `not_configured`-respons terug, mét de volledig opgebouwde briefing. Daarmee
 * werkt de studio nu al: u kunt de briefing kopiëren, de tekst zelf (laten)
 * schrijven en per kanaal invullen. Zodra een provider wordt aangesloten
 * verandert er niets aan de endpoints of de interface.
 *
 * Alle sleutels blijven server-side: de frontend roept uitsluitend
 * POST /api/admin/content/generate aan en krijgt nooit een sleutel te zien.
 *
 * -----------------------------------------------------------------------------
 * PROVIDER AANSLUITEN (TODO — pas uitvoeren na uw expliciete opdracht)
 *
 *   1. npm install @anthropic-ai/sdk
 *   2. Zet ANTHROPIC_API_KEY in Vercel → Settings → Environment Variables
 *      (server-side, nooit met VITE_-prefix, nooit in Git).
 *   3. Vervang `notConfiguredService` door onderstaande implementatie:
 *
 *      import Anthropic from '@anthropic-ai/sdk';
 *
 *      const client = new Anthropic();               // leest ANTHROPIC_API_KEY
 *      const response = await client.messages.create({
 *        model: 'claude-opus-5',
 *        max_tokens: 16000,
 *        system: brief.system,                        // bevat de MERIT-kennisbank
 *        messages: [{ role: 'user', content: brief.user }],
 *      });
 *      const text = response.content
 *        .filter((block) => block.type === 'text')
 *        .map((block) => block.text)
 *        .join('');
 *      // `text` is JSON in de vorm van GeneratedContent; parse en valideer het
 *      // met zod voordat u het opslaat. Gebruik bij voorkeur structured outputs
 *      // (output_config.format) zodat het model gegarandeerd geldige JSON teruggeeft.
 *
 *   4. Registreer de provider in `getAIContentService()` hieronder.
 *
 * Elke andere provider kan net zo goed: implementeer `AIContentService` en geef
 * hem terug in `getAIContentService()`. De rest van de applicatie wijzigt niet.
 */
import { knowledgeBaseAsText } from '../../../src/lib/content/knowledge.js';
import type { Channel, ContentItem } from '../../../src/lib/content/types.js';

/* --- Contract ------------------------------------------------------------------ */

export interface GenerationInput {
  title: string;
  topic: string;
  audience: string;
  contentType: string;
  goal: string;
  extraInstructions: string;
  channels: Channel[];
}

export interface GeneratedWebsite {
  seoTitle: string;
  metaDescription: string;
  article: string;
  cta: string;
}

export interface GeneratedSocial {
  body: string;
  cta: string;
  hashtags: string[];
}

export interface GeneratedContent {
  website?: GeneratedWebsite;
  linkedin?: GeneratedSocial;
  facebook?: GeneratedSocial;
  instagram?: GeneratedSocial;
}

/** Opgebouwde briefing: system-instructie + opdracht. Bevat geen sleutels. */
export interface GenerationBrief {
  system: string;
  user: string;
}

export type GenerationResult =
  | { ok: true; content: GeneratedContent; provider: string; model: string | null }
  | { ok: false; code: 'not_configured' | 'error'; message: string; brief: GenerationBrief };

export interface AIContentService {
  /** Naam die in het generatielogboek terechtkomt */
  name: string;
  /** Model-id, alleen ter referentie in het logboek */
  model: string | null;
  isConfigured(): boolean;
  generate(input: GenerationInput): Promise<GenerationResult>;
}

/* --- Briefing ------------------------------------------------------------------ */

const CHANNEL_INSTRUCTIONS: Record<Channel, string> = {
  website:
    'WEBSITE — geef: seoTitle (max. 60 tekens), metaDescription (max. 155 tekens), article ' +
    '(300–600 woorden, tussenkopjes, geen opsomming van prijzen tenzij relevant) en cta (één zin).',
  linkedin:
    'LINKEDIN — geef: body (professionele post van 120–200 woorden, korte alinea’s, geen emoji-overdaad), ' +
    'cta (één zin) en hashtags (3–5, zonder #-teken).',
  facebook:
    'FACEBOOK — geef: body (toegankelijke post van 80–140 woorden), cta (één zin) en hashtags (2–4, zonder #-teken).',
  instagram:
    'INSTAGRAM — geef: body (caption van 60–120 woorden, eerste zin is de haak), cta (één zin) ' +
    'en hashtags (5–10, zonder #-teken).',
};

/**
 * Bouwt de briefing op uit de MERIT-kennisbank en de ingevulde velden.
 * Dit is bewust een pure functie: hij is te tonen in de interface en te testen
 * zonder ooit een externe dienst aan te roepen.
 */
export function buildBrief(input: GenerationInput): GenerationBrief {
  const system = [
    'U schrijft Nederlandstalige marketing- en kenniscontent voor een administratiekantoor.',
    'Gebruik uitsluitend de feiten uit de onderstaande kennisbank. Verzin nooit bedrijfsgegevens,',
    'prijzen, klantnamen, reviews, keurmerken, certificeringen of aantallen klanten.',
    '',
    '=== MERIT KENNISBANK ===',
    knowledgeBaseAsText(),
    '=== EINDE KENNISBANK ===',
    '',
    'Antwoord uitsluitend met JSON in deze vorm (laat kanalen weg die niet gevraagd zijn):',
    '{"website":{"seoTitle":"","metaDescription":"","article":"","cta":""},',
    ' "linkedin":{"body":"","cta":"","hashtags":[]},',
    ' "facebook":{"body":"","cta":"","hashtags":[]},',
    ' "instagram":{"body":"","cta":"","hashtags":[]}}',
  ].join('\n');

  const user = [
    `Titel: ${input.title}`,
    `Onderwerp: ${input.topic}`,
    `Doelgroep: ${input.audience}`,
    `Contenttype: ${input.contentType}`,
    `Doel van de content: ${input.goal}`,
    input.extraInstructions ? `Extra instructies: ${input.extraInstructions}` : '',
    '',
    'Lever content voor deze kanalen:',
    ...input.channels.map((channel) => `- ${CHANNEL_INSTRUCTIONS[channel]}`),
  ]
    .filter(Boolean)
    .join('\n');

  return { system, user };
}

/** Handig voor de endpoint: briefing opbouwen uit een bestaand item. */
export function briefFromItem(item: ContentItem, channels: Channel[]): GenerationInput {
  return {
    title: item.title,
    topic: item.topic,
    audience: item.audience,
    contentType: item.contentType,
    goal: item.goal,
    extraInstructions: item.extraInstructions,
    channels,
  };
}

/* --- Provider: nog niet geconfigureerd ----------------------------------------- */

export const NOT_CONFIGURED_MESSAGE =
  'AI-generatie is nog niet geactiveerd. De briefing hieronder is wel opgebouwd; ' +
  'u kunt de teksten zelf invullen per kanaal.';

const notConfiguredService: AIContentService = {
  name: 'niet-geconfigureerd',
  model: null,
  isConfigured() {
    return false;
  },
  async generate(input) {
    return {
      ok: false,
      code: 'not_configured',
      message: NOT_CONFIGURED_MESSAGE,
      brief: buildBrief(input),
    };
  },
};

/**
 * Geeft de actieve AI-provider terug.
 * Zolang er geen provider is geregistreerd is dat bewust de "niet geconfigureerd"-variant.
 */
export function getAIContentService(): AIContentService {
  // TODO: registreer hier de echte provider zodra u daar opdracht voor geeft.
  return notConfiguredService;
}
