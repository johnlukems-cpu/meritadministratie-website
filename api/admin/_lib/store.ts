/**
 * OPSLAG VOOR DE CONTENT STUDIO
 * -----------------------------------------------------------------------------
 * Permanente server-side opslag in Redis, via de REST-API van de Redis-integratie
 * uit de Vercel Marketplace (Upstash). Er is bewust GEEN extra npm-pakket nodig:
 * de REST-API werkt met `fetch` en past bij serverless functies, die geen
 * langlevende TCP-verbinding kunnen aanhouden.
 *
 * Twee drivers:
 *
 *   redis    Actief zodra de REST-variabelen van de integratie bestaan. Vercel zet
 *            deze zelf zodra u in het dashboard een Redis-store aan het project koppelt:
 *              KV_REST_API_URL        + KV_REST_API_TOKEN          (Upstash via Vercel Marketplace)
 *            of UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN  (Upstash rechtstreeks)
 *            of REDIS_REST_API_URL     + REDIS_REST_API_TOKEN      (andere REST-compatibele Redis)
 *
 *   memory   Terugval wanneer die variabelen ontbreken. NIET blijvend: serverless
 *            functies starten regelmatig opnieuw op. De API geeft dit terug in
 *            `storage.persistent`, zodat het dashboard er een waarschuwing over toont.
 *            Die waarschuwing verdwijnt vanzelf zodra Redis is gekoppeld.
 *
 * SLEUTELS (één document per item, dus geen read-modify-write van één grote blob;
 * twee gelijktijdige bewerkingen kunnen elkaar daardoor niet overschrijven):
 *   merit:content:item:<id>   JSON van één ContentItem
 *   merit:content:index       Redis SET met alle id's
 *
 * Een andere opslag aansluiten (Postgres, Supabase, Neon): implementeer
 * `StorageDriver` en geef hem terug in `getDriver()`. De endpoints wijzigen niet.
 */
import { randomUUID } from 'node:crypto';
import type { ContentItem } from '../../../src/lib/content/types.js';
import { logError } from './log.js';

const ITEM_KEY = (id: string) => `merit:content:item:${id}`;
const INDEX_KEY = 'merit:content:index';

export interface StorageDriver {
  name: 'redis' | 'memory';
  /** Leesbare naam van de actieve opslag (nooit met credentials erin) */
  provider: string;
  /** Blijvende opslag? false = data verdwijnt bij een herstart van de functie. */
  persistent: boolean;
  list(): Promise<ContentItem[]>;
  get(id: string): Promise<ContentItem | null>;
  put(item: ContentItem): Promise<void>;
  remove(id: string): Promise<boolean>;
  /** Controleert of de opslag bereikbaar is (voor diagnose) */
  ping(): Promise<boolean>;
}

/* --- Driver: geheugen (terugval) ------------------------------------------------ */

const memory = new Map<string, ContentItem>();

const memoryDriver: StorageDriver = {
  name: 'memory',
  provider: 'Tijdelijk geheugen (geen database gekoppeld)',
  persistent: false,
  async list() {
    return [...memory.values()];
  },
  async get(id) {
    return memory.get(id) ?? null;
  },
  async put(item) {
    memory.set(item.id, item);
  },
  async remove(id) {
    return memory.delete(id);
  },
  async ping() {
    return true;
  },
};

/* --- Driver: Redis via REST ------------------------------------------------------ */

interface RedisCredentials {
  url: string;
  token: string;
  provider: string;
}

/**
 * Zoekt de REST-credentials van de gekoppelde Redis-integratie.
 * De waarden zelf worden nergens gelogd of teruggegeven aan de browser.
 */
function readCredentials(): RedisCredentials | null {
  const candidates = [
    {
      url: 'KV_REST_API_URL',
      token: 'KV_REST_API_TOKEN',
      provider: 'Upstash Redis (Vercel Marketplace)',
    },
    {
      url: 'UPSTASH_REDIS_REST_URL',
      token: 'UPSTASH_REDIS_REST_TOKEN',
      provider: 'Upstash Redis (REST)',
    },
    { url: 'REDIS_REST_API_URL', token: 'REDIS_REST_API_TOKEN', provider: 'Redis (REST)' },
  ];

  for (const candidate of candidates) {
    const url = process.env[candidate.url]?.trim();
    const token = process.env[candidate.token]?.trim();
    if (url && token) {
      return { url: url.replace(/\/+$/, ''), token, provider: candidate.provider };
    }
  }
  return null;
}

