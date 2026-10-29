import { ArrowRight, BarChart3, Calculator, CalendarCheck, FolderKanban, Workflow } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/CheckList';
import { Container, Section } from '@/components/ui/Container';
import { Notice } from '@/components/ui/Notice';
import { PackageCard } from '@/components/ui/PackageCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBand } from '@/sections/CtaBand';
import { PageHero } from '@/sections/PageHero';
import { Process } from '@/sections/Process';
import { routes } from '@/config/routes';
import { packages, quotedServicesNote } from '@/data/packages';
import { QUOTED_LABEL } from '@/data/pricing';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/json-ld';

/**
 * Diensten voor mkb-ondernemingen. Dit zijn de werkzaamheden die MERIT daadwerkelijk
 * aanbiedt; de precieze dienstverlening wordt per onderneming vooraf afgestemd.
 */
const mkbServices = [
  {
    title: 'Financiële administratie',
    description:
      'Verwerking van uw inkoop- en verkoopfacturen en bankmutaties, beheer van openstaande posten en een administratie die aansluit.',
    items: [
      'Inkoop- en verkoopfacturen verwerken',
      'Bankmutaties verwerken en afletteren',
      'Debiteuren en crediteuren bijhouden',
      'Basiscontrole van de administratie',
    ],
    icon: FolderKanban,
  },
  {
    title: 'Btw-gerelateerde werkzaamheden',
    description:
      'Het voorbereiden en verwerken van uw btw-aangifte, inclusief controle van de btw-verwerking in de administratie.',
    items: [
      'Btw-aangifte voorbereiden en verwerken',
      'Btw-coderingen controleren',
      'Btw-administratie aansluiten op het grootboek',
      'Gegevens voor de ICP-opgaaf voorbereiden',
    ],
    icon: Calculator,
  },
  {
    title: 'Administratieve jaarafsluiting',
    description:
      'Het afsluiten van uw boekjaar: posten controleren, aansluitingen maken en de cijfers klaarzetten voor het vervolg.',
    items: [
      'Grootboekrekeningen controleren',
      'Bankadministratie aansluiten',
      'Debiteuren, crediteuren en tussenrekeningen controleren',
      'Specificaties van balansrekeningen opstellen',
    ],
    icon: CalendarCheck,
  },
  {
    title: 'Voorbereiding van financiële overzichten',
    description:
      'Periodieke overzichten en rapportagevoorbereiding, zodat u uw beslissingen op actuele cijfers baseert.',
    items: [
      'Maandafsluiting',
      'Financiële overzichten voorbereiden',
      'Rapportagevoorbereiding',
      'Terugkoppeling van wat aandacht vraagt',
    ],
    icon: BarChart3,
  },
  {
    title: 'Procesverbetering',
    description:
      'Terugkerende administratieve stappen overzichtelijker maken, zodat het aanleveren en verwerken minder tijd kost.',
    items: [
      'Analyse van terugkerende administratieve stappen',
      'Standaardisering van werkzaamheden',
      'Verbetering van gegevenscontroles',
      'Vastleggen van werkafspraken',
    ],
    icon: Workflow,
  },
];

