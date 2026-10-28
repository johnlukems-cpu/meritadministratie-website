import { ArrowRight, Check, FileText, Landmark, Receipt, ShieldCheck } from 'lucide-react';

/**
 * Illustratieve weergave van een administratieve workflow: aanleveren → verwerken →
 * controleren → terugkoppelen.
 *
 * BELANGRIJK: alle cijfers en namen hieronder zijn illustratief en zijn GEEN
 * klantgegevens of klantresultaten. Het label "Illustratief voorbeeld" staat
 * zichtbaar in beeld zodat de weergave niet als echte cijfers kan worden gelezen.
 */

const steps = [
  { icon: Receipt, label: 'Facturen verwerkt', value: '142' },
  { icon: Landmark, label: 'Bankmutaties afgeletterd', value: '318' },
  { icon: FileText, label: 'Btw-aangiften voorbereid', value: '7' },
];

const checks = [
  'Grootboek sluit aan',
  'Tussenrekeningen gecontroleerd',
  '2 ontbrekende documenten gesignaleerd',
];

export function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative min-w-0 select-none">
      {/* Zachte achtergrondgloed */}
      <div
        className="absolute -inset-x-2 -inset-y-6 -z-10 rounded-[2rem] opacity-70 blur-2xl sm:-inset-6"
        style={{
          background:
            'radial-gradient(60% 60% at 70% 20%, rgba(200,163,74,0.18), transparent), radial-gradient(60% 60% at 20% 80%, rgba(11,31,58,0.14), transparent)',
        }}
      />

      {/* Hoofdkaart */}
      <div className="rounded-xl border border-default bg-surface shadow-lg">
        {/* Titelbalk */}
        <div className="flex items-center justify-between gap-3 rounded-t-xl bg-surface-dark px-5 py-3.5">
          <p className="text-[0.8125rem] font-semibold tracking-wide text-on-dark">
            Periodeoverzicht
          </p>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide text-accent-light">
            Illustratief voorbeeld
          </span>
        </div>

        {/* Verwerkte werkzaamheden */}
        <div className="divide-y divide-default">
          {steps.map((step) => (
            <div key={step.label} className="flex items-center gap-3.5 px-5 py-3.5">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                <step.icon className="size-4.5" />
              </span>
              <p className="min-w-0 flex-1 text-[0.9375rem] text-text">{step.label}</p>
              <p className="shrink-0 text-base font-semibold text-primary tabular-nums">
                {step.value}
              </p>
            </div>
          ))}
        </div>

        {/* Controleblok */}
        <div className="border-t border-default bg-surface-alt px-5 py-4">
          <p className="flex items-center gap-2 text-[0.8125rem] font-semibold tracking-wide text-primary uppercase">
            <ShieldCheck className="size-4 text-accent" />
            Controle
          </p>
          <ul className="mt-3 space-y-2">
            {checks.map((check) => (
              <li key={check} className="flex items-start gap-2.5 text-[0.875rem] text-muted">
                <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
                {check}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Workflow-strip onder de kaart */}
      <div className="mt-4 flex items-center gap-1.5 rounded-lg border border-default bg-surface px-3 py-3 shadow-sm sm:gap-2 sm:px-4">
        {['Aanleveren', 'Verwerken', 'Controleren', 'Terugkoppelen'].map((label, i, arr) => (
          <div key={label} className="flex min-w-0 flex-1 items-center gap-2">
            <span className="truncate text-[0.6875rem] font-semibold tracking-tight text-primary sm:text-[0.8125rem]">
              {label}
            </span>
            {i < arr.length - 1 && (
              <ArrowRight className="size-3.5 shrink-0 text-accent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
