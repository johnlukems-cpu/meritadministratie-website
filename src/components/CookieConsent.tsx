import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { routes } from '@/config/routes';
import {
  activeCategories,
  subscribeOpenRequests,
  writeConsent,
  type ConsentState,
} from '@/lib/consent/consent';
import { registerIntegrations } from '@/lib/consent/integrations';
import { useConsentRequired, useConsentState } from '@/lib/consent/useConsent';

const categoryInfo = {
  analytics: {
    title: 'Analytische cookies',
    text: 'Helpen ons begrijpen hoe de website wordt gebruikt, zodat wij deze kunnen verbeteren.',
  },
  marketing: {
    title: 'Marketingcookies',
    text: 'Worden gebruikt om de effectiviteit van advertenties te meten en relevante content te tonen.',
  },
} as const;

const optionClass =
  'grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 rounded-md border border-default p-3 text-sm';
const checkboxClass = 'row-span-2 mt-0.5 size-4 accent-[var(--brand-primary)]';

// Integraties eenmalig registreren zodra de module in de browser laadt.
// Zonder ingevulde tracking-ID's registreert dit niets (→ geen banner).
if (typeof window !== 'undefined') registerIntegrations();

/**
 * Cookiebanner + voorkeuren. Verschijnt alleen als er daadwerkelijk scripts zijn
 * geregistreerd die toestemming vereisen (zie lib/consent/integrations.ts) en de
 * bezoeker nog geen keuze heeft gemaakt. Zonder tracking-ID's is de banner onzichtbaar.
 */
export function CookieConsent() {
  const required = useConsentRequired();
  const state = useConsentState();
  const [dismissed, setDismissed] = useState(false);
  const [forcedOpen, setForcedOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);

  // Externe trigger ("Cookie-instellingen") — externe gebeurtenis → setState in callback is toegestaan
  useEffect(() => {
    return subscribeOpenRequests(() => {
      setShowPrefs(true);
      setForcedOpen(true);
      setDismissed(false);
    });
  }, []);

  const open = required && !dismissed && (forcedOpen || !state.decidedAt);
  if (!open) return null;

  const categories = activeCategories();
  const decide = (next: Pick<ConsentState, 'analytics' | 'marketing'>) => {
    writeConsent(next);
    setForcedOpen(false);
    setShowPrefs(false);
    setDismissed(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-text"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-xl border border-default bg-surface p-5 shadow-lg sm:p-6"
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary"
        >
          <Cookie className="size-5" />
        </span>
        <div className="flex-1">
          <p id="cookie-title" className="font-semibold text-primary">
            Cookies op deze website
          </p>
          <p id="cookie-text" className="mt-1 text-sm text-muted">
            Wij gebruiken noodzakelijke cookies voor een goed werkende website. Met uw toestemming
            gebruiken wij ook cookies voor statistieken en/of marketing. Lees meer in ons{' '}
            <Link to={routes.cookies.path} className="underline underline-offset-4 hover:text-primary">
              cookiebeleid
            </Link>
            .
          </p>

          {showPrefs ? (
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                decide({
                  analytics: categories.includes('analytics') && fd.get('analytics') === 'on',
                  marketing: categories.includes('marketing') && fd.get('marketing') === 'on',
                });
              }}
            >
              <label className={optionClass}>
                <input type="checkbox" checked disabled readOnly className={checkboxClass} />
                <span className="font-medium text-text">Noodzakelijke cookies</span>
                <span className="col-start-2 text-muted">
                  Altijd actief; nodig voor de basisfuncties van de website.
                </span>
              </label>
              {categories.map((cat) => (
                <label key={cat} className={optionClass}>
                  <input type="checkbox" name={cat} defaultChecked={state[cat]} className={checkboxClass} />
                  <span className="font-medium text-text">{categoryInfo[cat].title}</span>
                  <span className="col-start-2 text-muted">{categoryInfo[cat].text}</span>
                </label>
              ))}
              <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                <Button type="submit" size="sm">
                  Voorkeuren opslaan
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => decide({ analytics: false, marketing: false })}
                >
                  Alleen noodzakelijk
                </Button>
              </div>
            </form>
          ) : (
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button
                size="sm"
                onClick={() =>
                  decide({
                    analytics: categories.includes('analytics'),
                    marketing: categories.includes('marketing'),
                  })
                }
              >
                Alles accepteren
              </Button>
              <Button size="sm" variant="outline" onClick={() => decide({ analytics: false, marketing: false })}>
                Alleen noodzakelijk
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowPrefs(true)}>
                Voorkeuren
              </Button>
            </div>
          )}
        </div>
        {state.decidedAt && (
          <button
            type="button"
            onClick={() => {
              setDismissed(true);
              setForcedOpen(false);
            }}
            aria-label="Sluiten"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted hover:bg-surface-alt hover:text-primary"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        )}
      </div>
    </div>
  );
}
