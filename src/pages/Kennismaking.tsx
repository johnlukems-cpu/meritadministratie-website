import { Seo } from '@/components/Seo';
import { BookingWidget } from '@/components/BookingWidget';
import { Container, Section } from '@/components/ui/Container';
import { KennismakingForm } from '@/components/forms/KennismakingForm';
import { PageHero } from '@/sections/PageHero';
import { HowItWorks } from '@/sections/HowItWorks';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';

const verloop = [
  { title: 'U vraagt een kennismaking aan', text: 'Via het formulier, in een minuut ingevuld.' },
  { title: 'Wij nemen contact op', text: 'Om een moment af te stemmen dat u uitkomt.' },
  { title: 'Kort gesprek', text: 'Telefonisch of online: uw situatie, uw wensen en onze werkwijze.' },
  { title: 'U beslist', text: 'Past het? Dan maken wij een voorstel. Zo niet, dan zit u nergens aan vast.' },
];

export default function Kennismaking() {
  return (
    <>
      <Seo
        title="Plan een kennismaking"
        description="Maak vrijblijvend kennis met MERIT Administratie & Advies en bespreek hoe wij uw onderneming administratief kunnen ondersteunen."
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Kennismaking', path: routes.kennismaking.path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Kennismaking"
        title="Plan een kennismaking"
        intro="Maak vrijblijvend kennis en bespreek hoe MERIT Administratie & Advies uw onderneming administratief kan ondersteunen."
        breadcrumbs={[{ name: 'Kennismaking', path: routes.kennismaking.path }]}
      />

      <Section aria-labelledby="kennismaking-form-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="reveal rounded-xl border border-default bg-surface p-6 shadow-md sm:p-8 lg:p-10">
              <h2 id="kennismaking-form-title" className="text-2xl font-semibold">
                Kennismaking aanvragen
              </h2>
              <p className="mt-2 mb-8 text-[0.9375rem] text-muted">
                Laat uw gegevens achter; wij nemen contact met u op om een moment af te stemmen.
              </p>
              <KennismakingForm />
            </div>

            <aside className="reveal space-y-6 lg:sticky lg:top-28 lg:self-start">
              <BookingWidget />

              <div className="rounded-lg border border-default bg-surface-alt p-6">
                <h2 className="text-lg font-semibold">Zo verloopt de kennismaking</h2>
                <ol className="mt-4 space-y-4">
                  {verloop.map((step, i) => (
                    <li key={step.title} className="flex gap-3.5">
                      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-surface text-xs font-bold text-primary tabular-nums">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-primary">{step.title}</p>
                        <p className="mt-0.5 text-sm text-muted">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-sm text-muted">
                Liever mailen?{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-primary underline-offset-4 hover:underline">
                  {siteConfig.contact.email}
                </a>
              </p>
            </aside>
          </div>
        </Container>
      </Section>

      <HowItWorks
        eyebrow="En daarna"
        title="Zo gaat het verder na de kennismaking"
        description="Past het van beide kanten, dan richten we de samenwerking in vier duidelijke stappen in."
        tone="alt"
      />
    </>
  );
}
