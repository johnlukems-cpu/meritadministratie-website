import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';

export interface Crumb {
  name: string;
  path: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  /** Broodkruimels (Home wordt automatisch vooraan gezet) */
  breadcrumbs?: Crumb[];
  /** Knoppen onder de intro */
  actions?: ReactNode;
  tone?: 'light' | 'dark';
}

/** Kop van subpagina's: broodkruimels, titel, intro en optionele knoppen. */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  actions,
  tone = 'light',
}: PageHeroProps) {
  const dark = tone === 'dark';
  const crumbs: Crumb[] = [{ name: 'Home', path: '/' }, ...(breadcrumbs ?? [])];

  return (
    <section className={cn(dark ? 'bg-surface-dark text-on-dark' : 'bg-surface-alt')}>
      <Container className="py-14 md:py-20">
        <nav aria-label="Broodkruimelpad" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm">
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-1">
                  {last ? (
                    <span aria-current="page" className={dark ? 'text-on-dark' : 'text-text'}>
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      to={crumb.path}
                      className={cn(
                        'transition-colors',
                        dark
                          ? 'text-on-dark-muted hover:text-on-dark focus-visible:outline-white'
                          : 'text-muted hover:text-primary',
                      )}
                    >
                      {crumb.name}
                    </Link>
                  )}
                  {!last && (
                    <ChevronRight
                      aria-hidden="true"
                      className={cn('size-3.5', dark ? 'text-on-dark-muted' : 'text-subtle')}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="max-w-3xl">
          {eyebrow && <p className={cn('eyebrow mb-4', dark && 'text-accent')}>{eyebrow}</p>}
          <h1
            className={cn(
              'text-4xl font-semibold sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]',
              dark && 'text-on-dark',
            )}
          >
            {title}
          </h1>
          {intro && (
            <p
              className={cn(
                'mt-5 max-w-2xl text-lg leading-relaxed',
                dark ? 'text-on-dark-muted' : 'text-muted',
              )}
            >
              {intro}
            </p>
          )}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </Container>
    </section>
  );
}
