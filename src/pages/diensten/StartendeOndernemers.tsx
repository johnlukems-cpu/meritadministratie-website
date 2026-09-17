import { ArrowRight, BookOpenCheck, Calculator, FileText, FolderKanban, Handshake, LayoutList } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/sections/PageHero';
import { Checklist, FeatureGrid, TextSection } from '@/sections/ContentBlocks';
import { CtaBand } from '@/sections/CtaBand';
import { routes } from '@/config/routes';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/json-ld';

const description =
  'Start u een onderneming? MERIT helpt met de inrichting van uw administratie in AFAS, facturatie, boekhouding en btw, zodat u vanaf dag één overzicht heeft.';

const onderdelen = [
  {
    title: 'Administratieve inrichting',
    text: 'Een opzet die past bij uw rechtsvorm en werkwijze: welke stukken u bewaart, hoe u ze aanlevert en wat wij verwerken.',
    icon: FolderKanban,
  },
  {
    title: 'Structuur',
    text: 'Duidelijke afspraken over periodes, aanlevering en overleg, zodat de administratie vanaf het begin bijblijft.',
    icon: LayoutList,
  },
  {
    title: 'Facturatie',
    text: 'Wat er op een factuur moet staan, hoe u nummert en hoe u openstaande facturen in beeld houdt.',
    icon: FileText,
  },
  {
    title: 'Boekhouding',
    text: 'Verwerking van uw eerste inkopen, verkopen en bankmutaties in een sluitende boekhouding.',
    icon: BookOpenCheck,
  },
  {
    title: 'Btw',
    text: 'Uitleg over de btw-aangifte in uw situatie en de voorbereiding en indiening van de eerste aangiften.',
    icon: Calculator,
  },
  {
    title: 'Samenwerking',
    text: 'Eén aanspreekpunt voor uw vragen, in een tempo dat past bij een onderneming die nog in opbouw is.',
    icon: Handshake,
  },
];

const checklist = [
  { title: 'Inschrijving en registraties op orde', text: 'Wij bespreken welke registraties en nummers u nodig heeft voor uw administratie.' },
  { title: 'Zakelijke bankrekening gescheiden', text: 'Privé en zakelijk uit elkaar houden maakt de administratie eenvoudiger.' },
  { title: 'Factuursjabloon dat voldoet', text: 'Met de verplichte gegevens, zodat facturen direct goed zijn.' },
  { title: 'Aanleverafspraken', text: 'Hoe en wanneer u bonnen en facturen deelt.' },
  { title: 'Eerste btw-aangifte begeleid', text: 'Wij nemen de eerste aangifte samen met u door.' },
  { title: 'Overzicht van uw cijfers', text: 'Vanaf het begin zicht op inkomsten, kosten en resultaat.' },
];

export default function StartendeOndernemers() {
  return (
    <>
      <Seo
        title="Administratie voor startende ondernemers"
        description={description}
        jsonLd={[
          serviceJsonLd({ name: 'Administratie voor startende ondernemers', description, path: routes.startendeOndernemers.path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Diensten', path: routes.diensten.path },
            { name: 'Startende ondernemers', path: routes.startendeOndernemers.path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Startende ondernemers"
        title="Een goede administratieve start"
        intro="Net begonnen of bijna zover? Een administratie die vanaf de eerste factuur klopt, bespaart u later veel tijd en zorgen. Wij richten alles met u in en begeleiden u bij de eerste stappen."
        breadcrumbs={[
          { name: 'Diensten', path: routes.diensten.path },
          { name: 'Startende ondernemers', path: routes.startendeOndernemers.path },
        ]}
        actions={
          <Button to={routes.kennismaking.path} iconRight={<ArrowRight />}>
            Plan een kennismaking
          </Button>
        }
      />

      <TextSection
        id="start"
        eyebrow="Waarom nu"
        title="Beginnen met overzicht"
        description="De eerste maanden bepalen hoe overzichtelijk uw administratie later is."
      >
        <p>
          Als startende ondernemer komt er veel op u af: klanten werven, uw aanbod scherp krijgen,
          misschien een website of werkruimte. De administratie is dan niet het eerste waar u aan
          denkt. Toch ontstaan juist in het begin de gewoontes die later bepalen of alles overzichtelijk
          blijft of dat u na een jaar met een doos bonnen zit.
        </p>
        <p>
          Wij helpen u een eenvoudige, werkbare structuur op te zetten: wat u bewaart, hoe u
          factureert, wanneer u wat aanlevert en welke aangiften voor u gelden. Zo weet u vanaf het
          begin waar u staat en houdt u tijd over voor uw onderneming.
        </p>
      </TextSection>

      <FeatureGrid
        id="onderdelen"
        eyebrow="Waarmee wij helpen"
        title="De onderdelen van een goede start"
        items={onderdelen}
        columns={3}
        tone="alt"
      />

      <Checklist
        id="checklist"
        eyebrow="Startchecklist"
        title="Wat we samen op orde brengen"
        description="Een greep uit de zaken die wij bij de start met u doornemen."
        items={checklist}
        tone="default"
      />

      <TextSection
        id="samenwerken"
        eyebrow="Samenwerking"
        title="Samenwerken met een administratiekantoor"
        description="Zelf doen, uitbesteden of een combinatie: u kiest wat bij u past."
        tone="alt"
      >
        <p>
          Sommige starters willen zoveel mogelijk zelf doen en vooral een vangnet; anderen willen de
          administratie het liefst volledig uit handen geven. Beide kan. Wij stemmen de samenwerking
          af op uw situatie en passen die aan als uw onderneming groeit.
        </p>
        <p>
          U heeft altijd één vast aanspreekpunt en u weet vooraf wat wij doen en wat u zelf doet. Geen
          verrassingen, wel een administratie die meegroeit.
        </p>
      </TextSection>

      <CtaBand
        title="Klaar voor een goede start?"
        text="Plan een vrijblijvende kennismaking. Wij bespreken uw plannen en laten zien hoe wij u vanaf het begin kunnen ondersteunen."
        primary={{ label: 'Plan een kennismaking', to: routes.kennismaking.path }}
      />
    </>
  );
}
