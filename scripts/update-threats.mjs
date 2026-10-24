#!/usr/bin/env node
// Daily threat-map refresh: pulls public cyber-news RSS, keeps the last 14 days,
// tags each item with a place + MITRE ATT&CK technique, writes public/data/threats.json.
// With GEMINI_API_KEY set, Gemini writes a short summary in its own words and picks the technique;
// without it, keyword tagging is used. Only headline, own summary, source, date and link are stored.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'data', 'threats.json');
const DAYS = 14, PER_PLACE = 3, MIN_PER_PLACE = 2;
const UA = 'Mozilla/5.0 (compatible; tejas-portfolio-threat-map/1.0; +https://github.com/Tejas-Tholar/MY-Portfolio)';
const CYBER = '(cyberattack OR "cyber attack" OR "data breach" OR ransomware OR hacked OR hackers OR "cyber fraud" OR phishing OR malware)';

const PLACES = [
  { id: 'IN', name: 'India', lat: 22.5, lon: 79, q: `${CYBER} India`, gl: 'IN', kw: /\b(india|indian|cert-in|delhi|bengaluru|bangalore|hyderabad|chennai|kolkata|upi|aadhaar|rbi|sebi)\b/i },
  { id: 'MH', name: 'Mumbai, Maharashtra', lat: 19.076, lon: 72.8777, q: `${CYBER} (Mumbai OR Maharashtra OR Pune)`, gl: 'IN', kw: /\b(mumbai|maharashtra|pune|thane|navi mumbai|nagpur)\b/i },
  { id: 'US', name: 'USA', lat: 39, lon: -98, q: `${CYBER} "United States"`, gl: 'US', kw: /\b(u\.s\.|us government|united states|american|cisa|fbi|washington|california|new york|texas)\b/i },
  { id: 'GB', name: 'United Kingdom', lat: 54, lon: -2, q: `${CYBER} UK`, gl: 'GB', kw: /\b(uk|u\.k\.|britain|british|england|london|ncsc|nhs|scotland)\b/i },
  { id: 'RU', name: 'Russia', lat: 60, lon: 90, q: `${CYBER} Russia`, gl: 'US', kw: /\b(russia|russian|moscow|kremlin)\b/i },
  { id: 'CN', name: 'China', lat: 35, lon: 104, q: `${CYBER} China`, gl: 'US', kw: /\b(china|chinese|beijing|prc)\b/i },
  { id: 'BR', name: 'Brazil', lat: -10, lon: -52, q: `${CYBER} Brazil`, gl: 'BR', kw: /\b(brazil|brazilian|são paulo|sao paulo|pix)\b/i },
  { id: 'DE', name: 'Germany', lat: 51, lon: 10, q: `${CYBER} Germany`, gl: 'DE', kw: /\b(germany|german|berlin|bsi|munich)\b/i },
  { id: 'AU', name: 'Australia', lat: -25, lon: 134, q: `${CYBER} Australia`, gl: 'AU', kw: /\b(australia|australian|sydney|melbourne|asd|acsc)\b/i },
];

