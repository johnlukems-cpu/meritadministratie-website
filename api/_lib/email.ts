/**
 * E-mailopbouw en -verzending via Resend (server-side, alleen gebruikt door api/contact.ts).
 * Bestanden in api/_lib/ worden door Vercel NIET als losse functies gedeployed.
 */

import {
  branches,
  gewensteDiensten,
  gewensteOndersteuning,
  huidigeSituaties,
  kennismakingDiensten,
  offerteDiensten,
  organisatieTypes,
  rechtsvormen,
  startMomenten,
  urenPerMaand,
} from '../../src/data/forms.js'; // expliciete .js-extensie verplicht (ESM/nodenext, zie api/contact.ts)

export type FormKind = 'contact' | 'offerte' | 'kennismaking';

/** Keuzewaarden (bijv. 'afas') → leesbare labels, per veld */
const optionLabels: Record<string, Map<string, string>> = {
  organisatieType: new Map(organisatieTypes.map((o) => [o.value, o.label])),
  // Het contactformulier en het kennismakingsformulier gebruiken deels andere lijsten;
  // beide waarden moeten een leesbaar label krijgen, dus de lijsten worden samengevoegd.
  gewensteDienst: new Map(
    [...gewensteDiensten, ...kennismakingDiensten, ...offerteDiensten].map((o) => [
      o.value,
      o.label,
    ]),
  ),
  urenPerMaand: new Map(urenPerMaand.map((o) => [o.value, o.label])),
  gewensteStart: new Map(startMomenten.map((o) => [o.value, o.label])),
  rechtsvorm: new Map(rechtsvormen.map((o) => [o.value, o.label])),
  branche: new Map(branches.map((o) => [o.value, o.label])),
  huidigeSituatie: new Map(huidigeSituaties.map((o) => [o.value, o.label])),
  gewensteOndersteuning: new Map(gewensteOndersteuning.map((o) => [o.value, o.label])),
};

export const SITE_NAME = 'MERIT Administratie & Advies';
export const SITE_DOMAIN = 'meritadministratie.nl';
export const TAGLINE = 'Wij regelen de cijfers, u realiseert de groei.';
export const TAGLINE_POSITIONERING =
  'Uw financiële administratie, btw en jaarrekening in vertrouwde handen.';

/** Onderwerpregel van de interne melding, per formulier */
export const internalSubjects: Record<FormKind, string> = {
  contact: `Nieuwe contactaanvraag via ${SITE_DOMAIN}`,
  offerte: `Nieuwe offerteaanvraag via ${SITE_DOMAIN}`,
  kennismaking: `Nieuwe kennismakingsaanvraag via ${SITE_DOMAIN}`,
};

/** Onderwerpregel van de bevestiging aan de bezoeker */
export const confirmationSubject = `Bedankt voor uw bericht aan ${SITE_NAME}`;

/** Leesbare labels voor velden in de interne e-mail (volgorde = weergavevolgorde) */
const fieldLabels: Record<string, string> = {
  naam: 'Naam',
  bedrijfsnaam: 'Onderneming',
  organisatieType: 'Type onderneming',
  email: 'E-mailadres',
  telefoon: 'Telefoonnummer',
  gewensteDienst: 'Gewenste dienst',
  gewensteOndersteuning: 'Gewenste ondersteuning',
  urenPerMaand: 'Omvang van de administratie',
  gewensteStart: 'Gewenste startdatum',
  pakket: 'Gekozen pakket',
  rechtsvorm: 'Rechtsvorm',
  branche: 'Branche',
  huidigeSituatie: 'Huidige situatie',
  aantalAdministraties: 'Aantal administraties',
  boekhoudsoftware: 'Boekhoudsoftware',
  periode: 'Gewenste periode of deadline',
  omschrijving: 'Omschrijving van de werkzaamheden',
  transactiesPerMaand: 'Mutaties per maand',
  bericht: 'Bericht',
  privacyAkkoord: 'Akkoord privacybeleid',
};

/**
 * Verwijdert regeleinden en stuurtekens uit waarden die in e-mailheaders terechtkomen
 * (naam in From/Reply-To, onderwerp). Voorkomt e-mail header injection.
 */
export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n\t\0]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type FieldValue = string | string[] | boolean | undefined;

function formatValue(key: string, value: FieldValue): string {
  const labels = optionLabels[key];
  const toLabel = (v: string) => labels?.get(v) ?? v;
  if (Array.isArray(value)) return value.map(toLabel).join(', ');
  if (typeof value === 'boolean') return value ? 'Ja' : 'Nee';
  return value === undefined ? '' : toLabel(value);
}

