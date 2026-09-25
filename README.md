# MERIT Administratie & Advies — website

Bedrijfswebsite van **MERIT Administratie & Advies** · https://meritadministratie.nl · info@meritadministratie.nl

Statische, geprerenderde website voor een modern administratiekantoor en AFAS-partner: diensten,
pakketten en tarieven (Prijzenoverzicht 2026), AFAS, doelgroepen, over ons, FAQ,
contact-/offerte-/kennismakingsformulieren en juridische pagina's. Gehost op GitHub Pages.

**Routes:** `/`, `/diensten` (+ 4 subpagina's), `/pakketten`, `/afas`, `/voor-ondernemers`, `/over-ons`,
`/faq`, `/contact`, `/offerte`, `/kennismaking`, `/privacy-policy`, `/cookiebeleid`
(oude paden `/privacy` en `/cookies` verwijzen door).
Daarnaast het beveiligde, niet-openbare `/admin/content` — de MERIT Content Studio (zie verderop).

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
npm run test:store # tests van de Content Studio-opslag (geen echte Redis nodig)
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
| `ADMIN_PASSWORD`      | **Server-side.** Wachtwoord voor de Content Studio (`/admin/content`)         |
| `ADMIN_SESSION_SECRET`| Server-side. Willekeurige string (≥ 32 tekens) die de sessiecookie ondertekent |
| `ADMIN_SESSION_HOURS` | Server-side. Geldigheid van een sessie in uren (standaard 8)                  |
| `KV_REST_API_URL`     | Server-side. Redis REST-endpoint voor de Content Studio (Upstash via Vercel)  |
| `KV_REST_API_TOKEN`   | Server-side. Token bij dat endpoint                                           |

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

## MERIT Content Studio (`/admin/content`)

Beveiligd, niet-openbaar beheergedeelte om website- en social-content voor te bereiden,
te plannen en klaar te zetten. **Niet** onderdeel van de publieke website: de route staat niet in
`src/config/routes.ts`, wordt niet geprerenderd, staat niet in de sitemap, is uitgesloten in
`robots.txt` en krijgt `X-Robots-Tag: noindex` mee.

**Schermen** — `/admin/content` (dashboard), `/admin/content/nieuw` (briefing invullen),
`/admin/content/:id` (tekst per kanaal, statusacties), `/admin/content/kalender`.

**Toegang.** Wachtwoord → `POST /api/admin/session` → HttpOnly-sessiecookie (HMAC-ondertekend).
Het wachtwoord staat uitsluitend server-side in `ADMIN_PASSWORD`; de frontend bevat geen enkel
geheim en kan de cookie niet lezen. Elk endpoint onder `/api/admin/` controleert de sessie
opnieuw — de inlogschermen zijn alleen de interface, niet de beveiliging. Ontbreken
`ADMIN_PASSWORD` of `ADMIN_SESSION_SECRET`, dan is het hele gedeelte gesloten (fail closed).
Wilt u later meerdere gebruikers of SSO: vervang de provider in `api/admin/_lib/auth.ts`,
het contract (`requireAdmin`) blijft gelijk.

**Opslag.** Eén JSON-document in Vercel KV / Upstash Redis (`api/admin/_lib/store.ts`).
**Opslag.** Permanent in Redis — zie het hoofdstuk [Opslag: Redis](#opslag-redis) hieronder.
**AI-generatie is nog niet gekoppeld.** `api/admin/_lib/ai.ts` legt alleen het contract vast
(`AIContentService`) en bouwt de briefing op uit de MERIT-kennisbank. Zolang er geen provider is,
geeft `POST /api/admin/content/generate` de briefing terug met code `not_configured`, zodat u de
teksten zelf kunt schrijven. Aansluiten: zie het TODO-blok boven in dat bestand.

**Social media is nog niet gekoppeld.** `LinkedInService` en `MetaService`
(`api/admin/_lib/social.ts`) bevatten geen tokens en doen geen netwerkverkeer;
`publishToLinkedIn/Facebook/Instagram()` geven de melding
"Social media koppeling wordt binnenkort geactiveerd." De status blijft dan ongewijzigd.

**Kennisbank.** `src/lib/content/knowledge.ts` — bedrijfsgegevens, positionering, schrijfregels,
diensten en tarieven. Prijzen komen uit `src/data/packages.ts`, zodat er één bron van waarheid is.

**Lokaal draaien.** Zet `ADMIN_PASSWORD` en `ADMIN_SESSION_SECRET` in `.env` (niet gecommit);
`npm run dev` laat de admin-endpoints meedraaien via de dev-only plugin `scripts/dev-admin-api.ts`.

## Opslag: Redis

De Content Studio bewaart content permanent in **Redis**, via de **Upstash (Serverless Redis)**-integratie
uit de **Vercel Marketplace**. De communicatie loopt over de **REST-API** van Redis: serverless functies
kunnen geen langlevende TCP-verbinding aanhouden, en de REST-API heeft daardoor geen extra npm-pakket
nodig. Er is dus **geen nieuwe dependency** toegevoegd.

**Abstractielaag.** `api/admin/_lib/store.ts` definieert `StorageDriver` (`list` · `get` · `put` ·
`remove` · `ping`) met twee implementaties: `redis` en `memory`. De endpoints en de interface praten
uitsluitend via `listItems`, `getItem`, `saveItem`, `removeItem`, `storeInfo` en `withStore` — nergens
in `api/admin/*.ts` of in `src/` staat een Redis-aanroep. Een andere opslag (Postgres, Supabase, Neon)
sluit u aan door één nieuwe `StorageDriver` te schrijven en die in `getDriver()` terug te geven.

**Sleutels.** Eén document per item, plus een index:

| Sleutel | Inhoud |
| ------- | ------ |
| `merit:content:item:<id>` | JSON van één `ContentItem` (status, `scheduledAt`, `publishedAt`, kanalen, website-/LinkedIn-/Facebook-/Instagram-tekst, tijdlijn) |
| `merit:content:index` | Redis-SET met alle id's |

Omdat elk item zijn eigen sleutel heeft, kunnen twee gelijktijdige bewerkingen elkaar niet
overschrijven. Verweesde id's (item verlopen of handmatig verwijderd) worden bij het ophalen
automatisch uit de index gehaald.

**Environment variables.** Vercel zet deze zelf zodra u de store koppelt:

| Variabele | Doel |
| --------- | ---- |
| `KV_REST_API_URL` | REST-endpoint van de Redis-store |
| `KV_REST_API_TOKEN` | Token bij dat endpoint |

Gebruikt u Upstash rechtstreeks, dan worden ook `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
herkend. Een TCP-reeks (`REDIS_URL`) wordt **niet** gebruikt; staat alleen die er, dan logt de functie
één duidelijke aanwijzing en valt hij terug op geheugen. Zet deze waarden nooit in de code of in Git.

**Preview koppelen**

1. Vercel → project **meritadministratie-website** → **Storage** → **Create Database** →
   **Marketplace** → **Upstash / Serverless Redis** → store aanmaken (regio dicht bij uw functies).
2. Bij **Connect Project**: vink **Preview** aan. Vercel voegt `KV_REST_API_URL` en
   `KV_REST_API_TOKEN` toe aan die omgeving.
3. Start een nieuwe deployment van `feature/content-studio` — omgevingsvariabelen worden bij het
   deployen aan de functie gekoppeld, bestaande deployments pikken ze niet alsnog op.
4. Open `<preview-url>/admin/content`. De waarschuwing *"Tijdelijke opslag"* is dan weg; content
   blijft nu bewaard tussen sessies en koude starts.

**Production later koppelen**

1. Dezelfde store → **Connect Project** → vink nu ook **Production** aan (of maak een aparte store
   voor productie, zodat test- en echte content gescheiden blijven — dat is de aanbeveling).
2. Deploy `main` opnieuw nadat de variabelen zijn toegevoegd.
3. Controleer in de Runtime Logs dat er geen regel `[content-studio] REDIS_URL gevonden…` verschijnt;
   die betekent dat alleen de TCP-reeks is gezet en de REST-variabelen ontbreken.

**Sessies.** Admin-sessies hoeven *niet* in Redis: de sessiecookie is een HMAC-ondertekend token met
vervaltijd (`api/admin/_lib/auth.ts`), dus de server hoeft geen sessiestatus bij te houden. Dat blijft
werken bij meerdere functie-instanties en koude starts. Wilt u later sessies kunnen intrekken
(uitloggen op alle apparaten), dan is de Redis-laag daar klaar voor — de authenticatie is voor deze
wijziging bewust ongemoeid gelaten.

**Tests.** `npm run test:store` draait de opslagtests. Er is geen echte Redis nodig: het script
(`scripts/test-content-store.mjs`) start een kleine HTTP-server die de Redis REST-API nabootst en test
daar de echte driver tegen — aanmaken, ophalen, lijst, wijzigen, statuswissels, geplande content,
alle vier de kanaalteksten, verwijderen, index-opschoning, foutafhandeling en de terugval op geheugen.

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
