import { statusMeta } from '@/data/content-studio';
import type { ContentStatus } from '@/lib/content/types';
import { cn } from '@/lib/cn';

interface StatusBadgeProps {
  status: ContentStatus;
  className?: string;
  /** Toont ook de technische status (DRAFT, REVIEW, …) */
  showCode?: boolean;
}

/** Statuslabel in de kleuren van de bestaande design tokens. */
export function StatusBadge({ status, className, showCode }: StatusBadgeProps) {
  const meta = statusMeta[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
        meta.className,
        className,
      )}
      title={meta.description}
    >
      {meta.label}
      {showCode && <span className="font-mono text-[0.65rem] opacity-70">{status}</span>}
    </span>
  );
}
