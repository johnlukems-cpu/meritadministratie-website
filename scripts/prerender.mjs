/**
 * Prerender-script
 * -----------------------------------------------------------------------------
 * Rendert elke route uit src/config/routes.ts naar een statisch HTML-bestand
 * in dist/, inclusief per-pagina <head> (title, meta, canonical, OG, JSON-LD).
 *
 * Resultaat (per route twee bestanden, zodat GitHub Pages zowel /diensten als
 * /diensten/ zonder redirect kan serveren):
 *   dist/index.html
 *   dist/diensten.html  +  dist/diensten/index.html
 *   dist/diensten/administratie.html  +  dist/diensten/administratie/index.html
 *   ...
 *   dist/404.html   (GitHub Pages toont dit bij onbekende URL's)
 *
 * Vereist: `vite build` (client) en `vite build --ssr` (server) zijn al gedraaid.
 * Node ≥ 22.18 (leest routes.ts direct via native type-stripping).
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { routeList, redirects } = await import(pathToFileURL(join(root, 'src/config/routes.ts')).href);
const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);

const template = await readFile(join(distDir, 'index.html'), 'utf8');

if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
  throw new Error('index.html mist de <!--app-head--> of <!--app-html--> placeholder.');
}

function fill(html, head) {
  return template
    .replace('<!--app-head-->', head)
    .replace(/\s*<title>Merit Administratie<\/title>/, '') // fallback-title uit template weghalen
    .replace('<!--app-html-->', html);
}

const targets = [
  ...routeList.map((r) => ({
    url: r.path,
    files: r.path === '/' ? ['index.html'] : [`${r.path.slice(1)}.html`, `${r.path.slice(1)}/index.html`],
  })),
  { url: '/__404', files: ['404.html'] },
];

let count = 0;
for (const { url, files } of targets) {
  const { html, head } = render(url);
  const page = fill(html, head);
  for (const file of files) {
    const outPath = join(distDir, file);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, page, 'utf8');
    count++;
  }
  console.log(`  ✓ ${url}`);
}

// Oude paden: klein redirect-bestand (meta refresh + canonical naar het nieuwe pad).
// GitHub Pages kent geen server-side redirects; de router doet daarnaast een client-side Navigate.
const SITE_URL = 'https://meritadministratie.nl';
const basePath = (process.env.VITE_BASE_PATH ?? '').trim().replace(/\/$/, '');
let redirectCount = 0;
for (const [from, to] of Object.entries(redirects)) {
  const target = `${SITE_URL}${to}`;
  const href = `${basePath}${to}`;
  const html = `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=${href}" />
    <link rel="canonical" href="${target}" />
    <meta name="robots" content="noindex" />
    <title>Doorverwijzen…</title>
  </head>
  <body>
    <p>Deze pagina is verplaatst naar <a href="${href}">${target}</a>.</p>
  </body>
</html>
`;
  for (const file of [`${from.slice(1)}.html`, `${from.slice(1)}/index.html`]) {
    const outPath = join(distDir, file);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf8');
    redirectCount++;
  }
  console.log(`  ↪ ${from} → ${to}`);
}

// SSR-bundel is alleen nodig tijdens de build
await rm(ssrDir, { recursive: true, force: true });

console.log(`\nPrerender klaar: ${targets.length} routes, ${count} HTML-bestanden, ${redirectCount} redirect-bestanden.`);
