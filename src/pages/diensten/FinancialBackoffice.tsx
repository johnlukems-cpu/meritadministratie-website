import { ClipboardCheck, FileText, Repeat, ShieldCheck, Users, Workflow } from 'lucide-react';
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
    title: 'Dagelijkse financiële verwerking',
    intro: 'Het werk dat elke week terugkomt en zich goed laat overdragen.',
    items: [
      'Inkoopfacturen verwerken',
      'Verkoopfacturen verwerken',
      'Bankmutaties verwerken en afletteren',
      'Grootboekmutaties verwerken',
    ],
  },
  {
    title: 'Debiteuren en crediteuren',
    intro: 'Overzicht houden op wat openstaat, binnenkomt en betaald moet worden.',
    items: [
      'Debiteurenbeheer',
      'Crediteurenbeheer',
      'Openstaande posten controleren',
      'Afwijkingen in openstaande posten signaleren',
    ],
  },
  {
    title: 'Controle en afsluiting',
    intro: 'Zorgen dat de administratie sluit en navolgbaar is.',
    items: [
      'Tussenrekeningen controleren',
      'Ondersteuning bij maandafsluitingen',
      'Financiële gegevens voorbereiden voor rapportages',
      'Vastleggen wat is gecontroleerd en wat aandacht vraagt',
    ],
  },
  {
    title: 'Achterstanden en voorbereiding',
    intro: 'Afgebakende opdrachten om een administratie weer bij te brengen.',
    items: [
      'Administratieve achterstanden wegwerken',
      'Administraties voorbereiden voor btw-aangiften',
      'Administraties voorbereiden voor jaarafsluitingen',
      'Ontbrekende documenten in beeld brengen',
    ],
  },
];

const points = [
  {
    title: 'Uw procedures',
    description:
      'Wij werken volgens de procedures, software en werkafspraken van uw kantoor. U hoeft uw manier van werken niet aan te passen.',
    icon: Workflow,
  },
  {
    title: 'Vaste controlepunten',
    description:
      'Wij spreken vooraf af op welke momenten wordt gecontroleerd en afgestemd, zodat er geen onduidelijkheid ontstaat.',
    icon: ClipboardCheck,
  },
  {
    title: 'Terugkoppeling die bruikbaar is',
    description:
      'U ontvangt terug wat is verwerkt en wat aandacht vraagt: ontbrekende documenten, afwijkingen en posten die beoordeling vragen.',
    icon: FileText,
  },
  {
    title: 'Navolgbaar vastgelegd',
    description:
      'Wat wij hebben gecontroleerd leggen wij vast, zodat uw kantoor of een reviewer het werk kan volgen.',
    icon: ShieldCheck,
  },
  {
    title: 'Terugkerend werk, weinig uitleg',
    description:
      'Juist werkzaamheden die elke periode terugkomen zijn goed over te dragen en vragen daarna weinig instructie.',
    icon: Repeat,
  },
  {
    title: 'Uw kantoor blijft aanspreekpunt',
    description:
      'Standaard werken wij op de achtergrond. Het klantcontact blijft bij uw kantoor, tenzij u daarover andere afspraken maakt.',
    icon: Users,
  },
];

export default function FinancialBackoffice() {
  return (
    <>
      <Seo
        title="Financial Backoffice — financiële administratie uitbesteden"
        description="Financiële backoffice voor administratie- en accountantskantoren: facturen, bankmutaties, debiteuren, crediteuren, grootboekmutaties en het wegwerken van achterstanden. Vanaf € 35 per uur."
        canonicalPath={routes.financialBackoffice.path}
        jsonLd={[
          serviceJsonLd({
            name: 'Financial Backoffice',
            description:
              'Financiële administratieve verwerking voor administratie- en accountantskantoren: inkoop- en verkoopfacturen, bankmutaties, debiteuren- en crediteurenbeheer, grootboekmutaties, controles en het wegwerken van administratieve achterstanden.',
            path: routes.financialBackoffice.path,
          }),
          breadcrumbJsonLd([
            { name: 'Diensten', path: routes.diensten.path },
            { name: 'Financial Backoffice', path: routes.financialBackoffice.path },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Financial Backoffice"
        title="Financiële administratie uitbesteden aan een vaste backofficepartner"
        intro="Wij verzorgen de dagelijkse financiële verwerking voor uw kantoor: facturen, bankmutaties, debiteuren, crediteuren en grootboekmutaties. U houdt de regie, wij zorgen dat het werk doorloopt."
        breadcrumbs={[
          { name: 'Diensten', path: routes.diensten.path },
          { name: 'Financial Backoffice', path: routes.financialBackoffice.path },
        ]}
      />

      <ServiceIntro
        title="Capaciteit voor het werk dat elke periode terugkomt"
        paragraphs={[
          'Financial Backoffice is bedoeld voor kantoren die uitvoerende administratieve werkzaamheden willen uitbesteden zonder de grip erop te verliezen. Wij nemen afgebakende werkzaamheden over — verwerking, beheer van openstaande posten, controles en voorbereidend werk — en koppelen terug wat is gedaan en wat aandacht vraagt.',
          'Wij werken volgens de procedures, software en afspraken van uw kantoor. Bij de start leggen wij samen vast hoe wordt aangeleverd, welke stappen wij uitvoeren, welke werkzaamheden bij uw kantoor blijven en op welke momenten wordt gecontroleerd.',
          'U kunt klein beginnen met een beperkt aantal uren per maand en uitbreiden zodra duidelijk is welke werkzaamheden zich goed laten overdragen.',
        ]}
        priceFrom="vanaf € 35 per uur"
        ctaLabel="Bespreek uw backofficewerkzaamheden"
      />

      <WorkScope
        groups={groups}
        heading={{
          eyebrow: 'Werkzaamheden',
          title: 'Wat wij voor uw kantoor kunnen verwerken',
          description:
            'U bepaalt welke onderdelen u uitbesteedt. Wij leggen de afbakening vooraf schriftelijk vast.',
        }}
      />

      <Section tone="default">
        <Container narrow>
          <Notice tone="scope" title="Afbakening en verantwoordelijkheden" className="reveal">
            MERIT voert de overeengekomen administratieve werkzaamheden uit volgens de procedures en
            instructies van het opdrachtgeverkantoor. De beoordeling en goedkeuring van de verwerkte
            administratie, en het indienen van aangiften en jaarstukken, blijven bij de daartoe
            bevoegde verantwoordelijke partij, tenzij hierover uitdrukkelijk andere afspraken worden
            gemaakt. Wij leggen deze verdeling voorafgaand aan de samenwerking schriftelijk vast.
          </Notice>
        </Container>
      </Section>

      <Emphasis
        points={points}
        tone="alt"
        heading={{
          eyebrow: 'Onze aanpak',
          title: 'Werken binnen uw manier van werken',
          description:
            'Uitbesteden werkt alleen als het werk aansluit op uw processen en als u kunt zien wat er is gebeurd.',
        }}
      />

      <RelatedServices currentId="financial-backoffice" tone="default" />

      <CtaBand
        title="Welke backofficewerkzaamheden wilt u uitbesteden?"
        text="Bespreek met MERIT welke werkzaamheden zich goed laten overdragen en ontvang een voorstel met tarief, afbakening en controlemomenten."
        primary={{ label: 'Bespreek uw backofficewerkzaamheden', to: routes.kennismaking.path }}
        tone="alt"
      />
    </>
  );
}
