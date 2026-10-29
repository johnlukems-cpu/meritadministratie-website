import { Seo } from '@/components/Seo';
import { AudienceSection } from '@/sections/AudienceSection';
import { CtaBand } from '@/sections/CtaBand';
import { FaqSection } from '@/sections/Faq';
import { Hero } from '@/sections/Hero';
import { PricingPreview } from '@/sections/PricingPreview';
import { Process } from '@/sections/Process';
import { ServicesGrid } from '@/sections/ServicesGrid';
import { WhyMerit } from '@/sections/WhyMerit';
import { siteConfig } from '@/config/site';
import { homeFaq } from '@/data/faq';
import { faqJsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo/json-ld';

export default function Home() {
  return (
    <>
      <Seo
        title={`${siteConfig.name} — administratie, btw en jaarrekening`}
        rawTitle
        description="MERIT Administratie & Advies verzorgt de financiële administratie, btw-aangiften en jaarrekeningen van zzp’ers en mkb-ondernemers. Een vast aanspreekpunt en een vast bedrag per maand, vanaf € 125."
        canonicalPath="/"
        jsonLd={[organizationJsonLd(), websiteJsonLd(), faqJsonLd(homeFaq)]}
      />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Voor wie wij werken: zzp en mkb */}
      <AudienceSection />

      {/* 3. Onze drie hoofddiensten */}
      <ServicesGrid tone="default" />

      {/* 4. Waarom kiezen voor MERIT? */}
      <WhyMerit tone="alt" />

      {/* 5. Onze werkwijze */}
      <Process tone="default" />

      {/* 6. Tarieven */}
      <PricingPreview />

      {/* 7. Veelgestelde vragen */}
      <FaqSection tone="default" />

      {/* 8. Afsluitende CTA */}
      <CtaBand />
    </>
  );
}
