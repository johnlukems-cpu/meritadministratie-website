import { Seo } from '@/components/Seo';
import { Container, Section } from '@/components/ui/Container';
import { Notice } from '@/components/ui/Notice';
import { CtaBand } from '@/sections/CtaBand';
import { PageHero } from '@/sections/PageHero';
import { Process } from '@/sections/Process';
import { ServicesGrid } from '@/sections/ServicesGrid';
import { routes } from '@/config/routes';
import { services } from '@/data/services';
import { siteConfig } from '@/config/site';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';

export default function Diensten() {
  return (
    <>
      <Seo
        title="Diensten — financiële backoffice voor kantoren"
        description="De zes diensten van MERIT voor administratie- en accountantskantoren: Financial Backoffice, Btw-aangiften, Jaarrekeningen & Jaarafsluiting, AFAS & Software Support, Finance Control en Automatisering."
        canonicalPath={routes.diensten.path}
        jsonLd={[
          breadcrumbJsonLd([{ name: 'Diensten', path: routes.diensten.path }]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Diensten van MERIT Administratie & Support',
            itemListElement: services.map((service, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: service.title,
              url: `${siteConfig.url}${service.to}`,
            })),
          },
        ]}
      />

      <PageHero
        eyebrow="Diensten"
        title="Financiële backofficediensten voor administratie- en accountants­kantoren"
        intro="Zes diensten die u afzonderlijk of gecombineerd kunt afnemen. U bepaalt welke werkzaamheden u uitbesteedt en welke binnen uw kantoor blijven; wij leggen de afbakening vooraf schriftelijk vast."
        breadcrumbs={[{ name: 'Diensten', path: routes.diensten.path }]}
      />

      <ServicesGrid
        tone="default"
        heading={{
          eyebrow: 'Overzicht',
          title: 'Zes diensten voor uw kantoor',
          description:
            'Elke dienst heeft een eigen tarief en een eigen afbakening. Op de dienstpagina leest u precies welke werkzaamheden wij uitvoeren en waar de verantwoordelijkheid ligt.',
        }}
        headerLink={null}
        showPrice
      />

      <Section tone="alt">
        <Container narrow>
          <Notice tone="scope" title="Wat MERIT wel en niet doet" className="reveal">
            MERIT verzorgt administratieve voorbereiding, verwerking en controle. De fiscale
            beoordeling, de goedkeuring en het indienen van aangiften en jaarstukken vinden plaats
            volgens de afspraken die wij met uw kantoor maken en liggen bij de daartoe bevoegde
            verantwoordelijke partij. MERIT is geen accountantsorganisatie die wettelijke controles
            uitvoert en verricht geen assurance-opdrachten.
          </Notice>
        </Container>
      </Section>

      <Process tone="default" />

      <CtaBand tone="alt" />
    </>
  );
}
