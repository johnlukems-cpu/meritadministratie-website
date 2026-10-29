import { CalendarCheck, Eye, FileText, MessageCircle, Repeat, ShieldCheck } from 'lucide-react';
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
    title: 'Uw facturen en bankmutaties',
    intro: 'Het werk dat elke maand terugkomt, periodiek verwerkt.',
    items: [
      'Inkoopfacturen verwerken',
      'Verkoopfacturen verwerken',
      'Bankmutaties verwerken en afletteren',
      'Kas- en creditcardmutaties verwerken',
    ],
  },
  {
    title: 'Wat er openstaat',
    intro: 'Overzicht houden op geld dat binnenkomt en nog betaald moet worden.',
    items: [
      'Debiteurenadministratie bijhouden',
      'Crediteurenadministratie bijhouden',
      'Openstaande posten controleren',
      'Terugkoppeling van facturen die lang openstaan',
    ],
  },
  {
    title: 'Controle op juistheid',
    intro: 'Zorgen dat uw administratie klopt en navolgbaar is.',
    items: [
      'Volledigheid van de aangeleverde stukken controleren',
      'Grootboek- en tussenrekeningen controleren',
      'Ontbrekende facturen en bonnen signaleren',
      'Vastleggen wat is gecontroleerd en wat aandacht vraagt',
    ],
  },
  {
    title: 'Inzicht in uw cijfers',
    intro: 'Periodiek weten waar uw onderneming staat.',
    items: [
      'Overzicht van inkomsten en uitgaven',
      'Inzicht in uw resultaat over de periode',
      'Overzicht van wat er nog openstaat',
      'Toelichting in begrijpelijke taal',
    ],
  },
];

const points = [
  {
    title: 'Uw administratie blijft bij',
    description:
      'Door periodiek te verwerken loopt uw administratie niet achter. Dat voorkomt een berg werk aan het einde van het boekjaar.',
    icon: Repeat,
  },
  {
    title: 'Een vast bedrag per maand',
    description:
      'U weet vooraf wat u betaalt. Werkzaamheden die buiten het pakket vallen bespreken wij eerst met u.',
    icon: CalendarCheck,
  },
  {
    title: 'Aanleveren kost u weinig tijd',
    description:
      'Wij spreken af hoe u uw facturen en bonnen aanlevert op de manier die voor u het handigst werkt.',
    icon: FileText,
  },
  {
    title: 'U ziet waar u staat',
    description:
      'U krijgt periodiek inzicht in uw inkomsten, uitgaven en resultaat, zodat u met cijfers onderbouwd kunt beslissen.',
    icon: Eye,
  },
  {
    title: 'Eén vast aanspreekpunt',
    description:
      'U hoeft uw situatie niet telkens opnieuw uit te leggen en weet bij wie u terechtkunt.',
    icon: MessageCircle,
  },
  {
    title: 'Wij signaleren wat ontbreekt',
    description:
      'Missen er stukken of valt er iets op in uw cijfers, dan hoort u dat van ons — niet pas bij de jaarafsluiting.',
    icon: ShieldCheck,
  },
];

export default function FinancieleAdministratie() {
  return (
    <>
      <Seo
        title="Financiële administratie uitbesteden voor zzp en mkb"
        description="Uw financiële administratie uitbesteden: facturen, bankmutaties, debiteuren en crediteuren periodiek verwerkt, met inzicht in uw cijfers. Vanaf € 125 per maand."
        canonicalPath={routes.financieleAdministratie.path}
        jsonLd={[
          serviceJsonLd({
            name: 'Financiële administratie',
            description:
              'Het voeren van de financiële administratie voor zzp’ers en mkb-ondernemers: inkoop- en verkoopfacturen, bankmutaties, debiteuren- en crediteurenadministratie, controle op volledigheid en periodiek inzicht in de cijfers.',
            path: routes.financieleAdministratie.path,
          }),
          breadcrumbJsonLd([
            { name: 'Diensten', path: routes.diensten.path },
            { name: 'Financiële administratie', path: routes.financieleAdministratie.path },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Financiële administratie"
        title="Uw administratie bijgewerkt, zonder dat het uw tijd kost"
        intro="Wij verwerken uw facturen en bankmutaties, houden bij wat er openstaat en zorgen dat uw administratie klopt. U ziet periodiek waar uw onderneming staat."
        breadcrumbs={[
          { name: 'Diensten', path: routes.diensten.path },
          { name: 'Financiële administratie', path: routes.financieleAdministratie.path },
        ]}
      />

      <ServiceIntro
        title="Uw boekhouding uit handen, het overzicht in handen"
        paragraphs={[
          'Als ondernemer gaat uw tijd naar uw klanten. De administratie schuift dan makkelijk op, totdat de btw-aangifte eraan komt of het boekjaar moet worden afgesloten. Wij nemen die werkzaamheden van u over en verwerken uw administratie periodiek, zodat die bij blijft.',
          'U levert uw facturen en bonnen digitaal aan op de manier die voor u het handigst werkt. Wij verwerken ze, controleren of alles compleet is en laten het u weten als er iets ontbreekt. Daarmee voorkomt u dat u er achteraf achteraan moet.',
          'U ontvangt periodiek een overzicht van uw inkomsten, uitgaven en resultaat, met een toelichting in gewone taal. Zo weet u niet alleen wat er op uw rekening staat, maar ook hoe uw onderneming ervoor staat.',
        ]}
        priceFrom="vanaf € 125 per maand"
        ctaLabel="Bespreek uw administratie"
      />

      <WorkScope
        groups={groups}
        heading={{
          eyebrow: 'Werkzaamheden',
          title: 'Wat wij voor u verzorgen',
          description:
            'U bepaalt wat u uit handen geeft. Wij leggen de afbakening vooraf schriftelijk vast.',
        }}
      />

      <Section tone="default">
        <Container narrow>
          <Notice tone="scope" title="Wat wel en niet binnen het maandbedrag valt" className="reveal">
            Het maandbedrag dekt de periodieke verwerking van uw administratie zoals wij die vooraf
            met u afspreken. De jaarafsluiting en jaarrekening, aangiften inkomstenbelasting of
            vennootschapsbelasting en het inhalen van een achterstand vallen daar niet automatisch
            onder; die werkzaamheden bakenen wij apart af en offreren wij afzonderlijk. Wij leggen
            deze verdeling voorafgaand aan de samenwerking schriftelijk vast.
          </Notice>
        </Container>
      </Section>

      <Emphasis
        points={points}
        tone="alt"
        heading={{
          eyebrow: 'Onze aanpak',
          title: 'Praktisch, navolgbaar en zonder verrassingen',
          description:
            'Uw administratie uit handen geven werkt alleen als u blijft weten waar u staat.',
        }}
      />

      <RelatedServices currentId="financiele-administratie" tone="default" />

      <CtaBand
        title="Benieuwd wat dit voor uw onderneming betekent?"
        text="Bespreek in een kennismaking hoe uw administratie er nu voor staat en ontvang een voorstel met een vast maandbedrag."
        primary={{ label: 'Plan een kennismaking', to: routes.kennismaking.path }}
        tone="alt"
      />
    </>
  );
}
