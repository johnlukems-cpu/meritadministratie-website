import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/sections/PageHero';
import { Checklist, StepsFlow, TextSection } from '@/sections/ContentBlocks';
import { Faq } from '@/sections/Faq';
import { CtaBand } from '@/sections/CtaBand';
import { routes } from '@/config/routes';
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/seo/json-ld';

const description =
  'Overstappen van boekhouder zonder gedoe. MERIT Administratie & Advies neemt uw administratie zorgvuldig over en regelt de overgang in vijf duidelijke stappen.';

const stappen = [
  {
    title: 'Kennismaken',
    text: 'We bespreken waarom u wilt overstappen, wat u verwacht en welke diensten u zoekt.',
  },
  {
    title: 'Huidige situatie bekijken',
    text: 'We kijken naar de staat van uw administratie, de gebruikte software en de lopende aangiften.',
  },
  {
    title: 'Overdracht voorbereiden',
    text: 'We stemmen de timing af en vragen de benodigde gegevens op bij uw huidige boekhouder.',
  },
  {
    title: 'Administratie overnemen',
    text: 'Wij nemen de administratie over, controleren de gegevens en brengen waar nodig structuur aan.',
  },
  {
    title: 'Samenwerking starten',
    text: 'Vanaf de afgesproken datum verzorgen wij uw administratie. U heeft één vast aanspreekpunt.',
  },
];

const watWijOvernemen = [
  { title: 'Lopende boekhouding', text: 'Inclusief openstaande posten en de aansluiting op het bankverloop.' },
  { title: 'Aangiften in de pijplijn', text: 'Wij nemen de eerstvolgende btw- of andere aangifte op ons.' },
  { title: 'Historische gegevens', text: 'Eerdere jaren worden gearchiveerd zodat alles terug te vinden blijft.' },
  { title: 'Structuur en overzicht', text: 'Waar de administratie rommelig is, brengen wij die op orde.' },
];

const faq = [
  {
    question: 'Wanneer is het beste moment om over te stappen?',
    answer:
      'Overstappen kan het hele jaar. De start van een nieuw kwartaal of boekjaar is vaak het meest praktisch, omdat de aangifteperiodes dan netjes aansluiten. Wij bespreken met u wat in uw situatie het handigst is.',
  },
  {
    question: 'Moet ik zelf mijn huidige boekhouder informeren?',
    answer:
      'U zegt zelf de samenwerking op volgens de afspraken die u met uw huidige boekhouder heeft. Het opvragen van de administratie en de afstemming over de overdracht kunnen wij van u overnemen.',
  },
  {
    question: 'Wat als mijn administratie niet helemaal op orde is?',
    answer:
      'Dat komt vaker voor en is geen probleem. Wij bekijken wat er ontbreekt of niet klopt, en brengen de administratie in overleg met u op orde.',
  },
];

export default function Overstappen() {
  return (
    <>
      <Seo
        title="Overstappen van boekhouder"
        description={description}
        jsonLd={[
          serviceJsonLd({ name: 'Overstappen van boekhouder', description, path: routes.overstappen.path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Diensten', path: routes.diensten.path },
            { name: 'Overstappen', path: routes.overstappen.path },
          ]),
          faqJsonLd(faq),
        ]}
      />
      <PageHero
        eyebrow="Overstappen"
        title="Overstappen van boekhouder?"
        intro="Niet tevreden over de communicatie, het overzicht of de aandacht? Overstappen hoeft niet ingewikkeld te zijn. Wij nemen uw bestaande administratie zorgvuldig over en brengen structuur aan."
        breadcrumbs={[
          { name: 'Diensten', path: routes.diensten.path },
          { name: 'Overstappen', path: routes.overstappen.path },
        ]}
        actions={
          <Button to={routes.kennismaking.path} iconRight={<ArrowRight />}>
            Bespreek uw overstap
          </Button>
        }
      />

      <TextSection
        id="waarom"
        eyebrow="Herkenbaar?"
        title="Redenen om over te stappen"
        description="Ondernemers kloppen om uiteenlopende redenen bij ons aan."
      >
        <p>
          Misschien duurt het lang voordat u antwoord krijgt, weet u niet precies waar u staat, of
          past de manier van werken niet meer bij uw onderneming. Soms is de administratie gegroeid
          en heeft u behoefte aan meer structuur; soms wilt u gewoon één aanspreekpunt dat uw
          situatie kent.
        </p>
        <p>
          Wat de reden ook is: wij zorgen dat de overgang rustig verloopt. Uw administratie wordt
          zorgvuldig overgenomen, gecontroleerd en waar nodig opnieuw gestructureerd, zodat u
          verder kunt zonder onderbreking.
        </p>
      </TextSection>

      <StepsFlow
        id="stappen"
        eyebrow="Zo werkt het"
        title="Overstappen in vijf stappen"
        description="Een duidelijk plan, zodat u precies weet wat er wanneer gebeurt."
        steps={stappen}
      />

      <Checklist
        id="wat-wij-overnemen"
        eyebrow="Overname van administratie"
        title="Wat wij van u overnemen"
        items={watWijOvernemen}
        tone="default"
      />

      <Faq items={faq} title="Vragen over overstappen" description="Wat ondernemers ons vragen voordat ze de stap zetten." />

      <CtaBand
        title="Bespreek uw overstap"
        text="In een kort gesprek bekijken wij uw situatie en leggen wij uit hoe de overgang in uw geval verloopt."
        primary={{ label: 'Bespreek uw overstap', to: routes.kennismaking.path }}
      />
    </>
  );
}
