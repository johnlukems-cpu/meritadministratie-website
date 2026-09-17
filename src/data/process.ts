export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

/** Werkwijze — vier stappen van kennismaking tot samenwerking */
export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Kennismaken',
    description: 'Vertel ons over uw onderneming en uw administratieve situatie; wij leggen uit hoe wij werken.',
  },
  {
    number: '02',
    title: 'Inventariseren',
    description: 'We bekijken wat er nodig is, welk pakket past en waar wij u kunnen ondersteunen.',
  },
  {
    number: '03',
    title: 'Inrichten',
    description: 'We maken duidelijke afspraken en richten uw administratie in AFAS praktisch in.',
  },
  {
    number: '04',
    title: 'Ontzorgen',
    description: 'Uw administratie wordt overzichtelijk verwerkt, zodat u zich kunt richten op uw onderneming.',
  },
];

/** Waarbij MERIT helpt bij een overstap van boekhouder (sectie "Overstappen") */
export const switchSteps: string[] = [
  'Inventarisatie van uw huidige administratie en wensen',
  'Overdracht: wij stemmen af met uw huidige boekhouder',
  'Administratie zorgvuldig overgenomen, inclusief historie',
  'Controle van de overgenomen gegevens en openstaande posten',
  'Inrichting in AFAS, afgestemd op uw onderneming',
  'Verdere verwerking en aangiften vanaf de afgesproken datum',
];
