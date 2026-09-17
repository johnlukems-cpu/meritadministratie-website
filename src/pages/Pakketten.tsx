import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/sections/PageHero';
import { PackagesSection } from '@/sections/PackagesSection';
import { PriceTables } from '@/sections/PriceTables';
import { Faq } from '@/sections/Faq';
import { CtaBand } from '@/sections/CtaBand';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';
import { faqGroups } from '@/data/faq';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo/json-ld';

const tarievenFaq = faqGroups.find((g) => g.id === 'tarieven')?.items ?? [];

export default function Pakketten() {
  return (
    <>
      <Seo
        title="Pakketten en tarieven: administratie vanaf € 125 per maand"
        description="Transparante pakketten voor administratie en boekhouding: MERIT Start, Groei, Control, Partner en Finance. Vanaf-tarieven excl. btw, plus tarieven voor aangiften en AFAS."
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Pakketten', path: routes.pakketten.path },
          ]),
          faqJsonLd(tarievenFaq),
        ]}
      />
      <PageHero
        eyebrow={`Pakketten & tarieven ${siteConfig.pricing.year}`}
        title="Transparante pakketten voor uw administratie"
        intro="Onze pakketten zijn opgebouwd rond een mutatiegerichte prijsstructuur, gecombineerd met onze AFAS-specialisatie. Alle bedragen zijn vanaf-tarieven en exclusief 21% btw; het definitieve tarief stemmen wij af op de omvang en complexiteit van uw administratie."
        breadcrumbs={[{ name: 'Pakketten', path: routes.pakketten.path }]}
        actions={
          <>
            <Button to={routes.offerte.path} iconRight={<ArrowRight />}>
              Vraag een offerte aan
            </Button>
            <Button to={routes.kennismaking.path} variant="outline">
              Plan een kennismaking
            </Button>
          </>
        }
      />
      <PackagesSection
        heading={{
          eyebrow: 'Pakketten',
          title: 'Vijf pakketten, van starter tot externe financiële afdeling',
          description:
            'Kies het pakket dat bij uw onderneming past. Groeit uw administratie, dan schaalt het pakket mee.',
        }}
      />
      <PriceTables />
      <Faq
        items={tarievenFaq}
        title="Vragen over tarieven"
        description="Wat ondernemers ons vragen over pakketten, mutaties en btw."
      />
      <CtaBand
        title="Welk pakket past bij uw onderneming?"
        text="Vertel ons kort over uw administratie. U ontvangt een helder voorstel op basis van uw mutaties en wensen — vrijblijvend."
        primary={{ label: 'Vraag een offerte aan', to: routes.offerte.path }}
        secondary={{ label: 'Plan een kennismaking', to: routes.kennismaking.path }}
      />
    </>
  );
}
