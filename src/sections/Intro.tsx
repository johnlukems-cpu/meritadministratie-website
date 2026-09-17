import { Check } from 'lucide-react';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { OverviewVisual } from './visuals/OverviewVisual';

const points = [
  'Financiële administratie en boekhouding, verwerkt in AFAS',
  'Btw-, ICP-, IB- en vpb-aangiften tijdig voorbereid en ingediend',
  'Jaarwerk, jaarrekening en rapportage als basis voor uw beslissingen',
  'Eén vast aanspreekpunt en vaste, transparante tarieven',
];

/** Introductie: tekst links, abstracte financiële visual rechts. */
export function Intro() {
  return (
    <Section aria-labelledby="intro-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <SectionHeading
              id="intro-title"
              eyebrow="MERIT Administratie & Advies"
              title="Meer overzicht. Minder administratie."
              description="Een goede administratie geeft u inzicht, rust en ruimte om te ondernemen. MERIT is een administratiekantoor uit Meerssen dat ondernemers en MKB-bedrijven ondersteunt bij het verwerken, structureren en beheren van hun financiële administratie — persoonlijk, digitaal en in AFAS."
            />
            <ul className="mt-8 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[0.9375rem] text-text">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text"
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <OverviewVisual />
          </div>
        </div>
      </Container>
    </Section>
  );
}
