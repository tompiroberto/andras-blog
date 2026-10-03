/**
 * /calendar.json – the calendar's events (src/data/calendar.json). Copies of the site on other hosts read
 * it from the main site, so their calendar stays up to date.
 */
import type { APIRoute } from 'astro';
import calendar from '../data/calendar.json';

export const GET: APIRoute = () => new Response(JSON.stringify(calendar), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
