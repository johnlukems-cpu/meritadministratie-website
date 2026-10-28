import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { routes } from '@/config/routes';
import { PanelCluster } from './visuals/PanelCluster';

/** Concrete voordelen van uitbesteden. Geen beloftes over besparingen of resultaten. */
const benefits = [
  'Extra capaciteit zonder direct personeel aan te nemen',
  'Transparante tarieven en duidelijke werkafspraken',
  'Ondersteuning bij piekdrukte en achterstanden',
  'Nauwkeurige verwerking en kwaliteitscontroles',
  'Werken volgens uw procedures en software',
  'Flexibel opschalen wanneer nodig',
];

/** Sectie voor administratie- en accountantskantoren op de homepage. */
export function CapacitySection() {
  return (
    <section
      id="voor-kantoren"
      className="relative overflow-hidden bg-surface-dark text-on-dark"
      aria-labelledby="capaciteit-title"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(85% 110% at 85% 15%, #15325c 0%, transparent 58%), var(--brand-primary)',
        }}
      />
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 [&>*]:min-w-0">
          <div className="min-w-0">
            <p className="mb-5 text-[0.6875rem] font-semibold tracking-[0.14em] text-accent-light uppercase sm:text-xs">
              Voor administratie- en accountantskantoren
            </p>

            <h2
              id="capaciteit-title"
              className="text-[1.875rem] leading-[1.18] text-on-dark sm:text-[2.25rem] lg:text-[2.625rem] lg:leading-[1.14]"
            >
              Meer capaciteit.
              <br />
              Minder administratieve druk.
              <br />
              <span className="text-accent-light">Meer ruimte voor uw klanten.</span>
            </h2>

            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-on-dark-muted">
              Laat uw financiële backoffice over aan MERIT, zodat uw kantoor zich kan richten op wat
              echt belangrijk is: advies, groei en uw klanten.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-[0.9375rem] text-on-dark-muted">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast"
                  >
                    <Check className="size-3" strokeWidth={3.5} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>*]:w-full sm:[&>*]:w-auto">
              <Button
                to={routes.voorKantoren.path}
                size="lg"
                variant="secondary"
                iconRight={<ArrowRight />}
              >
                Ontdek de mogelijkheden
              </Button>
              <Button to={routes.kennismaking.path} size="lg" variant="onDarkOutline">
                Plan een kennismaking
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
