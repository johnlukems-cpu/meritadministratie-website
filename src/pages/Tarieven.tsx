import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router';
import { Seo } from '@/components/Seo';
import { Accordion } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/CheckList';
import { Container, Section } from '@/components/ui/Container';
import { Notice } from '@/components/ui/Notice';
import { PackageCard } from '@/components/ui/PackageCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBand } from '@/sections/CtaBand';
import { PageHero } from '@/sections/PageHero';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { packages } from '@/data/packages';
import {
  QUOTED_LABEL,
  bundleConditions,
  bundleConditionsNote,
  hourBundles,
  hourlyRates,
  pricingFaq,
  projectServices,
  projectServicesNote,
} from '@/data/pricing';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo/json-ld';
import { cn } from '@/lib/cn';

/** Ankerlinks bovenaan de pagina, zodat bezoekers direct naar het juiste blok kunnen. */
const sections = [
  { id: 'uurtarieven', label: 'Uurtarieven' },
  { id: 'urenbundels', label: 'Urenbundels' },
  { id: 'projecten', label: 'Projecten' },
  { id: 'mkb-pakketten', label: 'Mkb-pakketten' },
  { id: 'prijsvragen', label: 'Vragen over prijzen' },
];

export default function Tarieven() {
  return (
    <>
      <Seo
        title="Tarieven — uurtarieven en urenbundels"
        description="De tarieven van MERIT voor administratie- en accountantskantoren: Financial Backoffice vanaf € 35 per uur, Finance Control € 45 per uur en maandelijkse urenbundels vanaf € 350. Daarnaast mkb-pakketten vanaf € 125 per maand."
        canonicalPath={routes.tarieven.path}
        jsonLd={[
          breadcrumbJsonLd([{ name: 'Tarieven', path: routes.tarieven.path }]),
          faqJsonLd(pricingFaq),
        ]}
      />

      <PageHero
        eyebrow="Tarieven"
        title="Professionele ondersteuning tegen toegankelijke tarieven"
        intro="U kunt per uur afnemen of kiezen voor een vaste urenbundel per maand. Projectmatige opdrachten worden vooraf afgebakend en afzonderlijk geoffreerd."
        breadcrumbs={[{ name: 'Tarieven', path: routes.tarieven.path }]}
        actions={
          <>
            <Button to={routes.kennismaking.path} size="lg" iconRight={<ArrowRight />}>
              Plan een kennismaking
            </Button>
            <Button to={routes.offerte.path} size="lg" variant="outline">
              Vraag een offerte aan
            </Button>
          </>
        }
      />

      {/* Snelnavigatie */}
      <div className="border-b border-default bg-surface">
        <Container>
          <nav aria-label="Secties op deze pagina" className="py-4">
            <ul className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-flex items-center rounded-full border border-default px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:border-strong hover:text-primary"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>

      {/* Status van de voorgestelde tarieven */}
      {siteConfig.pricing.kantorenTariffsProvisional && (
        <Section tone="default" className="!pb-0">
          <Container>
            <Notice tone="attention" title="Voorgestelde tarievenstructuur" className="reveal">
              De uurtarieven en urenbundels op deze pagina vormen de voorgestelde tarievenstructuur
              voor administratie- en accountantskantoren. Zij worden intern bevestigd voordat zij
              als definitief gelden. Het tarief dat voor uw kantoor geldt, leggen wij altijd eerst
              schriftelijk vast in een voorstel. De mkb-pakketten verder op deze pagina komen uit
              het Prijzenoverzicht {siteConfig.pricing.year}.
            </Notice>
          </Container>
        </Section>
      )}

      {/* A. Uurtarieven */}
      <Section tone="default" id="uurtarieven" aria-labelledby="uurtarieven-title">
        <Container>
          <SectionHeading
            id="uurtarieven-title"
            eyebrow="A. Uurtarieven"
            title="Tarieven per type werkzaamheden"
            description="Per dienst geldt een eigen tarief, afgestemd op de aard van het werk. Alle tarieven zijn exclusief 21% btw."
            className="reveal"
          />

          {/* Compacte vergelijkingstabel */}
          <div className="reveal mt-10 overflow-hidden rounded-xl border border-default bg-surface">
            <table className="w-full text-[0.9375rem]">
              <caption className="sr-only">Tarieven per dienst, exclusief btw</caption>
              <thead>
                <tr className="border-b border-default bg-surface-alt text-left text-xs font-semibold tracking-wide text-subtle uppercase">
                  <th scope="col" className="px-5 py-3">
                    Dienst
                  </th>
                  <th scope="col" className="px-5 py-3 text-right">
                    Tarief
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default">
                {hourlyRates.map((rate) => (
                  <tr key={rate.id}>
                    <th scope="row" className="px-5 py-3 text-left font-medium text-text">
                      {rate.name}
                    </th>
                    <td className="px-5 py-3 text-right align-middle">
                      {rate.quoted ? (
                        <a
                          href={`#tarief-${rate.id}`}
                          className="font-semibold text-accent-text underline-offset-4 hover:underline"
                        >
                          {rate.price}
                        </a>
                      ) : (
                        <span className="font-semibold text-primary tabular-nums whitespace-nowrap">
                          {rate.from ? 'vanaf ' : ''}
                          {rate.price}
                          {rate.unit ? ` ${rate.unit}` : ''}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:gap-6">
            {hourlyRates.map((rate) => (
              <div
                key={rate.id}
                id={`tarief-${rate.id}`}
                className="reveal flex h-full scroll-mt-28 flex-col rounded-lg border border-default bg-surface p-6 md:p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <h3 className="ui-heading text-lg font-semibold text-primary">{rate.name}</h3>
                  {rate.quoted ? (
                    <p className="rounded-full bg-accent-soft px-3 py-1 text-[0.8125rem] font-semibold text-accent-text">
                      {QUOTED_LABEL}
                    </p>
                  ) : (
                    <p className="flex items-baseline gap-1.5 whitespace-nowrap">
                      {rate.from && <span className="text-sm text-muted">vanaf</span>}
                      <span className="text-xl font-semibold text-primary tabular-nums">
                        {rate.price}
                      </span>
                      {rate.unit && <span className="text-sm text-muted">{rate.unit}</span>}
                    </p>
                  )}
                </div>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  {rate.description}
                </p>
                <CheckList
                  items={rate.items}
                  size="sm"
                  className="mt-5 border-t border-default pt-5"
                />
                {rate.note && (
                  <p className="mt-5 text-sm leading-relaxed text-subtle">{rate.note}</p>
                )}
                {rate.quoted && (
                  <div className="mt-5">
                    <Button
                      to={`${routes.offerte.path}?dienst=${rate.id}`}
                      size="sm"
                      variant="outline"
                      iconRight={<ArrowRight />}
                    >
                      Vraag een prijsvoorstel aan
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="reveal mt-8 max-w-3xl text-sm leading-relaxed text-muted">
            {siteConfig.pricing.finalPriceNote} {siteConfig.pricing.customQuoteNote}
          </p>
        </Container>
      </Section>

      {/* B. Maandelijkse urenbundels */}
      <Section tone="alt" id="urenbundels" aria-labelledby="urenbundels-title">
        <Container>
          <SectionHeading
            id="urenbundels-title"
            eyebrow="B. Urenbundels"
            title="Maandelijkse urenbundels"
            description="Een vast aantal uren ondersteuning per maand tegen een voordeliger effectief uurtarief. Zo is de capaciteit beschikbaar wanneer u die nodig heeft."
            align="center"
            className="reveal"
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {hourBundles.map((bundle) => (
              <li
                key={bundle.id}
                className={cn(
                  'reveal relative flex h-full flex-col rounded-lg border bg-surface p-6',
                  bundle.recommended
                    ? 'border-accent shadow-md ring-1 ring-accent/40'
                    : 'border-default',
                )}
              >
                {bundle.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[0.6875rem] font-bold tracking-wide whitespace-nowrap text-accent-contrast uppercase">
                    Meest gekozen
                  </span>
                )}

                <h3 className="text-lg font-semibold">{bundle.name}</h3>

                <div className="mt-4 border-t border-default pt-4">
                  <p className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-semibold text-primary tabular-nums">
                      € {bundle.pricePerMonth}
                    </span>
                    <span className="text-sm text-muted">p/m</span>
                  </p>
                  <p className="mt-0.5 text-xs text-subtle">excl. 21% btw</p>
                </div>

                <ul className="mt-5 space-y-2.5 text-sm">
                  <li className="flex items-start gap-2.5 leading-snug text-text">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text"
                    >
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                    <span>
                      <strong className="font-semibold tabular-nums">{bundle.hours} uur</strong>{' '}
                      ondersteuning per maand
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 leading-snug text-text">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text"
                    >
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                    <span>
                      Effectief{' '}
                      <strong className="font-semibold tabular-nums">
                        {bundle.effectiveRate}
                      </strong>{' '}
                      per uur
                    </span>
                  </li>
                </ul>

                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                  {bundle.audience}
                </p>

                <div className="mt-auto w-full pt-7">
                  <Button
                    to={`${routes.offerte.path}?pakket=bundel-${bundle.id}`}
                    variant={bundle.recommended ? 'primary' : 'outline'}
                    size="compact"
                    fullWidth
                    iconRight={<ArrowRight />}
                  >
                    Vraag een offerte aan
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          {/* C. Voorwaarden bij urenbundels */}
          <div className="reveal mt-12 rounded-xl border border-default bg-surface p-6 md:p-8">
            <h3 className="text-lg font-semibold">Voorwaarden bij een urenbundel</h3>
            <CheckList items={bundleConditions} size="sm" columns={2} className="mt-6" />
            <p className="mt-6 border-t border-default pt-6 text-sm leading-relaxed text-muted">
              {bundleConditionsNote}
            </p>
          </div>
        </Container>
      </Section>

      {/* D. Projectmatige dienstverlening */}
      <Section tone="default" id="projecten" aria-labelledby="projecten-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <div>
              <SectionHeading
                id="projecten-title"
                eyebrow="C. Projecten"
                title="Projectmatige dienstverlening"
                description="Sommige opdrachten laten zich beter als project afbakenen dan per uur. Dan bepalen wij eerst de omvang en ontvangt u een voorstel."
                className="reveal"
              />
              <CheckList items={projectServices} className="reveal mt-8" />
              <p className="reveal mt-8 text-[0.9375rem] leading-relaxed text-muted">
                {projectServicesNote}
              </p>
            </div>

            <aside className="reveal lg:pt-4">
              <div className="rounded-xl border border-default bg-surface-alt p-6 md:p-8">
                <Badge tone="primary">Altijd op maat</Badge>
                <h3 className="mt-4 text-xl font-semibold">Vraag een voorstel aan</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  Wij noemen geen vaste projectprijs zonder een duidelijke afbakening van de
                  werkzaamheden. Vertel ons wat er moet gebeuren; wij bepalen samen de omvang en
                  doen een voorstel.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button to={routes.offerte.path} fullWidth iconRight={<ArrowRight />}>
                    Vraag een offerte aan
                  </Button>
                  <Button to={routes.kennismaking.path} variant="outline" fullWidth>
                    Plan een kennismaking
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* E. Mkb-pakketten */}
      <Section tone="alt" id="mkb-pakketten" aria-labelledby="mkb-pakketten-title">
        <Container>
          <SectionHeading
            id="mkb-pakketten-title"
            eyebrow="D. Mkb-pakketten"
            title="Maandpakketten voor mkb-ondernemingen"
            description={`Deze pakketten gelden voor mkb-ondernemingen en staan los van de uurtarieven en urenbundels hierboven. Bron: Prijzenoverzicht ${siteConfig.pricing.year}.`}
            align="center"
            className="reveal"
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </ul>
          <div className="reveal mt-10 flex flex-col items-center gap-6">
            <Notice tone="info" title="Wat een pakket precies omvat" className="w-full">
              De onderdelen per pakket staan op hoofdlijnen vermeld. Het aantal mutaties, het aantal
              administraties, de gewenste frequentie en eventuele aanvullende werkzaamheden bepalen
              samen het definitieve tarief. Wij leggen dit vooraf vast in een voorstel.
            </Notice>
            <Link
              to={routes.voorMkb.path}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              Alles over onze dienstverlening voor mkb-ondernemingen
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* F. Veelgestelde vragen over prijzen */}
      <Section tone="default" id="prijsvragen" aria-labelledby="prijsvragen-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                id="prijsvragen-title"
                eyebrow="E. Vragen"
                title="Veelgestelde vragen over prijzen"
                description="Over btw, opschalen, meerwerk, niet-gebruikte uren en hoe een projectprijs tot stand komt."
                className="reveal"
              />
              <div className="reveal mt-8">
                <Button to={routes.faq.path} variant="outline" iconRight={<ArrowRight />}>
                  Alle veelgestelde vragen
                </Button>
              </div>
            </div>
            <Accordion items={pricingFaq} className="reveal" />
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Welk tarief past bij uw kantoor?"
        text="Bespreek met MERIT welke werkzaamheden u wilt uitbesteden en ontvang een voorstel met tarief, afbakening en controlemomenten."
        tone="alt"
      />
    </>
  );
}
