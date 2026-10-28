import { Navigate, Route, Routes } from 'react-router';
import { RootLayout } from '@/layouts/RootLayout';
import { redirects, routes } from '@/config/routes';

import Home from '@/pages/Home';
import Diensten from '@/pages/diensten/Index';
import FinancialBackoffice from '@/pages/diensten/FinancialBackoffice';
import BtwAangiften from '@/pages/diensten/BtwAangiften';
import Jaarrekeningen from '@/pages/diensten/Jaarrekeningen';
import AfasSupport from '@/pages/diensten/AfasSupport';
import FinanceControl from '@/pages/diensten/FinanceControl';
import Automatisering from '@/pages/diensten/Automatisering';
import VoorKantoren from '@/pages/VoorKantoren';
import VoorMkb from '@/pages/VoorMkb';
import Tarieven from '@/pages/Tarieven';
import OverOns from '@/pages/OverOns';
import Faq from '@/pages/Faq';
import Contact from '@/pages/Contact';
import Offerte from '@/pages/Offerte';
import Kennismaking from '@/pages/Kennismaking';
import Privacy from '@/pages/Privacy';
import Cookies from '@/pages/Cookies';
import NotFound from '@/pages/NotFound';

/**
 * Routetabel. Paden komen uit config/routes.ts zodat router, navigatie,
 * sitemap en prerender altijd synchroon lopen.
 */
export function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={routes.home.path} element={<Home />} />

        {/* Doelgroepen */}
        <Route path={routes.voorKantoren.path} element={<VoorKantoren />} />
        <Route path={routes.voorMkb.path} element={<VoorMkb />} />

        {/* Diensten */}
        <Route path={routes.diensten.path} element={<Diensten />} />
        <Route path={routes.financialBackoffice.path} element={<FinancialBackoffice />} />
        <Route path={routes.btwAangiften.path} element={<BtwAangiften />} />
        <Route path={routes.jaarrekeningen.path} element={<Jaarrekeningen />} />
        <Route path={routes.afasSupport.path} element={<AfasSupport />} />
        <Route path={routes.financeControl.path} element={<FinanceControl />} />
        <Route path={routes.automatisering.path} element={<Automatisering />} />

        {/* Tarieven & bedrijf */}
        <Route path={routes.tarieven.path} element={<Tarieven />} />
        <Route path={routes.overMerit.path} element={<OverOns />} />
        <Route path={routes.faq.path} element={<Faq />} />

        {/* Conversie */}
        <Route path={routes.contact.path} element={<Contact />} />
        <Route path={routes.kennismaking.path} element={<Kennismaking />} />
        <Route path={routes.offerte.path} element={<Offerte />} />

        {/* Juridisch */}
        <Route path={routes.privacy.path} element={<Privacy />} />
        <Route path={routes.cookies.path} element={<Cookies />} />

        {/* Oude paden → nieuwe paden (zie ook vercel.json en scripts/prerender.mjs) */}
        {Object.entries(redirects).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
