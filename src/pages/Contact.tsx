import { Seo } from '@/components/Seo';
import { PageHero } from '@/sections/PageHero';
import { ContactBlock } from '@/sections/ContactBlock';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description={`Neem contact op met ${siteConfig.name} via ${siteConfig.contact.email} of het contactformulier: voor een kennismaking, een offerte of om werkzaamheden uit te besteden.`}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: routes.contact.path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Contact"
        title="Neem contact met ons op"
        intro="Wilt u werkzaamheden uitbesteden, een urenbundel afnemen of eerst vrijblijvend kennismaken? Laat ons weten waar het om gaat; wij reageren zo snel mogelijk."
        breadcrumbs={[{ name: 'Contact', path: routes.contact.path }]}
      />
      <ContactBlock
        id="contactformulier"
        eyebrow="Contactgegevens"
        title="Zo bereikt u ons"
        intro="Mailen, bellen of het formulier invullen: kies wat u het prettigst vindt."
      />
    </>
  );
}
