import { Link } from 'react-router';
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  FileText,
  Loader2,
  PlusCircle,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { adminContentPath, adminRoutes } from '@/config/admin-routes';
import { channelLabels, contentTypeLabels } from '@/data/content-studio';
import { useContentList } from '@/lib/content/useContentList';
import { toCalendarEntries, type ContentItem } from '@/lib/content/types';

function formatDateTime(value: string | null): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('nl-NL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <Card padding="sm" className="flex flex-col gap-1">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-3xl font-semibold text-primary tabular-nums">{value}</span>
      {hint && <span className="text-xs text-subtle">{hint}</span>}
    </Card>
  );
}

function ItemRow({ item }: { item: ContentItem }) {
  return (
    <li className="flex flex-col gap-2 border-b border-default py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <Link
          to={adminContentPath(item.id)}
          className="block truncate font-medium text-text hover:text-primary"
        >
          {item.title}
        </Link>
        <p className="truncate text-sm text-muted">
          {contentTypeLabels[item.contentType]} · {item.audience}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="text-sm text-subtle">{formatDateTime(item.scheduledAt)}</span>
        <StatusBadge status={item.status} />
      </div>
    </li>
  );
}

export default function ContentDashboard() {
  const { state } = useContentList();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">MERIT Content Studio</p>
          <h1 className="text-2xl font-semibold text-text md:text-3xl">Contentdashboard</h1>
          <p className="mt-1 text-muted">Uw financiële partner in AFAS.</p>
        </div>
        <Button to={adminRoutes.nieuw} iconLeft={<PlusCircle aria-hidden="true" />}>
          Nieuwe content
        </Button>
      </header>

      {state.status === 'loading' && (
        <p className="flex items-center gap-2 text-sm text-muted">
          <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          Content laden…
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
        <>
          {!state.data.storage.persistent && (
            <Card padding="sm" className="border-warning/40 bg-warning-soft">
              <p className="flex items-start gap-2 text-sm text-warning">
                <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>
                  <strong className="font-semibold">Tijdelijke opslag.</strong> Er is nog geen
                  database gekoppeld, dus content kan verdwijnen wanneer de serverfunctie opnieuw
                  start. Koppel in Vercel een KV/Redis-store aan dit project om content blijvend te
                  bewaren.
                </span>
              </p>
            </Card>
          )}

          <section aria-labelledby="stats-heading" className="flex flex-col gap-3">
            <h2 id="stats-heading" className="text-sm font-semibold tracking-wide text-muted uppercase">
              Overzicht
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <StatTile label="Concepten" value={state.data.stats.drafts} hint="status DRAFT" />
              <StatTile
                label="Geplande posts"
                value={state.data.stats.scheduled}
                hint="status SCHEDULED"
              />
              <StatTile
                label="Gepubliceerd"
                value={state.data.stats.published}
                hint="status PUBLISHED"
              />
              <StatTile label="Totaal" value={state.data.stats.total} hint="alle content" />
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <StatTile label="Ter beoordeling" value={state.data.stats.review} />
              <StatTile label="Goedgekeurd" value={state.data.stats.approved} />
              <StatTile label="Mislukt" value={state.data.stats.failed} />
              <Card padding="sm" className="flex flex-col gap-1">
                <span className="text-sm text-muted">Koppelingen</span>
                <span className="flex items-center gap-1.5 text-sm text-text">
                  <Sparkles aria-hidden="true" className="size-4 text-accent-text" />
                  AI: {state.data.integrations.ai ? 'actief' : 'nog niet'}
                </span>
                <span className="text-xs text-subtle">
                  Social:{' '}
                  {Object.values(state.data.integrations.social).some(Boolean)
                    ? 'gedeeltelijk actief'
                    : 'nog niet gekoppeld'}
                </span>
              </Card>
            </div>
          </section>

          <section aria-labelledby="recent-heading" className="flex flex-col gap-3">
            <h2 id="recent-heading" className="flex items-center gap-2 text-lg font-semibold text-text">
              <FileText aria-hidden="true" className="size-5 text-primary" />
              Recente content
            </h2>
            {state.data.items.length === 0 ? (
              <Card padding="md" className="text-center">
                <p className="text-muted">
                  Er is nog geen content. Begin met{' '}
                  <Link to={adminRoutes.nieuw} className="font-medium text-primary underline">
                    nieuwe content
                  </Link>
                  .
                </p>
              </Card>
            ) : (
              <Card padding="sm">
                <ul className="flex flex-col">
                  {state.data.items.slice(0, 8).map((item) => (
                    <ItemRow key={item.id} item={item} />
                  ))}
                </ul>
              </Card>
            )}
          </section>

          <section aria-labelledby="upcoming-heading" className="flex flex-col gap-3">
            <h2
              id="upcoming-heading"
              className="flex items-center gap-2 text-lg font-semibold text-text"
            >
              <CalendarClock aria-hidden="true" className="size-5 text-primary" />
              Komende geplande content
            </h2>
            {(() => {
              const today = new Date().toISOString().slice(0, 10);
              const upcoming = toCalendarEntries(state.data.items)
                .filter((entry) => entry.date >= today && entry.status !== 'PUBLISHED')
                .slice(0, 8);
              if (upcoming.length === 0) {
                return (
                  <Card padding="md" className="text-center text-muted">
                    <p className="flex items-center justify-center gap-2">
                      <CheckCircle2 aria-hidden="true" className="size-4" />
                      Er staat niets ingepland.
                    </p>
                  </Card>
                );
              }
              return (
                <Card padding="sm">
                  <ul className="flex flex-col">
                    {upcoming.map((entry) => (
                      <li
                        key={`${entry.id}-${entry.channel}`}
                        className="flex flex-col gap-1 border-b border-default py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <Link
                            to={adminContentPath(entry.id)}
                            className="block truncate font-medium text-text hover:text-primary"
                          >
                            {entry.title}
                          </Link>
                          <p className="text-sm text-muted">{channelLabels[entry.channel]}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <span className="text-sm text-subtle tabular-nums">
                            {entry.date} {entry.time || ''}
                          </span>
                          <StatusBadge status={entry.status} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })()}
          </section>
        </>
      )}
    </div>
  );
}
