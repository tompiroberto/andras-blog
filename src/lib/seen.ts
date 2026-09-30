/**
 * Places the visitor has already looked at (clicked or searched): remembered in this browser and
 * marked everywhere a place name appears – the background city labels, the scrollbar cities, map
 * mode, the chaos map and the country pages (see the .is-seen rules in global.css).
 */
const KEY = 'andras-seen';
const MAX = 400;
let names: Set<string> | null = null;

const norm = (s: string) => s.trim().toLowerCase();

function load(): Set<string> {
  if (names) return names;
  try {
    names = new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]'));
  } catch {
    names = new Set();
  }
  return names;
}

export function markSeen(name: string) {
  const set = load();
  set.add(norm(name));
  try {
    localStorage.setItem(KEY, JSON.stringify([...set].slice(-MAX)));
  } catch {
    /* storage unavailable */
  }
  applySeen();
}

/** Every element that shows a place name, and the element that gets the mark */
const TARGETS: [string, (el: Element) => string | null][] = [
  ['.w-city', (el) => el.querySelector('.w-name')?.textContent ?? null],
  ['.chile__label', (el) => el.textContent],
  ['.mm-city', (el) => el.textContent],
  ['.mm-geo', (el) => el.textContent],
  ['.c-label', (el) => el.textContent],
  ['[data-chaos-city]', (el) => el.querySelector('text')?.textContent ?? null],
];

export function applySeen() {
  const set = load();
  if (!set.size) return;
  for (const [sel, nameOf] of TARGETS) {
    document.querySelectorAll(sel).forEach((el) => {
      const n = nameOf(el);
      el.classList.toggle('is-seen', Boolean(n && set.has(norm(n))));
    });
  }
}
