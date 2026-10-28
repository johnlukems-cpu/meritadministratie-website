/**
 * TARIEVEN VOOR ADMINISTRATIE- EN ACCOUNTANTSKANTOREN
 * -----------------------------------------------------------------------------
 * Alle bedragen zijn exclusief 21% btw (zie siteConfig.pricing.vatNote).
 *
 * STATUS — BELANGRIJK:
 * De uurtarieven en urenbundels hieronder zijn de VOORGESTELDE tarievenstructuur en
 * moeten intern worden bevestigd voordat ze als definitief gelden. Zolang
 * `siteConfig.pricing.kantorenTariffsProvisional` op `true` staat, toont de
 * tarievenpagina hierbij een zichtbare toelichting.
 *
 * De mkb-pakketten in src/data/packages.ts komen uit het Prijzenoverzicht 2026 en
 * staan los van deze structuur.
 *
 * Wijzig tarieven uitsluitend in dit bestand; de dienstkaarten in src/data/services.ts
 * verwijzen naar dezelfde instaptarieven.
 */

/**
 * Toelichting bij de diensten die altijd op afspraak worden geprijsd.
 * Deze teksten worden op de dienstpagina's én op de tarievenpagina gebruikt, zodat
 * de weergave overal gelijk is.
 */
export const QUOTED_LABEL = 'Vaste tarieven op afspraak';

export const QUOTED_NOTE = {
  btw:
    'De prijs wordt afgestemd op het aantal administraties, de complexiteit van de btw-verwerking en de omvang van de werkzaamheden. U ontvangt vooraf een duidelijk voorstel.',
  jaarrekeningen:
    'De prijs wordt bepaald op basis van de omvang van de administratie, de complexiteit van de jaarafsluiting en de gewenste werkzaamheden. U ontvangt vooraf een duidelijk voorstel.',
} as const;

export interface HourlyRate {
  /** Gelijk aan de dienst-id in src/data/services.ts waar die bestaat */
  id: string;
  name: string;
  /** Prijs als tekst, bijv. '€ 35' of '€ 45 – € 55' */
  price: string;
  /** Eenheid achter de prijs */
  unit: string;
  /** Vanaf-tarief in plaats van een vast tarief */
  from?: boolean;
  /**
   * Deze dienst krijgt GEEN uurtarief of vanaf-prijs op de website. De prijs wordt
   * per opdracht vastgesteld en vooraf in een voorstel vastgelegd.
   */
  quoted?: boolean;
  /** Voor welke werkzaamheden dit tarief geldt */
  description: string;
  /** Concrete werkzaamheden binnen dit tarief */
  items: string[];
  /** Toelichting op afwijkende of complexere werkzaamheden */
  note?: string;
  /** Link naar de bijbehorende dienstpagina */
  to?: string;
}

export interface HourBundle {
  id: string;
  name: string;
  /** Prijs per maand als tekst, bijv. '350' of '1.320' */
  pricePerMonth: string;
  /** Aantal uren ondersteuning per maand */
  hours: number;
  /** Effectief uurtarief, bijv. '€ 35' */
  effectiveRate: string;
  /** Voor welke situatie dit pakket geschikt is */
  audience: string;
  /** Subtiel als aanbevolen markeren */
  recommended?: boolean;
}

/* --- A. Uurtarieven ---------------------------------------------------------- */

