import type { LucideIcon } from 'lucide-react';
import {
  ArrowRightLeft,
  BarChart3,
  BookOpenCheck,
  Building2,
  Calculator,
  CalendarCheck,
  ClipboardList,
  FileCheck2,
  FileSpreadsheet,
  FolderKanban,
  Globe2,
  Landmark,
  Receipt,
  Rocket,
  Workflow,
} from 'lucide-react';
import { routes } from '@/config/routes';

export type ServiceCategory = 'administratie' | 'aangiften' | 'jaarwerk' | 'afas' | 'ondersteuning';

export interface ServiceSummary {
  /** Unieke sleutel, ook bruikbaar als anker */
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: ServiceCategory;
  /** Doelpagina met meer informatie */
  to: string;
  /** Vanaf-tarief zoals in het Prijzenoverzicht 2026 (excl. btw); ontbreekt = op aanvraag/in pakket */
  priceFrom?: string;
  /** Tonen op de homepage */
  featured?: boolean;
}

export const serviceCategories: Record<ServiceCategory, string> = {
  administratie: 'Financiële administratie',
  aangiften: 'Aangiften',
  jaarwerk: 'Jaarwerk & rapportage',
  afas: 'AFAS',
  ondersteuning: 'Ondersteuning & overstappen',
};

/**
 * Alle diensten. Volgorde = weergavevolgorde op /diensten.
 * Prijzen komen uitsluitend uit het Prijzenoverzicht 2026.
 */
export const allServices: ServiceSummary[] = [
  {
    id: 'financiele-administratie',
    title: 'Financiële administratie',
    description:
      'De basis op orde: een overzichtelijke administratie die aansluit op uw onderneming, zodat u op elk moment weet waar u staat.',
    icon: FolderKanban,
    category: 'administratie',
    to: routes.administratie.path,
    priceFrom: 'in pakket vanaf € 125 p/m',
    featured: true,
  },
  {
    id: 'boekhouding',
    title: 'Boekhouding',
    description:
      'Doorlopende, nauwkeurige verwerking van uw boekhouding in AFAS, inclusief controle en afstemming.',
    icon: BookOpenCheck,
    category: 'administratie',
    to: routes.administratie.path,
    featured: true,
  },
  {
    id: 'bankverwerking',
    title: 'Bankverwerking',
    description:
      'Bankmutaties worden periodiek verwerkt en afgeletterd tegen facturen, zodat de administratie sluit.',
    icon: Landmark,
    category: 'administratie',
    to: routes.administratie.path,
  },
  {
    id: 'inkoop-verkoopfacturen',
    title: 'Inkoop- en verkoopfacturen',
    description:
      'Verwerking van uw facturen en beheer van debiteuren en crediteuren: wat staat open, wat komt binnen, wat moet betaald.',
    icon: Receipt,
    category: 'administratie',
    to: routes.administratie.path,
  },
  {
    id: 'btw-aangifte',
    title: 'Btw-aangifte',
    description:
      'Elke periode tijdig en correct ingediend bij de Belastingdienst, inclusief controle vooraf.',
    icon: Calculator,
    category: 'aangiften',
    to: routes.belastingaangifte.path,
    priceFrom: 'vanaf € 50',
    featured: true,
  },
  {
    id: 'icp-aangifte',
    title: 'ICP-aangifte',
    description:
      'Voor ondernemingen die goederen of diensten leveren binnen de EU: wij zorgen dat de opgaaf klopt.',
    icon: Globe2,
    category: 'aangiften',
    to: routes.belastingaangifte.path,
    priceFrom: 'vanaf € 40',
  },
  {
    id: 'ib-aangifte',
    title: 'IB-aangifte',
    description:
      'Uw aangifte inkomstenbelasting als ondernemer of dga, zorgvuldig voorbereid en met u afgestemd.',
    icon: FileCheck2,
    category: 'aangiften',
    to: routes.belastingaangifte.path,
    priceFrom: 'vanaf € 150',
    featured: true,
  },
  {
    id: 'vpb-aangifte',
    title: 'Vpb-aangifte',
    description:
      'Vennootschapsbelasting voor uw bv, inclusief heldere onderbouwing richting de Belastingdienst.',
    icon: Building2,
    category: 'aangiften',
    to: routes.belastingaangifte.path,
    priceFrom: 'vanaf € 300',
  },
  {
    id: 'jaarwerk',
    title: 'Jaarwerk',
    description:
      'De jaarafsluiting van uw administratie: alle posten gecontroleerd en de cijfers klaar voor de jaarlijkse aangifte.',
    icon: CalendarCheck,
    category: 'jaarwerk',
    to: routes.pakketten.path,
  },
  {
    id: 'jaarrekening',
    title: 'Jaarrekening',
    description:
      'Jaarrekening voor eenmanszaak, vof of bv, opgesteld op basis van een sluitende administratie.',
    icon: FileSpreadsheet,
    category: 'jaarwerk',
    to: routes.pakketten.path,
    priceFrom: 'vanaf € 500',
  },
  {
    id: 'rapportage',
    title: 'Rapportage',
    description:
      'Periodieke financiële rapportage en maandafsluiting, zodat u beslissingen neemt op actuele cijfers.',
    icon: BarChart3,
    category: 'jaarwerk',
    to: routes.pakketten.path,
    priceFrom: 'vanaf € 50 p/m',
  },
  {
    id: 'administratieve-ondersteuning',
    title: 'Administratieve ondersteuning',
    description:
      'Hulp bij alles wat er verder bij komt kijken: van vraagposten en facturatie tot fiscale correspondentie.',
    icon: ClipboardList,
    category: 'ondersteuning',
    to: routes.administratie.path,
  },
  {
    id: 'afas-ondersteuning',
    title: 'AFAS-ondersteuning',
    description:
      'Quick scan, inrichting, optimalisatie en begeleiding van uw AFAS-omgeving, of overstappen naar AFAS.',
    icon: Workflow,
    category: 'afas',
    to: routes.afas.path,
    priceFrom: 'vanaf € 85 per uur',
    featured: true,
  },
  {
    id: 'overstappen',
    title: 'Overstappen van boekhouder',
    description:
      'Wij nemen contact op met uw huidige boekhouder en zorgen voor een soepele, tijdige overdracht.',
    icon: ArrowRightLeft,
    category: 'ondersteuning',
    to: routes.overstappen.path,
    featured: true,
  },
  {
    id: 'startende-ondernemers',
    title: 'Startende ondernemers',
    description:
      'Een goede administratieve basis vanaf de start, inclusief de eerste inrichting van uw administratie in AFAS.',
    icon: Rocket,
    category: 'ondersteuning',
    to: routes.startendeOndernemers.path,
  },
];

/** De zes diensten op de homepage */
export const services: ServiceSummary[] = allServices.filter((s) => s.featured);
