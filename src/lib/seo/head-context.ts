import { createContext, useContext } from 'react';

/**
 * Metadata die per pagina wordt vastgelegd.
 * - In de browser: <Seo> schrijft dit naar document.head (title, meta, canonical, JSON-LD).
 * - Bij prerenderen: <Seo> geeft dit door aan de HeadCollector; het prerender-script
 *   schrijft het in de <head> van de statische HTML.
 */
export interface HeadData {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogImageAlt: string;
  ogType: 'website' | 'article';
  noindex: boolean;
  jsonLd: Record<string, unknown>[];
}

/** Callback waarmee <Seo> tijdens server-render de metadata afgeeft. */
export type HeadCollector = (data: HeadData) => void;

export const HeadContext = createContext<HeadCollector | null>(null);

export const useHeadCollector = () => useContext(HeadContext);
