import { BarChart3, Check, FileText, Landmark, Receipt, Settings2, ShieldCheck, Wallet } from 'lucide-react';

/**
 * Illustratief financieel dashboard voor de hero.
 *
 * Volledig in markup en SVG opgebouwd — geen foto's, geen mensen. Alle cijfers zijn
 * verzonnen voorbeeldwaarden en worden als zodanig gelabeld ("Illustratief voorbeeld"),
 * zodat de weergave niet als echte klantgegevens of klantresultaten kan worden gelezen.
 */

const navItems = [
  { icon: BarChart3, label: 'Dashboard', active: true },
  { icon: Receipt, label: 'Administraties' },
  { icon: Landmark, label: 'Verwerking' },
  { icon: Wallet, label: 'Btw' },
  { icon: FileText, label: 'Jaarafsluiting' },
  { icon: ShieldCheck, label: 'Controles' },
  { icon: Settings2, label: 'Rapportages' },
];

const stats = [
  { label: 'Administraties', value: '24', delta: '+ 12%' },
  { label: 'Verwerkte facturen', value: '3.482', delta: '+ 8%' },
  { label: 'Openstaande posten', value: '18', delta: '− 5%', down: true },
];

/** Maandwaarden voor het staafdiagram (illustratief). */
const bars = [52, 61, 48, 72, 66, 84];
const months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun'];

const closing = ['Balansaansluitingen', 'Specificaties gereed', 'Controle afgerond', 'Concept jaarrekening'];

export function HeroDashboard() {
  const max = Math.max(...bars);

  return (
    <div aria-hidden="true" className="relative min-w-0 select-none">
      {/* Zachte gloed achter het scherm */}
      <div
        className="absolute -inset-x-2 -inset-y-6 -z-10 rounded-[2.5rem] opacity-80 blur-3xl sm:-inset-8"
        style={{
          background:
            'radial-gradient(55% 55% at 70% 25%, rgba(201,162,76,.22), transparent), radial-gradient(60% 60% at 25% 80%, rgba(90,130,200,.18), transparent)',
        }}
      />

      {/* Schermvenster */}
      <div className="overflow-hidden rounded-xl border border-white/12 bg-[#0e2140] shadow-[0_32px_80px_-30px_rgba(0,0,0,.85)]">
        {/* Titelbalk */}
        <div className="flex items-center gap-2.5 border-b border-white/10 bg-white/[.04] px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2 rounded-full bg-white/25" />
            <span className="size-2 rounded-full bg-white/25" />
            <span className="size-2 rounded-full bg-white/25" />
          </span>
          <span className="ml-1 truncate text-[0.6875rem] font-medium tracking-wide text-white/55">
            MERIT · Periodeoverzicht
          </span>
          <span className="ml-auto shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-[0.625rem] font-semibold tracking-wide text-accent-light">
            Illustratief voorbeeld
          </span>
        </div>

        <div className="flex">
          {/* Zijnavigatie */}
          <nav className="hidden w-36 shrink-0 border-r border-white/10 py-3 sm:block">
            <ul className="flex flex-col gap-0.5 px-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <span
                    className={
                      'flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[0.6875rem] ' +
                      (item.active ? 'bg-white/10 font-semibold text-white' : 'text-white/55')
                    }
                  >
                    <item.icon className="size-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Inhoud */}
          <div className="min-w-0 flex-1 p-3.5">
            {/* Kerncijfers */}
            <div className="grid grid-cols-3 gap-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg bg-white/[.06] p-2.5">
                  <p className="text-[0.625rem] leading-tight text-white/55">{stat.label}</p>
                  <p className="mt-1 text-base font-semibold text-white tabular-nums sm:text-lg">
                    {stat.value}
                  </p>
                  <p
                    className={
                      'mt-0.5 text-[0.625rem] tabular-nums ' +
                      (stat.down ? 'text-rose-300/80' : 'text-emerald-300/80')
                    }
                  >
                    {stat.delta}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-2.5 grid gap-2.5 sm:grid-cols-[1.25fr_1fr]">
              {/* Staafdiagram */}
              <div className="rounded-lg bg-white/[.06] p-3">
                <p className="text-[0.6875rem] font-semibold text-white/80">Verwerking</p>
                <svg viewBox="0 0 160 70" className="mt-2 w-full" role="presentation">
                  {[0, 1, 2].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      x2="160"
                      y1={8 + i * 18}
                      y2={8 + i * 18}
                      stroke="rgba(255,255,255,.1)"
                      strokeWidth="1"
                    />
                  ))}
                  {bars.map((v, i) => {
                    const h = (v / max) * 44;
                    return (
                      <rect
                        key={months[i]}
                        x={6 + i * 26}
                        y={62 - h}
                        width="13"
                        height={h}
                        rx="2.5"
                        fill={i === bars.length - 1 ? '#c9a24c' : 'rgba(255,255,255,.34)'}
                      />
                    );
                  })}
                </svg>
                <div className="mt-1 flex justify-between text-[0.5625rem] text-white/40">
                  {months.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>

              {/* Btw-ring */}
              <div className="rounded-lg bg-white/[.06] p-3">
                <p className="text-[0.6875rem] font-semibold text-white/80">Btw-overzicht</p>
                <div className="mt-2 flex items-center justify-center">
                  <svg viewBox="0 0 80 80" className="size-[74px]" role="presentation">
                    <circle cx="40" cy="40" r="31" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="9" />
                    <circle
                      cx="40"
                      cy="40"
                      r="31"
                      fill="none"
                      stroke="#c9a24c"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeDasharray="195"
                      strokeDashoffset="62"
                      transform="rotate(-90 40 40)"
                    />
                    <text
                      x="40"
                      y="37"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="11"
                      fontWeight="600"
                    >
                      € 72.450
                    </text>
                    <text x="40" y="48" textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="7">
                      te betalen
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Jaarafsluiting */}
            <div className="mt-2.5 rounded-lg bg-white/[.06] p-3">
              <p className="text-[0.6875rem] font-semibold text-white/80">Jaarafsluiting</p>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {closing.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-[0.625rem] text-white/65">
                    <span className="inline-flex size-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                      <Check className="size-2" strokeWidth={3.5} />
                    </span>
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
