# MERIT Administratie & Advies — website

Bedrijfswebsite van **MERIT Administratie & Advies** · https://meritadministratie.nl · info@meritadministratie.nl

Statische, geprerenderde website voor een modern administratiekantoor en AFAS-partner: diensten,
pakketten en tarieven (Prijzenoverzicht 2026), AFAS, doelgroepen, over ons, FAQ,
contact-/offerte-/kennismakingsformulieren en juridische pagina's. Gehost op GitHub Pages.

**Routes:** `/`, `/diensten` (+ 4 subpagina's), `/pakketten`, `/afas`, `/voor-ondernemers`, `/over-ons`,
`/faq`, `/contact`, `/offerte`, `/kennismaking`, `/privacy-policy`, `/cookiebeleid`
(oude paden `/privacy` en `/cookies` verwijzen door).

**Bronnen bedrijfsgegevens:** KvK-uittreksel (KvK 42106520, adres, telefoon), Prijzenoverzicht 2026
(pakketten, aangiften, jaarwerk, AFAS-tarieven) en het officiële logo. Prijzen staan uitsluitend in
`src/data/packages.ts` en `src/data/services.ts`.

## Technologie

| Onderdeel     | Keuze                                                                 |
| ------------- | --------------------------------------------------------------------- |
| UI            | React 19 + TypeScript                                                 |
| Build         | Vite 8 (Rolldown)                                                     |
| Styling       | Tailwind CSS 4 met eigen design tokens (`src/styles/tokens.css`)      |
| Iconen        | lucide-react                                                          |
| Routing       | react-router 7 — elke route wordt bij de build geprerenderd naar HTML |
| Validatie     | zod (lazy geladen bij verzenden)                                      |
| Font          | Inter (self-hosted via @fontsource-variable, geen externe requests)   |
| Kwaliteit     | TypeScript strict, ESLint + jsx-a11y                                  |
| Hosting/CI    | GitHub Pages via GitHub Actions                                       |

Geen backend. Formulieren en tracking zijn voorbereid op externe koppelingen (zie hieronder).

## Installatie en gebruik

Vereist Node.js **22.18 of hoger** (de build-scripts lezen `src/config/routes.ts` direct).

```bash
npm install        # dependencies installeren
npm run dev        # ontwikkelserver → http://localhost:5173
npm run check      # typecheck + lint
npm run build      # productie-build → dist/ (client-build, prerender, sitemap)
npm run preview    # gebouwde site lokaal bekijken → http://localhost:4173
```

## Waar pas ik wat aan?

| Wat                                                          | Waar                                            |
| ------------------------------------------------------------ | ----------------------------------------------- |
| Kleuren, radius, schaduwen, font                             | `src/styles/tokens.css`                         |
| Bedrijfsgegevens (e-mail, telefoon, KvK, adres, socials)     | `src/config/site.ts`                            |
| Announcement bar, integraties, over-ons-tekst                | `src/config/site.ts`                            |
| Pagina's / URL's                                             | `src/config/routes.ts` + `src/App.tsx`          |
| Navigatie (header/footer)                                    | `src/data/navigation.ts`                        |
| Diensten, doelgroepen, voordelen, werkwijze, FAQ             | `src/data/*.ts`                                 |
| Pakketten, mutatietabel, losse tarieven (AFAS, aangiften)    | `src/data/packages.ts`                          |
| Logo-varianten (echt logo)                                   | `public/brand/` (bron: `src/assets/brand/`)     |
| Formulieropties (rechtsvormen, branches, …)                  | `src/data/forms.ts`                             |
| Teksten per pagina                                           | `src/pages/**`                                  |
| Privacyverklaring / cookiebeleid                             | `src/pages/Privacy.tsx`, `src/pages/Cookies.tsx`|
| Favicon, icons, OG-image, manifest, robots                   | `public/`                                       |

Gegevens die nog niet bekend zijn (telefoon, KvK, adres) staan in `site.ts` op `null` en worden
dan **niet** getoond; in de privacyverklaring verschijnt een zichtbare placeholder.

## Projectstructuur

```
src/
  components/   UI-primitives (Button, Card, Field, Accordion…), Logo, Seo, CookieConsent, BookingWidget, forms/
  layouts/      AnnouncementBar, Header, Footer, RootLayout
  sections/     Herbruikbare pagina-secties (Hero, ServicesGrid, CtaBand, ContentBlocks, LegalArticle, …)
  pages/        Eén bestand per route
  data/         Content & navigatie als data
  config/       site.ts (bedrijfsgegevens/integraties) · routes.ts (routetabel)
  lib/          seo/ (JSON-LD, head) · forms/ (provider-adapter, validatie, hook) · consent/ (cookies)
  styles/       tokens.css (design tokens) · index.css (Tailwind + basis)
scripts/        prerender.mjs · generate-sitemap.mjs · dev-asset-writer.ts · assets/generate.html
public/         favicon.ico/.svg, icon-192/512.png, apple-touch-icon.png, og-image.png, manifest, robots.txt, CNAME
.github/        GitHub Actions workflow (check + build + deploy naar Pages)
```

## Environment variables

Kopieer `.env.example` naar `.env` (wordt niet gecommit). Alle `VITE_*`-variabelen zijn publiek
in de browserbundel — **nooit geheimen** hierin zetten.

| Variabele             | Doel                                                                          |
| --------------------- | ----------------------------------------------------------------------------- |
| `VITE_FORM_PROVIDER`  | `api` (standaard), `mailto` of `webhook`                                      |
| `VITE_FORM_ENDPOINT`  | URL voor `webhook` (Formspree, Make, Zapier, n8n, Brevo, HubSpot, …)          |
| `RESEND_API_KEY`      | **Server-side.** Resend-API-key voor `api/contact.ts`                         |
| `RESEND_FROM`         | Server-side. Afzender, bijv. `MERIT Administratie & Advies <noreply@meritadministratie.nl>` |
| `CONTACT_TO`          | Server-side. Ontvanger interne melding (standaard `info@meritadministratie.nl`) |
| `VITE_ANALYTICS_ID`   | Google Analytics 4 ID — laadt pas na cookie-toestemming                       |
| `VITE_META_PIXEL_ID`  | Meta Pixel ID — laadt pas na cookie-toestemming                               |

Voor productie zet je dezelfde waarden als **Repository variables** in GitHub
(`Settings → Secrets and variables → Actions → Variables`); de workflow leest ze bij de build.

## Formulieren en e-mail

Contact, offerte en kennismaking gebruiken één provider-adapter: `src/lib/forms/provider.ts`.

- **Standaard (`api`):** bezoeker → `POST /api/contact` (Vercel-functie `api/contact.ts`) → Resend →
  interne melding naar `info@meritadministratie.nl` (Reply-To = bezoeker) + bevestigingsmail naar de
  bezoeker. De Resend-API-key staat uitsluitend server-side (`RESEND_API_KEY`, nooit `VITE_`).
- Server-side: dezelfde zod-validatie als de frontend, lengtelimieten, e-mailvalidatie,
  header-injection-sanitizing, honeypot, minimale invultijd, rate-limiting per IP en
  dubbele-inzending-detectie. Templates: `api/_lib/email.ts`.
- Fallbacks: `VITE_FORM_PROVIDER=mailto` (opent e-mailprogramma; handig lokaal met `vite`, waar
  `api/` niet draait) of `webhook` + `VITE_FORM_ENDPOINT`.
- Validatie: `src/lib/forms/schemas.ts` · hook: `src/lib/forms/useForm.ts`.

**Resend-domeinverificatie (nog niet gedaan):** om te verzenden vanaf `@meritadministratie.nl`
moet het domein in Resend worden geverifieerd. Gebruik daarvoor bij voorkeur een **subdomein**
(bijv. `send.meritadministratie.nl`), zodat de bestaande Squarespace-e-mailrecords (MX/SPF/DKIM/DMARC
op het hoofddomein) onaangeraakt blijven. Tot die tijd kun je in Preview testen met
`RESEND_FROM=onboarding@resend.dev` (levert alleen af aan het e-mailadres van het Resend-account).

## Cookies en tracking

`src/lib/consent/` bevat een lichte, uitbreidbare consent-laag:

- Categorieën: noodzakelijk, analytisch, marketing. Keuze wordt in localStorage bewaard.
- Niet-noodzakelijke scripts registreren zich in `src/lib/consent/integrations.ts` en worden
  **pas geladen na toestemming**. Zonder ingevulde ID's wordt er niets geregistreerd en verschijnt
  er geen banner.
- Voorkeuren opnieuw openen: footer-link "Cookie-instellingen" en de cookiepagina.
- Een externe CMP kan later `consent.ts` vervangen; behoud de exports.

Na het activeren van tracking: werk `src/pages/Cookies.tsx` en `src/pages/Privacy.tsx` bij.

## Toekomstige integraties (voorbereid)

| Integratie                       | Waar                                                     |
| -------------------------------- | -------------------------------------------------------- |
| Formulieren / CRM / e-mail       | `src/lib/forms/provider.ts` + env-variabelen             |
| Agenda / afspraakplanner         | `siteConfig.integrations.bookingUrl` → `BookingWidget`   |
| Google Analytics / Meta Pixel    | `src/lib/consent/integrations.ts` + env-variabelen       |
| Boekhoudsoftware-vermelding      | `siteConfig.integrations.software`                       |
| Social media links               | `siteConfig.social`                                      |
| Aanvullende over-ons-informatie  | `siteConfig.about`                                       |

## Assets opnieuw genereren

OG-image, icons en favicon.ico worden gegenereerd uit het vector-logo met de echte Inter-font:
start `npm run dev`, open `http://localhost:5173/scripts/assets/generate.html` en klik op de knop.
De bestanden worden naar `public/` geschreven (alleen in dev; de plugin zit niet in de productie-build).

## Deployment (GitHub Pages)

Repository: `meritadministratie-website`, branch `main`. Elke wijziging op `main` (ook via de
GitHub-webinterface) start `.github/workflows/deploy.yml`: `npm ci` → `npm run check` →
`npm run build` → artifact uploaden → deploy naar GitHub Pages.

**Eenmalig instellen**

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Zonder custom domain draait de site op `https://<gebruikersnaam>.github.io/meritadministratie-website/`.
   De workflow bouwt dan automatisch met dat subpad (via `actions/configure-pages` → `VITE_BASE_PATH`).
3. Custom domain: vul in **Settings → Pages → Custom domain** `meritadministratie.nl` in
   (`public/CNAME` bevat dezelfde waarde). Zet bij de domeinregistrar — **zonder bestaande
   MX-records aan te raken** (e-mail blijft dan werken):
   - `A`-records voor `@` naar `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA`-records (optioneel) naar `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME`-record voor `www` naar `<gebruikersnaam>.github.io`
4. Na het instellen van het custom domain: **Actions → "Build & deploy naar GitHub Pages" → Run workflow**
   (of een willekeurige wijziging op `main`), zodat de site opnieuw wordt gebouwd met base `/`.
5. Vink **Enforce HTTPS** aan zodra GitHub het certificaat heeft uitgegeven (kan tot een uur duren).
6. Dien daarna `https://meritadministratie.nl/sitemap.xml` in bij Google Search Console.

**Routing:** elke route is geprerenderd als `pad.html` én `pad/index.html`, plus `404.html`.
Directe URL's en refreshes werken daardoor zonder redirect-hacks.

## Checklist vóór livegang

- [ ] `src/config/site.ts`: telefoon, KvK, adres invullen (of bewust leeg laten)
- [ ] Privacyverklaring en cookiebeleid laten controleren (concept!)
- [ ] Formulierprovider kiezen en `VITE_FORM_PROVIDER` / `VITE_FORM_ENDPOINT` instellen
- [ ] DNS-records instellen en HTTPS afdwingen
