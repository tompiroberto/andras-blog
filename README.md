# András – travel & running blog

A multilingual static site (English, Hungarian, European Portuguese, Romanian, Greek, Georgian) built with **Astro**, TypeScript and plain CSS. It is hosted on **Netlify**.

## Run it locally

You need Node.js 22 or newer.

```bash
npm install
npm run dev        # http://localhost:4321  (draft posts are visible here)
npm run build      # type-check + static build into dist/  (drafts are left out)
npm run preview    # serve the built site
```

## Project structure

```
src/
  i18n/            en.json hu.json pt.json ro.json el.json ka.json + index.ts (t() helper)
  data/            countries.json (map), chile-cities.json (scrollbar), site.json (links, PBs, badges)
  content/posts/   blog posts (Markdown / MDX)
  components/      Header, LanguageSwitcher, Globe, ChileScroll, PowerLines, Footer, WorldMap, …
  layouts/         BaseLayout.astro
  pages/           index.astro (language redirect) and [lang]/… (all translated pages)
  lib/             helpers (posts, categories, Chile geometry, form handler)
  styles/          global.css (all colours and sizes as CSS variables)
public/
  images/          photo and supporter logos
  data/            countries-50m.json (world map, loaded lazily)
  __forms.html     static copy of the contact form so Netlify can detect it
starter-assets/    the original assets this site was built from (not used by the build)
```

## Add a blog post

1. Create a file in `src/content/posts/`, for example `my-trip-to-vienna.md`. The file name becomes the URL: `/en/posts/my-trip-to-vienna/`.
2. Start it with this header:

   ```markdown
   ---
   title: 'My trip to Vienna'
   date: 2026-10-01
   category: adventures        # adventures | erasmus | random
   lang: en                    # language the post is written in (en, hu, pt, ro, el, ka)
   excerpt: 'One or two sentences shown on the post card.'
   cover: ./images/vienna.jpg  # optional; put the image next to the post, e.g. src/content/posts/images/
   coverAlt: 'Describe the cover photo'
   draft: false                # true = only visible with npm run dev
   countries: ['AT']           # optional, ids from src/data/countries.json
   ---

   Your text in Markdown…
   ```

3. Each post appears in every language version of the site. If a visitor reads it in another language, a small “Only in English” pill (or the name of the post's language) is shown.

The three posts in `src/content/posts/` are **placeholders** with `draft: true`. Replace them, or delete them. `cycling-to-my-classmate.md` is linked from the Slovakia tooltip on the map. The link appears automatically once that post has `draft: false`.

## Edit translations and data

- **Interface text:** `src/i18n/<lang>.json`. All six files use the same keys. If a key is missing in one language, the English text is used, and a warning is printed while running `npm run dev`.
- **Map countries:** `src/data/countries.json`. `isoNumeric` must match the numeric country code used by world-atlas (e.g. `"040"` for Austria). `status` is one of `home`, `visited`, `transit`, `now`, `planned`. Entries without `isoNumeric` are skipped.
- **Links, e-mail, personal bests, race badges, language chips:** `src/data/site.json`.
- **Chile scrollbar cities:** `src/data/chile-cities.json`.

## Interactive extras

- **Scrollbar ribbons** – the scrollbar on the right can be Chile, Argentina, Sweden, Norway, Mozambique, the Nile, the Mississippi, Mexico, Japan, Vietnam or New Zealand (dropdown above it; in the ☰ menu on phones). Shapes and frames are defined in `src/lib/ribbon.ts`; the cities are in `src/data/chile-cities.json`, `argentina-cities.json` and `ribbon-cities.json` (north to south: first city = top of the page).
- **Coordinate system** – latitude runs down the whole page, the screen is centred on Budapest and both axes share one scale (`src/lib/pageGeo.ts`). The continent outlines, the popping city names (`src/data/world-cities.json`), the coordinate grid and the city search all use it.
- **City search** – the search button looks a city up with [Open-Meteo](https://open-meteo.com/) (falls back to OpenStreetMap Nominatim), re-centres the page on it and scrolls there.
- **Header buttons** – search, colour theme (`src/lib/themes.ts` + the `:root[data-theme]` blocks in `global.css`), coordinate grid, background cities on/off. The choices are remembered in the browser.

Data sources: country and land shapes from [world-atlas](https://github.com/topojson/world-atlas) (Natural Earth); river centrelines from Natural Earth 1:50m (`src/data/rivers.json`). Both are public domain.

## Deploy to Netlify

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. In Netlify, choose **Add new site → Import an existing project** and connect the repository.
3. Build settings (already set in `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy. Then update the site address in `astro.config.mjs` (`SITE`) and `public/robots.txt` to the real domain, and deploy again. It is used for the sitemap, canonical links and social previews.

## Contact form and e-mail notifications

The form uses **Netlify Forms**. Netlify detects the form called `message` automatically when the site is deployed. Messages are never shown on the site.

To receive every message by e-mail:

1. In Netlify, open the site and go to **Site configuration → Forms**. If form detection is off, click **Enable form detection** and redeploy once.
2. Go to **Site configuration → Notifications → Emails and webhooks → Form submission notifications** and click **Add notification → Email notification**.
3. Event: *New form submission*. Email: the address in `src/data/site.json` (`email`). Form: `message`. Save.

Submissions can also be read under **Forms → message** in the Netlify dashboard, and deleted there when someone asks.

Spam protection: a hidden honeypot field (`bot-field`). You can also turn on Netlify's spam filter or reCAPTCHA in the Forms settings.

### Switching to Formspree later

All sending code is in `src/lib/formHandler.ts`. Set `FORM_PROVIDER = 'formspree'` and fill in `FORMSPREE_ENDPOINT` (e.g. `https://formspree.io/f/abcdefg`). No other file needs to change.

## Notes

- The EU logo is shown from `logo-erasmus-plus-cofunded-trimmed.png/.webp`. This is the original file with its large white margins cut off, colours unchanged, so that at equal height it is not smaller than the foundation logo.
- All animations stop when the visitor's system asks for reduced motion.


## Developer mode (uploading posts and photos)

Click the header title (the globe or "András") **5 times quickly**: a small green panel opens with
shortcuts into the editor at `/admin` (Decap CMS): new post, upload a photo, media library.
The same 5 clicks turn it off again. The clicks only reveal the door – saving needs a login.

**Online (Netlify), once:**
1. Netlify → Site configuration → Identity → *Enable Identity*. Registration: **Invite only**.
2. Identity → Services → *Enable Git Gateway*.
3. Identity → *Invite users* → your e-mail, accept the invitation.
4. Open `https://<your-site>/admin/`, log in. New posts are saved to `src/content/posts/`,
   photos to `src/content/photos/` (pictures in `src/assets/`), and Netlify rebuilds the site
   (about a minute). Photos appear in the new **Photos** section of the home page.

**Locally:** run `npx decap-server` in a second terminal next to `npm run dev`, then open
`http://localhost:4321/admin/` – no login needed, files are written straight into the project.
