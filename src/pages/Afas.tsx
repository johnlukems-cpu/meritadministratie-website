import { ArrowRight, ArrowRightLeft, BookOpenCheck, ClipboardList, Headset, Search, Settings2, Workflow } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/sections/PageHero';
import { FeatureGrid, StepsFlow, TextSection } from '@/sections/ContentBlocks';
import { PriceGroupTable } from '@/sections/PriceTables';
import { PricingNote } from '@/sections/PackagesSection';
import { Faq } from '@/sections/Faq';
import { CtaBand } from '@/sections/CtaBand';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';
import { faqGroups } from '@/data/faq';
import { priceGroups } from '@/data/packages';
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/seo/json-ld';

const description =
  'AFAS-ondersteuning door MERIT: administratie in AFAS, Quick Scan, begeleiding en kosteloze inrichting en overstap naar AFAS.';

const diensten = [
  {
    title: 'AFAS-administratie',
    text: 'Wij voeren uw financiële administratie in AFAS: verwerking, bank, debiteuren en crediteuren, btw en rapportage vanuit één omgeving.',
    icon: BookOpenCheck,
  },
  {
    title: 'AFAS Quick Scan',
    text: 'Een beknopte beoordeling van uw huidige inrichting: wat werkt, waar zit dubbel werk en welke verbeteringen zijn mogelijk. U ontvangt concrete aanbevelingen.',
    icon: Search,
  },
  {
    title: 'AFAS-inrichting / implementatie',
    text: 'Implementatie van een nieuwe AFAS-omgeving, afgestemd op uw processen: grootboek, dagboeken, btw-codes, workflows en autorisaties. Kosteloos.',
    icon: Settings2,
  },
  {
    title: 'Overstappen naar AFAS',
    text: 'Begeleide overstap vanuit uw huidige pakket, inclusief het overzetten van stamgegevens en historie en een gecontroleerde start. Kosteloos.',
    icon: ArrowRightLeft,
  },
  {
    title: 'Begeleiding & ondersteuning',
    text: 'Praktische hulp per uur bij vragen, koppelingen en overige AFAS-werkzaamheden; ook als u de administratie (deels) zelf doet.',
    icon: Headset,
  },
];

const overstapStappen = [
  { title: 'Inventarisatie', text: 'We brengen uw huidige pakket, processen en wensen in kaart en bepalen de scope van de overstap.' },
  { title: 'Inrichting', text: 'We richten uw AFAS-omgeving in: grootboek, dagboeken, btw, workflows en gebruikers.' },
  { title: 'Overzetten van gegevens', text: 'Stamgegevens, openstaande posten en waar gewenst historie worden zorgvuldig overgezet en gecontroleerd.' },
  { title: 'Start en begeleiding', text: 'We begeleiden de eerste periode, zodat u en uw medewerkers vertrouwd raken met de nieuwe werkwijze.' },
];

const afasFaq = faqGroups.find((g) => g.id === 'afas')?.items ?? [];
const afasPrices = priceGroups.find((g) => g.id === 'afas');

