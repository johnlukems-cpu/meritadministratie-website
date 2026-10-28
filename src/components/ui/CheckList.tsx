import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CheckListProps {
  items: readonly string[];
  className?: string;
  /** Twee kolommen op grotere schermen */
  columns?: 1 | 2;
  /** Kleuren voor donkere achtergrond */
  onDark?: boolean;
  size?: 'sm' | 'md';
}

/**
 * Opsomming met vinkjes. Gebruikt op de dienstpagina's voor concrete werkzaamheden
 * en in de prijskaarten voor inbegrepen onderdelen.
 */
export function CheckList({
  items,
  className,
  columns = 1,
  onDark,
  size = 'md',
}: CheckListProps) {
  return (
    <ul
      className={cn(
        'grid gap-x-8 gap-y-3',
        columns === 2 && 'sm:grid-cols-2',
        size === 'sm' ? 'text-[0.9375rem]' : 'text-base',
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 leading-relaxed">
          <span
            aria-hidden="true"
            className={cn(
              'mt-1 inline-flex size-[1.125rem] shrink-0 items-center justify-center rounded-full',
              onDark ? 'bg-accent/20 text-accent-light' : 'bg-accent-soft text-accent-text',
            )}
          >
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span className={onDark ? 'text-on-dark-muted' : 'text-text'}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
