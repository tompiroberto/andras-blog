/** Colour themes; values must match the :root[data-theme] blocks in src/styles/global.css. */
export const THEMES = [
  { id: 'violet', primary: '#7B2FF7', secondary: '#FFD60A' },
  { id: 'ocean', primary: '#0B6E99', secondary: '#FF8A5B' },
  { id: 'forest', primary: '#2E7D32', secondary: '#F9B233' },
  { id: 'sunset', primary: '#C2185B', secondary: '#FFB703' },
  { id: 'chaos', primary: '#B0007A', secondary: '#C6FF00' },
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];
export const DEFAULT_THEME: ThemeId = 'violet';
