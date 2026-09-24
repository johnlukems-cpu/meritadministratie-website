import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { KeyRound, Loader2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/Logo';
import { fetchSession, login, logout } from '@/lib/content/api';
import { AdminSessionContext, type AdminSession } from './session-context';

type GateState = 'loading' | 'authenticated' | 'anonymous' | 'unconfigured' | 'offline';

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-surface-alt px-4 py-16">
      <div className="w-full max-w-md rounded-lg border border-default bg-surface p-7 shadow-md">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Logo height={36} asLink={false} />
          <div>
            <p className="text-lg font-semibold text-text">MERIT Content Studio</p>
            <p className="text-sm text-muted">Uw financiële partner in AFAS.</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

/**
 * Poortwachter voor het admin-gedeelte.
 *
 * Let op: dit is de gebruikersinterface van de beveiliging, niet de beveiliging zelf.
 * Elk endpoint onder /api/admin/ controleert de sessie opnieuw server-side
 * (api/admin/_lib/auth.ts); zonder geldige sessiecookie komt er geen data terug.
 */
export function AdminGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GateState>('loading');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  // Sessiestatus ophalen. De status wordt pas in de promise-callback gezet,
  // niet synchroon in de effect-body (react-hooks/set-state-in-effect).
  useEffect(() => {
    let cancelled = false;
    void fetchSession().then((result) => {
      if (cancelled) return;
      if (!result.ok) {
        setState(result.status === 0 ? 'offline' : 'anonymous');
        return;
      }
      if (!result.data.configured) setState('unconfigured');
      else setState(result.data.authenticated ? 'authenticated' : 'anonymous');
    });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    const password = passwordRef.current?.value ?? '';
    setBusy(true);
    setError(null);
    const result = await login(password);
    setBusy(false);
    if (result.ok) {
      if (passwordRef.current) passwordRef.current.value = '';
      setState('authenticated');
      return;
    }
    setError(result.error);
    if (result.code === 'not_configured') setState('unconfigured');
  };

  const session = useMemo<AdminSession>(
    () => ({
      signOut: () => {
        void logout().then(() => setState('anonymous'));
      },
    }),
    [],
  );

  if (state === 'loading') {
    return (
      <Shell>
        <p className="flex items-center justify-center gap-2 text-sm text-muted">
          <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          Sessie controleren…
        </p>
      </Shell>
    );
  }

  if (state === 'unconfigured') {
    return (
      <Shell>
        <div className="flex flex-col gap-3 text-sm">
          <p className="flex items-center gap-2 font-semibold text-text">
            <ShieldAlert aria-hidden="true" className="size-5 text-warning" />
            Nog niet geconfigureerd
          </p>
          <p className="text-muted">
            Het admin-gedeelte is beveiligd, maar de toegang is nog niet ingesteld. Zet in Vercel →
            Settings → Environment Variables (Preview én Production):
          </p>
          <ul className="list-disc space-y-1 pl-5 text-muted">
            <li>
              <code className="rounded bg-surface-muted px-1">ADMIN_PASSWORD</code>
            </li>
            <li>
              <code className="rounded bg-surface-muted px-1">ADMIN_SESSION_SECRET</code> (minimaal
              32 willekeurige tekens)
            </li>
          </ul>
          <p className="text-muted">Deploy daarna opnieuw en laad deze pagina.</p>
        </div>
      </Shell>
    );
  }

  if (state === 'offline') {
    return (
      <Shell>
        <div className="flex flex-col gap-3 text-sm">
          <p className="font-semibold text-text">Geen verbinding met de server</p>
          <p className="text-muted">
            De Content Studio heeft de serverless functies nodig. Lokaal draait u daarvoor{' '}
            <code className="rounded bg-surface-muted px-1">vercel dev</code> in plaats van{' '}
            <code className="rounded bg-surface-muted px-1">npm run dev</code>.
          </p>
          <Button variant="outline" size="sm" onClick={retry}>
            Opnieuw proberen
          </Button>
        </div>
      </Shell>
    );
  }

  if (state === 'anonymous') {
    return (
      <Shell>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-password" className="text-sm font-medium text-text">
              Wachtwoord
            </label>
            <input
              ref={passwordRef}
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'admin-password-error' : undefined}
              className="h-12 w-full rounded-md border border-strong bg-surface px-3.5 text-[0.9375rem] text-text transition-[border-color,box-shadow] duration-150 focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none"
            />
            {error && (
              <p id="admin-password-error" role="alert" className="text-sm font-medium text-error">
                {error}
              </p>
            )}
          </div>
          <Button type="submit" fullWidth disabled={busy} iconLeft={<KeyRound aria-hidden="true" />}>
            {busy ? 'Bezig…' : 'Inloggen'}
          </Button>
          <p className="text-center text-xs text-subtle">
            Deze omgeving is niet openbaar en wordt niet geïndexeerd.
          </p>
        </form>
      </Shell>
    );
  }

  return <AdminSessionContext.Provider value={session}>{children}</AdminSessionContext.Provider>;
}
