# Handoff: András's website (for the next Claude session)

## Who and how
- **The user is András.** He is a Hungarian secondary-school student, a runner and traveller (Erasmus+ youth exchanges).
- **Language:** always reply in **Hungarian**. Every site text exists in 6 languages: `en, hu, pt, ro, el, ka`.
- **Words:** never use the word „imádom”.
- **He pushes himself.** Give him the commands; do not push for him:
  ```
  cd C:\Users\Asus\Downloads\andras-blog
  git pull --rebase --autostash
  git push
  ```
- **Secrets:**
  - Never ask for his GitHub token, an FTP password or any other key in chat.
  - The token lives only in his browser's localStorage (`andras-gh-token`).
- **Working style:** he sends many small requests quickly, often while you are working. Do them all, test them in a browser, then report in short Hungarian.

## The project
- **Repo and hosting:**
  - Repo: `C:\Users\Asus\Downloads\andras-blog` (GitHub `tompiroberto/andras-blog`, branch `main`).
  - Netlify auto-deploys: https://lambent-platypus-c39161.netlify.app
- **Stack:** Astro 7 (static), TypeScript, content collections (posts `.md`, photos `.yml`, music `.yml`).
  - i18n lives in `src/i18n/{lang}.json` and is read with `t(lang, key)`.
- **Node is not on PATH.**
  - Use `export PATH="/c/Users/Asus/tools/node:$PATH"` (Bash), then `node node_modules/astro/bin/astro.mjs check|build|preview --port 4400`.
  - npm runs as `node /c/Users/Asus/tools/node/node_modules/npm/bin/npm-cli.js`.
- **The copy for the facilitator:**
  - A static copy is hosted by the Erasmus facilitator at https://andrásvásárhelyi.personalcv.eu (Papaki). Nobody has FTP access to it.
  - Build it with `node scripts/export.mjs`, then zip `dist/` with the site files at the zip root into `C:\Users\Asus\Downloads\andras-weboldal.zip`. Do not put instructions inside the zip.
  - After an export, run a normal `astro build` again so the local preview is normal.
  - The copy **live-syncs** from the Netlify site through CORS-enabled JSON endpoints (listed in `netlify.toml`):
    - `/gallery.json`, `/music.json`, `/edits.json`, `/posts.json`, `/calendar.json`
    - `/friends.json`, `/map.json`, `/whereabouts.json`, `/counters.json`
    - `/<lang>/search-index.json`
    - `/api/visits` (a Netlify Function with Blobs)
  - So **content** changes need no new zip; **code or design** changes do.

## Developer mode (the core idea)
- **How to open it:** 5 quick clicks on the header globe (or on the globe in map mode).
- **Editing:**
  - The page is edited in place (`EditMode.astro`, `SiteEdits.astro`).
  - The dev panel lives in `DevMode.astro`.
  - Uploaders: `PhotoUpload.astro` (images and videos; caption, place/coords, **hashtags**, date) and `MusicUpload.astro` (tags, place, date).
  - Uploaders take a `preset` detail: `{place, lat, lng, post, event, counter, tags, date}`.
- **Saving:**
  - Saves are GitHub commits from the browser (`src/lib/githubCommit.ts`) marked `[skip netlify]`, so they cost no Netlify credits.
  - **🚀 Publish** makes one deploy (about 15 of the free 300 credits a month).
  - `commitRaw` retries on "not a fast forward" and uses `cache: 'no-store'`.
- **Pitfalls:**
  - Elements created in JS don't get Astro's scoped `data-astro-cid` attribute. Clone a `<template>`, add the scope attribute, or use `:global()` / `is:global` styles.
  - Interactive dev UI must be listed in `isDevUi` in `EditMode.astro`, or the on-page editor captures its clicks.
  - The site itself commits data JSON (calendar, counters, gallery…). Before pushing local work, `git fetch` and rebase; resolve JSON conflicts by merging, never by blindly dropping his site edits.
  - `astro preview` caches the file list. Restart it after a build that adds files.

## Features (where they live)
- **Calendar** – `CalendarView.astro`:
  - It is now **its own page**: `src/pages/[lang]/calendar.astro`, a menu item plus the header button, with reveal animation. `?event=<id>` opens an event.
  - Left: adventure timeline with flags (`public/flags/*.svg`, lower-case codes).
  - Right: countdown (a click switches to "time since the last trip"), days abroad (a click shows %), and plans ("join me").
  - **Each event has its own page:** description in hu/en, photos/videos, music (with a playlist on the music page), documents (`public/docs`).
  - Event data: hashtags, a country auto-detected from the place by geocoding, and music linking.
  - Dev bar: new or last event; uploads (photo/video, music, documents) for a chosen event; plans; "currently in".
  - Data: `src/data/calendar.json` (`events`, `plans`; `_en` fields for English).
- **"Currently in" pill** (home hero):
  - Built in `src/lib/whereabouts.ts` from manual steps in `src/data/whereabouts.json` plus calendar trips (from a trip's first day its country; the day after it ends, HU).
  - Dev mode: a click edits it. It also offers an IP-based country check.
  - `scripts/whereabouts.mjs` and `.github/workflows/whereabouts.yml` update the maps' "now" country (nightly and on push).
- **Counters page** – `src/pages/[lang]/counters.astro` + `src/data/counters.json`:
  - Counters: Nutella 2, sleeping rough 4, feasts 2, flights (fromList, dated), youth exchanges, races abroad, hitchhiking 5.
  - Hover shows the list. Dev mode has +1, list lines, 📷 uploads, and new counters from patterns.
- **Gallery** – hashtag **folders**; dev mode adds "+ new folder" and ✎ (caption, place, tags). Data: `src/data/gallery.json` (`hidden`, `meta`, `folders`).
- **Music** – grouped by hashtag (or newest first), plus trip playlists from calendar events.
- **Search** (`CitySearch.astro`) – keywords first (index at `src/pages/[lang]/search-index.json.ts`); a "Cities" switch gives the old geocoding search.
- **World map** (`MapMode.astro`):
  - Friends layer: `src/data/friends.json`, with hu/en notes and hover.
  - Space floaters with speech bubbles.
  - Live sync for the copy.
- **Other:**
  - Post editor with category cards and a live card preview (`PostEditor.astro`).
  - Visitor counter in the footer.
  - CV view with LinkedIn.
  - Star-chart easter egg.
  - Landscape.
  - Themes.

## Open / next
- On wide screens the developer panel can still overlap the calendar's right column. The panel can be dragged or closed.
- The user's manual (`docs/KEZIKONYV.md`) does not yet describe the latest features (counters, calendar page, event pages, folders, search, "currently in" editor).
- Testing was done with puppeteer-core and headless Edge (`C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`).
