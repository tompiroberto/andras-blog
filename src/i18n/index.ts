import en from './en.json';
import hu from './hu.json';
import pt from './pt.json';
import ro from './ro.json';
import el from './el.json';
import ka from './ka.json';

export const LOCALES = ['en', 'hu', 'pt', 'ro', 'el', 'ka'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = 'en';

/** Value for <html lang> and hreflang (Portuguese is European Portuguese). */
export const HTML_LANG: Record<Lang, string> = {
  en: 'en',
  hu: 'hu',
  pt: 'pt-PT',
  ro: 'ro',
  el: 'el',
  ka: 'ka',
};

export type TKey = keyof typeof en;

const DICTS: Record<Lang, Partial<Record<TKey, string>>> = { en, hu, pt, ro, el, ka };

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** Translate a key, falling back to English (with a dev warning) when missing. */
export function t(lang: Lang, key: TKey): string {
  const value = DICTS[lang][key];
  if (value !== undefined) return value;
  if (import.meta.env.DEV) console.warn(`[i18n] Missing "${key}" for "${lang}", using English.`);
  return en[key];
}

/** Returns a translator bound to one language. */
export function useT(lang: Lang) {
  return (key: TKey) => t(lang, key);
}

/** Build a localized path: localePath('hu', 'adventures') -> '/hu/adventures/'. */
export function localePath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}

/** Strip the language prefix from a pathname: '/hu/erasmus/' -> 'erasmus'. */
export function stripLang(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length && isLang(parts[0])) parts.shift();
  return parts.join('/');
}

export function langStaticPaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}

/** Native language names, e.g. { en: 'English', hu: 'Magyar', … }. */
export const NATIVE_NAMES: Record<Lang, string> = Object.fromEntries(
  LOCALES.map((l) => [l, t(l, 'lang.name')]),
) as Record<Lang, string>;
