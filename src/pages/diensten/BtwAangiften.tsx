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
      'Wij spreken per aangifteperiode af wanneer het werk klaar is, zodat de aangifte ruim voor de uiterste datum kan worden ingediend.',
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
      'Wij leggen onze stappen zo vast dat u kunt zien wat is gecontroleerd en waarop een melding is gebaseerd.',
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
    title: 'Bijzondere situaties',
    who: 'In overleg',
    description:
      'Posten waarover twijfel bestaat of die een fiscaal standpunt vragen, leggen wij aan u voor met een onderbouwing. Valt een vraagstuk buiten onze deskundigheid, dan geven wij dat aan.',
  },
  {
    title: 'Goedkeuring en indiening',
    who: 'Volgens de afspraak met u',
    description:
      'Het controleren, goedkeuren en indienen van de aangifte bij de Belastingdienst. Wij leggen vooraf schriftelijk vast of u dat zelf doet of dat wij dat voor u verzorgen.',
  },
];

export default function BtwAangiften() {
  return (
    <>
      <Seo
        title="Btw-aangifte voor zzp’ers en mkb-ondernemers"
        description="Uw btw-aangifte uitbesteden: MERIT bereidt uw btw-aangifte voor, controleert de btw-coderingen en sluit uw btw-administratie aan op uw boekhouding. Vaste tarieven op afspraak."
        canonicalPath={routes.btwAangiften.path}
        jsonLd={[
          serviceJsonLd({
            name: 'Btw-aangiften',
            description:
              'Voorbereiden en verwerken van periodieke btw-aangiften voor zzp’ers en mkb-ondernemers: controle van btw-coderingen en btw-rekeningen, aansluiting op de boekhouding, voorbereiding van ICP-opgaven en controledocumentatie.',
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
        title="Uw btw-aangifte op tijd en zonder zorgen"
        intro="Elk kwartaal of elke maand moet de aangifte er weer zijn. Wij bereiden die voor, controleren de btw-verwerking en zorgen dat alles aansluit op uw boekhouding."
        breadcrumbs={[
          { name: 'Diensten', path: routes.diensten.path },
          { name: 'Btw-aangiften', path: routes.btwAangiften.path },
        ]}
      />

      <ServiceIntro
        title="Elke aangifteperiode op tijd klaar"
        paragraphs={[
          'De btw-aangifte komt altijd op een moment dat het u slecht uitkomt. Wij zorgen dat uw btw-administratie op orde is en dat de aangifte ruim voor de uiterste datum klaarligt, zodat u er niet op het laatste moment achteraan hoeft.',
          'Wij controleren de btw-verwerking in uw administratie, sluiten die aan op uw boekhouding en bouwen de onderbouwing op. Ontbreekt er een factuur of valt er iets op, dan hoort u dat van ons met de onderbouwing erbij.',
          'Wij werken met een vast tarief per opdracht in plaats van een uurtarief. De prijs hangt af van het aantal aangiften per jaar en de omvang van uw administratie; u ontvangt vooraf een duidelijk voorstel.',
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
            'Van de periodieke aangifte tot het herstellen van eerdere perioden. U bepaalt welke onderdelen u uit handen geeft.',
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
            MERIT verzorgt de voorbereiding, de verwerking en de controle van uw btw-administratie.
            Of wij de aangifte ook indienen leggen wij vooraf schriftelijk met u vast. Wij doen geen
            toezeggingen over fiscale uitkomsten of over de hoogte van de af te dragen btw: wat u
            verschuldigd bent volgt uit uw omzet en kosten.
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
            'Btw-werk is detailwerk. Wij richten het zo in dat u kunt zien wat is gecontroleerd en waarop een melding is gebaseerd.',
        }}
      />

      <RelatedServices currentId="btw-aangiften" tone="default" />

      <CtaBand
        title="Uw btw-aangifte uit handen geven?"
        text="Vertel ons hoeveel aangiften u per jaar doet en hoe uw administratie eruitziet. U ontvangt vooraf een voorstel met een vast tarief."
        primary={{ label: 'Vraag een prijsvoorstel aan', to: `${routes.offerte.path}?dienst=btw-aangiften` }}
        secondary={{ label: 'Plan een kennismaking', to: routes.kennismaking.path }}
        tone="alt"
      />
    </>
  );
}
