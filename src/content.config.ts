import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { LOCALES } from './i18n';
import { CATEGORIES, COVER_POSITIONS } from './lib/constants';
import countriesData from './data/countries.json';

const countryIds = countriesData.countries.map((c) => c.id);

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Optional: leave it out when the date is not known */
      date: z.coerce.date().optional(),
      /** 'month' shows only month and year (e.g. "August 2026") */
      datePrecision: z.enum(['day', 'month']).default('day'),
      category: z.enum(CATEGORIES),
      /** Language the post is written in */
      lang: z.enum(LOCALES).default('en'),
      excerpt: z.string(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Which part of the cover stays on the 16:9 post card ('attention' = the most interesting part) */
      coverPosition: z.enum(COVER_POSITIONS).default('attention'),
      draft: z.boolean().default(false),
      /** Lucide (or custom) icon name shown on the card when there is no cover photo */
      icon: z.string().optional(),
      /** Key facts shown as icon circles at the top of the post */
      facts: z.array(z.object({ icon: z.string(), label: z.string() })).optional(),
      /** Strava activities to embed (id + token from Strava's "Embed on blog" code) */
      strava: z.array(z.object({ id: z.string(), token: z.string() })).optional(),
      /** Where the post happened (written from the world map): a pin there in map mode */
      place: z.string().optional(),
      lat: z.number().min(-90).max(90).optional(),
      lng: z.number().min(-180).max(180).optional(),
      /** Ids from src/data/countries.json, e.g. ["SK", "AT"] */
      countries: z
        .array(z.string())
        .optional()
        .refine((ids) => !ids || ids.every((id) => countryIds.includes(id)), {
          message: `countries must be ids from src/data/countries.json (${countryIds.join(', ')})`,
        }),
    }),
});

/** Optional captions/places/dates for gallery photos (images themselves live in src/assets/photos) */
const photos = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/photos' }),
  schema: ({ image }) =>
    z.object({
      /** a picture (src/assets/photos) – or a video (video: /videos/….mp4 in public/videos) */
      image: image().optional(),
      video: z.string().optional(),
      /** the post it belongs to (slug): shown at the end of that post */
      post: z.string().optional(),
      /** the calendar event it belongs to (id in src/data/calendar.json) */
      event: z.string().optional(),
      caption: z.string(),
      place: z.string().optional(),
      date: z.coerce.date().optional(),
      /** Where the photo was taken (from the photo's GPS data or the place name) – pins on the gallery map */
      lat: z.number().min(-90).max(90).optional(),
      lng: z.number().min(-180).max(180).optional(),
    }),
});

/** Music uploaded in developer mode (src/components/MusicUpload.astro): the audio lives in public/music */
const music = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/music' }),
  schema: z.object({
    file: z.string(),
    title: z.string(),
    artist: z.string().optional(),
    about: z.string().optional(),
    date: z.coerce.date().optional(),
    /** the post it belongs to (slug): played at the end of that post */
    post: z.string().optional(),
    /** hashtags, without the # */
    tags: z.array(z.string()).optional(),
    /** where it belongs (a pin on the world map) */
    place: z.string().optional(),
    lat: z.number().min(-90).max(90).optional(),
    lng: z.number().min(-180).max(180).optional(),
  }),
});

export const collections = { posts, photos, music };
