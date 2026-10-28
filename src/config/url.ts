/**
 * Het voorkeursdomein (canonical origin) van de website.
 *
 * Dit bestand bevat bewust GEEN imports en geen `import.meta.env`, zodat zowel de
 * browserbundel als de Node-scripts (scripts/prerender.mjs en
 * scripts/generate-sitemap.mjs) het kunnen inlezen. Zo staat de canonical URL op
 * één plek en kunnen sitemap, canonicals en redirects niet uit elkaar lopen.
 *
 * LET OP — wijzig dit uitsluitend samen met:
 *   - public/CNAME
 *   - public/robots.txt (de Sitemap-regel)
 *   - de domeininstellingen van het Vercel-project
 * De huidige productie-opzet gebruikt het apex-domein zonder "www".
 */
export const SITE_URL = 'https://meritadministratie.nl';
