import { CheckCircle2, Clock3, FileText } from 'lucide-react';

/**
 * Abstracte "overzicht"-visual voor de hero: een dashboardachtige kaart
 * met een groeilijn en statusregels. Puur CSS/SVG — geen afbeelding, geen data-claims.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
      {/* Zachte achtergrondvorm */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_70%_30%,var(--brand-accent-soft),transparent_70%)] opacity-80 sm:-inset-10" />

      {/* Hoofdkaart */}
      <div className="rounded-xl border border-default bg-surface p-5 shadow-lg sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-subtle uppercase">Overzicht</p>
            <p className="mt-1 text-base font-semibold text-primary">Uw administratie</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success">
            <span className="size-1.5 rounded-full bg-success" />
            Bijgewerkt
          </span>
        </div>

        {/* Groeilijn */}
        <svg viewBox="0 0 320 140" className="mt-5 h-auto w-full" fill="none">
          <defs>
            <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20, 50, 80, 110].map((y) => (
            <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="var(--border)" strokeWidth="1" />
          ))}
          <path
            d="M0 112 C 40 108, 60 96, 90 92 S 140 84, 170 70 S 220 52, 250 40 S 300 24, 320 18 L320 140 L0 140 Z"
            fill="url(#hero-area)"
          />
          <path
            d="M0 112 C 40 108, 60 96, 90 92 S 140 84, 170 70 S 220 52, 250 40 S 300 24, 320 18"
            stroke="var(--brand-accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {[
            [90, 92],
            [170, 70],
            [250, 40],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="4.5" fill="var(--surface)" stroke="var(--brand-primary)" strokeWidth="2.5" />
          ))}
        </svg>

        {/* Statusregels */}
        <ul className="mt-5 divide-y divide-default border-t border-default">
          {[
            { icon: CheckCircle2, label: 'Facturen verwerkt', meta: 'deze week', tone: 'text-success' },
            { icon: FileText, label: 'Btw-aangifte', meta: 'voorbereid', tone: 'text-primary' },
            { icon: Clock3, label: 'Jaarcijfers', meta: 'gepland', tone: 'text-accent-text' },
          ].map((row) => (
            <li key={row.label} className="flex items-center justify-between gap-3 py-3 text-sm">
              <span className="flex items-center gap-2.5 font-medium text-text">
                <row.icon className={`size-4 ${row.tone}`} />
                {row.label}
              </span>
              <span className="text-subtle">{row.meta}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Zwevende accentkaart */}
      <div className="absolute -bottom-9 -left-3 hidden rounded-lg border border-default bg-surface px-4 py-3 shadow-md sm:block lg:-left-10">
        <p className="text-[0.6875rem] font-semibold tracking-wide text-subtle uppercase">Vast aanspreekpunt</p>
        <p className="mt-0.5 text-sm font-semibold text-primary">Persoonlijk contact</p>
      </div>
    </div>
  );
}
