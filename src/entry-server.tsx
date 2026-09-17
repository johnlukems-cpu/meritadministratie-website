import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { HeadContext, type HeadData } from './lib/seo/head-context';
import { renderHeadHtml } from './lib/seo/render-head';
import { siteConfig } from './config/site';
import './styles/index.css';

/**
 * Wordt door scripts/prerender.mjs aangeroepen voor elke route.
 * Geeft de HTML van de app én de bijbehorende <head>-tags terug.
 */
export function render(url: string): { html: string; head: string } {
  let collected: HeadData | null = null;
  const collect = (data: HeadData) => {
    collected = data;
  };

  // Zelfde base path als de client (zie entry-client.tsx)
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={collect}>
        <StaticRouter location={`${basename}${url}`} basename={basename}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  );

  // TypeScript ziet de toewijzing in de callback niet; expliciet typen.
  const data = collected as HeadData | null;
  const head = data
    ? renderHeadHtml(data, siteConfig.name, siteConfig.locale)
    : `    <title>${siteConfig.name}</title>`;

  return { html, head };
}
