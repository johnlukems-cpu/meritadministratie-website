import type { AccordionItem } from '@/components/ui/Accordion';

export interface FaqGroup {
  id: string;
  title: string;
  items: AccordionItem[];
}

/** Veelgestelde vragen per onderwerp — pagina /faq. Homepage toont een selectie. */
export const faqGroups: FaqGroup[] = [
  {
    id: 'algemeen',
    title: 'Algemeen',
    items: [
      {
        question: 'Voor welke ondernemers is MERIT Administratie & Advies geschikt?',
        answer:
          'Wij werken voor zzp’ers, eenmanszaken, startende ondernemers, kleine ondernemingen, MKB-bedrijven en bv’s. Of u nu net begint of al jaren onderneemt: wij stemmen onze dienstverlening af op uw situatie en de omvang van uw administratie.',
      },
      {
        question: 'Kan ik eerst vrijblijvend kennismaken?',
        answer:
          'Zeker. In een kort kennismakingsgesprek bespreken wij uw situatie en wensen en leggen wij uit hoe wij werken. U zit nergens aan vast.',
      },
      {
        question: 'Kan ik mijn volledige administratie uitbesteden?',
        answer:
          'Dat kan. U deelt uw facturen en bonnen digitaal met ons; wij verwerken de administratie in AFAS, verzorgen de aangiften en houden u op de hoogte. Wilt u een deel zelf blijven doen, dan is dat ook mogelijk.',
      },
      {
        question: 'Hoe deel ik mijn facturen en bonnen met jullie?',
        answer:
          'Digitaal: per e-mail, via een gedeelde omgeving of rechtstreeks in AFAS. Wij maken hierover bij de start praktische afspraken, zodat het aanleveren u zo min mogelijk tijd kost.',
      },
    ],
  },
  {
    id: 'tarieven',
    title: 'Pakketten en tarieven',
    items: [
      {
        question: 'Wat kost een administratie bij MERIT?',
        answer:
          'Onze pakketten beginnen bij € 125 per maand (MERIT Start) en lopen op tot € 950+ per maand voor een volledige externe financiële afdeling (MERIT Finance). Alle bedragen zijn vanaf-tarieven en exclusief 21% btw. Het definitieve tarief hangt af van het aantal mutaties, administraties, medewerkers en de gewenste dienstverlening.',
      },
      {
        question: 'Wat is een mutatie?',
        answer:
          'Een mutatie is een boeking in uw administratie, bijvoorbeeld een inkoopfactuur, een verkoopfactuur of een bankregel. Het aantal mutaties per maand bepaalt grotendeels de omvang van het werk en daarmee het tarief.',
      },
      {
        question: 'Zit de jaarrekening in het pakket?',
        answer:
          'Bij het instappakket vanaf € 125 per maand is de jaarlijkse jaarafsluiting/jaarrekening niet automatisch inbegrepen; deze kan als aanvullende dienst worden toegevoegd. Bij MERIT Finance is jaarwerk onderdeel van het pakket. Zo blijft het instaptarief laag en het pakket schaalbaar.',
      },
      {
        question: 'Zijn de prijzen inclusief btw?',
        answer: 'Nee. Alle genoemde prijzen zijn exclusief 21% btw.',
      },
    ],
  },
  {
    id: 'aangiften',
    title: 'Aangiften',
    items: [
      {
        question: 'Kunnen jullie mijn btw-aangifte verzorgen?',
        answer:
          'Ja. Wij bereiden uw btw-aangifte voor op basis van de verwerkte administratie, stemmen deze met u af en dienen de aangifte tijdig in. Ook de ICP-opgaaf voor leveringen binnen de EU nemen wij mee.',
      },
      {
        question: 'Verzorgen jullie ook de aangifte inkomstenbelasting en vennootschapsbelasting?',
        answer:
          'Ja. De IB-aangifte voor ondernemers en dga’s en de vpb-aangifte voor bv’s bereiden wij voor op basis van het jaarwerk en stemmen wij met u af voordat ze worden ingediend.',
      },
      {
        question: 'Geven jullie ook fiscaal advies?',
        answer:
          'Onze kern is de administratieve verwerking en het voorbereiden van aangiften. Waar wij mogelijkheden of aandachtspunten zien, benoemen wij die. Voor specifieke fiscale vraagstukken stemmen wij met u af of aanvullend advies nodig is.',
      },
    ],
  },
  {
    id: 'afas',
    title: 'AFAS',
    items: [
      {
        question: 'Moet ik AFAS gebruiken om klant te worden?',
        answer:
          'Wij werken met AFAS en zetten daar uw administratie in op. Werkt u nog niet met AFAS, dan helpen wij u bij de inrichting of de overstap. Zo profiteert u van één professionele, veilige omgeving waarin uw cijfers altijd actueel zijn.',
      },
      {
        question: 'Wat is een AFAS Quick Scan?',
        answer:
          'Een beknopte beoordeling van uw huidige AFAS-inrichting: wat werkt goed, waar zit dubbel werk en welke verbeteringen zijn mogelijk. U ontvangt een overzicht met concrete aanbevelingen. De Quick Scan is een eenmalige dienst vanaf € 350.',
      },
      {
        question: 'Kunnen jullie helpen bij het overstappen naar AFAS?',
        answer:
          'Ja. Wij begeleiden de overstap van uw huidige pakket naar AFAS: van inventarisatie en inrichting tot het overzetten van gegevens en de eerste periode werken. De inrichting en de overstap naar AFAS zijn kosteloos; u betaalt alleen voor aanvullende ondersteuning, zoals begeleiding, training of een Quick Scan.',
      },
    ],
  },
  {
    id: 'overstappen',
    title: 'Overstappen van boekhouder',
    items: [
      {
        question: 'Kan ik overstappen vanaf mijn huidige boekhouder?',
        answer:
          'Ja. Overstappen kan op elk moment, al is de start van een nieuw kwartaal of boekjaar vaak het meest praktisch. Wij stemmen de overdracht met u af en vragen de benodigde gegevens op, zodat u er zelf weinig werk aan heeft.',
      },
      {
        question: 'Hoe werkt een overstap van boekhouder?',
        answer:
          'Na uw akkoord nemen wij contact op met uw huidige boekhouder en vragen wij de administratie en relevante stukken op. Wij controleren de overgenomen gegevens, richten de administratie in AFAS in en nemen de werkzaamheden vanaf de afgesproken datum over.',
      },
      {
        question: 'Wat als mijn administratie niet helemaal op orde is?',
        answer:
          'Dat komt vaker voor en is geen probleem. Wij bekijken wat er ontbreekt of niet klopt en brengen de administratie in overleg met u op orde.',
      },
    ],
  },
];

/** Selectie voor de homepage */
export const homeFaq: AccordionItem[] = [
  faqGroups[0].items[0],
  faqGroups[1].items[0],
  faqGroups[3].items[0],
  faqGroups[4].items[0],
  faqGroups[0].items[2],
  faqGroups[2].items[0],
  faqGroups[0].items[1],
];

/** Alle vragen plat (voor FAQPage structured data) */
export const allFaq: AccordionItem[] = faqGroups.flatMap((g) => g.items);
