import { useCallback, useEffect, useState } from 'react';
import { fetchContentList, type ContentListResponse } from './api';

type State =
  | { status: 'loading' }
  | { status: 'ready'; data: ContentListResponse }
  | { status: 'error'; error: string };

/**
 * Haalt de volledige contentlijst met statistieken op en biedt een herlaadfunctie.
 *
 * Het ophalen gebeurt in een effect dat de status pas in de promise-callback zet
 * (dus niet synchroon in de effect-body); `reload` verhoogt alleen een teller.
 */
export function useContentList() {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void fetchContentList().then((result) => {
      if (cancelled) return;
      setState(
        result.ok
          ? { status: 'ready', data: result.data }
          : { status: 'error', error: result.error },
      );
    });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const reload = useCallback(() => setAttempt((value) => value + 1), []);

  return { state, reload };
}
