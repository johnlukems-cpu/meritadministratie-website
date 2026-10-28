import type { LucideIcon } from 'lucide-react';
import {
  Calculator,
  FileSpreadsheet,
  FolderKanban,
  Settings2,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { routes } from '@/config/routes';
import { QUOTED_LABEL } from '@/data/pricing';

/**
 * De zes diensten waarmee MERIT administratie- en accountantskantoren ondersteunt.
 * Bron voor het dienstenoverzicht op de homepage, de pagina /diensten, de footer en
 * de keuzelijsten in de formulieren.
 *
 * `priceFrom` moet gelijk blijven aan het tarief in src/data/pricing.ts. Voor diensten
 * met `quoted: true` daar staat hier `QUOTED_LABEL` — die diensten krijgen nergens op
 * de website een uurtarief of vanaf-prijs.
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
    id: 'financial-backoffice',
    title: 'Financial Backoffice',
    description:
      'Financiële verwerking, bankmutaties, facturen en debiteuren- en crediteurenbeheer.',
    icon: FolderKanban,
    to: routes.financialBackoffice.path,
    priceFrom: 'vanaf € 35 per uur',
  },
  {
    id: 'btw-aangiften',
    title: 'Btw-aangiften',
    description: 'Voorbereiden en verwerken van btw-aangiften en btw-controles.',
    icon: Calculator,
    to: routes.btwAangiften.path,
    priceFrom: QUOTED_LABEL,
  },
  {
    id: 'jaarrekeningen',
    title: 'Jaarrekeningen & Jaarafsluiting',
    cardTitle: 'Jaarrekeningen',
    description: 'Ondersteuning bij jaarafsluitingen en voorbereiding van jaarrekeningen.',
    icon: FileSpreadsheet,
    to: routes.jaarrekeningen.path,
    priceFrom: QUOTED_LABEL,
  },
  {
    id: 'afas-software-support',
    title: 'AFAS & Software Support',
    description:
      'Ondersteuning bij dagelijkse verwerking en optimalisatie van werkprocessen.',
    icon: Workflow,
    to: routes.afasSupport.path,
    priceFrom: '€ 45 – € 55 per uur',
  },
  {
    id: 'finance-control',
    title: 'Finance Control',
    description: 'Grootboekcontroles, aansluitingen en kwaliteitscontroles.',
    icon: ShieldCheck,
    to: routes.financeControl.path,
    priceFrom: 'vanaf € 45 per uur',
  },
  {
    id: 'automatisering',
    title: 'Automatisering',
    description: 'Slimmere processen en minder handmatig werk.',
    icon: Settings2,
    to: routes.automatisering.path,
    priceFrom: 'op offertebasis',
  },
];

/** Naam zoals die op een dienstkaart staat. */
export const cardName = (service: ServiceSummary): string => service.cardTitle ?? service.title;

/** Dienst opzoeken op id (voor interne links en formulierwaarden). */
export const serviceById = (id: string): ServiceSummary | undefined =>
  services.find((s) => s.id === id);
