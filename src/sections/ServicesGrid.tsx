import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { Card, IconBadge } from '@/components/ui/Card';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { routes } from '@/config/routes';
import { services, type ServiceSummary } from '@/data/services';

interface ServiceCardProps {
  service: ServiceSummary;
  /** Linktekst onderaan de kaart */
  linkLabel?: string;
}

/** Eén dienstkaart: icoon, titel, omschrijving, link. */
export function ServiceCard({ service, linkLabel = 'Meer informatie' }: ServiceCardProps) {
  return (
    <Card as="li" interactive className="reveal group relative flex h-full flex-col">
      <IconBadge>
        <service.icon />
      </IconBadge>
      <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{service.description}</p>
      <Link
        to={service.to}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary after:absolute after:inset-0 after:content-['']"
        aria-label={`${linkLabel}: ${service.title}`}
      >
        {linkLabel}
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </Link>
    </Card>
  );
}

interface ServicesGridProps {
  /** Welke diensten tonen (standaard: de zes homepage-diensten) */
  items?: ServiceSummary[];
  /** Kop boven het grid; `null` verbergt de kop */
  heading?: { eyebrow?: string; title: string; description?: string } | null;
  linkLabel?: string;
  /** Toon "Bekijk alle diensten"-knop onder de kaarten */
  showAllLink?: boolean;
  tone?: 'default' | 'alt';
  id?: string;
}

export function ServicesGrid({
  items = services,
  heading = {
    eyebrow: 'Diensten',
    title: 'Waar wij u mee helpen',
    description:
      'Van de dagelijkse administratie tot belastingaangiften: wij zorgen dat uw financiële administratie overzichtelijk en op orde blijft.',
  },
  linkLabel,
  showAllLink = true,
  tone = 'alt',
  id = 'diensten',
}: ServicesGridProps) {
  const titleId = `${id}-title`;
  return (
    <Section id={id} tone={tone} aria-labelledby={heading ? titleId : undefined}>
      <Container>
        {heading && (
          <SectionHeading
            id={titleId}
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
            align="center"
            className="reveal"
          />
        )}
        <ul className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 ${heading ? 'mt-12' : ''}`}>
          {items.map((service) => (
            <ServiceCard key={service.id} service={service} linkLabel={linkLabel} />
          ))}
        </ul>
        {showAllLink && (
          <div className="reveal mt-12 flex justify-center">
            <Button to={routes.diensten.path} variant="outline" iconRight={<ArrowRight />}>
              Bekijk alle diensten
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
