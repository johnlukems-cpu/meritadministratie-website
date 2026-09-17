import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Maakt de hele kaart klikbaar (interne route) */
  to?: string;
  /** Hover-effect (schaduw + rand) */
  interactive?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  as?: 'div' | 'article' | 'li';
}

const paddings = {
  sm: 'p-5',
  md: 'p-6 md:p-7',
  lg: 'p-7 md:p-9',
};

/** Moderne kaart met subtiele rand en schaduw. */
export function Card({
  children,
  className,
  to,
  interactive,
  padding = 'md',
  as: Tag = 'div',
}: CardProps) {
  const base = cn(
    'block rounded-lg border border-default bg-surface',
    paddings[padding],
    (interactive || to) &&
      'transition-[opacity,box-shadow,border-color,translate] duration-300 ease-out hover:-translate-y-0.5 hover:border-strong hover:shadow-md',
    className,
  );

  if (to) {
    return (
      <Link to={to} className={base}>
        {children}
      </Link>
    );
  }
  return <Tag className={base}>{children}</Tag>;
}

interface IconBadgeProps {
  children: ReactNode;
  className?: string;
  tone?: 'primary' | 'accent';
  size?: 'sm' | 'md';
}

/** Rond/afgerond vlak met icoon, voor bovenin kaarten. */
export function IconBadge({ children, className, tone = 'primary', size = 'md' }: IconBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md',
        size === 'md' ? 'size-12 [&>svg]:size-6' : 'size-10 [&>svg]:size-5',
        tone === 'primary' ? 'bg-primary-soft text-primary' : 'bg-accent-soft text-accent-text',
        className,
      )}
    >
      {children}
    </span>
  );
}
