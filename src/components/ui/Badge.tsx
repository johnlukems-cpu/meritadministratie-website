import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'accent' | 'primary' | 'positive' | 'neutral';

const tones: Record<Tone, string> = {
  accent: 'bg-accent-soft text-accent-text',
  primary: 'bg-primary-soft text-primary',
  positive: 'bg-success-soft text-success',
  neutral: 'bg-surface-muted text-muted',
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  /** Icoon links van de tekst */
  icon?: ReactNode;
}

/** Klein label voor status, doelgroep of een uitgelicht kenmerk. */
export function Badge({ children, tone = 'accent', className, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
        '[&>svg]:size-3.5',
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
