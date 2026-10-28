import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { routes } from '@/config/routes';
import { HeroDashboard } from './visuals/HeroDashboard';

/** De vier kernwaarden, subtiel onder de knoppen. */
const values = ['Betrouwbaar', 'Nauwkeurig', 'Betaalbaar', 'Flexibel'];

/** Donkere hero van de homepage. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-dark text-on-dark">
      {/* Diepte in de achtergrond, zonder drukke gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(90% 120% at 78% 18%, #15325c 0%, transparent 60%), radial-gradient(70% 90% at 0% 100%, #0a1a31 0%, transparent 55%), var(--brand-primary)',
        }}
      />
      <Container className="py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-14 [&>*]:min-w-0">
          {/* Tekstkolom */}
          <div className="min-w-0">
            <p className="mb-5 text-[0.6875rem] font-semibold tracking-[0.14em] text-accent-light uppercase sm:text-xs">
              Financiële backoffice voor administratie- en accountantskantoren
            </p>

            <h1 className="text-[1.9375rem] leading-[1.16] text-on-dark sm:text-[2.375rem] lg:text-[2.875rem] lg:leading-[1.12]">
              Uw betrouwbare partner voor{' '}
              <span className="text-accent-light">financiële backoffice</span> en{' '}
              <span className="text-accent-light">AFAS-ondersteuning</span>.
            </h1>

            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-on-dark-muted">
              Wij ondersteunen Nederlandse administratie- en accountantskantoren met financiële
              verwerking, btw-aangiften, jaarrekeningvoorbereiding, kwaliteitscontroles en
              procesverbetering. Zo creëert uw kantoor meer capaciteit, meer grip op de
              administratie en ruimte voor klantadvies.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>*]:w-full sm:[&>*]:w-auto">
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
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-on-dark-border pt-7">
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

          {/* Visuele kolom */}
          <div className="min-w-0 lg:pl-2">
            <HeroDashboard />
          </div>
        </div>
      </Container>
    </section>
  );
}
