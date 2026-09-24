import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { AlertTriangle, ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CheckboxGroup, Input, Select, Textarea } from '@/components/ui/Field';
import { adminContentPath, adminRoutes } from '@/config/admin-routes';
import {
  audienceSuggestions,
  channelOptions,
  contentTypeOptions,
  goalOptions,
} from '@/data/content-studio';
import { createContent } from '@/lib/content/api';
import { contentCreateSchema } from '@/lib/content/schemas';
import type { Channel } from '@/lib/content/types';

type Errors = Record<string, string | undefined>;

export default function ContentNew() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<string[]>(['website', 'linkedin']);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);

    const values = {
      title: String(data.get('title') ?? ''),
      topic: String(data.get('topic') ?? ''),
      audience: String(data.get('audience') ?? ''),
      contentType: String(data.get('contentType') ?? ''),
      goal: String(data.get('goal') ?? ''),
      extraInstructions: String(data.get('extraInstructions') ?? ''),
      publicationDate: String(data.get('publicationDate') ?? ''),
      publicationTime: String(data.get('publicationTime') ?? ''),
      channels: channels as Channel[],
    };

    const parsed = contentCreateSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? 'form');
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setFormError(null);
      form.querySelector<HTMLElement>(`[name="${Object.keys(fieldErrors)[0]}"]`)?.focus();
      return;
    }

    setErrors({});
    setFormError(null);
    setBusy(true);
    const result = await createContent(parsed.data);
    setBusy(false);

    if (result.ok) {
      void navigate(adminContentPath(result.data.item.id));
      return;
    }
    if (result.issues) setErrors(result.issues);
    setFormError(result.error);
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <Button to={adminRoutes.dashboard} variant="ghost" size="sm" className="self-start px-0" iconLeft={<ArrowLeft aria-hidden="true" />}>
          Terug naar dashboard
        </Button>
        <h1 className="text-2xl font-semibold text-text md:text-3xl">Nieuwe content</h1>
        <p className="text-muted">
          Vul de briefing in. De teksten per kanaal maakt u daarna in de contentweergave.
        </p>
      </header>

      <Card padding="lg">
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
          <Input
            label="Titel"
            name="title"
            required
            error={errors.title}
            hint="Werktitel voor intern gebruik; de SEO-titel maakt u later per kanaal."
            maxLength={160}
          />

          <Textarea
            label="Onderwerp"
            name="topic"
            required
            rows={3}
            error={errors.topic}
            hint="Waar gaat de content over? Wees concreet."
            maxLength={300}
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Doelgroep"
              name="audience"
              required
              list="audience-suggestions"
              error={errors.audience}
              hint="Voor wie schrijft u dit?"
              maxLength={120}
            />
            <datalist id="audience-suggestions">
              {audienceSuggestions.map((suggestion) => (
                <option key={suggestion} value={suggestion} />
              ))}
            </datalist>

            <Select
              label="Contenttype"
              name="contentType"
              required
              options={contentTypeOptions}
              error={errors.contentType}
              placeholder="Kies een contenttype"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Gewenste publicatiedatum"
              name="publicationDate"
              type="date"
              required={false}
              error={errors.publicationDate}
              hint="Leeg laten kan; u kunt later inplannen."
            />
            <Input
              label="Gewenste publicatietijd"
              name="publicationTime"
              type="time"
              required={false}
              error={errors.publicationTime}
              hint="24-uursnotatie, bijvoorbeeld 09:00."
            />
          </div>

          <Select
            label="Doel van de content"
            name="goal"
            required
            options={goalOptions}
            error={errors.goal}
            placeholder="Kies een doel"
          />

          <CheckboxGroup
            legend="Kanalen"
            name="channels"
            required
            options={channelOptions}
            value={channels}
            onChange={setChannels}
            error={errors.channels}
            hint="Voor welke kanalen maakt u deze content?"
          />

          <Textarea
            label="Extra instructies"
            name="extraInstructions"
            rows={4}
            error={errors.extraInstructions}
            hint="Bijvoorbeeld: leg de nadruk op de kosteloze overstap naar AFAS."
            maxLength={2000}
          />

          {formError && (
            <p role="alert" className="flex items-center gap-2 text-sm font-medium text-error">
              <AlertTriangle aria-hidden="true" className="size-4" />
              {formError}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" disabled={busy} iconLeft={<Save aria-hidden="true" />}>
              {busy ? 'Opslaan…' : 'Opslaan als concept'}
            </Button>
            <Button to={adminRoutes.dashboard} variant="outline">
              Annuleren
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
