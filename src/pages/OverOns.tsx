import { ArrowRight, ClipboardCheck, FileText, Handshake, MapPin, ShieldCheck, Workflow } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Container';
import { Logo } from '@/components/Logo';
import { Notice } from '@/components/ui/Notice';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBand } from '@/sections/CtaBand';
import { FeatureGrid, TextSection } from '@/sections/ContentBlocks';
import { PageHero } from '@/sections/PageHero';
import { Process } from '@/sections/Process';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { breadcrumbJsonLd, organizationJsonLd } from '@/lib/seo/json-ld';

/** Waar MERIT in de samenwerking op staat. Geen claims over ervaring of certificeringen. */
const principles = [
  {
    title: 'Nauwkeurigheid',
    text: 'Posten worden gecontroleerd en aangesloten, en wat afwijkt melden wij met de onderbouwing erbij. Wij vullen geen gaten met aannames.',
    icon: ShieldCheck,
  },
  {
    title: 'Transparantie',
    text: 'Wat wij doen, wat het kost en wat u zelf blijft doen, leggen wij vooraf schriftelijk vast. Ook wat buiten de afspraak valt.',
    icon: FileText,
  },
  {
    title: 'Begrijpelijke taal',
    text: 'Wij leggen uit wat er in uw cijfers gebeurt zonder vakjargon, zodat u weet waar u aan toe bent en zelf kunt beslissen.',
    icon: Workflow,
  },
  {
    title: 'Meegroeien',
    text: 'U begint met wat past bij uw huidige omvang. Groeit uw onderneming, dan passen wij het pakket in overleg aan.',
    icon: ClipboardCheck,
  },
  {
    title: 'Langdurige samenwerking',
    text: 'Wij richten ons op werkzaamheden die elke periode terugkomen. Dat vraagt na de start weinig uitleg en levert een stabiele samenwerking op.',
    icon: Handshake,
  },
  {
    title: 'Eén vast aanspreekpunt',
    text: `MERIT is gevestigd in ${siteConfig.founded.city} en werkt met één vast aanspreekpunt, zodat u uw situatie niet telkens opnieuw hoeft uit te leggen.`,
    icon: MapPin,
  },
];

