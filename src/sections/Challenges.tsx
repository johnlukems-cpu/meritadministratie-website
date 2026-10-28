import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { routes } from '@/config/routes';
import { challenges, challengesConclusion } from '@/data/challenges';

interface ChallengesProps {
  tone?: 'default' | 'alt';
  /** Knop onder de conclusie verbergen (bijv. op de kantorenpagina zelf) */
  showCta?: boolean;
}

/** Sectie "Meer werk, dezelfde capaciteit?" — herkenbare uitdagingen bij kantoren. */
export function Challenges({ tone = 'default', showCta = true }: ChallengesProps) {
  return (
    <Section id="uitdagingen" tone={tone} aria-labelledby="uitdagingen-title">
      <Container>
        <SectionHeading
          id="uitdagingen-title"
          eyebrow="Herkenbaar?"
          title="Meer werk, dezelfde capaciteit?"
          description="Veel kantoren lopen tegen dezelfde knelpunten aan. Niet omdat het werk niet goed gaat, maar omdat er simpelweg meer werk is dan uren."
          align="center"
          className="reveal"
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {challenges.map((challenge) => (
            <li
              key={challenge.title}
              className="reveal flex h-full gap-4 rounded-lg border border-default bg-surface p-5"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-surface-muted text-primary"
              >
                <challenge.icon className="size-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold">{challenge.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                  {challenge.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="reveal mx-auto mt-12 max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-text">{challengesConclusion}</p>
          {showCta && (
            <div className="mt-7 flex justify-center">
              <Button to={routes.voorKantoren.path} variant="outline" iconRight={<ArrowRight />}>
                Zo werken wij voor kantoren
              </Button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
