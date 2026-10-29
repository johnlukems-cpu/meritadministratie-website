import { ClipboardCheck, FileText, Gauge, Search, ShieldCheck, Target } from 'lucide-react';
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
    title: 'Grootboek en balans',
    intro: 'Vaststellen of de administratie intern sluit.',
    items: [
      'Grootboekcontroles',
      'Balansaansluitingen',
      'Controle van tussenrekeningen',
      'Vastleggen welke posten zijn gecontroleerd',
    ],
  },
  {
    title: 'Openstaande posten',
    intro: 'Controleren of de subadministraties aansluiten op het grootboek.',
    items: [
      'Debiteurencontroles',
      'Crediteurencontroles',
      'Controle van openstaande posten',
      'Verschillen tussen subadministratie en grootboek in beeld brengen',
    ],
  },
  {
    title: 'Signalering',
    intro: 'Melden wat afwijkt, met de onderbouwing erbij.',
    items: [
      'Afwijkingen signaleren',
      'Ontbrekende documenten en boekingen signaleren',
      'Posten aanwijzen die een beoordeling vragen',
      'Terugkoppeling in een vaste, herkenbare vorm',
    ],
  },
  {
    title: 'Rapportage en afsluiting',
    intro: 'De controle bruikbaar maken voor het vervolg.',
    items: [
      'Voorbereiding van financiële rapportages',
      'Ondersteuning bij maandafsluitingen',
      'Ondersteuning bij jaarafsluitingen',
      'Voorbereiden van controledocumentatie',
    ],
  },
];

const points = [
  {
    title: 'Vaste controlepunten',
    description:
      'Wij werken met een vaste set controles per periode, zodat het resultaat tussen perioden vergelijkbaar blijft.',
    icon: Target,
  },
  {
    title: 'Onderbouwde signalering',
    description:
      'Bij elke melding staat waarop die is gebaseerd. Dat maakt het mogelijk om snel te beoordelen of actie nodig is.',
    icon: Search,
  },
  {
    title: 'Navolgbaar vastgelegd',
    description:
      'Wat is gecontroleerd en met welke uitkomst leggen wij vast, zodat een reviewer het werk kan volgen.',
    icon: FileText,
  },
  {
    title: 'Volgens uw normen',
    description:
      'Welke afwijking relevant is, bepaalt uw kantoor. Wij stemmen de controlepunten en toleranties vooraf met u af.',
    icon: ClipboardCheck,
  },
  {
    title: 'Kwaliteit vóór de beoordeling',
    description:
      'Door controles vóór de beoordeling uit te voeren, komt er minder uitzoekwerk terecht bij uw eigen medewerkers.',
    icon: ShieldCheck,
  },
  {
    title: 'Ook periodiek in te zetten',
    description:
      'Finance Control kan per maand, per kwartaal of rond de jaarafsluiting worden ingezet, afhankelijk van uw behoefte.',
    icon: Gauge,
  },
];

export default function FinanceControl() {
  return (
    <>
      <Seo
        title="Finance Control — administratieve kwaliteitscontrole"
        description="Finance Control voor administratie- en accountantskantoren: grootboekcontroles, balansaansluitingen, controle van debiteuren, crediteuren, openstaande posten en tussenrekeningen, met onderbouwde signalering van afwijkingen. € 45 per uur."
        canonicalPath={routes.financeControl.path}
        jsonLd={[
          serviceJsonLd({
            name: 'Finance Control',
            description:
              'Administratieve kwaliteitscontrole voor administratie- en accountantskantoren: grootboekcontroles, balansaansluitingen, controle van openstaande posten en tussenrekeningen, signalering van afwijkingen en het voorbereiden van controledocumentatie.',
            path: routes.financeControl.path,
          }),
          breadcrumbJsonLd([
            { name: 'Diensten', path: routes.diensten.path },
            { name: 'Finance Control', path: routes.financeControl.path },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Finance Control"
        title="Administratieve kwaliteitscontrole en afwijkings­signalering"
        intro="Wij controleren of de administratie sluit en brengen in beeld wat afwijkt. Zo komt er minder uitzoekwerk terecht bij uw eigen medewerkers en gaat de beoordeling over de inhoud."
        breadcrumbs={[
          { name: 'Diensten', path: routes.diensten.path },
          { name: 'Finance Control', path: routes.financeControl.path },
        ]}
      />

      <ServiceIntro
        title="Controleren vóór de beoordeling"
        paragraphs={[
          'Veel tijd binnen een kantoor gaat niet naar beoordelen, maar naar uitzoeken: welke post sluit niet aan, waar zit het verschil, welk document ontbreekt. Dat werk is goed af te bakenen en over te dragen.',
          'Finance Control bestaat uit een vaste set controles: grootboekcontroles, balansaansluitingen, controle van debiteuren, crediteuren, openstaande posten en tussenrekeningen. Wat afwijkt, melden wij met de onderbouwing erbij, en wat is gecontroleerd leggen wij vast.',
          'Welke afwijkingen relevant zijn en welke toleranties gelden, stemmen wij vooraf met uw kantoor af. Zo sluit de controle aan op uw normen en is de uitkomst tussen perioden vergelijkbaar.',
        ]}
        priceFrom="€ 45 per uur"
        ctaLabel="Bespreek uw controlewerkzaamheden"
      />

      <WorkScope
        groups={groups}
        heading={{
          eyebrow: 'Werkzaamheden',
          title: 'Welke controles wij uitvoeren',
          description:
            'Een vaste set controles per periode, afgestemd op de controlepunten van uw kantoor.',
        }}
      />

      <Section tone="default">
        <Container narrow>
          <Notice tone="scope" title="Geen wettelijke controle of assurance" className="reveal">
            Finance Control helpt administratieve afwijkingen te signaleren en legt vast wat is
            gecontroleerd. De uiteindelijke beoordeling vindt plaats volgens de afgesproken
            verantwoordelijkheden, bij de daartoe bevoegde partij. Deze dienst is geen wettelijke
            accountantscontrole en geen assurance-opdracht, en levert daarover geen oordeel of
            verklaring.
          </Notice>
        </Container>
      </Section>

      <Emphasis
        points={points}
        tone="alt"
        heading={{
          eyebrow: 'Onze aanpak',
          title: 'Herhaalbaar, onderbouwd en vergelijkbaar',
          description:
            'Een controle is bruikbaar als de uitkomst elke periode op dezelfde manier tot stand komt.',
        }}
      />

      <RelatedServices currentId="finance-control" tone="default" />

      <CtaBand
        title="Kwaliteitscontroles uitbesteden?"
        text="Bespreek met MERIT welke controles u wilt laten uitvoeren en welke controlepunten en toleranties binnen uw kantoor gelden."
        primary={{ label: 'Bespreek uw controlewerkzaamheden', to: routes.kennismaking.path }}
        tone="alt"
      />
    </>
  );
}
