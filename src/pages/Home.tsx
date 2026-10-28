import { Seo } from '@/components/Seo';
import { CapacitySection } from '@/sections/CapacitySection';
import { CtaBand } from '@/sections/CtaBand';
import { Hero } from '@/sections/Hero';
import { PricingPreview } from '@/sections/PricingPreview';
import { Process } from '@/sections/Process';
import { ServicesGrid } from '@/sections/ServicesGrid';
import { siteConfig } from '@/config/site';
import { homeFaq } from '@/data/faq';
import { faqJsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo/json-ld';

export default function Home() {
  return (
    <>
      <Seo
        title={`${siteConfig.name} — financiële backoffice en AFAS-ondersteuning`}
        rawTitle
        description="MERIT ondersteunt Nederlandse administratie- en accountantskantoren met financiële verwerking, btw-aangiften, jaarrekeningvoorbereiding, kwaliteitscontroles en procesverbetering. Backoffice vanaf € 35 per uur."
        canonicalPath="/"
        jsonLd={[organizationJsonLd(), websiteJsonLd(), faqJsonLd(homeFaq)]}
      />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Dienstenoverzicht */}
      <ServicesGrid tone="default" />

      {/* 3. Voor administratie- en accountantskantoren */}
      <CapacitySection />

      {/* 4. Tarievenpreview */}
      <PricingPreview />

      {/* 5. Samenwerkingsproces */}
      <Process tone="default" />

      {/* 6. Afsluitende CTA */}
      <CtaBand />
    </>
  );
}
