/**
 * /whereabouts.json – where András is, from when (src/data/whereabouts.json). Copies of the site on other
 * hosts read it from the main site, so their "currently in …" pill follows a change made there.
 */
import type { APIRoute } from 'astro';
import data from '../data/whereabouts.json';

export const GET: APIRoute = () => new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
