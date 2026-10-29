import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/CheckList';
import { Container, Section } from '@/components/ui/Container';
import { Notice } from '@/components/ui/Notice';
import { PackageCard } from '@/components/ui/PackageCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBand } from '@/sections/CtaBand';
import { PageHero } from '@/sections/PageHero';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { mutationTiersNote, packages, quotedServicesNote } from '@/data/packages';
import { QUOTED_LABEL, pricingFaq, quotedWork, quotedWorkNote } from '@/data/pricing';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo/json-ld';

/** Ankerlinks bovenaan de pagina, zodat bezoekers direct naar het juiste blok kunnen. */
const sections = [
  { id: 'pakketten', label: 'Maandpakketten' },
  { id: 'los-werk', label: 'Btw en jaarwerk' },
  { id: 'prijsvragen', label: 'Vragen over prijzen' },
];

export default function Tarieven() {
  return (
    <>
      <Seo
        title="Tarieven — administratie vanaf € 125 per maand"
        description="De tarieven van MERIT voor zzp’ers en mkb-ondernemers: maandpakketten voor uw financiële administratie vanaf € 125 per maand. Btw-aangiften en jaarrekeningen krijgen een vast tarief per opdracht."
        canonicalPath={routes.tarieven.path}
        jsonLd={[
          breadcrumbJsonLd([{ name: 'Tarieven', path: routes.tarieven.path }]),
          faqJsonLd(pricingFaq),
        ]}
      />

      <PageHero
        eyebrow="Tarieven"
        title="Een vast bedrag per maand, vooraf duidelijk"
        intro="U kiest het pakket dat past bij de omvang van uw administratie. Btw-aangiften en jaarwerk bakenen wij apart af, zodat u precies weet waarvoor u betaalt."
        breadcrumbs={[{ name: 'Tarieven', path: routes.tarieven.path }]}
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

      {/* Ankernavigatie */}
      <Section tone="default" className="!pb-0">
        <Container>
          <nav aria-label="Op deze pagina" className="reveal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 border-b border-default pb-5 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="font-semibold text-muted underline-offset-4 hover:text-primary hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      {/* A. Maandpakketten */}
      <Section tone="default" id="pakketten" aria-labelledby="pakketten-title">
        <Container>
          <SectionHeading
            id="pakketten-title"
            eyebrow="A. Maandpakketten"
            title="Uw financiële administratie vanaf € 125 per maand"
            description="Vanaf-tarieven per maand, exclusief 21% btw. Het definitieve bedrag hangt af van de omvang van uw administratie en van de werkzaamheden die u uit handen geeft."
            className="reveal"
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </ul>

          <Notice tone="info" title="Wat een pakket precies omvat" className="reveal mt-10">
            De onderdelen per pakket staan hierboven op hoofdlijnen. Het aantal boekingen per maand,
            de gewenste frequentie en eventuele aanvullende werkzaamheden bepalen samen het
            definitieve tarief. Wij leggen dit vooraf vast in een voorstel, zodat u weet wat wel en
            niet is inbegrepen.
          </Notice>

          <p className="reveal measure mt-8 text-[0.9375rem] leading-relaxed text-muted">
            {mutationTiersNote}
          </p>
        </Container>
      </Section>

      {/* B. Werk dat apart wordt afgebakend */}
      <Section tone="alt" id="los-werk" aria-labelledby="los-werk-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16 [&>*]:min-w-0">
            <div>
              <SectionHeading
                id="los-werk-title"
                eyebrow="B. Btw en jaarwerk"
                title="Btw-aangiften en jaarrekeningen: vaste tarieven op afspraak"
                description="Voor deze werkzaamheden werken wij met een vast tarief per opdracht in plaats van een standaardprijs."
                className="reveal"
              />
              <p className="reveal measure mt-6 text-[0.9375rem] leading-relaxed text-muted">
                Het aantal aangiften per jaar, uw rechtsvorm en de staat waarin uw administratie
                wordt aangeleverd bepalen hoeveel werk een opdracht vraagt. Wij noemen liever geen
                bedrag dat later niet blijkt te kloppen. Vertel ons kort wat er nodig is; u ontvangt
                vooraf een duidelijk voorstel met een vast tarief.
              </p>
              <CheckList items={quotedWork} size="sm" className="reveal mt-7" />
              <p className="reveal measure mt-6 text-[0.9375rem] leading-relaxed text-muted">
                {quotedWorkNote}
              </p>
              <p className="reveal measure mt-4 text-[0.9375rem] leading-relaxed text-muted">
                {quotedServicesNote}
              </p>
            </div>

            <aside className="reveal lg:pt-4">
              <div className="rounded-xl border border-default bg-surface p-6 md:p-8">
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">Tarief</p>
                <p className="mt-3 text-2xl font-semibold text-primary">{QUOTED_LABEL}</p>
                <p className="mt-5 border-t border-default pt-5 text-[0.9375rem] leading-relaxed text-muted">
                  U ontvangt vooraf een voorstel met het tarief, de werkzaamheden en de afspraken
                  over aanlevering. Pas daarna beginnen wij.
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

          <p className="reveal measure mt-10 text-sm leading-relaxed text-muted">
            {siteConfig.pricing.finalPriceNote} {siteConfig.pricing.customQuoteNote}{' '}
            {siteConfig.pricing.vatNote}
          </p>
        </Container>
      </Section>

      {/* C. Veelgestelde vragen over prijzen */}
      <Section tone="default" id="prijsvragen" aria-labelledby="prijsvragen-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 [&>*]:min-w-0">
            <div>
              <SectionHeading
                id="prijsvragen-title"
                eyebrow="C. Vragen"
                title="Veelgestelde vragen over prijzen"
                description="Over btw, uitbreiden, meerwerk en hoe het definitieve tarief tot stand komt."
                className="reveal"
              />
              <div className="reveal mt-8">
                <Button to={routes.faq.path} variant="outline" iconRight={<ArrowRight />}>
                  Alle veelgestelde vragen
                </Button>
              </div>
            </div>
            <Accordion items={pricingFaq} className="reveal" />
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Welk pakket past bij uw onderneming?"
        text="Bespreek in een kennismakingsgesprek hoe uw administratie eruitziet en ontvang een voorstel met een vast maandbedrag."
        tone="alt"
      />
    </>
  );
}
