import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { Card, IconBadge } from '@/components/ui/Card';
import { Container, Section } from '@/components/ui/Container';
import { PageHero } from '@/sections/PageHero';
import { CtaBand } from '@/sections/CtaBand';
import { PricingNote } from '@/sections/PackagesSection';
import { routes } from '@/config/routes';
import { allServices, serviceCategories, type ServiceCategory } from '@/data/services';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';

const categoryOrder: ServiceCategory[] = ['administratie', 'aangiften', 'jaarwerk', 'afas', 'ondersteuning'];

export default function Diensten() {
  return (
    <>
      <Seo
        title="Diensten: administratie, boekhouding, aangiften, jaarwerk en AFAS"
        description="Alle diensten van MERIT: financiële administratie, boekhouding, btw-, ICP-, IB- en vpb-aangifte, jaarwerk, jaarrekening, rapportage en AFAS-ondersteuning."
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Diensten', path: routes.diensten.path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Diensten"
        title="Onze diensten"
        intro="Van de dagelijkse administratie tot belastingaangiften, jaarwerk en AFAS: MERIT Administratie & Advies helpt u met een overzichtelijke en betrouwbare financiële administratie."
        breadcrumbs={[{ name: 'Diensten', path: routes.diensten.path }]}
        actions={
          <>
            <Button to={routes.kennismaking.path} iconRight={<ArrowRight />}>
              Plan een kennismaking
            </Button>
            <Button to={routes.pakketten.path} variant="outline">
              Bekijk pakketten en tarieven
            </Button>
          </>
        }
      />

      {/* Snelle navigatie naar de categorieën */}
      <nav aria-label="Dienstcategorieën" className="border-b border-default bg-surface">
        <Container>
          <ul className="flex flex-wrap gap-2 py-4">
            {categoryOrder.map((cat) => (
              <li key={cat}>
                <a
                  href={`#${cat}`}
                  className="inline-flex h-9 items-center rounded-full border border-default bg-surface px-4 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  {serviceCategories[cat]}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {categoryOrder.map((cat, i) => {
        const items = allServices.filter((s) => s.category === cat);
        return (
          <Section key={cat} id={cat} tone={i % 2 === 0 ? 'default' : 'alt'} aria-labelledby={`${cat}-title`} className="scroll-mt-24">
            <Container>
              <h2 id={`${cat}-title`} className="reveal text-2xl font-semibold sm:text-3xl">
                {serviceCategories[cat]}
              </h2>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service) => (
                  <Card key={service.id} as="li" interactive className="reveal group relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <IconBadge>
                        <service.icon />
                      </IconBadge>
                      {service.priceFrom && (
                        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-text whitespace-nowrap">
                          {service.priceFrom}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                    <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{service.description}</p>
                    <Link
                      to={service.to}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary after:absolute after:inset-0 after:content-['']"
                      aria-label={`Bekijk deze dienst: ${service.title}`}
                    >
                      Bekijk deze dienst
                      <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </Card>
                ))}
              </ul>
            </Container>
          </Section>
        );
      })}

      <Section tone="alt" aria-label="Tarieven">
        <Container>
          <PricingNote className="reveal" />
        </Container>
      </Section>

      <CtaBand
        title="Niet zeker wat u nodig heeft?"
        text="Vertel ons kort over uw onderneming. Tijdens een kennismaking bekijken we samen welke administratieve ondersteuning bij uw situatie past."
        secondary={null}
      />
    </>
  );
}