/** Eén Redis-commando via de REST-API. */
async function command<T>(credentials: RedisCredentials, args: Array<string | number>): Promise<T> {
  const res = await fetch(credentials.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${credentials.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  const body = (await res.json().catch(() => null)) as { result?: T; error?: string } | null;
  if (!res.ok || body?.error) {
    throw new Error(`Redis ${String(args[0])} mislukt: ${body?.error ?? `HTTP ${res.status}`}`);
  }
  return body?.result as T;
}

/** Meerdere commando's in één ronde (scheelt latency in serverless). */
async function pipeline(
  credentials: RedisCredentials,
  commands: Array<Array<string | number>>,
): Promise<unknown[]> {
  if (commands.length === 0) return [];
  const res = await fetch(`${credentials.url}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${credentials.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
  });
  const body = (await res.json().catch(() => null)) as Array<{
    result?: unknown;
    error?: string;
  }> | null;
  if (!res.ok || !Array.isArray(body)) {
    throw new Error(`Redis pipeline mislukt: HTTP ${res.status}`);
  }
  const failed = body.find((entry) => entry?.error);
  if (failed) throw new Error(`Redis pipeline mislukt: ${failed.error}`);
  return body.map((entry) => entry?.result);
}

function parseItem(value: unknown): ContentItem | null {
  if (typeof value !== 'string' || value.length === 0) return null;
  try {
    const parsed = JSON.parse(value) as ContentItem;
    return parsed && typeof parsed.id === 'string' ? parsed : null;
  } catch {
    return null;
  }
}

function createRedisDriver(credentials: RedisCredentials): StorageDriver {
  return {
    name: 'redis',
    provider: credentials.provider,
    persistent: true,

    async list() {
      const ids = await command<string[] | null>(credentials, ['SMEMBERS', INDEX_KEY]);
      if (!ids || ids.length === 0) return [];

      const values = await command<Array<string | null>>(credentials, [
        'MGET',
        ...ids.map((id) => ITEM_KEY(id)),
      ]);

      const items: ContentItem[] = [];
      const stale: string[] = [];
      ids.forEach((id, index) => {
        const item = parseItem(values?.[index]);
        if (item) items.push(item);
        else stale.push(id);
      });

      // Index opschonen wanneer een item is verlopen of handmatig is verwijderd.
      if (stale.length > 0) {
        await command(credentials, ['SREM', INDEX_KEY, ...stale]).catch((error: unknown) => {
          logError('store:index-cleanup', error instanceof Error ? error.message : error);
        });
      }
      return items;
    },

    async get(id) {
      return parseItem(await command<string | null>(credentials, ['GET', ITEM_KEY(id)]));
    },

    async put(item) {
      await pipeline(credentials, [
        ['SET', ITEM_KEY(item.id), JSON.stringify(item)],
        ['SADD', INDEX_KEY, item.id],
      ]);
    },

    async remove(id) {
      const [deleted] = await pipeline(credentials, [
        ['DEL', ITEM_KEY(id)],
        ['SREM', INDEX_KEY, id],
      ]);
      return Number(deleted) > 0;
    },

    async ping() {
      const pong = await command<string>(credentials, ['PING']);
      return typeof pong === 'string' && pong.toUpperCase() === 'PONG';
    },
  };
}

/* --- Driverkeuze ----------------------------------------------------------------- */

let driver: StorageDriver | null = null;

/** Wordt gebruikt door de tests om een nieuwe omgeving af te dwingen. */
export function resetDriver(): void {
  driver = null;
}

export function getDriver(): StorageDriver {
  if (driver) return driver;
  const credentials = readCredentials();
  if (credentials) {
    driver = createRedisDriver(credentials);
    return driver;
  }

  // Veelgemaakte fout: de integratie levert alleen een TCP-URL. Die kan deze laag
  // niet gebruiken; log één duidelijke aanwijzing in plaats van stilletjes terugvallen.
  if (process.env.REDIS_URL?.trim()) {
    console.warn(
      '[content-studio] REDIS_URL gevonden, maar geen REST-credentials. Deze opslaglaag gebruikt ' +
        'de Redis REST-API. Koppel de Upstash-integratie via de Vercel Marketplace, of zet ' +
        'KV_REST_API_URL en KV_REST_API_TOKEN handmatig. Tot die tijd wordt tijdelijk geheugen gebruikt.',
    );
  }
  driver = memoryDriver;
  return driver;
}

/* --- Store ----------------------------------------------------------------------- */

export interface StoreInfo {
  driver: StorageDriver['name'];
  provider: string;
  persistent: boolean;
}

export function storeInfo(): StoreInfo {
  const current = getDriver();
  return { driver: current.name, provider: current.provider, persistent: current.persistent };
}

export function newId(): string {
  return randomUUID();
}

/** Alle items, nieuwste eerst. */
export async function listItems(): Promise<ContentItem[]> {
  const items = await getDriver().list();
  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getItem(id: string): Promise<ContentItem | null> {
  return getDriver().get(id);
}

export async function saveItem(item: ContentItem): Promise<ContentItem> {
  await getDriver().put(item);
  return item;
}

export async function removeItem(id: string): Promise<boolean> {
  return getDriver().remove(id);
}

/** Controleert of de opslag bereikbaar is; voor diagnose in de logs. */
export async function pingStore(): Promise<boolean> {
  try {
    return await getDriver().ping();
  } catch (error) {
    logError('store:ping', error instanceof Error ? error.message : error);
    return false;
  }
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
