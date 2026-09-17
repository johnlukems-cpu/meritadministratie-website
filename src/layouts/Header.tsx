import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { headerCta, mainNav, type NavItem } from '@/data/navigation';
import { cn } from '@/lib/cn';

/* -----------------------------------------------------------------------------
   Desktop-navigatie
   ---------------------------------------------------------------------------- */

function DesktopNavItem({ item }: { item: NavItem }) {
  // 'hover' = tijdelijk open via muis; 'click' = vastgezet via klik/toetsenbord
  const [openedBy, setOpenedBy] = useState<'hover' | 'click' | null>(null);
  const open = openedBy !== null;
  const setOpen = (next: boolean) => setOpenedBy(next ? 'click' : null);
  const ref = useRef<HTMLLIElement>(null);
  const location = useLocation();

  // Dropdown sluiten bij navigatie (state afleiden tijdens render, geen effect)
  const [lastPath, setLastPath] = useState(location.pathname);
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    setOpenedBy(null);
  }

  // Sluiten bij klik buiten of Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'inline-flex h-10 items-center gap-1 rounded-md px-2.5 text-[0.9375rem] font-medium transition-colors xl:px-3',
      isActive ? 'text-primary' : 'text-muted hover:text-primary',
    );

  if (!item.children) {
    return (
      <li>
        <NavLink to={item.to} end={item.to === '/'} className={linkClass}>
          {item.label}
        </NavLink>
      </li>
    );
  }

  const isChildActive = item.children.some((c) => location.pathname.startsWith(c.to));

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpenedBy((v) => v ?? 'hover')}
      onMouseLeave={() => setOpenedBy((v) => (v === 'hover' ? null : v))}
    >
      <div className="flex items-center">
        <NavLink to={item.to} end className={linkClass}>
          {item.label}
        </NavLink>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={`Submenu ${item.label} ${open ? 'sluiten' : 'openen'}`}
          onClick={() => setOpenedBy((v) => (v === 'click' ? null : 'click'))}
          className={cn(
            '-ml-2 inline-flex size-8 items-center justify-center rounded-md transition-colors',
            isChildActive || open ? 'text-primary' : 'text-muted hover:text-primary',
          )}
        >
          <ChevronDown
            aria-hidden="true"
            className={cn('size-4 transition-transform duration-200', open && 'rotate-180')}
          />
        </button>
      </div>

      {open && (
        <ul className="absolute left-0 top-full z-30 mt-1 w-72 rounded-lg border border-default bg-surface p-2 shadow-lg">
          {item.children.map((child) => (
            <li key={child.to}>
              <NavLink
                to={child.to}
                className={({ isActive }) =>
                  cn(
                    'block rounded-md px-3 py-2.5 text-[0.9375rem] transition-colors',
                    isActive
                      ? 'bg-primary-soft font-medium text-primary'
                      : 'text-text hover:bg-surface-alt hover:text-primary',
                  )
                }
              >
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/* -----------------------------------------------------------------------------
   Mobiel menu (overlay)
   ---------------------------------------------------------------------------- */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Scroll-lock + ESC + focus-trap
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const els = focusables();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  // Portal naar <body>: de header heeft backdrop-blur en vormt daardoor een
  // containing block voor position:fixed — zonder portal zou het menu in de header blijven.
  return createPortal(
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <button
        type="button"
        aria-label="Menu sluiten"
        onClick={onClose}
        className="menu-backdrop absolute inset-0 bg-primary/40 backdrop-blur-[2px]"
      />
      <div
        ref={panelRef}
        className="menu-panel absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-surface shadow-lg"
      >
        <div className="flex h-[var(--header-height)] items-center justify-between border-b border-default px-4">
          <Logo height={34} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Menu sluiten"
            className="inline-flex size-11 items-center justify-center rounded-md text-primary hover:bg-surface-alt"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
        </div>

        <nav aria-label="Mobiele navigatie" className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="flex flex-col gap-0.5">
            {mainNav.map((item) => {
              const isExpanded = expanded === item.label;
              return (
                <li key={item.label}>
                  <div className="flex items-center">
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          'flex flex-1 items-center rounded-md px-3 py-3 text-base font-medium',
                          isActive ? 'bg-primary-soft text-primary' : 'text-text hover:bg-surface-alt',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                    {item.children && (
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-label={`Submenu ${item.label} ${isExpanded ? 'sluiten' : 'openen'}`}
                        onClick={() => setExpanded(isExpanded ? null : item.label)}
                        className="inline-flex size-11 shrink-0 items-center justify-center rounded-md text-muted hover:bg-surface-alt hover:text-primary"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={cn('size-5 transition-transform', isExpanded && 'rotate-180')}
                        />
                      </button>
                    )}
                  </div>
                  {item.children && isExpanded && (
                    <ul className="mb-2 ml-3 border-l border-default pl-2">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <NavLink
                            to={child.to}
                            onClick={onClose}
                            className={({ isActive }) =>
                              cn(
                                'block rounded-md px-3 py-2.5 text-[0.9375rem]',
                                isActive
                                  ? 'font-medium text-primary'
                                  : 'text-muted hover:bg-surface-alt hover:text-primary',
                              )
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-default p-4">
          <Button to={headerCta.to} onClick={onClose} fullWidth>
            {headerCta.label}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* -----------------------------------------------------------------------------
   Header
   ---------------------------------------------------------------------------- */

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Mobiel menu sluiten bij navigatie (state afleiden tijdens render)
  const [lastPath, setLastPath] = useState(location.pathname);
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-surface/95 backdrop-blur transition-[box-shadow,border-color] duration-200',
        scrolled ? 'border-default shadow-sm' : 'border-transparent',
      )}
    >
      <div className="container-site flex h-[var(--header-height)] items-center justify-between gap-6">
        <Logo height={40} priority />

        <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Button to={headerCta.to} size="sm">
              {headerCta.label}
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Menu openen"
            aria-expanded={menuOpen}
            className="inline-flex size-11 items-center justify-center rounded-md text-primary hover:bg-surface-alt lg:hidden"
          >
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
