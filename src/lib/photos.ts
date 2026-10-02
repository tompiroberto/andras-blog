/**
 * Gallery photos, newest first. A photo is an image in src/assets/photos plus (optionally) a yml file in
 * src/content/photos with its caption, place and date – the developer-mode uploader writes both.
 * Images without a yml file are captioned from their file name ("Bali-rizsteraszok.jpg" → "Bali rizsteraszok").
 * Pictures of published posts (src/assets/posts: the cover and the pictures named "<post>-…") join the
 * gallery too, captioned with the post's title and linking to the post.
 */
import { getCollection } from 'astro:content';

export interface Photo {
  image: ImageMetadata;
  caption: string;
  place?: string;
  date?: Date;
  lat?: number;
  lng?: number;
  /** slug of the post the picture belongs to */
  post?: string;
}

const files = import.meta.glob<ImageMetadata>('../assets/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});

const postFiles = import.meta.glob<ImageMetadata>('../assets/posts/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});

async function postPhotos(): Promise<Photo[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const out: Photo[] = [];
  for (const [path, image] of Object.entries(postFiles)) {
    const file = path.split('/').pop()!;
    const post = posts.find((p) => p.data.cover?.src === image.src) ?? posts.find((p) => file.startsWith(`${p.id}-`));
    if (post) out.push({ image, caption: post.data.title, date: post.data.date, post: post.id });
  }
  return out;
}

export async function getPhotos(): Promise<Photo[]> {
  const described: Photo[] = (await getCollection('photos')).map((p) => ({ ...p.data }));
  const usedSrc = new Set(described.map((p) => p.image.src));
  const fromFolder: Photo[] = Object.entries(files)
    .filter(([, img]) => !usedSrc.has(img.src))
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([path, image]) => ({
      image,
      caption: path.split('/').pop()!.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim(),
    }));
  const dated = [...described, ...(await postPhotos())].sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
  return [...dated, ...fromFolder];
}