export default function Afas() {
  return (
    <>
      <Seo
        title="AFAS-ondersteuning, inrichting en overstappen"
        description={description}
        jsonLd={[
          serviceJsonLd({ name: 'AFAS-ondersteuning en -administratie', description, path: routes.afas.path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'AFAS', path: routes.afas.path },
          ]),
          faqJsonLd(afasFaq),
        ]}
      />
      <PageHero
        eyebrow="AFAS"
        title={siteConfig.taglineSecondary}
        intro="MERIT combineert een mutatiegerichte administratie met AFAS-specialisatie. Of u nu al met AFAS werkt of wilt overstappen: wij verzorgen uw administratie in AFAS en helpen kosteloos bij de inrichting en de overstap."
        breadcrumbs={[{ name: 'AFAS', path: routes.afas.path }]}
        tone="dark"
        actions={
          <>
            <Button to={routes.kennismaking.path} variant="onDark" iconRight={<ArrowRight />}>
              Bespreek uw AFAS-situatie
            </Button>
            <Button to={routes.offerte.path} variant="outline" className="border-on-dark-border text-on-dark hover:bg-white/10 hover:border-white">
              Vraag een offerte aan
            </Button>
          </>
        }
      />

      <TextSection
        id="waarom-afas"
        eyebrow="Waarom AFAS"
        title="Eén omgeving voor uw hele administratie"
        description="Administratie is meer dan invoeren en indienen. Het is de basis waarop u beslissingen neemt."
      >
        <p>
          Daarom werken wij met <strong>AFAS</strong>: professionele, veilige software die u op elk
          moment inzicht geeft, zonder dat u zelf boekhouder hoeft te worden. Uw facturen, bank,
          btw en rapportages komen samen in één omgeving, en wij verwerken daarin uw administratie.
        </p>
        <p>
          Werkt u al met AFAS, dan zorgen wij dat de inrichting klopt en dat terugkerend werk zo
          veel mogelijk is geautomatiseerd. Werkt u nog met een ander pakket, dan begeleiden wij de
          overstap: van inventarisatie tot een gecontroleerde start.
        </p>
      </TextSection>

      <FeatureGrid
        id="afas-diensten"
        eyebrow="AFAS-diensten"
        title="Waarmee wij u helpen in AFAS"
        items={diensten}
        columns={3}
        tone="alt"
      />

      <StepsFlow
        id="overstappen-naar-afas"
        eyebrow="Overstappen naar AFAS"
        title="Overstappen naar AFAS in vier stappen"
        description="Een overstap naar AFAS regelen wij gestructureerd en kosteloos, zodat uw administratie doorloopt."
        steps={overstapStappen}
        tone="default"
      />

      {afasPrices && (
        <Section tone="alt" aria-labelledby="afas-tarieven-title">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <SectionHeading
                id="afas-tarieven-title"
                eyebrow="Tarieven"
                title="AFAS-tarieven"
                description="Vanaf-tarieven exclusief btw. Inrichting en overstap naar AFAS zijn kosteloos; overige AFAS-werkzaamheden en koppelingen offreren wij op basis van omvang en complexiteit."
                className="reveal lg:sticky lg:top-28 lg:self-start"
              />
              <div className="space-y-6">
                <PriceGroupTable group={afasPrices} />
                <PricingNote className="reveal" />
              </div>
            </div>
          </Container>
        </Section>
      )}

      <Section aria-labelledby="afas-ondersteuning-title">
        <Container>
          <div className="reveal grid items-center gap-8 rounded-xl border border-default bg-surface p-6 shadow-md sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:gap-10">
            <span
              aria-hidden="true"
              className="inline-flex size-14 items-center justify-center rounded-md bg-accent-soft text-accent-text"
            >
              <Workflow className="size-7" />
            </span>
            <div>
              <h2 id="afas-ondersteuning-title" className="text-2xl font-semibold">
                Administratieve ondersteuning naast AFAS
              </h2>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-muted">
                Ook buiten AFAS staan wij voor u klaar: van facturatie en vraagposten tot fiscale
                correspondentie en jaarwerk. Zie{' '}
                <span className="inline-flex items-center gap-1">
                  <ClipboardList aria-hidden="true" className="size-4" /> administratieve ondersteuning
                </span>{' '}
                bij onze diensten.
              </p>
            </div>
            <Button to={routes.diensten.path} variant="outline" iconRight={<ArrowRight />}>
              Bekijk onze diensten
            </Button>
          </div>
        </Container>
      </Section>

      <Faq items={afasFaq} title="Vragen over AFAS" description="Wat ondernemers ons vragen over werken met en overstappen naar AFAS." />

      <CtaBand
        title="Bespreek uw AFAS-situatie"
        text="Werkt u al met AFAS of overweegt u de overstap? In een kort gesprek bekijken wij wat in uw situatie de beste volgende stap is."
        primary={{ label: 'Bespreek uw AFAS-situatie', to: routes.kennismaking.path }}
        secondary={{ label: 'Vraag een offerte aan', to: routes.offerte.path }}
      />
    </>
  );
}
