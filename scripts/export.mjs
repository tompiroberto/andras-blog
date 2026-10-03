/**
 * A static copy of the site for another host (a plain web server, e.g. a cPanel host such as Papaki):
 *   node scripts/export.mjs [https://its-address]
 * builds with PUBLIC_STATIC_EXPORT=1 (no developer mode, no Netlify Forms; messages go through
 * Formspree, or the visitor's e-mail app) and the given address (canonical links, sitemap), into dist/.
 * Packing dist/ into a zip is done afterwards (its contents go straight into the host's public_html).
 */
import { spawnSync } from 'node:child_process';

const site = process.argv[2];
const env = { ...process.env, PUBLIC_STATIC_EXPORT: '1', ...(site ? { SITE_URL: site } : {}) };
const r = spawnSync('npx', ['astro', 'build'], { stdio: 'inherit', env, shell: true });
process.exit(r.status ?? 1);
