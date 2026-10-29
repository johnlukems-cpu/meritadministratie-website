/**
 * PRIJSWEERGAVE EN VEELGESTELDE VRAGEN OVER TARIEVEN
 * -----------------------------------------------------------------------------
 * Alle bedragen zijn exclusief 21% btw (zie siteConfig.pricing.vatNote).
 *
 * De maandpakketten voor zzp’ers en mkb-ondernemers staan in src/data/packages.ts
 * en komen uit het Prijzenoverzicht 2026. Dit bestand bevat alleen de gedeelde
 * prijsweergave voor diensten die per opdracht worden afgesproken, en de
 * veelgestelde vragen over tarieven.
 *
 * Verzin hier geen bedragen. Een prijs hoort in packages.ts en komt uit het
 * Prijzenoverzicht.
 */

/**
 * Toelichting bij de diensten die per opdracht worden geprijsd.
 * Deze teksten worden op de dienstpagina's én op de tarievenpagina gebruikt, zodat
 * de weergave overal gelijk is.
 */
export const QUOTED_LABEL = 'Vaste tarieven op afspraak';

export const QUOTED_NOTE = {
  btw: 'De prijs hangt af van het aantal aangiften per jaar, de omvang van uw administratie en de complexiteit van de btw-verwerking. U ontvangt vooraf een duidelijk voorstel.',
  jaarrekeningen:
    'De prijs hangt af van de rechtsvorm, de omvang van de administratie en de staat waarin het boekjaar wordt aangeleverd. U ontvangt vooraf een duidelijk voorstel.',
} as const;

/** Werkzaamheden die buiten een maandpakket vallen en vooraf worden afgebakend. */
export const quotedWork: string[] = [
  'Btw-aangiften en ICP-opgaven',
  'Jaarafsluiting en jaarrekening',
  'Inkomstenbelasting en vennootschapsbelasting',
  'Het inhalen van een achterstand in de administratie',
  'Het overzetten van uw administratie uit een ander pakket',
];

export const quotedWorkNote =
  'Deze werkzaamheden bakenen wij vooraf met u af. U weet daardoor voor aanvang welke werkzaamheden onder het maandbedrag vallen en wat afzonderlijk wordt geoffreerd.';

export const pricingFaq: Array<{ question: string; answer: string }> = [
  {
    question: 'Zijn de genoemde tarieven inclusief of exclusief btw?',
    answer:
      'Alle genoemde tarieven zijn exclusief 21% btw. Btw wordt toegepast indien wettelijk van toepassing.',
  },
  {
    question: 'Kan ik klein beginnen en later uitbreiden?',
    answer:
      'Ja. U kunt starten met het pakket dat past bij de omvang van uw administratie en later overstappen wanneer uw onderneming groeit. Wij bespreken dat vooraf met u, zodat u niet onverwacht in een ander tarief terechtkomt.',
  },
  {
    question: 'Wat valt er binnen mijn maandbedrag?',
    answer:
      'Bij het vastleggen van de samenwerking leggen wij schriftelijk vast welke werkzaamheden binnen het maandbedrag vallen. Werkzaamheden daarbuiten — zoals de jaarafsluiting, aangiften inkomstenbelasting of het inhalen van een achterstand — bakenen wij apart af en offreren wij afzonderlijk.',
  },
  {
    question: 'Wat als mijn administratie in een maand meer werk vraagt?',
    answer:
      'Meerwerk bespreken wij altijd vooraf met u. Pas na uw akkoord voeren wij aanvullende werkzaamheden uit, zodat u achteraf niet voor verrassingen staat.',
  },
  {
    question: 'Waarom staat er geen vaste prijs bij btw-aangiften en jaarrekeningen?',
    answer:
      'Omdat die prijs sterk verschilt per onderneming. Het aantal aangiften, de rechtsvorm en de staat waarin de administratie wordt aangeleverd bepalen het werk. Wij noemen liever geen bedrag dat later niet blijkt te kloppen; u ontvangt vooraf een voorstel met een vast tarief.',
  },
  {
    question: 'Hoe wordt het definitieve tarief bepaald?',
    answer:
      'Het definitieve tarief wordt afgestemd op de omvang en complexiteit van uw administratie en op de afspraken die wij met u maken. Wij leggen dit vooraf schriftelijk vast.',
  },
  {
    question: 'Zijn softwarekosten inbegrepen?',
    answer:
      'Nee. Licentiekosten voor boekhoudsoftware staan los van onze dienstverlening. Wij geven vooraf aan welke kosten bij ons horen en welke niet.',
  },
];
