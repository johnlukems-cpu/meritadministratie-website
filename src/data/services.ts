import type { LucideIcon } from 'lucide-react';
import { Calculator, FileSpreadsheet, FolderKanban } from 'lucide-react';
import { routes } from '@/config/routes';
import { QUOTED_LABEL } from '@/data/pricing';

/**
 * De drie diensten waarmee MERIT zzp’ers en mkb-ondernemers ondersteunt.
 * Bron voor het dienstenoverzicht op de homepage, de pagina /diensten, de footer en
 * de keuzelijsten in de formulieren.
 *
 * `priceFrom` moet overeenkomen met de tarievenpagina. Financiële administratie loopt
 * via de maandpakketten uit het Prijzenoverzicht 2026 (src/data/packages.ts); btw en
 * jaarrekeningen worden per opdracht afgesproken en krijgen daarom nergens op de
 * website een uurtarief of vanaf-prijs.
 */

export interface ServiceSummary {
  /** Unieke sleutel, ook bruikbaar als anker en als formulierwaarde */
  id: string;
  /** Volledige naam (paginatitel, navigatie, broodkruimels) */
  title: string;
  /** Kortere naam voor de dienstkaarten; valt terug op `title` */
  cardTitle?: string;
  /** Korte omschrijving op de dienstkaart */
  description: string;
  icon: LucideIcon;
  /** Doelpagina met de volledige dienstbeschrijving */
  to: string;
  /** Tariefweergave zoals op de tarievenpagina (excl. btw) */
  priceFrom: string;
}

export const services: ServiceSummary[] = [
  {
    id: 'financiele-administratie',
    title: 'Financiële administratie',
    description:
      'Uw facturen, bankmutaties en debiteuren en crediteuren bijgewerkt, met periodiek inzicht in uw cijfers.',
    icon: FolderKanban,
    to: routes.financieleAdministratie.path,
    priceFrom: 'vanaf € 125 per maand',
  },
  {
    id: 'btw-aangiften',
    title: 'Btw-aangiften',
    description:
      'Uw btw-administratie voorbereid, gecontroleerd en aangesloten op uw boekhouding.',
    icon: Calculator,
    to: routes.btwAangiften.path,
    priceFrom: QUOTED_LABEL,
  },
  {
    id: 'jaarrekeningen',
    title: 'Jaarrekeningen & jaarafsluiting',
    cardTitle: 'Jaarrekeningen',
    description:
      'Uw boekjaar netjes afgesloten en de jaarrekening voorbereid en samengesteld.',
    icon: FileSpreadsheet,
    to: routes.jaarrekeningen.path,
    priceFrom: QUOTED_LABEL,
  },
];

/** Korte naam voor dienstkaarten en keuzelijsten. */
export const cardName = (service: ServiceSummary): string => service.cardTitle ?? service.title;
