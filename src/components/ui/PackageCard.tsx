import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { routes } from '@/config/routes';
import type { Package } from '@/data/packages';
import { cn } from '@/lib/cn';

interface PackageCardProps {
  pkg: Package;
  /** Compacte variant (homepage) */
  compact?: boolean;
}

/** Pakketkaart met vanaf-tarief (excl. btw), doelgroep en inbegrepen onderdelen. */
export function PackageCard({ pkg, compact }: PackageCardProps) {
  const highlighted = pkg.highlighted;
  return (
    <li
      className={cn(
        'reveal relative flex h-full flex-col rounded-lg border bg-surface',
        compact ? 'p-5' : 'p-6 md:p-7',
        highlighted ? 'border-accent shadow-md ring-1 ring-accent/40' : 'border-default',
      )}
    >
      {highlighted && (
        <span className="absolute -top-3 left-5 rounded-full bg-accent px-3 py-1 text-[0.6875rem] font-bold tracking-wide whitespace-nowrap text-accent-contrast uppercase">
          Voor het MKB
        </span>
      )}
      <h3 className={cn('font-semibold', compact ? 'text-base' : 'text-lg')}>{pkg.name}</h3>
      <p className="mt-1 text-sm text-muted">{pkg.audience}</p>
      <p className="mt-4 flex items-baseline gap-1.5">
        <span className="text-sm text-muted">vanaf</span>
        <span className={cn('font-semibold text-primary tabular-nums', compact ? 'text-2xl' : 'text-3xl')}>
          € {pkg.priceFrom}
        </span>
        <span className="text-sm text-muted">p/m</span>
      </p>
      <p className="text-xs text-subtle">excl. 21% btw</p>
      <ul className={cn('flex-1 space-y-2', compact ? 'mt-4 text-sm' : 'mt-6 text-[0.9375rem]')}>
        {pkg.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-text">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-4.5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text"
            >
              <Check className="size-2.5" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <div className={compact ? 'mt-5' : 'mt-7'}>
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
