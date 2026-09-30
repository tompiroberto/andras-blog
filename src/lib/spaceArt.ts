/**
 * Things floating in space around map mode's globe (and around the zoomed-out page): a UFO, a jar of
 * Nutella, a cow, a washing machine, something that looks like Chile and something that looks like
 * South America. Simple drawings in the site's style.
 */
import { jarSvg } from './jar';

const INK = '#1b1b24';

export const UFO = `<svg viewBox="0 0 80 50" aria-hidden="true"><ellipse cx="40" cy="22" rx="14" ry="13" fill="#bfefff" fill-opacity="0.85" stroke="${INK}" stroke-width="2"/><path d="M34 22 q6 -10 12 0" fill="#8be07a" stroke="${INK}" stroke-width="1.5"/><circle cx="38" cy="17" r="1.6" fill="${INK}"/><circle cx="43" cy="17" r="1.6" fill="${INK}"/><ellipse cx="40" cy="30" rx="36" ry="10" fill="#9aa3ad" stroke="${INK}" stroke-width="2"/><ellipse cx="40" cy="34" rx="18" ry="4" fill="#6b7280"/><g fill="#FFD60A"><circle cx="16" cy="31" r="2.4"/><circle cx="30" cy="34" r="2.4"/><circle cx="50" cy="34" r="2.4"/><circle cx="64" cy="31" r="2.4"/></g></svg>`;

export const COW = `<svg viewBox="0 0 64 44" aria-hidden="true"><g stroke="${INK}" stroke-width="2" stroke-linejoin="round"><path d="M14 30 V40 M22 31 V41 M40 31 V41 M48 30 V40" stroke-linecap="round"/><rect x="10" y="12" width="42" height="21" rx="9" fill="#fff"/><path d="M18 14 q6 6 1 12 q-6 -1 -5 -9 Z M36 20 q7 -3 9 4 q-4 5 -9 1 Z" fill="${INK}"/><path d="M52 14 q10 -2 10 8 q0 7 -8 7 q-5 0 -6 -5 Z" fill="#fff"/><ellipse cx="58" cy="25" rx="4" ry="3" fill="#ffb3c7"/><path d="M50 13 l-2 -5 M56 12 l2 -5" stroke-linecap="round"/><path d="M28 33 q3 4 6 0" fill="#ffb3c7"/><path d="M10 18 q-6 2 -6 9" fill="none" stroke-linecap="round"/></g><circle cx="55" cy="18" r="1.4" fill="${INK}"/></svg>`;

export const WASHER = `<svg viewBox="0 0 50 56" aria-hidden="true"><rect x="3" y="3" width="44" height="50" rx="6" fill="#f4f6f8" stroke="${INK}" stroke-width="2.2"/><path d="M3 15 H47" stroke="${INK}" stroke-width="2"/><circle cx="12" cy="9" r="2.6" fill="#7B2FF7"/><circle cx="20" cy="9" r="2.6" fill="#FFD60A" stroke="${INK}" stroke-width="0.8"/><rect x="30" y="7" width="12" height="4" rx="1.5" fill="#cde8ff" stroke="${INK}" stroke-width="1"/><circle cx="25" cy="34" r="13" fill="#9aa3ad" stroke="${INK}" stroke-width="2.2"/><circle cx="25" cy="34" r="9.5" fill="#6fb6ec"/><path d="M17 36 q4 -4 8 0 t8 0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="22" cy="30" r="2" fill="#d7263d"/></svg>`;

/** Long and thin, a bit wiggly: Chile (or a chili pepper) */
export const CHILE = `<svg viewBox="0 0 30 110" aria-hidden="true"><path d="M17 3 C22 10 19 20 20 30 C21 42 17 52 17 64 C17 76 14 86 16 96 C17 101 14 106 10 107 C8 100 11 92 10 82 C9 70 12 58 11 46 C10 32 13 18 12 8 Z" fill="#d7263d" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><path d="M14 3 q3 -4 7 0" fill="none" stroke="#2e7d32" stroke-width="3" stroke-linecap="round"/></svg>`;

/** South America – or an ice cream cone */
export const SOUTHAM = `<svg viewBox="0 0 70 90" aria-hidden="true"><path d="M20 6 C30 2 44 6 52 14 C62 18 68 28 64 36 C60 44 52 48 48 56 C44 64 40 72 34 84 C32 88 28 88 28 82 C28 72 30 60 24 50 C18 42 10 36 10 26 C10 16 12 9 20 6 Z" fill="#8be07a" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/><path d="M26 30 q8 6 18 2" fill="none" stroke="#2f86d6" stroke-width="2.4" stroke-linecap="round"/></svg>`;

export const SPACE_ART: Record<string, string> = {
  ufo: UFO,
  jar: jarSvg(),
  cow: COW,
  washer: WASHER,
  chile: CHILE,
  southam: SOUTHAM,
};
