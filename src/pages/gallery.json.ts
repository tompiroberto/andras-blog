/**
 * /gallery.json – every gallery picture / video with its sizes, newest first. Copies of the site on
 * other hosts (scripts/export.mjs) read it from the main site, so photos uploaded there show up in the
 * copy's gallery too, without a new upload of the copy.
 */
import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { getPhotos } from '../lib/photos';

export const GET: APIRoute = async () => {
  const items = await Promise.all(
    (await getPhotos('hu')).map(async (p) => ({
      key: p.key,
      caption: p.caption,
      place: p.place ?? '',
      date: p.date ? p.date.toISOString().slice(0, 10) : '',
      post: p.post ?? '',
      event: p.event ?? '',
      video: p.video ?? '',
      large: p.image ? (await getImage({ src: p.image, width: Math.min(1800, p.image.width) })).src : p.video ? '' : p.src,
      thumb: p.image ? (await getImage({ src: p.image, width: 720 })).src : p.video ? '' : p.src,
    })),
  );
  return new Response(JSON.stringify({ items }), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
