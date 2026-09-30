/**
 * Random facts about a place, from the introduction of its Wikipedia article (CC BY-SA).
 * The article is found by searching Wikipedia for the name and keeping the result whose coordinates
 * are close to the place – so "Santiago" in Chile never returns Santiago de Compostela and "Bergen" in
 * Norway never returns Bergen County, New Jersey. Tries the page language, then English.
 */
import { getJson } from './geocode';

/** Wikipedia can be slow to answer geosearch queries; give it more time than the geocoder. */
const WIKI_TIMEOUT_MS = 20000;

export interface CityFacts {
  title: string;
  url: string;
  wikiLang: string;
  sentences: string[];
}

interface WikiPage {
  title: string;
  extract?: string;
  fullurl?: string;
  index?: number;
  coordinates?: { lat: number; lon: number }[];
}

/** An article counts as "this place" if its coordinates are within this distance. */
const MAX_DISTANCE_KM = 60;

function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const rad = Math.PI / 180;
  const a =
    Math.sin(((lat2 - lat1) * rad) / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(((lon2 - lon1) * rad) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(a));
}

const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N} ]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** How well an article title matches the place name (0 = not at all). */
function score(title: string, name: string): number {
  const t = normalize(title);
  const n = normalize(name);
  if (!n) return 0;
  if (t === n) return 3;
  if (t.startsWith(`${n} `)) return 2; // "Santiago, Chile", "Bergen (Norway)"
  if (t.includes(n)) return 1;
  return 0;
}

/** English sentences that lean on the previous one ("This was followed by…") make no sense alone. */
const DEPENDS_ON_CONTEXT = /^(This|These|That|Those|It|Its|They|Their|He|She|His|Her|Such|However|Also)/;

function toSentences(extract: string, wikiLang: string): string[] {
  return extract
    .replace(/\s*\([^()]*\)/g, '') // drop parentheticals (pronunciations, alternative names)
    .split(/\n+/)
    .flatMap((para) => para.split(/(?<=[.!?;])\s+(?=\S)/))
    .map((s) => s.trim())
    .filter((s) => s.length >= 40 && s.length <= 360 && /[.!?;]$/.test(s))
    .filter((s, i) => i === 0 || wikiLang !== 'en' || !DEPENDS_ON_CONTEXT.test(s));
}

async function fromWiki(wikiLang: string, name: string, lat: number, lon: number): Promise<CityFacts | null> {
  const base = `https://${wikiLang}.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*&prop=extracts|info|coordinates&exintro=1&explaintext=1&inprop=url&exlimit=10&colimit=10`;
  const pick = (pages: WikiPage[], needCoords: boolean) =>
    pages
      .map((p) => {
        const c = p.coordinates?.[0];
        return { p, s: score(p.title, name), d: c ? distanceKm(lat, lon, c.lat, c.lon) : Infinity };
      })
      .filter((x) => x.s > 0 && (x.p.extract ?? '').length > 80 && (!needCoords || x.d <= MAX_DISTANCE_KM))
      .sort((a, b) => b.s - a.s || a.d - b.d || (a.p.index ?? 99) - (b.p.index ?? 99))[0]?.p;

  // 1) search by name, keep the article located near the place
  const found = await getJson<{ query?: { pages?: WikiPage[] } }>(
    `${base}&generator=search&gsrsearch=${encodeURIComponent(name)}&gsrlimit=10&gsrnamespace=0`,
    WIKI_TIMEOUT_MS,
  );
  let best = pick(found.query?.pages ?? [], true);
  // 2) otherwise: articles near the coordinates whose title matches the name
  if (!best) {
    const near = await getJson<{ query?: { pages?: WikiPage[] } }>(
      `${base}&generator=geosearch&ggscoord=${lat}|${lon}&ggsradius=10000&ggslimit=10`,
      WIKI_TIMEOUT_MS,
    );
    best = pick(near.query?.pages ?? [], false);
  }
  if (!best?.extract) return null;
  const sentences = toSentences(best.extract, wikiLang);
  if (!sentences.length) return null;
  return {
    title: best.title,
    url: best.fullurl ?? `https://${wikiLang}.wikipedia.org/wiki/${encodeURIComponent(best.title.replace(/ /g, '_'))}`,
    wikiLang,
    sentences,
  };
}

export async function getCityFacts(name: string, lat: number, lon: number, lang: string): Promise<CityFacts | null> {
  let lastError: unknown = null;
  for (const wikiLang of [...new Set([lang, 'en'])]) {
    try {
      const facts = await fromWiki(wikiLang, name, lat, lon);
      if (facts) return facts;
    } catch (err) {
      lastError = err;
    }
  }
  if (lastError) throw lastError;
  return null;
}
