import { AlarmClock, FileCheck2, Globe2, ScaleIcon, Search, ShieldCheck } from 'lucide-react';
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
import { QUOTED_LABEL, QUOTED_NOTE } from '@/data/pricing';

const groups: ScopeGroup[] = [
  {
    title: 'Periodieke btw-aangiften',
    intro: 'Het voorbereidende en verwerkende werk per aangifteperiode.',
    items: [
      'Periodieke btw-aangiften voorbereiden en verwerken',
      'Btw-coderingen controleren',
      'Btw-rekeningen controleren',
      'Btw-administratie aansluiten op het grootboek',
    ],
  },
  {
    title: 'Controle van de onderliggende administratie',
    intro: 'Vaststellen of de btw-verwerking klopt vóórdat de aangifte wordt beoordeeld.',
    items: [
      'Inkoopfacturen controleren op de btw-verwerking',
      'Verkoopfacturen controleren op de btw-verwerking',
      'Ontbrekende documenten signaleren',
      'Afwijkingen en onregelmatigheden signaleren',
    ],
  },
  {
    title: 'Intracommunautaire transacties',
    intro: 'Administratieve ondersteuning bij leveringen en diensten binnen de EU.',
    items: [
      'Gegevens voor ICP-opgaven voorbereiden',
      'Administratieve ondersteuning bij intracommunautaire transacties',
      'Ondersteuning bij buitenlandse btw-vraagstukken binnen de overeengekomen deskundigheid',
      'Vastleggen welke vraagstukken buiten de afbakening vallen',
    ],
  },
  {
    title: 'Herstel en onderbouwing',
    intro: 'Eerdere perioden kloppend maken en de onderbouwing opbouwen.',
    items: [
      'Btw-boekingen uit eerdere perioden controleren',
      'Btw-boekingen uit eerdere perioden herstellen',
      'Aansluitingen voorbereiden',
      'Controledocumentatie voorbereiden',
    ],
  },
];

const points = [
  {
    title: 'Nauwkeurige verwerking',
    description:
      'De btw-verwerking wordt post voor post gecontroleerd en aangesloten op het grootboek, zodat de onderbouwing klopt.',
    icon: ShieldCheck,
  },
  {
    title: 'Tijdige aanlevering',
    description:
      'Wij spreken per aangifteperiode af wanneer het werk klaar is, zodat uw kantoor voldoende tijd heeft om te beoordelen en in te dienen.',
    icon: AlarmClock,
  },
  {
    title: 'Duidelijke controlemomenten',
    description:
      'Vooraf is vastgelegd wie wat controleert en wanneer. Zo is er geen twijfel over wie een post beoordeelt.',
    icon: FileCheck2,
  },
  {
    title: 'Signaleren van onregelmatigheden',
    description:
      'Wijkt een post af of ontbreekt een document, dan melden wij dat met de onderbouwing erbij in plaats van een aanname te doen.',
    icon: Search,
  },
  {
    title: 'Binnen uw procedures',
    description:
      'Wij werken volgens de procedures van het opdrachtgeverkantoor en leggen onze stappen zo vast dat ze navolgbaar zijn.',
    icon: ScaleIcon,
  },
  {
    title: 'Ook bij EU-transacties',
    description:
      'Voor leveringen en diensten binnen de EU bereiden wij de gegevens voor de ICP-opgave voor en controleren wij de administratieve verwerking.',
    icon: Globe2,
  },
];

/** De drie rollen rond een btw-aangifte, expliciet gescheiden. */
const roles = [
  {
    title: 'Administratieve voorbereiding',
    who: 'MERIT',
    description:
      'Verwerken, controleren van coderingen en rekeningen, aansluiten op het grootboek, signaleren van ontbrekende documenten en afwijkingen, en het opbouwen van de onderbouwing en controledocumentatie.',
  },
  {
    title: 'Fiscale beoordeling',
    who: 'Uw kantoor, tenzij anders overeengekomen',
    description:
      'Het fiscaal beoordelen van posten, standpunten en bijzondere situaties. MERIT signaleert en onderbouwt; de beoordeling vindt plaats volgens de afspraken die wij met uw kantoor maken.',
  },
  {
    title: 'Goedkeuring en indiening',
    who: 'Uw kantoor, tenzij anders overeengekomen',
    description:
      'Het controleren, goedkeuren en indienen van de aangifte bij de Belastingdienst. Wij leggen per samenwerking schriftelijk vast wie deze stappen uitvoert.',
  },
];

