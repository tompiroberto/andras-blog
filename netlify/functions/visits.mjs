/**
 * The visitor counter (/api/visits) – stored in Netlify Blobs, no personal data: only numbers.
 * POST: a visit (the page sends it once a day per browser; {"new": true} the first time ever) –
 * GET: just the numbers. Copies of the site on other hosts call it on the main site (CORS).
 */
import { getStore } from '@netlify/blobs';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store',
};

export default async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  const store = getStore({ name: 'visits', consistency: 'strong' });
  const today = new Date().toISOString().slice(0, 10);
  const data = (await store.get('counts', { type: 'json' })) ?? { visitors: 0, visits: 0, days: {} };
  if (req.method === 'POST') {
    const body = await req.json().catch(() => ({}));
    if (body?.new === true) data.visitors++;
    data.visits++;
    data.days[today] = (data.days[today] ?? 0) + 1;
    // only the last ~13 months of days are kept
    const days = Object.keys(data.days).sort();
    for (const d of days.slice(0, Math.max(0, days.length - 400))) delete data.days[d];
    await store.setJSON('counts', data);
  }
  return Response.json({ visitors: data.visitors, visits: data.visits, today: data.days[today] ?? 0 }, { headers: CORS });
};

export const config = { path: '/api/visits' };