export default function OverOns() {
  const { contact } = siteConfig;

  return (
    <>
      <Seo
        title="Over MERIT"
        description={`${siteConfig.name} verzorgt de financiële administratie, btw-aangiften en jaarrekeningen van zzp’ers en mkb-ondernemers in Nederland. Eén vast aanspreekpunt, duidelijke afspraken en begrijpelijke taal.`}
        canonicalPath={routes.overMerit.path}
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([{ name: 'Over MERIT', path: routes.overMerit.path }]),
        ]}
      />

      <PageHero
        eyebrow="Over MERIT"
        title="Een vast aanspreekpunt voor uw administratie"
        intro="MERIT Administratie &amp; Advies verzorgt de financiële administratie, de btw-aangiften en het jaarwerk van zzp’ers en mkb-ondernemers. Nauwkeurig, duidelijk en in begrijpelijke taal."
        breadcrumbs={[{ name: 'Over MERIT', path: routes.overMerit.path }]}
      />

      <TextSection
        id="waar-wij-voor-staan"
        eyebrow="Waar wij voor staan"
        title="Uw cijfers op orde, zodat u kunt ondernemen"
      >
        <p>
          Ondernemen doet u omdat u goed bent in uw vak. De administratie die erbij komt kijken is
          zelden de reden dat iemand voor zichzelf begint. Toch bepaalt die administratie wel of u
          weet hoe uw onderneming ervoor staat, of uw aangiften kloppen en of u op tijd bent.
        </p>
        <p>
          <strong>Daar richten wij ons op.</strong> Wij verzorgen uw financiële administratie,
          bereiden uw btw-aangiften voor en stellen uw jaarrekening samen. U levert uw facturen en
          bonnen aan; wij zorgen dat het klopt en laten u weten als er iets ontbreekt of opvalt.
        </p>
        <p>
          Wij werken graag aan samenwerkingen die blijven staan. Daarom leggen wij vooraf vast wat
          wij doen, wat u zelf blijft doen, welk tarief geldt en op welke momenten u iets van ons
          hoort — ook wat buiten de afspraak valt.
        </p>
        <p>
          Wij werken voor zzp’ers en voor mkb-ondernemers. Wat u nodig heeft hangt af van de omvang
          van uw onderneming; wat u krijgt is in beide gevallen hetzelfde: één vast aanspreekpunt
          dat uw cijfers kent.
        </p>
      </TextSection>

      <FeatureGrid
        id="kernwaarden"
        eyebrow="Kernwaarden"
        title="Hoe wij werken"
        description="Zes uitgangspunten die bepalen hoe wij met u samenwerken."
        items={principles}
        columns={3}
        tone="alt"
      />

      <Process tone="default" />

      {/* Bedrijfsgegevens — uitsluitend bevestigde gegevens */}
      <Section tone="alt" id="bedrijfsgegevens" aria-labelledby="bedrijfsgegevens-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 [&>*]:min-w-0">
            <div>
              <SectionHeading
                id="bedrijfsgegevens-title"
                eyebrow="Bedrijfsgegevens"
                title="Wie wij zijn"
                description="MERIT is een in Nederland gevestigde zakelijke dienstverlener. Hieronder staan onze officiële gegevens."
                className="reveal"
              />
              <div className="reveal mt-8">
                <Logo asLink={false} height={52} />
              </div>
              <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to={routes.kennismaking.path} iconRight={<ArrowRight />}>
                  Plan een kennismaking
                </Button>
                <Button to={routes.contact.path} variant="outline">
                  Neem contact op
                </Button>
              </div>
            </div>

            <div className="reveal">
              <dl className="overflow-hidden rounded-lg border border-default bg-surface">
                {[
                  { term: 'Handelsnaam', value: siteConfig.name },
                  { term: 'Naam in het KvK-register', value: siteConfig.legalName },
                  ...(contact.kvk ? [{ term: 'KvK-nummer', value: contact.kvk }] : []),
                  ...(contact.btw ? [{ term: 'Btw-identificatienummer', value: contact.btw }] : []),
                  ...(contact.address
                    ? [
                        {
                          term: 'Vestigings- en postadres',
                          value: `${contact.address.street}, ${contact.address.postalCode} ${contact.address.city}`,
                        },
                      ]
                    : []),
                  { term: 'E-mailadres', value: contact.email },
                  ...(contact.phone ? [{ term: 'Telefoonnummer', value: contact.phone }] : []),
                  { term: 'Werkgebied', value: 'Nederland' },
                  { term: 'Software', value: siteConfig.integrations.software.join(', ') },
                ].map((row) => (
                  <div
                    key={row.term}
                    className="flex flex-col gap-1 border-b border-default px-5 py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <dt className="text-sm font-medium text-muted sm:w-56 sm:shrink-0">
                      {row.term}
                    </dt>
                    <dd className="font-semibold text-primary">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <Notice tone="info" className="mt-8">
                Wij handelen onder de naam {siteConfig.name}. In het KvK-register staat de
                onderneming nog ingeschreven onder {siteConfig.legalName}; op facturen en in
                overeenkomsten kunt u die naam daarom tegenkomen. Wij publiceren uitsluitend
                gegevens die wij kunnen onderbouwen. U vindt op deze
                website geen klantnamen, klantbeoordelingen, keurmerken of certificeringen, omdat
                wij daarover geen onbevestigde uitspraken doen. MERIT presenteert zich niet als
                accountantsorganisatie die wettelijke controles uitvoert en claimt geen officieel
                AFAS-partnerschap.
              </Notice>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Kennismaken met MERIT?"
        text="In een kort gesprek bespreken wij uw situatie, welke werkzaamheden zich laten overdragen en hoe wij de afspraken vastleggen."
        tone="default"
      />
    </>
  );
}
