import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from '@/components/CookieConsent';

/** Scrollt naar boven bij routewissel (of naar een #anker als dat er is). */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

/** Activeert de subtiele .reveal fade-in zodra elementen in beeld komen. */
function RevealObserver() {
  const { pathname } = useLocation();
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)');
    if (!elements.length) return;
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      // Tonen zodra een element 40px in beeld komt. De grote bovenmarge zorgt dat
      // elementen die door een sprong (anker, snel scrollen) al boven het scherm
      // staan óók als "gezien" gelden en niet onzichtbaar blijven.
      { rootMargin: '10000px 0px -40px 0px', threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}

export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className="skip-link">
        Naar de inhoud
      </a>
      <ScrollManager />
      <RevealObserver />
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
