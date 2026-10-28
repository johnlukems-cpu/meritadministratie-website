import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Container, Section } from '@/components/ui/Container';
import { routes } from '@/config/routes';
import { cardName, services, type ServiceSummary } from '@/data/services';

interface ServiceCardProps {
  service: ServiceSummary;
  linkLabel?: string;
  /** Tariefweergave op de kaart tonen */
  showPrice?: boolean;
}

/** Eén dienstkaart: icoon, titel, omschrijving en link. */
export function ServiceCard({
  service,
  linkLabel = 'Meer informatie',
  showPrice = false,
}: ServiceCardProps) {
  return (
    <li className="reveal group relative flex h-full min-w-0 flex-col rounded-xl border border-default bg-surface p-6 transition-[box-shadow,border-color,translate] duration-300 ease-out hover:-translate-y-0.5 hover:border-strong hover:shadow-md">
      <span
        aria-hidden="true"
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-text"
      >
        <service.icon className="size-5" />
      </span>

      <h3 className="ui-heading mt-5 text-[1.0625rem] font-semibold text-primary">
        {cardName(service)}
      </h3>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">
        {service.description}
      </p>

      {showPrice && (
        <p className="mt-4 text-sm font-semibold text-accent-text">{service.priceFrom}</p>
      )}

      <Link
        to={service.to}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text after:absolute after:inset-0 after:content-['']"
        aria-label={`${linkLabel}: ${cardName(service)}`}
      >
        {linkLabel}
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </Link>
    </li>
  );
}

interface ServicesGridProps {
  items?: ServiceSummary[];
  /** Kop boven het grid; `null` verbergt de kop */
  heading?: { eyebrow?: string; title: string; description?: string } | null;
  linkLabel?: string;
  showPrice?: boolean;
  /** Link rechts naast de kop */
  headerLink?: { label: string; to: string } | null;
  tone?: 'default' | 'alt';
  id?: string;
}

export function ServicesGrid({
  items = services,
  heading = {
    eyebrow: 'Onze diensten',
    title: 'Complete ondersteuning voor uw financiële processen',
    description:
      'Van dagelijkse administratie tot btw-aangiften en jaarrekeningvoorbereiding. MERIT ondersteunt uw kantoor flexibel, nauwkeurig en volgens uw werkwijze.',
  },
  linkLabel,
  showPrice = false,
  headerLink = { label: 'Alle diensten bekijken', to: routes.diensten.path },
  tone = 'default',
  id = 'diensten',
}: ServicesGridProps) {
  const titleId = `${id}-title`;
  return (
    <Section id={id} tone={tone} aria-labelledby={heading ? titleId : undefined}>
      <Container>
        {heading && (
          <div className="reveal grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <div className="min-w-0">
              {heading.eyebrow && (
                <p className="mb-4 text-[0.6875rem] font-semibold tracking-[0.14em] text-accent-text uppercase sm:text-xs">
                  {heading.eyebrow}
                </p>
              )}
              <h2
                id={titleId}
                className="text-[1.75rem] leading-[1.2] sm:text-[2.125rem] lg:text-[2.375rem] lg:leading-[1.16]"
              >
                {heading.title}
              </h2>
            </div>
            {(heading.description || headerLink) && (
              <div className="min-w-0 lg:pb-1">
                {heading.description && (
                  <p className="text-[0.9375rem] leading-relaxed text-muted">
                    {heading.description}
                  </p>
                )}
                {headerLink && (
                  <Link
                    to={headerLink.to}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text underline-offset-4 hover:underline"
                  >
                    {headerLink.label}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        <ul
          className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 ${heading ? 'mt-12' : ''}`}
        >
          {items.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              linkLabel={linkLabel}
              showPrice={showPrice}
            />
          ))}
        </ul>
      </Container>
    </Section>
  );
}
