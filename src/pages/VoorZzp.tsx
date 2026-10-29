import { ArrowRight, CalendarCheck, Calculator, FolderKanban, PiggyBank, Receipt } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/CheckList';
import { Container, Section } from '@/components/ui/Container';
import { Notice } from '@/components/ui/Notice';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBand } from '@/sections/CtaBand';
import { PageHero } from '@/sections/PageHero';
import { Process } from '@/sections/Process';
import { routes } from '@/config/routes';
import { QUOTED_LABEL } from '@/data/pricing';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/json-ld';

/**
 * Dienstverlening voor zzp’ers. Dit zijn de werkzaamheden die MERIT daadwerkelijk
 * aanbiedt; wat voor u van toepassing is, stemmen wij vooraf af.
 */
const zzpDiensten = [
  {
    title: 'Uw boekhouding bijgehouden',
    description:
      'Wij verwerken uw facturen en bankmutaties, zodat uw administratie bij blijft en u er zelf geen avonden aan kwijt bent.',
    items: [
      'Inkoop- en verkoopfacturen verwerken',
      'Bankmutaties verwerken en afletteren',
      'Bonnen en kleine uitgaven verwerken',
      'Controle op volledigheid van uw stukken',
    ],
    icon: FolderKanban,
  },
  {
    title: 'Btw-aangifte per kwartaal',
    description:
      'Elk kwartaal moet de aangifte er weer zijn. Wij bereiden die voor, controleren de btw-verwerking en zorgen dat die aansluit op uw boekhouding.',
    items: [
      'Btw-aangifte voorbereiden en controleren',
      'Btw-coderingen controleren',
      'Btw aansluiten op uw administratie',
      'Gegevens voor de ICP-opgaaf voorbereiden',
    ],
    icon: Calculator,
  },
  {
    title: 'Jaarafsluiting en jaarrekening',
    description:
      'Aan het einde van het boekjaar sluiten wij uw administratie af en bereiden wij de jaarrekening voor.',
    items: [
      'Volledigheid van het boekjaar controleren',
      'Grootboekrekeningen aansluiten',
      'Ontbrekende stukken signaleren',
      'Jaarrekening voorbereiden en samenstellen',
    ],
    icon: CalendarCheck,
  },
  {
    title: 'Zicht op wat er openstaat',
    description:
      'U ziet welke facturen nog niet betaald zijn en hoe lang ze al openstaan, zodat u er op tijd achteraan kunt.',
    items: [
      'Openstaande facturen bijhouden',
      'Terugkoppeling van facturen die lang openstaan',
      'Overzicht van wat u nog moet betalen',
      'Inzicht in uw inkomsten en uitgaven',
    ],
    icon: Receipt,
  },
];

const herkenbaar = [
  'U komt er pas aan toe als de aangifte eraan komt',
  'U weet niet precies wat u opzij moet zetten voor de belasting',
  'U bent niet zeker of u alles goed verwerkt',
  'U mist het overzicht van wat er nog openstaat',
  'U wilt uw tijd aan uw klanten besteden, niet aan uw boekhouding',
];

