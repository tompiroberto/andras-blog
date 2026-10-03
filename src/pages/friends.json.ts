/**
 * /friends.json – the countries where András has friends (src/data/friends.json). Copies of the site on
 * other hosts read it from the main site, so the world map's 👥 layer stays up to date there too.
 */
import type { APIRoute } from 'astro';
import friends from '../data/friends.json';

export const GET: APIRoute = () => new Response(JSON.stringify(friends), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
