import { Link } from 'react-router';
import { Seo } from '@/components/Seo';
import { PageHero } from '@/sections/PageHero';
import { LegalArticle, type LegalSection } from '@/sections/LegalArticle';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';

/** Datum van de laatste wijziging — pas aan bij elke inhoudelijke wijziging. */
const UPDATED = '16 september 2026';

/**
 * Bedrijfsgegevens komen uit siteConfig. Zolang een gegeven daar `null` is,
 * wordt een duidelijke placeholder getoond die vóór publicatie moet worden ingevuld.
 */
function Placeholder({ label }: { label: string }) {
  return (
    <span className="rounded bg-warning-soft px-1.5 py-0.5 font-medium text-warning" title="Nog in te vullen">
      [{label}]
    </span>
  );
}

function CompanyDetails() {
  const { contact } = siteConfig;
  return (
    <ul>
      <li>
        <strong>Bedrijfsnaam:</strong> {siteConfig.name}
      </li>
      <li>
        <strong>Website:</strong> {siteConfig.url}
      </li>
      <li>
        <strong>E-mail:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </li>
      <li>
        <strong>KvK-nummer:</strong> {contact.kvk ?? <Placeholder label="KvK-nummer nog invullen" />}
      </li>
      <li>
        <strong>Vestigingsadres:</strong>{' '}
        {contact.address ? (
          `${contact.address.street}, ${contact.address.postalCode} ${contact.address.city}`
        ) : (
          <Placeholder label="Vestigingsadres nog invullen" />
        )}
      </li>
    </ul>
  );
}

