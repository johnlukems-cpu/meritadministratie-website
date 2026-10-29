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
      <Container className="py-14 md:py-16 lg:py-20">
        {/* De tekstkolom krijgt iets meer ruimte dan de visual, zodat de drie
            zinnen van de kop elk op één regel passen en de twee knoppen naast
            elkaar staan in plaats van onder elkaar. */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-12 [&>*]:min-w-0">
          <div className="@container min-w-0">
            <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-accent-light uppercase">
              Voor administratie- en accountantskantoren
            </p>

            <h2
              id="capaciteit-title"
              className="text-[1.875rem] leading-[1.18] text-on-dark sm:text-[2.125rem] lg:text-[2.375rem] lg:leading-[1.16]"
            >
              Meer capaciteit.
              <br />
              Minder administratieve druk.
              <br />
              <span className="text-accent-light">Meer ruimte voor uw klanten.</span>
            </h2>

            <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-on-dark-muted">
              Laat uw financiële backoffice over aan MERIT, zodat uw kantoor zich kan richten op wat
              echt belangrijk is: advies, groei en uw klanten.
            </p>

            <ul className="mt-7 flex flex-col gap-3">
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

            {/* Containerquery in plaats van een schermbreedte: de knoppen gaan
                naast elkaar zodra déze kolom breed genoeg is, niet zodra het
                scherm dat is. */}
            <div className="mt-8 flex flex-col gap-3 @[33rem]:flex-row @[33rem]:flex-wrap [&>*]:w-full @[33rem]:[&>*]:w-auto">
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
