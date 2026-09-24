/**
 * OPSLAG VOOR DE CONTENT STUDIO
 * -----------------------------------------------------------------------------
 * Het project heeft geen database. Dat hoeft ook niet: de Content Studio bewaart
 * enkele tientallen items, dus één JSON-document is de eenvoudigste veilige
 * structuur die bij deze architectuur past.
 *
 * Er zijn twee drivers:
 *
 *   kv       Vercel KV / Upstash Redis via de REST-API. AANBEVOLEN voor gebruik.
 *            Actief zodra deze omgevingsvariabelen bestaan (Vercel zet ze zelf
 *            wanneer u in het dashboard een KV/Redis-store aan het project koppelt):
 *              KV_REST_API_URL + KV_REST_API_TOKEN
 *            of UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 *
 *   memory   Terugval wanneer die variabelen ontbreken. LET OP: serverless
 *            functies worden regelmatig opnieuw gestart, dus deze opslag is
 *            NIET blijvend — alleen bruikbaar om de studio uit te proberen.
 *            De API geeft dit ook terug in `storage.persistent`, zodat de
 *            interface een duidelijke waarschuwing kan tonen.
 *
 * Een andere opslag aansluiten (Postgres, Supabase, Neon): implementeer
 * `StorageDriver` en geef hem terug in `getDriver()`. De endpoints wijzigen niet.
 */
import { randomUUID } from 'node:crypto';
import type { ContentItem } from '../../../src/lib/content/types.js';
import { logError } from './log.js';

const KEY = 'merit:content-studio:v1';

export interface StorageDriver {
  name: 'kv' | 'memory';
  /** Blijvende opslag? false = data verdwijnt bij een herstart van de functie. */
  persistent: boolean;
  readAll(): Promise<ContentItem[]>;
  writeAll(items: ContentItem[]): Promise<void>;
}

/* --- Driver: geheugen ---------------------------------------------------------- */

let memory: ContentItem[] = [];

const memoryDriver: StorageDriver = {
  name: 'memory',
  persistent: false,
  async readAll() {
    return memory;
  },
  async writeAll(items) {
    memory = items;
  },
};

/* --- Driver: Vercel KV / Upstash Redis (REST) ----------------------------------- */

interface KvCredentials {
  url: string;
  token: string;
}

function kvCredentials(): KvCredentials | null {
  const url = (process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL)?.trim();
  const token = (process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN)?.trim();
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ''), token };
}

function createKvDriver(credentials: KvCredentials): StorageDriver {
  const headers = { Authorization: `Bearer ${credentials.token}` };

  return {
    name: 'kv',
    persistent: true,
    async readAll() {
      const res = await fetch(`${credentials.url}/get/${encodeURIComponent(KEY)}`, { headers });
      if (!res.ok) throw new Error(`KV lezen mislukt (HTTP ${res.status})`);
      const body = (await res.json()) as { result?: string | null };
      if (!body.result) return [];
      const parsed = JSON.parse(body.result) as unknown;
      return Array.isArray(parsed) ? (parsed as ContentItem[]) : [];
    },
    async writeAll(items) {
      const res = await fetch(`${credentials.url}/set/${encodeURIComponent(KEY)}`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'text/plain' },
        body: JSON.stringify(items),
      });
      if (!res.ok) throw new Error(`KV schrijven mislukt (HTTP ${res.status})`);
    },
  };
}

let driver: StorageDriver | null = null;

export function getDriver(): StorageDriver {
  if (driver) return driver;
  const credentials = kvCredentials();
  driver = credentials ? createKvDriver(credentials) : memoryDriver;
  return driver;
}

/* --- Store --------------------------------------------------------------------- */

export interface StoreInfo {
  driver: StorageDriver['name'];
  persistent: boolean;
}

export function storeInfo(): StoreInfo {
  const current = getDriver();
  return { driver: current.name, persistent: current.persistent };
}

export function newId(): string {
  return randomUUID();
}

/** Alle items, nieuwste eerst. */
export async function listItems(): Promise<ContentItem[]> {
  const items = await getDriver().readAll();
  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getItem(id: string): Promise<ContentItem | null> {
  const items = await getDriver().readAll();
  return items.find((item) => item.id === id) ?? null;
}

export async function saveItem(item: ContentItem): Promise<ContentItem> {
  const current = getDriver();
  const items = await current.readAll();
  const index = items.findIndex((existing) => existing.id === item.id);
  if (index === -1) items.push(item);
  else items[index] = item;
  await current.writeAll(items);
  return item;
}

export async function removeItem(id: string): Promise<boolean> {
  const current = getDriver();
  const items = await current.readAll();
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) return false;
  await current.writeAll(next);
  return true;
}

/** Wikkelt een opslagactie zodat een storing niet als lege lijst wordt gepresenteerd. */
export async function withStore<T>(
  scope: string,
  action: () => Promise<T>,
): Promise<{ ok: true; value: T } | { ok: false; error: string }> {
  try {
    return { ok: true, value: await action() };
  } catch (error) {
    logError(scope, error instanceof Error ? error.message : error);
    return { ok: false, error: 'Opslag is tijdelijk niet bereikbaar. Probeer het opnieuw.' };
  }
}
