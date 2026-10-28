# MERIT Administratie & Advies — website

Bedrijfswebsite van **MERIT Administratie & Advies** · https://meritadministratie.nl · info@meritadministratie.nl

Statische, geprerenderde website die MERIT positioneert als **externe financiële backoffice- en
AFAS-partner voor Nederlandse administratie- en accountantskantoren**. Mkb-ondernemingen vormen de
secundaire doelgroep. Gehost op Vercel.

**Positionering**

> Uw betrouwbare partner voor financiële backoffice en AFAS-ondersteuning.
> Meer capaciteit. Minder administratieve druk. Meer ruimte voor uw klanten.

## Paginastructuur

| Pagina                                   | Pad                                             |
| ---------------------------------------- | ----------------------------------------------- |
| Home                                     | `/`                                             |
| Voor administratie- en accountantskantoren | `/voor-accountantskantoren`                   |
| Voor mkb-ondernemingen                   | `/voor-mkb`                                     |
| Diensten (overzicht)                     | `/diensten`                                     |
| Financial Backoffice                     | `/diensten/financial-backoffice`                |
| Btw-aangiften                            | `/diensten/btw-aangiften`                       |
| Jaarrekeningen & Jaarafsluiting          | `/diensten/jaarrekeningen-jaarafsluiting`       |
| AFAS & Software Support                  | `/diensten/afas-software-support`               |
| Finance Control                          | `/diensten/finance-control`                     |
| Finance Automation                       | `/diensten/finance-automation`                  |
| Tarieven                                 | `/tarieven`                                     |
| Over MERIT                               | `/over-ons`                                     |
| Veelgestelde vragen                      | `/faq`                                          |
| Contact                                  | `/contact`                                      |
| Plan een kennismaking                    | `/kennismaking`                                 |
| Offerte aanvragen                        | `/offerte`                                      |
| Privacyverklaring                        | `/privacy-policy`                               |
| Cookiebeleid                             | `/cookiebeleid`                                 |

**Permanente redirects (301)** van oude paden staan op drie plekken in sync:
`src/config/routes.ts` (router + prerender) en `vercel.json` (echte HTTP 301).

`/pakketten` → `/tarieven` · `/afas` → `/diensten/afas-software-support` ·
`/voor-ondernemers` → `/voor-mkb` · `/diensten/administratie` → `/diensten/financial-backoffice` ·
`/diensten/belastingaangifte` → `/diensten/btw-aangiften` ·
`/diensten/startende-ondernemers` → `/voor-mkb` ·
`/diensten/overstappen` → `/diensten/financial-backoffice` ·
`/privacy` → `/privacy-policy` · `/cookies` → `/cookiebeleid`

## Bronnen voor bedrijfsgegevens

Alleen bevestigde gegevens worden getoond. Niets op deze site is verzonnen: geen klantnamen,
testimonials, keurmerken, certificeringen of aantallen.

- **KvK-uittreksel** — KvK 42106520, adres Frankenstraat 27, 6231 AK Meerssen, telefoon.
- **Mijn Belastingdienst Zakelijk** — btw-identificatienummer NL005497990B94.
- **Prijzenoverzicht 2026** — de mkb-pakketten en de losse tarieven voor aangiften en jaarwerk.

Velden die nog niet bekend zijn staan in `src/config/site.ts` op `null` en worden dan **niet**
getoond.

> **Let op — tarieven voor kantoren.** De uurtarieven en urenbundels in `src/data/pricing.ts`
> zijn een **voorstel** en moeten intern worden bevestigd. Zolang
> `siteConfig.pricing.kantorenTariffsProvisional` op `true` staat, toont `/tarieven` daar een
> zichtbare toelichting bij. Zet die vlag op `false` zodra de tarieven definitief zijn.

## Technologie

| Onderdeel  | Keuze                                                                   |
| ---------- | ----------------------------------------------------------------------- |
| UI         | React 19 + TypeScript (strict)                                          |
| Build      | Vite 8 (Rolldown)                                                       |
| Styling    | Tailwind CSS 4 met eigen design tokens (`src/styles/tokens.css`)        |
| Iconen     | lucide-react                                                            |
| Routing    | react-router 7 — elke route wordt bij de build geprerenderd naar HTML    |
| Validatie  | zod (lazy geladen bij verzenden, gedeeld door client en server)         |
| Font       | Inter (self-hosted via @fontsource-variable, geen externe requests)     |
| E-mail     | Resend, via de serverless functie `api/contact.ts`                      |
| Kwaliteit  | TypeScript strict, ESLint + jsx-a11y                                    |
| Hosting    | Vercel (`vercel.json`: build, headers, redirects)                       |

Geen database en geen CMS: alle content staat als data of als TSX in de repository.

## Installatie en gebruik

Vereist Node.js **22.18 of hoger** (de build-scripts lezen `src/config/routes.ts` direct).

