import type { LucideIcon } from 'lucide-react';
import {
  AlarmClock,
  CalendarClock,
  ClipboardCheck,
  FileQuestion,
  Receipt,
  TrendingUp,
} from 'lucide-react';

export interface Challenge {
  title: string;
  description: string;
  icon: LucideIcon;
}

/**
 * Herkenbare situaties bij zzp’ers en mkb-ondernemers rond hun administratie.
 * Sectie op de homepage en op de doelgroeppagina's.
 *
 * Dit zijn situaties die wij in de praktijk tegenkomen; er worden geen uitspraken
 * gedaan over aantallen, marktcijfers of resultaten.
 */
export const challenges: Challenge[] = [
  {
    title: 'De administratie blijft liggen',
    description:
      'Facturen en bonnen stapelen zich op. Het werk voor uw klanten gaat voor, en de boekhouding schuift steeds een week op.',
    icon: CalendarClock,
  },
  {
    title: 'Btw-aangifte schiet er bijna doorheen',
    description:
      'Elk kwartaal moet de aangifte er weer zijn. Het verzamelen en controleren kost tijd die u op dat moment niet had ingepland.',
    icon: AlarmClock,
  },
  {
    title: 'Geen scherp beeld van uw cijfers',
    description:
      'U weet wat er op de rekening staat, maar niet precies wat u hebt verdiend, wat er nog binnenkomt en wat u opzij moet zetten.',
    icon: TrendingUp,
  },
  {
    title: 'Facturen die te lang openstaan',
    description:
      'Er staat geld open, maar het bijhouden en opvolgen van openstaande facturen komt er telkens niet van.',
    icon: Receipt,
  },
  {
    title: 'Spanning rond de jaarafsluiting',
    description:
      'Aan het einde van het boekjaar blijkt pas wat er ontbreekt. Het achteraf verzamelen van stukken kost onnodig veel tijd.',
    icon: ClipboardCheck,
  },
  {
    title: 'Twijfel of het klopt',
    description:
      'U doet uw best, maar weet niet zeker of alles goed is verwerkt en of u iets over het hoofd ziet.',
    icon: FileQuestion,
  },
];

export const challengesConclusion =
  'MERIT neemt deze werkzaamheden van u over, zodat uw administratie bij is en u weet waar u staat.';
