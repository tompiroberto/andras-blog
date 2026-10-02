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

export const ASTRONAUT = `<svg viewBox="0 0 60 64" aria-hidden="true"><g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><rect x="16" y="26" width="28" height="26" rx="9" fill="#fff"/><rect x="8" y="30" width="10" height="18" rx="5" fill="#fff"/><rect x="42" y="30" width="10" height="18" rx="5" fill="#fff"/><rect x="19" y="48" width="9" height="13" rx="4" fill="#fff"/><rect x="32" y="48" width="9" height="13" rx="4" fill="#fff"/><circle cx="30" cy="17" r="14" fill="#fff"/><rect x="20" y="10" width="20" height="14" rx="7" fill="#2b2d6e"/><rect x="25" y="33" width="10" height="7" rx="2" fill="#FFD60A"/></g><path d="M24 14 q3 -2 6 -1" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;

export const ROCKET = `<svg viewBox="0 0 44 70" aria-hidden="true"><g stroke="${INK}" stroke-width="2" stroke-linejoin="round"><path d="M22 2 C34 12 34 34 30 50 H14 C10 34 10 12 22 2 Z" fill="#f4f6f8"/><path d="M14 38 L4 52 L14 50 Z M30 38 L40 52 L30 50 Z" fill="#d7263d"/><circle cx="22" cy="24" r="6" fill="#6fb6ec"/><path d="M16 50 Q22 68 28 50 Z" fill="#FFD60A"/></g></svg>`;

export const SATELLITE = `<svg viewBox="0 0 80 44" aria-hidden="true"><g stroke="${INK}" stroke-width="2" stroke-linejoin="round"><rect x="2" y="12" width="24" height="20" fill="#2f86d6"/><path d="M10 12 V32 M18 12 V32 M2 22 H26" stroke-width="1.2"/><rect x="54" y="12" width="24" height="20" fill="#2f86d6"/><path d="M62 12 V32 M70 12 V32 M54 22 H78" stroke-width="1.2"/><path d="M26 22 H54"/><rect x="31" y="12" width="18" height="20" rx="3" fill="#FFD60A"/><path d="M40 12 V4"/></g><circle cx="40" cy="4" r="3" fill="#d7263d"/></svg>`;

export const SOCK = `<svg viewBox="0 0 44 60" aria-hidden="true"><g stroke="${INK}" stroke-width="2" stroke-linejoin="round"><path d="M12 2 H32 V34 L40 42 C44 48 40 58 32 56 L14 48 C8 46 10 38 12 34 Z" fill="#ff5fa2"/><path d="M12 2 H32 V10 H12 Z" fill="#fff"/><path d="M12 18 H32 M12 26 H32" stroke="#fff" stroke-width="3"/></g></svg>`;

export const PIZZA = `<svg viewBox="0 0 60 56" aria-hidden="true"><g stroke="${INK}" stroke-width="2" stroke-linejoin="round"><path d="M4 8 Q30 -2 56 8 L30 54 Z" fill="#ffcf5c"/><path d="M4 8 Q30 -2 56 8 L53 14 Q30 5 7 14 Z" fill="#d08b3a"/></g><g fill="#d7263d" stroke="${INK}" stroke-width="1.2"><circle cx="22" cy="20" r="4"/><circle cx="36" cy="22" r="4"/><circle cx="29" cy="34" r="3.4"/></g></svg>`;

export const DUCK = `<svg viewBox="0 0 60 50" aria-hidden="true"><g stroke="${INK}" stroke-width="2" stroke-linejoin="round"><path d="M6 30 C6 24 14 22 22 26 C24 16 30 8 40 10 C50 12 52 24 46 30 C56 32 56 46 40 46 H18 C8 46 6 38 6 30 Z" fill="#FFD60A"/><path d="M48 20 L58 22 L48 26 Z" fill="#ff8c1a"/><path d="M20 34 q8 6 18 0" fill="none"/></g><circle cx="42" cy="18" r="2" fill="${INK}"/></svg>`;

export const TOASTER = `<svg viewBox="0 0 60 50" aria-hidden="true"><g stroke="${INK}" stroke-width="2" stroke-linejoin="round"><rect x="16" y="2" width="12" height="16" rx="3" fill="#e9b872"/><rect x="32" y="4" width="12" height="14" rx="3" fill="#e9b872"/><rect x="4" y="14" width="52" height="30" rx="10" fill="#c9d1d9"/><path d="M56 26 H60" stroke-linecap="round"/><rect x="10" y="22" width="18" height="4" rx="2" fill="#6b7280"/></g></svg>`;

export const SHOE = `<svg viewBox="0 0 70 40" aria-hidden="true"><g stroke="${INK}" stroke-width="2" stroke-linejoin="round"><path d="M4 30 C4 18 10 8 18 8 L26 16 C34 20 46 20 56 24 C66 26 68 34 64 34 H4 Z" fill="#7B2FF7"/><path d="M4 30 H66 V36 H4 Z" fill="#fff"/><path d="M22 14 l6 -4 M28 18 l6 -4 M34 20 l6 -4" stroke="#fff" stroke-linecap="round"/></g></svg>`;

export const THUMB = `<svg viewBox="0 0 50 56" aria-hidden="true"><g stroke="${INK}" stroke-width="2" stroke-linejoin="round"><path d="M14 26 L22 6 C26 2 32 6 30 12 L28 22 H42 C48 22 48 30 44 32 C48 34 46 40 42 40 C46 42 44 48 40 48 H20 L14 44 Z" fill="#f2c6a0"/><rect x="4" y="24" width="10" height="26" rx="3" fill="#2f86d6"/></g></svg>`;

export const DUMPLING = `<svg viewBox="0 0 60 40" aria-hidden="true"><g stroke="${INK}" stroke-width="2" stroke-linejoin="round"><path d="M4 30 C4 12 56 12 56 30 C56 36 4 36 4 30 Z" fill="#fff7e6"/><path d="M12 18 q3 -6 6 0 q3 -6 6 0 q3 -6 6 0 q3 -6 6 0 q3 -6 6 0 q3 -6 6 0" fill="none"/></g><circle cx="22" cy="27" r="1.6" fill="${INK}"/><circle cx="38" cy="27" r="1.6" fill="${INK}"/><path d="M27 30 q3 3 6 0" stroke="${INK}" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`;

export const BACKPACK = `<svg viewBox="0 0 50 60" aria-hidden="true"><g stroke="${INK}" stroke-width="2" stroke-linejoin="round"><path d="M18 8 C18 2 32 2 32 8" fill="none"/><rect x="6" y="8" width="38" height="48" rx="12" fill="#2e7d32"/><rect x="12" y="32" width="26" height="16" rx="5" fill="#43a047"/><path d="M6 22 H44" /></g><circle cx="25" cy="16" r="3" fill="#FFD60A" stroke="${INK}" stroke-width="1.5"/></svg>`;

export const COMET = `<svg viewBox="0 0 90 40" aria-hidden="true"><path d="M70 20 L4 6 L40 20 L2 34 Z" fill="#c6ff00" fill-opacity="0.55"/><circle cx="72" cy="20" r="12" fill="#FFD60A" stroke="${INK}" stroke-width="2"/><circle cx="68" cy="17" r="2.4" fill="#e0a800"/><circle cx="76" cy="24" r="1.8" fill="#e0a800"/></svg>`;

export const SPACE_ART: Record<string, string> = {
  ufo: UFO,
  jar: jarSvg(),
  cow: COW,
  washer: WASHER,
  chile: CHILE,
  southam: SOUTHAM,
  astronaut: ASTRONAUT,
  rocket: ROCKET,
  satellite: SATELLITE,
  sock: SOCK,
  pizza: PIZZA,
  duck: DUCK,
  toaster: TOASTER,
  shoe: SHOE,
  thumb: THUMB,
  dumpling: DUMPLING,
  backpack: BACKPACK,
  comet: COMET,
};
