import { Check } from 'lucide-react';
import { Link } from 'react-router';
import { Seo } from '@/components/Seo';
import { Container, Section } from '@/components/ui/Container';
import { OfferteForm } from '@/components/forms/OfferteForm';
import { PageHero } from '@/sections/PageHero';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';

const verwachting = [
  'Wij bekijken uw gegevens en nemen contact met u op als iets onduidelijk is.',
  'U ontvangt een helder voorstel, afgestemd op uw situatie en omvang.',
  'Geen verplichtingen: u beslist zelf of en wanneer u start.',
];

export default function Offerte() {
  return (
    <>
      <Seo
        title="Offerte aanvragen"
        description="Vraag vrijblijvend een offerte aan voor administratie, boekhouding of belastingaangiften. Vertel kort over uw onderneming; wij nemen daarna contact met u op."
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Offerte aanvragen', path: routes.offerte.path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Offerte"
        title="Vraag een offerte aan"
        intro="Vertel ons kort over uw onderneming en uw administratieve situatie. Wij nemen daarna contact met u op."
        breadcrumbs={[{ name: 'Offerte aanvragen', path: routes.offerte.path }]}
      />

      <Section aria-labelledby="offerte-form-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <div className="reveal rounded-xl border border-default bg-surface p-6 shadow-md sm:p-8 lg:p-10">
              <h2 id="offerte-form-title" className="text-2xl font-semibold">
                Uw offerteaanvraag
              </h2>
              <p className="mt-2 mb-8 text-[0.9375rem] text-muted">
                Velden met een <span className="text-error">*</span> zijn verplicht. Weet u iets niet
                precies? Een inschatting is voldoende.
              </p>
              <OfferteForm />
            </div>

            <aside className="reveal space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg border border-default bg-surface-alt p-6">
                <h2 className="text-lg font-semibold">Wat u kunt verwachten</h2>
                <ul className="mt-4 space-y-3">
                  {verwachting.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-text">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text"
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-default p-6">
                <h2 className="text-lg font-semibold">Liever eerst kennismaken?</h2>
                <p className="mt-2 text-[0.9375rem] text-muted">
                  In een kort gesprek bespreken we uw situatie en bekijken we samen wat u nodig heeft.
                </p>
                <Link
                  to={routes.kennismaking.path}
                  className="mt-4 inline-flex text-sm font-semibold text-primary underline underline-offset-4"
                >
                  Plan een kennismaking
                </Link>
              </div>
              <p className="text-sm text-muted">
                Mailen kan ook:{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-primary underline-offset-4 hover:underline">
                  {siteConfig.contact.email}
                </a>
              </p>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
