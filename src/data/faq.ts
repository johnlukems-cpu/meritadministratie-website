import type { AccordionItem } from '@/components/ui/Accordion';

export interface FaqGroup {
  id: string;
  title: string;
  items: AccordionItem[];
}

/**
 * Veelgestelde vragen per onderwerp — pagina /faq. De homepage toont een selectie
 * (zie `homeFaq`). Antwoorden beschrijven uitsluitend werkzaamheden en afspraken die
 * MERIT daadwerkelijk kan uitvoeren; er worden geen resultaten of besparingen gegarandeerd.
 */
export const faqGroups: FaqGroup[] = [
  {
    id: 'samenwerking',
    title: 'Samenwerking en werkwijze',
    items: [
      {
        question: 'Voor welke organisaties werkt MERIT?',
        answer:
          'Wij ondersteunen in de eerste plaats Nederlandse administratie- en accountantskantoren met financiële backofficewerkzaamheden. Daarnaast ondersteunen wij mkb-ondernemingen met hun financiële administratie.',
      },
      {
        question: 'Werken jullie in onze eigen software en volgens onze procedures?',
        answer:
          'Ja. Wij werken binnen de software, de procedures en de werkafspraken van uw kantoor. Bij de start leggen wij samen vast hoe wordt aangeleverd, welke stappen wij uitvoeren en hoe wij terugkoppelen.',
      },
      {
        question: 'Hoe wordt vastgelegd wie waarvoor verantwoordelijk is?',
        answer:
          'Voorafgaand aan de samenwerking leggen wij schriftelijk vast welke werkzaamheden wij uitvoeren, welke werkzaamheden bij uw kantoor blijven en op welke momenten wordt gecontroleerd en afgestemd. De beoordeling, goedkeuring en indiening van aangiften en jaarstukken blijven bij de daartoe bevoegde verantwoordelijke partij, tenzij uitdrukkelijk anders overeengekomen.',
      },
      {
        question: 'Kunnen wij klein beginnen?',
        answer:
          'Ja. Veel kantoren starten met een beperkt aantal uren per maand of met één afgebakende opdracht. Zodra duidelijk is welke werkzaamheden goed overdraagbaar zijn, kunt u de omvang uitbreiden.',
      },
      {
        question: 'Hoe wordt teruggekoppeld wat is verwerkt?',
        answer:
          'Wij koppelen terug welke werkzaamheden zijn verwerkt en wat aandacht vraagt: ontbrekende documenten, afwijkingen en posten die een beoordeling van uw kantoor nodig hebben. De vorm en frequentie van die terugkoppeling spreken wij vooraf af.',
      },
      {
        question: 'Kunnen jullie ook bij piekbelasting worden ingezet?',
        answer:
          'Dat is een van de meest voorkomende redenen voor samenwerking. Rond btw-aangifteperioden en jaarafsluitingen kunt u extra capaciteit inzetten voor afgebakende werkzaamheden. Wij bespreken vooraf welke omvang haalbaar is binnen de gewenste doorlooptijd.',
      },
    ],
  },
  {
    id: 'uitbesteden',
    title: 'Werk uitbesteden',
    items: [
      {
        question: 'Welke werkzaamheden kunnen wij uitbesteden?',
        answer:
          'Onder andere het verwerken van inkoop- en verkoopfacturen en bankmutaties, debiteuren- en crediteurenbeheer, grootboekcontroles, het voorbereiden van btw-aangiften, het voorbereiden van jaarafsluitingen en balansdossiers, en het wegwerken van administratieve achterstanden.',
      },
      {
        question: 'Werken jullie ook aan administratieve achterstanden?',
        answer:
          'Ja. Het wegwerken van achterstanden is een afgebakende opdracht: wij bepalen eerst de omvang en de staat van de administratie en doen daarna een voorstel met een werkwijze en controlepunten.',
      },
      {
        question: 'Hoe worden documenten en gegevens aangeleverd?',
        answer:
          'Digitaal, op de manier die binnen uw kantoor gebruikelijk is: via uw eigen omgeving, een gedeelde map of rechtstreeks in de software waarin wordt gewerkt. Wij maken hierover bij de start praktische afspraken.',
      },
      {
        question: 'Blijft ons kantoor het aanspreekpunt voor de klant?',
        answer:
          'Ja, tenzij u daarover andere afspraken met ons maakt. Standaard werken wij op de achtergrond: uw kantoor houdt het klantcontact en wij verzorgen de overeengekomen werkzaamheden.',
      },
    ],
  },
  {
    id: 'btw',
    title: 'Btw-aangiften',
    items: [
      {
        question: 'Verzorgen jullie de volledige btw-aangifte?',
        answer:
          'Wij verzorgen de administratieve voorbereiding en verwerking: het controleren van btw-coderingen en btw-rekeningen, het aansluiten van de btw-administratie op het grootboek en het opstellen van de onderbouwing. De fiscale beoordeling, de goedkeuring en het indienen van de aangifte vinden plaats volgens de afspraken die wij met uw kantoor maken.',
      },
      {
        question: 'Wie controleert en dient de aangifte in?',
        answer:
          'Dat leggen wij per samenwerking vast. Standaard bereidt MERIT de aangifte voor en controleert en dient uw kantoor de aangifte in. Afwijkende afspraken zijn mogelijk en worden schriftelijk vastgelegd.',
      },
      {
        question: 'Kunnen jullie ICP-opgaven voorbereiden?',
        answer:
          'Ja. Wij kunnen de gegevens voor ICP-opgaven voorbereiden en de administratieve verwerking van intracommunautaire transacties controleren.',
      },
      {
        question: 'Kunnen jullie btw-boekingen uit eerdere perioden herstellen?',
        answer:
          'Ja. Wij kunnen btw-boekingen uit eerdere perioden controleren en herstellen en de bijbehorende aansluitingen en controledocumentatie voorbereiden. Dit is doorgaans een afgebakende opdracht met een eigen voorstel.',
      },
      {
        question: 'Hoe gaan jullie om met buitenlandse btw-vraagstukken?',
        answer:
          'Wij ondersteunen bij buitenlandse btw-vraagstukken binnen de overeengekomen deskundigheid en afbakening. Valt een vraagstuk daarbuiten, dan geven wij dat aan zodat uw kantoor of een specialist het kan beoordelen.',
      },
    ],
  },
  {
    id: 'jaarafsluiting',
    title: 'Jaarafsluiting en jaarrekeningen',
    items: [
      {
        question: 'Wat doen jullie precies rond de jaarafsluiting?',
        answer:
          'Wij verzorgen de administratieve voorbereiding: het controleren van grootboekrekeningen, het aansluiten van bankadministraties, het controleren van debiteuren, crediteuren en tussenrekeningen, het opstellen van specificaties van balansrekeningen en het voorbereiden van balansdossiers en aansluitingen.',
      },
      {
        question: 'Stellen jullie de jaarrekening op?',
        answer:
          'Wij kunnen ondersteunen bij het samenstellen van conceptjaarrekeningen, voor zover dat binnen de expertise en de opdracht valt. De verantwoordelijkheid voor de definitieve beoordeling en vaststelling ligt volgens de afspraken bij de bevoegde verantwoordelijke partij.',
      },
      {
        question: 'Voert MERIT wettelijke accountantscontroles uit?',
        answer:
          'Nee. MERIT is geen accountantsorganisatie die wettelijke controles uitvoert. Onze werkzaamheden betreffen administratieve voorbereiding, verwerking en controle, en zijn geen wettelijke controle of assurance.',
      },
      {
        question: 'Wat is het verschil tussen de administratieve jaarafsluiting en het samenstellen van een jaarrekening?',
        answer:
          'Bij de administratieve jaarafsluiting wordt de administratie controleerbaar en sluitend gemaakt: posten gecontroleerd, aansluitingen gemaakt en specificaties opgesteld. Het voorbereiden van een jaarrekening betreft het opbouwen van het dossier en de overzichten daarvoor. Het samenstellen van een jaarrekening is het opstellen van de jaarrekening zelf; een wettelijke accountantscontrole is een afzonderlijke, wettelijk geregelde opdracht.',
      },
    ],
  },
  {
    id: 'afas',
    title: 'AFAS en software',
    items: [
      {
        question: 'Werken jullie in AFAS?',
        answer:
          'Ja. Wij ondersteunen bij de financiële verwerking en bij workflows in AFAS, volgens de processen en werkafspraken van uw kantoor.',
      },
      {
        question: 'Is MERIT een gecertificeerd AFAS-partner?',
        answer:
          'Wij presenteren ons niet als officieel AFAS-partner en claimen geen certificering of modulespecifieke expertise. Wij geven vooraf aan welke werkzaamheden binnen onze aantoonbare deskundigheid vallen.',
      },
      {
        question: 'Kunnen jullie ook in andere software werken?',
        answer:
          'Dat bespreken wij per situatie. Bepalend is of de werkzaamheden binnen onze deskundigheid vallen en of wij binnen uw procedures kunnen werken. Wij geven vooraf aan wat haalbaar is.',
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
          'Wij werken met uurtarieven per type werkzaamheden en met maandelijkse urenbundels tegen een voordeliger effectief uurtarief. Projectmatige opdrachten en automatiseringsprojecten worden afzonderlijk geoffreerd. Alle tarieven zijn exclusief 21% btw.',
      },
      {
        question: 'Wat is het voordeel van een urenbundel?',
        answer:
          'Een urenbundel geeft u elke maand een vast aantal uren ondersteuning tegen een voordeliger effectief uurtarief, zodat de capaciteit beschikbaar is wanneer u die nodig heeft. De werkzaamheden binnen de bundel worden vooraf vastgelegd.',
      },
      {
        question: 'Wordt meerwerk automatisch uitgevoerd?',
        answer:
          'Nee. Meerwerk wordt vooraf met u besproken en pas na uw akkoord uitgevoerd.',
      },
      {
        question: 'Ontvangen wij vooraf een voorstel?',
        answer:
          'Ja. Na de kennismaking en inventarisatie ontvangt u een voorstel waarin de werkzaamheden, het tarief of de urenbundel, de verantwoordelijkheden en de controlemomenten staan.',
      },
    ],
  },
];

/** Selectie voor de homepage: de meest gestelde vragen over samenwerking en tarieven. */
export const homeFaq: AccordionItem[] = [
  faqGroups[0].items[0],
  faqGroups[0].items[1],
  faqGroups[0].items[3],
  faqGroups[1].items[0],
  faqGroups[2].items[0],
  faqGroups[3].items[0],
  faqGroups[5].items[0],
  faqGroups[5].items[1],
];

/** Alle vragen plat — voor FAQPage structured data op /faq. */
export const allFaqItems: AccordionItem[] = faqGroups.flatMap((g) => g.items);
