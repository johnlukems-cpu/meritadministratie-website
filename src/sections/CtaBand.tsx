import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { routes } from '@/config/routes';

interface CtaButton {
  label: string;
  to: string;
}

interface CtaBandProps {
  eyebrow?: string;
  title?: string;
  text?: string;
  primary?: CtaButton;
  /** `null` verbergt de tweede knop */
  secondary?: CtaButton | null;
  /** Genegeerd: de band is altijd donker. Blijft staan zodat bestaande aanroepen werken. */
  tone?: 'alt' | 'default';
}

/** Afsluitende call-to-action in een donkere band. Herbruikbaar op alle pagina's. */
export function CtaBand({
  eyebrow = 'Klaar voor extra capaciteit?',
  title = 'Meer weten over wat MERIT voor uw kantoor kan betekenen?',
  text = 'Bespreek uw werkzaamheden en ontvang een passend voorstel.',
  primary = { label: 'Plan een kennismaking', to: routes.kennismaking.path },
  secondary = { label: 'Neem contact op', to: routes.contact.path },
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-surface-dark text-on-dark" aria-labelledby="cta-title">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(70% 140% at 82% 20%, #15325c 0%, transparent 60%), var(--brand-primary)',
        }}
      />
      <Container className="py-14 md:py-16 lg:py-20">
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="min-w-0 lg:flex-1">
            {eyebrow && (
              <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-accent-light uppercase">
                {eyebrow}
              </p>
            )}
            <h2
              id="cta-title"
              /* Naast de knoppenkolom blijft hier zo'n 440 px over; op 36 px
                 past een lange samenstelling als "backofficewerkzaamheden" daar
                 niet op één regel. Vandaar 32 px vanaf lg. */
              className="max-w-2xl text-[1.625rem] leading-[1.22] text-on-dark sm:text-[1.875rem] lg:text-[2rem] lg:leading-[1.2]"
            >
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-[1.0625rem] text-on-dark-muted">{text}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row [&>*]:w-full sm:[&>*]:w-auto">
            <Button to={primary.to} size="lg" variant="secondary" iconRight={<ArrowRight />}>
              {primary.label}
            </Button>
            {secondary && (
              <Button to={secondary.to} size="lg" variant="onDarkOutline">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
