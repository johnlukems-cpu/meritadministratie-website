import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, IconBadge } from '@/components/ui/Card';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';

/* -----------------------------------------------------------------------------
   Herbruikbare contentsecties voor subpagina's.
   ---------------------------------------------------------------------------- */

interface HeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
}

/** Tekstsectie: kop links, één of meer alinea's rechts. */
export function TextSection({
  id,
  eyebrow,
  title,
  description,
  children,
  tone = 'default',
}: HeadingProps & { id: string; children: ReactNode; tone?: 'default' | 'alt' }) {
  return (
    <Section tone={tone} aria-labelledby={`${id}-title`}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            id={`${id}-title`}
            eyebrow={eyebrow}
            title={title}
            description={description}
            className="reveal lg:sticky lg:top-28 lg:self-start"
          />
          <div className="reveal space-y-5 text-[1.0625rem] leading-relaxed text-muted [&_strong]:font-semibold [&_strong]:text-text">
            {children}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export interface ChecklistItem {
  title: string;
  text?: string;
}

/** Checklist met vinkjes — bijv. "Wat wij voor u kunnen doen". */
export function Checklist({
  id,
  eyebrow,
  title,
  description,
  items,
  tone = 'alt',
  columns = 2,
}: HeadingProps & {
  id: string;
  items: ChecklistItem[];
  tone?: 'default' | 'alt';
  columns?: 1 | 2;
}) {
  return (
    <Section tone={tone} aria-labelledby={`${id}-title`}>
      <Container>
        <SectionHeading
          id={`${id}-title`}
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="reveal"
        />
        <ul className={cn('mt-10 grid gap-4', columns === 2 && 'md:grid-cols-2')}>
          {items.map((item) => (
            <li
              key={item.title}
              className="reveal flex items-start gap-3.5 rounded-lg border border-default bg-surface p-5"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text"
              >
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              <div>
                <p className="font-semibold text-primary">{item.title}</p>
                {item.text && <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export interface FeatureItem {
  title: string;
  text: string;
  icon: LucideIcon;
}

/** Grid met icoon-kaarten — bijv. de vier aangiften, of onderdelen van een dienst. */
export function FeatureGrid({
  id,
  eyebrow,
  title,
  description,
  items,
  tone = 'default',
  columns = 2,
}: HeadingProps & {
  id: string;
  items: FeatureItem[];
  tone?: 'default' | 'alt';
  columns?: 2 | 3 | 4;
}) {
  const cols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' };
  return (
    <Section tone={tone} aria-labelledby={`${id}-title`}>
      <Container>
        <SectionHeading
          id={`${id}-title`}
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="reveal"
        />
        <ul className={cn('mt-10 grid gap-5', cols[columns])}>
          {items.map((item) => (
            <Card key={item.title} as="li" className="reveal">
              <IconBadge tone="accent">
                <item.icon />
              </IconBadge>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
            </Card>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export interface FlowStep {
  title: string;
  text: string;
}

/** Verticale/horizontale stappenflow met genummerde cirkels (bijv. overstappen in 5 stappen). */
export function StepsFlow({
  id,
  eyebrow,
  title,
  description,
  steps,
  tone = 'alt',
}: HeadingProps & { id: string; steps: FlowStep[]; tone?: 'default' | 'alt' }) {
  return (
    <Section tone={tone} aria-labelledby={`${id}-title`}>
      <Container>
        <SectionHeading
          id={`${id}-title`}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="reveal"
        />
        <ol className="mx-auto mt-12 max-w-3xl">
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={step.title} className="reveal relative flex gap-5 pb-10 last:pb-0 sm:gap-7">
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute top-12 bottom-0 left-6 w-px bg-default"
                  />
                )}
                <span className="relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-surface text-sm font-bold text-primary tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="pt-2.5">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1.5 max-w-xl text-[0.9375rem] leading-relaxed text-muted">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
