/**
 * DEV-ONLY Vite-plugin: laat de admin-endpoints uit api/admin/ meedraaien tijdens
 * `npm run dev`, zodat de MERIT Content Studio ook lokaal werkt.
 *
 * Alleen actief bij `vite` (dev-server) — `apply: 'serve'` — en dus NOOIT in de
 * productie-build. Op Vercel draaien dezelfde bestanden als serverless functies;
 * deze plugin voegt niets toe en verandert niets aan hun gedrag.
 *
 * Lokaal instellen: zet ADMIN_PASSWORD en ADMIN_SESSION_SECRET in .env
 * (dat bestand wordt niet gecommit). Zonder die variabelen toont de studio
 * dezelfde "nog niet geconfigureerd"-melding als op Vercel.
 */
import type { IncomingMessage, ServerResponse } from 'node:http';
import { loadEnv, type Plugin } from 'vite';

/**
 * Server-side variabelen uit .env in process.env zetten. Vite geeft standaard
 * alleen VITE_*-variabelen door aan de browser; deze blijven dus server-side.
 */
const SERVER_ENV = [
  'ADMIN_PASSWORD',
  'ADMIN_SESSION_SECRET',
  'ADMIN_SESSION_HOURS',
  'KV_REST_API_URL',
  'KV_REST_API_TOKEN',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
];

type Handler = (req: IncomingMessage, res: ServerResponse) => Promise<void> | void;

/**
 * Pad (na /api/admin) → modulebestand. Zelfde indeling als op Vercel.
 * De paden beginnen met '/' en zijn daarmee relatief aan de projectroot
 * (dat verwacht server.ssrLoadModule).
 */
const ROUTES: Array<{ match: RegExp; module: string }> = [
  { match: /^\/session\/?$/, module: '/api/admin/session.ts' },
  { match: /^\/content\/generate\/?$/, module: '/api/admin/content/generate.ts' },
  { match: /^\/content\/[^/]+\/?$/, module: '/api/admin/content/[id].ts' },
  { match: /^\/content\/?$/, module: '/api/admin/content.ts' },
];

export function devAdminApi(): Plugin {
  return {
    name: 'merit:dev-admin-api',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.root, '');
      for (const name of SERVER_ENV) {
        if (!process.env[name] && env[name]) process.env[name] = env[name];
      }

      server.middlewares.use('/api/admin', (req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost');
        const route = ROUTES.find((entry) => entry.match.test(url.pathname));
        if (!route) {
          next();
          return;
        }
        // De handlers lezen req.url voor de id; geef het volledige pad mee.
        const original = req.url;
        req.url = `/api/admin${original ?? ''}`;

        void server
          .ssrLoadModule(route.module)
          .then(async (mod) => {
            const handler = (mod as { default: Handler }).default;
            await handler(req, res);
          })
          .catch((error: unknown) => {
            server.config.logger.error(
              `[dev-admin-api] ${route.module}: ${error instanceof Error ? error.message : String(error)}`,
            );
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ ok: false, error: 'Fout in de lokale admin-API (zie terminal).' }));
          });
      });
    },
  };
}