/** Interne e-mail (tekst + HTML) met alle ingevulde velden. */
export function buildInternalEmail(kind: FormKind, data: Record<string, FieldValue>, page: string) {
  const rows = Object.entries(fieldLabels)
    .filter(([key]) => data[key] !== undefined && data[key] !== '' && data[key] !== false)
    .map(([key, label]) => ({ label, value: formatValue(key, data[key]) }));

  const text = [
    `${internalSubjects[kind]}`,
    `Pagina: ${page}`,
    '',
    ...rows.map((r) => `${r.label}: ${r.value}`),
  ].join('\n');

  const html = `<!doctype html>
<html lang="nl"><body style="margin:0;padding:24px;background:#f6f7f9;font-family:Inter,Segoe UI,Arial,sans-serif;color:#182433;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e3e6eb;border-radius:12px;">
    <tr><td style="background:#0b1f3a;border-radius:12px 12px 0 0;padding:20px 28px;color:#ffffff;font-size:18px;font-weight:600;">
      ${escapeHtml(internalSubjects[kind])}
    </td></tr>
    <tr><td style="padding:24px 28px;">
      <p style="margin:0 0 16px;color:#5b6473;font-size:13px;">Pagina: ${escapeHtml(page)}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;line-height:1.5;">
        ${rows
          .map(
            (r) => `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #e3e6eb;color:#5b6473;width:180px;vertical-align:top;">${escapeHtml(r.label)}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e3e6eb;white-space:pre-wrap;">${escapeHtml(r.value)}</td>
        </tr>`,
          )
          .join('')}
      </table>
    </td></tr>
  </table>
</body></html>`;

  return { text, html };
}

/** Bevestigingsmail aan de bezoeker (vaste tekst). */
export function buildConfirmationEmail(name: string) {
  const safeName = sanitizeHeaderValue(name);
  const text = [
    `Beste ${safeName},`,
    '',
    `Bedankt voor uw bericht aan ${SITE_NAME}.`,
    '',
    'Wij hebben uw aanvraag goed ontvangen.',
    '',
    'Wij nemen zo spoedig mogelijk contact met u op.',
    '',
    'Met vriendelijke groet,',
    '',
    SITE_NAME,
    TAGLINE_POSITIONERING,
    TAGLINE,
  ].join('\n');

  const html = `<!doctype html>
<html lang="nl"><body style="margin:0;padding:24px;background:#f6f7f9;font-family:Inter,Segoe UI,Arial,sans-serif;color:#182433;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e3e6eb;border-radius:12px;">
    <tr><td style="background:#0b1f3a;border-radius:12px 12px 0 0;padding:20px 28px;color:#ffffff;font-size:18px;font-weight:600;letter-spacing:0.08em;">MERIT</td></tr>
    <tr><td style="padding:28px;font-size:16px;line-height:1.65;">
      <p style="margin:0 0 16px;">Beste ${escapeHtml(safeName)},</p>
      <p style="margin:0 0 16px;">Bedankt voor uw bericht aan ${escapeHtml(SITE_NAME)}.</p>
      <p style="margin:0 0 16px;">Wij hebben uw aanvraag goed ontvangen.</p>
      <p style="margin:0 0 24px;">Wij nemen zo spoedig mogelijk contact met u op.</p>
      <p style="margin:0 0 4px;">Met vriendelijke groet,</p>
      <p style="margin:0;font-weight:600;color:#0b1f3a;">${escapeHtml(SITE_NAME)}</p>
      <p style="margin:4px 0 0;color:#5b6473;">${escapeHtml(TAGLINE_POSITIONERING)}</p>
      <p style="margin:0;color:#876a1c;font-style:italic;">${escapeHtml(TAGLINE)}</p>
    </td></tr>
  </table>
</body></html>`;

  return { text, html };
}

export interface SendEmailInput {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

/**
 * Verstuurt een e-mail via de Resend REST API (geen extra npm-dependency nodig).
 * De API-key komt uitsluitend uit een server-side omgevingsvariabele.
 */
export async function sendViaResend(apiKey: string, input: SendEmailInput): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: input.from,
      to: input.to,
      subject: sanitizeHeaderValue(input.subject),
      text: input.text,
      html: input.html,
      ...(input.replyTo ? { reply_to: input.replyTo } : {}),
    }),
  });

  if (res.ok) return { ok: true };
  let detail = `HTTP ${res.status}`;
  try {
    const body = (await res.json()) as { message?: string; name?: string };
    if (body?.message) detail = `${detail} — ${body.name ?? ''} ${body.message}`.trim();
  } catch {
    /* geen JSON-body */
  }
  return { ok: false, error: detail };
}
