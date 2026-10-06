/**
 * The site's live address – the ONE place to change it when the site moves to a new host or domain.
 * astro.config.mjs uses it (canonical links, sitemap), and a copy on another host (static export) reads the
 * live data (gallery, calendar, counters …) from it. A build can override it: SITE_URL / PUBLIC_MAIN_SITE.
 */
export const MAIN_SITE = 'https://lambent-platypus-c39161.netlify.app';
