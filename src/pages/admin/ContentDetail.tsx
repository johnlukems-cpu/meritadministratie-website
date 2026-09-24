import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  AlertTriangle,
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  ClipboardCopy,
  Loader2,
  Info,
  Send,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CheckboxGroup, Input } from '@/components/ui/Field';
import { StatusBadge } from '@/components/admin/StatusBadge';
import {
  ChannelTabs,
  SocialEditor,
  WebsiteEditor,
  type SocialDraft,
  type WebsiteDraft,
} from '@/components/admin/ChannelEditor';
import { adminRoutes } from '@/config/admin-routes';
import { channelLabels, contentTypeLabels, SOCIAL_NOT_CONFIGURED } from '@/data/content-studio';
import { channelOptions } from '@/data/content-studio';
import { deleteContent, fetchContent, generateContent, updateContent } from '@/lib/content/api';
import type { PublishResultLine } from '@/lib/content/api';
import type { ContentUpdateValues } from '@/lib/content/schemas';
import {
  channels as allChannels,
  type Channel,
  type ContentItem,
  type ContentStatus,
} from '@/lib/content/types';

interface Draft {
  website: WebsiteDraft;
  linkedin: SocialDraft;
  facebook: SocialDraft;
  instagram: SocialDraft;
  date: string;
  time: string;
  channels: string[];
}

const emptySocial: SocialDraft = { body: '', cta: '', hashtags: '' };

function toDraft(item: ContentItem): Draft {
  const social = (post: ContentItem['linkedinContent']): SocialDraft =>
    post ? { body: post.body, cta: post.cta, hashtags: post.hashtags.join(', ') } : { ...emptySocial };
  return {
    website: item.websiteContent
      ? { ...item.websiteContent }
      : { seoTitle: '', metaDescription: '', article: '', cta: '' },
    linkedin: social(item.linkedinContent),
    facebook: social(item.facebookContent),
    instagram: social(item.instagramContent),
    date: item.schedule.date,
    time: item.schedule.time,
    channels: item.schedule.channels,
  };
}

