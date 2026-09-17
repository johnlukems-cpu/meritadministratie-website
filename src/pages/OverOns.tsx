import { ArrowRight, Handshake, MessageSquareText, MonitorSmartphone, UserRound } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Container';
import { logoFiles } from '@/config/brand';
import { PageHero } from '@/sections/PageHero';
import { FeatureGrid, TextSection } from '@/sections/ContentBlocks';
import { HowItWorks } from '@/sections/HowItWorks';
import { CtaBand } from '@/sections/CtaBand';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';
import { breadcrumbJsonLd, organizationJsonLd } from '@/lib/seo/json-ld';

/** Kernwaarden (uit de ontwerpdocumenten: persoonlijk, duidelijk, digitaal, betrokken) */
const waarden = [
  {
    title: 'Persoonlijk',
    text: 'Direct contact met dezelfde persoon, geen wisselend aanspreekpunt. U werkt rechtstreeks met de oprichter, die uw onderneming en cijfers kent.',
    icon: UserRound,
  },
  {
    title: 'Duidelijk',
    text: 'Heldere uitleg in gewone taal en vaste, transparante tarieven. Geen jargon en geen verrassingen achteraf.',
    icon: MessageSquareText,
  },
  {
    title: 'Digitaal',
    text: 'Actuele cijfers via AFAS, altijd en overal inzichtelijk. Digitaal aanleveren, online verwerken, geen ordners.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Betrokken',
    text: 'Meedenken over uw situatie, niet alleen de cijfers verwerken. Waar wij mogelijkheden of aandachtspunten zien, benoemen wij die.',
    icon: Handshake,
  },
];

export default function OverOns() {
  const { founded, contact, about } = siteConfig;
  const hasExtra = Boolean(about.teamText || about.locationText);

  return (
    <>
      <Seo
        title="Over ons"
        description="MERIT Administratie & Advies is een administratiekantoor uit Meerssen, opgericht in 2026 door Imro Plet. Persoonlijk, duidelijk, digitaal en betrokken, met AFAS."
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Over ons', path: routes.overOns.path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Over ons"
        title="Persoonlijke aandacht voor uw administratie"
        intro={siteConfig.tagline}
        breadcrumbs={[{ name: 'Over ons', path: routes.overOns.path }]}
        actions={
          <Button to={routes.kennismaking.path} iconRight={<ArrowRight />}>
            Maak kennis met ons
          </Button>
        }
      />

      {/* Wie MERIT is */}
      <Section aria-labelledby="wie-title">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div className="reveal">
              <p className="eyebrow mb-4">Wie wij zijn</p>
              <h2 id="wie-title" className="text-3xl font-semibold sm:text-[2.25rem] lg:text-[2.625rem] lg:leading-[1.15]">
                Cijfers die kloppen, uitleg die u begrijpt
              </h2>
              <div className="mt-6 space-y-5 text-[1.0625rem] leading-relaxed text-muted">
                <p>
                  {siteConfig.name} is in {founded.year} opgericht vanuit {founded.city}, met één
                  duidelijk doel: ondernemers een administratie geven waar ze op kunnen bouwen.
                </p>
                <p>
                  Geen callcenter en geen wisselend team. Bij MERIT werkt u rechtstreeks met{' '}
                  <strong className="font-semibold text-text">{founded.founderName}</strong>, oprichter
                  en eigenaar, die uw onderneming en cijfers kent. Wij voeren en verwerken financiële
                  administraties, verzorgen btw- en overige aangiften en ondersteunen zzp’ers en
                  MKB-ondernemingen met praktisch financieel en fiscaal advies, waaronder op het gebied
                  van inkomstenbelasting en vennootschapsbelasting.
                </p>
                <p>
                  Van zzp’er tot bv en van startende ondernemer tot overstapper: MERIT denkt mee, legt
                  uit in gewone taal en zorgt dat uw aangiften op tijd binnen zijn.
                </p>
              </div>
            </div>
            <div className="reveal">
              <div className="mx-auto max-w-sm rounded-xl border border-default bg-surface p-8 shadow-md sm:p-10">
                <img
                  src={logoFiles.stacked}
                  alt={`${siteConfig.name} — logo`}
                  width={800}
                  height={598}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto h-auto w-full max-w-[280px]"
                />
                <dl className="mt-8 divide-y divide-default border-t border-default text-sm">
                  <div className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted">Opgericht</dt>
                    <dd className="font-medium text-text">{founded.year}, {founded.city}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted">Oprichter</dt>
                    <dd className="font-medium text-text">{founded.founderName}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted">Werkt met</dt>
                    <dd className="font-medium text-text">{siteConfig.integrations.software.join(', ')}</dd>
                  </div>
                  {contact.kvk && (
                    <div className="flex justify-between gap-4 py-2.5">
                      <dt className="text-muted">KvK</dt>
                      <dd className="font-medium text-text tabular-nums">{contact.kvk}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <TextSection
        id="visie"
        eyebrow="Waar wij voor staan"
        title="Administratie hoort duidelijk, overzichtelijk en toegankelijk te zijn"
        tone="alt"
      >
        <p className="text-xl font-medium text-primary">
          Wij vinden dat administratie duidelijk, overzichtelijk en toegankelijk moet zijn.
        </p>
        <p>
          Administratie is meer dan invoeren en indienen. Het is de basis waarop u beslissingen
          neemt. Een administratie die klopt, geeft rust: u weet waar u staat, aangiften komen niet
          als verrassing en u heeft tijd en aandacht over voor uw onderneming.
        </p>
        <p>
          Daarom werken wij met <strong>AFAS</strong>: professionele, veilige software die u op elk
          moment inzicht geeft, zonder dat u zelf boekhouder hoeft te worden. En daarom werken wij
          met vaste tarieven en één aanspreekpunt. <strong>{siteConfig.tagline}</strong>
        </p>
      </TextSection>

      <FeatureGrid
        id="waarden"
        eyebrow="Hoe wij werken"
        title="Persoonlijk, duidelijk, digitaal en betrokken"
        items={waarden}
        columns={4}
      />

      <HowItWorks
        eyebrow="Onze werkwijze"
        title="Duidelijk vanaf het eerste gesprek"
        description="Wij beginnen altijd met luisteren. Pas als we uw situatie kennen, maken we afspraken over wat wij doen en wat u zelf doet."
        tone="alt"
      />

      {hasExtra && (
        <TextSection id="meer-over-ons" eyebrow="Meer over ons" title="Aanvullende informatie">
          {about.teamText?.split(/\n\s*\n/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {about.locationText && <p>{about.locationText}</p>}
        </TextSection>
      )}

      <CtaBand
        title="Kennismaken?"
        text="Een kort gesprek, geen verplichtingen: gewoon kijken of we bij elkaar passen."
      />
    </>
  );
}