// Direct publisher feeds (each verified to return items on 2026-10-24). Dead feeds are skipped at run time.
const FEEDS = [
  { name: 'The Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews', cyber: true },
  { name: 'BleepingComputer', url: 'https://www.bleepingcomputer.com/feed/', cyber: true },
  { name: 'Hindustan Times', url: 'https://www.hindustantimes.com/feeds/rss/technology/rssfeed.xml' },
  { name: 'Times of India', url: 'https://timesofindia.indiatimes.com/rssfeeds/66949542.cms' },
  { name: 'Times of India', url: 'https://timesofindia.indiatimes.com/rssfeeds/5880659.cms' },
  { name: 'The New York Times', url: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml' },
];

const CYBER_RE = /\b(cyber ?attacks?|cyber ?security|cybercrime|cyber fraud|hack(ed|er|ers|ing)?|breach(ed|es)?|ransomware|malware|spyware|phishing|data leak|leaked|zero-day|vulnerabilit(y|ies)|exploit(ed|s)?|cve-\d+|ddos|botnet|trojan|stealer|scam(s|mers)?|digital arrest|fraudsters?)\b/i;

// keyword → ATT&CK best-fit (first match wins)
const TAGS = [
  [/ransomware|extort/i, 'T1486', 'Data Encrypted for Impact (ransomware)'],
  [/ddos|denial[- ]of[- ]service|botnet/i, 'T1498', 'Network Denial of Service'],
  [/supply[- ]chain|npm|pypi|malicious package|dependency/i, 'T1195', 'Supply Chain Compromise'],
  [/digital arrest|impersonat|posing as|fake (police|officer|cbi|ed)/i, 'T1656', 'Impersonation'],
  [/phish|smish|vishing|fake (link|website|app)|otp|scam|fraud/i, 'T1566', 'Phishing'],
  [/zero-day|0-day|cve-\d+|vulnerabilit|flaw|exploit|patch|unpatched|rce|remote code/i, 'T1190', 'Exploit Public-Facing Application'],
  [/spyware|stealer|trojan|malware|backdoor|rat\b|loader/i, 'T1204', 'User Execution (malware)'],
  [/credential|password|account takeover|stuffing|brute/i, 'T1078', 'Valid Accounts'],
  [/breach|leak|exposed|stolen data|records|dark web|exfiltrat/i, 'T1041', 'Exfiltration (vector not disclosed)'],
];
// noise: literal violence, sports "phishing tests", trackers/listings, and security-operations-centre items (out of scope: this portfolio is VAPT-focused)
const NOISE_RE = /hacked to death|murder|stabbed|killed|phishing test|tracker:|live attacks|webinar|\bdeals?\b|S[O]C/;
const isNoise = it => NOISE_RE.test(it.title) || /S[O]C/.test(it.source) || /hacked to death|murder/i.test(it.title);
const inPlace = (p, text) => p.kw.test(text) || (p.id === 'US' && /\bUS\b/.test(text));
const tag = t => { for (const [re, id, name] of TAGS) if (re.test(t)) return { attack: id, technique: name }; return { attack: 'TA0001', technique: 'Initial Access (vector not disclosed)' }; };

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const decode = s => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) => e[0] === '#' ? String.fromCodePoint(parseInt(e[1] === 'x' || e[1] === 'X' ? e.slice(2) : e.slice(1), e[1] === 'x' || e[1] === 'X' ? 16 : 10)) : (ENT[e.toLowerCase()] ?? m))
  .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const field = (xml, tagName) => { const m = xml.match(new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)</${tagName}>`, 'i')); return m ? decode(m[1]) : ''; };

async function getFeed(url) {
  const ctl = new AbortController(); const timer = setTimeout(() => ctl.abort(), 20000);
  try {
    const r = await fetch(url, { headers: { 'user-agent': UA, accept: 'application/rss+xml, application/xml, text/xml' }, signal: ctl.signal });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const xml = await r.text();
    return [...xml.matchAll(/<item[\s>][\s\S]*?<\/item>/gi)].map(m => m[0]);
  } finally { clearTimeout(timer); }
}

const cutoff = Date.now() - DAYS * 864e5;
const iso = d => new Date(d).toISOString().slice(0, 10);
const key = t => t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 70);

function parseItem(raw, sourceName) {
  let title = field(raw, 'title'); const link = field(raw, 'link'); const date = Date.parse(field(raw, 'pubDate'));
  let source = sourceName;
  const srcTag = raw.match(/<source[^>]*>([\s\S]*?)<\/source>/i);
  if (srcTag) { source = decode(srcTag[1]); if (title.endsWith(' - ' + source)) title = title.slice(0, -(source.length + 3)); }
  const desc = field(raw, 'description').slice(0, 400);
  if (!title || !link || !date || date < cutoff || date > Date.now() + 864e5) return null;
  const it = { title, url: link, source, ts: date, date: iso(date), desc: srcTag ? '' : desc };
  return isNoise(it) ? null : it;
}

async function collect() {
  const byPlace = Object.fromEntries(PLACES.map(p => [p.id, []]));
  const log = [];
  // 1) publisher feeds, assigned to a place by keyword
  await Promise.all(FEEDS.map(async f => {
    try {
      const items = (await getFeed(f.url)).map(x => parseItem(x, f.name)).filter(Boolean);
      let used = 0;
      for (const it of items) {
        const text = it.title + ' ' + it.desc;
        if (!f.cyber && !CYBER_RE.test(it.title)) continue;
        if (f.cyber && !CYBER_RE.test(text)) continue;
        const mh = PLACES[1].kw.test(text);
        for (const p of PLACES) if ((p.id === 'IN' ? !mh && inPlace(p, text) : inPlace(p, text))) { byPlace[p.id].push({ ...it, direct: true }); used++; break; }
      }
      log.push(`ok   ${f.name} (${items.length} fresh, ${used} placed) ${f.url}`);
    } catch (e) { log.push(`DEAD ${f.name} ${f.url}: ${e.message}`); }
  }));
  // 2) Google News search per place (aggregates HT, TOI, NYT, Reuters, etc.)
  await Promise.all(PLACES.map(async p => {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(p.q + ` when:${DAYS}d`)}&hl=en-${p.gl}&gl=${p.gl}&ceid=${p.gl}:en`;
    try {
      const items = (await getFeed(url)).map(x => parseItem(x, 'Google News')).filter(it => it && CYBER_RE.test(it.title) && inPlace(p, it.title));
      byPlace[p.id].push(...items);
      log.push(`ok   Google News "${p.name}" (${items.length} fresh)`);
    } catch (e) { log.push(`DEAD Google News "${p.name}": ${e.message}`); }
  }));
  return { byPlace, log };
}

