/**
 * Gallery photos, newest first. A photo is an image in src/assets/photos plus (optionally) a yml file in
 * src/content/photos with its caption, place and date – the developer-mode uploader writes both.
 * Images without a yml file are captioned from their file name ("Bali-rizsteraszok.jpg" → "Bali rizsteraszok").
 */
import { getCollection } from 'astro:content';

export interface Photo {
  image: ImageMetadata;
  caption: string;
  place?: string;
  date?: Date;
}

const files = import.meta.glob<ImageMetadata>('../assets/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});

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
  const dated = described.sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
  return [...dated, ...fromFolder];
}
