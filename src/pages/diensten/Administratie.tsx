import { ArrowRight, BookOpenCheck, ClipboardList, Landmark, Receipt } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/sections/PageHero';
import { Checklist, FeatureGrid, TextSection } from '@/sections/ContentBlocks';
import { HowItWorks } from '@/sections/HowItWorks';
import { CtaBand } from '@/sections/CtaBand';
import { routes } from '@/config/routes';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/json-ld';

const description =
  'Financiële administratie en boekhouding voor zzp’ers, eenmanszaken en bv’s: facturen en bankmutaties verwerkt, overzicht in uw cijfers en tijdige aangiften.';

const onderdelen = [
  {
    title: 'Boekhouding',
    text: 'Verwerking van inkoop- en verkoopfacturen, bankmutaties en kasstukken in een sluitende boekhouding.',
    icon: BookOpenCheck,
  },
  {
    title: 'Btw en aangiften',
    text: 'Voorbereiding en indiening van de btw-aangifte en, waar van toepassing, de ICP-opgaaf.',
    icon: Landmark,
  },
  {
    title: 'Debiteuren en crediteuren',
    text: 'Overzicht van openstaande verkoop- en inkoopfacturen, zodat u weet wat er nog binnenkomt en betaald moet worden.',
    icon: Receipt,
  },
  {
    title: 'Administratieve ondersteuning',
    text: 'Praktische hulp bij facturatie, documentbeheer en administratieve vragen die tijdens het ondernemen ontstaan.',
    icon: ClipboardList,
  },
];

const watWijDoen = [
  { title: 'Inrichten van uw administratie', text: 'Een opzet die past bij uw rechtsvorm en werkwijze.' },
  { title: 'Verwerken van facturen en bonnen', text: 'Digitaal aangeleverd, periodiek verwerkt en gecontroleerd.' },
  { title: 'Verwerken van bankmutaties', text: 'Afgestemd met de facturen zodat de boekhouding sluit.' },
  { title: 'Btw-aangifte voorbereiden en indienen', text: 'Op basis van de verwerkte administratie, binnen de termijn.' },
  { title: 'Periodiek overzicht van uw cijfers', text: 'Inkomsten, kosten en resultaat, in begrijpelijke vorm.' },
  { title: 'Voorbereiding van de jaarcijfers', text: 'Een gecontroleerde administratie als basis voor de jaarlijkse aangifte.' },
  { title: 'Aanspreekpunt voor vragen', text: 'Over uw administratie, facturen of het aanleveren van stukken.' },
  { title: 'Afstemming met derden', text: 'Bijvoorbeeld met uw bank of de Belastingdienst, in overleg met u.' },
];

export default function Administratie() {
  return (
    <>
      <Seo
        title="Financiële administratie en boekhouding"
        description={description}
        jsonLd={[
          serviceJsonLd({ name: 'Financiële administratie en boekhouding', description, path: routes.administratie.path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Diensten', path: routes.diensten.path },
            { name: 'Administratie', path: routes.administratie.path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Administratie & boekhouding"
        title="Uw administratie overzichtelijk geregeld"
        intro="Een administratie die klopt en actueel is, geeft rust en inzicht. Wij verwerken uw financiële gegevens, houden het overzicht en zorgen dat u altijd weet waar u staat."
        breadcrumbs={[
          { name: 'Diensten', path: routes.diensten.path },
          { name: 'Administratie', path: routes.administratie.path },
        ]}
        actions={
          <>
            <Button to={routes.kennismaking.path} iconRight={<ArrowRight />}>
              Bespreek uw administratie
            </Button>
            <Button to={routes.offerte.path} variant="outline">
              Vraag een offerte aan
            </Button>
          </>
        }
      />

      <TextSection
        id="wat-is"
        eyebrow="Wat het omvat"
        title="Wat financiële administratie inhoudt"
        description="Meer dan alleen bonnetjes bewaren: het is het fundament onder elke beslissing die u als ondernemer neemt."
      >
        <p>
          Uw financiële administratie is het geheel van alle gegevens over de inkomsten, uitgaven,
          bezittingen en schulden van uw onderneming. Denk aan verkoopfacturen, inkoopfacturen,
          bankafschriften, kasstukken en contracten. Als ondernemer bent u verplicht deze
          administratie bij te houden en te bewaren.
        </p>
        <p>
          Een goede administratie doet meer dan voldoen aan die verplichting. Ze laat zien hoe uw
          onderneming ervoor staat, vormt de basis voor de btw-aangifte en de jaarlijkse aangifte, en
          helpt u onderbouwde keuzes te maken: investeren, prijzen aanpassen of juist even wachten.
        </p>
        <p>
          <strong>Waarom actueel belangrijk is:</strong> een administratie die achterloopt, geeft een
          vertekend beeld. Openstaande facturen blijven onopgemerkt, btw-termijnen komen te dichtbij
          en vragen van de Belastingdienst kosten onnodig veel tijd. Door periodiek te verwerken
          blijft alles overzichtelijk en voorkomt u verrassingen.
        </p>
      </TextSection>

      <FeatureGrid
        id="onderdelen"
        eyebrow="Onderdelen"
        title="Wat wij voor u verzorgen"
        description="Wij nemen de administratieve werkzaamheden uit handen die u tijd kosten, en stemmen de omvang af op uw situatie."
        items={onderdelen}
        tone="alt"
      />

      <Checklist
        id="wat-wij-doen"
        eyebrow="Wat wij voor u kunnen doen"
        title="Concreet: onze werkzaamheden"
        description="Afhankelijk van uw wensen verzorgen wij een deel of het geheel van onderstaande werkzaamheden."
        items={watWijDoen}
        tone="default"
      />

      <TextSection
        id="samenwerking"
        eyebrow="Samenwerking"
        title="Zo werkt de samenwerking"
        description="Duidelijke afspraken over wat u aanlevert en wat wij verwerken."
        tone="alt"
      >
        <p>
          U levert uw facturen, bonnen en overige stukken digitaal aan; wij maken hierover bij de
          start praktische afspraken, zodat het u zo min mogelijk tijd kost. Wij verwerken de
          administratie periodiek, controleren of alles sluit en bereiden de aangiften voor.
        </p>
        <p>
          U heeft één vast aanspreekpunt. Vragen over een factuur, een betaling of de btw stelt u
          direct aan ons. Wij houden u op de hoogte van wat er speelt en wat er van u wordt verwacht,
          bijvoorbeeld rond de aangiftetermijnen.
        </p>
        <p>
          Werkt u al met boekhoudsoftware of heeft u een voorkeur, dan bespreken wij graag hoe dat
          in de samenwerking past.
        </p>
      </TextSection>

      <HowItWorks />

      <CtaBand
        title="Bespreek uw administratie"
        text="Laten we samen bekijken hoe wij uw administratie overzichtelijk en actueel houden."
        primary={{ label: 'Bespreek uw administratie', to: routes.kennismaking.path }}
      />
    </>
  );
}
