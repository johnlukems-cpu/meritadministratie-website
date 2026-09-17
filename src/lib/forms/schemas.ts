import { z } from 'zod';

/* Gedeelde velden ------------------------------------------------------------ */

const naam = z.string().trim().min(2, 'Vul uw naam in.').max(100, 'Maximaal 100 tekens.');
const bedrijfsnaam = z.string().trim().max(120, 'Maximaal 120 tekens.').optional();
const email = z.email('Vul een geldig e-mailadres in.').trim().max(200);
const telefoon = z
  .string()
  .trim()
  .max(30, 'Maximaal 30 tekens.')
  .refine((v) => v === '' || /^[+0-9()\s-]{6,}$/.test(v), 'Vul een geldig telefoonnummer in.')
  .optional();
const bericht = (min: number) =>
  z.string().trim().min(min, `Vul een bericht in van minimaal ${min} tekens.`).max(3000, 'Maximaal 3000 tekens.');
const optioneelBericht = z.string().trim().max(3000, 'Maximaal 3000 tekens.').optional();
const keuze = (melding: string) => z.string().min(1, melding);
const optioneelGetal = z
  .string()
  .trim()
  .refine((v) => v === '' || /^\d{1,7}$/.test(v), 'Vul een heel getal in.')
  .optional();
/** Honeypot: moet leeg blijven (bots vullen hem in) */
const honeypot = z.string().max(0).optional();

/* Schema's ------------------------------------------------------------------- */

export const contactSchema = z.object({
  naam,
  bedrijfsnaam,
  email,
  telefoon,
  onderwerp: keuze('Kies een onderwerp.'),
  bericht: bericht(10),
  website: honeypot,
});

export const offerteSchema = z.object({
  naam,
  bedrijfsnaam,
  email,
  telefoon,
  rechtsvorm: keuze('Kies een rechtsvorm.'),
  branche: keuze('Kies een branche.'),
  huidigeSituatie: keuze('Kies uw huidige situatie.'),
  /** Vooraf gekozen pakket (via /offerte?pakket=…), optioneel */
  pakket: z.string().trim().max(40).optional(),
  gewensteOndersteuning: z.array(z.string()).min(1, 'Kies minimaal één vorm van ondersteuning.'),
  transactiesPerMaand: optioneelGetal,
  verkoopfacturen: optioneelGetal,
  inkoopfacturen: optioneelGetal,
  bericht: optioneelBericht,
  privacyAkkoord: z.literal(true, 'U dient akkoord te gaan met het privacybeleid.'),
  website: honeypot,
});

export const kennismakingSchema = z.object({
  naam,
  bedrijfsnaam,
  email,
  telefoon,
  gewensteDienst: keuze('Kies een dienst.'),
  bericht: optioneelBericht,
  website: honeypot,
});

export type ContactValues = z.infer<typeof contactSchema>;
export type OfferteValues = z.infer<typeof offerteSchema>;
export type KennismakingValues = z.infer<typeof kennismakingSchema>;
