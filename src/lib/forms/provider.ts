/**
 * FORM PROVIDER ADAPTER
 * -----------------------------------------------------------------------------
 * Alle formulieren sturen hun gegevens via `submitForm()`. Welke provider dat
 * afhandelt bepaalt `VITE_FORM_PROVIDER` (zie .env.example):
 *
 *   mailto   (standaard) — opent het e-mailprogramma van de bezoeker met een
 *            voorgevulde e-mail naar info@meritadministratie.nl. Geen backend nodig.
 *
 *            ⚠ TIJDELIJKE OPLOSSING, geen definitieve productie-oplossing voor
 *            leadbeheer: de bezoeker moet de e-mail zelf nog versturen, er is geen
 *            bevestiging of logging, en op apparaten zonder ingesteld
 *            e-mailprogramma gebeurt er niets. Vervang dit vóór of kort na livegang
 *            door `webhook` (of een eigen provider hieronder).
 *
 *   webhook  — POST JSON naar VITE_FORM_ENDPOINT (Formspree, Make, Zapier, n8n,
 *            Brevo, HubSpot Forms API, Resend via serverless, eigen endpoint, …).
 *            Payload: zie `FormSubmission`.
 *
 * TOEKOMSTIGE INTEGRATIE (CRM / e-mailautomatisering):
 *   1. Implementeer `FormProvider` (bijv. `hubspotProvider`, `brevoProvider`).
 *   2. Registreer hem in `providers` hieronder onder een eigen naam.
 *   3. Zet VITE_FORM_PROVIDER=<naam> (+ eventueel VITE_FORM_ENDPOINT).
 *   De formuliercomponenten en validatie hoeven niet te wijzigen.
 *   Geheimen (API-keys) horen NIET in de frontend: gebruik een endpoint dat de
 *   sleutel server-side bewaart (Make/Zapier-webhook, serverless function, …).
 */
import { siteConfig } from '@/config/site';

export type FormKind = 'contact' | 'offerte' | 'kennismaking';

export interface FormSubmission {
  kind: FormKind;
  /** Gevalideerde velden (naam → waarde). Arrays zijn meervoudige keuzes. */
  data: Record<string, string | string[] | boolean | undefined>;
  /** Pagina waarvandaan is verzonden */
  page: string;
  submittedAt: string;
}

export type SubmitResult =
  | { ok: true; /** Bericht voor de bezoeker */ message?: string }
  | { ok: false; error: string };

export interface FormProvider {
  name: string;
  submit(submission: FormSubmission): Promise<SubmitResult>;
}

/* --- Helpers ---------------------------------------------------------------- */

const labels: Record<FormKind, string> = {
  contact: 'Contactformulier',
  offerte: 'Offerteaanvraag',
  kennismaking: 'Kennismaking',
};

function toPlainText(submission: FormSubmission): string {
  const lines = Object.entries(submission.data)
    .filter(([, v]) => v !== undefined && v !== '' && v !== false)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : String(v)}`);
  return [`${labels[submission.kind]} via ${submission.page}`, '', ...lines].join('\n');
}

/* --- Providers -------------------------------------------------------------- */

const mailtoProvider: FormProvider = {
  name: 'mailto',
  async submit(submission) {
    const subject = encodeURIComponent(`${labels[submission.kind]} — ${siteConfig.name}`);
    const body = encodeURIComponent(toPlainText(submission));
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
    return {
      ok: true,
      message:
        'Uw e-mailprogramma is geopend met een voorgevuld bericht. Verstuur de e-mail om uw aanvraag af te ronden.',
    };
  },
};

const webhookProvider: FormProvider = {
  name: 'webhook',
  async submit(submission) {
    const endpoint = siteConfig.forms.endpoint;
    if (!endpoint) {
      return { ok: false, error: 'Formulier-endpoint is niet geconfigureerd (VITE_FORM_ENDPOINT).' };
    }
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(submission),
      });
      if (!res.ok) return { ok: false, error: `Verzenden mislukt (status ${res.status}).` };
      return { ok: true };
    } catch {
      return { ok: false, error: 'Verzenden mislukt. Controleer uw verbinding en probeer het opnieuw.' };
    }
  },
};

const providers: Record<string, FormProvider> = {
  mailto: mailtoProvider,
  webhook: webhookProvider,
};

export function getFormProvider(): FormProvider {
  return providers[siteConfig.forms.provider] ?? mailtoProvider;
}

/** Eén ingang voor alle formulieren. */
export function submitForm(kind: FormKind, data: FormSubmission['data']): Promise<SubmitResult> {
  return getFormProvider().submit({
    kind,
    data,
    page: typeof window !== 'undefined' ? window.location.pathname : '',
    submittedAt: new Date().toISOString(),
  });
}