export default function BtwAangiften() {
  return (
    <>
      <Seo
        title="Btw-aangiften en fiscale administratieve ondersteuning"
        description="Btw-aangifte uitbesteden: MERIT bereidt periodieke btw-aangiften voor, controleert btw-coderingen en -rekeningen, sluit de btw-administratie aan op het grootboek en bereidt ICP-opgaven voor. Vaste tarieven op afspraak."
        canonicalPath={routes.btwAangiften.path}
        jsonLd={[
          serviceJsonLd({
            name: 'Btw-aangiften en fiscale administratieve ondersteuning',
            description:
              'Voorbereiden en verwerken van periodieke btw-aangiften voor administratie- en accountantskantoren: controle van btw-coderingen en btw-rekeningen, aansluiting op het grootboek, voorbereiding van ICP-opgaven en controledocumentatie.',
            path: routes.btwAangiften.path,
          }),
          breadcrumbJsonLd([
            { name: 'Diensten', path: routes.diensten.path },
            { name: 'Btw-aangiften', path: routes.btwAangiften.path },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Btw-aangiften"
        title="Btw-aangiften en fiscale administratieve ondersteuning"
        intro="Voor Nederlandse administratie- en accountantskantoren die btw-gerelateerde werkzaamheden willen uitbesteden. Wij verzorgen de voorbereiding, verwerking en controle; uw kantoor houdt de fiscale beoordeling en de indiening in de hand."
        breadcrumbs={[
          { name: 'Diensten', path: routes.diensten.path },
          { name: 'Btw-aangiften', path: routes.btwAangiften.path },
        ]}
      />

      <ServiceIntro
        title="Minder druk rond elke aangifteperiode"
        paragraphs={[
          'Elke aangifteperiode komt er een piek bij: controleren, aansluiten en op tijd aanleveren, voor een groot aantal administraties tegelijk. Wij nemen dat voorbereidende en verwerkende werk over, zodat uw kantoor de tijd houdt voor de beoordeling.',
          'Wij controleren de btw-verwerking in de onderliggende administratie, sluiten de btw-administratie aan op het grootboek en bouwen de onderbouwing op. Wat afwijkt of ontbreekt, melden wij met de onderbouwing erbij.',
          'Wij werken met een vast tarief per opdracht in plaats van een uurtarief. De prijs wordt afgestemd op het aantal administraties, de complexiteit van de btw-verwerking en de omvang van de werkzaamheden; u ontvangt vooraf een duidelijk voorstel.',
        ]}
        priceFrom={QUOTED_LABEL}
        quoted
        quotedNote={QUOTED_NOTE.btw}
        serviceId="btw-aangiften"
        ctaLabel="Bespreek uw btw-aangiften"
      />

      <WorkScope
        groups={groups}
        heading={{
          eyebrow: 'Werkzaamheden',
          title: 'Welke btw-werkzaamheden wij uitvoeren',
          description:
            'Van de periodieke aangifte tot het herstellen van eerdere perioden. U bepaalt welke onderdelen u uitbesteedt.',
        }}
      />

      {/* Expliciet onderscheid tussen voorbereiding, beoordeling en indiening */}
      <Section tone="default" id="rollen" aria-labelledby="rollen-title">
        <Container>
          <SectionHeading
            id="rollen-title"
            eyebrow="Verantwoordelijkheden"
            title="Wie bereidt voor, wie beoordeelt en wie dient in"
            description="Bij btw-werkzaamheden is het belangrijk dat hierover geen onduidelijkheid bestaat. Daarom scheiden wij de drie rollen en leggen wij ze schriftelijk vast."
            align="center"
            className="reveal"
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
            {roles.map((role, index) => (
              <li
                key={role.title}
                className="reveal flex h-full flex-col rounded-lg border border-default bg-surface p-6 md:p-7"
              >
                <p className="text-sm font-bold tracking-wide text-accent-text tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{role.title}</h3>
                <p className="mt-2 text-sm font-semibold text-primary">{role.who}</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  {role.description}
                </p>
              </li>
            ))}
          </ol>
          <Notice tone="scope" title="Vastgelegd per samenwerking" className="reveal mt-10">
            MERIT verzorgt de administratieve voorbereiding en verwerking. De fiscale beoordeling,
            de goedkeuring en het indienen van de aangifte vinden plaats volgens de afspraken die
            wij met uw kantoor maken. Standaard ligt de controle, goedkeuring en indiening bij het
            opdrachtgeverkantoor. Afwijkende afspraken zijn mogelijk en worden schriftelijk
            vastgelegd voordat de werkzaamheden starten.
          </Notice>
        </Container>
      </Section>

      <Emphasis
        points={points}
        tone="alt"
        heading={{
          eyebrow: 'Waar wij op letten',
          title: 'Nauwkeurig, tijdig en navolgbaar',
          description:
            'Btw-werk is detailwerk. Wij richten het zo in dat uw kantoor kan zien wat is gecontroleerd en waarop een melding is gebaseerd.',
        }}
      />

      <RelatedServices currentId="btw-aangiften" tone="default" />

      <CtaBand
        title="Btw-werkzaamheden uitbesteden?"
        text="Vertel ons om hoeveel administraties het gaat en wat de werkzaamheden omvatten. U ontvangt vooraf een voorstel met een vast tarief."
        primary={{ label: 'Vraag een prijsvoorstel aan', to: `${routes.offerte.path}?dienst=btw-aangiften` }}
        secondary={{ label: 'Plan een kennismaking', to: routes.kennismaking.path }}
        tone="alt"
      />
    </>
  );
}
