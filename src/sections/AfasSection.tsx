import { ArrowRight, Check, Search, Settings2, ArrowRightLeft, Headset } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { IconBadge } from '@/components/ui/Card';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';

const highlights = [
  {
    title: 'AFAS Quick Scan',
    text: 'Beoordeling van uw huidige inrichting met concrete verbeterpunten.',
    icon: Search,
  },
  {
    title: 'Inrichting & optimalisatie',
    text: 'Een AFAS-omgeving die past bij uw processen, zonder dubbel werk.',
    icon: Settings2,
  },
  {
    title: 'Overstappen naar AFAS',
    text: 'Begeleide migratie vanuit uw huidige pakket, inclusief historie.',
    icon: ArrowRightLeft,
  },
  {
    title: 'Begeleiding & ondersteuning',
    text: 'Praktische hulp per uur, voor vragen en verdere administratie in AFAS.',
    icon: Headset,
  },
];

const benefits = [
  'Uw cijfers altijd actueel en op elk moment inzichtelijk',
  'Eén professionele, veilige omgeving voor uw hele administratie',
  'Administratie, aangiften en rapportage vanuit dezelfde bron',
];

/** AFAS-sectie op de homepage: positionering, vier onderdelen, CTA naar /afas. */
export function AfasSection() {
  return (
    <Section id="afas" tone="dark" aria-labelledby="afas-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"
      />
      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="reveal">
            <SectionHeading
              id="afas-title"
              eyebrow="AFAS"
              title={siteConfig.taglineSecondary}
              description="MERIT werkt met AFAS: professionele, veilige software die u op elk moment inzicht geeft, zonder dat u zelf boekhouder hoeft te worden. Wij verzorgen uw administratie in AFAS én helpen bij inrichting, optimalisatie en overstappen."
              onDark
            />
            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[0.9375rem] text-on-dark">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast"
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to={routes.afas.path} variant="onDark" size="lg" iconRight={<ArrowRight />}>
                Bespreek uw AFAS-situatie
              </Button>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {highlights.map((h) => (
              <li
                key={h.title}
                className="reveal rounded-lg border border-on-dark-border bg-white/[0.04] p-5 backdrop-blur-[1px]"
              >
                <IconBadge tone="accent" size="sm">
                  <h.icon />
                </IconBadge>
                <h3 className="mt-4 text-base font-semibold text-on-dark">{h.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-on-dark-muted">{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
