import type { LucideIcon, } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/CheckList';
import { Container, Section } from '@/components/ui/Container';
import { IconBadge } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { cardName, services, type ServiceSummary } from '@/data/services';

/* -----------------------------------------------------------------------------
   Intro: toelichting op de dienst + zijkaart met instaptarief en CTA
   ---------------------------------------------------------------------------- */

interface ServiceIntroProps {
  eyebrow?: string;
  title: string;
  /** Alinea's met de uitleg van de dienst */
  paragraphs: string[];
  /** Tariefweergave zoals op /tarieven */
  priceFrom: string;
  /** Label van de primaire knop in de zijkaart */
  ctaLabel: string;
  /**
   * Deze dienst krijgt geen uurtarief of vanaf-prijs. De zijkaart toont dan de
   * toelichting hieronder en stuurt aan op een prijsvoorstel in plaats van op een tarief.
   */
  quoted?: boolean;
  /** Toelichting waarop de prijs wordt gebaseerd (verplicht bij `quoted`) */
  quotedNote?: string;
  /** Dienst-id, zodat het offerteformulier de juiste dienst voorselecteert */
  serviceId?: string;
  tone?: 'default' | 'alt';
}

export function ServiceIntro({
  eyebrow = 'De dienst',
  title,
  paragraphs,
  priceFrom,
  ctaLabel,
  quoted,
  quotedNote,
  serviceId,
  tone = 'default',
}: ServiceIntroProps) {
  const offerteHref = serviceId
    ? `${routes.offerte.path}?dienst=${serviceId}`
    : routes.offerte.path;
  return (
    <Section tone={tone} aria-labelledby="dienst-intro-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <SectionHeading
              id="dienst-intro-title"
              eyebrow={eyebrow}
              title={title}
              className="reveal"
            />
            <div className="reveal measure mt-6 space-y-4">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-lg leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="reveal lg:pt-4">
            <div className="rounded-xl border border-default bg-surface-alt p-6 md:p-7">
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">Tarief</p>
              <p className="mt-3 text-2xl font-semibold text-primary">{priceFrom}</p>
              {!quoted && <p className="mt-1.5 text-sm text-muted">{siteConfig.pricing.vatNote}</p>}
              <p className="mt-5 border-t border-default pt-5 text-[0.9375rem] leading-relaxed text-muted">
                {quoted ? quotedNote : siteConfig.pricing.finalPriceNote}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                {quoted ? (
                  <>
                    <Button to={offerteHref} fullWidth iconRight={<ArrowRight />}>
                      Vraag een prijsvoorstel aan
                    </Button>
                    <Button to={routes.kennismaking.path} variant="outline" fullWidth>
                      Plan een kennismaking
                    </Button>
                  </>
                ) : (
                  <>
                    <Button to={routes.kennismaking.path} fullWidth iconRight={<ArrowRight />}>
                      {ctaLabel}
                    </Button>
                    <Button to={offerteHref} variant="outline" fullWidth>
                      Vraag een offerte aan
                    </Button>
                  </>
                )}
              </div>
              <Link
                to={routes.tarieven.path}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                Bekijk alle tarieven
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

/* -----------------------------------------------------------------------------
   Werkzaamheden: groepen met vinkjeslijsten
   ---------------------------------------------------------------------------- */

export interface ScopeGroup {
  title: string;
  intro?: string;
  items: string[];
}

interface WorkScopeProps {
  heading?: { eyebrow?: string; title: string; description?: string };
  groups: ScopeGroup[];
  tone?: 'default' | 'alt';
  id?: string;
}

/** Overzicht van concrete werkzaamheden, gegroepeerd per onderwerp. */
export function WorkScope({
  heading = {
    eyebrow: 'Werkzaamheden',
    title: 'Wat wij voor u kunnen doen',
  },
  groups,
  tone = 'alt',
  id = 'werkzaamheden',
}: WorkScopeProps) {
  const titleId = `${id}-title`;
  return (
    <Section id={id} tone={tone} aria-labelledby={titleId}>
      <Container>
        <SectionHeading
          id={titleId}
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
          align="center"
          className="reveal"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
          {groups.map((group) => (
            <div
              key={group.title}
              className="reveal flex h-full flex-col rounded-lg border border-default bg-surface p-6 md:p-7"
            >
              <h3 className="text-lg font-semibold">{group.title}</h3>
              {group.intro && (
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{group.intro}</p>
              )}
              <CheckList items={group.items} size="sm" className="mt-5" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -----------------------------------------------------------------------------
   Nadruk: korte kenmerken met icoon
   ---------------------------------------------------------------------------- */

export interface EmphasisPoint {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface EmphasisProps {
  heading?: { eyebrow?: string; title: string; description?: string };
  points: EmphasisPoint[];
  tone?: 'default' | 'alt';
  id?: string;
}

export function Emphasis({
  heading = { eyebrow: 'Waar wij op letten', title: 'Zorgvuldig en navolgbaar' },
  points,
  tone = 'default',
  id = 'aanpak',
}: EmphasisProps) {
  const titleId = `${id}-title`;
  return (
    <Section id={id} tone={tone} aria-labelledby={titleId}>
      <Container>
        <SectionHeading
          id={titleId}
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
          className="reveal"
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {points.map((point) => (
            <li key={point.title} className="reveal">
              <IconBadge size="sm" tone="accent">
                <point.icon />
              </IconBadge>
              <h3 className="mt-4 text-base font-semibold">{point.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* -----------------------------------------------------------------------------
   Verwante diensten
   ---------------------------------------------------------------------------- */

interface RelatedServicesProps {
  /** Dienst-id van de huidige pagina; die wordt uit de lijst gelaten */
  currentId: string;
  /** Maximaal aantal verwante diensten */
  limit?: number;
  tone?: 'default' | 'alt';
}

/** Interne links naar de overige diensten — helpt bezoekers én de vindbaarheid. */
export function RelatedServices({ currentId, limit = 3, tone = 'alt' }: RelatedServicesProps) {
  const related: ServiceSummary[] = services.filter((s) => s.id !== currentId).slice(0, limit);

  return (
    <Section tone={tone} aria-labelledby="verwant-title">
      <Container>
        <SectionHeading
          id="verwant-title"
          eyebrow="Ook interessant"
          title="Onze andere diensten"
          className="reveal"
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {related.map((service) => (
            <li key={service.id} className="reveal">
              <Link
                to={service.to}
                className="group flex h-full flex-col rounded-lg border border-default bg-surface p-6 transition-[box-shadow,border-color,translate] duration-300 ease-out hover:-translate-y-0.5 hover:border-strong hover:shadow-md"
              >
                <IconBadge size="sm">
                  <service.icon />
                </IconBadge>
                <h3 className="mt-4 text-base font-semibold">{cardName(service)}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Meer over deze dienst
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
