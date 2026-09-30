import type { TKey } from '../i18n';
import type { Category } from './constants';

export interface CategoryMeta {
  slug: Category;
  icon: string;
  tone: 'violet' | 'yellow';
  smallIcons: string[];
  titleKey: TKey;
  textKey: TKey;
  linkKey: TKey;
}

/** Explore cards and category pages share these definitions. */
export const CATEGORY_META: CategoryMeta[] = [
  {
    slug: 'adventures',
    icon: 'mountain',
    tone: 'yellow',
    smallIcons: ['tent', 'bike', 'thumbs-up'],
    titleKey: 'adv.title',
    textKey: 'adv.text',
    linkKey: 'adv.link',
  },
  {
    slug: 'erasmus',
    icon: 'globe',
    tone: 'violet',
    smallIcons: ['plane', 'users'],
    titleKey: 'eras.title',
    textKey: 'eras.text',
    linkKey: 'eras.link',
  },
  {
    slug: 'random',
    icon: 'sparkles',
    tone: 'yellow',
    smallIcons: ['camera', 'lightbulb', 'utensils'],
    titleKey: 'rand.title',
    textKey: 'rand.text',
    linkKey: 'rand.link',
  },
];

export const categoryMeta = (slug: Category) => CATEGORY_META.find((c) => c.slug === slug)!;
