import { Check } from 'lucide-react';

/**
 * Abstracte financiële visual voor de introductiesectie:
 * een "overzicht"-kaart met verdeling en maandbalken. Puur CSS/SVG, geen echte cijfers.
 */
export function OverviewVisual() {
  const bars = [38, 52, 46, 64, 58, 72, 68, 84];

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
      <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-[radial-gradient(55%_55%_at_30%_70%,var(--brand-primary-soft),transparent_70%)] sm:-inset-8" />

      <div className="grid gap-4 sm:grid-cols-[1fr_0.85fr]">
        {/* Maandbalken */}
        <div className="rounded-xl border border-default bg-surface p-5 shadow-md">
          <p className="text-xs font-semibold tracking-wide text-subtle uppercase">Per maand</p>
          <p className="mt-1 text-sm font-semibold text-primary">Inkomsten en kosten</p>
          <div className="mt-5 flex h-32 items-end gap-2">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
                <span
                  className="w-full rounded-sm bg-primary"
                  style={{ height: `${h}%`, opacity: 0.2 + (i / bars.length) * 0.8 }}
                />
                <span className="w-full rounded-sm bg-accent/70" style={{ height: `${h * 0.45}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-primary" /> Inkomsten
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-accent/70" /> Kosten
            </span>
          </div>
        </div>

        {/* Verdeling + checklist */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-default bg-surface p-5 shadow-md">
            <p className="text-xs font-semibold tracking-wide text-subtle uppercase">Verdeling</p>
            <div className="mt-4 flex items-center gap-4">
              <svg viewBox="0 0 80 80" className="size-20 shrink-0">
                <circle cx="40" cy="40" r="30" fill="none" stroke="var(--surface-muted)" strokeWidth="12" />
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke="var(--brand-primary)"
                  strokeWidth="12"
                  strokeDasharray="120 188"
                  strokeLinecap="butt"
                  transform="rotate(-90 40 40)"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke="var(--brand-accent)"
                  strokeWidth="12"
                  strokeDasharray="42 188"
                  strokeDashoffset="-120"
                  transform="rotate(-90 40 40)"
                />
              </svg>
              <ul className="space-y-1.5 text-xs text-muted">
                <li className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-primary" /> Omzet</li>
                <li className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-accent" /> Btw</li>
                <li className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-surface-muted" /> Overig</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-default bg-surface-dark p-5 text-on-dark shadow-md">
            <p className="text-xs font-semibold tracking-wide text-on-dark-muted uppercase">Deze periode</p>
            <ul className="mt-3 space-y-2 text-sm">
              {['Administratie bijgewerkt', 'Btw-aangifte voorbereid', 'Overzicht gedeeld'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="inline-flex size-4 items-center justify-center rounded-full bg-accent text-accent-contrast">
                    <Check className="size-2.5" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
