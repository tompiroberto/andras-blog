/**
 * The gallery: every picture (and video) on the site, newest first –
 *   – photos / videos uploaded in developer mode (src/content/photos/*.yml + src/assets/photos or
 *     public/videos), and pictures dropped into src/assets/photos (captioned from the file name);
 *   – the pictures of published posts (src/assets/posts: the cover and "<post>-…" pictures);
 *   – pictures put on the page in developer mode and the world map's photos (public/uploads);
 *   – the portrait on the About section.
 * Not in it: the CV photo, logos, and whatever was removed from the gallery (src/data/gallery.json
 * "hidden"). src/data/gallery.json "meta" adds a place (and coordinates) to any picture.
 */
import fs from 'node:fs';
import path from 'node:path';
import { getCollection } from 'astro:content';
import gallery from '../data/gallery.json';
import mapPins from '../data/map-pins.json';
import countriesData from '../data/countries.json';

export interface Photo {
  /** stable id of the picture (gallery.json uses it) */
  key: string;
  /** optimisable image (src/assets); otherwise src is used as it is */
  image?: ImageMetadata;
  src: string;
  /** a video (public/videos/…) instead of a picture */
  video?: string;
  caption: string;
  place?: string;
  date?: Date;
  lat?: number;
  lng?: number;
  /** slug of the post the picture belongs to */
  post?: string;
  /** repository files of an upload: deleting the picture deletes these */
  files?: string[];
}

type Meta = { place?: string; lat?: number; lng?: number };
const G = gallery as { hidden: string[]; meta: Record<string, Meta> };

const files = import.meta.glob<ImageMetadata>('../assets/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});
const postFiles = import.meta.glob<ImageMetadata>('../assets/posts/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});
const fileName = (p: string) => p.split('/').pop()!;

async function postPhotos(): Promise<Photo[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const out: Photo[] = [];
  for (const [p, image] of Object.entries(postFiles)) {
    const file = fileName(p);
    const post = posts.find((x) => x.data.cover?.src === image.src) ?? posts.find((x) => file.startsWith(`${x.id}-`));
    if (post) out.push({ key: `asset:posts/${file}`, image, src: image.src, caption: post.data.title, date: post.data.date, post: post.id });
  }
  return out;
}

/** public/uploads: pictures put on the page in developer mode, the world map's country and pin photos */
function uploadedPhotos(lang: string): Photo[] {
  const dir = path.resolve(process.cwd(), 'public/uploads');
  if (!fs.existsSync(dir)) return [];
  const out: Photo[] = [];
  const walk = (d: string) => {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, f.name);
      if (f.isDirectory()) walk(full);
      else if (/\.(jpe?g|png|webp|avif)$/i.test(f.name)) {
        const src = `/${path.relative(path.resolve(process.cwd(), 'public'), full).split(path.sep).join('/')}`;
        const pin = (mapPins as { title: string; image?: string; lat: number; lon: number }[]).find((x) => x.image === src);
        type Ctry = { image?: string; i18n: Record<string, { name: string }> };
        const ctry = (countriesData.countries as unknown as Ctry[]).find((c) => c.image === src);
        const name = ctry ? (ctry.i18n[lang] ?? ctry.i18n.en).name : undefined;
        const stat = fs.statSync(full);
        out.push({
          key: `public:${src}`,
          src,
          caption: pin?.title ?? name ?? f.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
          place: name,
          lat: pin?.lat,
          lng: pin?.lon,
          date: stat.mtime,
        });
      }
    }
  };
  walk(dir);
  return out;
}

export async function getPhotos(lang = 'en'): Promise<Photo[]> {
  const described: Photo[] = (await getCollection('photos')).map((p) => {
    const name = fileName(p.filePath ?? p.id).replace(/\.ya?ml$/, '');
    const own = [`src/content/photos/${name}.yml`, p.data.video ? `public${p.data.video}` : `src/assets/photos/${name}.jpg`];
    return {
      key: `photo:${p.id}`,
      image: p.data.image,
      src: p.data.image?.src ?? p.data.video ?? '',
      video: p.data.video,
      caption: p.data.caption,
      place: p.data.place,
      date: p.data.date,
      lat: p.data.lat,
      lng: p.data.lng,
      post: p.data.post,
      files: own,
    };
  });
  const usedSrc = new Set(described.map((p) => p.image?.src));
  const fromFolder: Photo[] = Object.entries(files)
    .filter(([, img]) => !usedSrc.has(img.src))
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([p, image]) => ({
      key: `asset:photos/${fileName(p)}`,
      image,
      src: image.src,
      caption: fileName(p).replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim(),
      files: [`src/assets/photos/${fileName(p)}`],
    }));
  const portrait: Photo = { key: 'public:/images/andras.jpg', src: '/images/andras.jpg', caption: 'András' };
  const dated = [...described, ...(await postPhotos()), ...uploadedPhotos(lang)].sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
  return [...dated, ...fromFolder, portrait]
    .filter((p) => !G.hidden.includes(p.key))
    .map((p) => {
      const m = G.meta[p.key];
      return m ? { ...p, place: m.place ?? p.place, lat: m.lat ?? p.lat, lng: m.lng ?? p.lng } : p;
    });
}
