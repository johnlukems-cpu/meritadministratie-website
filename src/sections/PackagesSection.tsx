import { ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Container';
import { PackageCard } from '@/components/ui/PackageCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';
import { packages } from '@/data/packages';

interface PackagesSectionProps {
  /** Compacte variant voor de homepage, met link naar /pakketten */
  compact?: boolean;
  tone?: 'default' | 'alt';
  heading?: { eyebrow?: string; title: string; description?: string };
}

/** Prijsnoot onder elke pakketweergave: vanaf-tarieven, btw, definitieve prijs. */
export function PricingNote({ className = '' }: { className?: string }) {
  const { pricing } = siteConfig;
  return (
    <div className={`flex items-start gap-3 rounded-lg border border-default bg-surface-alt p-4 text-sm text-muted ${className}`}>
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-text" />
      <p>
        <strong className="font-semibold text-text">Vanaf-tarieven.</strong> {pricing.vatNote}{' '}
        {pricing.finalPriceNote} {pricing.customQuoteNote}
      </p>
    </div>
  );
}

export function PackagesSection({
  compact = false,
  tone = 'default',
  heading = {
    eyebrow: 'Pakketten',
    title: 'Heldere pakketten, opgebouwd rond uw mutaties',
    description:
      'Van een compact instappakket voor kleine ondernemers tot een externe financiële afdeling voor het MKB. U kiest wat past; wij groeien met u mee.',
  },
}: PackagesSectionProps) {
  return (
    <Section id="pakketten" tone={tone} aria-labelledby="pakketten-title">
      <Container>
        <SectionHeading
          id="pakketten-title"
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
          align="center"
          className="reveal"
        />
        {/* Pricing-grid: 1 kolom mobiel, 2 tablet, 3 laptop, 5 desktop — gelijke breedte/hoogte per kaart */}
        <ul className="mx-auto mt-14 grid max-w-6xl grid-cols-1 items-stretch gap-5 pt-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </ul>
        <PricingNote className="reveal mx-auto mt-10 max-w-6xl" />
        {compact && (
          <div className="reveal mt-10 flex justify-center">
            <Button to={routes.pakketten.path} variant="outline" iconRight={<ArrowRight />}>
              Bekijk alle pakketten en tarieven
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
