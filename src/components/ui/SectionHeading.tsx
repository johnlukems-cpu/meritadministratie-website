import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  /** Klein label boven de kop, bijv. "Diensten" */
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** Kopniveau — standaard h2 */
  as?: 'h1' | 'h2' | 'h3';
  /** Koppelt de sectie aan de kop via aria-labelledby */
  id?: string;
  className?: string;
  /** Kleuren voor donkere achtergrond */
  onDark?: boolean;
}

const sizes = {
  h1: 'text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]',
  h2: 'text-3xl sm:text-[2.25rem] lg:text-[2.625rem] lg:leading-[1.15]',
  h3: 'text-2xl sm:text-3xl',
};

/** Consistente sectiekop: eyebrow + titel + intro. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
  id,
  className,
  onDark,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'eyebrow mb-4',
            align === 'center' && 'justify-center',
            onDark && 'text-accent',
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={cn('font-semibold', sizes[Tag], onDark && 'text-on-dark')}>
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed',
            onDark ? 'text-on-dark-muted' : 'text-muted',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
