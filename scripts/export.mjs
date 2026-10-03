/**
 * A static copy of the site for another host (a plain web server, e.g. a cPanel host such as Papaki):
 *   node scripts/export.mjs [https://its-address] [--no-dev]
 * builds into dist/ with PUBLIC_STATIC_EXPORT=1: no Netlify Forms (messages go through Formspree, or the
 * visitor's e-mail app), the given address for canonical links and the sitemap. Developer mode stays in
 * (it saves to GitHub; the copy is refreshed by a new upload or by .github/workflows/deploy-ftp.yml);
 * --no-dev leaves it out. The contents of dist/ go straight into the host's public_html.
 */
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const site = args.find((a) => /^https?:\/\//.test(a));
const env = {
  ...process.env,
  PUBLIC_STATIC_EXPORT: '1',
  ...(args.includes('--no-dev') ? { PUBLIC_NO_DEV: '1' } : {}),
  ...(site ? { SITE_URL: site } : {}),
};
const r = spawnSync('npx', ['astro', 'build'], { stdio: 'inherit', env, shell: true });
process.exit(r.status ?? 1);
