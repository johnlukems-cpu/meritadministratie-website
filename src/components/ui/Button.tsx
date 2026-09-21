import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'onDark';
type Size = 'compact' | 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center rounded-md font-semibold whitespace-nowrap ' +
  'transition-[background-color,color,border-color,box-shadow,transform] duration-150 ease-out ' +
  'disabled:opacity-60 disabled:pointer-events-none select-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-contrast shadow-sm hover:bg-primary-hover active:bg-primary-active',
  secondary: 'bg-accent text-accent-contrast shadow-sm hover:bg-accent-hover',
  outline:
    'border border-strong bg-transparent text-primary hover:border-primary hover:bg-primary-soft/60',
  ghost: 'bg-transparent text-primary hover:bg-primary-soft/60',
  onDark:
    'bg-white text-primary shadow-sm hover:bg-accent-soft focus-visible:outline-white',
};

const sizes: Record<Size, string> = {
  /** Voor smalle kaarten (pricing-grid): compacte padding, kleinere letter, nooit afgesneden */
  compact: 'h-12 gap-1.5 px-4 text-[0.8125rem] tracking-tight',
  sm: 'h-10 gap-2 px-4 text-sm',
  md: 'h-12 gap-2 px-6 text-[0.9375rem]',
  lg: 'h-14 gap-2 px-8 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Icoon rechts van de tekst */
  iconRight?: ReactNode;
  /** Icoon links van de tekst */
  iconLeft?: ReactNode;
  /** Neemt de volledige breedte in (handig op mobiel) */
  fullWidth?: boolean;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    to?: undefined;
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  /** Interne route → <Link> */
  to: string;
  href?: undefined;
  onClick?: () => void;
};

type ButtonAsAnchor = CommonProps & {
  /** Externe link → <a> */
  href: string;
  to?: undefined;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

function classes(props: CommonProps) {
  return cn(
    base,
    variants[props.variant ?? 'primary'],
    sizes[props.size ?? 'md'],
    props.fullWidth && 'w-full',
    props.className,
  );
}

function Inner({ iconLeft, iconRight, children }: CommonProps) {
  return (
    <>
      {iconLeft && <span className="shrink-0 [&>svg]:size-[1.1em]">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0 [&>svg]:size-[1.1em]">{iconRight}</span>}
    </>
  );
}

/**
 * Knop die automatisch een <Link>, <a> of <button> rendert
 * afhankelijk van `to`, `href` of geen van beide.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  if (props.to !== undefined) {
    const { to, onClick, ...rest } = props;
    return (
      <Link to={to} onClick={onClick} className={classes(rest)}>
        <Inner {...rest} />
      </Link>
    );
  }

  if (props.href !== undefined) {
    const { href, target, rel, onClick, ...rest } = props;
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        target={target ?? (isExternal ? '_blank' : undefined)}
        rel={rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
        onClick={onClick}
        className={classes(rest)}
      >
        <Inner {...rest} />
      </a>
    );
  }

  const { variant, size, className, children, iconLeft, iconRight, fullWidth, type, ...rest } =
    props;
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={classes({ variant, size, className, children, fullWidth })}
      {...rest}
    >
      <Inner iconLeft={iconLeft} iconRight={iconRight}>
        {children}
      </Inner>
    </button>
  );
});
