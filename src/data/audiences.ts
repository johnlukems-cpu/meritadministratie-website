import type { LucideIcon } from 'lucide-react';
import { ArrowRightLeft, Briefcase, Building2, Factory, Sparkles, Store, User } from 'lucide-react';

export interface Audience {
  id: string;
  title: string;
  /** Korte omschrijving (kaart op de homepage) */
  description: string;
  icon: LucideIcon;
  /** Herkenbare situatie (pagina /voor-ondernemers) */
  situation: string;
  /** Mogelijke administratieve behoeften — bewust "vaak" en "kan", geen aannames */
  needs: string[];
  /** Hoe Merit ondersteunt */
  support: string;
}

/** Doelgroepen ("Voor wie") — homepage en pagina /voor-ondernemers */
export const audiences: Audience[] = [
  {
    id: 'zzp',
    title: 'Zzp’er',
    description:
      'U wilt uw uren besteden aan uw vak, niet aan bonnetjes en aangiften. Wij houden uw administratie bij en bewaken de btw-termijnen.',
    icon: User,
    situation:
      'U werkt zelfstandig, vaak voor meerdere opdrachtgevers, en uw tijd is uw belangrijkste middel. De administratie komt er ’s avonds of in het weekend bij.',
    needs: [
      'Facturen versturen en bijhouden wat nog openstaat',
      'Bonnen en kosten op een eenvoudige manier verwerken',
      'Btw-aangifte per kwartaal, zonder de termijn te missen',
      'De jaarlijkse aangifte inkomstenbelasting voorbereid',
    ],
    support:
      'Wij verwerken uw administratie periodiek, bereiden de btw-aangifte voor en zorgen dat de jaarcijfers klaarstaan voor de aangifte inkomstenbelasting. U levert digitaal aan; wij doen de rest.',
  },
  {
    id: 'eenmanszaak',
    title: 'Eenmanszaak',
    description:
      'Van inkoop- en verkoopfacturen tot de aangifte inkomstenbelasting: een complete administratie die klopt en inzicht geeft.',
    icon: Briefcase,
    situation:
      'Uw onderneming draait op u, misschien met een enkele medewerker of hulp uit uw omgeving. De administratie is groter dan die van een starter, maar u wilt er niet dagelijks mee bezig zijn.',
    needs: [
      'Een sluitende boekhouding met inkoop, verkoop en bank',
      'Overzicht van debiteuren en crediteuren',
      'Btw-aangifte en, indien van toepassing, ICP-opgaaf',
      'Inzicht in resultaat en de aangifte inkomstenbelasting',
    ],
    support:
      'Wij houden uw boekhouding bij, geven u periodiek overzicht van uw cijfers en verzorgen de aangiften. Vragen over een factuur of betaling stelt u aan uw vaste aanspreekpunt.',
  },
  {
    id: 'starter',
    title: 'Startende ondernemer',
    description:
      'Een goede basis vanaf dag één. Wij richten uw administratie in en begeleiden u bij de eerste aangiften en keuzes.',
    icon: Sparkles,
    situation:
      'U bent net ingeschreven of staat op het punt te beginnen. Er komt veel op u af en u wilt de administratie meteen goed opzetten, zonder er eindeloos tijd aan kwijt te zijn.',
    needs: [
      'Een eenvoudige structuur voor facturen, bonnen en bank',
      'Uitleg over welke aangiften voor u gelden',
      'Begeleiding bij de eerste btw-aangifte',
      'Een aanspreekpunt voor praktische vragen',
    ],
    support:
      'Wij richten uw administratie met u in, maken aanleverafspraken en begeleiden u bij de eerste aangiften. Zo begint u met overzicht en groeit de samenwerking mee met uw onderneming.',
  },
  {
    id: 'kleine-onderneming',
    title: 'Kleine onderneming',
    description:
      'Groeit uw bedrijf, dan groeit de administratie mee. Wij zorgen voor structuur, overzicht en tijdige rapportages.',
    icon: Store,
    situation:
      'Uw onderneming heeft meerdere klanten, leveranciers en mogelijk personeel. De administratie is een doorlopend proces geworden dat structuur en regelmaat vraagt.',
    needs: [
      'Periodieke verwerking van een grotere stroom facturen en mutaties',
      'Actueel overzicht van openstaande posten en liquiditeit',
      'Tijdige btw- en overige aangiften',
      'Rapportages die u helpen bij beslissingen',
    ],
    support:
      'Wij brengen structuur aan in de aanlevering en verwerking, houden het overzicht actueel en leveren periodiek rapportages. Aanvullende zaken, zoals salarisadministratie, bespreken wij met u.',
  },
  {
    id: 'mkb',
    title: 'MKB',
    description:
      'Volledige administratie, maandafsluiting en rapportage in AFAS: een financiële afdeling op maat, zonder eigen personeel.',
    icon: Factory,
    situation:
      'Uw bedrijf heeft meerdere medewerkers, vaste leveranciers en een doorlopende stroom transacties. U wilt maandelijks weten hoe u ervoor staat, zonder een eigen financiële afdeling in te richten.',
    needs: [
      'Volledige administratie met maandafsluiting',
      'Actuele rapportages voor sturing en overleg',
      'Btw-, ICP- en jaarlijkse aangiften tijdig verzorgd',
      'Een goed ingerichte AFAS-omgeving en ondersteuning daarbij',
    ],
    support:
      'Met MERIT Control, Partner of Finance fungeren wij als uw externe financiële afdeling: administratie, maandafsluiting, rapportage, aangiften en AFAS-ondersteuning, afgestemd op de omvang van uw organisatie.',
  },
  {
    id: 'bv',
    title: 'Bv',
    description:
      'Boekhouding, btw, vennootschapsbelasting en jaarcijfers: wij verzorgen de administratie van uw bv zorgvuldig en volledig.',
    icon: Building2,
    situation:
      'U onderneemt vanuit een besloten vennootschap, alleen of met medeaandeelhouders. Naast de reguliere boekhouding gelden er specifieke verplichtingen, zoals de vennootschapsbelasting en de jaarrekening.',
    needs: [
      'Een volledige boekhouding volgens de eisen voor een bv',
      'Btw-aangifte en eventuele ICP-opgaaf',
      'Voorbereiding van de jaarcijfers en de aangifte vennootschapsbelasting',
      'Afstemming rond deponering en overige verplichtingen',
    ],
    support:
      'Wij verzorgen de boekhouding en aangiften van uw bv en bereiden de jaarcijfers voor. Over verplichtingen die specifiek voor uw bv gelden, stemmen wij tijdig met u af.',
  },
  {
    id: 'overstappers',
    title: 'Ondernemers die willen overstappen',
    description:
      'Toe aan meer overzicht, snellere antwoorden of AFAS? Wij nemen uw administratie zorgvuldig over.',
    icon: ArrowRightLeft,
    situation:
      'U heeft al een boekhouder of administratiekantoor, maar de samenwerking past niet meer bij wat u nodig heeft: meer inzicht, kortere lijnen of een moderne omgeving zoals AFAS.',
    needs: [
      'Een zorgvuldige overdracht zonder onderbreking van aangiften',
      'Controle en waar nodig opschoning van de bestaande administratie',
      'Inrichting in AFAS met behoud van historie',
      'Duidelijke afspraken over de verdere verwerking',
    ],
    support:
      'Wij inventariseren uw situatie, regelen de overdracht met uw huidige boekhouder, controleren de administratie en richten die in AFAS in. Daarna nemen wij de verdere verwerking over.',
  },
];
