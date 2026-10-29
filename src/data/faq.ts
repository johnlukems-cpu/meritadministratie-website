import type { AccordionItem } from '@/components/ui/Accordion';

export interface FaqGroup {
  id: string;
  title: string;
  items: AccordionItem[];
}

/**
 * Veelgestelde vragen per onderwerp — pagina /faq. De homepage toont een selectie
 * (zie `homeFaq`). Antwoorden beschrijven uitsluitend werkzaamheden en afspraken die
 * MERIT daadwerkelijk kan uitvoeren; er worden geen fiscale uitkomsten, besparingen
 * of resultaten gegarandeerd.
 */
export const faqGroups: FaqGroup[] = [
  {
    id: 'samenwerking',
    title: 'Samenwerking en werkwijze',
    items: [
      {
        question: 'Voor wie werkt MERIT?',
        answer:
          'Wij werken voor zzp’ers en voor kleine en middelgrote ondernemingen in Nederland. Denk aan een zelfstandige met een eenmanszaak, een vof of een bv met een handvol medewerkers die zijn financiële administratie, btw-aangiften en jaarwerk uit handen wil geven.',
      },
      {
        question: 'Ik doe mijn boekhouding nu zelf. Kan ik overstappen?',
        answer:
          'Ja. Wij kijken eerst naar de staat van uw huidige administratie en naar de software waarin u werkt. Daarna spreken wij af per welke datum wij overnemen en wat er nog uit het lopende of vorige boekjaar moet worden afgerond.',
      },
      {
        question: 'Welke software gebruiken jullie?',
        answer:
          'Wij werken met AFAS. Werkt u al in een ander pakket, bespreek dat dan bij de kennismaking: wij geven vooraf aan wat haalbaar is en wat een overstap voor u zou betekenen.',
      },
      {
        question: 'Hoe lever ik mijn facturen en bonnen aan?',
        answer:
          'Digitaal, op de manier die voor u het handigst werkt: via een gedeelde map, per e-mail of rechtstreeks in de software. Wij maken hierover bij de start praktische afspraken, zodat het aanleveren u zo min mogelijk tijd kost.',
      },
      {
        question: 'Hoe vaak hoor ik iets van jullie?',
        answer:
          'Dat spreken wij vooraf af. Standaard koppelen wij periodiek terug wat is verwerkt en wat aandacht vraagt: ontbrekende stukken, openstaande posten en zaken die opvallen. Daarnaast kunt u tussendoor altijd contact opnemen.',
      },
      {
        question: 'Heb ik één vast aanspreekpunt?',
        answer:
          'Ja. U hoeft uw situatie niet telkens opnieuw uit te leggen en weet bij wie u terechtkunt.',
      },
    ],
  },
  {
    id: 'administratie',
    title: 'Financiële administratie',
    items: [
      {
        question: 'Welke werkzaamheden nemen jullie over?',
        answer:
          'Het verwerken van inkoop- en verkoopfacturen, het verwerken en controleren van bankmutaties, het bijhouden van debiteuren en crediteuren, het controleren van de volledigheid en juistheid van de administratie en het periodiek in beeld brengen van uw inkomsten, uitgaven en resultaat.',
      },
      {
        question: 'Mijn administratie loopt achter. Kunnen jullie dat inhalen?',
        answer:
          'Ja. Het inhalen van een achterstand is een afgebakende opdracht. Wij bepalen eerst de omvang en de staat van de administratie en doen daarna een voorstel. Dit valt niet automatisch binnen een maandpakket.',
      },
      {
        question: 'Houden jullie openstaande facturen bij?',
        answer:
          'Ja. Wij houden bij welke facturen openstaan en hoe lang al, en koppelen dat aan u terug. Het daadwerkelijk aanmanen of incasseren spreken wij apart af.',
      },
      {
        question: 'Krijg ik inzicht in mijn cijfers?',
        answer:
          'Ja. U ziet periodiek wat er binnenkomt, wat eruit gaat, wat er nog openstaat en hoe uw resultaat zich ontwikkelt. Wij lichten dat toe in begrijpelijke taal.',
      },
    ],
  },
  {
    id: 'btw',
    title: 'Btw-aangiften',
    items: [
      {
        question: 'Verzorgen jullie mijn btw-aangifte?',
        answer:
          'Wij verzorgen de voorbereiding en controle: het controleren van btw-coderingen en btw-rekeningen, het aansluiten van de btw-administratie op uw boekhouding en het opstellen van de onderbouwing. Of wij de aangifte ook indienen leggen wij vooraf met u vast.',
      },
      {
        question: 'Wat heb ik daarvoor nodig?',
        answer:
          'Een complete administratie over de aangifteperiode: uw inkoop- en verkoopfacturen en uw bankmutaties. Ontbreekt er iets, dan geven wij dat op tijd bij u aan.',
      },
      {
        question: 'Kunnen jullie ICP-opgaven verzorgen?',
        answer:
          'Ja. Wij kunnen de gegevens voor ICP-opgaven voorbereiden en de verwerking van intracommunautaire transacties controleren.',
      },
      {
        question: 'Kunnen jullie btw uit een eerdere periode herstellen?',
        answer:
          'Ja. Wij kunnen btw-boekingen uit eerdere perioden controleren en herstellen en de bijbehorende aansluitingen voorbereiden. Dit is doorgaans een afgebakende opdracht met een eigen voorstel.',
      },
      {
        question: 'Zorgen jullie dat ik minder btw betaal?',
        answer:
          'Nee, dat beloven wij niet. Wij zorgen dat uw btw-administratie juist en volledig is en dat uw aangifte aansluit op uw boekhouding. Wat u verschuldigd bent volgt uit uw omzet en kosten, niet uit de manier waarop wij de administratie voeren.',
      },
    ],
  },
  {
    id: 'jaarafsluiting',
    title: 'Jaarafsluiting en jaarrekening',
    items: [
      {
        question: 'Wat doen jullie rond de jaarafsluiting?',
        answer:
          'Wij controleren de volledigheid van de administratie, bereiden de jaarafsluiting voor, sluiten de relevante grootboekrekeningen aan en signaleren ontbrekende stukken en afwijkingen. Daarna bereiden wij de jaarrekeninginformatie voor.',
      },
      {
        question: 'Stellen jullie de jaarrekening op?',
        answer:
          'Wij bereiden de jaarrekening voor en stellen die samen binnen de overeengekomen dienstverlening. Wat daar precies onder valt leggen wij vooraf schriftelijk vast.',
      },
      {
        question: 'Voert MERIT wettelijke accountantscontroles uit?',
        answer:
          'Nee. MERIT is geen accountantsorganisatie die wettelijke controles uitvoert. Onze werkzaamheden betreffen administratieve voorbereiding, verwerking en controle, en zijn geen wettelijke controle of assurance.',
      },
      {
        question: 'Zit de jaarrekening in mijn maandbedrag?',
        answer:
          'Niet automatisch. Bij het instappakket is de jaarafsluiting geen vast onderdeel; dat houdt het maandbedrag laag. U kunt de jaarafsluiting als aanvullende dienst toevoegen. Wij leggen vooraf vast wat wel en niet binnen uw pakket valt.',
      },
    ],
  },
  {
    id: 'tarieven',
    title: 'Tarieven en afspraken',
    items: [
      {
        question: 'Hoe zijn de tarieven opgebouwd?',
        answer:
          'Wij werken met een vast bedrag per maand, afgestemd op de omvang van uw administratie. Werkzaamheden daarbuiten — zoals de jaarafsluiting, aangiften inkomstenbelasting of het inhalen van een achterstand — bakenen wij apart af en offreren wij afzonderlijk. Alle tarieven zijn exclusief 21% btw.',
      },
      {
        question: 'Waarom staat er geen prijs bij btw-aangiften en jaarrekeningen?',
        answer:
          'Omdat die prijs sterk verschilt per onderneming. Het aantal aangiften, uw rechtsvorm en de staat waarin de administratie wordt aangeleverd bepalen het werk. Wij noemen liever geen bedrag dat later niet blijkt te kloppen; u ontvangt vooraf een voorstel met een vast tarief.',
      },
      {
        question: 'Wordt meerwerk automatisch uitgevoerd?',
        answer:
          'Nee. Meerwerk bespreken wij vooraf met u en voeren wij pas na uw akkoord uit.',
      },
      {
        question: 'Ontvang ik vooraf een voorstel?',
        answer:
          'Ja. Na de kennismaking ontvangt u een voorstel waarin de werkzaamheden, het maandbedrag, de afbakening en de afspraken over terugkoppeling staan.',
      },
      {
        question: 'Zit ik ergens aan vast?',
        answer:
          'De afspraken over looptijd en opzegging leggen wij vooraf schriftelijk vast, zodat u weet waar u aan toe bent voordat u begint.',
      },
    ],
  },
];

/** Selectie voor de homepage: de meest gestelde vragen over werkwijze en tarieven. */
export const homeFaq: AccordionItem[] = [
  faqGroups[0].items[0],
  faqGroups[0].items[1],
  faqGroups[0].items[2],
  faqGroups[1].items[0],
  faqGroups[2].items[0],
  faqGroups[3].items[0],
  faqGroups[4].items[0],
  faqGroups[4].items[1],
];

/** Alle vragen plat — voor FAQPage structured data op /faq. */
export const allFaqItems: AccordionItem[] = faqGroups.flatMap((g) => g.items);
