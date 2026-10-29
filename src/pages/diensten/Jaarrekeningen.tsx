import { ClipboardCheck, FileSpreadsheet, Layers, Search, ShieldCheck, SquareStack } from 'lucide-react';
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
    title: 'Voorbereiden van de jaarafsluiting',
    intro: 'De administratie controleerbaar en sluitend maken.',
    items: [
      'Administraties voorbereiden voor de jaarafsluiting',
      'Grootboekrekeningen controleren',
      'Bankadministraties aansluiten',
      'Tussenrekeningen controleren',
    ],
  },
  {
    title: 'Controle van posten',
    intro: 'Vaststellen of de balansposten kloppen en onderbouwd zijn.',
    items: [
      'Debiteuren en crediteuren controleren',
      'Ondersteuning bij vaste activa en afschrijvingen',
      'Overlopende posten voorbereiden en controleren',
      'Ontbrekende boekingen en documenten signaleren',
    ],
  },
  {
    title: 'Specificaties en dossier',
    intro: 'De onderbouwing opbouwen waarop de jaarrekening rust.',
    items: [
      'Specificaties van balansrekeningen opstellen',
      'Balansdossiers voorbereiden',
      'Aansluitingen en specificaties voor de jaarrekening opstellen',
      'Financiële overzichten voorbereiden',
    ],
  },
  {
    title: 'Afronding en correcties',
    intro: 'De laatste stappen, volgens uw instructies.',
    items: [
      'Correcties verwerken na afstemming met u',
      'Aansluitingen na correcties opnieuw controleren',
      'Ondersteunen bij het samenstellen van conceptjaarrekeningen, voor zover dit binnen de expertise en opdracht valt',
      'Vastleggen wat is gecontroleerd en wat openstaat',
    ],
  },
];

const points = [
  {
    title: 'Sluitende aansluitingen',
    description:
      'Elke balanspost wordt teruggebracht tot een onderbouwing die aansluit op het grootboek en op de onderliggende stukken.',
    icon: ShieldCheck,
  },
  {
    title: 'Dossier dat te volgen is',
    description:
      'Wij bouwen het balansdossier zo op dat een reviewer of uw eigen medewerker kan zien waarop een post is gebaseerd.',
    icon: FileSpreadsheet,
  },
  {
    title: 'Signaleren in plaats van aannemen',
    description:
      'Ontbreekt een boeking of document, dan melden wij dat met de onderbouwing erbij. Wij vullen geen gaten met aannames.',
    icon: Search,
  },
  {
    title: 'Capaciteit in het jaarwerkseizoen',
    description:
      'Juist in de piekperiode kunt u afgebakende voorbereidende werkzaamheden overdragen, zodat uw eigen uren naar beoordeling gaan.',
    icon: Layers,
  },
  {
    title: 'Volgens uw instructies',
    description:
      'Correcties en aansluitingen stemmen wij eerst met u af; wij vullen niets in op eigen interpretatie.',
    icon: ClipboardCheck,
  },
  {
    title: 'Meerdere administraties',
    description:
      'Wij kunnen meerdere administraties naast elkaar voorbereiden en spreken vooraf af welke omvang haalbaar is binnen de doorlooptijd.',
    icon: SquareStack,
  },
];

/** Vier begrippen die in de praktijk vaak door elkaar lopen, hier expliciet gescheiden. */
const distinctions = [
  {
    title: 'Administratieve jaarafsluiting',
    merit: true,
    description:
      'De administratie van een boekjaar controleerbaar en sluitend maken: posten controleren, aansluitingen maken en specificaties opstellen.',
  },
  {
    title: 'Voorbereiding van een jaarrekening',
    merit: true,
    description:
      'Het opbouwen van het balansdossier, de aansluitingen, de specificaties en de financiële overzichten waarop de jaarrekening wordt gebaseerd.',
  },
  {
    title: 'Het samenstellen van een jaarrekening',
    merit: 'partly' as const,
    description:
      'Het opstellen van de jaarrekening zelf. MERIT kan hierbij ondersteunen voor zover dit binnen de expertise en de opdracht valt; de definitieve beoordeling en vaststelling liggen bij de bevoegde verantwoordelijke partij.',
  },
  {
    title: 'Wettelijke accountantscontrole',
    merit: false,
    description:
      'Een wettelijk geregelde controleopdracht met assurance. MERIT voert deze niet uit en is geen accountantsorganisatie die wettelijke controles verricht.',
  },
];

const markLabels = {
  true: { text: 'MERIT voert dit uit', className: 'bg-success-soft text-success' },
  partly: { text: 'Ondersteuning binnen de opdracht', className: 'bg-accent-soft text-accent-text' },
  false: { text: 'Niet door MERIT', className: 'bg-surface-muted text-muted' },
} as const;

