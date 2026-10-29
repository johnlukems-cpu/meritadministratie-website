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
    title: 'Kennismaking',
    description:
      'We bespreken uw onderneming, uw administratie en wat u uit handen wilt geven.',
    items: [
      'Uw rechtsvorm, omvang en manier van werken in beeld',
      'Welke werkzaamheden u zelf wilt blijven doen',
      'Welke software u gebruikt of wilt gaan gebruiken',
    ],
  },
  {
    number: '02',
    title: 'Duidelijke afspraken',
    description:
      'U ontvangt een voorstel met een vast maandbedrag en een heldere afbakening.',
    items: [
      'Schriftelijk vastgelegd welke werkzaamheden wij doen',
      'Vooraf duidelijk wat afzonderlijk wordt geoffreerd',
      'Vaste momenten waarop u iets van ons hoort',
    ],
  },
  {
    number: '03',
    title: 'Uw administratie loopt',
    description:
      'Wij verwerken uw administratie en koppelen periodiek terug hoe u ervoor staat.',
    items: [
      'Facturen en bankmutaties periodiek verwerkt',
      'Btw-aangifte op tijd voorbereid en ingediend',
      'Terugkoppeling van ontbrekende stukken en opvallende zaken',
    ],
  },
];

/** Waarom ondernemers met MERIT werken — sectie "Waarom MERIT?" */
export interface Benefit {
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    title: 'Eén vast aanspreekpunt',
    description:
      'U krijgt niet elke keer iemand anders aan de lijn. U weet bij wie u terechtkunt en hoeft uw situatie niet telkens opnieuw uit te leggen.',
  },
  {
    title: 'Een vast bedrag per maand',
    description:
      'U weet vooraf wat u betaalt. Werkzaamheden die buiten het pakket vallen bespreken wij eerst met u en offreren wij afzonderlijk.',
  },
  {
    title: 'Duidelijke afspraken',
    description:
      'Wij leggen vooraf schriftelijk vast welke werkzaamheden wij uitvoeren, wat u zelf blijft doen en wanneer u iets van ons hoort.',
  },
  {
    title: 'Uw administratie blijft bij',
    description:
      'Door periodiek te verwerken blijft uw administratie actueel. Dat voorkomt een berg werk aan het einde van het boekjaar.',
  },
  {
    title: 'Inzicht in uw cijfers',
    description:
      'U ziet periodiek wat er binnenkomt, wat eruit gaat en wat er nog openstaat. Zo kunt u met cijfers onderbouwd beslissen.',
  },
  {
    title: 'Begrijpelijke taal',
    description:
      'Wij leggen uit wat er in uw cijfers gebeurt zonder vakjargon, zodat u weet waar u aan toe bent.',
  },
  {
    title: 'Meegroeien wanneer het nodig is',
    description:
      'Groeit uw onderneming, dan passen wij het pakket aan. U begint met wat past bij uw huidige omvang.',
  },
];
