/**
 * COOKIE CONSENT — kern (framework-onafhankelijk)
 * -----------------------------------------------------------------------------
 * - Categorieën: necessary (altijd), analytics, marketing.
 * - Keuze wordt lokaal bewaard (localStorage) en is per bezoeker.
 * - Niet-noodzakelijke scripts registreren zich via `registerConsentScript()` en
 *   worden pas geladen nadat de bezoeker de bijbehorende categorie heeft toegestaan.
 * - Een externe CMP (bijv. Cookiebot, CookieYes) kan later dit bestand vervangen:
 *   behoud de exports `readConsent`, `writeConsent`, `subscribe`, `registerConsentScript`.
 */

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  /** ISO-datum van de keuze; null = nog niet gekozen */
  decidedAt: string | null;
  /** Versie van het cookiebeleid waarop de keuze is gebaseerd; verhoog bij wijziging → opnieuw vragen */
  version: number;
}

export const CONSENT_VERSION = 1;
const STORAGE_KEY = 'merit-cookie-consent';
const EVENT = 'merit:consent-change';

export const defaultConsent: ConsentState = {
  analytics: false,
  marketing: false,
  decidedAt: null,
  version: CONSENT_VERSION,
};

/** Gecachte snapshot (referentieel stabiel, nodig voor useSyncExternalStore). */
let cached: ConsentState | null = null;

export function readConsent(): ConsentState {
  if (typeof window === 'undefined') return defaultConsent;
  if (cached) return cached;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return (cached = defaultConsent);
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return (cached = defaultConsent); // beleid gewijzigd → opnieuw vragen
    return (cached = { ...defaultConsent, ...parsed });
  } catch {
    return (cached = defaultConsent);
  }
}

export function writeConsent(next: Pick<ConsentState, 'analytics' | 'marketing'>): ConsentState {
  const state: ConsentState = {
    ...next,
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  cached = state;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* privémodus of geblokkeerde opslag: keuze geldt dan alleen voor deze sessie */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: state }));
  applyConsent(state);
  return state;
}

export function clearConsent() {
  cached = defaultConsent;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: defaultConsent }));
}

/** Abonneer op wijzigingen (keuze én registratie van nieuwe scripts). */
export function subscribe(listener: () => void): () => void {
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

/* --- Voorkeuren opnieuw openen (footer, cookiepagina) ---------------------------- */

const OPEN_EVENT = 'merit:consent-open';

/** Opent de cookievoorkeuren (banner met instellingen) opnieuw. */
export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function subscribeOpenRequests(listener: () => void): () => void {
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}

/* --- Scriptregistratie --------------------------------------------------------- */

interface ConsentScript {
  id: string;
  category: Exclude<ConsentCategory, 'necessary'>;
  /** Laadt het script/de tag. Wordt maximaal één keer aangeroepen. */
  load: () => void;
}

const scripts: ConsentScript[] = [];
const loaded = new Set<string>();

/**
 * Registreer een niet-noodzakelijk script. Het wordt geladen zodra (en alleen als)
 * de bezoeker de categorie toestaat — ook als die toestemming al eerder is gegeven.
 */
export function registerConsentScript(script: ConsentScript) {
  if (scripts.some((s) => s.id === script.id)) return;
  scripts.push(script);
  if (typeof window !== 'undefined') {
    applyConsent(readConsent());
    window.dispatchEvent(new CustomEvent(EVENT, { detail: readConsent() }));
  }
}

/** Laadt alle geregistreerde scripts waarvoor toestemming bestaat. */
export function applyConsent(state: ConsentState) {
  for (const s of scripts) {
    if (loaded.has(s.id)) continue;
    if (state[s.category]) {
      loaded.add(s.id);
      try {
        s.load();
      } catch (err) {
        console.error(`[consent] laden van "${s.id}" mislukt`, err);
      }
    }
  }
}

/** Zijn er scripts geregistreerd die om toestemming vragen? Zo niet: geen banner nodig. */
export function consentRequired(): boolean {
  return scripts.length > 0;
}

/** Welke categorieën zijn daadwerkelijk in gebruik (voor de banner/cookiepagina). */
export function activeCategories(): Exclude<ConsentCategory, 'necessary'>[] {
  return Array.from(new Set(scripts.map((s) => s.category)));
}
