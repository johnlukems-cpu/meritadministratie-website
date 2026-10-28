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
      'Correcties verwerken volgens de instructies van het opdrachtgeverkantoor',
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
      'Correcties en aansluitingen voeren wij uit volgens de instructies van het opdrachtgeverkantoor, niet op eigen interpretatie.',
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
        title="Jaarafsluiting en ondersteuning bij jaarrekeningen"
        description="Jaarafsluiting uitbesteden: MERIT bereidt administraties voor op de jaarafsluiting, controleert balansposten, stelt specificaties op en bereidt balansdossiers voor de jaarrekening voor. Vaste tarieven op afspraak."
        canonicalPath={routes.jaarrekeningen.path}
        jsonLd={[
          serviceJsonLd({
            name: 'Jaarafsluiting en ondersteuning bij jaarrekeningen',
            description:
              'Administratieve jaarafsluiting en jaarrekeningvoorbereiding voor administratie- en accountantskantoren: controle van grootboek- en balansposten, aansluitingen, specificaties van balansrekeningen en het voorbereiden van balansdossiers.',
            path: routes.jaarrekeningen.path,
          }),
          breadcrumbJsonLd([
            { name: 'Diensten', path: routes.diensten.path },
            { name: 'Jaarrekeningen & Jaarafsluiting', path: routes.jaarrekeningen.path },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Jaarrekeningen & Jaarafsluiting"
        title="Jaarafsluiting en ondersteuning bij jaarrekeningen"
        intro="Voor Nederlandse administratie- en accountantskantoren die ondersteuning nodig hebben bij het voorbereiden en afronden van financiële administraties. Wij maken de administratie controleerbaar en bouwen het dossier op; de beoordeling blijft bij uw kantoor."
        breadcrumbs={[
          { name: 'Diensten', path: routes.diensten.path },
          { name: 'Jaarrekeningen & Jaarafsluiting', path: routes.jaarrekeningen.path },
        ]}
      />

      <ServiceIntro
        title="Voorbereidend jaarwerk dat u kunt overdragen"
        paragraphs={[
          'In het jaarwerkseizoen moet veel tegelijk gebeuren: posten controleren, aansluitingen maken, specificaties opstellen en dossiers opbouwen. Dat werk is omvangrijk, maar laat zich goed afbakenen en overdragen.',
          'Wij verzorgen de administratieve voorbereiding: wij controleren grootboekrekeningen, sluiten bankadministraties aan, controleren debiteuren, crediteuren en tussenrekeningen, stellen specificaties van balansrekeningen op en bereiden het balansdossier voor. Correcties verwerken wij volgens de instructies van uw kantoor.',
          'Zo gaan uw eigen uren naar de beoordeling en het klantgesprek, en niet naar het uitzoekwerk eromheen. Wij werken met een vast tarief per opdracht: de prijs wordt bepaald op basis van de omvang van de administratie, de complexiteit van de jaarafsluiting en de gewenste werkzaamheden.',
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
