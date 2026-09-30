import { getCollection, type CollectionEntry } from 'astro:content';
import type { Category } from './constants';
import { HTML_LANG, type Lang } from '../i18n';

export type Post = CollectionEntry<'posts'>;

/** Drafts are visible while developing (so the layout can be seen) and never in production. */
export const SHOW_DRAFTS = import.meta.env.DEV;

export async function getPosts(category?: Category): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => (SHOW_DRAFTS || !data.draft) && (!category || data.category === category));
  // newest first; posts without a date keep their file order after the dated ones
  return posts.sort((a, b) => (b.data.date?.valueOf() ?? -Infinity) - (a.data.date?.valueOf() ?? -Infinity));
}

/** Slugs of posts that are really published (used for links from the map). */
export async function getPublishedSlugs(): Promise<string[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((p) => p.id);
}

export function formatDate(date: Date, lang: Lang, precision: 'day' | 'month' = 'day'): string {
  const options: Intl.DateTimeFormatOptions = precision === 'month' ? { year: 'numeric', month: 'long' } : { dateStyle: 'long' };
  return new Intl.DateTimeFormat(HTML_LANG[lang], options).format(date);
}
