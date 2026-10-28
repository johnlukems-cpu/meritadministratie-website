import { Boxes, FileText, Gauge, Scan, Search, SquareStack } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Container, Section } from '@/components/ui/Container';
import { Notice } from '@/components/ui/Notice';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBand } from '@/sections/CtaBand';
import { PageHero } from '@/sections/PageHero';
import {
  Emphasis,
  RelatedServices,
  ServiceIntro,
  WorkScope,
  type ScopeGroup,
} from '@/sections/ServiceSections';
import { routes } from '@/config/routes';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/json-ld';

const groups: ScopeGroup[] = [
  {
    title: 'Analyse en standaardisering',
    intro: 'Eerst vaststellen wat er nu gebeurt, en wat zich laat standaardiseren.',
    items: [
      'Analyse van terugkerende administratieve processen',
      'Standaardisering van werkzaamheden',
      'Vaststellen welke stappen handmatig blijven en waarom',
      'Procesdocumentatie',
    ],
  },
  {
    title: 'Gegevensinvoer en controle',
    intro: 'Minder handmatig overtypen, meer controle aan de voorkant.',
    items: [
      'Ondersteuning bij factuurherkenning',
      'Verbetering van gegevenscontroles',
      'Signaleren van ontbrekende gegevens',
      'Controleren of uitkomsten kloppen na een wijziging',
    ],
  },
  {
    title: 'Workflows en rapportage',
    intro: 'Zorgen dat een aanpassing in de praktijk houdbaar is.',
    items: [
      'Testen van workflows',
      'Rapportageverbetering',
      'Vastleggen welke stap bij welke rol hoort',
      'Ondersteuning bij automatiseringsprojecten',
    ],
  },
];

const points = [
  {
    title: 'Eerst onderzoeken',
    description:
      'Wij beginnen met een analyse van het huidige proces. Pas daarna is duidelijk wat een aanpassing oplevert en wat die kost.',
    icon: Search,
  },
  {
    title: 'Klein beginnen',
    description:
      'Wij pakken één afgebakend proces per keer aan, zodat het lopende werk niet in de knel komt en een wijziging terug te draaien is.',
    icon: Boxes,
  },
  {
    title: 'Testen vóór invoeren',
    description:
      'Een aangepaste workflow wordt getest voordat die in gebruik gaat, met een controle of de uitkomsten nog kloppen.',
    icon: Scan,
  },
  {
    title: 'Vastgelegd in documentatie',
    description:
      'Wat is gewijzigd en waarom leggen wij vast, zodat uw kantoor het later kan onderhouden of aanpassen.',
    icon: FileText,
  },
  {
    title: 'Terugkerend werk eerst',
    description:
      'De winst zit in werkzaamheden die elke periode terugkomen. Daar beginnen wij, niet bij uitzonderingen.',
    icon: SquareStack,
  },
  {
    title: 'Realistische verwachtingen',
    description:
      'Wij geven aan wat wel en niet haalbaar is binnen uw bestaande inrichting, ook als het antwoord is dat iets handmatig moet blijven.',
    icon: Gauge,
  },
];

/** Hoe een automatiseringstraject verloopt — elk project wordt apart geoffreerd. */
const projectPhases = [
  {
    title: 'Vooronderzoek',
    description:
      'Wij brengen het huidige proces in beeld: welke stappen worden gezet, waar gaat tijd verloren en welke gegevens zijn beschikbaar.',
  },
  {
    title: 'Afbakening en voorstel',
    description:
      'Op basis van het vooronderzoek bakenen wij het project af en ontvangt u een afzonderlijk voorstel met de werkzaamheden en de aanpak.',
  },
  {
    title: 'Uitvoering en test',
    description:
      'Wij voeren de afgesproken aanpassingen door, testen de workflow en controleren of de uitkomsten kloppen.',
  },
  {
    title: 'Vastleggen en overdragen',
    description:
      'Wij documenteren het aangepaste proces en dragen het over, zodat uw kantoor er zelfstandig mee verder kan.',
  },
];

