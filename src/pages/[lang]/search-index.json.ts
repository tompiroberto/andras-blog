/**
 * /<lang>/search-index.json – everything the header's keyword search can find, in the page's language:
 * posts, the site's pages, gallery pictures, music, calendar events and plans, counters. Fetched once,
 * the first time the search is used. A copy of the site on another host reads the main site's.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getPosts } from '../../lib/posts';
import { getPhotos } from '../../lib/photos';
import { categoryMeta } from '../../lib/categories';
import calendar from '../../data/calendar.json';
import counters from '../../data/counters.json';
import { langStaticPaths, localePath, t, type Lang, type TKey } from '../../i18n';

export const getStaticPaths = langStaticPaths;

type Hit = { k: string; t: string; s?: string; u: string; w?: string };

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as Lang;
  const hu = lang === 'hu';
  const pick = (o: Record<string, unknown>, k: string) => String((hu ? o[k] : o[`${k}_en`] || o[k]) ?? '');
  const items: Hit[] = [];

  // the site's own pages and the home page's parts
  const pages: [string, TKey, string, string?][] = [
    ['🏠', 'nav.about', localePath(lang) + '#about', 'rólam about me bemutatkozás'],
    ['🧭', 'nav.explore', localePath(lang) + '#explore', 'felfedezés kategóriák'],
    ['💡', 'nav.plans', localePath(lang) + '#plans', 'tervek plans jövő'],
    ['✉️', 'nav.message', localePath(lang) + '#message', 'üzenet kapcsolat message contact'],
    ['📷', 'gallery.title', localePath(lang, 'gallery'), 'galéria képek fotók videók photos'],
    ['🎵', 'music.title', localePath(lang, 'music'), 'zene playlist music'],
    ['🔢', 'nav.counters', localePath(lang, 'counters'), 'számlálók statisztika counters'],
    ['📅', 'nav.calendar', localePath(lang, 'calendar'), 'naptár események calendar'],
  ];
  for (const [icon, key, u, w] of pages) items.push({ k: icon, t: t(lang, key), u, w });

  for (const p of await getPosts()) {
    const d = p.data;
    items.push({
      k: '📝',
      t: d.title,
      s: d.excerpt,
      u: localePath(lang, `posts/${p.id}`),
      w: [t(lang, categoryMeta(d.category).titleKey), d.place, ...(d.countries ?? [])].filter(Boolean).join(' '),
    });
  }
  for (const ph of await getPhotos(lang)) {
    items.push({ k: ph.video ? '🎬' : '📷', t: ph.caption, s: [ph.place, (ph.tags ?? []).map((x) => `#${x}`).join(' ')].filter(Boolean).join(' · '), u: localePath(lang, 'gallery') });
  }
  for (const m of await getCollection('music')) {
    const d = m.data;
    items.push({ k: '🎵', t: d.artist ? `${d.artist} – ${d.title}` : d.title, s: [d.place, (d.tags ?? []).map((x) => `#${x}`).join(' ')].filter(Boolean).join(' · '), u: localePath(lang, 'music'), w: d.about });
  }
  for (const e of calendar.events as Record<string, unknown>[]) {
    items.push({
      k: '📅',
      t: pick(e, 'title'),
      s: [pick(e, 'place'), `${e.from} – ${e.to}`].filter(Boolean).join(' · '),
      u: `${localePath(lang, 'calendar')}?event=${encodeURIComponent(String(e.id))}`,
      w: [pick(e, 'note'), ...((e.tags as string[]) ?? []).map((x) => `#${x}`)].join(' '),
    });
  }
  for (const pl of (calendar as { plans?: Record<string, unknown>[] }).plans ?? []) {
    items.push({ k: '💡', t: pick(pl, 'text'), s: pick(pl, 'when'), u: localePath(lang, 'calendar') });
  }
  for (const c of counters.counters as { icon: string; title: string; title_en?: string; items?: Record<string, unknown>[] }[]) {
    items.push({ k: c.icon, t: pick(c as Record<string, unknown>, 'title'), u: localePath(lang, 'counters'), w: (c.items ?? []).map((it) => pick(it, 'text')).join(' ') });
  }
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
