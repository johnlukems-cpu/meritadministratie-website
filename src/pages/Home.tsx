import { Seo } from '@/components/Seo';
import { homeFaq } from '@/data/faq';
import { faqJsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo/json-ld';
import { Hero } from '@/sections/Hero';
import { TrustBar } from '@/sections/TrustBar';
import { Intro } from '@/sections/Intro';
import { ServicesGrid } from '@/sections/ServicesGrid';
import { PackagesSection } from '@/sections/PackagesSection';
import { AfasSection } from '@/sections/AfasSection';
import { Audiences } from '@/sections/Audiences';
import { HowItWorks } from '@/sections/HowItWorks';
import { SwitchSection } from '@/sections/SwitchSection';
import { Faq } from '@/sections/Faq';
import { CtaBand } from '@/sections/CtaBand';
import { ContactBlock } from '@/sections/ContactBlock';

/**
 * Homepage — volgorde: topbar + header (layout) → hero → USP-balk → introductie →
 * diensten → pakketten → AFAS → voor wie → werkwijze → overstappen → FAQ → CTA → contact → footer.
 */
export default function Home() {
  return (
    <>
      <Seo
        rawTitle
        title="MERIT Administratie & Advies | Administratie & Boekhouding"
        description="MERIT Administratie & Advies ondersteunt ondernemers en MKB-bedrijven met administratie, boekhouding, aangiften, jaarwerk en AFAS."
        jsonLd={[organizationJsonLd(), websiteJsonLd(), faqJsonLd(homeFaq)]}
      />
      <Hero />
      <TrustBar />
      <Intro />
      <ServicesGrid
        heading={{
          eyebrow: 'Diensten',
          title: 'Waar wij u mee helpen',
          description:
            'Van de dagelijkse boekhouding tot aangiften, jaarwerk en AFAS: wij zorgen dat uw financiële administratie overzichtelijk en op orde blijft.',
        }}
      />
      <PackagesSection compact tone="default" />
      <AfasSection />
      <Audiences />
      <HowItWorks
        title="In vier stappen ontzorgd"
        description="Een heldere aanpak: kennismaken, inventariseren, inrichten en ontzorgen. Zo weet u precies wat u van ons kunt verwachten."
      />
      <SwitchSection />
      <Faq items={homeFaq} />
      <CtaBand />
      <ContactBlock tone="default" />
    </>
  );
}
