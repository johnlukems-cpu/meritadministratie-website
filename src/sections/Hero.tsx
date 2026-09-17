import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';
import { HeroVisual } from './visuals/HeroVisual';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-alt">
      {/* Subtiel rasterpatroon op de achtergrond */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />
      <Container className="relative">
        <div className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">Administratiekantoor &amp; AFAS-partner voor ondernemers</p>
            <h1 className="text-4xl font-semibold sm:text-5xl lg:text-[3.6rem] lg:leading-[1.06]">
              Uw administratie op orde.
              <br />
              <span className="text-accent-text">Uw onderneming klaar voor groei.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              MERIT Administratie &amp; Advies ondersteunt ondernemers en MKB-bedrijven met
              financiële administratie, aangiften, jaarwerk en professionele administratieve
              ondersteuning.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to={routes.kennismaking.path} size="lg" iconRight={<ArrowRight />}>
                Plan een kennismaking
              </Button>
              <Button to={routes.diensten.path} size="lg" variant="outline">
                Bekijk onze diensten
              </Button>
            </div>
            <p className="mt-8 text-sm font-medium italic text-subtle">
              „{siteConfig.tagline}”
            </p>
          </div>

          <div className="lg:justify-self-end lg:w-full">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
