import { ArrowRight } from 'lucide-react';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { routes } from '@/config/routes';
import { homeFaq } from '@/data/faq';

interface FaqSectionProps {
  items?: readonly AccordionItem[];
  title?: string;
  description?: string;
  tone?: 'default' | 'alt';
  /** Link naar de volledige FAQ-pagina tonen */
  showAllLink?: boolean;
  id?: string;
}

/** FAQ-accordion. Standaard de selectie voor de homepage. */
export function FaqSection({
  items = homeFaq,
  title = 'Veelgestelde vragen',
  description = 'Over samenwerken, uitbesteden, btw-aangiften, jaarafsluitingen en tarieven.',
  tone = 'default',
  showAllLink = true,
  id = 'faq',
}: FaqSectionProps) {
  const titleId = `${id}-title`;
  return (
    <Section id={id} tone={tone} aria-labelledby={titleId}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 [&>*]:min-w-0">
          <div>
            <SectionHeading
              id={titleId}
              eyebrow="Vragen"
              title={title}
              description={description}
              className="reveal"
            />
            {showAllLink && (
              <div className="reveal mt-8">
                <Button to={routes.faq.path} variant="outline" iconRight={<ArrowRight />}>
                  Alle vragen bekijken
                </Button>
              </div>
            )}
          </div>
          <Accordion items={items} className="reveal" />
        </div>
      </Container>
    </Section>
  );
}