export const hourlyRates: HourlyRate[] = [
  {
    id: 'financial-backoffice-basic',
    name: 'Financial Backoffice Basic',
    price: '€ 35',
    unit: 'per uur',
    description: 'Voor standaard administratieve werkzaamheden volgens uw instructies.',
    items: [
      'Inkoop- en verkoopfacturen verwerken',
      'Bankmutaties verwerken en afletteren',
      'Debiteuren- en crediteurenbeheer',
      'Administratieve verwerking volgens instructies',
    ],
  },
  {
    id: 'financial-backoffice-plus',
    name: 'Financial Backoffice Plus',
    price: '€ 40',
    unit: 'per uur',
    description: 'Voor uitgebreidere administratieve ondersteuning en controlewerk.',
    items: [
      'Complexere financiële verwerkingen',
      'Grootboekcontroles',
      'Controle van openstaande posten',
      'Voorbereiding van maandafsluitingen',
    ],
  },
  {
    id: 'btw-aangiften',
    name: 'Btw-aangiften',
    price: 'Vaste tarieven op afspraak',
    unit: '',
    quoted: true,
    description:
      'Voorbereiding en verwerking van btw-aangiften, aansluitingen en controlewerkzaamheden.',
    items: [
      'Periodieke btw-aangiften voorbereiden en verwerken',
      'Btw-coderingen en btw-rekeningen controleren',
      'Btw-administratie aansluiten op het grootboek',
      'Gegevens voor ICP-opgaven voorbereiden',
    ],
    note: QUOTED_NOTE.btw,
  },
  {
    id: 'jaarrekeningen',
    name: 'Jaarrekeningen & Jaarafsluiting',
    price: 'Vaste tarieven op afspraak',
    unit: '',
    quoted: true,
    description:
      'Voor administratieve jaarafsluiting, balansspecificaties en het voorbereiden van jaarrekeningdossiers.',
    items: [
      'Administraties voorbereiden voor de jaarafsluiting',
      'Grootboekrekeningen en tussenrekeningen controleren',
      'Specificaties van balansrekeningen opstellen',
      'Balansdossiers en aansluitingen voorbereiden',
    ],
    note: QUOTED_NOTE.jaarrekeningen,
  },
  {
    id: 'finance-control',
    name: 'Finance Control',
    price: '€ 45',
    unit: 'per uur',
    description:
      'Voor grootboekcontroles, aansluitingen, afwijkingssignalering en rapportagevoorbereiding.',
    items: [
      'Grootboekcontroles en balansaansluitingen',
      'Debiteuren-, crediteuren- en tussenrekeningcontroles',
      'Afwijkingen signaleren en vastleggen',
      'Controledocumentatie voorbereiden',
    ],
  },
  {
    id: 'afas-software-support',
    name: 'AFAS & Software Support',
    price: '€ 45 – € 55',
    unit: 'per uur',
    description:
      'Voor softwareondersteuning en procesverbetering binnen de aantoonbare deskundigheid.',
    items: [
      'Ondersteuning bij de dagelijkse financiële verwerking',
      'Werken volgens overeengekomen AFAS-processen',
      'Ondersteuning bij financiële workflows',
      'Werkprocedures documenteren',
    ],
    note:
      'Het tarief binnen deze bandbreedte hangt af van de aard van de werkzaamheden en wordt vooraf vastgelegd.',
  },
  {
    id: 'automatisering',
    name: 'Automatisering',
    price: 'Op offertebasis',
    unit: '',
    description: 'Voor procesanalyse, workflowtests en projectmatige automatisering.',
    items: [
      'Analyse van terugkerende administratieve processen',
      'Standaardisering van werkzaamheden',
      'Testen van workflows en gegevenscontroles',
      'Procesdocumentatie',
    ],
    note: 'Automatiseringsprojecten worden vooraf onderzocht, afgebakend en afzonderlijk geoffreerd.',
  },
];

/* --- B. Maandelijkse urenbundels --------------------------------------------- */

export const hourBundles: HourBundle[] = [
  {
    id: 'start',
    name: 'Start',
    pricePerMonth: '350',
    hours: 10,
    effectiveRate: '€ 35',
    audience: 'Geschikt voor een kleine terugkerende werkvoorraad.',
  },
  {
    id: 'groei',
    name: 'Groei',
    pricePerMonth: '680',
    hours: 20,
    effectiveRate: '€ 34',
    audience: 'Geschikt voor terugkerende administratieve werkzaamheden.',
    recommended: true,
  },
  {
    id: 'continu',
    name: 'Continu',
    pricePerMonth: '1.320',
    hours: 40,
    effectiveRate: '€ 33',
    audience: 'Geschikt voor structurele extra capaciteit.',
  },
  {
    id: 'backoffice-partner',
    name: 'Backoffice Partner',
    pricePerMonth: '2.560',
    hours: 80,
    effectiveRate: '€ 32',
    audience: 'Geschikt voor grotere en voorspelbare werkvoorraden.',
  },
];

/* --- C. Voorwaarden bij urenbundels ------------------------------------------ */

