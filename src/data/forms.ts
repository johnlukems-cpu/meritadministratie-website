// Geen imports uit componenten: dit bestand wordt ook door de Vercel-functie api/contact.ts gebruikt.
export interface SelectOption {
  value: string;
  label: string;
}

/** Keuzelijsten voor de formulieren. Pas hier aan; de formulieren volgen automatisch. */

export const rechtsvormen: SelectOption[] = [
  { value: 'zzp', label: 'Zzp / eenmanszaak' },
  { value: 'vof', label: 'Vof' },
  { value: 'bv', label: 'Bv' },
  { value: 'stichting-vereniging', label: 'Stichting of vereniging' },
  { value: 'nog-niet-opgericht', label: 'Nog niet opgericht' },
  { value: 'anders', label: 'Anders' },
];

export const branches: SelectOption[] = [
  { value: 'zakelijke-dienstverlening', label: 'Zakelijke dienstverlening' },
  { value: 'bouw-techniek', label: 'Bouw en techniek' },
  { value: 'ict', label: 'ICT en software' },
  { value: 'creatief-media', label: 'Creatief en media' },
  { value: 'zorg-welzijn', label: 'Zorg en welzijn' },
  { value: 'horeca', label: 'Horeca' },
  { value: 'retail-webshop', label: 'Retail of webshop' },
  { value: 'transport-logistiek', label: 'Transport en logistiek' },
  { value: 'onderwijs-training', label: 'Onderwijs en training' },
  { value: 'anders', label: 'Anders' },
];

export const huidigeSituaties: SelectOption[] = [
  { value: 'heeft-boekhouder', label: 'Ik heb momenteel een boekhouder' },
  { value: 'zelf', label: 'Ik regel mijn administratie zelf' },
  { value: 'start-binnenkort', label: 'Ik start binnenkort' },
  { value: 'anders', label: 'Anders' },
];

export const gewensteOndersteuning: SelectOption[] = [
  { value: 'administratie', label: 'Administratie' },
  { value: 'boekhouding', label: 'Boekhouding' },
  { value: 'btw', label: 'Btw-aangifte' },
  { value: 'icp', label: 'ICP-aangifte' },
  { value: 'ib', label: 'Inkomstenbelasting (IB)' },
  { value: 'vpb', label: 'Vennootschapsbelasting (vpb)' },
  { value: 'administratieve-ondersteuning', label: 'Administratieve ondersteuning' },
  { value: 'jaarwerk', label: 'Jaarwerk / jaarrekening' },
  { value: 'afas', label: 'AFAS-ondersteuning of -overstap' },
  { value: 'startbegeleiding', label: 'Startbegeleiding' },
  { value: 'overstappen', label: 'Overstappen van boekhouder' },
  { value: 'anders', label: 'Anders' },
];

/** Onderwerpen contactformulier */
export const contactOnderwerpen: SelectOption[] = [
  { value: 'algemene-vraag', label: 'Algemene vraag' },
  { value: 'offerte', label: 'Offerte' },
  { value: 'kennismaking', label: 'Kennismaking' },
  { value: 'overstappen', label: 'Overstappen van boekhouder' },
  { value: 'afas', label: 'AFAS (ondersteuning, inrichting of overstap)' },
  { value: 'administratieve-ondersteuning', label: 'Administratieve ondersteuning' },
  { value: 'administratie', label: 'Administratie of boekhouding' },
  { value: 'belastingaangifte', label: 'Belastingaangifte' },
  { value: 'starten', label: 'Ik start een onderneming' },
  { value: 'anders', label: 'Anders' },
];

/** Gewenste dienst bij kennismaking */
export const kennismakingDiensten: SelectOption[] = [
  { value: 'administratie', label: 'Administratie en boekhouding' },
  { value: 'belastingaangifte', label: 'Belastingaangiften' },
  { value: 'afas', label: 'AFAS-ondersteuning of -overstap' },
  { value: 'startbegeleiding', label: 'Startende ondernemer' },
  { value: 'overstappen', label: 'Overstappen van boekhouder' },
  { value: 'volledig-uitbesteden', label: 'Volledige administratie uitbesteden' },
  { value: 'weet-ik-nog-niet', label: 'Weet ik nog niet' },
];
