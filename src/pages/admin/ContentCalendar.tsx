import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { AlertTriangle, CalendarDays, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { adminContentPath } from '@/config/admin-routes';
import { channelLabels } from '@/data/content-studio';
import { useContentList } from '@/lib/content/useContentList';
import { toCalendarEntries, type CalendarEntry } from '@/lib/content/types';

const monthNames = [
  'januari',
  'februari',
  'maart',
  'april',
  'mei',
  'juni',
  'juli',
  'augustus',
  'september',
  'oktober',
  'november',
  'december',
];

/** YYYY-MM van een datum. */
function monthKey(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

export default function ContentCalendar() {
  const { state } = useContentList();
  const today = new Date();
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const entries: CalendarEntry[] = useMemo(
    () => (state.status === 'ready' ? toCalendarEntries(state.data.items) : []),
    [state],
  );

  const key = monthKey(cursor.year, cursor.month);
  const monthEntries = entries.filter((entry) => entry.date.startsWith(key));

  /** Alle dagen van de maand die minstens één geplande post hebben, op volgorde. */
  const byDay = useMemo(() => {
    const map = new Map<string, CalendarEntry[]>();
    for (const entry of monthEntries) {
      const list = map.get(entry.date) ?? [];
      list.push(entry);
      map.set(entry.date, list);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [monthEntries]);

  const shift = (delta: number) => {
    const date = new Date(cursor.year, cursor.month + delta, 1);
    setCursor({ year: date.getFullYear(), month: date.getMonth() });
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">MERIT Content Studio</p>
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-text md:text-3xl">
            <CalendarDays aria-hidden="true" className="size-6 text-primary" />
            Contentkalender
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => shift(-1)} aria-label="Vorige maand">
            <ChevronLeft aria-hidden="true" className="size-4" />
          </Button>
          <span className="min-w-40 text-center font-medium text-text">
            {monthNames[cursor.month]} {cursor.year}
          </span>
          <Button size="sm" variant="outline" onClick={() => shift(1)} aria-label="Volgende maand">
            <ChevronRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </header>

      {state.status === 'loading' && (
        <p className="flex items-center gap-2 text-sm text-muted">
          <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          Kalender laden…
        </p>
      )}

      {state.status === 'error' && (
        <Card padding="sm" className="border-error/40 bg-error-soft">
          <p className="flex items-center gap-2 text-sm font-medium text-error">
            <AlertTriangle aria-hidden="true" className="size-4" />
            {state.error}
          </p>
        </Card>
      )}

      {state.status === 'ready' && (
        <Card padding="sm">
          {byDay.length === 0 ? (
            <p className="px-2 py-6 text-center text-muted">
              Er staat niets ingepland in {monthNames[cursor.month]} {cursor.year}.
            </p>
          ) : (
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">
                Geplande content in {monthNames[cursor.month]} {cursor.year}
              </caption>
              <thead>
                <tr className="border-b border-default text-left text-xs tracking-wide text-muted uppercase">
                  <th scope="col" className="px-2 py-2 font-semibold">
                    Datum
                  </th>
                  <th scope="col" className="px-2 py-2 font-semibold">
                    Tijd
                  </th>
                  <th scope="col" className="px-2 py-2 font-semibold">
                    Titel
                  </th>
                  <th scope="col" className="px-2 py-2 font-semibold">
                    Kanaal
                  </th>
                  <th scope="col" className="px-2 py-2 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {byDay.map(([date, dayEntries]) =>
                  dayEntries.map((entry, index) => (
                    <tr key={`${date}-${entry.id}-${entry.channel}`} className="border-b border-default last:border-b-0">
                      <td className="px-2 py-3 align-top tabular-nums text-muted">
                        {index === 0 ? date : ''}
                      </td>
                      <td className="px-2 py-3 align-top tabular-nums text-muted">
                        {entry.time || '—'}
                      </td>
                      <td className="px-2 py-3 align-top">
                        <Link
                          to={adminContentPath(entry.id)}
                          className="font-medium text-text hover:text-primary"
                        >
                          {entry.title}
                        </Link>
                      </td>
                      <td className="px-2 py-3 align-top text-muted">
                        {channelLabels[entry.channel]}
                      </td>
                      <td className="px-2 py-3 align-top">
                        <StatusBadge status={entry.status} />
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          )}
        </Card>
      )}
    </div>
  );
}