export const bundleConditions: string[] = [
  'De bundel bevat het afgesproken aantal uren ondersteuning per maand.',
  'De werkzaamheden binnen de bundel worden vooraf samen vastgelegd.',
  'Meerwerk wordt vooraf besproken en pas na uw akkoord uitgevoerd.',
  'Niet-gebruikte uren vervallen na afloop van de maand, tenzij anders overeengekomen.',
  'Complexe herstelwerkzaamheden, migraties en softwarelicenties zijn niet automatisch inbegrepen.',
  'Btw-aangiften en jaarrekeningwerkzaamheden worden apart geoffreerd, tenzij schriftelijk uitdrukkelijk anders overeengekomen.',
  'Specialistische werkzaamheden kunnen een afwijkend tarief hebben.',
  'Btw wordt toegepast indien wettelijk van toepassing.',
];

/** Voorwaarden die intern moeten worden bevestigd voordat ze contractueel gelden. */
export const bundleConditionsNote =
  'Deze voorwaarden geven de werkafspraken weer zoals wij die voorstellen. De volledige contractuele voorwaarden worden vastgelegd in de samenwerkingsovereenkomst en vooraf met u doorgenomen.';

/* --- D. Projectmatige dienstverlening ---------------------------------------- */

export const projectServices: string[] = [
  'Herstel van administratieve achterstanden',
  'Voorbereiding van jaarafsluitingen',
  'Btw-controles en aansluitingen',
  'AFAS-procesverbeteringen',
  'Automatiseringsprojecten',
];

export const projectServicesNote =
  'Projectmatige opdrachten worden vooraf afgebakend. Wij bepalen samen de omvang, de werkwijze en de controlepunten en leggen die vast in een voorstel, zodat u weet wat u kunt verwachten.';

/* --- E. Veelgestelde vragen over prijzen ------------------------------------- */

export const pricingFaq: Array<{ question: string; answer: string }> = [
  {
    question: 'Zijn de genoemde tarieven inclusief of exclusief btw?',
    answer:
      'Alle genoemde tarieven zijn exclusief 21% btw. Btw wordt toegepast indien wettelijk van toepassing.',
  },
  {
    question: 'Kan ik klein beginnen en later opschalen?',
    answer:
      'Ja. U kunt starten met een beperkt aantal uren per maand en de omvang later aanpassen. Veel kantoren beginnen met de Start-bundel van 10 uur per maand en breiden uit zodra duidelijk is welke werkzaamheden goed overdraagbaar zijn.',
  },
  {
    question: 'Wat gebeurt er als ik in een maand meer uren nodig heb?',
    answer:
      'Meerwerk wordt altijd vooraf met u besproken. Pas na uw akkoord voeren wij aanvullende werkzaamheden uit, zodat u niet achteraf voor verrassingen staat.',
  },
  {
    question: 'Vervallen niet-gebruikte uren?',
    answer:
      'Niet-gebruikte uren vervallen na afloop van de maand, tenzij wij hierover andere afspraken maken. Wij bespreken dit bij het vastleggen van de samenwerking.',
  },
  {
    question: 'Geldt het bundeltarief voor alle werkzaamheden?',
    answer:
      'De urenbundels zijn bedoeld voor de vooraf overeengekomen werkzaamheden. Specialistische werkzaamheden, complexe herstelopdrachten en automatiseringsprojecten kunnen een afwijkend tarief hebben of worden afzonderlijk geoffreerd.',
  },
  {
    question: 'Hoe komt een projectprijs tot stand?',
    answer:
      'Bij projectmatige opdrachten bakenen wij de werkzaamheden eerst af. Op basis van de omvang, de complexiteit en de gewenste doorlooptijd ontvangt u een voorstel. Wij noemen geen vaste projectprijs zonder die afbakening.',
  },
  {
    question: 'Zijn softwarelicenties inbegrepen?',
    answer:
      'Nee. Softwarelicenties, migraties en complexe herstelwerkzaamheden zijn niet automatisch in een urenbundel inbegrepen. Wij geven vooraf aan wat wel en niet onder de afspraken valt.',
  },
  {
    question: 'Hoe wordt het definitieve tarief bepaald?',
    answer:
      'Het definitieve tarief wordt afgestemd op de aard, omvang en complexiteit van de werkzaamheden en op de afspraken die wij met uw kantoor maken. Wij leggen dit vooraf schriftelijk vast.',
  },
];
