import { ArrowRight, Check, FileCheck2, ScanLine, Settings2, SquareCheck } from 'lucide-react';

/**
 * Cluster van administratieve panelen voor de kantorensectie.
 *
 * Opgebouwd in markup en SVG — geen foto's, geen mensen. Alle getallen zijn
 * illustratieve voorbeeldwaarden en worden als zodanig gelabeld.
 */

const processing = [
  { label: 'Inkoopfacturen', value: '892' },
  { label: 'Verkoopfacturen', value: '645' },
  { label: 'Bankmutaties', value: '1.284' },
  { label: 'Debiteuren', value: '320' },
  { label: 'Crediteuren', value: '410' },
];

const quarters = [
  { label: 'Q1', value: 54 },
  { label: 'Q2', value: 72 },
  { label: 'Q3', value: 63 },
  { label: 'Q4', value: 88 },
];

const closing = ['Balansaansluitingen', 'Specificaties', 'Controlelijst', 'Concept jaarrekening'];
const control = ['Grootboekcontroles', 'Openstaande posten', 'Aansluitingen', 'Rapportage'];
const flow = [
  { icon: ScanLine, label: 'Factuur­herkenning' },
  { icon: FileCheck2, label: 'Boekings­voorstel' },
  { icon: SquareCheck, label: 'Controle' },
  { icon: Settings2, label: 'Verwerking' },
];

function Panel({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-w-0 rounded-xl border border-black/5 bg-white p-4 shadow-[0_18px_40px_-24px_rgba(5,16,32,.7)] ${className}`}
    >
      <p className="text-[0.8125rem] font-semibold text-primary">{title}</p>
      {children}
    </div>
  );
}

export function PanelCluster() {
  const max = Math.max(...quarters.map((q) => q.value));

  return (
    <div aria-hidden="true" className="relative min-w-0 select-none">
      <div className="grid items-start gap-3 sm:grid-cols-2">
        {/* Administratieverwerking */}
        <Panel title="Administratieverwerking">
          <ul className="mt-3 flex flex-col gap-2">
            {processing.map((row) => (
              <li key={row.label} className="flex items-center gap-2.5 text-[0.8125rem]">
                <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                  <Check className="size-2.5" strokeWidth={3.5} />
                </span>
                <span className="min-w-0 flex-1 truncate text-muted">{row.label}</span>
                <span className="shrink-0 font-semibold text-primary tabular-nums">{row.value}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Btw-aangiften */}
        <Panel title="Btw-aangiften">
          <svg viewBox="0 0 150 64" className="mt-3 w-full" role="presentation">
            {[0, 1, 2].map((i) => (
              <line
                key={i}
                x1="0"
                x2="150"
                y1={8 + i * 17}
                y2={8 + i * 17}
                stroke="var(--border)"
                strokeWidth="1"
              />
            ))}
            {quarters.map((q, i) => {
              const h = (q.value / max) * 42;
              return (
                <rect
                  key={q.label}
                  x={12 + i * 34}
                  y={56 - h}
                  width="18"
                  height={h}
                  rx="3"
                  fill={i === quarters.length - 1 ? 'var(--brand-accent)' : 'var(--brand-primary)'}
                  opacity={i === quarters.length - 1 ? 1 : 0.75}
                />
              );
            })}
          </svg>
          <div className="mt-1 flex justify-between px-2 text-[0.625rem] text-subtle">
            {quarters.map((q) => (
              <span key={q.label}>{q.label}</span>
            ))}
          </div>
        </Panel>

        {/* Jaarafsluiting */}
        <Panel title="Jaarafsluiting">
          <ul className="mt-3 flex flex-col gap-2">
            {closing.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[0.8125rem] text-muted">
                <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                  <Check className="size-2.5" strokeWidth={3.5} />
                </span>
                <span className="min-w-0 truncate">{item}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Finance Control */}
        <Panel title="Finance Control">
          <div className="mt-3 flex items-center gap-4">
            <svg viewBox="0 0 64 64" className="size-16 shrink-0" role="presentation">
              <circle cx="32" cy="32" r="25" fill="none" stroke="var(--surface-muted)" strokeWidth="8" />
              <circle
                cx="32"
                cy="32"
                r="25"
                fill="none"
                stroke="var(--brand-primary)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="157"
                strokeDashoffset="3"
                transform="rotate(-90 32 32)"
              />
              <text
                x="32"
                y="36"
                textAnchor="middle"
                fill="var(--brand-primary)"
                fontSize="13"
                fontWeight="600"
              >
                98%
              </text>
            </svg>
            <ul className="flex min-w-0 flex-col gap-1.5">
              {control.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[0.75rem] text-muted">
                  <span className="inline-flex size-3.5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                    <Check className="size-2" strokeWidth={3.5} />
                  </span>
                  <span className="min-w-0 truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        {/* Automatisering */}
        <Panel title="Automatisering" className="sm:col-span-2">
          {/* Op een smal scherm krijgt elke stap in een rij van vier maar zo'n
              45 px; daar past geen enkel label in. Onder sm staan de stappen
              daarom onder elkaar, met het label naast het icoon. */}
          <ol className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-1.5">
            {flow.map((step, i) => (
              <li
                key={step.label}
                className="flex min-w-0 items-center gap-2 sm:flex-1 sm:items-start sm:gap-1.5"
              >
                <div className="flex min-w-0 flex-1 items-center gap-2 sm:flex-col sm:gap-1.5 sm:text-center">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                    <step.icon className="size-4" />
                  </span>
                  <span className="min-w-0 text-xs leading-tight text-muted sm:w-full sm:text-[0.6875rem]">
                    {step.label}
                  </span>
                </div>
                {i < flow.length - 1 && (
                  <ArrowRight className="hidden size-3 shrink-0 text-accent sm:mt-2 sm:block" />
                )}
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      <p className="mt-3 text-center text-xs text-on-dark-muted">
        Illustratief voorbeeld — geen klantgegevens
      </p>
    </div>
  );
}
