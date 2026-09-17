import { routes } from '@/config/routes';

export interface NavItem {
  label: string;
  to: string;
  /** Subitems (dropdown op desktop, ingeklapt op mobiel) */
  children?: NavItem[];
}

/** Hoofdnavigatie in de header */
export const mainNav: NavItem[] = [
  { label: 'Home', to: routes.home.path },
  {
    label: 'Diensten',
    to: routes.diensten.path,
    children: [
      { label: 'Administratie & boekhouding', to: routes.administratie.path },
      { label: 'Belastingaangifte', to: routes.belastingaangifte.path },
      { label: 'Startende ondernemers', to: routes.startendeOndernemers.path },
      { label: 'Overstappen van boekhouder', to: routes.overstappen.path },
      { label: 'Voor ondernemers', to: routes.voorOndernemers.path },
    ],
  },
  { label: 'Pakketten', to: routes.pakketten.path },
  { label: 'AFAS', to: routes.afas.path },
  { label: 'Over ons', to: routes.overOns.path },
  { label: 'FAQ', to: routes.faq.path },
  { label: 'Contact', to: routes.contact.path },
];

/** Primaire call-to-action in de header */
export const headerCta = {
  label: 'Neem contact op',
  to: routes.contact.path,
};

/** Kolommen in de footer */
export const footerNav = {
  navigatie: [
    { label: 'Home', to: routes.home.path },
    { label: 'Diensten', to: routes.diensten.path },
    { label: 'Pakketten', to: routes.pakketten.path },
    { label: 'AFAS', to: routes.afas.path },
    { label: 'Over ons', to: routes.overOns.path },
    { label: 'FAQ', to: routes.faq.path },
    { label: 'Contact', to: routes.contact.path },
  ],
  diensten: [
    { label: 'Financiële administratie', to: routes.administratie.path },
    { label: 'Btw- en ICP-aangifte', to: routes.belastingaangifte.path },
    { label: 'IB- en vpb-aangifte', to: routes.belastingaangifte.path },
    { label: 'Jaarwerk en jaarrekening', to: routes.pakketten.path },
    { label: 'AFAS-ondersteuning', to: routes.afas.path },
    { label: 'Startende ondernemers', to: routes.startendeOndernemers.path },
    { label: 'Overstappen van boekhouder', to: routes.overstappen.path },
    { label: 'Offerte aanvragen', to: routes.offerte.path },
    { label: 'Kennismaking', to: routes.kennismaking.path },
  ],
  juridisch: [
    { label: 'Privacy', to: routes.privacy.path },
    { label: 'Cookiebeleid', to: routes.cookies.path },
  ],
} satisfies Record<string, NavItem[]>;
