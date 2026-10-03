/**
 * /map.json – the world map's countries (src/data/countries.json) and pins (src/data/map-pins.json).
 * Copies of the site on other hosts read it from the main site, so their map follows the edits made there.
 */
import type { APIRoute } from 'astro';
import countries from '../data/countries.json';
import pins from '../data/map-pins.json';

export const GET: APIRoute = () => new Response(JSON.stringify({ countries, pins }), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
