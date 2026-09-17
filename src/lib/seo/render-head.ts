import type { HeadData } from './head-context';

/** Escapet tekst voor gebruik in HTML-attributen en tekstnodes. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** JSON-LD veilig inline zetten (voorkomt </script>-injectie). */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * Zet HeadData om naar statische <head>-HTML.
 * Wordt gebruikt door het prerender-script.
 */
export function renderHeadHtml(head: HeadData, siteName: string, locale: string): string {
  const tags: string[] = [
    `<title>${escapeHtml(head.title)}</title>`,
    `<meta name="description" content="${escapeHtml(head.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(head.canonical)}" />`,
    `<meta name="robots" content="${head.noindex ? 'noindex, nofollow' : 'index, follow'}" />`,
    `<meta property="og:type" content="${head.ogType}" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteName)}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:title" content="${escapeHtml(head.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(head.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(head.ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(head.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(head.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(head.ogImage)}" />`,
  ];

  for (const item of head.jsonLd) {
    // data-seo: zodat <Seo> in de browser deze blokken herkent en vervangt (geen duplicaten)
    tags.push(`<script type="application/ld+json" data-seo="true">${serializeJsonLd(item)}</script>`);
  }

  return tags.map((t) => `    ${t}`).join('\n');
}
