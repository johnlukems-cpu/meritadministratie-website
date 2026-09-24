/**
 * MERIT KNOWLEDGE BASE
 * -----------------------------------------------------------------------------
 * Centrale bedrijfsinformatie voor de Content Studio: wie MERIT is, wat MERIT doet
 * en wat het kost. Dit is de bron waaruit de (latere) AI-generator zijn feiten haalt,
 * zodat teksten nooit verzonnen bedrijfsgegevens bevatten.
 *
 * REGEL: voeg hier uitsluitend informatie toe die daadwerkelijk klopt. Geen
 * klantnamen, reviews, keurmerken, certificeringen of aantallen klanten.
 *
 * WAAROM DIT BESTAND IN src/lib/content/ STAAT (en niet in src/config/):
 * de serverless functies in api/admin/ importeren het. Die draaien in Node en
 * kunnen dus geen `@/`-aliassen en geen `import.meta.env` gebruiken — daarom:
 *   • alleen relatieve imports MET .js-extensie;
 *   • prijzen worden hergebruikt uit src/data/packages.ts (pure data, één bron);
 *   • de vaste bedrijfsteksten staan hier als letterlijke waarden. Ze zijn gelijk
 *     aan src/config/site.ts, dat vanwege import.meta.env niet server-side laadbaar is.
 *     Wijzigt u een bedrijfsgegeven, pas dan beide bestanden aan.
 */
import { packages, priceGroups, quotedServicesNote } from '../../data/packages.js';

export interface KnowledgeService {
  name: string;
  /** Korte omschrijving in MERIT-toon */
  description: string;
  category: 'afas' | 'administratie' | 'aangiften' | 'jaarwerk' | 'advies';
}

/** Diensten zoals MERIT ze aanbiedt (Prijzenoverzicht 2026 en de website). */
export const knowledgeServices: KnowledgeService[] = [
  {
    name: 'AFAS Quick Scan',
    description: 'Eenmalige scan van uw huidige AFAS-inrichting met concrete verbeterpunten.',
    category: 'afas',
  },
  {
    name: 'AFAS begeleiding & ondersteuning',
    description: 'Praktische ondersteuning bij het dagelijks werken met AFAS, op uurbasis.',
    category: 'afas',
  },
  {
    name: 'AFAS inrichting & implementatie',
    description:
      'Inrichting en implementatie van AFAS; inbegrepen wanneer MERIT de financiële administratie verzorgt.',
    category: 'afas',
  },
  {
    name: 'Overstappen naar AFAS',
    description:
      'Begeleiding bij de overstap naar AFAS; inbegrepen wanneer MERIT de financiële administratie verzorgt.',
    category: 'afas',
  },
  {
    name: 'Financiële administratie',
    description: 'Volledige verwerking van uw administratie, met vaste controlemomenten.',
    category: 'administratie',
  },
  { name: 'Btw-aangiften', description: 'Tijdige en correcte btw-aangifte.', category: 'aangiften' },
  {
    name: 'ICP-aangiften',
    description: 'Opgaaf intracommunautaire prestaties bij handel binnen de EU.',
    category: 'aangiften',
  },
  {
    name: 'Inkomstenbelasting',
    description: 'Aangifte inkomstenbelasting voor ondernemers en dga’s.',
    category: 'aangiften',
  },
  {
    name: 'Vennootschapsbelasting',
    description: 'Aangifte vennootschapsbelasting voor bv’s.',
    category: 'aangiften',
  },
  {
    name: 'Maandafsluiting',
    description: 'Maandelijkse afsluiting met actueel inzicht in uw cijfers.',
    category: 'jaarwerk',
  },
  {
    name: 'Jaarafsluiting',
    description: 'Afsluiting van het boekjaar en voorbereiding op de jaarrekening.',
    category: 'jaarwerk',
  },
  {
    name: 'Jaarrekening',
    description: 'Opstellen van de jaarrekening voor eenmanszaak, vof of bv.',
    category: 'jaarwerk',
  },
  {
    name: 'Financieel advies',
    description: 'Advies over cijfers, structuur en groei, op uurbasis.',
    category: 'advies',
  },
];