```bash
npm install        # dependencies installeren
npm run dev        # ontwikkelserver → http://localhost:5173
npm run check      # typecheck + lint
npm run build      # productie-build → dist/ (client, SSR, prerender, sitemap)
npm run preview    # gebouwde site lokaal bekijken → http://localhost:4173
```

`npm run dev` draait Vite zonder de `api/`-functies. Gebruik voor het testen van formulieren
lokaal `VITE_FORM_PROVIDER=mailto`, of draai `vercel dev`.

## Waar pas ik wat aan?

| Wat                                                       | Waar                                              |
| --------------------------------------------------------- | ------------------------------------------------- |
| Kleuren, radius, schaduwen, font                          | `src/styles/tokens.css`                           |
| Canonical domein (sitemap, canonicals, redirects)         | `src/config/url.ts`                               |
| Bedrijfsgegevens (e-mail, telefoon, KvK, btw, adres)      | `src/config/site.ts`                              |
| Positionering, announcement bar, integraties              | `src/config/site.ts`                              |
| Pagina's / URL's / redirects                              | `src/config/routes.ts` + `src/App.tsx` + `vercel.json` |
| Navigatie (header/footer)                                 | `src/data/navigation.ts`                          |
| De zes diensten (kaarten, instaptarieven)                 | `src/data/services.ts`                            |
| **Uurtarieven, urenbundels, projecten, prijs-FAQ**        | `src/data/pricing.ts`                             |
| **Mkb-pakketten en losse tarieven (Prijzenoverzicht)**    | `src/data/packages.ts`                            |
| Uitdagingen, werkwijze, voordelen, FAQ                    | `src/data/challenges.ts`, `process.ts`, `faq.ts`  |
| Formulieropties (organisatietype, diensten, uren, start)  | `src/data/forms.ts`                               |
| Validatieregels                                           | `src/lib/forms/schemas.ts`                        |
| Teksten per pagina                                        | `src/pages/**`                                    |
| Privacyverklaring / cookiebeleid                          | `src/pages/Privacy.tsx`, `src/pages/Cookies.tsx`  |
| Logo-varianten                                            | `public/brand/` (bron: `src/assets/brand/`)       |
| Favicon, icons, OG-image, manifest, robots                | `public/`                                         |

Tarieven staan op precies twee plekken: `src/data/pricing.ts` (kantoren) en
`src/data/packages.ts` (mkb). De instaptarieven op de dienstkaarten (`src/data/services.ts`) en de
preview op de homepage (`src/sections/PricingPreview.tsx`) moeten daarmee gelijk blijven.

## Projectstructuur

```
src/
  components/   UI-primitives (Button, Card, Field, Accordion, Badge, CheckList, Notice, PackageCard),
                Logo, Seo, CookieConsent, BookingWidget, forms/
  layouts/      AnnouncementBar, Header, Footer, RootLayout
  sections/     Herbruikbare secties: Hero, Challenges, ServicesGrid, WhyMerit, PricingPreview,
                Process, Faq, CtaBand, PageHero, ServiceSections, ContactBlock, PriceTables,
                ContentBlocks, LegalArticle, visuals/
  pages/        Eén bestand per route (diensten/ bevat de zes dienstpagina's)
  data/         Content als data: services, pricing, packages, challenges, process, faq,
                navigation, forms
  config/       url.ts (canonical origin) · site.ts (bedrijfsgegevens) · routes.ts · brand.ts
  lib/          seo/ (JSON-LD, head) · forms/ (provider, validatie, hook) · consent/ (cookies)
  styles/       tokens.css (design tokens) · index.css (Tailwind + basis)
api/            contact.ts (Vercel-functie) · _lib/email.ts (Resend + templates)
scripts/        prerender.mjs · generate-sitemap.mjs · dev-asset-writer.ts · assets/generate.html
public/         favicon, icons, og-image, manifest, robots.txt, CNAME, brand/
```

## Environment variables

`VITE_*`-variabelen staan in de browserbundel — **nooit geheimen** hierin zetten. De overige
variabelen zijn uitsluitend server-side en worden in Vercel ingesteld
(*Settings → Environment Variables*).

| Variabele            | Scope       | Doel                                                                        |
| -------------------- | ----------- | --------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | server      | **Verplicht.** API-key van Resend voor `api/contact.ts`                     |
| `RESEND_FROM`        | server      | Afzender, bijv. `MERIT Administratie & Advies <noreply@meritadministratie.nl>` |
| `CONTACT_TO`         | server      | Ontvanger interne melding (standaard `info@meritadministratie.nl`)          |
| `VITE_FORM_PROVIDER` | browser     | `api` (standaard), `mailto` of `webhook`                                    |
| `VITE_FORM_ENDPOINT` | browser     | URL bij `webhook`                                                           |
| `VITE_ANALYTICS_ID`  | browser     | Google Analytics 4 ID — laadt pas na cookie-toestemming                     |
| `VITE_META_PIXEL_ID` | browser     | Meta Pixel ID — laadt pas na cookie-toestemming                             |

