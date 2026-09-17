import { Link } from 'react-router';
import { Seo } from '@/components/Seo';
import { Accordion } from '@/components/ui/Accordion';
import { Container, Section } from '@/components/ui/Container';
import { PageHero } from '@/sections/PageHero';
import { CtaBand } from '@/sections/CtaBand';
import { routes } from '@/config/routes';
import { allFaq, faqGroups } from '@/data/faq';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo/json-ld';

export default function Faq() {
  return (
    <>
      <Seo
        title="Veelgestelde vragen"
        description="Antwoorden op veelgestelde vragen over administratie uitbesteden, pakketten en tarieven, btw- en andere aangiften, AFAS en overstappen van boekhouder."
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: routes.faq.path },
          ]),
          faqJsonLd(allFaq),
        ]}
      />
      <PageHero
        eyebrow="FAQ"
        title="Veelgestelde vragen"
        intro="Antwoord op de vragen die ondernemers ons het meest stellen over administratie, tarieven, aangiften, AFAS en overstappen. Staat uw vraag er niet bij? Neem gerust contact op."
        breadcrumbs={[{ name: 'FAQ', path: routes.faq.path }]}
      />

      <Section aria-label="Vragen per onderwerp">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-20">
            <nav aria-label="Onderwerpen" className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-sm font-semibold tracking-wide text-subtle uppercase">Onderwerpen</p>
              <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {faqGroups.map((g) => (
                  <li key={g.id}>
                    <a
                      href={`#faq-${g.id}`}
                      className="inline-flex h-9 items-center rounded-full border border-default px-4 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary lg:h-auto lg:rounded-md lg:border-0 lg:px-0 lg:py-1.5"
                    >
                      {g.title}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-muted">
                Andere vraag?{' '}
                <Link to={routes.contact.path} className="font-semibold text-primary underline-offset-4 hover:underline">
                  Neem contact op
                </Link>
                .
              </p>
            </nav>

            <div className="space-y-12">
              {faqGroups.map((g) => (
                <section key={g.id} id={`faq-${g.id}`} aria-labelledby={`faq-${g.id}-title`} className="reveal scroll-mt-28">
                  <h2 id={`faq-${g.id}-title`} className="mb-5 text-2xl font-semibold">
                    {g.title}
                  </h2>
                  <Accordion items={g.items} />
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Uw vraag niet gevonden?"
        text="Stel uw vraag via het contactformulier of plan een vrijblijvende kennismaking. Wij denken graag met u mee."
        primary={{ label: 'Neem contact op', to: routes.contact.path }}
        secondary={{ label: 'Plan een kennismaking', to: routes.kennismaking.path }}
      />
    </>
  );
}
