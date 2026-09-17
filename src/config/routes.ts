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
  diensten: { path: '/diensten', label: 'Diensten', priority: 0.9, changefreq: 'monthly' },
  administratie: {
    path: '/diensten/administratie',
    label: 'Administratie',
    priority: 0.8,
    changefreq: 'monthly',
  },
  belastingaangifte: {
    path: '/diensten/belastingaangifte',
    label: 'Belastingaangifte',
    priority: 0.8,
    changefreq: 'monthly',
  },
  startendeOndernemers: {
    path: '/diensten/startende-ondernemers',
    label: 'Startende ondernemers',
    priority: 0.8,
    changefreq: 'monthly',
  },
  overstappen: {
    path: '/diensten/overstappen',
    label: 'Overstappen van boekhouder',
    priority: 0.8,
    changefreq: 'monthly',
  },
  pakketten: { path: '/pakketten', label: 'Pakketten', priority: 0.9, changefreq: 'monthly' },
  afas: { path: '/afas', label: 'AFAS', priority: 0.9, changefreq: 'monthly' },
  voorOndernemers: {
    path: '/voor-ondernemers',
    label: 'Voor ondernemers',
    priority: 0.8,
    changefreq: 'monthly',
  },
  overOns: { path: '/over-ons', label: 'Over ons', priority: 0.7, changefreq: 'monthly' },
  faq: { path: '/faq', label: 'Veelgestelde vragen', priority: 0.7, changefreq: 'monthly' },
  contact: { path: '/contact', label: 'Contact', priority: 0.8, changefreq: 'monthly' },
  offerte: { path: '/offerte', label: 'Offerte aanvragen', priority: 0.8, changefreq: 'monthly' },
  kennismaking: {
    path: '/kennismaking',
    label: 'Kennismaking',
    priority: 0.9,
    changefreq: 'monthly',
  },
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
 * Prerender maakt hiervoor een redirect-HTML; de router gebruikt <Navigate replace />.
 */
export const redirects: Record<string, string> = {
  '/privacy': routes.privacy.path,
  '/cookies': routes.cookies.path,
};

/** Alle paden als platte lijst (voor prerender & sitemap) */
export const routeList: RouteMeta[] = Object.values(routes);

/** Handige helper: pad opvragen op basis van sleutel */
export const to = (key: RouteKey): string => routes[key].path;
