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
  lib/             helpers (posts, categories, Chile geometry, form handler, e-mail fallback)
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

## Front page: the CV

A new visit to the home page (`/hu/`, `/en/`, …) opens the CV (`src/components/CvView.astro`, content in
`src/data/cv.ts`). "Go to the blog" (top right) switches the tab to the blog; the header's CV switch brings
the CV back. The choice lives in `sessionStorage` (`andras-view`), read by the head script in
`src/layouts/BaseLayout.astro`.

## Messages

"Message me" and every "message me about this place" window are forms on the site (topic, name, contact,
message), sent by `src/lib/formHandler.ts`:

1. **Formspree** (`FORMSPREE_ENDPOINT`, https://formspree.io/f/mbglvnoe) e-mails each message
   (Free plan: about 50 a month). Subject, reply address and honeypot are filled in automatically.
2. If Formspree fails (monthly limit, outage): **Netlify Forms** (form `message`, static copy in
   `public/__forms.html`).
3. If both fail: the visitor's e-mail app opens with the message already written (`src/lib/mail.ts`).

The "Message me works by…" switch in developer mode can turn the forms into e-mail buttons instead.

## Notes

- The EU logo is shown from `logo-erasmus-plus-cofunded-trimmed.png/.webp`. This is the original file with its large white margins cut off, colours unchanged, so that at equal height it is not smaller than the foundation logo.
- All animations stop when the visitor's system asks for reduced motion.


## Developer mode (uploading posts and photos)

Click the header title (the globe or "András") **5 times quickly**: a small green panel opens with
links to GitHub's own editor pages – no setup, only the repository owner's GitHub login:

- **New post:** a new file in `src/content/posts/` with the template and today's date filled in.
- **Upload photos (with description):** a window on the site: pick photos, write a description (and
  place) for each, set the date, press Upload. Photos are shrunk to JPEG and saved to
  `src/assets/photos/`, descriptions to `src/content/photos/*.yml`, in one commit through the GitHub
  API. The first time it asks for a GitHub key: github.com/settings/personal-access-tokens/new →
  Repository access: *Only select repositories* → `andras-blog` → Permissions: *Contents: Read and
  write* → Generate. The key stays in that browser's localStorage ("Forget key" removes it).
  Photos appear on the home page (newest 6) and on the gallery page `/[lang]/gallery/`.
- **Image for a post:** upload into `src/assets/posts/`, then use it in a post as
  `![description](../../assets/posts/name.jpg)` or as `cover: ../../assets/posts/name.jpg`.
- **Edit posts:** the posts folder (open a file, pencil icon).

Press **Commit changes**; Netlify rebuilds the site in about a minute. Afterwards run `git pull`
locally before pushing your own changes.
