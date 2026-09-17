/**
 * Centrale site-configuratie.
 * Bedrijfsgegevens, contactinformatie en integratie-instellingen op één plek.
 *
 * Bronnen: KvK-uittreksel (KvK 42106520), Prijzenoverzicht 2026 en de ontwerpdocumenten
 * in de projectmap. Velden met `null` zijn nog niet bekend en worden NIET aan bezoekers getoond.
 */

export const siteConfig = {
  /** Merknaam zoals op de website getoond */
  name: 'MERIT Administratie & Advies',
  /** Korte naam (bijv. in de titel-suffix en het menu) */
  shortName: 'MERIT',
  /** Handelsnaam volgens KvK */
  legalName: 'Merit Administratie en Advies',
  tagline: 'Wij regelen de cijfers, u realiseert de groei.',
  /** Tweede positioneringszin (uit het prijzenoverzicht) */
  taglineSecondary: 'Uw financiële partner in AFAS.',
  description:
    'MERIT Administratie & Advies ondersteunt ondernemers en MKB-bedrijven met administratie, boekhouding, aangiften, jaarwerk en AFAS.',
  url: 'https://meritadministratie.nl',
  locale: 'nl_NL',
  language: 'nl',

  /** Oprichting (uit de ontwerpdocumenten) */
  founded: {
    year: 2026,
    city: 'Meerssen',
    /** Oprichter en eigenaar; één vast aanspreekpunt (KvK: 1 fulltime werkzame persoon) */
    founderName: 'Imro Plet',
  },

  contact: {
    email: 'info@meritadministratie.nl',
    /** Telefoonnummer (KvK-uittreksel). null = niet tonen. */
    phone: '06 43 64 11 78' as string | null,
    /** KvK-nummer (KvK-uittreksel). null = niet tonen. */
    kvk: '42106520' as string | null,
    /** BTW-NUMMER NOG INVULLEN — bijv. 'NL123456789B01'. null = niet tonen. */
    btw: null as string | null,
    /** Bezoek- en postadres (KvK-uittreksel). null = niet tonen. */
    address: {
      street: 'Frankenstraat 27',
      postalCode: '6231 AK',
      city: 'Meerssen',
      country: 'NL',
    } as { street: string; postalCode: string; city: string; country: string } | null,
    /** Openingstijden (vrije tekst), bijv. 'Ma–vr 09:00–17:00'. null = niet tonen. */
    openingHours: null as string | null,
  },

  /** Social media — vul een URL in om de link te tonen (nog niet bekend). */
  social: {
    linkedin: null as string | null,
    instagram: null as string | null,
    facebook: null as string | null,
    whatsapp: null as string | null,
  },

  /**
   * Aanvullende informatie voor de pagina "Over ons".
   * Alleen ingevulde velden worden getoond.
   */
  about: {
    teamText: null as string | null,
    locationText: null as string | null,
  },

  /** Topbar bovenaan de site. `enabled: false` verbergt de balk. */
  announcement: {
    enabled: true,
    text: 'Uw financiële partner in AFAS — plan vrijblijvend een kennismaking.',
    linkLabel: 'Plan een kennismaking',
    linkTo: '/kennismaking',
  },

  /** Integraties */
  integrations: {
    /** Boekhoudsoftware waarmee wordt gewerkt (getoond op de site) */
    software: ['AFAS'] as string[],
    /** Agenda-/boekingslink (bijv. Calendly of Microsoft Bookings). null = formulier gebruiken. */
    bookingUrl: null as string | null,
  },

  /** Prijzen — algemene voorwaarden bij alle tarieven (Prijzenoverzicht 2026) */
  pricing: {
    year: 2026,
    vatNote: 'Alle prijzen zijn vanaf-tarieven en exclusief 21% btw.',
    finalPriceNote:
      'Het definitieve tarief wordt afgestemd op de omvang en complexiteit van uw administratie: het aantal mutaties, administraties, medewerkers en de gewenste dienstverlening.',
    customQuoteNote: 'Voor meer dan 150 mutaties per maand maken wij een maatwerkvoorstel.',
  },

  /** Formulieren — zie ook .env.example en src/lib/forms/provider.ts */
  forms: {
    provider: (import.meta.env.VITE_FORM_PROVIDER as 'mailto' | 'webhook' | undefined) ?? 'mailto',
    endpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? '',
  },

  /** Analytics — leeg laten = geen tracking en geen cookiebanner nodig. */
  analytics: {
    /** Google Analytics 4 measurement-ID (G-…); wordt pas geladen na toestemming. */
    id: (import.meta.env.VITE_ANALYTICS_ID as string | undefined) ?? '',
  },

  /** Marketing-tracking — leeg laten = niets laden. */
  marketing: {
    /** Meta (Facebook) Pixel-ID; wordt pas geladen na toestemming. */
    metaPixelId: (import.meta.env.VITE_META_PIXEL_ID as string | undefined) ?? '',
  },

  /** Standaard Open Graph-afbeelding (1200×630) in /public */
  ogImage: '/og-image.png',
} as const;

export type SiteConfig = typeof siteConfig;
