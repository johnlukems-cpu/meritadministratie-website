import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { routes } from '@/config/routes';

/** De vier kernwaarden, subtiel onder de knoppen. */
const values = ['Betrouwbaar', 'Nauwkeurig', 'Betaalbaar', 'Flexibel'];

/**
 * Hero van de homepage.
 *
 * De achtergrond is een zakelijke kantoorfoto (laptop met financieel dashboard,
 * documenten en kantooraccessoires — geen mensen). De foto is 2:1 en heeft links
 * een donkere wand; daar staat de tekst. Een marineblauw verloop over de linkerzijde
 * zorgt voor voldoende contrast, ook als de foto ooit wordt vervangen.
 *
 * Varianten staan in public/hero/; `sizes` is 100vw omdat de foto de volle breedte
 * van de sectie beslaat.
 */
const HERO_SRC = '/hero/kantoor-dashboard-1400.webp';
const HERO_SRCSET = [
  '/hero/kantoor-dashboard-700.webp 700w',
  '/hero/kantoor-dashboard-1000.webp 1000w',
  '/hero/kantoor-dashboard-1400.webp 1400w',
  '/hero/kantoor-dashboard-1600.webp 1600w',
  '/hero/kantoor-dashboard-1774.webp 1774w',
].join(', ');

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-surface-dark text-on-dark">
      {/* Achtergrondfoto */}
      <img
        src={HERO_SRC}
        srcSet={HERO_SRCSET}
        sizes="100vw"
        width={1774}
        height={887}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover object-[72%_center] lg:object-[64%_center]"
      />

      {/* Marineblauw verloop: links dekkend voor leesbare tekst, rechts open zodat
          het bureau met het dashboard zichtbaar blijft. */}
      {/* Tot lg staat de tekst óver de foto: daar is een dekkende sluier nodig. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 lg:hidden"
        style={{
          background:
            'linear-gradient(to bottom, rgba(11,31,58,.93) 0%, rgba(11,31,58,.88) 60%, rgba(11,31,58,.95) 100%)',
        }}
      />
      {/* Vanaf lg staat de tekst links: alleen daar dekkend, rechts blijft het
          bureau met het dashboard goed zichtbaar. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{
          background:
            'linear-gradient(100deg, rgba(11,31,58,.97) 0%, rgba(11,31,58,.95) 40%, rgba(11,31,58,.92) 56%, rgba(11,31,58,.6) 67%, rgba(11,31,58,.22) 82%, rgba(11,31,58,.06) 100%)',
        }}
      />
      {/* Heel lichte sluier over het geheel, zodat de foto rustig blijft en de
          goudtinten in de interface niet met de merkkleur concurreren. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-[rgba(11,31,58,.18)] lg:block"
      />

      <Container className="py-12 md:py-16 lg:py-20">
        <div className="max-w-xl lg:max-w-[32rem] xl:max-w-[37rem]">
          <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-balance text-accent-light uppercase">
            Financiële backoffice voor administratie- en accountantskantoren
          </p>

          <h1 className="text-[1.9375rem] leading-[1.16] text-on-dark sm:text-[2.25rem] lg:text-[2.625rem] lg:leading-[1.14]">
            Uw betrouwbare partner voor{' '}
            <span className="text-accent-light">financiële backoffice</span> en{' '}
            <span className="text-accent-light">AFAS-ondersteuning</span>.
          </h1>

          <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-on-dark-muted">
            Wij ondersteunen Nederlandse administratie- en accountantskantoren met financiële
            verwerking, btw-aangiften, jaarrekeningvoorbereiding, kwaliteitscontroles en
            procesverbetering. Zo creëert uw kantoor meer capaciteit, meer grip op de administratie
            en ruimte voor klantadvies.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>*]:w-full sm:[&>*]:w-auto">
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

          {/* Kernwaarden */}
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-on-dark-border pt-6">
            {values.map((value) => (
              <li key={value} className="flex items-center gap-2 text-[0.9375rem] text-on-dark">
                <span
                  aria-hidden="true"
                  className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast"
                >
                  <Check className="size-3" strokeWidth={3.5} />
                </span>
                {value}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
