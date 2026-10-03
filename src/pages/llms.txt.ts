/**
 * /llms.txt – a short plain-text guide to the site for AI answer engines (https://llmstxt.org):
 * who András is, the main pages, and every post with its summary.
 */
import type { APIRoute } from 'astro';
import { getPosts } from '../lib/posts';
import { localePath, t } from '../i18n';
import site from '../data/site.json';

export const GET: APIRoute = async ({ site: base }) => {
  const url = (p: string) => new URL(p, base).href;
  const posts = await getPosts();
  const pb = site.personalBests.map((b) => `${b.distance} ${b.time}`).join(', ');
  const lines = [
    `# Vásárhelyi András Péter (András) – blog & CV`,
    '',
    `> ${t('en', 'meta.person')}`,
    '',
    `The site is in six languages (English, Hungarian, Portuguese, Romanian, Greek, Georgian); the English pages are under /en/.`,
    '',
    '## Facts',
    '- Lives in Budapest, Hungary; final-year student at Budapesti Fazekas Mihály Gimnázium (maths and geography), going on to study geography at ELTE (Eötvös Loránd University).',
    '- Member of the Hungarian national skyrunning team.',
    `- Running personal bests: ${pb}.`,
    '- Travels low-budget and by hitchhiking; took part in Erasmus+ youth projects (Lithuania, Greece).',
    `- Instagram: ${site.instagram.url} · Strava: ${site.strava}`,
    '',
    '## Main pages',
    `- [CV](${url(localePath('en'))}): studies, sport, volunteering, languages`,
    `- [Blog home](${url(localePath('en'))}#explore): running, hitchhiking, low-budget travel, Erasmus+, random things`,
    `- [Gallery](${url(localePath('en', 'gallery'))}): photos with places on a map`,
    `- [Music](${url(localePath('en', 'music'))})`,
    `- [Where I've been](${url(localePath('en', 'map'))}): countries visited and planned`,
    '',
    '## Posts',
    ...posts.map((p) => `- [${p.data.title}](${url(localePath('en', `posts/${p.id}`))}) (${p.data.date ? `${p.data.date.toISOString().slice(0, 10)}, ` : ''}${p.data.category}): ${p.data.excerpt}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
