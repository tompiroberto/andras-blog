/**
 * /posts.json – every published post (for the cards). Copies of the site on other hosts read it from the
 * main site: a post written there gets a card in the copy's lists too (opening on the main site).
 */
import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { getPosts } from '../lib/posts';

export const GET: APIRoute = async () => {
  const items = await Promise.all(
    (await getPosts()).map(async (p) => ({
      id: p.id,
      title: p.data.title,
      excerpt: p.data.excerpt,
      category: p.data.category,
      lang: p.data.lang,
      date: p.data.date ? p.data.date.toISOString().slice(0, 10) : '',
      month: p.data.datePrecision === 'month',
      cover: p.data.cover ? (await getImage({ src: p.data.cover, width: 800, height: 450, fit: 'cover', position: p.data.coverPosition })).src : '',
    })),
  );
  return new Response(JSON.stringify({ items }), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
