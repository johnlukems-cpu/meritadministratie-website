/**
 * Centrale site-configuratie.
 * Bedrijfsgegevens, contactinformatie en integratie-instellingen op één plek.
 *
 * Bronnen: KvK-uittreksel (KvK 42106520), Mijn Belastingdienst Zakelijk (btw-nummer),
 * Prijzenoverzicht 2026 en de ontwerpdocumenten in de projectmap.
 * Velden met `null` zijn nog niet bekend en worden NIET aan bezoekers getoond.
 *
 * LET OP — niets in dit bestand mag worden verzonnen. Vul een veld alleen met een
 * waarde die uit een van de bovenstaande bronnen komt.
 */

import { SITE_URL } from './url';

export const siteConfig = {
  /** Merk- en handelsnaam zoals op de website getoond */
  name: 'MERIT Administratie & Support',
  /** Korte naam (bijv. in de titel-suffix en het menu) */
  shortName: 'MERIT',
  /**
   * Naam zoals die in het KvK-register staat. Dit is NIET de merknaam: de onderneming
   * handelt onder de naam in `name` hierboven. Wijzig dit veld uitsluitend nadat de
   * naam bij de KvK daadwerkelijk is gewijzigd — het wordt gebruikt in juridische
   * context (structured data, privacyverklaring, bedrijfsgegevens).
   */
  legalName: 'Merit Administratie en Advies',

  /* --- Positionering --------------------------------------------------------- */
  /** Centrale merkbelofte */
  tagline: 'Meer capaciteit. Minder administratieve druk. Meer ruimte voor uw klanten.',
  /** Tweede positioneringszin */
  taglineSecondary: 'Uw financiële backoffice- en AFAS-partner.',
  description:
    'MERIT Administratie & Support ondersteunt Nederlandse administratie- en accountantskantoren met financiële verwerking, btw-aangiften, jaarrekeningvoorbereiding, kwaliteitscontroles en procesverbetering.',

  /**
   * Voorkeursdomein (canonical). Dit MOET overeenkomen met de live productieconfiguratie.
   * De huidige productie-opzet gebruikt het apex-domein zonder "www": zie public/CNAME
   * en het Vercel-project. Wijzig dit uitsluitend samen met CNAME, de Vercel-domein-
   * instellingen, de sitemap, robots.txt en de redirects — anders ontstaan dubbele URL's.
   */
  url: SITE_URL,
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
    /** Btw-identificatienummer (Mijn Belastingdienst Zakelijk). null = niet tonen. */
    btw: 'NL005497990B94' as string | null,
    /** Bezoek- en postadres (KvK-uittreksel). null = niet tonen. */
    address: {
      street: 'Frankenstraat 27',
      postalCode: '6231 AK',
      city: 'Meerssen',
      country: 'NL',
    } as { street: string; postalCode: string; city: string; country: string } | null,
    /** Openingstijden (vrije tekst), bijv. 'Ma–vr 09:00–17:00'. null = niet tonen. */
    openingHours: null as string | null,
    /**
     * WhatsApp-nummer. `number` is het internationale nummer zonder plusteken,
     * spaties of leestekens — dat formaat verwacht wa.me. `display` is de
     * schrijfwijze voor bezoekers. Dit is nu hetzelfde nummer als `phone`;
     * het staat apart zodat WhatsApp later een eigen nummer kan krijgen.
     * null = geen WhatsApp-knop tonen.
     */
    whatsapp: {
      number: '31643641178',
      display: '06 43 64 11 78',
    } as { number: string; display: string } | null,
  },

  /** Social media — vul een URL in om de link te tonen (nog niet bekend). */
  social: {
    linkedin: null as string | null,
    instagram: null as string | null,
    facebook: null as string | null,
    whatsapp: null as string | null,
  },

  /**
   * Aanvullende informatie voor de pagina "Over MERIT".
   * Alleen ingevulde velden worden getoond; niets hiervan wordt verzonnen.
   */
  about: {
    teamText: null as string | null,
    locationText: null as string | null,
  },

  /** Topbar bovenaan de site. `enabled: false` verbergt de balk. */
  announcement: {
    enabled: false,
    text: 'Financiële backoffice en AFAS-ondersteuning voor administratie- en accountantskantoren.',
    linkLabel: 'Plan een kennismaking',
    linkTo: '/kennismaking',
  },

  /** Integraties */
  integrations: {
    /** Software waarmee gewerkt wordt (getoond op de site) */
    software: ['AFAS'] as string[],
    /** Agenda-/boekingslink (bijv. Calendly of Microsoft Bookings). null = formulier gebruiken. */
    bookingUrl: null as string | null,
  },

  /** Prijzen — algemene voorwaarden bij alle tarieven */
  pricing: {
    year: 2026,
    vatNote: 'Alle genoemde tarieven zijn exclusief 21% btw.',
    finalPriceNote:
      'Het definitieve tarief wordt afgestemd op de aard, omvang en complexiteit van de werkzaamheden en op de afspraken die wij met uw kantoor maken.',
    customQuoteNote:
      'Specialistische werkzaamheden, herstelopdrachten en automatiseringsprojecten worden afzonderlijk beoordeeld en geoffreerd.',
    /**
     * De uurtarieven en urenbundels voor administratie- en accountantskantoren zijn
     * intern bevestigd en gelden als definitief. Zet dit op `true` om op de
     * tarievenpagina weer een zichtbaar voorbehoud te tonen, bijvoorbeeld wanneer een
     * nieuwe tariefstructuur nog niet is vastgesteld.
     */
    kantorenTariffsProvisional: false,
  },

  /** Formulieren — zie ook src/lib/forms/provider.ts */
  forms: {
    provider: (import.meta.env.VITE_FORM_PROVIDER as 'api' | 'mailto' | 'webhook' | undefined) ?? 'api',
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
