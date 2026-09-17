import type { ReactNode } from 'react';
import { ArrowRight, Clock3, Globe, Mail, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Container';
import { ContactForm } from '@/components/forms/ContactForm';
import { SocialLinks } from '@/components/SocialLinks';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span
        aria-hidden="true"
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary"
      >
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-sm font-medium text-muted">{label}</p>
        {children}
      </div>
    </li>
  );
}

const linkClass = 'text-lg font-semibold text-primary underline-offset-4 hover:underline';

/** Contactgegevens (alleen ingevulde velden) — herbruikbaar op /contact en de homepage. */
export function ContactDetails() {
  const { contact } = siteConfig;
  const domain = siteConfig.url.replace(/^https?:\/\//, '');
  return (
    <ul className="space-y-5">
      <ContactItem icon={Mail} label="E-mail">
        <a href={`mailto:${contact.email}`} className={linkClass}>
          {contact.email}
        </a>
      </ContactItem>
      {contact.phone && (
        <ContactItem icon={Phone} label="Telefoon">
          <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className={linkClass}>
            {contact.phone}
          </a>
        </ContactItem>
      )}
      <ContactItem icon={Globe} label="Website">
        <a href={siteConfig.url} className={linkClass}>
          {domain}
        </a>
      </ContactItem>
      {contact.address && (
        <ContactItem icon={MapPin} label="Adres">
          <address className="text-lg font-semibold text-primary not-italic">
            {contact.address.street}
            <br />
            {contact.address.postalCode} {contact.address.city}
          </address>
        </ContactItem>
      )}
      {contact.openingHours && (
        <ContactItem icon={Clock3} label="Bereikbaar">
          <p className="text-lg font-semibold text-primary">{contact.openingHours}</p>
        </ContactItem>
      )}
    </ul>
  );
}

interface ContactBlockProps {
  /** Kop boven het formulier */
  title?: string;
  eyebrow?: string;
  intro?: string;
  tone?: 'default' | 'alt';
  id?: string;
}

/** Contactsectie: gegevens + snelle CTA's links, contactformulier rechts. */
export function ContactBlock({
  title = 'Neem contact op',
  eyebrow = 'Contact',
  intro = 'Heeft u een vraag over uw administratie, wilt u een offerte, kennismaken, overstappen of uw AFAS-situatie bespreken? Stuur ons een bericht; wij reageren zo snel mogelijk.',
  tone = 'default',
  id = 'contact',
}: ContactBlockProps) {
  const { contact } = siteConfig;
  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-title`}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="reveal">
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h2 id={`${id}-title`} className="text-3xl font-semibold sm:text-[2.25rem]">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>
            <div className="mt-8">
              <ContactDetails />
            </div>
            {contact.kvk && <p className="mt-6 text-sm text-muted">KvK {contact.kvk}</p>}
            <SocialLinks className="mt-6" />

            <div className="mt-10 rounded-lg border border-default bg-surface-alt p-6">
              <p className="font-semibold text-primary">Liever direct aan de slag?</p>
              <p className="mt-1 text-sm text-muted">
                Plan een vrijblijvende kennismaking of vraag meteen een offerte aan.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button to={routes.kennismaking.path} size="sm" iconRight={<ArrowRight />}>
                  Plan een kennismaking
                </Button>
                <Button to={routes.offerte.path} size="sm" variant="outline">
                  Vraag een offerte aan
                </Button>
              </div>
            </div>
          </div>

          <div className="reveal rounded-xl border border-default bg-surface p-6 shadow-md sm:p-8 lg:p-10">
            <h3 className="text-2xl font-semibold">Stuur ons een bericht</h3>
            <p className="mt-2 mb-8 text-[0.9375rem] text-muted">
              Velden met een <span className="text-error">*</span> zijn verplicht.
            </p>
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
