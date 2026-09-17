import { ArrowRight, Building2, Calculator, Globe2, UserRound } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/sections/PageHero';
import { Checklist, FeatureGrid, TextSection } from '@/sections/ContentBlocks';
import { Faq } from '@/sections/Faq';
import { CtaBand } from '@/sections/CtaBand';
import { routes } from '@/config/routes';
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/seo/json-ld';

const description =
  'Btw-, ICP-, IB- en vpb-aangifte: MERIT Administratie & Advies bereidt uw belastingaangiften zorgvuldig voor, bewaakt de termijnen en stemt alles met u af.';

const aangiften = [
  {
    title: 'Btw-aangifte',
    text: 'Periodieke aangifte omzetbelasting op basis van uw verwerkte in- en verkopen. Wij bewaken de termijn en dienen de aangifte in na afstemming met u.',
    icon: Calculator,
  },
  {
    title: 'ICP-aangifte',
    text: 'Levert u goederen of diensten aan ondernemers in andere EU-landen, dan hoort daar een opgaaf intracommunautaire prestaties bij. Wij verzorgen deze in samenhang met de btw-aangifte.',
    icon: Globe2,
  },
  {
    title: 'Aangifte inkomstenbelasting (IB)',
    text: 'Voor zzp’ers en eenmanszaken: de jaarlijkse aangifte waarin uw ondernemingsresultaat wordt meegenomen. Wij bereiden de cijfers voor en stellen de aangifte met u op.',
    icon: UserRound,
  },
  {
    title: 'Aangifte vennootschapsbelasting (vpb)',
    text: 'Voor bv’s: de jaarlijkse aangifte op basis van de jaarcijfers. Wij verzorgen de administratieve voorbereiding en de aangifte in afstemming met u.',
    icon: Building2,
  },
];

const watWijDoen = [
  { title: 'Termijnen bewaken', text: 'U hoort tijdig wat wij van u nodig hebben.' },
  { title: 'Cijfers voorbereiden', text: 'Op basis van een gecontroleerde administratie.' },
  { title: 'Aangifte opstellen', text: 'Wij stellen de aangifte op en stemmen die met u af.' },
  { title: 'Indienen', text: 'Na uw akkoord dienen wij de aangifte in.' },
  { title: 'Correspondentie', text: 'Ondersteuning bij vragen of brieven van de Belastingdienst, in overleg met u.' },
  { title: 'Overzicht bewaren', text: 'Ingediende aangiften en onderbouwing blijven netjes gearchiveerd.' },
];

const faq = [
  {
    question: 'Verzorgen jullie ook fiscaal advies?',
    answer:
      'Onze kern is de administratieve verwerking en voorbereiding van aangiften. Waar wij mogelijkheden of aandachtspunten zien, benoemen wij die. Voor specifieke fiscale vraagstukken stemmen wij met u af of aanvullend advies nodig is.',
  },
  {
    question: 'Wanneer moet ik welke aangifte doen?',
    answer:
      'Dat hangt af van uw rechtsvorm en de afspraken met de Belastingdienst, bijvoorbeeld per maand, kwartaal of jaar. Bij de start van de samenwerking brengen wij in kaart welke aangiften voor u gelden en bewaken wij de termijnen.',
  },
  {
    question: 'Wat heb ik nodig voor een aangifte?',
    answer:
      'Een volledige en verwerkte administratie over de betreffende periode: facturen, bonnen en bankmutaties. Verzorgen wij uw administratie, dan hebben wij alles al in huis en vragen wij alleen nog wat ontbreekt.',
  },
];

export default function Belastingaangifte() {
  return (
    <>
      <Seo
        title="Belastingaangifte: btw, ICP, IB en vpb"
        description={description}
        jsonLd={[
          serviceJsonLd({ name: 'Belastingaangifte', description, path: routes.belastingaangifte.path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Diensten', path: routes.diensten.path },
            { name: 'Belastingaangifte', path: routes.belastingaangifte.path },
          ]),
          faqJsonLd(faq),
        ]}
      />
      <PageHero
        eyebrow="Belastingaangifte"
        title="Uw belastingadministratie overzichtelijk geregeld"
        intro="Btw, ICP, inkomstenbelasting en vennootschapsbelasting: wij bereiden uw aangiften zorgvuldig voor, bewaken de termijnen en stemmen alles met u af voordat het wordt ingediend."
        breadcrumbs={[
          { name: 'Diensten', path: routes.diensten.path },
          { name: 'Belastingaangifte', path: routes.belastingaangifte.path },
        ]}
        actions={
          <Button to={routes.kennismaking.path} iconRight={<ArrowRight />}>
            Bespreek uw situatie
          </Button>
        }
      />

      <FeatureGrid
        id="aangiften"
        eyebrow="Aangiften"
        title="Welke aangiften wij verzorgen"
        description="Welke aangiften voor u gelden, hangt af van uw rechtsvorm en activiteiten. Wij brengen dit bij de start in kaart."
        items={aangiften}
      />

      <TextSection
        id="verwerking-versus-advies"
        eyebrow="Goed om te weten"
        title="Administratieve verwerking of fiscaal advies?"
        description="Wij zijn duidelijk over wat u van ons mag verwachten."
        tone="alt"
      >
        <p>
          <strong>Administratieve verwerking en ondersteuning</strong> is onze kern: wij zorgen dat
          uw administratie klopt, bereiden de aangiften voor op basis van die administratie, stemmen
          ze met u af en dienen ze in. Wij bewaken de termijnen en houden de onderbouwing bij.
        </p>
        <p>
          <strong>Fiscaal advies</strong> gaat verder: bijvoorbeeld de keuze van een rechtsvorm, de
          gevolgen van een investering of een specifieke regeling. Waar wij aandachtspunten zien,
          benoemen wij die. Is er een uitgebreider fiscaal vraagstuk, dan bespreken wij met u of en
          hoe daar passend advies bij ingeschakeld wordt.
        </p>
        <p>
          Zo weet u altijd waar u aan toe bent en wordt niets stilzwijgend aangenomen.
        </p>
      </TextSection>

      <Checklist
        id="wat-wij-doen"
        eyebrow="Wat wij voor u kunnen doen"
        title="Van voorbereiding tot indiening"
        items={watWijDoen}
        tone="default"
      />

      <Faq items={faq} title="Vragen over belastingaangiften" description="De meest gestelde vragen over aangiften en onze rol daarin." />

      <CtaBand
        title="Bespreek uw situatie"
        text="Wij bekijken samen welke aangiften voor u gelden en hoe wij die zorgvuldig voor u verzorgen."
        primary={{ label: 'Bespreek uw situatie', to: routes.kennismaking.path }}
      />
    </>
  );
}
