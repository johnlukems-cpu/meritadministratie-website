/**
 * Pakketten en tarieven — bron: MERIT Prijzenoverzicht 2026.
 * Alle bedragen zijn vanaf-tarieven en exclusief 21% btw (zie siteConfig.pricing).
 * Wijzig prijzen uitsluitend hier.
 */

export interface Package {
  id: string;
  name: string;
  /** Vanaf-bedrag per maand, als tekst zodat "950+" mogelijk is */
  priceFrom: string;
  /** Voor wie */
  audience: string;
  /** Inbegrepen onderdelen */
  includes: string[];
  /** Uitgelicht pakket (visueel benadrukt) */
  highlighted?: boolean;
}

export const packages: Package[] = [
  {
    id: 'start',
    name: 'MERIT Start',
    priceFrom: '125',
    audience: 'Kleine ondernemers',
    includes: ['Financiële verwerking', 'Btw-aangifte', 'Basiscontrole'],
  },
  {
    id: 'groei',
    name: 'MERIT Groei',
    priceFrom: '195',
    audience: 'Groeiende onderneming',
    includes: ['Verwerking', 'Debiteuren en crediteuren', 'Btw- en ICP-aangifte', 'Periodieke controle'],
  },
  {
    id: 'control',
    name: 'MERIT Control',
    priceFrom: '295',
    audience: 'MKB',
    includes: ['Volledige administratie', 'Maandafsluiting', 'Rapportage', 'AFAS-ondersteuning'],
    highlighted: true,
  },
  {
    id: 'partner',
    name: 'MERIT Partner',
    priceFrom: '495',
    audience: 'Uitgebreide financiële ontzorging',
    includes: ['AFAS', 'Maandafsluiting', 'Rapportage', 'Advies'],
  },
  {
    id: 'finance',
    name: 'MERIT Finance',
    priceFrom: '950+',
    audience: 'Externe financiële afdeling',
    includes: ['Administratie', 'AFAS', 'Aangiften', 'Jaarwerk', 'Advies'],
  },
];

/** Mutatiegerichte prijsstructuur: financiële verwerking • btw-aangifte • basiscontrole */
export const mutationTiers: Array<{ mutations: number; price: number }> = [
  { mutations: 10, price: 125 },
  { mutations: 20, price: 139 },
  { mutations: 30, price: 155 },
  { mutations: 40, price: 175 },
  { mutations: 50, price: 195 },
  { mutations: 60, price: 215 },
  { mutations: 70, price: 235 },
  { mutations: 80, price: 255 },
  { mutations: 90, price: 275 },
  { mutations: 100, price: 295 },
  { mutations: 125, price: 330 },
  { mutations: 150, price: 375 },
];

export const mutationTiersNote =
  'Bij het pakket vanaf € 125 p/m is de jaarlijkse jaarafsluiting/jaarrekening niet automatisch inbegrepen; deze kan als aanvullende dienst worden toegevoegd. Dit houdt het instaptarief laag en maakt het pakket schaalbaar.';

export interface PriceItem {
  name: string;
  /** Prijs als tekst, bijv. '€ 50', '€ 85 per uur', '€ 350 eenmalig' of 'Gratis' */
  price: string;
  note?: string;
  /** Kosteloze dienst → visueel als gouden badge weergegeven */
  free?: boolean;
}

export interface PriceGroup {
  id: string;
  title: string;
  intro?: string;
  items: PriceItem[];
  /** Toelichting onder de tabel */
  footnote?: string;
}

export const priceGroups: PriceGroup[] = [
  {
    id: 'aangiften',
    title: 'Aangiften',
    items: [
      { name: 'Btw-aangifte', price: '€ 50' },
      { name: 'ICP-aangifte', price: '€ 40' },
      { name: 'IB-aangifte ondernemer', price: '€ 150' },
      { name: 'IB-aangifte dga', price: '€ 250' },
      { name: 'Vpb-aangifte', price: '€ 300' },
      { name: 'Complexe IB / vpb', price: '€ 350+' },
    ],
  },
  {
    id: 'jaarwerk',
    title: 'Jaarwerk, rapportage & advies',
    items: [
      { name: 'Jaarrekening eenmanszaak / vof', price: '€ 500' },
      { name: 'Jaarrekening bv', price: '€ 700' },
      { name: 'Maandafsluiting los', price: '€ 195 p/m' },
      { name: 'Financiële rapportage', price: '€ 50 p/m' },
      { name: 'Financieel advies', price: '€ 95 per uur' },
    ],
  },
  {
    id: 'afas',
    title: 'AFAS – overstappen, inrichting & begeleiding',
    intro: 'Vanaf-tarieven exclusief btw',
    items: [
      { name: 'AFAS Quick Scan', price: '€ 350 eenmalig' },
      { name: 'AFAS begeleiding & ondersteuning', price: '€ 85 per uur' },
      { name: 'AFAS inrichting / implementatie', price: 'Gratis', free: true },
      { name: 'Overstappen naar AFAS', price: 'Gratis', free: true },
    ],
    footnote:
      'Wij helpen u kosteloos met de inrichting en/of overstap naar AFAS. U betaalt alleen wanneer u gebruikmaakt van aanvullende ondersteuning, zoals begeleiding, training of een Quick Scan.',
  },
];

/** Diensten die altijd op offertebasis gaan (Prijzenoverzicht: "Aanvullende diensten") */
export const quotedServicesNote =
  'Salarisadministratie, loonheffingen, contracten, fiscale correspondentie, belastingcontroles, koppelingen en overige AFAS-werkzaamheden worden op basis van omvang en complexiteit geoffreerd.';
