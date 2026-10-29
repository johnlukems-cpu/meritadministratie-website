import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Notice } from '@/components/ui/Notice';
import { benefits } from '@/data/process';

interface WhyMeritProps {
  tone?: 'default' | 'alt';
}

/** Sectie "Waarom MERIT?" — concrete kenmerken, zonder gegarandeerde resultaten. */
export function WhyMerit({ tone = 'default' }: WhyMeritProps) {
  return (
    <Section id="waarom-merit" tone={tone} aria-labelledby="waarom-merit-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              id="waarom-merit-title"
              eyebrow="Waarom MERIT?"
              title="Een vast aanspreekpunt dat uw cijfers kent"
              description="Geen wisselende contactpersonen en geen vakjargon. U weet wat wij doen, wat het kost en hoe uw onderneming ervoor staat."
              className="reveal"
            />
            <Notice className="reveal mt-8" tone="info">
              Wij beloven geen belastingvoordeel of gegarandeerde besparingen. Wat wij vastleggen
              zijn de werkzaamheden, het tarief en de momenten waarop u iets van ons hoort — zodat
              u weet waar u aan toe bent.
            </Notice>
          </div>

          <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <li key={benefit.title} className="reveal">
                <p className="flex items-baseline gap-2.5 font-semibold text-primary">
                  <span
                    aria-hidden="true"
                    className="text-[0.8125rem] font-bold tabular-nums text-accent-text"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {benefit.title}
                </p>
                <p className="mt-1.5 pl-8 text-[0.9375rem] leading-relaxed text-muted">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
