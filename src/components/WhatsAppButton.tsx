import { siteConfig } from '@/config/site';
import { whatsappUrl } from '@/lib/whatsapp';

/** Het WhatsApp-beeldmerk. Lucide heeft geen merklogo's, dus als inline pad. */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 5.82 2.41 8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}

/**
 * Zwevende WhatsApp-knop, rechtsonder op iedere publieke pagina.
 *
 * Positionering
 * - `bottom`/`right` houden rekening met de veilige zone van telefoons met een
 *   afgeronde rand of een home-indicator (`env(safe-area-inset-*)`).
 * - Zolang de cookiebanner open staat, schuift de knop omhoog over de gemeten
 *   hoogte van die banner (`--cookie-banner-height`, gezet door CookieConsent),
 *   zodat beide elkaar nooit overlappen.
 * - z-index 40 ligt onder de cookiebanner (50) en onder het mobiele menu, en
 *   boven de pagina-inhoud.
 */
export function WhatsAppButton() {
  const { whatsapp } = siteConfig.contact;
  if (!whatsapp) return null;

  const label = 'Neem contact op via WhatsApp';

  return (
    <a
      href={whatsappUrl(whatsapp.number)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      data-whatsapp-button=""
      className="whatsapp-fab"
    >
      <WhatsAppGlyph className="size-7" />
    </a>
  );
}