const sections: LegalSection[] = [
  {
    id: 'wie',
    title: 'Wie wij zijn',
    content: (
      <>
        <p>
          Deze privacyverklaring is van toepassing op de website {siteConfig.url} en op de
          verwerking van persoonsgegevens door {siteConfig.name} (hierna: "wij"). Wij zijn de
          verwerkingsverantwoordelijke voor de persoonsgegevens die via deze website worden
          verzameld.
        </p>
        <CompanyDetails />
      </>
    ),
  },
  {
    id: 'gegevens',
    title: 'Welke persoonsgegevens wij via de website verwerken',
    content: (
      <>
        <p>
          Wij verwerken alleen persoonsgegevens die u zelf aan ons verstrekt of die nodig zijn om
          de website goed te laten werken. Via deze website kunnen de volgende gegevens worden
          verzameld:
        </p>
        <h3>Contactformulier</h3>
        <ul>
          <li>Naam</li>
          <li>Bedrijfsnaam (optioneel)</li>
          <li>E-mailadres</li>
          <li>Telefoonnummer (optioneel)</li>
          <li>Onderwerp en de inhoud van uw bericht</li>
        </ul>
        <h3>Offerteaanvraag</h3>
        <ul>
          <li>Naam, bedrijfsnaam, e-mailadres en telefoonnummer</li>
          <li>Rechtsvorm, branche en huidige administratieve situatie</li>
          <li>Gewenste ondersteuning</li>
          <li>Indicatie van de omvang van uw administratie (aantallen transacties en facturen)</li>
          <li>Eventuele toelichting in het berichtveld</li>
        </ul>
        <h3>Kennismakingsaanvraag</h3>
        <ul>
          <li>Naam, bedrijfsnaam, e-mailadres en telefoonnummer</li>
          <li>Gewenste dienst en eventuele toelichting</li>
        </ul>
        <h3>Technische gegevens</h3>
        <p>
          Bij het bezoeken van de website kunnen technische gegevens worden verwerkt die nodig zijn
          om de website te tonen, zoals uw IP-adres, browsertype en de opgevraagde pagina's. Deze
          gegevens worden verwerkt door de hostingpartij van de website. Zie ook het onderdeel
          over cookies en analytics hieronder.
        </p>
      </>
    ),
  },
  {
    id: 'doelen',
    title: 'Waarvoor wij uw gegevens gebruiken',
    content: (
      <>
        <p>Wij gebruiken de via de website verstrekte gegevens voor de volgende doelen:</p>
        <ul>
          <li>Het beantwoorden van uw vraag of bericht.</li>
          <li>Het opstellen en toesturen van een offerte of voorstel.</li>
          <li>Het inplannen en voeren van een kennismakingsgesprek.</li>
          <li>Het onderhouden van contact over een mogelijke of bestaande samenwerking.</li>
          <li>Het goed en veilig laten functioneren van de website.</li>
        </ul>
        <p>
          <strong>Grondslag.</strong> Wij verwerken deze gegevens omdat dit noodzakelijk is om op uw
          verzoek stappen te zetten voorafgaand aan een overeenkomst, of op basis van ons
          gerechtvaardigd belang om uw vraag te kunnen beantwoorden. Voor het plaatsen van
          niet-noodzakelijke cookies vragen wij uw toestemming.
        </p>
      </>
    ),
  },
  {
    id: 'formulieren',
    title: 'Hoe de formulieren werken',
    content: (
      <>
        <p>
          Wanneer u een formulier verzendt, worden de ingevulde gegevens via de server van onze
          website per e-mail aan ons bezorgd op {siteConfig.contact.email}. U ontvangt daarnaast
          automatisch een bevestiging op het door u opgegeven e-mailadres. Voor het versturen van
          deze e-mails maken wij gebruik van de e-maildienst Resend (Resend, Inc.), die de
          gegevens uitsluitend verwerkt om de e-mails af te leveren.
        </p>
        <p>
          De formulieren zijn beveiligd tegen misbruik (onder meer validatie, een verborgen
          controleveld tegen spamrobots en een limiet op het aantal inzendingen). De ingevulde
          gegevens worden niet op de website zelf opgeslagen.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies en website-analytics',
    content: (
      <>
        <p>
          Deze website gebruikt op dit moment alleen technisch noodzakelijke opslag, bijvoorbeeld om
          uw cookievoorkeur te onthouden. Er worden geen analytische of marketingcookies geplaatst
          zolang daarvoor geen dienst is geactiveerd én u daarvoor geen toestemming heeft gegeven.
        </p>
        <p>
          Zodra wij website-analytics (zoals Google Analytics) of marketingtools inzetten, vragen
          wij vooraf uw toestemming via een cookiebanner. U kunt uw keuze op elk moment aanpassen.
          Meer informatie leest u in ons{' '}
          <Link to={routes.cookies.path} className="underline underline-offset-4">
            cookiebeleid
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: 'bewaren',
    title: 'Hoe lang wij gegevens bewaren',
    content: (
      <>
        <p>
          Wij bewaren uw persoonsgegevens niet langer dan nodig is voor het doel waarvoor wij ze
          hebben ontvangen. Als richtlijn hanteren wij:
        </p>
        <ul>
          <li>
            <strong>Contact-, offerte- en kennismakingsaanvragen:</strong> zolang nodig om uw
            aanvraag af te handelen en, als er geen samenwerking volgt, tot uiterlijk{' '}
            <Placeholder label="bewaartermijn nog vaststellen, bijv. 12 maanden" /> daarna.
          </li>
          <li>
            <strong>Bij een samenwerking:</strong> gedurende de samenwerking en daarna zolang
            wettelijke bewaartermijnen (zoals de fiscale bewaarplicht) dat vereisen.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'derden',
    title: 'Delen met derden',
    content: (
      <>
        <p>
          Wij verkopen uw gegevens niet aan derden en delen ze alleen als dat nodig is voor de
          hierboven genoemde doelen of om aan een wettelijke verplichting te voldoen. Partijen die
          daarbij een rol kunnen spelen:
        </p>
        <ul>
          <li>
            <strong>Hosting van de website:</strong> de website en de formulierverwerking draaien
            bij Vercel (Vercel Inc.). Bij het opvragen van de website of het verzenden van een
            formulier verwerkt de hostingpartij technische gegevens zoals uw IP-adres.
          </li>
          <li>
            <strong>Verzenden van formulier-e-mails:</strong> Resend (Resend, Inc.) bezorgt de
            interne melding en uw bevestigingsmail.
          </li>
          <li>
            <strong>E-mail:</strong> berichten die u ons stuurt, ontvangen wij in ons e-mailsysteem
            bij Squarespace (Squarespace, Inc.).
          </li>
          <li>
            <strong>Toekomstige diensten:</strong> zodra wij agenda-, analytics- of CRM-diensten
            inzetten, vermelden wij die hier en sluiten wij waar nodig een verwerkersovereenkomst.
          </li>
        </ul>
        <p>
          Worden gegevens buiten de Europese Economische Ruimte verwerkt, dan zorgen wij dat dit
          gebeurt op basis van passende waarborgen, zoals standaardcontractbepalingen.
        </p>
      </>
    ),
  },
  {
    id: 'rechten',
    title: 'Uw rechten',
    content: (
      <>
        <p>U heeft het recht om:</p>
        <ul>
          <li>in te zien welke persoonsgegevens wij van u verwerken;</li>
          <li>onjuiste gegevens te laten corrigeren;</li>
          <li>uw gegevens te laten verwijderen, voor zover wij niet verplicht zijn ze te bewaren;</li>
          <li>de verwerking te laten beperken of daartegen bezwaar te maken;</li>
          <li>uw gegevens in een gangbaar bestandsformaat te ontvangen (dataportabiliteit);</li>
          <li>een eerder gegeven toestemming in te trekken.</li>
        </ul>
        <p>
          Wilt u gebruikmaken van een van deze rechten, stuur dan een e-mail naar{' '}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>. Wij reageren
          zo snel mogelijk en in ieder geval binnen de wettelijke termijn. Om er zeker van te zijn
          dat het verzoek van u afkomstig is, kunnen wij u vragen uw identiteit aannemelijk te
          maken.
        </p>
        <p>
          Bent u niet tevreden over hoe wij met uw gegevens omgaan, dan heeft u het recht een
          klacht in te dienen bij de Autoriteit Persoonsgegevens.
        </p>
      </>
    ),
  },
  {
    id: 'beveiliging',
    title: 'Beveiliging',
    content: (
      <p>
        Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen
        tegen verlies, misbruik en onbevoegde toegang. De website wordt via een beveiligde
        verbinding (HTTPS) aangeboden. Toegang tot uw gegevens is beperkt tot personen voor wie dat
        noodzakelijk is.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    content: (
      <p>
        Heeft u vragen over deze privacyverklaring of over de manier waarop wij met uw gegevens
        omgaan? Neem contact op via{' '}
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> of via de{' '}
        <Link to={routes.contact.path} className="underline underline-offset-4">
          contactpagina
        </Link>
        .
      </p>
    ),
  },
  {
    id: 'wijzigingen',
    title: 'Wijzigingen in deze privacyverklaring',
    content: (
      <p>
        Wij kunnen deze privacyverklaring aanpassen, bijvoorbeeld wanneer wij nieuwe diensten
        inzetten of wanneer wet- en regelgeving verandert. De actuele versie staat altijd op deze
        pagina; de datum van de laatste wijziging vindt u bovenaan. Wij raden u aan deze pagina
        regelmatig te raadplegen.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacyverklaring"
        description="Lees hoe MERIT Administratie & Advies omgaat met uw persoonsgegevens: welke gegevens wij via de website verwerken, waarvoor, hoe lang en welke rechten u heeft."
      />
      <PageHero
        eyebrow="Juridisch"
        title="Privacyverklaring"
        intro="Wij gaan zorgvuldig om met uw persoonsgegevens. In deze verklaring leest u welke gegevens wij via deze website verwerken, waarom en welke rechten u heeft."
        breadcrumbs={[{ name: 'Privacyverklaring', path: routes.privacy.path }]}
      />
      <LegalArticle
        updated={UPDATED}
        sections={sections}
        footnote={
          <p>
            <strong>Let op:</strong> deze privacyverklaring is een concept en moet vóór publicatie
            worden gecontroleerd en aangepast aan de daadwerkelijke bedrijfs- en
            verwerkingsactiviteiten.
          </p>
        }
      />
    </>
  );
}
