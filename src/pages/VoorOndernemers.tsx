import { ArrowRight, Check } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { IconBadge } from '@/components/ui/Card';
import { Container, Section } from '@/components/ui/Container';
import { PageHero } from '@/sections/PageHero';
import { CtaBand } from '@/sections/CtaBand';
import { routes } from '@/config/routes';
import { audiences } from '@/data/audiences';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { cn } from '@/lib/cn';

export default function VoorOndernemers() {
  return (
    <>
      <Seo
        title="Voor ondernemers: zzp, eenmanszaak, starter, mkb en bv"
        description="Administratieve ondersteuning voor zzp’ers, eenmanszaken, starters, kleine ondernemingen en bv’s. Per situatie leest u hoe MERIT Administratie & Advies u helpt."
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Voor ondernemers', path: routes.voorOndernemers.path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Voor ondernemers"
        title="Administratieve ondersteuning voor ondernemers"
        intro="Elke ondernemingsvorm brengt een eigen administratie met zich mee. Hieronder leest u per situatie welke behoeften vaak spelen en hoe wij u daarbij kunnen ondersteunen."
        breadcrumbs={[{ name: 'Voor ondernemers', path: routes.voorOndernemers.path }]}
        actions={
          <Button to={routes.kennismaking.path} iconRight={<ArrowRight />}>
            Bespreek uw onderneming
          </Button>
        }
      />

      {/* Snelle navigatie naar de doelgroepen */}
      <nav aria-label="Doelgroepen" className="border-b border-default bg-surface">
        <Container>
          <ul className="flex flex-wrap gap-2 py-4">
            {audiences.map((a) => (
              <li key={a.id}>
                <a
                  href={`#${a.id}`}
                  className="inline-flex h-9 items-center rounded-full border border-default bg-surface px-4 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  {a.title}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {audiences.map((a, i) => (
        <Section
          key={a.id}
          id={a.id}
          tone={i % 2 === 0 ? 'default' : 'alt'}
          aria-labelledby={`${a.id}-title`}
          className="scroll-mt-24"
        >
          <Container>
            <div className={cn('grid gap-10 lg:grid-cols-2 lg:gap-16', i % 2 === 1 && 'lg:[&>*:first-child]:order-2')}>
              <div className="reveal">
                <IconBadge tone="accent">
                  <a.icon />
                </IconBadge>
                <h2 id={`${a.id}-title`} className="mt-5 text-3xl font-semibold sm:text-4xl">
                  {a.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{a.situation}</p>
                <div className="mt-8">
                  <h3 className="text-base font-semibold">Hoe wij ondersteunen</h3>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed text-muted">{a.support}</p>
                </div>
              </div>
              <div className="reveal">
                <div className="rounded-xl border border-default bg-surface p-6 shadow-md sm:p-8">
                  <h3 className="text-base font-semibold">Administratieve behoeften die vaak spelen</h3>
                  <ul className="mt-5 space-y-3.5">
                    {a.needs.map((need) => (
                      <li key={need} className="flex items-start gap-3 text-[0.9375rem] text-text">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text"
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {need}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm text-muted">
                    Herkent u zich hierin, of ziet uw situatie er anders uit? Wij stemmen onze
                    ondersteuning altijd af op wat u nodig heeft.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <CtaBand
        title="Bespreek uw onderneming"
        text="Vertel ons over uw situatie. In een vrijblijvend gesprek bekijken wij welke ondersteuning bij uw onderneming past."
        primary={{ label: 'Bespreek uw onderneming', to: routes.kennismaking.path }}
      />
    </>
  );
}
