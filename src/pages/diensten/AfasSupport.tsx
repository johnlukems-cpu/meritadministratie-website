import { BookOpenCheck, ClipboardCheck, FileText, Gauge, Repeat, Workflow } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Container, Section } from '@/components/ui/Container';
import { Notice } from '@/components/ui/Notice';
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
    title: 'Dagelijkse verwerking in de software',
    intro: 'Uitvoerende ondersteuning binnen uw bestaande inrichting.',
    items: [
      'Ondersteuning bij de dagelijkse financiële verwerking',
      'Werken volgens overeengekomen AFAS-processen',
      'Ondersteuning bij financiële workflows',
      'Administratieve gegevens controleren',
    ],
  },
  {
    title: 'Processen en procedures',
    intro: 'Terugkerend werk overzichtelijker en overdraagbaar maken.',
    items: [
      'Terugkerende werkprocessen verbeteren',
      'Werkprocedures documenteren',
      'Ondersteuning bij afgesproken procesverbeteringen',
      'Vastleggen welke stappen bij welke rol horen',
    ],
  },
  {
    title: 'Rapportage en controle',
    intro: 'Zorgen dat de gegevens klaarstaan en kloppen.',
    items: [
      'Rapportagevoorbereiding',
      'Controleren of gegevens compleet en consistent zijn',
      'Afwijkingen in de vastlegging signaleren',
      'Terugkoppelen wat aandacht vraagt',
    ],
  },
];

const points = [
  {
    title: 'Binnen uw inrichting',
    description:
      'Wij werken in uw bestaande omgeving en volgens uw processen. Wij wijzigen geen inrichting zonder dat dit is afgesproken.',
    icon: Workflow,
  },
  {
    title: 'Afgebakende deskundigheid',
    description:
      'Wij geven vooraf aan welke werkzaamheden binnen onze aantoonbare deskundigheid vallen. Wat daarbuiten valt, melden wij.',
    icon: ClipboardCheck,
  },
  {
    title: 'Vastgelegde procedures',
    description:
      'Werkprocedures leggen wij schriftelijk vast, zodat het werk overdraagbaar is en niet afhankelijk blijft van één persoon.',
    icon: FileText,
  },
  {
    title: 'Terugkerend werk eerst',
    description:
      'Wij beginnen bij de werkzaamheden die elke periode terugkomen. Daar is de winst het grootst en het risico het kleinst.',
    icon: Repeat,
  },
  {
    title: 'Kennisopbouw aan uw kant',
    description:
      'Omdat wij vastleggen wat wij doen, blijft de kennis binnen uw kantoor beschikbaar.',
    icon: BookOpenCheck,
  },
  {
    title: 'Stap voor stap',
    description:
      'Verbeteringen voeren wij in afgesproken stappen door, zodat het lopende werk niet in de knel komt.',
    icon: Gauge,
  },
];

export default function AfasSupport() {
  return (
    <>
      <Seo
        title="AFAS & Software Support — financiële softwareondersteuning"
        description="AFAS-ondersteuning voor administratie- en accountantskantoren: ondersteuning bij de dagelijkse financiële verwerking, financiële workflows, procesverbetering en het documenteren van werkprocedures. € 45 tot € 55 per uur."
        canonicalPath={routes.afasSupport.path}
        jsonLd={[
          serviceJsonLd({
            name: 'AFAS & Software Support',
            description:
              'Financiële softwareondersteuning voor administratie- en accountantskantoren: ondersteuning bij de dagelijkse financiële verwerking en financiële workflows volgens overeengekomen AFAS-processen, procesverbetering en het documenteren van werkprocedures.',
            path: routes.afasSupport.path,
          }),
          breadcrumbJsonLd([
            { name: 'Diensten', path: routes.diensten.path },
            { name: 'AFAS & Software Support', path: routes.afasSupport.path },
          ]),
        ]}
      />

      <PageHero
        eyebrow="AFAS & Software Support"
        title="Ondersteuning bij uw financiële software en workflows"
        intro="Wij ondersteunen bij de financiële verwerking en bij workflows in AFAS, volgens de processen en werkafspraken van uw kantoor. Praktische hulp in de uitvoering, en documentatie die het werk overdraagbaar maakt."
        breadcrumbs={[
          { name: 'Diensten', path: routes.diensten.path },
          { name: 'AFAS & Software Support', path: routes.afasSupport.path },
        ]}
      />

      <ServiceIntro
        title="Praktische ondersteuning in de uitvoering"
        paragraphs={[
          'Software is zelden het knelpunt; de uitvoering eromheen is dat vaker. Werkzaamheden die elke periode terugkomen worden handmatig gedaan, procedures zitten in het hoofd van één medewerker en rapportages vragen elke keer dezelfde voorbereiding.',
          'Wij ondersteunen bij die uitvoering: de dagelijkse financiële verwerking, het werken volgens uw AFAS-processen, het controleren van administratieve gegevens en het voorbereiden van rapportages. Waar werkzaamheden zich laten standaardiseren, leggen wij de procedure vast.',
          'Wij werken binnen uw bestaande inrichting en wijzigen daar niets aan zonder dat dit vooraf is afgesproken.',
        ]}
        priceFrom="€ 45 tot € 55 per uur"
        ctaLabel="Bespreek uw AFAS-vraagstuk"
      />

      <WorkScope
        groups={groups}
        heading={{
          eyebrow: 'Werkzaamheden',
          title: 'Waarbij wij kunnen ondersteunen',
          description:
            'Uitvoerende ondersteuning, procesverbetering en documentatie — binnen de afgesproken afbakening.',
        }}
      />

      <Section tone="default">
        <Container narrow>
          <Notice tone="scope" title="Over partnerschap en certificering" className="reveal">
            MERIT presenteert zich niet als officieel AFAS-partner en claimt geen certificering of
            expertise in specifieke modules. Wij geven voorafgaand aan de samenwerking aan welke
            werkzaamheden binnen onze aantoonbare deskundigheid vallen en welke daarbuiten. Valt een
            vraagstuk buiten die afbakening, dan melden wij dat, zodat uw kantoor het door een
            specialist of leverancier kan laten oppakken.
          </Notice>
        </Container>
      </Section>

      <Emphasis
        points={points}
        tone="alt"
        heading={{
          eyebrow: 'Onze aanpak',
          title: 'Aansluiten, vastleggen, overdraagbaar maken',
          description:
            'Ondersteuning is pas waardevol als uw kantoor er na afloop zelfstandig mee verder kan.',
        }}
      />

      <RelatedServices currentId="afas-software-support" tone="default" />

      <CtaBand
        title="Een AFAS- of softwarevraagstuk binnen uw kantoor?"
        text="Bespreek met MERIT waar de uitvoering vastloopt en welke ondersteuning binnen de afgesproken afbakening past."
        primary={{ label: 'Bespreek uw AFAS-vraagstuk', to: routes.kennismaking.path }}
        tone="alt"
      />
    </>
  );
}