export default function VoorMkb() {
  return (
    <>
      <Seo
        title="Voor mkb-ondernemingen — administratie en financiële ondersteuning"
        description="MERIT ondersteunt mkb-ondernemingen met de financiële administratie, btw-gerelateerde werkzaamheden, de administratieve jaarafsluiting, de voorbereiding van financiële overzichten en procesverbetering. Pakketten vanaf € 125 per maand."
        canonicalPath={routes.voorMkb.path}
        jsonLd={[
          serviceJsonLd({
            name: 'Financiële administratie voor mkb-ondernemingen',
            description:
              'Financiële administratie, btw-gerelateerde werkzaamheden, administratieve jaarafsluiting, voorbereiding van financiële overzichten en procesverbetering voor Nederlandse mkb-ondernemingen.',
            path: routes.voorMkb.path,
          }),
          breadcrumbJsonLd([{ name: 'Voor mkb-ondernemingen', path: routes.voorMkb.path }]),
        ]}
      />

      <PageHero
        eyebrow="Voor mkb-ondernemingen"
        title="Uw financiële administratie in vertrouwde handen"
        intro="Wij verzorgen de financiële administratie van mkb-ondernemingen: verwerking, btw-gerelateerde werkzaamheden, de administratieve jaarafsluiting en de voorbereiding van financiële overzichten. Wat wij precies voor u doen, stemmen wij vooraf af."
        breadcrumbs={[{ name: 'Voor mkb-ondernemingen', path: routes.voorMkb.path }]}
        actions={
          <>
            <Button to={routes.kennismaking.path} size="lg" iconRight={<ArrowRight />}>
              Plan een kennismaking
            </Button>
            <Button to={routes.offerte.path} size="lg" variant="outline">
              Vraag een offerte aan
            </Button>
          </>
        }
      />

      {/* Wat wij voor mkb-ondernemingen doen */}
      <Section tone="default" id="diensten-mkb" aria-labelledby="diensten-mkb-title">
        <Container>
          <SectionHeading
            id="diensten-mkb-title"
            eyebrow="Dienstverlening"
            title="Wat wij voor uw onderneming kunnen verzorgen"
            description="Deze werkzaamheden bieden wij aan mkb-ondernemingen. Welke onderdelen voor u van toepassing zijn, bepalen wij samen tijdens de kennismaking."
            align="center"
            className="reveal"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
            {mkbServices.map((service) => (
              <div
                key={service.title}
                className="reveal flex h-full flex-col rounded-lg border border-default bg-surface p-6 md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-11 items-center justify-center rounded-md bg-primary-soft text-primary"
                >
                  <service.icon className="size-5.5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                  {service.description}
                </p>
                <CheckList items={service.items} size="sm" className="mt-5" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mkb-pakketten */}
      <Section tone="alt" id="pakketten" aria-labelledby="pakketten-title">
        <Container>
          <SectionHeading
            id="pakketten-title"
            eyebrow="Pakketten"
            title="Maandpakketten voor mkb-ondernemingen"
            description="Vanaf-tarieven per maand. Het definitieve tarief en de precieze dienstverlening stemmen wij vooraf met u af."
            align="center"
            className="reveal"
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </ul>
          <Notice tone="info" title="Wat een pakket precies omvat" className="reveal mt-10">
            De onderdelen per pakket staan hierboven op hoofdlijnen. Het aantal mutaties, het aantal
            administraties, de gewenste frequentie en eventuele aanvullende werkzaamheden bepalen
            samen het definitieve tarief. Wij leggen dit vooraf vast in een voorstel, zodat u weet
            wat wel en niet is inbegrepen.
          </Notice>
        </Container>
      </Section>

      {/* Aangiften en jaarwerk: prijs per situatie, geen bedragen */}
      <Section tone="default" id="losse-diensten" aria-labelledby="losse-diensten-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <div>
              <SectionHeading
                id="losse-diensten-title"
                eyebrow="Aangiften en jaarwerk"
                title="Btw-aangiften en jaarrekeningen: vaste tarieven op afspraak"
                description="Voor btw-aangiften en jaarrekeningen werken wij met een vast tarief per opdracht in plaats van een standaardprijs."
                className="reveal"
              />
              <p className="reveal measure mt-6 text-[0.9375rem] leading-relaxed text-muted">
                De prijs hangt af van de omvang van uw administratie, het aantal aangiften per jaar
                en de complexiteit van de werkzaamheden. Vertel ons kort wat er nodig is; u ontvangt
                vooraf een duidelijk voorstel met een vast tarief.
              </p>
              <p className="reveal measure mt-4 text-[0.9375rem] leading-relaxed text-muted">
                {quotedServicesNote}
              </p>
            </div>

            <aside className="reveal lg:pt-4">
              <div className="rounded-xl border border-default bg-surface-alt p-6 md:p-8">
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">Tarief</p>
                <p className="mt-3 text-2xl font-semibold text-primary">{QUOTED_LABEL}</p>
                <p className="mt-5 border-t border-default pt-5 text-[0.9375rem] leading-relaxed text-muted">
                  U ontvangt vooraf een voorstel met een vast tarief, de werkzaamheden en de
                  afspraken over aanlevering.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button
                    to={`${routes.offerte.path}?dienst=btw-aangiften`}
                    fullWidth
                    iconRight={<ArrowRight />}
                  >
                    Vraag een prijsvoorstel aan
                  </Button>
                  <Button to={routes.kennismaking.path} variant="outline" fullWidth>
                    Plan een kennismaking
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Process
        tone="alt"
        title="Zo gaan wij van start"
        description="In drie stappen van een eerste gesprek naar een administratie die loopt. U weet vooraf wat wij doen en wat het kost."
      />

      {/* Positionering: kantoren blijven de hoofddoelgroep */}
      <Section tone="default">
        <Container narrow>
          <Notice tone="info" title="Ook voor administratie- en accountantskantoren" className="reveal">
            MERIT richt zich in de eerste plaats op Nederlandse administratie- en
            accountantskantoren, die wij ondersteunen als externe financiële backoffice. Werkt u bij
            een kantoor en zoekt u extra capaciteit voor financiële verwerking, btw-aangiften,
            jaarafsluitingen of kwaliteitscontroles? Bekijk dan{' '}
            <a
              href={routes.voorKantoren.path}
              className="font-semibold text-primary underline underline-offset-4"
            >
              onze pagina voor kantoren
            </a>
            .
          </Notice>
        </Container>
      </Section>

      <CtaBand
        title="Uw administratie uitbesteden?"
        text="Bespreek in een kennismakingsgesprek welke werkzaamheden u wilt uitbesteden en ontvang een passend voorstel."
        tone="alt"
      />
    </>
  );
}
