/**
 * Eén bron van waarheid voor alle publieke routes.
 * Wordt gebruikt door: de router, de navigatie, het prerender-script en de sitemap.
 *
 * Let op: dit bestand bevat GEEN React-imports, zodat Node-scripts het ook kunnen lezen.
 */

export interface RouteMeta {
  /** Pad zoals in de URL, altijd beginnend met '/' */
  path: string;
  /** Interne naam (voor navigatie en breadcrumbs) */
  label: string;
  /** Sitemap-prioriteit 0.0–1.0 */
  priority: number;
  /** Sitemap changefreq */
  changefreq: 'weekly' | 'monthly' | 'yearly';
  /** Uitsluiten van sitemap */
  noindex?: boolean;
}

export const routes = {
  home: { path: '/', label: 'Home', priority: 1.0, changefreq: 'weekly' },

  /* --- Doelgroepen ---------------------------------------------------------- */
  voorKantoren: {
    path: '/voor-accountantskantoren',
    label: 'Voor administratie- en accountantskantoren',
    priority: 0.95,
    changefreq: 'monthly',
  },
  voorMkb: {
    path: '/voor-mkb',
    label: 'Voor mkb-ondernemingen',
    priority: 0.8,
    changefreq: 'monthly',
  },

  /* --- Diensten ------------------------------------------------------------- */
  diensten: { path: '/diensten', label: 'Diensten', priority: 0.9, changefreq: 'monthly' },
  financialBackoffice: {
    path: '/diensten/financial-backoffice',
    label: 'Financial Backoffice',
    priority: 0.9,
    changefreq: 'monthly',
  },
  btwAangiften: {
    path: '/diensten/btw-aangiften',
    label: 'Btw-aangiften',
    priority: 0.9,
    changefreq: 'monthly',
  },
  jaarrekeningen: {
    path: '/diensten/jaarrekeningen-jaarafsluiting',
    label: 'Jaarrekeningen & Jaarafsluiting',
    priority: 0.9,
    changefreq: 'monthly',
  },
  afasSupport: {
    path: '/diensten/afas-software-support',
    label: 'AFAS & Software Support',
    priority: 0.85,
    changefreq: 'monthly',
  },
  financeControl: {
    path: '/diensten/finance-control',
    label: 'Finance Control',
    priority: 0.85,
    changefreq: 'monthly',
  },
  automatisering: {
    path: '/diensten/automatisering',
    label: 'Automatisering',
    priority: 0.85,
    changefreq: 'monthly',
  },

  /* --- Tarieven & bedrijf --------------------------------------------------- */
  tarieven: { path: '/tarieven', label: 'Tarieven', priority: 0.95, changefreq: 'monthly' },
  overMerit: { path: '/over-ons', label: 'Over MERIT', priority: 0.7, changefreq: 'monthly' },
  faq: { path: '/faq', label: 'Veelgestelde vragen', priority: 0.7, changefreq: 'monthly' },

  /* --- Conversie ------------------------------------------------------------ */
  contact: { path: '/contact', label: 'Contact', priority: 0.85, changefreq: 'monthly' },
  kennismaking: {
    path: '/kennismaking',
    label: 'Plan een kennismaking',
    priority: 0.9,
    changefreq: 'monthly',
  },
  offerte: { path: '/offerte', label: 'Offerte aanvragen', priority: 0.85, changefreq: 'monthly' },

  /* --- Juridisch ------------------------------------------------------------ */
  privacy: {
    path: '/privacy-policy',
    label: 'Privacyverklaring',
    priority: 0.2,
    changefreq: 'yearly',
  },
  cookies: { path: '/cookiebeleid', label: 'Cookiebeleid', priority: 0.2, changefreq: 'yearly' },
} as const satisfies Record<string, RouteMeta>;

export type RouteKey = keyof typeof routes;

/**
 * Oude paden die permanent doorverwijzen naar de nieuwe.
 *
 * Deze tabel wordt op drie plaatsen gebruikt:
 *   1. de router (client-side <Navigate replace />);
 *   2. scripts/prerender.mjs (statisch redirect-bestand met canonical, als fallback);
 *   3. vercel.json → "redirects" (echte HTTP 301). Houd die lijst gelijk aan deze.
 *
 * Alle paden hieronder bestonden op de live website; ze blijven bereikbaar zodat
 * bestaande links, bookmarks en zoekresultaten niet doodlopen.
 */
export const redirects: Record<string, string> = {
  /* Verouderde juridische paden (bestonden al vóór deze herbouw) */
  '/privacy': routes.privacy.path,
  '/cookies': routes.cookies.path,

  /* Herpositionering: oude dienst- en doelgroeppaden → nieuwe structuur */
  '/pakketten': routes.tarieven.path,
  '/afas': routes.afasSupport.path,
  '/voor-ondernemers': routes.voorMkb.path,
  '/diensten/administratie': routes.financialBackoffice.path,
  '/diensten/belastingaangifte': routes.btwAangiften.path,
  '/diensten/startende-ondernemers': routes.voorMkb.path,
  '/diensten/overstappen': routes.financialBackoffice.path,
};

/** Alle paden als platte lijst (voor prerender & sitemap) */
export const routeList: RouteMeta[] = Object.values(routes);

/** Handige helper: pad opvragen op basis van sleutel */
export const to = (key: RouteKey): string => routes[key].path;
