import { routes } from '@/config/routes';

export interface NavItem {
  label: string;
  to: string;
  /** Korte toelichting in het dropdownmenu */
  hint?: string;
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
      {
        label: 'Financiële administratie',
        to: routes.financieleAdministratie.path,
        hint: 'Facturen, bankmutaties en overzicht',
      },
      {
        label: 'Btw-aangiften',
        to: routes.btwAangiften.path,
        hint: 'Voorbereiden, controleren en indienen',
      },
      {
        label: 'Jaarrekeningen',
        to: routes.jaarrekeningen.path,
        hint: 'Jaarafsluiting en jaarrekening',
      },
    ],
  },
  { label: 'Voor zzp’ers', to: routes.voorZzp.path },
  { label: 'Voor mkb', to: routes.voorMkb.path },
  { label: 'Tarieven', to: routes.tarieven.path },
  { label: 'Over ons', to: routes.overMerit.path },
  { label: 'Contact', to: routes.contact.path },
];

/** Primaire call-to-action in de header */
export const headerCta = {
  label: 'Plan een kennismaking',
  to: routes.kennismaking.path,
};

/** Kolommen in de footer */
export const footerNav = {
  diensten: [
    { label: 'Financiële administratie', to: routes.financieleAdministratie.path },
    { label: 'Btw-aangiften', to: routes.btwAangiften.path },
    { label: 'Jaarrekeningen', to: routes.jaarrekeningen.path },
    { label: 'Alle diensten', to: routes.diensten.path },
  ],
  navigatie: [
    { label: 'Voor zzp’ers', to: routes.voorZzp.path },
    { label: 'Voor mkb-ondernemers', to: routes.voorMkb.path },
    { label: 'Tarieven', to: routes.tarieven.path },
    { label: 'Over ons', to: routes.overMerit.path },
    { label: 'Veelgestelde vragen', to: routes.faq.path },
    { label: 'Contact', to: routes.contact.path },
  ],
  conversie: [
    { label: 'Plan een kennismaking', to: routes.kennismaking.path },
    { label: 'Vraag een offerte aan', to: routes.offerte.path },
  ],
  juridisch: [
    { label: 'Privacyverklaring', to: routes.privacy.path },
    { label: 'Cookiebeleid', to: routes.cookies.path },
  ],
} satisfies Record<string, NavItem[]>;
