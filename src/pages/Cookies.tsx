import { Link } from 'react-router';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { openConsentPreferences } from '@/lib/consent/consent';
import { PageHero } from '@/sections/PageHero';
import { LegalArticle, type LegalSection } from '@/sections/LegalArticle';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';
import { useConsentRequired } from '@/lib/consent/useConsent';

const UPDATED = '16 september 2026';

/** Knop om voorkeuren te beheren; alleen actief als er iets te kiezen valt. */
function ManagePreferences() {
  const available = useConsentRequired();

  if (!available) {
    return (
      <p>
        Op dit moment zijn er geen analytische of marketingcookies actief; er valt daarom nog niets
        in te stellen. Zodra dat verandert, verschijnt hier een knop om uw voorkeuren te beheren en
        vraagt de website u eerst om toestemming.
      </p>
    );
  }
  return (
    <div>
      <p>U kunt uw keuze op elk moment aanpassen:</p>
      <div className="mt-3">
        <Button size="sm" variant="outline" onClick={openConsentPreferences}>
          Cookievoorkeuren beheren
        </Button>
      </div>
    </div>
  );
}

const sections: LegalSection[] = [
  {
    id: 'wat',
    title: 'Wat zijn cookies?',
    content: (
      <p>
        Cookies zijn kleine tekstbestanden die bij een bezoek aan een website op uw computer,
        tablet of telefoon worden opgeslagen. Vergelijkbare technieken zijn bijvoorbeeld
        <em> local storage</em> en pixels. In dit beleid gebruiken wij "cookies" als verzamelterm
        voor al deze technieken.
      </p>
    ),
  },
  {
    id: 'huidig',
    title: 'Welke cookies deze website nu gebruikt',
    content: (
      <>
        <p>
          <strong>Op dit moment plaatst {siteConfig.name} alleen technisch noodzakelijke opslag.</strong>{' '}
          Concreet: als u een keuze maakt in de cookiebanner, onthouden wij die keuze in de
          lokale opslag van uw browser (<code>merit-cookie-consent</code>), zodat wij u niet bij elk
          bezoek opnieuw hoeven te vragen. Deze opslag bevat geen persoonsgegevens.
        </p>
        <p>
          Er zijn nog geen analytische of marketingdiensten actief. Er worden daarom geen
          analytische of marketingcookies geplaatst, en er wordt geen cookiebanner getoond zolang
          dat zo blijft.
        </p>
      </>
    ),
  },
  {
    id: 'categorieen',
    title: 'Categorieën cookies',
    content: (
      <>
        <h3>Noodzakelijke cookies</h3>
        <p>
          Nodig om de website goed te laten werken, bijvoorbeeld om uw cookievoorkeur te onthouden
          of de website veilig aan te bieden. Hiervoor is geen toestemming vereist.
        </p>
        <h3>Analytische cookies</h3>
        <p>
          Geven inzicht in hoe bezoekers de website gebruiken (bijvoorbeeld welke pagina's worden
          bekeken), zodat wij de website kunnen verbeteren. Denk aan een dienst als Google
          Analytics. Zulke cookies plaatsen wij alleen nadat u daarvoor toestemming heeft gegeven.
        </p>
        <h3>Marketingcookies</h3>
        <p>
          Worden gebruikt om de effectiviteit van advertenties te meten of om u op andere
          platforms relevante informatie te tonen. Denk aan een dienst als de Meta Pixel. Ook deze
          cookies plaatsen wij alleen met uw toestemming.
        </p>
        <h3>Ingesloten content van derden</h3>
        <p>
          Wanneer wij in de toekomst content van derden insluiten (zoals een online agenda om een
          afspraak te plannen, of een video), kan die partij eigen cookies plaatsen. Wij vermelden
          dat dan hier en vragen waar nodig eerst toestemming.
        </p>
      </>
    ),
  },
  {
    id: 'toekomst',
    title: 'Wat er gebeurt als wij nieuwe diensten toevoegen',
    content: (
      <>
        <p>
          De website is zo gebouwd dat niet-noodzakelijke diensten pas worden geladen nadat u
          daarvoor toestemming heeft gegeven. Zodra wij analytics of marketingtools activeren:
        </p>
        <ul>
          <li>ziet u bij uw eerstvolgende bezoek een cookiebanner met een duidelijke keuze;</li>
          <li>worden de betreffende scripts alleen geladen bij toestemming voor die categorie;</li>
          <li>werken wij dit cookiebeleid en de privacyverklaring bij met de naam van de dienst.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'beheren',
    title: 'Uw voorkeuren beheren',
    content: (
      <>
        <ManagePreferences />
        <p>
          Daarnaast kunt u cookies altijd verwijderen of blokkeren via de instellingen van uw
          browser. Houd er rekening mee dat sommige functies van websites dan mogelijk niet goed
          werken.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Vragen',
    content: (
      <p>
        Heeft u vragen over cookies op deze website? Mail naar{' '}
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>. Meer over de
        verwerking van persoonsgegevens leest u in onze{' '}
        <Link to={routes.privacy.path} className="underline underline-offset-4">
          privacyverklaring
        </Link>
        .
      </p>
    ),
  },
];

export default function Cookies() {
  return (
    <>
      <Seo
        title="Cookiebeleid"
        description="Welke cookies meritadministratie.nl gebruikt, welke categorieën er zijn en hoe u uw voorkeuren beheert. Nu alleen noodzakelijke cookies."
      />
      <PageHero
        eyebrow="Juridisch"
        title="Cookiebeleid"
        intro="Op deze pagina leest u welke cookies en vergelijkbare technieken deze website gebruikt en hoe u daar zelf invloed op heeft."
        breadcrumbs={[{ name: 'Cookiebeleid', path: routes.cookies.path }]}
      />
      <LegalArticle
        updated={UPDATED}
        sections={sections}
        footnote={
          <p>
            <strong>Let op:</strong> dit cookiebeleid beschrijft de huidige situatie en moet worden
            bijgewerkt zodra analytics-, marketing- of andere diensten van derden worden
            geactiveerd.
          </p>
        }
      />
    </>
  );
}
