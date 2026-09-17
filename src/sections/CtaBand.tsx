import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Container';
import { routes } from '@/config/routes';

interface CtaButton {
  label: string;
  to: string;
}

interface CtaBandProps {
  title?: string;
  text?: string;
  primary?: CtaButton;
  /** `null` verbergt de tweede knop */
  secondary?: CtaButton | null;
  tone?: 'alt' | 'default';
}

/** Afsluitende call-to-action. Herbruikbaar op alle pagina's. */
export function CtaBand({
  title = 'Klaar voor meer overzicht in uw administratie?',
  text = 'Laten we samen bekijken hoe MERIT Administratie & Advies uw onderneming administratief kan ondersteunen.',
  primary = { label: 'Plan een kennismaking', to: routes.kennismaking.path },
  secondary = { label: 'Vraag een offerte aan', to: routes.offerte.path },
  tone = 'alt',
}: CtaBandProps) {
  return (
    <Section tone={tone} aria-labelledby="cta-title">
      <Container>
        <div className="reveal relative overflow-hidden rounded-xl border border-default bg-surface px-6 py-12 text-center shadow-md sm:px-12 md:py-16">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--brand-primary),var(--brand-accent))]"
          />
          <h2 id="cta-title" className="mx-auto max-w-2xl text-3xl font-semibold sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to={primary.to} size="lg" iconRight={<ArrowRight />}>
              {primary.label}
            </Button>
            {secondary && (
              <Button to={secondary.to} size="lg" variant="outline">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
