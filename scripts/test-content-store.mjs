/**
 * TESTS VOOR DE CONTENT STUDIO-OPSLAG
 * -----------------------------------------------------------------------------
 * Draaien met:  npm run test:store
 *
 * Er is geen echte Redis nodig: dit script start een kleine HTTP-server die de
 * Redis REST-API nabootst (dezelfde commando's die api/admin/_lib/store.ts gebruikt)
 * en zet de REST-variabelen daarnaar. Zo wordt de echte driver getest, inclusief
 * het HTTP-verkeer, de sleutelindeling en de foutafhandeling.
 *
 * Getest wordt: content aanmaken, ophalen, wijzigen, verwijderen, statuswissels,
 * geplande content bewaren, alle vier de kanaalteksten, de index-opschoning en
 * het gedrag bij een onbereikbare opslag.
 */
import { createServer } from 'node:http';
import { registerHooks } from 'node:module';

/* --- Imports met .js-extensie naar .ts-bronnen laten wijzen --------------------- */
// api/ gebruikt expliciete .js-specifiers (ESM/nodenext). Node's type-stripping
// vertaalt die niet automatisch naar de .ts-bestanden; deze hook doet dat wel.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.endsWith('.js') && (specifier.startsWith('./') || specifier.startsWith('../'))) {
      try {
        return nextResolve(specifier, context);
      } catch {
        return nextResolve(`${specifier.slice(0, -3)}.ts`, context);
      }
    }
    return nextResolve(specifier, context);
  },
});

/* --- Nagebouwde Redis REST-server ----------------------------------------------- */

const TOKEN = 'test-token';
const strings = new Map();
const sets = new Map();

function runCommand(args) {
  const [rawName, ...rest] = args;
  const name = String(rawName).toUpperCase();
  switch (name) {
    case 'PING':
      return 'PONG';
    case 'SET':
      strings.set(rest[0], String(rest[1]));
      return 'OK';
    case 'GET':
      return strings.has(rest[0]) ? strings.get(rest[0]) : null;
    case 'DEL': {
      let removed = 0;
      for (const key of rest) if (strings.delete(key)) removed++;
      return removed;
    }
    case 'MGET':
      return rest.map((key) => (strings.has(key) ? strings.get(key) : null));
    case 'SADD': {
      const [key, ...members] = rest;
      const set = sets.get(key) ?? new Set();
      let added = 0;
      for (const member of members) {
        if (!set.has(String(member))) {
          set.add(String(member));
          added++;
        }
      }
      sets.set(key, set);
      return added;
    }
    case 'SREM': {
      const [key, ...members] = rest;
      const set = sets.get(key);
      if (!set) return 0;
      let removed = 0;
      for (const member of members) if (set.delete(String(member))) removed++;
      return removed;
    }
    case 'SMEMBERS':
      return [...(sets.get(rest[0]) ?? [])];
    default:
      throw new Error(`onbekend commando ${name}`);
  }
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => resolve(data));
  });
}

