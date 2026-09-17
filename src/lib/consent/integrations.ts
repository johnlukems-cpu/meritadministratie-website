/**
 * TOEKOMSTIGE TRACKING-INTEGRATIES
 * -----------------------------------------------------------------------------
 * Hier registreren we niet-noodzakelijke scripts. Elk script wordt PAS geladen
 * nadat de bezoeker de bijbehorende categorie heeft toegestaan (zie consent.ts).
 *
 * Activeren: vul de bijbehorende omgevingsvariabele in (.env / GitHub Variables):
 *   VITE_ANALYTICS_ID   → Google Analytics 4 (bijv. G-XXXXXXXXXX)  [analytics]
 *   VITE_META_PIXEL_ID  → Meta (Facebook) Pixel                   [marketing]
 *
 * Zolang een ID leeg is, wordt niets geregistreerd, verschijnt er geen
 * cookiebanner voor die categorie en worden er geen cookies geplaatst.
 */
import { siteConfig } from '@/config/site';
import { registerConsentScript } from './consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function injectScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const el = document.createElement('script');
  el.id = id;
  el.async = true;
  el.src = src;
  document.head.appendChild(el);
}

export function registerIntegrations() {
  if (typeof window === 'undefined') return;

  const gaId = siteConfig.analytics.id;
  if (gaId) {
    registerConsentScript({
      id: 'ga4',
      category: 'analytics',
      load: () => {
        window.dataLayer = window.dataLayer ?? [];
        window.gtag = function gtag(...args: unknown[]) {
          window.dataLayer!.push(args);
        };
        window.gtag('js', new Date());
        window.gtag('config', gaId, { anonymize_ip: true });
        injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`, 'ga4-script');
      },
    });
  }

  const pixelId = siteConfig.marketing.metaPixelId;
  if (pixelId) {
    registerConsentScript({
      id: 'meta-pixel',
      category: 'marketing',
      load: () => {
        // Standaard Meta Pixel-bootstrap, geladen na toestemming.
        if (window.fbq) return;
        type Fbq = ((...args: unknown[]) => void) & {
          queue: unknown[];
          loaded: boolean;
          version: string;
        };
        const queue: unknown[] = [];
        const fbq = Object.assign(
          (...args: unknown[]) => {
            queue.push(args);
          },
          { queue, loaded: true, version: '2.0' },
        ) as Fbq;
        window.fbq = fbq;
        window._fbq = fbq;
        injectScript('https://connect.facebook.net/en_US/fbevents.js', 'meta-pixel-script');
        fbq('init', pixelId);
        fbq('track', 'PageView');
      },
    });
  }
}
