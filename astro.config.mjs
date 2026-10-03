// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The live Netlify address (canonical links, hreflang, the sitemap and the structured data use it).
// If the site gets its own domain, change it here and in public/robots.txt.
const SITE = 'https://lambent-platypus-c39161.netlify.app';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'hu', 'pt', 'ro', 'el', 'ka'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      // The root page (src/pages/index.astro) does its own browser-language redirect.
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    // the map loads these lazily; pre-bundling them avoids dev-server re-optimisation hiccups
    optimizeDeps: { include: ['d3-geo', 'd3-zoom', 'd3-selection', 'topojson-client'] },
  },
  integrations: [
    sitemap({
      filter: (page) => page !== `${SITE}/`,
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', hu: 'hu', pt: 'pt-PT', ro: 'ro', el: 'el', ka: 'ka' },
      },
    }),
  ],
});
