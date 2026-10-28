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

/* --- Type organisatie (primair onderscheid kantoor vs. mkb) ------------------ */

export const organisatieTypes: SelectOption[] = [
  { value: 'administratiekantoor', label: 'Administratiekantoor' },
  { value: 'accountantskantoor', label: 'Accountantskantoor' },
  { value: 'mkb-onderneming', label: 'Mkb-onderneming' },
  { value: 'anders', label: 'Anders' },
];

/* --- Gewenste dienst --------------------------------------------------------- */
/** Waarden gelijk aan de dienst-id's in src/data/services.ts, plus mkb en anders. */
export const gewensteDiensten: SelectOption[] = [
  { value: 'financial-backoffice', label: 'Financial Backoffice' },
  { value: 'btw-aangiften', label: 'Btw-aangiften' },
  { value: 'jaarrekeningen', label: 'Jaarrekeningen & Jaarafsluiting' },
  { value: 'afas-software-support', label: 'AFAS & Software Support' },
  { value: 'finance-control', label: 'Finance Control' },
  { value: 'automatisering', label: 'Automatisering' },
  { value: 'mkb-administratie', label: 'Mkb-administratie' },
  { value: 'anders', label: 'Anders' },
];

/* --- Gewenst aantal uren per maand (optioneel) ------------------------------- */

export const urenPerMaand: SelectOption[] = [
  { value: '1-10', label: '1 – 10 uur per maand' },
  { value: '10-20', label: '10 – 20 uur per maand' },
  { value: '20-40', label: '20 – 40 uur per maand' },
  { value: '40-80', label: '40 – 80 uur per maand' },
  { value: '80-plus', label: 'Meer dan 80 uur per maand' },
  { value: 'eenmalig-project', label: 'Eenmalig project, geen vaste uren' },
  { value: 'nog-niet-bekend', label: 'Nog niet bekend' },
];

/* --- Gewenste startdatum (optioneel) ---------------------------------------- */

export const startMomenten: SelectOption[] = [
  { value: 'zo-snel-mogelijk', label: 'Zo snel mogelijk' },
  { value: 'binnen-1-maand', label: 'Binnen een maand' },
  { value: 'binnen-3-maanden', label: 'Binnen drie maanden' },
  { value: 'komende-aangifteperiode', label: 'Voor de komende aangifteperiode' },
  { value: 'komende-jaarafsluiting', label: 'Voor de komende jaarafsluiting' },
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
  { value: 'btw-aangiften', label: 'Btw-aangiften' },
  { value: 'jaarrekeningen', label: 'Jaarrekeningen & Jaarafsluiting' },
  { value: 'financial-backoffice', label: 'Financial Backoffice' },
  { value: 'afas-software-support', label: 'AFAS & Software Support' },
  { value: 'finance-control', label: 'Finance Control' },
  { value: 'automatisering', label: 'Automatisering' },
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
  { value: 'administratiekantoor', label: 'Administratiekantoor' },
  { value: 'accountantskantoor', label: 'Accountantskantoor' },
  { value: 'belastingadvies', label: 'Belastingadvies' },
  { value: 'zakelijke-dienstverlening', label: 'Zakelijke dienstverlening' },
  { value: 'bouw-techniek', label: 'Bouw en techniek' },
  { value: 'ict', label: 'ICT en software' },
  { value: 'retail-webshop', label: 'Retail of webshop' },
  { value: 'transport-logistiek', label: 'Transport en logistiek' },
  { value: 'zorg-welzijn', label: 'Zorg en welzijn' },
  { value: 'anders', label: 'Anders' },
];

export const huidigeSituaties: SelectOption[] = [
  { value: 'eigen-team', label: 'Wij voeren de werkzaamheden nu met eigen medewerkers uit' },
  { value: 'besteedt-al-uit', label: 'Wij besteden al werkzaamheden uit aan een andere partij' },
  { value: 'achterstanden', label: 'Wij hebben achterstanden die moeten worden ingelopen' },
  { value: 'piekbelasting', label: 'Wij zoeken capaciteit voor piekperioden' },
  { value: 'vacature', label: 'Wij hebben een openstaande vacature' },
  { value: 'anders', label: 'Anders' },
];

/** Meervoudige keuze: welke werkzaamheden wilt u uitbesteden? */
export const gewensteOndersteuning: SelectOption[] = [
  { value: 'financiele-verwerking', label: 'Financiële verwerking (facturen, bank)' },
  { value: 'debiteuren-crediteuren', label: 'Debiteuren- en crediteurenbeheer' },
  { value: 'grootboekcontroles', label: 'Grootboekcontroles en aansluitingen' },
  { value: 'btw-aangiften', label: 'Btw-aangiften voorbereiden' },
  { value: 'icp-opgaven', label: 'ICP-opgaven voorbereiden' },
  { value: 'maandafsluiting', label: 'Maandafsluiting' },
  { value: 'jaarafsluiting', label: 'Jaarafsluiting en balansdossiers' },
  { value: 'jaarrekening-voorbereiding', label: 'Jaarrekening voorbereiden' },
  { value: 'achterstanden', label: 'Administratieve achterstanden wegwerken' },
  { value: 'afas-support', label: 'AFAS- of softwareondersteuning' },
  { value: 'finance-control', label: 'Finance Control en kwaliteitscontroles' },
  { value: 'automatisering', label: 'Procesverbetering of automatisering' },
  { value: 'mkb-administratie', label: 'Mkb-administratie' },
  { value: 'anders', label: 'Anders' },
];
