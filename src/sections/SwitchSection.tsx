import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { routes } from '@/config/routes';
import { switchSteps } from '@/data/process';

/** Premium visual: de overstap als "afgevinkte" checklist-kaart op donkere achtergrond. */
function SwitchVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(198,152,43,0.18),transparent_70%)]" />
      <div className="rounded-xl border border-on-dark-border bg-surface-dark-alt p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold tracking-wide text-on-dark-muted uppercase">Overstapplan</p>
          <span className="rounded-full bg-accent px-2.5 py-1 text-[0.6875rem] font-bold text-accent-contrast">
            Waarbij wij helpen
          </span>
        </div>
        <ol className="mt-5 space-y-3">
          {switchSteps.map((step, i) => (
            <li key={step} className="flex items-start gap-3 rounded-md bg-white/[0.04] p-3 text-sm text-on-dark">
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast">
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span>
                <span className="mr-1.5 font-semibold text-accent tabular-nums">0{i + 1}</span>
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function SwitchSection() {
  return (
    <Section id="overstappen" tone="dark" aria-labelledby="overstappen-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <SectionHeading
              id="overstappen-title"
              eyebrow="Overstappen"
              title="Overstappen van boekhouder"
              description="Toe aan meer overzicht, kortere lijnen of een moderne omgeving zoals AFAS? Overstappen hoeft niet ingewikkeld te zijn. Wij helpen bij de inventarisatie, de overdracht, de controle en inrichting van uw administratie en de verdere verwerking."
              onDark
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to={routes.overstappen.path} variant="onDark" size="lg" iconRight={<ArrowRight />}>
                Bespreek uw overstap
              </Button>
            </div>
          </div>
          <div className="reveal">
            <SwitchVisual />
          </div>
        </div>
      </Container>
    </Section>
  );
}
