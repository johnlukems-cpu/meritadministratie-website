import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router';
import { Seo } from '@/components/Seo';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/CheckList';
import { Container, Section } from '@/components/ui/Container';
import { Notice } from '@/components/ui/Notice';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Challenges } from '@/sections/Challenges';
import { CtaBand } from '@/sections/CtaBand';
import { FaqSection } from '@/sections/Faq';
import { PageHero } from '@/sections/PageHero';
import { Process } from '@/sections/Process';
import { WhyMerit } from '@/sections/WhyMerit';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { faqGroups } from '@/data/faq';
import { hourBundles } from '@/data/pricing';
import { services } from '@/data/services';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/json-ld';

/** Waar MERIT kantoren bij kan ondersteunen — met een link naar de bijbehorende dienst. */
const supportAreas = [
  {
    title: 'Terugkerende administratieve werkzaamheden',
    description:
      'Het werk dat elke week of elke maand terugkomt: facturen, bankmutaties, debiteuren, crediteuren en grootboekmutaties.',
    to: routes.financialBackoffice.path,
  },
  {
    title: 'Piekbelasting',
    description:
      'Extra capaciteit rond aangifteperioden en in het jaarwerkseizoen, voor afgebakende werkzaamheden.',
    to: routes.tarieven.path,
  },
  {
    title: 'Achterstanden',
    description:
      'Een afgebakende opdracht om administraties die achterlopen weer bij te brengen, met vooraf bepaalde omvang en controlepunten.',
    to: routes.financialBackoffice.path,
  },
  {
    title: 'Btw-aangiften',
    description:
      'Voorbereiden en verwerken van periodieke aangiften, controleren van coderingen en rekeningen en aansluiten op het grootboek.',
    to: routes.btwAangiften.path,
  },
  {
    title: 'Jaarafsluitingen',
    description:
      'Administraties voorbereiden voor de jaarafsluiting, posten controleren en aansluitingen maken.',
    to: routes.jaarrekeningen.path,
  },
  {
    title: 'Jaarrekeningvoorbereiding',
    description:
      'Specificaties van balansrekeningen, balansdossiers en financiële overzichten voorbereiden.',
    to: routes.jaarrekeningen.path,
  },
  {
    title: 'AFAS-ondersteuning',
    description:
      'Ondersteuning bij de dagelijkse verwerking en bij workflows, volgens uw AFAS-processen en werkafspraken.',
    to: routes.afasSupport.path,
  },
  {
    title: 'Kwaliteitscontroles',
    description:
      'Een vaste set controles per periode, met onderbouwde signalering van afwijkingen en vastgelegde uitkomsten.',
    to: routes.financeControl.path,
  },
];

const startBundle = hourBundles[0];

const scaleSteps = [
  {
    title: 'Begin met één afgebakende opdracht',
    description:
      'Bijvoorbeeld een aantal administraties, één aangifteperiode of het wegwerken van een achterstand. Zo wordt zichtbaar hoe de samenwerking in de praktijk loopt.',
  },
  {
    title: 'Of start met 10 uur per maand',
    description:
      'Met de Start-bundel heeft u elke maand een vast aantal uren beschikbaar voor de werkzaamheden die wij samen vastleggen.',
  },
  {
    title: 'Breid uit wanneer het past',
    description:
      'Zodra duidelijk is welke werkzaamheden zich goed laten overdragen, kunt u naar een grotere bundel of meer diensten.',
  },
];

