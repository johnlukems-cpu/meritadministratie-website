import { useSyncExternalStore } from 'react';
import { consentRequired, defaultConsent, readConsent, subscribe, type ConsentState } from './consent';

const noopSubscribe = () => () => {};
const serverSubscribe = typeof window === 'undefined' ? noopSubscribe : subscribe;

/** Huidige toestemmingsstatus (server: standaardwaarden). */
export function useConsentState(): ConsentState {
  return useSyncExternalStore(serverSubscribe, readConsent, () => defaultConsent);
}

/** Zijn er scripts geregistreerd die om toestemming vragen? (server: false) */
export function useConsentRequired(): boolean {
  return useSyncExternalStore(serverSubscribe, consentRequired, () => false);
}
