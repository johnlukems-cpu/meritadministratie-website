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
        title="Diensten — administratie, btw en jaarrekening"
        description="De drie diensten van MERIT voor zzp’ers en mkb-ondernemers: financiële administratie, btw-aangiften en jaarrekeningen met jaarafsluiting."
        canonicalPath={routes.diensten.path}
        jsonLd={[
          breadcrumbJsonLd([{ name: 'Diensten', path: routes.diensten.path }]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Diensten van MERIT Administratie & Advies',
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
        title="Alles voor uw administratie, onder één dak"
        intro="Drie diensten die u afzonderlijk of samen kunt afnemen. U bepaalt wat u uit handen geeft en wat u zelf blijft doen; wij leggen de afbakening vooraf schriftelijk vast."
        breadcrumbs={[{ name: 'Diensten', path: routes.diensten.path }]}
      />

      <ServicesGrid
        tone="default"
        heading={{
          eyebrow: 'Overzicht',
          title: 'Drie diensten voor uw onderneming',
          description:
            'Elke dienst heeft een eigen afbakening en een eigen tarief. Op de dienstpagina leest u precies welke werkzaamheden wij uitvoeren.',
        }}
        headerLink={null}
        showPrice
      />

      <Section tone="alt">
        <Container narrow>
          <Notice tone="scope" title="Wat MERIT wel en niet doet" className="reveal">
            MERIT verzorgt uw financiële administratie, bereidt uw btw-aangiften voor en stelt uw
            jaarrekening samen binnen de overeengekomen dienstverlening. Wat wij precies voor u doen
            en wat u zelf blijft doen, leggen wij vooraf schriftelijk vast. MERIT is geen
            accountantsorganisatie die wettelijke controles uitvoert en verricht geen
            assurance-opdrachten. Wij doen geen toezeggingen over fiscale uitkomsten of
            belastingbesparingen.
          </Notice>
        </Container>
      </Section>

      <Process tone="default" />

      <CtaBand tone="alt" />
    </>
  );
}