export default function VoorKantoren() {
  return (
    <>
      <Seo
        title="Voor administratie- en accountantskantoren"
        description="MERIT is uw externe financiële backofficepartner: ondersteuning bij terugkerende administratieve werkzaamheden, piekbelasting, achterstanden, btw-aangiften, jaarafsluitingen, jaarrekeningvoorbereiding, AFAS en kwaliteitscontroles. Start met 10 uur per maand."
        canonicalPath={routes.voorKantoren.path}
        jsonLd={[
          serviceJsonLd({
            name: 'Externe financiële backoffice voor administratie- en accountantskantoren',
            description:
              'Financiële backofficeondersteuning voor Nederlandse administratie- en accountantskantoren: terugkerende administratieve werkzaamheden, piekbelasting, achterstanden, btw-aangiften, jaarafsluitingen, jaarrekeningvoorbereiding, AFAS-ondersteuning en kwaliteitscontroles.',
            path: routes.voorKantoren.path,
          }),
          breadcrumbJsonLd([
            { name: 'Voor administratie- en accountantskantoren', path: routes.voorKantoren.path },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Voor administratie- en accountantskantoren"
        title="Uw externe financiële backofficepartner"
        intro="Wij nemen afgebakende financiële werkzaamheden over van uw kantoor, werken binnen uw procedures en koppelen terug wat is verwerkt en wat aandacht vraagt. U houdt de regie en het klantcontact."
        breadcrumbs={[
          { name: 'Voor administratie- en accountantskantoren', path: routes.voorKantoren.path },
        ]}
        actions={
          <>
            <Button to={routes.kennismaking.path} size="lg" iconRight={<ArrowRight />}>
              Start met 10 uur ondersteuning
            </Button>
            <Button to={routes.tarieven.path} size="lg" variant="outline">
              Bekijk onze tarieven
            </Button>
          </>
        }
      />

      <Challenges tone="default" showCta={false} />

      {/* Waarbij wij kantoren ondersteunen */}
      <Section tone="alt" id="ondersteuning" aria-labelledby="ondersteuning-title">
        <Container>
          <SectionHeading
            id="ondersteuning-title"
            eyebrow="Ondersteuning"
            title="Waar wij uw kantoor bij kunnen ondersteunen"
            description="U bepaalt welke werkzaamheden u uitbesteedt. Elk onderdeel kan afzonderlijk of gecombineerd worden afgenomen."
            align="center"
            className="reveal"
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {supportAreas.map((area) => (
              <li key={area.title} className="reveal">
                <Link
                  to={area.to}
                  className="group flex h-full flex-col rounded-lg border border-default bg-surface p-5 transition-[box-shadow,border-color,translate] duration-300 ease-out hover:-translate-y-0.5 hover:border-strong hover:shadow-md"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-8 items-center justify-center rounded-full bg-accent-soft text-accent-text"
                  >
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{area.title}</h3>
                  <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                    {area.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Meer informatie
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Klein beginnen en opschalen */}
      <Section tone="default" id="opschalen" aria-labelledby="opschalen-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <div>
              <SectionHeading
                id="opschalen-title"
                eyebrow="Klein beginnen"
                title="U hoeft niet in één keer over te stappen"
                description="De meeste samenwerkingen beginnen met een beperkt aantal uren of één afgebakende opdracht. Dat houdt het risico klein en maakt in de praktijk zichtbaar wat werkt."
                className="reveal"
              />
              <ol className="reveal mt-9 space-y-6">
                {scaleSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary tabular-nums"
                    >
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-primary">{step.title}</p>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Start-bundel uitgelicht */}
            <aside className="reveal lg:pt-4">
              <div className="rounded-xl border border-accent bg-surface p-6 shadow-md ring-1 ring-accent/30 md:p-8">
                <Badge tone="accent">Instapmogelijkheid</Badge>
                <h3 className="mt-4 text-xl font-semibold">{startBundle.name}-bundel</h3>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold text-primary tabular-nums">
                    € {startBundle.pricePerMonth}
                  </span>
                  <span className="text-base text-muted">per maand</span>
                </p>
                <p className="mt-1.5 text-sm text-subtle">{siteConfig.pricing.vatNote}</p>
                <CheckList
                  className="mt-6 border-t border-default pt-6"
                  size="sm"
                  items={[
                    `${startBundle.hours} uur ondersteuning per maand`,
                    `Effectief ${startBundle.effectiveRate} per uur`,
                    'Werkzaamheden vooraf samen vastgelegd',
                    'Meerwerk altijd eerst besproken',
                  ]}
                />
                <div className="mt-7 flex flex-col gap-3">
                  <Button to={routes.kennismaking.path} fullWidth iconRight={<ArrowRight />}>
                    Start met 10 uur ondersteuning
                  </Button>
                  <Button
                    to={`${routes.tarieven.path}#urenbundels`}
                    variant="outline"
                    fullWidth
                  >
                    Bekijk alle urenbundels
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <WhyMerit tone="alt" />

      <Process tone="default" />

      {/* Diensten op een rij */}
      <Section tone="alt" aria-labelledby="diensten-kantoren-title">
        <Container>
          <SectionHeading
            id="diensten-kantoren-title"
            eyebrow="Diensten"
            title="De zes diensten op een rij"
            align="center"
            className="reveal"
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.id} className="reveal">
                <Link
                  to={service.to}
                  className="group flex items-center justify-between gap-4 rounded-lg border border-default bg-surface px-5 py-4 transition-colors hover:border-strong hover:bg-surface"
                >
                  <span className="min-w-0">
                    <span className="block font-semibold text-primary">{service.title}</span>
                    <span className="mt-0.5 block text-sm text-accent-text">
                      {service.priceFrom}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Notice tone="info" className="reveal mt-10">
            Wij doen geen uitspraken over het aantal kantoren waarmee wij werken, over besparingen
            of over de capaciteit die wij op een willekeurig moment beschikbaar hebben. Wat haalbaar
            is binnen uw gewenste doorlooptijd, bespreken wij in de kennismaking.
          </Notice>
        </Container>
      </Section>

      <FaqSection
        tone="default"
        items={[...faqGroups[0].items, ...faqGroups[1].items].slice(0, 8)}
        title="Vragen over samenwerken met MERIT"
        description="Over werkwijze, verantwoordelijkheden, uitbesteden en opschalen."
      />

      <CtaBand
        title="Meer capaciteit nodig binnen uw kantoor?"
        text="Bespreek met MERIT welke werkzaamheden u wilt uitbesteden en ontvang een passend voorstel."
        tone="alt"
      />
    </>
  );
}
