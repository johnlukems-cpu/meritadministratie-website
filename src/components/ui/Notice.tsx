import type { ReactNode } from 'react';
import { Info, ScaleIcon, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/cn';

type Tone = 'info' | 'scope' | 'attention';

const tones: Record<Tone, { wrapper: string; icon: string; Icon: typeof Info }> = {
  /** Neutrale toelichting */
  info: {
    wrapper: 'border-default bg-surface-alt',
    icon: 'text-primary',
    Icon: Info,
  },
  /** Afbakening van verantwoordelijkheden (wie controleert, keurt goed en dient in) */
  scope: {
    wrapper: 'border-strong bg-primary-soft/50',
    icon: 'text-primary',
    Icon: ScaleIcon,
  },
  /** Vraagt expliciet aandacht, bijv. een tarief dat nog intern bevestigd moet worden */
  attention: {
    wrapper: 'border-warning/35 bg-warning-soft',
    icon: 'text-warning',
    Icon: TriangleAlert,
  },
};

interface NoticeProps {
  title?: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

/**
 * Toelichtingsblok. Gebruikt voor het afbakenen van verantwoordelijkheden op de
 * dienstpagina's en voor voorwaarden bij tarieven.
 */
export function Notice({ title, children, tone = 'info', className }: NoticeProps) {
  const { wrapper, icon, Icon } = tones[tone];
  return (
    <div className={cn('flex items-start gap-4 rounded-lg border p-5 md:p-6', wrapper, className)}>
      <Icon aria-hidden="true" className={cn('mt-0.5 size-5 shrink-0', icon)} />
      <div className="min-w-0">
        {title && <p className="font-semibold text-primary">{title}</p>}
        <div
          className={cn(
            'measure-wide text-[0.9375rem] leading-relaxed text-muted',
            title && 'mt-1.5',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
