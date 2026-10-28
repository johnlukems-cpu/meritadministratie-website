import { BarChart3, FileCheck2, MessageSquare } from 'lucide-react';
import { Container, Section } from '@/components/ui/Container';
import { processSteps } from '@/data/process';

const icons = [MessageSquare, FileCheck2, BarChart3];

interface ProcessProps {
  tone?: 'default' | 'alt';
  title?: string;
  description?: string;
}

/** Sectie "Zo werkt samenwerken" — drie stappen van kennismaking tot start. */
export function Process({
  tone = 'default',
  title = 'Zo werkt samenwerken',
  description = 'Eenvoudig, duidelijk en efficiënt.',
}: ProcessProps) {
  return (
    <Section id="werkwijze" tone={tone} aria-labelledby="werkwijze-title">
      <Container>
        <div className="reveal text-center">
          <h2
            id="werkwijze-title"
            className="text-[1.75rem] leading-[1.2] sm:text-[2.125rem] lg:text-[2.375rem]"
          >
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] text-muted">{description}</p>
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {processSteps.map((step, index) => {
            const Icon = icons[index] ?? MessageSquare;
            const last = index === processSteps.length - 1;
            return (
              <li key={step.number} className="reveal relative flex min-w-0 gap-4">
                {/* Verbindingslijn tussen de stappen (alleen op desktop) */}
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute top-5 -right-3 hidden h-px w-6 bg-[repeating-linear-gradient(90deg,var(--border-strong)_0_4px,transparent_4px_8px)] md:block"
                  />
                )}

                <span
                  aria-hidden="true"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-contrast tabular-nums"
                >
                  {index + 1}
                </span>

                <div className="min-w-0">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary"
                  >
                    <Icon className="size-4.5" />
                  </span>
                  <h3 className="ui-heading mt-3 text-[1.0625rem] font-semibold text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
