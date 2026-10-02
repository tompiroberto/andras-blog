/**
 * Home-page layout set in developer mode (src/data/layout.json, saved by the layout editor in
 * src/components/DevMode.astro): section order, hidden sections, width and size of each section.
 * Sections carry data-lay="<id>"; the CSS below is put into <head> by src/pages/[lang]/index.astro.
 */
import layout from '../data/layout.json';

export const SECTION_IDS = ['hero', 'icons', 'about', 'explore', 'photos', 'plans', 'message'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/** column widths offered by the editor */
export const WIDTHS = { narrow: '860px', normal: 'var(--container)', wide: '1440px', full: '100%' } as const;
export type Width = keyof typeof WIDTHS;

interface Layout {
  order: string[];
  hidden: string[];
  width: Record<string, string>;
  scale: Record<string, number>;
}
const data = layout as Layout;

/** saved order; sections added later (or missing from the file) go to the end */
export function sectionOrder(): SectionId[] {
  const known = data.order.filter((id): id is SectionId => (SECTION_IDS as readonly string[]).includes(id));
  return [...new Set([...known, ...SECTION_IDS])];
}

export function layoutCss(): string {
  const rules: string[] = [];
  for (const id of SECTION_IDS) {
    const vars: string[] = [];
    const scale = Number(data.scale[id]);
    if (scale && scale !== 1) vars.push(`--lay-zoom:${Math.min(1.6, Math.max(0.5, scale))}`);
    const width = data.width[id] as Width | undefined;
    if (width && width in WIDTHS && width !== 'normal') vars.push(`--lay-w:${WIDTHS[width]}`);
    if (vars.length) rules.push(`[data-lay="${id}"]{${vars.join(';')}}`);
    if (data.hidden.includes(id)) {
      rules.push(`:root:not(.dev-mode) [data-lay="${id}"]:not([data-lay-state="shown"]){display:none!important}`);
      rules.push(`:root.dev-mode [data-lay="${id}"]:not([data-lay-state="shown"]){opacity:.35;outline:3px dashed #39ff14;outline-offset:-6px}`);
    }
  }
  return rules.join('\n');
}