const server = createServer(async (req, res) => {
  const send = (status, body) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));
  };

  if (req.headers.authorization !== `Bearer ${TOKEN}`) {
    send(401, { error: 'unauthorized' });
    return;
  }

  let payload;
  try {
    payload = JSON.parse(await readBody(req));
  } catch {
    send(400, { error: 'invalid json' });
    return;
  }

  try {
    if (req.url === '/pipeline') {
      send(
        200,
        payload.map((command) => ({ result: runCommand(command) })),
      );
    } else {
      send(200, { result: runCommand(payload) });
    }
  } catch (error) {
    send(200, { error: error.message });
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

/* --- Omgeving instellen en de echte modules laden -------------------------------- */

process.env.KV_REST_API_URL = `http://127.0.0.1:${port}`;
process.env.KV_REST_API_TOKEN = TOKEN;

const store = await import('../api/admin/_lib/store.ts');
const service = await import('../api/admin/_lib/content-service.ts');

/* --- Testhulpjes ----------------------------------------------------------------- */

let passed = 0;
const failures = [];

function check(name, condition, detail = '') {
  if (condition) {
    passed++;
    console.log(`  ok    ${name}`);
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
    console.log(`  FOUT  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

/* --- 1. Driverkeuze --------------------------------------------------------------- */

console.log('\nOpslag');
const info = store.storeInfo();
check('driver is redis', info.driver === 'redis', `gekregen: ${info.driver}`);
check('opslag is blijvend', info.persistent === true);
check('provider wordt benoemd', info.provider.includes('Upstash'), info.provider);
check('geen token in providernaam', !info.provider.includes(TOKEN));
check('opslag is bereikbaar (PING)', await store.pingStore());

/* --- 2. Content aanmaken ---------------------------------------------------------- */

console.log('\nContent aanmaken');
const created = service.createItem({
  title: 'Kosteloos overstappen naar AFAS',
  topic: 'Waarom de overstap naar AFAS kosteloos is bij uitbesteding van de administratie',
  audience: 'Ondernemers in het MKB',
  contentType: 'afas',
  goal: 'kennis-delen',
  extraInstructions: 'Noem de Quick Scan.',
  publicationDate: '2026-10-05',
  publicationTime: '09:30',
  channels: ['website', 'linkedin', 'facebook', 'instagram'],
});
await store.saveItem(created);

check('status begint op DRAFT', created.status === 'DRAFT');
check('scheduledAt is berekend', created.scheduledAt !== null, String(created.scheduledAt));
check('publishedAt is nog leeg', created.publishedAt === null);

/* --- 3. Content ophalen ------------------------------------------------------------ */

console.log('\nContent ophalen');
const fetched = await store.getItem(created.id);
check('item wordt teruggevonden', fetched !== null);
check('titel is bewaard', fetched?.title === created.title);
check('onderwerp is bewaard', fetched?.topic === created.topic);
check('doelgroep is bewaard', fetched?.audience === created.audience);
check('contenttype is bewaard', fetched?.contentType === 'afas');
check('kanalen zijn bewaard', fetched?.schedule.channels.join(',') === 'website,linkedin,facebook,instagram');
check('scheduledAt overleeft de opslag', fetched?.scheduledAt === created.scheduledAt);
check('onbekende id geeft null', (await store.getItem('bestaat-niet')) === null);

/* --- 4. Lijst ---------------------------------------------------------------------- */

console.log('\nLijst');
const second = service.createItem({
  title: 'Btw-aangifte op tijd indienen',
  topic: 'Wat er komt kijken bij een tijdige btw-aangifte',
  audience: 'Startende ondernemers',
  contentType: 'btw',
  goal: 'kennis-delen',
  extraInstructions: '',
  publicationDate: '',
  publicationTime: '',
  channels: ['website'],
});
second.createdAt = new Date(Date.now() + 1000).toISOString();
await store.saveItem(second);

const list = await store.listItems();
check('lijst bevat beide items', list.length === 2, `gekregen: ${list.length}`);
check('nieuwste staat vooraan', list[0]?.id === second.id);
check('zonder datum blijft scheduledAt leeg', second.scheduledAt === null);

/* --- 5. Content wijzigen + kanaalteksten -------------------------------------------- */

console.log('\nContent wijzigen');
const withText = service.applyUpdate(fetched, {
  websiteContent: {
    seoTitle: 'Kosteloos overstappen naar AFAS',
    metaDescription: 'Wat de overstap naar AFAS inhoudt.',
    article: 'De volledige tekst van het artikel.',
    cta: 'Plan een vrijblijvende kennismaking.',
  },
  linkedinContent: { body: 'LinkedIn-post', cta: 'Plan een kennismaking.', hashtags: ['#afas', ' mkb '] },
  facebookContent: { body: 'Facebook-post', cta: 'Meer weten?', hashtags: ['administratie'] },
  instagramContent: { body: 'Instagram-caption', cta: 'Stuur een bericht.', hashtags: ['afas', 'mkb'] },
});
await store.saveItem(withText);
const reloaded = await store.getItem(created.id);

check('websitetekst is bewaard', reloaded?.websiteContent?.seoTitle === 'Kosteloos overstappen naar AFAS');
check('artikel is bewaard', reloaded?.websiteContent?.article === 'De volledige tekst van het artikel.');
check('linkedin-tekst is bewaard', reloaded?.linkedinContent?.body === 'LinkedIn-post');
check('hashtags zijn genormaliseerd', reloaded?.linkedinContent?.hashtags.join(',') === 'afas,mkb');
check('facebook-tekst is bewaard', reloaded?.facebookContent?.body === 'Facebook-post');
check('instagram-tekst is bewaard', reloaded?.instagramContent?.body === 'Instagram-caption');
check('updatedAt is opgehoogd', reloaded?.updatedAt !== created.updatedAt);

/* --- 6. Statuswissels --------------------------------------------------------------- */

console.log('\nStatuswissels');
let current = reloaded;
for (const status of ['REVIEW', 'APPROVED', 'SCHEDULED']) {
  current = service.applyUpdate(current, { status });
  await store.saveItem(current);
  const check1 = await store.getItem(created.id);
  check(`status ${status} is bewaard`, check1?.status === status, `gekregen: ${check1?.status}`);
}
check('publishedAt nog steeds leeg', current.publishedAt === null);

const published = service.applyUpdate(current, { status: 'PUBLISHED' });
await store.saveItem(published);
const afterPublish = await store.getItem(created.id);
check('status PUBLISHED is bewaard', afterPublish?.status === 'PUBLISHED');
check('publishedAt wordt gezet', typeof afterPublish?.publishedAt === 'string' && afterPublish.publishedAt.length > 0);
check('tijdlijn is bijgehouden', (afterPublish?.history.length ?? 0) >= 4, `${afterPublish?.history.length} gebeurtenissen`);

/* --- 7. Geplande content bewaren ----------------------------------------------------- */

console.log('\nGeplande content');
const replanned = service.applyUpdate(afterPublish, {
  publicationDate: '2026-11-17',
  publicationTime: '08:15',
  channels: ['website', 'linkedin'],
});
await store.saveItem(replanned);
const afterPlan = await store.getItem(created.id);
check('datum is bewaard', afterPlan?.schedule.date === '2026-11-17');
check('tijd is bewaard', afterPlan?.schedule.time === '08:15');
check('scheduledAt is herberekend', afterPlan?.scheduledAt === service.toScheduledAt('2026-11-17', '08:15'));
check('kanalen zijn aangepast', afterPlan?.schedule.channels.join(',') === 'website,linkedin');
check('publishedAt blijft behouden', afterPlan?.publishedAt === afterPublish?.publishedAt);

/* --- 8. Content verwijderen ---------------------------------------------------------- */

console.log('\nContent verwijderen');
check('verwijderen lukt', (await store.removeItem(created.id)) === true);
check('item is weg', (await store.getItem(created.id)) === null);
check('lijst is bijgewerkt', (await store.listItems()).length === 1);
check('tweede keer verwijderen geeft false', (await store.removeItem(created.id)) === false);

/* --- 9. Index-opschoning ------------------------------------------------------------- */

console.log('\nIndex-opschoning');
runCommand(['SADD', 'merit:content:index', 'wees-id']); // id zonder bijbehorend item
const afterStale = await store.listItems();
check('verweesde id wordt overgeslagen', afterStale.length === 1);
check('verweesde id is uit de index verwijderd', !runCommand(['SMEMBERS', 'merit:content:index']).includes('wees-id'));

/* --- 10. Onbereikbare opslag ---------------------------------------------------------- */

console.log('\nFoutafhandeling');
process.env.KV_REST_API_TOKEN = 'fout-token';
store.resetDriver();
const failing = await store.withStore('test:list', () => store.listItems());
check('storing geeft ok:false', failing.ok === false);
check('melding is begrijpelijk', failing.ok === false && failing.error.includes('niet bereikbaar'), failing.ok === false ? failing.error : '');
check('geen token in de melding', failing.ok === false && !failing.error.includes('fout-token'));
process.env.KV_REST_API_TOKEN = TOKEN;

/* --- 11. Terugval naar geheugen -------------------------------------------------------- */

console.log('\nTerugval zonder Redis');
delete process.env.KV_REST_API_URL;
delete process.env.KV_REST_API_TOKEN;
store.resetDriver();
const memoryInfo = store.storeInfo();
check('driver is memory', memoryInfo.driver === 'memory');
check('opslag is niet blijvend', memoryInfo.persistent === false);

/* --- Resultaat -------------------------------------------------------------------------- */

server.close();
console.log(`\n${passed} controles geslaagd, ${failures.length} mislukt.`);
if (failures.length > 0) {
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exitCode = 1;
}
