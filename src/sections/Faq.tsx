import { Link } from 'react-router';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { routes } from '@/config/routes';

interface FaqProps {
  items: readonly AccordionItem[];
  title?: string;
  description?: string;
}

/** Veelgestelde vragen met toegankelijke accordion. Herbruikbaar per pagina. */
export function Faq({
  items,
  title = 'Veelgestelde vragen',
  description = 'Antwoord op de vragen die ondernemers ons het meest stellen.',
}: FaqProps) {
  return (
    <Section id="faq" aria-labelledby="faq-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="reveal">
            <SectionHeading id="faq-title" eyebrow="FAQ" title={title} description={description} />
            <p className="mt-6 text-[0.9375rem] text-muted">
              Staat uw vraag er niet bij?{' '}
              <Link to={routes.contact.path} className="font-semibold text-primary underline-offset-4 hover:underline">
                Neem contact op
              </Link>
              .
            </p>
          </div>
          <div className="reveal">
            <Accordion items={items} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
