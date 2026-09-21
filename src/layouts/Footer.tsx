import { Link } from 'react-router';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { SocialLinks } from '@/components/SocialLinks';
import { openConsentPreferences } from '@/lib/consent/consent';
import { useConsentRequired } from '@/lib/consent/useConsent';
import { siteConfig } from '@/config/site';
import { footerNav, type NavItem } from '@/data/navigation';

function FooterColumn({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-wide text-on-dark uppercase">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={`${item.to}-${item.label}`}>
            <Link
              to={item.to}
              className="text-[0.9375rem] text-on-dark-muted transition-colors hover:text-on-dark focus-visible:outline-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();
  // Cookie-instellingen alleen tonen als er daadwerkelijk iets te kiezen valt (client-only)
  const showCookieSettings = useConsentRequired();

  return (
    <footer className="bg-surface-dark text-on-dark">
      <div className="container-site py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Merk + omschrijving */}
          <div className="max-w-sm">
            <Logo onDark height={44} asLink={false} />
            <p className="mt-5 text-base font-semibold text-on-dark">{siteConfig.name}</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-on-dark-muted">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-sm font-medium italic text-accent-light">{siteConfig.tagline}</p>
            {contact.btw && (
              <p className="mt-4 text-sm text-on-dark-muted">
                Btw-nummer: <span className="font-medium text-on-dark tabular-nums">{contact.btw}</span>
              </p>
            )}
            <SocialLinks onDark className="mt-6" />
          </div>

          <FooterColumn title="Navigatie" items={footerNav.navigatie} />
          <FooterColumn title="Diensten" items={footerNav.diensten} />

          {/* Contact — alleen ingevulde gegevens worden getoond */}
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-on-dark uppercase">Contact</h2>
            <ul className="mt-4 space-y-3 text-[0.9375rem] text-on-dark-muted">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-start gap-2.5 transition-colors hover:text-on-dark focus-visible:outline-white"
                >
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.url}
                  className="inline-flex items-start gap-2.5 transition-colors hover:text-on-dark focus-visible:outline-white"
                >
                  <Globe aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{siteConfig.url.replace(/^https?:\/\//, '')}</span>
                </a>
              </li>
              {contact.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-start gap-2.5 transition-colors hover:text-on-dark focus-visible:outline-white"
                  >
                    <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{contact.phone}</span>
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="inline-flex items-start gap-2.5">
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                  <address className="not-italic">
                    {contact.address.street}
                    <br />
                    {contact.address.postalCode} {contact.address.city}
                  </address>
                </li>
              )}
              {contact.openingHours && <li className="pl-6.5">{contact.openingHours}</li>}
            </ul>
            {contact.kvk && <p className="mt-4 text-sm text-on-dark-muted">KvK {contact.kvk}</p>}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-on-dark-border pt-6 text-sm text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Alle rechten voorbehouden.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerNav.juridisch.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="transition-colors hover:text-on-dark focus-visible:outline-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {showCookieSettings && (
              <li>
                <button
                  type="button"
                  onClick={openConsentPreferences}
                  className="transition-colors hover:text-on-dark focus-visible:outline-white"
                >
                  Cookie-instellingen
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