/** Vaste bedrijfsteksten — gelijk aan src/config/site.ts (zie de kop van dit bestand). */
const company = {
  name: 'MERIT Administratie & Advies',
  shortName: 'MERIT',
  legalName: 'Merit Administratie en Advies',
  url: 'https://meritadministratie.nl',
  email: 'info@meritadministratie.nl',
  city: 'Meerssen',
} as const;

const positioning = {
  /** Hoofdpositionering */
  primary: 'Uw financiële partner in AFAS.',
  /** Slogan */
  secondary: 'Wij regelen de cijfers, u realiseert de groei.',
  summary:
    'MERIT Administratie & Advies is een modern administratiekantoor en AFAS-partner voor ondernemers en MKB-bedrijven.',
} as const;

/** Schrijfregels die voor alle content gelden (website én social). */
const toneOfVoice = {
  address: 'u',
  rules: [
    'Spreek de lezer aan met "u" en "uw".',
    'Professioneel en zakelijk, niet overdreven commercieel.',
    'Concreet en begrijpelijk; vermijd jargon zonder uitleg.',
    'Doe geen beloftes over resultaat, rendement of belastingvoordeel.',
    'Noem nooit klantnamen, reviews, keurmerken, certificeringen of aantallen klanten.',
    'Gebruik uitsluitend de diensten en prijzen uit deze kennisbank.',
  ],
} as const;

/** AFAS-tarieven uit het Prijzenoverzicht 2026 (src/data/packages.ts). */
const afasPricing = priceGroups.find((group) => group.id === 'afas')?.items ?? [];

/**
 * De MERIT-kennisbank. Alles wat de contentgenerator over het bedrijf mag weten
 * staat hier; er is geen tweede plek waar bedrijfsfeiten worden vastgelegd.
 */
export const knowledgeBase = {
  company,
  positioning,
  toneOfVoice,
  services: knowledgeServices,
  afasPricing,
  packages: packages.map((p) => ({
    name: p.name,
    priceFrom: `€ ${p.priceFrom} p/m`,
    audience: p.audience,
    includes: p.includes,
  })),
  priceGroups,
  pricingNotes: [
    'Alle prijzen zijn vanaf-tarieven en exclusief 21% btw.',
    'Het definitieve tarief wordt afgestemd op de omvang en complexiteit van de administratie.',
    quotedServicesNote,
  ],
  callsToAction: {
    website: `Plan een vrijblijvende kennismaking via ${company.url}/kennismaking`,
    social: 'Plan een vrijblijvende kennismaking via meritadministratie.nl',
  },
} as const;

export type KnowledgeBase = typeof knowledgeBase;

/**
 * De kennisbank als platte tekst — dit blok gaat als context mee naar de
 * AI-provider (zie api/admin/_lib/ai.ts). Bevat uitsluitend publieke informatie.
 */
export function knowledgeBaseAsText(): string {
  const kb = knowledgeBase;
  const lines: string[] = [
    `Bedrijf: ${kb.company.name} (${kb.company.legalName}), ${kb.company.city}.`,
    `Website: ${kb.company.url} — e-mail: ${kb.company.email}`,
    `Positionering: ${kb.positioning.primary}`,
    `Slogan: ${kb.positioning.secondary}`,
    kb.positioning.summary,
    '',
    'Schrijfregels:',
    ...kb.toneOfVoice.rules.map((r) => `- ${r}`),
    '',
    'Diensten:',
    ...kb.services.map((s) => `- ${s.name}: ${s.description}`),
    '',
    'AFAS-tarieven:',
    ...kb.afasPricing.map((p) => `- ${p.name}: ${p.price}${p.badge ? ` (${p.badge})` : ''}`),
    '',
    'Pakketten:',
    ...kb.packages.map((p) => `- ${p.name}: vanaf ${p.priceFrom} — ${p.audience}`),
    '',
    'Voorwaarden bij prijzen:',
    ...kb.pricingNotes.map((n) => `- ${n}`),
  ];
  return lines.join('\n');
}
