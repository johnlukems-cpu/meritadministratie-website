/**
 * Browser-client voor de Content Studio-endpoints.
 * Alle verzoeken gaan naar de eigen serverless functies onder /api/admin/;
 * de sessie zit in een HttpOnly-cookie, dus hier staan geen tokens of sleutels.
 */
import type { ContentCreateValues, ContentUpdateValues } from './schemas';
import type { Channel, ContentItem, ContentStats } from './types';

export interface StorageInfo {
  driver: 'redis' | 'memory';
  /** Leesbare naam van de actieve opslag, bijv. 'Upstash Redis (Vercel Marketplace)' */
  provider: string;
  /** false = tijdelijk geheugen; het dashboard toont dan een waarschuwing */
  persistent: boolean;
}

export interface IntegrationStatus {
  ai: boolean;
  social: Record<'linkedin' | 'facebook' | 'instagram', boolean>;
}

export interface ContentListResponse {
  items: ContentItem[];
  stats: ContentStats;
  storage: StorageInfo;
  integrations: IntegrationStatus;
}

export interface GenerationBrief {
  system: string;
  user: string;
}

export interface PublishResultLine {
  channel: Channel;
  ok: boolean;
  message: string;
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      error: string;
      status: number;
      /** 'unauthorized' → opnieuw inloggen; 'not_configured' → omgeving nog niet ingericht */
      code?: string;
      /** Foutmeldingen per veld bij validatiefouten */
      issues?: Record<string, string>;
      /** Aanvullende gegevens, bijv. de briefing bij een niet-geconfigureerde AI-provider */
      payload?: unknown;
    };

const GENERIC_ERROR = 'Er is iets misgegaan. Probeer het opnieuw.';

async function request<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const res = await fetch(path, {
      ...init,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...init?.headers },
    });
    const body = (await res.json().catch(() => null)) as
      | (Record<string, unknown> & { ok?: boolean; error?: string; code?: string })
      | null;

    if (res.ok && body?.ok) return { ok: true, data: body as T };

    return {
      ok: false,
      status: res.status,
      error: typeof body?.error === 'string' ? body.error : GENERIC_ERROR,
      code: typeof body?.code === 'string' ? body.code : undefined,
      issues: (body?.issues as Record<string, string> | undefined) ?? undefined,
      payload: body ?? undefined,
    };
  } catch {
    return { ok: false, status: 0, error: 'Geen verbinding met de server.' };
  }
}

/* --- Sessie -------------------------------------------------------------------- */

export interface SessionState {
  authenticated: boolean;
  configured: boolean;
}

export function fetchSession() {
  return request<SessionState & { ok: true }>('/api/admin/session');
}

export function login(password: string) {
  return request<SessionState & { ok: true }>('/api/admin/session', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
}

export function logout() {
  return request<{ ok: true }>('/api/admin/session', { method: 'DELETE' });
}

/* --- Content ------------------------------------------------------------------- */

export function fetchContentList() {
  return request<ContentListResponse & { ok: true }>('/api/admin/content');
}

export function fetchContent(id: string) {
  return request<{ ok: true; item: ContentItem }>(`/api/admin/content/${encodeURIComponent(id)}`);
}

export function createContent(values: ContentCreateValues) {
  return request<{ ok: true; item: ContentItem }>('/api/admin/content', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function updateContent(id: string, patch: ContentUpdateValues) {
  return request<{
    ok: true;
    item: ContentItem;
    published?: boolean;
    message?: string;
    results?: PublishResultLine[];
  }>(`/api/admin/content/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });
}

export function deleteContent(id: string) {
  return request<{ ok: true; deleted: boolean }>(`/api/admin/content/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

export function generateContent(id: string, channels?: Channel[]) {
  return request<{ ok: true; item: ContentItem }>('/api/admin/content/generate', {
    method: 'POST',
    body: JSON.stringify({ id, channels }),
  });
}
