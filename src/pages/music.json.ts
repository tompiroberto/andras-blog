/**
 * /music.json – every track, newest first. Copies of the site on other hosts (scripts/export.mjs) read it
 * from the main site, so music uploaded there plays in the copy too, without a new upload of the copy.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const items = (await getCollection('music'))
    .map((e) => ({ id: e.id, ...e.data, date: e.data.date ? e.data.date.toISOString().slice(0, 10) : '' }))
    .sort((a, b) => b.date.localeCompare(a.date));
  return new Response(JSON.stringify({ items }), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
