import { z } from 'zod';

/* Gedeelde velden ------------------------------------------------------------ */

const naam = z.string().trim().min(2, 'Vul uw naam in.').max(100, 'Maximaal 100 tekens.');
const verplichteBedrijfsnaam = z
  .string()
  .trim()
  .min(2, 'Vul de naam van uw organisatie in.')
  .max(120, 'Maximaal 120 tekens.');
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
/** Optionele keuzelijst: mag leeg blijven. */
const optioneleKeuze = z.string().trim().max(40).optional();
const optioneelGetal = z
  .string()
  .trim()
  .refine((v) => v === '' || /^\d{1,7}$/.test(v), 'Vul een heel getal in.')
  .optional();
/** Honeypot: moet leeg blijven (bots vullen hem in) */
const honeypot = z.string().max(0).optional();

/* Schema's ------------------------------------------------------------------- */

/**
 * Contactformulier. Bevat de velden uit het ontwerp: naam, bedrijfsnaam, e-mail,
 * telefoon (optioneel), type organisatie, gewenste dienst, gewenst aantal uren per
 * maand (optioneel), gewenste startdatum (optioneel) en bericht.
 */
export const contactSchema = z.object({
  naam,
  bedrijfsnaam: verplichteBedrijfsnaam,
  email,
  telefoon,
  organisatieType: keuze('Kies het type organisatie.'),
  gewensteDienst: keuze('Kies de gewenste dienst.'),
  urenPerMaand: optioneleKeuze,
  gewensteStart: optioneleKeuze,
  bericht: bericht(10),
  website: honeypot,
});

/**
 * Offerte- en prijsvoorstelaanvraag. Dit is een AANVRAAGformulier, geen prijsberekening:
 * de prijs wordt pas vastgesteld nadat wij de werkzaamheden hebben beoordeeld.
 */
export const offerteSchema = z.object({
  naam,
  bedrijfsnaam: verplichteBedrijfsnaam,
  email,
  telefoon,
  gewensteDienst: keuze('Kies de gewenste dienst.'),
  /** Vooraf gekozen bundel of pakket (via /offerte?pakket=…), optioneel */
  pakket: z.string().trim().max(80, 'Maximaal 80 tekens.').optional(),
  aantalAdministraties: optioneelGetal,
  boekhoudsoftware: z.string().trim().max(80, 'Maximaal 80 tekens.').optional(),
  periode: z.string().trim().max(120, 'Maximaal 120 tekens.').optional(),
  omschrijving: bericht(10),
  privacyAkkoord: z.literal(true, 'U dient akkoord te gaan met het privacybeleid.'),
  website: honeypot,
});

export const kennismakingSchema = z.object({
  naam,
  bedrijfsnaam: verplichteBedrijfsnaam,
  email,
  telefoon,
  organisatieType: keuze('Kies het type organisatie.'),
  gewensteDienst: keuze('Kies een dienst.'),
  urenPerMaand: optioneleKeuze,
  gewensteStart: optioneleKeuze,
  bericht: optioneelBericht,
  website: honeypot,
});

export type ContactValues = z.infer<typeof contactSchema>;
export type OfferteValues = z.infer<typeof offerteSchema>;
export type KennismakingValues = z.infer<typeof kennismakingSchema>;

/** Velden die als checkbox (true/false) worden gelezen — zie useForm. */
export const booleanFields = { offerte: ['privacyAkkoord'] } as const;