const splitTags = (value: string): string[] =>
  value
    .split(',')
    .map((tag) => tag.replace(/^#/, '').trim())
    .filter(Boolean);

const socialOrNull = (draft: SocialDraft) =>
  draft.body.trim() || draft.cta.trim() || draft.hashtags.trim()
    ? { body: draft.body, cta: draft.cta, hashtags: splitTags(draft.hashtags) }
    : null;

function draftToPatch(draft: Draft): ContentUpdateValues {
  const website = draft.website;
  const websiteFilled =
    website.seoTitle.trim() || website.metaDescription.trim() || website.article.trim() || website.cta.trim();
  return {
    websiteContent: websiteFilled ? website : null,
    linkedinContent: socialOrNull(draft.linkedin),
    facebookContent: socialOrNull(draft.facebook),
    instagramContent: socialOrNull(draft.instagram),
    publicationDate: draft.date,
    publicationTime: draft.time,
    channels: draft.channels as Channel[],
  };
}

function filledChannels(item: ContentItem): Channel[] {
  return allChannels.filter((channel) => {
    if (channel === 'website') return Boolean(item.websiteContent);
    if (channel === 'linkedin') return Boolean(item.linkedinContent);
    if (channel === 'facebook') return Boolean(item.facebookContent);
    return Boolean(item.instagramContent);
  });
}

type Notice = { tone: 'info' | 'success' | 'error'; text: string; results?: PublishResultLine[] } | null;

export default function ContentDetail() {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState<ContentItem | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [active, setActive] = useState<Channel>('website');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [brief, setBrief] = useState<{ system: string; user: string } | null>(null);

  // Item laden. De status wordt pas in de promise-callback gezet, niet synchroon
  // in de effect-body (react-hooks/set-state-in-effect).
  useEffect(() => {
    let cancelled = false;
    void fetchContent(id).then((result) => {
      if (cancelled) return;
      if (result.ok) {
        setItem(result.data.item);
        setDraft(toDraft(result.data.item));
        setLoadError(null);
      } else {
        setLoadError(result.error);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const save = async (status?: ContentStatus) => {
    if (!draft || busy) return;
    setBusy(true);
    setNotice(null);
    const patch: ContentUpdateValues = { ...draftToPatch(draft) };
    if (status) patch.status = status;
    const result = await updateContent(id, patch);
    setBusy(false);

    if (!result.ok) {
      setNotice({ tone: 'error', text: result.error });
      return;
    }

    setItem(result.data.item);
    setDraft(toDraft(result.data.item));

    if (status === 'PUBLISHED') {
      setNotice({
        tone: result.data.published ? 'success' : 'info',
        text: result.data.message ?? SOCIAL_NOT_CONFIGURED,
        results: result.data.results,
      });
      return;
    }
    setNotice({ tone: 'success', text: status ? `Status bijgewerkt naar ${status}.` : 'Opgeslagen.' });
  };

  const generate = async () => {
    if (busy || !draft) return;
    setBusy(true);
    setNotice(null);
    setBrief(null);
    const result = await generateContent(id, draft.channels as Channel[]);
    setBusy(false);

    if (result.ok) {
      setItem(result.data.item);
      setDraft(toDraft(result.data.item));
      setNotice({ tone: 'success', text: 'Content gegenereerd.' });
      return;
    }
    const payload = result.payload as { brief?: { system: string; user: string } } | undefined;
    if (payload?.brief) setBrief(payload.brief);
    setNotice({ tone: 'info', text: result.error });
  };

  const remove = async () => {
    if (busy) return;
    const confirmed = window.confirm('Weet u zeker dat u deze content definitief wilt verwijderen?');
    if (!confirmed) return;
    setBusy(true);
    const result = await deleteContent(id);
    setBusy(false);
    if (result.ok) void navigate(adminRoutes.dashboard);
    else setNotice({ tone: 'error', text: result.error });
  };

  const copyBrief = () => {
    if (!brief) return;
    void navigator.clipboard
      ?.writeText(`${brief.system}\n\n---\n\n${brief.user}`)
      .then(() => setNotice({ tone: 'success', text: 'Briefing gekopieerd naar het klembord.' }))
      .catch(() => setNotice({ tone: 'error', text: 'Kopiëren is niet gelukt.' }));
  };

  if (loadError) {
    return (
      <Card padding="md" className="border-error/40 bg-error-soft">
        <p className="flex items-center gap-2 text-sm font-medium text-error">
          <AlertTriangle aria-hidden="true" className="size-4" />
          {loadError}
        </p>
        <Button to={adminRoutes.dashboard} variant="outline" size="sm" className="mt-4">
          Terug naar dashboard
        </Button>
      </Card>
    );
  }

  if (!item || !draft) {
    return (
      <p className="flex items-center gap-2 text-sm text-muted">
        <Loader2 aria-hidden="true" className="size-4 animate-spin" />
        Content laden…
      </p>
    );
  }

  const noticeStyles: Record<'info' | 'success' | 'error', string> = {
    info: 'border-accent/40 bg-accent-soft text-accent-text',
    success: 'border-success/40 bg-success-soft text-success',
    error: 'border-error/40 bg-error-soft text-error',
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <Button
          to={adminRoutes.dashboard}
          variant="ghost"
          size="sm"
          className="self-start px-0"
          iconLeft={<ArrowLeft aria-hidden="true" />}
        >
          Terug naar dashboard
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-text md:text-3xl">{item.title}</h1>
            <p className="mt-1 text-muted">
              {contentTypeLabels[item.contentType]} · {item.audience} · doel: {item.goal}
            </p>
            <p className="mt-1 text-sm text-subtle">{item.topic}</p>
          </div>
          <StatusBadge status={item.status} showCode className="shrink-0" />
        </div>
      </header>

      {notice && (
        <Card padding="sm" className={noticeStyles[notice.tone]}>
          <p className="flex items-start gap-2 text-sm font-medium">
            {notice.tone === 'success' ? (
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            ) : (
              <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            )}
            <span>{notice.text}</span>
          </p>
          {notice.results && notice.results.length > 0 && (
            <ul className="mt-2 space-y-1 pl-6 text-sm">
              {notice.results.map((line) => (
                <li key={line.channel}>
                  <strong>{channelLabels[line.channel]}:</strong> {line.message}
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {/* Acties */}
      <Card padding="sm">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={() => void save('DRAFT')} disabled={busy}>
            Opslaan als concept
          </Button>
          <Button size="sm" variant="outline" onClick={() => void save('REVIEW')} disabled={busy}>
            Ter beoordeling
          </Button>
          <Button size="sm" variant="outline" onClick={() => void save('APPROVED')} disabled={busy}>
            Goedkeuren
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => void save('SCHEDULED')}
            disabled={busy || !draft.date}
            iconLeft={<CalendarClock aria-hidden="true" />}
          >
            Inplannen
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => void save('PUBLISHED')}
            disabled={busy}
            iconLeft={<Send aria-hidden="true" />}
          >
            Publiceren
          </Button>
          <span className="mx-1 hidden h-6 w-px bg-default sm:inline-block" />
          <Button
            size="sm"
            variant="ghost"
            onClick={() => void generate()}
            disabled={busy}
            iconLeft={<Sparkles aria-hidden="true" />}
          >
            Genereer met AI
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => void remove()}
            disabled={busy}
            className="ml-auto text-error hover:bg-error-soft"
            iconLeft={<Trash2 aria-hidden="true" />}
          >
            Verwijderen
          </Button>
        </div>
        {!draft.date && (
          <p className="mt-2 text-xs text-subtle">
            Inplannen kan zodra er een publicatiedatum is ingevuld (zie Planning hieronder).
          </p>
        )}
      </Card>

      {/* Briefing bij nog niet gekoppelde AI-provider */}
      {brief && (
        <Card padding="md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-text">Briefing</h2>
              <p className="text-sm text-muted">
                Deze briefing gaat straks automatisch naar de AI-provider. U kunt hem nu al
                gebruiken om de teksten te (laten) schrijven.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={copyBrief}
              iconLeft={<ClipboardCopy aria-hidden="true" />}
            >
              Kopiëren
            </Button>
          </div>
          <pre className="mt-4 max-h-80 overflow-auto rounded-md bg-surface-alt p-4 text-xs whitespace-pre-wrap text-muted">
            {brief.system}
            {'\n\n---\n\n'}
            {brief.user}
          </pre>
        </Card>
      )}

      {/* Planning */}
      <Card padding="md">
        <h2 className="mb-4 text-lg font-semibold text-text">Planning</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Publicatiedatum"
            name="publicationDate"
            type="date"
            required={false}
            value={draft.date}
            onChange={(e) => setDraft({ ...draft, date: e.target.value })}
          />
          <Input
            label="Publicatietijd"
            name="publicationTime"
            type="time"
            required={false}
            value={draft.time}
            onChange={(e) => setDraft({ ...draft, time: e.target.value })}
          />
        </div>
        <div className="mt-5">
          <CheckboxGroup
            legend="Kanalen"
            name="channels"
            options={channelOptions}
            value={draft.channels}
            onChange={(next) => setDraft({ ...draft, channels: next })}
          />
        </div>
      </Card>

      {/* Content per kanaal */}
      <Card padding="md">
        <h2 className="mb-4 text-lg font-semibold text-text">Content per kanaal</h2>
        <ChannelTabs
          active={active}
          onSelect={setActive}
          selected={draft.channels as Channel[]}
          filled={filledChannels(item)}
        />
        <div
          id={`panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className="pt-6"
        >
          {active === 'website' ? (
            <WebsiteEditor
              value={draft.website}
              onChange={(website) => setDraft({ ...draft, website })}
            />
          ) : (
            <SocialEditor
              channel={active}
              value={draft[active]}
              onChange={(next) => setDraft({ ...draft, [active]: next })}
            />
          )}
        </div>
      </Card>

      {/* Tijdlijn */}
      {item.history.length > 0 && (
        <Card padding="md">
          <h2 className="mb-3 text-lg font-semibold text-text">Tijdlijn</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {item.history.map((event, index) => (
              <li key={`${event.at}-${index}`} className="flex flex-wrap gap-2 text-muted">
                <span className="tabular-nums text-subtle">
                  {new Date(event.at).toLocaleString('nl-NL', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <span className="font-medium text-text">{event.event}</span>
                <span>{event.detail}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
