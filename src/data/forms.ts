// Geen imports uit componenten: dit bestand wordt ook door de Vercel-functie api/contact.ts gebruikt.
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Keuzelijsten voor alle formulieren. Pas hier aan; de formulieren, de server-side
 * validatie (src/lib/forms/schemas.ts) en de leesbare labels in de e-mail
 * (api/_lib/email.ts) volgen automatisch.
 *
 * LET OP: wijzig een `value` niet zonder reden — die waarde komt in de e-mail terecht
 * en wordt gebruikt om de bijbehorende dienstpagina te herkennen.
 */

/* --- Type onderneming -------------------------------------------------------- */

export const organisatieTypes: SelectOption[] = [
  { value: 'zzp', label: 'Zzp\u2019er / eenmanszaak' },
  { value: 'vof-maatschap', label: 'Vof of maatschap' },
  { value: 'bv', label: 'Bv' },
  { value: 'stichting-vereniging', label: 'Stichting of vereniging' },
  { value: 'anders', label: 'Anders' },
];

/* --- Gewenste dienst --------------------------------------------------------- */
/** Waarden gelijk aan de dienst-id's in src/data/services.ts, plus anders. */
export const gewensteDiensten: SelectOption[] = [
  { value: 'financiele-administratie', label: 'Financiële administratie' },
  { value: 'btw-aangiften', label: 'Btw-aangiften' },
  { value: 'jaarrekeningen', label: 'Jaarrekeningen & jaarafsluiting' },
  { value: 'volledige-ontzorging', label: 'Alles samen: administratie, btw en jaarwerk' },
  { value: 'anders', label: 'Anders' },
];

/* --- Omvang van de administratie (optioneel) --------------------------------- */
/** Aantal boekingen per maand; bepaalt samen met de werkzaamheden het pakket. */

export const urenPerMaand: SelectOption[] = [
  { value: 'tot-25', label: 'Tot 25 boekingen per maand' },
  { value: '25-50', label: '25 – 50 boekingen per maand' },
  { value: '50-100', label: '50 – 100 boekingen per maand' },
  { value: '100-plus', label: 'Meer dan 100 boekingen per maand' },
  { value: 'alleen-jaarwerk', label: 'Alleen jaarwerk, geen maandelijkse verwerking' },
  { value: 'nog-niet-bekend', label: 'Nog niet bekend' },
];

/* --- Gewenste startdatum (optioneel) ---------------------------------------- */

export const startMomenten: SelectOption[] = [
  { value: 'zo-snel-mogelijk', label: 'Zo snel mogelijk' },
  { value: 'binnen-1-maand', label: 'Binnen een maand' },
  { value: 'binnen-3-maanden', label: 'Binnen drie maanden' },
  { value: 'komende-aangifteperiode', label: 'Voor de komende btw-aangifte' },
  { value: 'komende-jaarafsluiting', label: 'Voor de komende jaarafsluiting' },
  { value: 'nieuw-boekjaar', label: 'Vanaf het nieuwe boekjaar' },
  { value: 'nog-niet-bekend', label: 'Nog niet bekend' },
];

/* --- Gewenste dienst bij kennismaking --------------------------------------- */

export const kennismakingDiensten: SelectOption[] = [
  ...gewensteDiensten.filter((o) => o.value !== 'anders'),
  { value: 'meerdere-diensten', label: 'Meerdere diensten' },
  { value: 'weet-ik-nog-niet', label: 'Weet ik nog niet' },
];

/* --- Offerteformulier -------------------------------------------------------- */

/** Diensten in het prijsvoorstelformulier, in de volgorde uit het ontwerp. */
export const offerteDiensten: SelectOption[] = [
  { value: 'financiele-administratie', label: 'Financiële administratie' },
  { value: 'btw-aangiften', label: 'Btw-aangiften' },
  { value: 'jaarrekeningen', label: 'Jaarrekeningen & jaarafsluiting' },
  { value: 'volledige-ontzorging', label: 'Alles samen: administratie, btw en jaarwerk' },
  { value: 'anders', label: 'Anders' },
];


export const rechtsvormen: SelectOption[] = [
  { value: 'bv', label: 'Bv' },
  { value: 'maatschap', label: 'Maatschap' },
  { value: 'vof', label: 'Vof' },
  { value: 'zzp', label: 'Zzp / eenmanszaak' },
  { value: 'stichting-vereniging', label: 'Stichting of vereniging' },
  { value: 'anders', label: 'Anders' },
];

export const branches: SelectOption[] = [
  { value: 'zakelijke-dienstverlening', label: 'Zakelijke dienstverlening' },
  { value: 'horeca', label: 'Horeca' },
  { value: 'bouw-techniek', label: 'Bouw en techniek' },
  { value: 'ict', label: 'ICT en software' },
  { value: 'retail-webshop', label: 'Retail of webshop' },
  { value: 'transport-logistiek', label: 'Transport en logistiek' },
  { value: 'zorg-welzijn', label: 'Zorg en welzijn' },
  { value: 'anders', label: 'Anders' },
];

export const huidigeSituaties: SelectOption[] = [
  { value: 'doe-het-zelf', label: 'Ik doe de administratie nu zelf' },
  { value: 'ander-kantoor', label: 'Ik werk nu met een ander administratiekantoor' },
  { value: 'achterstanden', label: 'Mijn administratie loopt achter' },
  { value: 'startende-ondernemer', label: 'Ik ben net gestart als ondernemer' },
  { value: 'alleen-jaarwerk', label: 'Ik regel het jaar rond zelf en zoek hulp bij het jaarwerk' },
  { value: 'anders', label: 'Anders' },
];

/** Meervoudige keuze: waarbij wilt u geholpen worden? */
export const gewensteOndersteuning: SelectOption[] = [
  { value: 'financiele-verwerking', label: 'Facturen en bankmutaties verwerken' },
  { value: 'debiteuren-crediteuren', label: 'Openstaande facturen bijhouden' },
  { value: 'btw-aangiften', label: 'Btw-aangifte' },
  { value: 'icp-opgaven', label: 'ICP-opgave' },
  { value: 'inzicht-cijfers', label: 'Periodiek inzicht in mijn cijfers' },
  { value: 'jaarafsluiting', label: 'Jaarafsluiting' },
  { value: 'jaarrekening', label: 'Jaarrekening' },
  { value: 'achterstanden', label: 'Een achterstand inhalen' },
  { value: 'overstappen', label: 'Overstappen van een ander kantoor of pakket' },
  { value: 'anders', label: 'Anders' },
];
