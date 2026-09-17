import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, IconBadge } from '@/components/ui/Card';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { routes } from '@/config/routes';
import { audiences, type Audience } from '@/data/audiences';

/** Eén doelgroepkaart. Herbruikbaar op /voor-ondernemers. */
export function AudienceCard({ audience }: { audience: Audience }) {
  return (
    <Card as="li" padding="sm" className="reveal flex h-full flex-col">
      <div className="flex items-center gap-3">
        <IconBadge size="sm">
          <audience.icon />
        </IconBadge>
        <h3 className="text-base font-semibold">{audience.title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{audience.description}</p>
    </Card>
  );
}

interface AudiencesProps {
  showCta?: boolean;
}

export function Audiences({ showCta = true }: AudiencesProps) {
  return (
    <Section id="voor-wie" tone="alt" aria-labelledby="voor-wie-title">
      <Container>
        <SectionHeading
          id="voor-wie-title"
          eyebrow="Voor wie"
          title="Voor ondernemers die vooruit willen"
          description="Elke ondernemingsvorm vraagt om een eigen aanpak. Wij stemmen onze dienstverlening af op uw situatie."
          align="center"
          className="reveal"
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {audiences.map((audience) => (
            <AudienceCard key={audience.id} audience={audience} />
          ))}
        </ul>
        {showCta && (
          <div className="reveal mt-12 flex justify-center">
            <Button to={routes.voorOndernemers.path} iconRight={<ArrowRight />}>
              Ontdek wat bij uw onderneming past
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
