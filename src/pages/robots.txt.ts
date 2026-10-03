/**
 * /robots.txt – everyone (AI answer engines too) may read the site; the sitemap at this build's address.
 */
import type { APIRoute } from 'astro';

const BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'];

export const GET: APIRoute = ({ site }) =>
  new Response(
    ['User-agent: *', 'Allow: /', '', '# AI search and answer engines are welcome to read the site', ...BOTS.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']), `Sitemap: ${new URL('/sitemap-index.xml', site).href}`, ''].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
