/**
 * Small own drawings for the GeoGuessr tips in map mode (72 × 48). Not copied from anywhere:
 * each tip type gets a simple illustration in the site's style.
 */
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

const road = (extra = '') => `
  <rect x="0" y="0" width="72" height="48" rx="8" fill="#bfe3ff"/>
  <path d="M0 48 L28 16 H44 L72 48 Z" fill="#6b7280"/>
  <path d="M0 48 L6 48 L30 16 H28 Z M72 48 L66 48 L42 16 H44 Z" fill="#9ca3af"/>${extra}`;

export function metaArt(type: string, extra?: string): string {
  let body = '';
  switch (type) {
    case 'letters':
    case 'script':
      body = `
        <rect x="1" y="1" width="70" height="46" rx="8" fill="#eef2ff"/>
        <rect x="8" y="9" width="56" height="26" rx="4" fill="#fff" stroke="#141A33" stroke-width="2.5"/>
        <path d="M36 35 V46" stroke="#141A33" stroke-width="3"/>
        <text x="36" y="27" text-anchor="middle" font-family="DM Sans, Noto Sans, Noto Sans Georgian, sans-serif" font-weight="800" font-size="${type === 'script' ? 11 : 15}" fill="#141A33">${esc(extra ?? '')}</text>`;
      break;
    case 'drive-left':
      body = road(`
        <path d="M36 16 V48" stroke="#fff" stroke-width="2" stroke-dasharray="4 4"/>
        <rect x="18" y="30" width="12" height="14" rx="3" fill="#7B2FF7" stroke="#141A33" stroke-width="2"/>
        <path d="M24 28 L20 22 H28 Z" fill="#FFD60A" stroke="#141A33" stroke-width="1.5"/>`);
      break;
    case 'yellow-center':
      body = road(`<path d="M35 16 V48 M37 16 V48" stroke="#FFD60A" stroke-width="2"/>`);
      break;
    case 'yellow-edge':
      body = road(`<path d="M3 48 L29 16 M69 48 L43 16" stroke="#FFD60A" stroke-width="2.5"/>`);
      break;
    case 'kerb':
      body = `
        <rect x="0" y="0" width="72" height="48" rx="8" fill="#6b7280"/>
        <rect x="0" y="30" width="72" height="18" fill="#d1d5db"/>
        ${Array.from({ length: 6 }, (_, i) => `<rect x="${i * 12}" y="24" width="12" height="7" fill="${i % 2 ? '#fff' : '#111'}" stroke="#111" stroke-width="0.8"/>`).join('')}`;
      break;
    case 'pole-stripes':
      body = `
        <rect x="0" y="0" width="72" height="48" rx="8" fill="#bfe3ff"/>
        <rect x="31" y="2" width="10" height="46" fill="#9ca3af" stroke="#141A33" stroke-width="1.5"/>
        ${Array.from({ length: 5 }, (_, i) => `<rect x="30" y="${24 + i * 4.8}" width="12" height="4.8" fill="${i % 2 ? '#111' : '#FFD60A'}"/>`).join('')}
        <path d="M14 8 H58" stroke="#141A33" stroke-width="2"/>`;
      break;
    case 'snorkel':
      body = `
        <rect x="0" y="0" width="72" height="48" rx="8" fill="#fde68a"/>
        <path d="M8 36 V28 L18 20 H48 L58 28 H64 V36 Z" fill="#fff" stroke="#141A33" stroke-width="2"/>
        <path d="M22 20 V6 H30" fill="none" stroke="#141A33" stroke-width="3" stroke-linecap="round"/>
        <circle cx="20" cy="37" r="5" fill="#141A33"/><circle cx="52" cy="37" r="5" fill="#141A33"/>
        <circle cx="40" cy="14" r="4" fill="#7B2FF7" stroke="#141A33" stroke-width="1.5"/>`;
      break;
    case 'yellow-sign':
      body = `
        <rect x="1" y="1" width="70" height="46" rx="8" fill="#eef2ff"/>
        <rect x="8" y="8" width="56" height="26" rx="3" fill="#FFD60A" stroke="#141A33" stroke-width="2.5"/>
        <path d="M18 18 H54 M22 25 H50" stroke="#141A33" stroke-width="3" stroke-linecap="round"/>
        <path d="M22 34 V46 M50 34 V46" stroke="#141A33" stroke-width="3"/>`;
      break;
    case 'speedbump':
      body = `
        <rect x="1" y="1" width="70" height="46" rx="8" fill="#eef2ff"/>
        <path d="M36 3 L57 24 L36 45 L15 24 Z" fill="#FFD60A" stroke="#141A33" stroke-width="2.5"/>
        <text x="36" y="28" text-anchor="middle" font-family="DM Sans, sans-serif" font-weight="800" font-size="11" fill="#141A33">TOPE</text>`;
      break;
    case 'mountains-east':
      body = `
        <rect x="0" y="0" width="72" height="48" rx="8" fill="#bfe3ff"/>
        <path d="M30 44 L48 12 L58 28 L64 20 L72 32 V44 Z" fill="#9aa7b8" stroke="#141A33" stroke-width="2"/>
        <path d="M44 20 L48 12 L52 19 Z" fill="#fff"/>
        <path d="M6 30 H24 M18 24 L24 30 L18 36" fill="none" stroke="#7B2FF7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="12" y="20" font-family="DM Sans, sans-serif" font-weight="800" font-size="10" fill="#141A33">E</text>`;
      break;
    case 'kangaroo':
      body = `<rect x="1" y="1" width="70" height="46" rx="8" fill="#eef2ff"/>
        <path d="M36 3 L64 24 L36 45 L8 24 Z" fill="#FFD60A" stroke="#141A33" stroke-width="2.5"/>
        <svg x="22" y="10" width="28" height="28" viewBox="0 0 38 38"><use href="#doodle-kangaroo"/></svg>`;
      break;
    default: // language
      body = `
        <rect x="1" y="1" width="70" height="46" rx="8" fill="#eef2ff"/>
        <path d="M12 8 H60 a4 4 0 0 1 4 4 V30 a4 4 0 0 1 -4 4 H30 L20 42 V34 H12 a4 4 0 0 1 -4 -4 V12 a4 4 0 0 1 4 -4 Z" fill="#fff" stroke="#141A33" stroke-width="2.5"/>
        <text x="36" y="27" text-anchor="middle" font-family="DM Sans, sans-serif" font-weight="800" font-size="14" fill="#7B2FF7">Aa</text>`;
  }
  return `<svg viewBox="0 0 72 48" width="72" height="48" aria-hidden="true">${body}</svg>`;
}
