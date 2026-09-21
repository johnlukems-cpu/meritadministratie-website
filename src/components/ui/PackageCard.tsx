import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { routes } from '@/config/routes';
import type { Package } from '@/data/packages';
import { cn } from '@/lib/cn';

interface PackageCardProps {
  pkg: Package;
}

/**
 * Pakketkaart. Vaste interne structuur zodat alle kaarten in het grid gelijk lopen:
 * naam → korte omschrijving → prijs → btw-noot → features (flexibel) → CTA (onderaan).
 */
export function PackageCard({ pkg }: PackageCardProps) {
  const highlighted = pkg.highlighted;
  return (
    <li
      className={cn(
        'reveal relative flex h-full flex-col rounded-lg border bg-surface p-6',
        highlighted ? 'border-accent shadow-md ring-1 ring-accent/40' : 'border-default',
      )}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[0.6875rem] font-bold tracking-wide whitespace-nowrap text-accent-contrast uppercase">
          Voor het MKB
        </span>
      )}

      {/* 1. Naam + 2. korte omschrijving (vaste hoogte voor gelijke uitlijning) */}
      <div className="min-h-[4.5rem]">
        <h3 className="text-lg font-semibold">{pkg.name}</h3>
        <p className="mt-1 text-sm leading-snug text-muted">{pkg.audience}</p>
      </div>

      {/* 3. Prijs + 4. btw */}
      <div className="mt-5 border-t border-default pt-5">
        <p className="flex items-baseline gap-1.5">
          <span className="text-sm text-muted">vanaf</span>
          <span className="text-2xl font-semibold text-primary tabular-nums">€ {pkg.priceFrom}</span>
          <span className="text-sm text-muted">p/m</span>
        </p>
        <p className="mt-0.5 text-xs text-subtle">excl. 21% btw</p>
      </div>

      {/* 5. Features — flexibel, zodat de CTA overal op dezelfde hoogte staat */}
      <ul className="mt-5 flex-1 space-y-2.5 text-sm">
        {pkg.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 leading-snug text-text">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text"
            >
              <Check className="size-2.5" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>

      {/* 6. CTA */}
      <div className="mt-6">
        <Button
          to={`${routes.offerte.path}?pakket=${pkg.id}`}
          variant={highlighted ? 'primary' : 'outline'}
          size="sm"
          fullWidth
          iconRight={<ArrowRight />}
        >
          Vraag een offerte aan
        </Button>
      </div>
    </li>
  );
}
