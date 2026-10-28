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
    text: 'Wat wij doen, wat het kost en waar de verantwoordelijkheid ligt, leggen wij vooraf schriftelijk vast. Ook wat buiten de afbakening valt.',
    icon: FileText,
  },
  {
    title: 'Aansluiten op uw werkwijze',
    text: 'Wij werken binnen de software, procedures en werkafspraken van uw kantoor. U hoeft uw manier van werken niet aan te passen.',
    icon: Workflow,
  },
  {
    title: 'Flexibiliteit',
    text: 'U kunt klein beginnen, opschalen en rond piekperioden extra capaciteit inzetten voor afgebakende werkzaamheden.',
    icon: ClipboardCheck,
  },
  {
    title: 'Langdurige samenwerking',
    text: 'Wij richten ons op werkzaamheden die elke periode terugkomen. Dat vraagt na de start weinig uitleg en levert een stabiele samenwerking op.',
    icon: Handshake,
  },
  {
    title: 'Eén vast aanspreekpunt',
    text: `MERIT is gevestigd in ${siteConfig.founded.city} en werkt met één vast aanspreekpunt, zodat afspraken en terugkoppeling via dezelfde lijn lopen.`,
    icon: MapPin,
  },
];

export default function OverOns() {
  const { contact } = siteConfig;

  return (
    <>
      <Seo
        title="Over MERIT"
        description={`${siteConfig.name} is een Nederlandse dienstverlener die administratie- en accountantskantoren ondersteunt als externe financiële backoffice: verwerking, btw-aangiften, jaarrekeningvoorbereiding, controles en procesverbetering.`}
        canonicalPath={routes.overMerit.path}
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([{ name: 'Over MERIT', path: routes.overMerit.path }]),
        ]}
      />

      <PageHero
        eyebrow="Over MERIT"
        title="Een vaste backofficepartner voor financiële administratie"
        intro="MERIT Administratie & Advies ondersteunt Nederlandse administratie- en accountantskantoren met financiële verwerking, btw-aangiften, jaarrekeningvoorbereiding, kwaliteitscontroles en procesverbetering."
        breadcrumbs={[{ name: 'Over MERIT', path: routes.overMerit.path }]}
      />

      <TextSection
        id="waar-wij-voor-staan"
        eyebrow="Waar wij voor staan"
        title="Financiële backofficeondersteuning, als vast onderdeel van uw kantoor"
      >
        <p>
          Bij veel kantoren is er meer werk dan uren. Niet omdat het werk niet goed gaat, maar omdat
          de werkvoorraad groeit, aangifteperioden en jaarafsluitingen pieken opleveren en geschikte
          medewerkers moeilijk te vinden zijn. Juist uitvoerende werkzaamheden die elke periode
          terugkomen laten zich dan goed afbakenen en overdragen.
        </p>
        <p>
          <strong>Daar richten wij ons op.</strong> Wij nemen financiële verwerking, controles,
          btw-voorbereiding en jaarwerkvoorbereiding over als afgebakende werkzaamheden, werken
          binnen uw procedures en koppelen terug wat is verwerkt en wat aandacht vraagt. Uw kantoor
          houdt de regie, de beoordeling en het klantcontact.
        </p>
        <p>
          Wij werken graag aan samenwerkingen die blijven staan. Daarom leggen wij vooraf vast wat
          wij doen, wat bij uw kantoor blijft, welk tarief geldt en op welke momenten wordt
          gecontroleerd en afgestemd — ook wat buiten de afbakening valt.
        </p>
        <p>
          Naast kantoren ondersteunen wij mkb-ondernemingen met hun financiële administratie. Onze
          hoofdpositionering blijft de ondersteuning van administratie- en accountantskantoren.
        </p>
      </TextSection>

      <FeatureGrid
        id="kernwaarden"
        eyebrow="Kernwaarden"
        title="Hoe wij werken"
        description="Zes uitgangspunten die bepalen hoe wij een samenwerking inrichten."
        items={principles}
        columns={3}
        tone="alt"
      />

      <Process tone="default" />

      {/* Bedrijfsgegevens — uitsluitend bevestigde gegevens */}
      <Section tone="alt" id="bedrijfsgegevens" aria-labelledby="bedrijfsgegevens-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
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
                  { term: 'Handelsnaam', value: siteConfig.legalName },
                  { term: 'Merknaam', value: siteConfig.name },
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
                Wij publiceren uitsluitend gegevens die wij kunnen onderbouwen. U vindt op deze
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
