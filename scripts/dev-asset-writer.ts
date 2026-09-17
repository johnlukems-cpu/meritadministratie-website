/**
 * DEV-ONLY Vite-plugin: ontvangt door de browser gegenereerde PNG's (OG-image,
 * icons) en schrijft ze naar public/. Gebruikt door scripts/assets/generate.html.
 *
 * Alleen actief bij `vite` (dev-server), nooit in de productie-build.
 * Bestandsnamen zijn beperkt tot een vaste lijst.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import type { Plugin } from 'vite';

const ALLOWED = new Set([
  'og-image.png',
  'icon-192.png',
  'icon-512.png',
  'apple-touch-icon.png',
  'favicon-32.png',
  'favicon-16.png',
  'favicon.ico',
  // Logo-varianten, afgeleid van het originele logo (src/assets/brand/merit-logo-origineel.jpg)
  'brand/logo-merit.png',
  'brand/logo-merit-wit.png',
  'brand/logo-merit-staand.png',
  'brand/logo-merit-embleem.png',
]);

export function devAssetWriter(): Plugin {
  return {
    name: 'merit:dev-asset-writer',
    apply: 'serve',
    configureServer(server) {
      const publicDir = resolve(server.config.root, 'public');
      server.middlewares.use('/__dev/save-asset', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }
        let body = '';
        req.on('data', (chunk: Buffer) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const { name, base64 } = JSON.parse(body) as { name: string; base64: string };
            if (!ALLOWED.has(name)) throw new Error(`Bestandsnaam niet toegestaan: ${name}`);
            const target = join(publicDir, name);
            mkdirSync(dirname(target), { recursive: true });
            writeFileSync(target, Buffer.from(base64, 'base64'));
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, path: `public/${name}` }));
          } catch (err) {
            res.statusCode = 400;
            res.end(String(err));
          }
        });
      });
    },
  };
}
