/**
 * /counters.json – the counters (src/data/counters.json). Copies of the site on other hosts read it from the
 * main site, so a +1 made there shows on them too.
 */
import type { APIRoute } from 'astro';
import data from '../data/counters.json';

export const GET: APIRoute = () => new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
