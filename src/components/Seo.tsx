import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { siteConfig } from '@/config/site';
import { useHeadCollector, type HeadData } from '@/lib/seo/head-context';
import { serializeJsonLd } from '@/lib/seo/render-head';

export interface SeoProps {
  /** Paginatitel zonder site-naam; wordt automatisch aangevuld met " | Merit Administratie" */
  title: string;
  description: string;
  /** Overschrijft de canonical (standaard: huidige route) */
  canonicalPath?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
  /** Titel exact gebruiken, zonder site-naam erachter (alleen homepage) */
  rawTitle?: boolean;
}

function buildHeadData(props: SeoProps, pathname: string): HeadData {
  const path = props.canonicalPath ?? pathname;
  const normalized = path === '/' ? '' : path.replace(/\/+$/, '');
  const ogImage = props.ogImage ?? siteConfig.ogImage;

  return {
    title: props.rawTitle ? props.title : `${props.title} | ${siteConfig.name}`,
    description: props.description,
    canonical: `${siteConfig.url}${normalized}`,
    ogImage: ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`,
    ogImageAlt: props.ogImageAlt ?? `${siteConfig.name} — ${siteConfig.tagline}`,
    ogType: props.ogType ?? 'website',
    noindex: props.noindex ?? false,
    jsonLd: props.jsonLd ?? [],
  };
}

/* --- Browser: <head> bijwerken bij navigatie -------------------------------- */

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
}

function applyHeadToDocument(head: HeadData) {
  document.title = head.title;
  upsertMeta('meta[name="description"]', { name: 'description', content: head.description });
  upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: head.canonical });
  upsertMeta('meta[name="robots"]', {
    name: 'robots',
    content: head.noindex ? 'noindex, nofollow' : 'index, follow',
  });
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: head.ogType });
  upsertMeta('meta[property="og:site_name"]', {
    property: 'og:site_name',
    content: siteConfig.name,
  });
  upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: siteConfig.locale });
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: head.title });
  upsertMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: head.description,
  });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: head.canonical });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: head.ogImage });
  upsertMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' });
  upsertMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' });
  upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: head.ogImageAlt });
  upsertMeta('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: 'summary_large_image',
  });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: head.title });
  upsertMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: head.description,
  });
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: head.ogImage });

  // JSON-LD: bestaande blokken vervangen
  document.head
    .querySelectorAll('script[type="application/ld+json"][data-seo]')
    .forEach((el) => el.remove());
  for (const item of head.jsonLd) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seo = 'true';
    script.text = serializeJsonLd(item);
    document.head.appendChild(script);
  }
}

/**
 * Per-pagina metadata. Gebruik bovenaan elke pagina:
 *   <Seo title="Diensten" description="..." />
 */
export function Seo(props: SeoProps) {
  const { pathname } = useLocation();
  const collector = useHeadCollector();
  const head = buildHeadData(props, pathname);

  // Prerender (server): metadata verzamelen tijdens render.
  if (collector && typeof document === 'undefined') {
    collector(head);
  }

  // Browser: <head> bijwerken na navigatie.
  useEffect(() => {
    applyHeadToDocument(head);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [head.title, head.description, head.canonical, head.ogImage, head.noindex]);

  return null;
}