export default function Jaarrekeningen() {
  return (
    <>
      <Seo
        title="Jaarrekening en jaarafsluiting voor zzp en mkb"
        description="Uw boekjaar laten afsluiten: MERIT controleert de volledigheid van uw administratie, sluit de grootboekrekeningen aan en bereidt uw jaarrekening voor en stelt die samen. Vaste tarieven op afspraak."
        canonicalPath={routes.jaarrekeningen.path}
        jsonLd={[
          serviceJsonLd({
            name: 'Jaarrekeningen & jaarafsluiting',
            description:
              'Administratieve jaarafsluiting en het voorbereiden en samenstellen van de jaarrekening voor zzp’ers en mkb-ondernemers: controle van grootboek- en balansposten, aansluitingen en specificaties van balansrekeningen.',
            path: routes.jaarrekeningen.path,
          }),
          breadcrumbJsonLd([
            { name: 'Diensten', path: routes.diensten.path },
            { name: 'Jaarrekeningen & jaarafsluiting', path: routes.jaarrekeningen.path },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Jaarrekeningen & jaarafsluiting"
        title="Uw boekjaar netjes afgesloten"
        intro="Aan het einde van het boekjaar moet uw administratie kloppen en compleet zijn. Wij controleren, sluiten aan en bereiden uw jaarrekening voor en stellen die samen."
        breadcrumbs={[
          { name: 'Diensten', path: routes.diensten.path },
          { name: 'Jaarrekeningen & jaarafsluiting', path: routes.jaarrekeningen.path },
        ]}
      />

      <ServiceIntro
        title="Het jaarwerk uit handen, zonder zoekwerk achteraf"
        paragraphs={[
          'Aan het einde van het boekjaar blijkt pas wat er ontbreekt. Een factuur die nooit is aangeleverd, een bankregel die niet klopt, een post die niet aansluit. Het achteraf uitzoeken daarvan kost onnodig veel tijd.',
          'Wij controleren de volledigheid van uw administratie, sluiten de grootboekrekeningen aan, controleren debiteuren, crediteuren en tussenrekeningen en stellen de specificaties op. Ontbreekt er iets, dan vragen wij dat tijdig bij u op in plaats van het later te moeten reconstrueren.',
          'Daarna bereiden wij uw jaarrekening voor en stellen die samen binnen de dienstverlening die wij met u afspreken. Wij werken met een vast tarief per opdracht: de prijs hangt af van uw rechtsvorm, de omvang van de administratie en de staat waarin het boekjaar wordt aangeleverd.',
        ]}
        priceFrom={QUOTED_LABEL}
        quoted
        quotedNote={QUOTED_NOTE.jaarrekeningen}
        serviceId="jaarrekeningen"
        ctaLabel="Bespreek uw jaarafsluiting"
      />

      <WorkScope
        groups={groups}
        heading={{
          eyebrow: 'Werkzaamheden',
          title: 'Wat wij rond de jaarafsluiting verzorgen',
          description:
            'Van het voorbereiden van de administratie tot een compleet balansdossier met specificaties en aansluitingen.',
        }}
      />

      {/* Vier begrippen expliciet gescheiden */}
      <Section tone="default" id="afbakening" aria-labelledby="afbakening-title">
        <Container>
          <SectionHeading
            id="afbakening-title"
            eyebrow="Afbakening"
            title="Vier verschillende opdrachten, duidelijk gescheiden"
            description="Rond jaarwerk lopen begrippen in de praktijk vaak door elkaar. Daarom maken wij expliciet welke werkzaamheden MERIT uitvoert en welke niet."
            align="center"
            className="reveal"
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
            {distinctions.map((item) => {
              const mark = markLabels[String(item.merit) as keyof typeof markLabels];
              return (
                <li
                  key={item.title}
                  className="reveal flex h-full flex-col rounded-lg border border-default bg-surface p-6 md:p-7"
                >
                  <span
                    className={`inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${mark.className}`}
                  >
                    {mark.text}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ul>
          <Notice tone="scope" title="Verantwoordelijkheid en vaststelling" className="reveal mt-10">
            MERIT verzorgt de administratieve voorbereiding en de overeengekomen werkzaamheden. De
            verantwoordelijkheid voor de definitieve beoordeling en vaststelling van de jaarstukken
            ligt volgens de afspraken bij de bevoegde verantwoordelijke partij. MERIT presenteert
            zich niet als accountantsorganisatie die wettelijke controles uitvoert en verricht geen
            assurance-opdrachten.
          </Notice>
        </Container>
      </Section>

      <Emphasis
        points={points}
        tone="alt"
        heading={{
          eyebrow: 'Waar wij op letten',
          title: 'Een dossier waarop u verder kunt bouwen',
          description:
            'Voorbereidend jaarwerk is pas bruikbaar als het navolgbaar is. Daar richten wij de werkzaamheden op in.',
        }}
      />

      <RelatedServices currentId="jaarrekeningen" tone="default" />

      <CtaBand
        title="Ondersteuning nodig bij de jaarafsluiting?"
        text="Vertel ons om hoeveel administraties het gaat en welke doorlooptijd u nodig heeft. U ontvangt vooraf een voorstel met een vast tarief."
        primary={{ label: 'Vraag een prijsvoorstel aan', to: `${routes.offerte.path}?dienst=jaarrekeningen` }}
        secondary={{ label: 'Plan een kennismaking', to: routes.kennismaking.path }}
        tone="alt"
      />
    </>
  );
}