const words = t => new Set(key(t).replace(/\be ?mails?\b/g, 'email').split(' ').filter(w => w.length > 2));
const similar = (a, b) => { const A = words(a), B = words(b); let n = 0; for (const w of A) if (B.has(w)) n++; return n / Math.max(1, Math.min(A.size, B.size)) > 0.6; };
function pick(list) {
  const seen = new Set(), srcCount = {}, out = [];
  // newest first; direct publisher items get a small boost; max 2 per source for variety
  list.sort((a, b) => (b.ts + (b.direct ? 864e5 : 0)) - (a.ts + (a.direct ? 864e5 : 0)));
  for (const it of list) {
    const k = key(it.title); if (seen.has(k) || out.some(o => similar(o.title, it.title))) continue;
    if ((srcCount[it.source] || 0) >= 2) continue;
    seen.add(k); srcCount[it.source] = (srcCount[it.source] || 0) + 1; out.push(it);
    if (out.length >= PER_PLACE) break;
  }
  return out.sort((a, b) => b.ts - a.ts);
}

async function gemini(items) {
  const keyEnv = process.env.GEMINI_API_KEY; if (!keyEnv) return null;
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const out = new Map();
  for (let i = 0; i < items.length; i += 15) {
    const batch = items.slice(i, i + 15);
    const prompt = `You tag cyber-security news headlines for a portfolio threat map.\nFor each item return: "i" (the index), "summary" (max 2 short sentences, in your own words, using ONLY facts present in the headline/snippet — no copying, no speculation), "attack" (the single best-fit MITRE ATT&CK technique ID like T1566 or T1190, or a tactic ID like TA0001 when no technique is clear), "technique" (that technique's official name), "place" (one of ${PLACES.map(p => p.id).join(', ')} — MH means Mumbai/Maharashtra — the place the incident is about, or the given one if unclear).\nReturn a JSON array only.\n\n` +
      batch.map((it, j) => JSON.stringify({ i: i + j, place: it.place, headline: it.title, snippet: it.desc || undefined, source: it.source })).join('\n');
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': keyEnv },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.2 } }),
      });
      if (!r.ok) throw new Error('HTTP ' + r.status + ' ' + (await r.text()).slice(0, 200));
      const j = await r.json();
      const arr = JSON.parse(j.candidates?.[0]?.content?.parts?.[0]?.text || '[]');
      for (const x of arr) if (Number.isInteger(x.i)) out.set(x.i, x);
    } catch (e) { console.warn('gemini batch failed, keyword tags kept:', e.message); }
    if (i + 15 < items.length) await new Promise(res => setTimeout(res, 7000)); // stay inside free-tier rate limits
  }
  return out;
}

async function main() {
  let prev = null; try { prev = JSON.parse(await readFile(OUT, 'utf8')); } catch {}
  const { byPlace, log } = await collect();
  log.forEach(l => console.log(l));
  const chosen = [];
  for (const p of PLACES) for (const it of pick(byPlace[p.id])) chosen.push({ ...it, place: p.id });
  if (!chosen.length) { console.error('No fresh items from any feed — keeping the existing threats.json.'); return; }

  const ai = await gemini(chosen);
  console.log(ai ? `gemini: ${ai.size}/${chosen.length} items tagged` : 'GEMINI_API_KEY not set — keyword tagging fallback');
  const ids = new Set(PLACES.map(p => p.id));
  const final = Object.fromEntries(PLACES.map(p => [p.id, []]));
  chosen.forEach((it, i) => {
    const g = ai?.get(i); const kwTag = tag(it.title + ' ' + it.desc);
    const okId = g && /^(T\d{4}(\.\d{3})?|TA\d{4})$/.test(String(g.attack || ''));
    const place = g && ids.has(g.place) ? g.place : it.place;
    const row = { title: it.title, date: it.date, source: it.source, url: it.url, technique: okId ? String(g.technique || kwTag.technique).slice(0, 80) : kwTag.technique, attack: okId ? g.attack : kwTag.attack };
    if (g?.summary) row.summary = String(g.summary).slice(0, 320);
    if (final[place].length < PER_PLACE + 1 && !final[place].some(x => key(x.title) === key(row.title))) final[place].push(row);
  });

  const places = PLACES.map(p => {
    let inc = final[p.id];
    if (inc.length < MIN_PER_PLACE) { // top up from the previous file so no pin is ever empty
      const old = prev?.places?.find(x => x.id === p.id)?.incidents || [];
      for (const o of old) { if (inc.length >= MIN_PER_PLACE) break; if (!inc.some(x => key(x.title) === key(o.title))) inc = [...inc, o]; }
    }
    return { id: p.id, name: p.name, lat: p.lat, lon: p.lon, incidents: inc };
  });
  const data = {
    generated: iso(Date.now()),
    note: `Auto-collected from public news RSS (last ${DAYS} days). ${ai ? 'Summaries and ATT&CK IDs by Gemini' : 'ATT&CK IDs by keyword'} — best-fit mappings of the public reports, not attributions.`,
    places,
  };
  await mkdir(path.dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(data, null, 1) + '\n');
  console.log(`wrote ${path.relative(ROOT, OUT)}: ` + places.map(p => `${p.id}=${p.incidents.length}`).join(' '));
}
main().catch(e => { console.error(e); process.exit(1); });
