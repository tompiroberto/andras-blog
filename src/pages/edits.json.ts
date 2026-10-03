/**
 * /edits.json – the page edits (src/data/edits.json) and the home-page layout (src/data/layout.json).
 * Copies of the site on other hosts read them from the main site, so texts, colours, added elements and
 * the section order changed in developer mode show up in the copy too.
 */
import type { APIRoute } from 'astro';
import edits from '../data/edits.json';
import layout from '../data/layout.json';

export const GET: APIRoute = () => new Response(JSON.stringify({ edits, layout }), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
