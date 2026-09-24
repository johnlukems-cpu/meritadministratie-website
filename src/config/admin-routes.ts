/**
 * Routes van het admin-gedeelte (MERIT Content Studio).
 *
 * BEWUST GESCHEIDEN van src/config/routes.ts: die lijst voedt het prerender-script,
 * de sitemap en de navigatie van de publieke website. Admin-routes horen daar niet
 * in thuis — ze worden niet geprerenderd, niet in de sitemap opgenomen en in
 * robots.txt uitgesloten. Vercel serveert ze via een rewrite naar admin.html
 * (zie vercel.json en scripts/prerender.mjs).
 */

export const ADMIN_BASE = '/admin';

export const adminRoutes = {
  dashboard: `${ADMIN_BASE}/content`,
  nieuw: `${ADMIN_BASE}/content/nieuw`,
  kalender: `${ADMIN_BASE}/content/kalender`,
  /** Detailpagina; gebruik adminContentPath(id) voor een concrete link */
  detail: `${ADMIN_BASE}/content/:id`,
} as const;

export function adminContentPath(id: string): string {
  return `${ADMIN_BASE}/content/${encodeURIComponent(id)}`;
}
