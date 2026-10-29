import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Calculator, FileSpreadsheet, FolderKanban } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Container';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { QUOTED_LABEL } from '@/data/pricing';
import { cn } from '@/lib/cn';

/**
 * Tarievenpreview op de homepage.
 *
 * Alleen de maandpakketten krijgen een bedrag; dat komt uit het Prijzenoverzicht
 * 2026 (src/data/packages.ts). Btw-aangiften en jaarrekeningen krijgen nergens een
 * bedrag: daarvoor verwijst de regel onder de kaarten naar een prijsvoorstel.
 */
const highlights = [
  {
    name: 'Financiële administratie',
    icon: FolderKanban,
    prefix: 'vanaf',
    price: '€ 125',
    unit: 'per maand',
    description: 'Uw facturen en bankmutaties periodiek verwerkt.',
    to: routes.financieleAdministratie.path,
  },
  {
    name: 'Btw-aangiften',
    icon: Calculator,
    prefix: '',
    price: 'Op afspraak',
    unit: 'vast tarief per opdracht',
    description: 'Voorbereid, gecontroleerd en aangesloten op uw boekhouding.',
    to: routes.btwAangiften.path,
  },
  {
    name: 'Jaarrekeningen',
    icon: FileSpreadsheet,
    prefix: '',
    price: 'Op afspraak',
    unit: 'vast tarief per opdracht',
    description: 'Uw boekjaar afgesloten en de jaarrekening samengesteld.',
    to: routes.jaarrekeningen.path,
  },
];

/** Sectie "Professionele ondersteuning tegen toegankelijke tarieven". */
export function PricingPreview() {
  return (
    <Section id="tarieven" tone="alt" aria-labelledby="tarieven-title">
      <Container>
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0 max-w-2xl">
            <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-accent-text uppercase">
              Tarieven
            </p>
            <h2
              id="tarieven-title"
              className="text-[1.75rem] leading-[1.2] sm:text-[2.125rem] lg:text-[2.375rem]"
            >
              Duidelijke tarieven, vooraf vastgelegd.
            </h2>
          </div>
          <Link
            to={routes.tarieven.path}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent-text underline-offset-4 hover:underline"
          >
            Alle tarieven bekijken
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr_1fr_0.75fr] lg:gap-4">
          {highlights.map((item) => (
            <div
              key={item.name}
              className="reveal flex min-w-0 flex-col rounded-xl border border-default bg-surface p-6"
            >
              {/* Vaste hoogte voor de kopregel: een naam van twee regels mag de
                  prijs eronder niet uit lijn duwen met de andere kaarten. */}
              <div className="flex min-h-12 items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-text"
                >
                  <item.icon className="size-5" />
                </span>
                <h3 className="ui-heading min-w-0 text-[1.0625rem] leading-snug font-semibold text-primary">
                  {item.name}
                </h3>
              </div>

              <p className="mt-5 text-sm text-muted">{item.prefix || '\u00a0'}</p>
              <p className="mt-0.5 flex items-baseline gap-2">
                <span
                  className={cn(
                    'font-semibold leading-none text-accent-text',
                    // "Op afspraak" is geen bedrag en past niet op 36 px in de kaart.
                    /\d/.test(item.price)
                      ? 'text-[2.25rem] tabular-nums'
                      : 'text-[1.5rem]',
                  )}
                >
                  {item.price}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted">{item.unit}</p>

              <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                {item.description}
              </p>
              <Link
                to={item.to}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                Meer informatie
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          ))}

          {/* Knoppen in de vierde kolom, zoals in het ontwerp */}
          <div className="reveal flex min-w-0 flex-col gap-3 lg:justify-end">
            <Button to={routes.tarieven.path} variant="secondary" fullWidth iconRight={<ArrowRight />}>
              Bekijk alle tarieven
            </Button>
            <Button to={routes.offerte.path} variant="outline" fullWidth>
              Vraag een offerte aan
            </Button>
          </div>
        </div>

        <p className="reveal measure-wide mt-8 text-[0.9375rem] text-muted">
          <strong className="font-semibold text-text">Btw-aangiften en jaarrekeningen:</strong>{' '}
          {QUOTED_LABEL.toLowerCase()}. De prijs hangt af van het aantal administraties en de omvang
          van de werkzaamheden.{' '}
          <Link
            to={routes.offerte.path}
            className="font-semibold text-accent-text underline underline-offset-4"
          >
            Vraag een prijsvoorstel aan
          </Link>
          . {siteConfig.pricing.vatNote}
        </p>
      </Container>
    </Section>
  );
}
