import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import { devAssetWriter } from './scripts/dev-asset-writer.ts';

/**
 * Base path van de site.
 * - Productie op het custom domain (https://meritadministratie.nl) → '/'.
 * - Tijdelijk op https://<gebruiker>.github.io/meritadministratie-website/ → '/meritadministratie-website/'.
 * De GitHub Actions-workflow zet VITE_BASE_PATH automatisch op basis van de Pages-instellingen
 * (leeg zodra het custom domain actief is). Lokaal is dit altijd '/'.
 */
const rawBase = process.env.VITE_BASE_PATH?.trim() || '/';
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), devAssetWriter()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    cssMinify: true,
    rolldownOptions: {
      output: {
        // React + router in een aparte, goed cachebare chunk
        codeSplitting: {
          groups: [{ name: 'vendor', test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/ }],
        },
      },
    },
  },
  ssr: {
    noExternal: ['lucide-react', '@fontsource-variable/inter'],
  },
});
