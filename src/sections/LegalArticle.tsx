import type { ReactNode } from 'react';
import { Container, Section } from '@/components/ui/Container';

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalArticleProps {
  /** Laatste wijzigingsdatum (vrije tekst) */
  updated: string;
  intro?: ReactNode;
  sections: LegalSection[];
  /** Noot onderaan (bijv. concept-disclaimer) */
  footnote?: ReactNode;
}

/**
 * Opmaak voor juridische pagina's: inhoudsopgave + genummerde secties in
 * leesbare kolombreedte. Inhoud wordt als data aangeleverd.
 */
export function LegalArticle({ updated, intro, sections, footnote }: LegalArticleProps) {
  return (
    <Section aria-label="Inhoud">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-20">
          <nav aria-label="Inhoudsopgave" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold tracking-wide text-subtle uppercase">Inhoud</p>
            <ol className="mt-4 space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex gap-2 text-muted transition-colors hover:text-primary"
                  >
                    <span className="tabular-nums text-subtle">{i + 1}.</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-subtle">Laatst bijgewerkt: {updated}</p>
          </nav>

          <article className="max-w-3xl">
            {intro && (
              <div className="mb-10 text-lg leading-relaxed text-muted [&_p+p]:mt-4">{intro}</div>
            )}
            <div className="space-y-12">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28">
                  <h2 id={`${s.id}-h`} className="text-2xl font-semibold">
                    <span className="mr-2 text-accent-text tabular-nums">{i + 1}.</span>
                    {s.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-muted [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-primary [&_li]:mt-1.5 [&_strong]:font-semibold [&_strong]:text-text [&_ul]:list-disc [&_ul]:pl-5">
                    {s.content}
                  </div>
                </section>
              ))}
            </div>
            {footnote && (
              <div className="mt-14 rounded-lg border border-warning/30 bg-warning-soft p-5 text-sm text-text">
                {footnote}
              </div>
            )}
          </article>
        </div>
      </Container>
    </Section>
  );
}