export default function VoorZzp() {
  return (
    <>
      <Seo
        title="Administratie voor zzp’ers — boekhouding, btw en jaarrekening"
        description="MERIT verzorgt de financiële administratie van zzp’ers: facturen en bankmutaties verwerken, btw-aangifte per kwartaal en de jaarafsluiting met jaarrekening. Vanaf € 125 per maand."
        canonicalPath={routes.voorZzp.path}
        jsonLd={[
          serviceJsonLd({
            name: 'Administratie voor zzp’ers',
            description:
              'Financiële administratie, btw-aangiften en jaarrekeningwerkzaamheden voor zelfstandigen zonder personeel: facturen en bankmutaties verwerken, btw-aangifte voorbereiden en de jaarafsluiting verzorgen.',
            path: routes.voorZzp.path,
          }),
          breadcrumbJsonLd([{ name: 'Voor zzp’ers', path: routes.voorZzp.path }]),
        ]}
      />

      <PageHero
        eyebrow="Voor zzp’ers"
        title="Uw boekhouding geregeld, uw tijd voor uw klanten"
        intro="Als zelfstandige doet u alles zelf — maar uw administratie hoeft daar niet bij te horen. Wij verzorgen uw boekhouding, uw btw-aangifte en uw jaarrekening, tegen een vast bedrag per maand."
        breadcrumbs={[{ name: 'Voor zzp’ers', path: routes.voorZzp.path }]}
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

      {/* Herkenbaar? */}
      <Section tone="default" aria-labelledby="herkenbaar-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16 [&>*]:min-w-0">
            <div>
              <SectionHeading
                id="herkenbaar-title"
                eyebrow="Herkenbaar?"
                title="De administratie schuift steeds een week op"
                description="Het werk voor uw klanten gaat voor. Dat is logisch — maar het maakt de boekhouding er niet makkelijker op."
                className="reveal"
              />
              <p className="reveal measure mt-6 text-[0.9375rem] leading-relaxed text-muted">
                Veel zelfstandigen herkennen dit. Niet omdat ze het niet kunnen, maar omdat er
                simpelweg geen tijd voor is. Het gevolg is dat u achteraf moet uitzoeken wat er ook
                alweer bij welke factuur hoorde, en dat u nooit helemaal zeker weet of het klopt.
              </p>
              <p className="reveal measure mt-4 text-[0.9375rem] leading-relaxed text-muted">
                Wij nemen dat van u over. U levert uw facturen en bonnen aan; wij zorgen dat uw
                administratie bij blijft en dat u op tijd weet wat er moet gebeuren.
              </p>
            </div>
            <aside className="reveal lg:pt-4">
              <div className="rounded-xl border border-default bg-surface-alt p-6 md:p-8">
                <p className="font-semibold text-primary">Dit horen wij vaak</p>
                <CheckList items={herkenbaar} size="sm" className="mt-5" />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Wat wij voor zzp'ers doen */}
      <Section tone="alt" id="diensten-zzp" aria-labelledby="diensten-zzp-title">
        <Container>
          <SectionHeading
            id="diensten-zzp-title"
            eyebrow="Dienstverlening"
            title="Wat wij voor u verzorgen"
            description="Welke onderdelen voor u van toepassing zijn, bepalen wij samen tijdens de kennismaking."
            align="center"
            className="reveal"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
            {zzpDiensten.map((dienst) => (
              <div
                key={dienst.title}
                className="reveal flex h-full flex-col rounded-lg border border-default bg-surface p-6 md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-11 items-center justify-center rounded-md bg-primary-soft text-primary"
                >
                  <dienst.icon className="size-5.5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{dienst.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                  {dienst.description}
                </p>
                <CheckList items={dienst.items} size="sm" className="mt-5" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Tarief */}
      <Section tone="default" id="tarief" aria-labelledby="tarief-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16 [&>*]:min-w-0">
            <div>
              <SectionHeading
                id="tarief-title"
                eyebrow="Tarief"
                title="Een vast bedrag per maand, vanaf € 125"
                description="U weet vooraf wat u betaalt. Het bedrag hangt af van de omvang van uw administratie."
                className="reveal"
              />
              <p className="reveal measure mt-6 text-[0.9375rem] leading-relaxed text-muted">
                Voor een zelfstandige met een overzichtelijke administratie start de dienstverlening
                vanaf € 125 per maand, exclusief btw. Hoeveel boekingen u per maand heeft en welke
                werkzaamheden u uit handen geeft, bepalen samen het definitieve bedrag.
              </p>
              <p className="reveal measure mt-4 text-[0.9375rem] leading-relaxed text-muted">
                De jaarafsluiting en jaarrekening zitten niet automatisch in het instappakket. Dat
                houdt het maandbedrag laag; u kunt het jaarwerk als aanvullende dienst toevoegen.
                Wij leggen vooraf vast wat wel en niet binnen uw pakket valt.
              </p>
              <div className="reveal mt-8">
                <Button to={routes.tarieven.path} variant="outline" iconRight={<ArrowRight />}>
                  Bekijk alle tarieven
                </Button>
              </div>
            </div>

            <aside className="reveal lg:pt-4">
              <div className="rounded-xl border border-default bg-surface-alt p-6 md:p-8">
                <span
                  aria-hidden="true"
                  className="inline-flex size-11 items-center justify-center rounded-md bg-accent-soft text-accent-text"
                >
                  <PiggyBank className="size-5.5" />
                </span>
                <p className="mt-4 text-sm font-semibold tracking-wide text-primary uppercase">
                  Btw en jaarwerk
                </p>
                <p className="mt-3 text-2xl font-semibold text-primary">{QUOTED_LABEL}</p>
                <p className="mt-5 border-t border-default pt-5 text-[0.9375rem] leading-relaxed text-muted">
                  Voor btw-aangiften en jaarrekeningen werken wij met een vast tarief per opdracht.
                  U ontvangt vooraf een voorstel met het tarief, de werkzaamheden en de afspraken
                  over aanlevering.
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

      <Section tone="default">
        <Container narrow>
          <Notice tone="info" title="Heeft u personeel of een bv?" className="reveal">
            Groeit uw onderneming, of heeft u al medewerkers? Dan past onze dienstverlening voor
            mkb-ondernemers waarschijnlijk beter bij uw situatie. Bekijk{' '}
            <a
              href={routes.voorMkb.path}
              className="font-semibold text-primary underline underline-offset-4"
            >
              onze pagina voor mkb-ondernemers
            </a>
            .
          </Notice>
        </Container>
      </Section>

      <CtaBand
        title="Uw boekhouding uit handen geven?"
        text="Bespreek in een kennismakingsgesprek hoe uw administratie er nu voor staat en wat u uit handen wilt geven."
        tone="alt"
      />
    </>
  );
}
