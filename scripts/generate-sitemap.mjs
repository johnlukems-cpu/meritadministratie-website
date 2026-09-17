/**
 * Genereert dist/sitemap.xml op basis van src/config/routes.ts.
 * Draait na het prerenderen (zie `npm run build`).
 */
import { writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { routeList } = await import(pathToFileURL(join(root, 'src/config/routes.ts')).href);

const SITE_URL = 'https://meritadministratie.nl';
const today = new Date().toISOString().slice(0, 10);

const urls = routeList
  .filter((r) => !r.noindex)
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile(join(root, 'dist', 'sitemap.xml'), xml, 'utf8');
console.log(`Sitemap: ${routeList.length} URL's → dist/sitemap.xml`);
