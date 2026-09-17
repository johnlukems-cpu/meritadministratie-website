import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { processSteps } from '@/data/process';

interface HowItWorksProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: 'default' | 'alt';
}

/** Vierstappen-werkwijze met verbindingslijn. Herbruikbaar op meerdere pagina's. */
export function HowItWorks({
  eyebrow = 'Hoe het werkt',
  title = 'In vier stappen naar een administratie die klopt',
  description = 'Een heldere aanpak, van het eerste gesprek tot een samenwerking waarin u zich geen zorgen hoeft te maken over uw administratie.',
  tone = 'default',
}: HowItWorksProps) {
  return (
    <Section id="werkwijze" tone={tone} aria-labelledby="werkwijze-title">
      <Container>
        <SectionHeading
          id="werkwijze-title"
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="reveal"
        />

        <ol className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Verbindingslijn (alleen desktop) */}
          <span
            aria-hidden="true"
            className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-default lg:block"
          />
          {processSteps.map((step) => (
            <li key={step.number} className="reveal relative flex flex-col items-start lg:items-center lg:text-center">
              <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-full border-2 border-accent bg-surface text-sm font-bold text-primary tabular-nums">
                {step.number}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 max-w-xs text-[0.9375rem] leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
