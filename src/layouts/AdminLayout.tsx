import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { CalendarDays, LayoutDashboard, LogOut, PlusCircle } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useAdminSession } from '@/components/admin/session-context';
import { adminRoutes } from '@/config/admin-routes';
import { cn } from '@/lib/cn';

const nav = [
  { to: adminRoutes.dashboard, label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: adminRoutes.nieuw, label: 'Nieuwe content', icon: PlusCircle, end: false },
  { to: adminRoutes.kalender, label: 'Kalender', icon: CalendarDays, end: false },
];

/** Houdt de documenttitel bij en zorgt dat zoekmachines het admin-gedeelte overslaan. */
function AdminHead() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = 'MERIT Content Studio';
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex, nofollow';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

/**
 * Schil rond alle Content Studio-pagina's: eigen navigatie, geen publieke
 * header/footer en geen cookiebanner (er wordt in dit gedeelte niet getrackt).
 */
export function AdminLayout() {
  const { signOut } = useAdminSession();

  return (
    <div className="flex min-h-dvh flex-col bg-surface-alt">
      <AdminHead />
      <a href="#admin-main" className="skip-link">
        Naar de inhoud
      </a>

      <header className="sticky top-0 z-30 border-b border-default bg-surface/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-4 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Logo height={30} asLink={false} />
            <span className="hidden text-sm font-semibold text-text sm:inline">Content Studio</span>
          </div>

          <nav aria-label="Content Studio" className="ml-auto flex items-center gap-1">
            {nav.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors',
                    isActive ? 'bg-primary-soft text-primary' : 'text-muted hover:bg-surface-muted',
                  )
                }
              >
                <Icon aria-hidden="true" className="size-4" />
                <span className="hidden md:inline">{label}</span>
              </NavLink>
            ))}
            <button
              type="button"
              onClick={signOut}
              className="ml-1 inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-muted"
            >
              <LogOut aria-hidden="true" className="size-4" />
              <span className="hidden md:inline">Uitloggen</span>
            </button>
          </nav>
        </div>
      </header>

      <main id="admin-main" tabIndex={-1} className="flex-1">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-default bg-surface">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-1 px-4 py-6 text-xs text-subtle md:flex-row md:items-center md:justify-between md:px-6">
          <span>MERIT Administratie &amp; Advies — interne omgeving, niet openbaar.</span>
          <span className="italic">Wij regelen de cijfers, u realiseert de groei.</span>
        </div>
      </footer>
    </div>
  );
}
