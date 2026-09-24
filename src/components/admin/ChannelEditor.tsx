// lucide-react bevat geen merklogo's; we gebruiken neutrale iconen per kanaal.
import { Briefcase, Camera, Globe, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Field';
import { channelLabels } from '@/data/content-studio';
import { channels as allChannels, type Channel } from '@/lib/content/types';
import { cn } from '@/lib/cn';

const icons: Record<Channel, LucideIcon> = {
  website: Globe,
  linkedin: Briefcase,
  facebook: Users,
  instagram: Camera,
};

/* --- Tabbladen ------------------------------------------------------------------ */

interface ChannelTabsProps {
  active: Channel;
  onSelect: (channel: Channel) => void;
  /** Kanalen die voor deze content zijn gekozen; overige tabs krijgen een subtiele markering */
  selected: Channel[];
  /** Kanalen waarvoor al tekst bestaat */
  filled: Channel[];
}

export function ChannelTabs({ active, onSelect, selected, filled }: ChannelTabsProps) {
  return (
    <div role="tablist" aria-label="Kanalen" className="flex flex-wrap gap-1 border-b border-default">
      {allChannels.map((channel) => {
        const Icon = icons[channel];
        const isActive = channel === active;
        return (
          <button
            key={channel}
            type="button"
            role="tab"
            id={`tab-${channel}`}
            aria-selected={isActive}
            aria-controls={`panel-${channel}`}
            onClick={() => onSelect(channel)}
            className={cn(
              '-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:border-strong hover:text-text',
            )}
          >
            <Icon aria-hidden="true" className="size-4" />
            {channelLabels[channel]}
            {filled.includes(channel) && (
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-success"
                title="Tekst aanwezig"
              />
            )}
            {!selected.includes(channel) && (
              <span className="text-[0.65rem] font-normal text-subtle">(niet gekozen)</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* --- Formuliervelden per kanaal -------------------------------------------------- */

export interface WebsiteDraft {
  seoTitle: string;
  metaDescription: string;
  article: string;
  cta: string;
}

export interface SocialDraft {
  body: string;
  cta: string;
  /** Hashtags als komma-gescheiden tekst; wordt bij opslaan omgezet naar een lijst */
  hashtags: string;
}

interface WebsiteEditorProps {
  value: WebsiteDraft;
  onChange: (next: WebsiteDraft) => void;
}

export function WebsiteEditor({ value, onChange }: WebsiteEditorProps) {
  return (
    <div className="flex flex-col gap-5">
      <Input
        label="SEO-titel"
        name="seoTitle"
        value={value.seoTitle}
        onChange={(e) => onChange({ ...value, seoTitle: e.target.value })}
        hint={`${value.seoTitle.length}/60 tekens — kort en met het belangrijkste woord vooraan.`}
        maxLength={200}
        required={false}
      />
      <Textarea
        label="Meta description"
        name="metaDescription"
        rows={2}
        value={value.metaDescription}
        onChange={(e) => onChange({ ...value, metaDescription: e.target.value })}
        hint={`${value.metaDescription.length}/155 tekens — de omschrijving in Google.`}
        maxLength={400}
        required={false}
      />
      <Textarea
        label="Artikel"
        name="article"
        rows={16}
        value={value.article}
        onChange={(e) => onChange({ ...value, article: e.target.value })}
        hint="De volledige tekst. Spreek de lezer aan met 'u'."
        maxLength={20000}
        required={false}
      />
      <Textarea
        label="Call-to-action"
        name="cta"
        rows={2}
        value={value.cta}
        onChange={(e) => onChange({ ...value, cta: e.target.value })}
        hint="Wat wilt u dat de lezer doet?"
        maxLength={400}
        required={false}
      />
    </div>
  );
}

interface SocialEditorProps {
  channel: Channel;
  value: SocialDraft;
  onChange: (next: SocialDraft) => void;
}

const bodyLabels: Partial<Record<Channel, string>> = {
  linkedin: 'LinkedIn-post',
  facebook: 'Facebook-post',
  instagram: 'Instagram-caption',
};

export function SocialEditor({ channel, value, onChange }: SocialEditorProps) {
  return (
    <div className="flex flex-col gap-5">
      <Textarea
        label={bodyLabels[channel] ?? 'Bericht'}
        name="body"
        rows={10}
        value={value.body}
        onChange={(e) => onChange({ ...value, body: e.target.value })}
        hint={`${value.body.length} tekens`}
        maxLength={6000}
        required={false}
      />
      <Textarea
        label="Call-to-action"
        name="cta"
        rows={2}
        value={value.cta}
        onChange={(e) => onChange({ ...value, cta: e.target.value })}
        maxLength={400}
        required={false}
      />
      <Input
        label="Hashtags"
        name="hashtags"
        value={value.hashtags}
        onChange={(e) => onChange({ ...value, hashtags: e.target.value })}
        hint="Gescheiden door een komma, zonder #. Bijvoorbeeld: afas, administratie, mkb"
        maxLength={600}
        required={false}
      />
    </div>
  );
}
