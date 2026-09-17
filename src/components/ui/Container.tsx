import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Smallere variant voor tekstpagina's (privacy, over ons) */
  narrow?: boolean;
}

/** Contentbreedte met responsive zijmarges. */
export function Container({ children, className, as: Tag = 'div', narrow }: ContainerProps) {
  return (
    <Tag className={cn('container-site', narrow && 'max-w-3xl', className)}>{children}</Tag>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Achtergrondvariant */
  tone?: 'default' | 'alt' | 'dark';
  as?: 'section' | 'div' | 'article';
  'aria-labelledby'?: string;
}

/** Verticale sectie met consistente spacing en achtergrond. */
export function Section({
  children,
  className,
  id,
  tone = 'default',
  as: Tag = 'section',
  ...rest
}: SectionProps) {
  const tones = {
    default: 'bg-surface',
    alt: 'bg-surface-alt',
    dark: 'bg-surface-dark text-on-dark',
  };
  return (
    <Tag id={id} className={cn('section', tones[tone], className)} {...rest}>
      {children}
    </Tag>
  );
}
