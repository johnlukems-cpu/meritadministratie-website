import type { LucideIcon } from 'lucide-react';
import {
  AlarmClock,
  CalendarClock,
  ClipboardCheck,
  Layers,
  MessageSquareWarning,
  UserMinus,
  Users,
} from 'lucide-react';

export interface Challenge {
  title: string;
  description: string;
  icon: LucideIcon;
}

/**
 * Herkenbare uitdagingen bij administratie- en accountantskantoren.
 * Sectie "Meer werk, dezelfde capaciteit?" op de homepage en op de kantorenpagina.
 *
 * Dit zijn situaties die wij bij kantoren tegenkomen; er worden geen uitspraken gedaan
 * over aantallen, marktcijfers of resultaten.
 */
export const challenges: Challenge[] = [
  {
    title: 'Een groeiende werkvoorraad',
    description:
      'Het werk neemt toe, maar de bezetting blijft gelijk. Nieuwe opdrachten vragen capaciteit die er op dat moment niet is.',
    icon: Layers,
  },
  {
    title: 'Achterstanden in administraties',
    description:
      'Een aantal dossiers loopt achter. Het inhalen kost tijd die ten koste gaat van het lopende werk.',
    icon: CalendarClock,
  },
  {
    title: 'Drukte rond btw-aangiften',
    description:
      'Elke aangifteperiode komt er een piek bij: controleren, aansluiten en op tijd aanleveren voor een groot aantal administraties.',
    icon: AlarmClock,
  },
  {
    title: 'Piekbelasting tijdens jaarafsluitingen',
    description:
      'In het jaarwerkseizoen moet veel tegelijk gebeuren: controleren, specificeren en dossiers opbouwen.',
    icon: ClipboardCheck,
  },
  {
    title: 'Tekort aan personeel',
    description:
      'Geschikte medewerkers zijn moeilijk te vinden. Een vacature openhouden betekent dat het werk ergens anders terechtkomt.',
    icon: UserMinus,
  },
  {
    title: 'Te weinig tijd voor klantadvies',
    description:
      'De uitvoerende werkzaamheden vragen zoveel aandacht dat er weinig ruimte overblijft voor het gesprek met de klant.',
    icon: Users,
  },
  {
    title: 'Veel handmatige controles',
    description:
      'Terugkerende controles worden nog grotendeels met de hand gedaan, terwijl ze deels te standaardiseren zijn.',
    icon: MessageSquareWarning,
  },
];

export const challengesConclusion =
  'MERIT helpt uw kantoor om werkzaamheden flexibel uit te besteden en de beschikbare capaciteit beter te benutten.';
