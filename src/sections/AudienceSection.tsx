import { ArrowRight, Building2, Check, User } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { routes } from '@/config/routes';
import { PanelCluster } from './visuals/PanelCluster';

/**
 * De twee doelgroepen van MERIT. Geen uitspraken over aantallen klanten of
 * resultaten: alleen voor wie de dienstverlening bedoeld is en wat die omvat.
 */
const audiences = [
  {
    icon: User,
    title: 'Zzp’ers',
    description:
      'U werkt voor uzelf en wilt uw boekhouding, btw-aangifte en jaarwerk uit handen geven tegen een vast bedrag per maand.',
    to: routes.voorZzp.path,
    linkLabel: 'Voor zzp’ers',
  },
  {
    icon: Building2,
    title: 'Mkb-ondernemers',
    description:
      'U heeft een groeiende onderneming, misschien met personeel, en wilt een administratie die klopt en cijfers waarop u kunt sturen.',
    to: routes.voorMkb.path,
    linkLabel: 'Voor mkb-ondernemers',
  },
];

const points = [
  'Uw administratie periodiek bijgewerkt',
  'Btw-aangifte op tijd voorbereid',
  'Jaarafsluiting en jaarrekening geregeld',
  'Periodiek inzicht in uw cijfers',
  'Eén vast aanspreekpunt',
  'Een vast bedrag per maand',
];

/** Sectie "Voor wie wij werken" op de homepage. */
export function AudienceSection() {
  return (
    <section
      id="voor-wie"
      className="relative overflow-hidden bg-surface-dark text-on-dark"
      aria-labelledby="voor-wie-title"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(85% 110% at 85% 15%, #15325c 0%, transparent 58%), var(--brand-primary)',
        }}
      />
      <Container className="py-14 md:py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-12 [&>*]:min-w-0">
          <div className="@container min-w-0">
            <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-accent-light uppercase">
              Voor wie wij werken
            </p>

            <h2
              id="voor-wie-title"
              className="text-[1.875rem] leading-[1.18] text-on-dark sm:text-[2.125rem] lg:text-[2.375rem] lg:leading-[1.16]"
            >
              Voor zelfstandigen en{' '}
              <span className="text-accent-light">groeiende ondernemingen</span>.
            </h2>

            <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-on-dark-muted">
              Of u nu alleen werkt of een onderneming met personeel heeft: wij zorgen dat uw
              administratie klopt, uw aangiften op tijd zijn en u weet hoe uw onderneming ervoor
              staat.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {audiences.map((audience) => (
                <Link
                  key={audience.title}
                  to={audience.to}
                  className="group flex flex-col rounded-xl border border-on-dark-border bg-white/5 p-5 transition-colors hocus:border-accent/50 hocus:bg-white/10"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-10 items-center justify-center rounded-lg bg-accent text-accent-contrast"
                  >
                    <audience.icon className="size-5" />
                  </span>
                  <span className="mt-4 font-semibold text-on-dark">{audience.title}</span>
                  <span className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-on-dark-muted">
                    {audience.description}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-light">
                    {audience.linkLabel}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              ))}
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-[0.9375rem] text-on-dark-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast"
                  >
                    <Check className="size-3" strokeWidth={3.5} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 @[33rem]:flex-row @[33rem]:flex-wrap [&>*]:w-full @[33rem]:[&>*]:w-auto">
              <Button
                to={routes.kennismaking.path}
                size="lg"
                variant="secondary"
                iconRight={<ArrowRight />}
              >
                Plan een kennismaking
              </Button>
              <Button to={routes.diensten.path} size="lg" variant="onDarkOutline">
                Bekijk onze diensten
              </Button>
            </div>
          </div>

          <div className="min-w-0">
            <PanelCluster />
          </div>
        </div>
      </Container>
    </section>
  );
}
