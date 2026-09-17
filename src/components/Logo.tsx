import { Link } from 'react-router';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/config/site';
import { LOGO_HORIZONTAL_RATIO, logoFiles } from '@/config/brand';

interface LogoProps {
  className?: string;
  /** Witte variant voor donkere achtergrond */
  onDark?: boolean;
  /** Hoogte in px (breedte volgt automatisch) */
  height?: number;
  /** Renders zonder link (bijv. in de footer of op de over-ons-pagina) */
  asLink?: boolean;
  /** Voorrang bij laden (alleen voor het header-logo) */
  priority?: boolean;
}

/** Officieel MERIT-logo (echte afbeelding), linkt standaard naar de homepage. */
export function Logo({ className, onDark, height = 40, asLink = true, priority }: LogoProps) {
  const width = Math.round(height * LOGO_HORIZONTAL_RATIO);
  const img = (
    <img
      src={onDark ? logoFiles.horizontalWhite : logoFiles.horizontal}
      alt={`${siteConfig.name} — logo`}
      width={width}
      height={height}
      style={{ height, width: 'auto' }}
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      className="block max-w-full"
    />
  );

  const classes = cn('inline-flex shrink-0 items-center rounded-md', className);

  if (!asLink) {
    return <span className={classes}>{img}</span>;
  }

  return (
    <Link to="/" className={classes} aria-label={`${siteConfig.name} — naar de homepage`}>
      {img}
    </Link>
  );
}
