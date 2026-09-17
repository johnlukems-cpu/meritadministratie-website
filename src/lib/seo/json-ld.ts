import { siteConfig } from '@/config/site';

/**
 * Structured data (schema.org) helpers.
 * Alleen gegevens die in siteConfig zijn ingevuld worden meegenomen —
 * placeholders (null) worden overgeslagen.
 */

export function organizationJsonLd(): Record<string, unknown> {
  const { contact, social } = siteConfig;
  const sameAs = Object.values(social).filter((v): v is string => Boolean(v));

  return {
    '@context': 'https://schema.org',
    // ProfessionalService is een LocalBusiness (en dus Organization); adres/telefoon uit het KvK-uittreksel
    '@type': ['ProfessionalService', 'AccountingService'],
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo-merit-staand.png`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    email: contact.email,
    foundingDate: String(siteConfig.founded.year),
    founder: { '@type': 'Person', name: siteConfig.founded.founderName },
    knowsAbout: ['Administratie', 'Boekhouding', 'Btw-aangifte', 'Jaarrekening', 'AFAS'],
    ...(contact.kvk ? { identifier: { '@type': 'PropertyValue', name: 'KvK-nummer', value: contact.kvk } } : {}),
    ...(contact.phone ? { telephone: `+31${contact.phone.replace(/\s+/g, '').replace(/^0/, '')}` } : {}),
    ...(contact.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: contact.address.street,
            postalCode: contact.address.postalCode,
            addressLocality: contact.address.city,
            addressCountry: contact.address.country,
          },
          areaServed: 'NL',
        }
      : { areaServed: 'NL' }),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: siteConfig.language,
    publisher: { '@id': `${siteConfig.url}/#organization` },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: `${siteConfig.url}${input.path}`,
    serviceType: input.name,
    areaServed: 'NL',
    provider: { '@id': `${siteConfig.url}/#organization` },
  };
}

export function faqJsonLd(
  items: Array<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
