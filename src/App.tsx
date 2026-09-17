import { Navigate, Route, Routes } from 'react-router';
import { RootLayout } from '@/layouts/RootLayout';
import { redirects, routes } from '@/config/routes';

import Home from '@/pages/Home';
import Diensten from '@/pages/diensten/Index';
import Administratie from '@/pages/diensten/Administratie';
import Belastingaangifte from '@/pages/diensten/Belastingaangifte';
import StartendeOndernemers from '@/pages/diensten/StartendeOndernemers';
import Overstappen from '@/pages/diensten/Overstappen';
import Pakketten from '@/pages/Pakketten';
import Afas from '@/pages/Afas';
import VoorOndernemers from '@/pages/VoorOndernemers';
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
        <Route path={routes.diensten.path} element={<Diensten />} />
        <Route path={routes.administratie.path} element={<Administratie />} />
        <Route path={routes.belastingaangifte.path} element={<Belastingaangifte />} />
        <Route path={routes.startendeOndernemers.path} element={<StartendeOndernemers />} />
        <Route path={routes.overstappen.path} element={<Overstappen />} />
        <Route path={routes.pakketten.path} element={<Pakketten />} />
        <Route path={routes.afas.path} element={<Afas />} />
        <Route path={routes.voorOndernemers.path} element={<VoorOndernemers />} />
        <Route path={routes.overOns.path} element={<OverOns />} />
        <Route path={routes.faq.path} element={<Faq />} />
        <Route path={routes.contact.path} element={<Contact />} />
        <Route path={routes.offerte.path} element={<Offerte />} />
        <Route path={routes.kennismaking.path} element={<Kennismaking />} />
        <Route path={routes.privacy.path} element={<Privacy />} />
        <Route path={routes.cookies.path} element={<Cookies />} />
        {/* Oude paden → nieuwe paden */}
        {Object.entries(redirects).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