## Formulieren en e-mail

Contact, offerte en kennismaking lopen via één provider-adapter (`src/lib/forms/provider.ts`).

- **Standaard (`api`):** bezoeker → `POST /api/contact` → Resend → interne melding naar
  `CONTACT_TO` (Reply-To = bezoeker) + bevestigingsmail naar de bezoeker.
- **Velden contactformulier:** naam, organisatie, e-mail, telefoon (optioneel), type organisatie,
  gewenste dienst, gewenst aantal uren per maand (optioneel), gewenste startdatum (optioneel),
  bericht.
- **Server-side bescherming:** dezelfde zod-validatie als de frontend, zelfde-origin-controle,
  body-limiet (32 KB), e-mailvalidatie, header-injection-sanitizing, honeypot, minimale invultijd,
  rate-limiting per IP en dubbele-inzending-detectie.
- Nieuwe velden toevoegen: `src/data/forms.ts` (opties) → `src/lib/forms/schemas.ts` (validatie) →
  het formuliercomponent → `api/_lib/email.ts` (`fieldLabels` en `optionLabels`), anders komt het
  veld niet in de melding terecht.

**Resend-domeinverificatie:** om te verzenden vanaf `@meritadministratie.nl` moet het domein in
Resend geverifieerd zijn. Gebruik bij voorkeur een **subdomein** (bijv. `send.meritadministratie.nl`),
zodat bestaande e-mailrecords (MX/SPF/DKIM/DMARC op het hoofddomein) onaangeraakt blijven. Voor een
preview-test kan `RESEND_FROM=onboarding@resend.dev` worden gebruikt.

## Beveiliging

`vercel.json` zet voor alle routes: `Content-Security-Policy`, `Strict-Transport-Security`,
`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`,
`Cross-Origin-Opener-Policy` en `X-Permitted-Cross-Domain-Policies`.

De CSP staat alleen scripts van de eigen origin toe, plus de domeinen van Google Tag Manager en
Meta — die laden uitsluitend ná cookietoestemming en alleen als de bijbehorende ID is ingevuld.
Pas de CSP aan zodra er een extern script of domein bij komt.

## Cookies en tracking

`src/lib/consent/` bevat een lichte consent-laag met de categorieën noodzakelijk, analytisch en
marketing. Niet-noodzakelijke scripts registreren zich in `integrations.ts` en laden **pas na
toestemming**. Zonder ingevulde ID's wordt er niets geregistreerd en verschijnt er geen banner.
Werk na het activeren van tracking `src/pages/Cookies.tsx` en `src/pages/Privacy.tsx` bij.

## SEO

- Unieke `<title>`, meta description, canonical, Open Graph en Twitter-tags per pagina (`Seo`).
- Precies één `<h1>` per pagina; `h2`/`h3` sluiten op elkaar aan.
- JSON-LD: `Organization`/`ProfessionalService`, `WebSite`, `BreadcrumbList`, `Service`, `ItemList`
  en `FAQPage` — uitsluitend met bevestigde gegevens, zonder reviews of ratings.
- `sitemap.xml` en `robots.txt` worden bij elke build gegenereerd uit `src/config/routes.ts`.
- Elke route wordt geprerenderd als `pad.html` én `pad/index.html`, plus `404.html`.

## Deployment (Vercel)

Repository `johnlukems-cpu/meritadministratie-website`, Vercel-project `meritadministratie-website`,
productiedomein `www.meritadministratie.nl` / `meritadministratie.nl`.

- Vercel bouwt met `npm ci` → `npm run build` → `dist/` (zie `vercel.json`).
- Elke push naar een branch levert een **preview-deployment** op; `main` gaat naar productie.
- `public/CNAME` en `src/config/url.ts` bevatten het apex-domein zonder `www`. Wijzig die alleen
  samen met de domeininstellingen in Vercel, anders ontstaan dubbele URL's.

## Checklist vóór livegang

- [ ] Uurtarieven en urenbundels intern bevestigen; daarna `kantorenTariffsProvisional` op `false`
- [ ] Contractvoorwaarden bij de urenbundels juridisch laten controleren
- [ ] Privacyverklaring en cookiebeleid laten controleren (bewaartermijn staat nog als placeholder)
- [ ] `RESEND_API_KEY`, `RESEND_FROM` en `CONTACT_TO` in Vercel controleren
- [ ] Resend-domeinverificatie afronden voor verzending vanaf het eigen domein
- [ ] Een testinzending doen vanaf de preview-URL en de aflevering controleren
- [ ] Na livegang `https://meritadministratie.nl/sitemap.xml` indienen in Google Search Console
