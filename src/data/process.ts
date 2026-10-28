export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  /** Concrete onderdelen van deze stap */
  items?: string[];
}

/** Samenwerkingsproces — drie stappen van kennismaking tot start. */
export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Kennismaking en inventarisatie',
    description:
      'We bespreken uw werkzaamheden, software, deadlines en gewenste capaciteit.',
    items: [
      'Uw situatie en werkvoorraad in beeld',
      'Welke werkzaamheden goed overdraagbaar zijn',
      'Welke software en procedures u gebruikt',
    ],
  },
  {
    number: '02',
    title: 'Duidelijke afspraken',
    description:
      'We bepalen de taken, tarieven, werkwijze en controlemomenten en leggen die vast.',
    items: [
      'Werkzaamheden en verantwoordelijkheden schriftelijk vastgelegd',
      'Tarief of urenbundel vooraf afgesproken',
      'Vaste controle- en overlegmomenten',
    ],
  },
  {
    number: '03',
    title: 'Start van de samenwerking',
    description:
      'We beginnen met een afgebakende opdracht of een urenbundel en koppelen terug wat is verwerkt.',
    items: [
      'Werken binnen uw software en procedures',
      'Terugkoppeling van verwerkte werkzaamheden',
      'Signalering van ontbrekende documenten en afwijkingen',
    ],
  },
];

/** Waarom kantoren met MERIT werken — sectie "Waarom MERIT?" */
export interface Benefit {
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    title: 'Betaalbare tarieven',
    description:
      'Een tariefstructuur die past bij uitvoerende backofficewerkzaamheden, met een helder instaptarief en voordeliger tarieven bij een vaste urenbundel.',
  },
  {
    title: 'Flexibele ondersteuning',
    description:
      'U kunt klein beginnen en opschalen wanneer het nodig is. Ook rond aangifteperioden en jaarafsluitingen kunt u extra capaciteit inzetten.',
  },
  {
    title: 'Duidelijke werkafspraken',
    description:
      'Wij leggen vooraf vast welke werkzaamheden wij uitvoeren, wat bij uw kantoor blijft en op welke momenten wordt gecontroleerd en afgestemd.',
  },
  {
    title: 'Ondersteuning bij terugkerende werkzaamheden',
    description:
      'Juist het werk dat elke periode terugkomt — verwerking, controles, aansluitingen — is goed over te dragen en vraagt daarna weinig uitleg.',
  },
  {
    title: 'Kwaliteitsbewuste verwerking',
    description:
      'Wij werken met vaste controlepunten, signaleren ontbrekende documenten en afwijkingen en leggen vast wat wij hebben gecontroleerd.',
  },
  {
    title: 'Meer tijd voor klantadvies',
    description:
      'Wanneer uitvoerende werkzaamheden elders worden opgepakt, ontstaat binnen uw kantoor ruimte voor het gesprek met de klant.',
  },
  {
    title: 'Mogelijkheid tot structurele samenwerking',
    description:
      'Veel kantoren kiezen na een eerste opdracht voor een vaste urenbundel, zodat de capaciteit elke maand beschikbaar is.',
  },
];
