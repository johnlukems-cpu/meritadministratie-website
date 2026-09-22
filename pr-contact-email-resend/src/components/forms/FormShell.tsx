import type { ReactNode } from 'react';
import { CheckCircle2, CircleAlert, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { FormStatus } from '@/lib/forms/useForm';

/* -----------------------------------------------------------------------------
   Gedeelde onderdelen voor alle formulieren
   ---------------------------------------------------------------------------- */

/** Onzichtbaar veld tegen spam-bots. Naam bewust "website". */
export function Honeypot() {
  return (
    <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor="website-hp">Website</label>
      <input id="website-hp" type="text" name="website" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/** Succesmelding na verzenden. */
export function FormSuccess({ title, text }: { title: string; text?: string | null }) {
  return (
    <div
      role="status"
      className="flex items-start gap-4 rounded-lg border border-success/30 bg-success-soft p-5"
    >
      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-success" />
      <div>
        <p className="font-semibold text-primary">{title}</p>
        {text && <p className="mt-1 text-[0.9375rem] text-muted">{text}</p>}
      </div>
    </div>
  );
}

/** Foutmelding bij verzendfout. */
export function FormError({ text }: { text: string | null }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-lg border border-error/30 bg-error-soft p-4">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-error" />
      <p className="text-[0.9375rem] text-text">
        {text ?? 'Er is iets misgegaan. Probeer het opnieuw of neem rechtstreeks contact met ons op.'}
      </p>
    </div>
  );
}

/** Verzendknop met laadstatus + privacynoot. */
export function SubmitRow({
  status,
  label,
  note,
}: {
  status: FormStatus;
  label: string;
  note?: ReactNode;
}) {
  const busy = status === 'submitting';
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Button
        type="submit"
        size="lg"
        disabled={busy}
        aria-busy={busy}
        iconLeft={busy ? <LoaderCircle className="animate-spin" /> : undefined}
      >
        {busy ? 'Verzenden...' : label}
      </Button>
      {note && <p className="text-sm text-muted">{note}</p>}
    </div>
  );
}
