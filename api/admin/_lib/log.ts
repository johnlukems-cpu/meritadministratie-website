/**
 * Server-side logging voor de Content Studio.
 * -----------------------------------------------------------------------------
 * Zichtbaar in Vercel → Deployments → Runtime Logs.
 *
 * REGEL: log nooit wachtwoorden, sessietokens, API-keys of access tokens.
 * Daarom loggen we uitsluitend: gebeurtenis, id, titel, status en kanaal.
 * `safe()` knipt lange waarden af en verwijdert regeleinden, zodat één logregel
 * ook één regel blijft en niet te manipuleren is.
 */
import type { Channel, ContentEventName, ContentStatus } from '../../../src/lib/content/types.js';

const PREFIX = '[content-studio]';

function safe(value: unknown, max = 120): string {
  return String(value ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .slice(0, max);
}

export interface LogFields {
  id?: string;
  title?: string;
  status?: ContentStatus;
  channel?: Channel;
  /** Korte toelichting, bijv. een foutcode of providernaam */
  detail?: string;
}

/** Logt een contentgebeurtenis (created, updated, approved, scheduled, published, failed). */
export function logContentEvent(event: ContentEventName, fields: LogFields = {}): void {
  const parts = [
    `${PREFIX} ${event}`,
    fields.id ? `id=${safe(fields.id, 64)}` : '',
    fields.title ? `titel="${safe(fields.title)}"` : '',
    fields.status ? `status=${fields.status}` : '',
    fields.channel ? `kanaal=${fields.channel}` : '',
    fields.detail ? `detail="${safe(fields.detail, 200)}"` : '',
  ].filter(Boolean);
  const line = parts.join(' ');
  if (event === 'publication_failed') console.error(line);
  else console.log(line);
}

/** Logt een technische fout (nooit met sleutels of tokens). */
export function logError(scope: string, message: unknown): void {
  console.error(`${PREFIX} fout scope=${safe(scope, 40)} melding="${safe(message, 300)}"`);
}

/** Logt een beheerhandeling zonder content, bijv. inloggen. */
export function logAdmin(action: 'login' | 'login_failed' | 'logout', detail = ''): void {
  const line = `${PREFIX} ${action}${detail ? ` detail="${safe(detail, 120)}"` : ''}`;
  if (action === 'login_failed') console.warn(line);
  else console.log(line);
}