export default function Automatisering() {
  return (
    <>
      <Seo
        title="Automatisering — slimmere financiële processen"
        description="Procesautomatisering voor administratie- en accountantskantoren: analyse en standaardisering van terugkerende administratieve processen, ondersteuning bij factuurherkenning, betere gegevenscontroles, workflowtests en procesdocumentatie. Op offertebasis."
        canonicalPath={routes.automatisering.path}
        jsonLd={[
          serviceJsonLd({
            name: 'Automatisering',
            description:
              'Procesverbetering en automatisering van financiële administratie voor administratie- en accountantskantoren: analyse van terugkerende processen, standaardisering, ondersteuning bij factuurherkenning, verbetering van gegevenscontroles, workflowtests en procesdocumentatie.',
            path: routes.automatisering.path,
          }),
          breadcrumbJsonLd([
            { name: 'Diensten', path: routes.diensten.path },
            { name: 'Automatisering', path: routes.automatisering.path },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Automatisering"
        title="Slimmere financiële processen. Minder handmatig werk."
        intro="Wij analyseren terugkerende administratieve processen, standaardiseren wat zich laat standaardiseren en verbeteren de gegevenscontroles. Elk traject begint met vooronderzoek en wordt afzonderlijk geoffreerd."
        breadcrumbs={[
          { name: 'Diensten', path: routes.diensten.path },
          { name: 'Automatisering', path: routes.automatisering.path },
        ]}
      />

      <ServiceIntro
        title="Beginnen bij het werk dat elke periode terugkomt"
        paragraphs={[
          'In vrijwel elke administratie zitten stappen die elke periode op dezelfde manier worden gedaan: gegevens overtypen, dezelfde controle uitvoeren, dezelfde rapportage voorbereiden. Een deel daarvan laat zich standaardiseren.',
          'Wij brengen die processen eerst in beeld. Daarna bakenen wij af wat zinvol is om aan te passen, voeren wij de wijziging door, testen wij de workflow en controleren wij of de uitkomsten nog kloppen. Wat is gewijzigd leggen wij vast in documentatie.',
          'Wij beloven geen softwarefuncties of integraties die nog niet zijn gerealiseerd. Als iets binnen uw bestaande inrichting niet haalbaar is, zeggen wij dat.',
        ]}
        priceFrom="Op offertebasis"
        ctaLabel="Bespreek uw automatiseringsvraagstuk"
      />

      <WorkScope
        groups={groups}
        heading={{
          eyebrow: 'Werkzaamheden',
          title: 'Waarbij wij kunnen ondersteunen',
          description:
            'Van analyse en standaardisering tot workflowtests en documentatie van het aangepaste proces.',
        }}
      />

      {/* Projectaanpak */}
      <Section tone="default" id="aanpak-project" aria-labelledby="aanpak-project-title">
        <Container>
          <SectionHeading
            id="aanpak-project-title"
            eyebrow="Projectaanpak"
            title="Vooronderzoek eerst, daarna een afzonderlijk voorstel"
            description="Automatisering is pas verantwoord als duidelijk is wat het huidige proces doet. Daarom werken wij in vier stappen."
            align="center"
            className="reveal"
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {projectPhases.map((phase, index) => (
              <li
                key={phase.title}
                className="reveal flex h-full flex-col rounded-lg border border-default bg-surface p-6"
              >
                <p className="text-sm font-bold tracking-wide text-accent-text tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-base font-semibold">{phase.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                  {phase.description}
                </p>
              </li>
            ))}
          </ol>
          <Notice tone="attention" title="Wat wij niet beloven" className="reveal mt-10">
            Wij beloven geen softwarefuncties, koppelingen of integraties die nog niet zijn
            gerealiseerd. Automatiseringsprojecten worden vooraf onderzocht, afgebakend en
            afzonderlijk geoffreerd. Pas na het vooronderzoek kunnen wij aangeven wat haalbaar is,
            wat het vraagt en wat het u oplevert.
          </Notice>
        </Container>
      </Section>

      <Emphasis
        points={points}
        tone="alt"
        heading={{
          eyebrow: 'Onze aanpak',
          title: 'Stap voor stap, en terug te draaien',
          description:
            'Een verbetering is alleen een verbetering als de administratie erna nog klopt en uw kantoor het kan onderhouden.',
        }}
      />

      <RelatedServices currentId="automatisering" tone="default" />

      <CtaBand
        title="Een proces dat beter kan?"
        text="Bespreek met MERIT welk terugkerend proces u wilt laten onderzoeken. Na het vooronderzoek ontvangt u een afgebakend voorstel."
        primary={{ label: 'Bespreek uw automatiseringsvraagstuk', to: routes.kennismaking.path }}
        tone="alt"
      />
    </>
  );
}
