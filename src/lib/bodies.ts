/**
 * Scrollbar ribbons that are not on Earth: the Moon (near side), Mars and the whole solar system
 * (the Sun at the top). Drawn in the ribbons' 56 × 1000 viewBox (see ribbon.ts); `aspect` is the true
 * width ÷ height, so in the undistorted mode the discs are round.
 */
import type { TKey } from '../i18n';

const W = 56;
const H = 1000;
const r1 = (n: number) => Math.round(n * 10) / 10;
const rad = Math.PI / 180;

export interface BodyCity {
  name: string;
  key?: TKey;
  lat: number;
  lon: number;
  /** % of the ribbon */
  x: number;
  y: number;
}

export interface Body {
  d: string;
  decor: string;
  aspect: number;
  cities: BodyCity[];
}

const DISC = `M${W / 2} 0 A${W / 2} ${H / 2} 0 1 1 ${W / 2} ${H} A${W / 2} ${H / 2} 0 1 1 ${W / 2} 0Z`;

/** Position on a disc seen from the front (lon squeezed by `spread`: 1 = near side only, 0.5 = whole planet). */
function onDisc(lat: number, lon: number, spread: number) {
  return {
    x: W / 2 + (W / 2 - 1) * Math.cos(lat * rad) * Math.sin(lon * spread * rad),
    y: H / 2 - (H / 2 - 1) * Math.sin(lat * rad),
  };
}
function blob(lat: number, lon: number, r: number, spread: number, fill: string, opacity = 1) {
  const p = onDisc(lat, lon, spread);
  return `<ellipse cx="${r1(p.x)}" cy="${r1(p.y)}" rx="${r1(r * W / 2)}" ry="${r1(r * H / 2 * Math.max(0.35, Math.cos(lat * rad)))}" fill="${fill}" fill-opacity="${opacity}"/>`;
}
function cities(list: [string, number, number][], spread: number): BodyCity[] {
  return list.map(([name, lat, lon]) => {
    const p = onDisc(lat, lon, spread);
    return { name, lat, lon, x: r1((p.x / W) * 100), y: r1((p.y / H) * 100) };
  });
}

// ---- the Moon: near side, maria as dark patches ----
const MARIA: [number, number, number][] = [
  [32.8, -15.6, 0.3], [18.4, -57.4, 0.34], [28, 17.5, 0.18], [8.5, 31.4, 0.2], [17, 59.1, 0.12], [-7.8, 51.3, 0.15],
  [-15.2, 35.5, 0.1], [-21.3, -16.6, 0.15], [-24.4, -38.6, 0.1], [56, 1.4, 0.2],
];
const moon: Body = {
  d: DISC,
  aspect: 1,
  decor:
    `<path d="${DISC}" fill="#e9e7e1"/>` +
    MARIA.map(([la, lo, r]) => blob(la, lo, r, 1, '#9da3ad', 0.75)).join('') +
    // bright young craters with rays
    [[-43.3, -11.4], [9.6, -20.1]].map(([la, lo]) => blob(la, lo, 0.05, 1, '#ffffff', 0.9)).join(''),
  cities: cities(
    [
      ['Plato', 51.6, -9.4], ['Mare Imbrium', 32.8, -15.6], ['Mare Serenitatis', 28, 17.5], ['Apollo 15', 26.1, 3.6], ['Apollo 17', 20.2, 30.8],
      ['Mare Crisium', 17, 59.1], ['Copernicus', 9.6, -20.1], ['Apollo 11', 0.7, 23.5], ['Apollo 12', -3, -23.4], ['Apollo 14', -3.6, -17.5],
      ['Apollo 16', -9, 15.5], ['Mare Nubium', -21.3, -16.6], ['Tycho', -43.3, -11.4], ['Clavius', -58.4, -14.4],
    ],
    1,
  ),
};

// ---- Mars: the whole planet squeezed onto one disc ----
const mars: Body = {
  d: DISC,
  aspect: 1,
  decor:
    `<path d="${DISC}" fill="#d9713f"/>` +
    [[8.4, 69.5, 0.14], [46.7, -22, 0.16], [-25, -40, 0.16], [-20, 120, 0.14], [30, 170, 0.1]].map(([la, lo, r]) => blob(la, lo, r, 0.5, '#8f3f22', 0.5)).join('') +
    `<ellipse cx="${W / 2}" cy="14" rx="15" ry="16" fill="#fff" fill-opacity="0.9"/><ellipse cx="${W / 2}" cy="${H - 12}" rx="11" ry="13" fill="#fff" fill-opacity="0.85"/>` +
    blob(18.65, -133.8, 0.06, 0.5, '#f0a070', 1) +
    (() => {
      const a = onDisc(-9, -95, 0.5);
      const b = onDisc(-14, -45, 0.5);
      return `<path d="M${r1(a.x)} ${r1(a.y)} L${r1(b.x)} ${r1(b.y)}" stroke="#6e2c16" stroke-width="2.4" stroke-linecap="round"/>`;
    })(),
  cities: cities(
    [
      ['North polar cap', 85, 0], ['Utopia Planitia (Viking 2)', 47.7, 134.3], ['Elysium Mons', 25, 147.2], ['Olympus Mons', 18.65, -133.8],
      ['Jezero (Perseverance)', 18.4, 77.5], ['Tharsis', 11.8, -104.5], ['Gale (Curiosity)', -5.4, 137.8], ['Valles Marineris', -13.9, -59.2],
      ['Hellas Planitia', -42.4, 70.5], ['Argyre Planitia', -49.7, -43.9], ['South polar cap', -85, 0],
    ],
    0.5,
  ),
};

// ---- the solar system: the Sun at the top, the planets below it ----
const SOLAR_ASPECT = 0.12;
const K = (H * SOLAR_ASPECT) / W; // vertical stretch that keeps circles round
const circle = (cy: number, r: number) => `M${r1(W / 2 - r)} ${cy} a${r} ${r1(r * K)} 0 1 0 ${2 * r} 0 a${r} ${r1(r * K)} 0 1 0 ${-2 * r} 0Z`;
const ellipse = (cy: number, r: number, fill: string, extra = '') => `<ellipse cx="${W / 2}" cy="${cy}" rx="${r}" ry="${r1(r * K)}" fill="${fill}" ${extra}/>`;
const PLANETS: { key?: TKey; name: string; y: number; r: number; color: string }[] = [
  { key: 'solar.sun', name: 'Sun', y: 57, r: 26, color: '#ffc933' },
  { key: 'solar.mercury', name: 'Mercury', y: 150, r: 2.6, color: '#b8b8b8' },
  { key: 'solar.venus', name: 'Venus', y: 225, r: 4.2, color: '#e8c07a' },
  { key: 'solar.earth', name: 'Earth', y: 305, r: 4.4, color: '#3a8dde' },
  { key: 'solar.mars', name: 'Mars', y: 385, r: 3.3, color: '#d9553a' },
  { name: 'Nutella', y: 470, r: 4, color: '#5a3217' },
  { key: 'solar.jupiter', name: 'Jupiter', y: 585, r: 14, color: '#d8a86a' },
  { key: 'solar.saturn', name: 'Saturn', y: 720, r: 11, color: '#e6cf8f' },
  { key: 'solar.uranus', name: 'Uranus', y: 840, r: 8, color: '#8fd8e0' },
  { key: 'solar.neptune', name: 'Neptune', y: 945, r: 8, color: '#4a6fe0' },
];
const solar: Body = {
  aspect: SOLAR_ASPECT,
  d: `M27.3 60 H28.7 V945 H27.3Z ` + PLANETS.map((p) => circle(p.y, p.r)).join(' '),
  decor:
    ellipse(57, 26, '#ffc933') +
    ellipse(57, 18, '#ffe27a') +
    PLANETS.slice(1)
      .filter((p) => p.name !== 'Nutella')
      .map((p) => ellipse(p.y, p.r, p.color))
      .join('') +
    // Jupiter's bands, Saturn's ring, Earth's land
    `<rect x="${W / 2 - 13}" y="${585 - 6}" width="26" height="4" fill="#b07c45" fill-opacity="0.7"/><rect x="${W / 2 - 12}" y="${585 + 8}" width="24" height="4" fill="#b07c45" fill-opacity="0.7"/>` +
    `<ellipse cx="${W / 2}" cy="720" rx="21" ry="${r1(4.2 * K)}" fill="none" stroke="#c9ad62" stroke-width="2"/>` +
    `<ellipse cx="${W / 2 - 1.2}" cy="302" rx="2" ry="${r1(2 * K)}" fill="#4caf50"/>` +
    // the jar of chocolate spread between Mars and Jupiter
    `<rect x="${W / 2 - 3.6}" y="459" width="7.2" height="5" rx="1" fill="#fff" stroke="#1b1b24" stroke-width="0.6"/>` +
    `<rect x="${W / 2 - 4.4}" y="464" width="8.8" height="16" rx="2" fill="#5a3217" stroke="#1b1b24" stroke-width="0.6"/>` +
    `<rect x="${W / 2 - 3.6}" y="468" width="7.2" height="6" fill="#fff"/><rect x="${W / 2 - 2}" y="470" width="4" height="2" fill="#d7263d"/>`,
  cities: PLANETS.map((p) => ({ name: p.name, key: p.key, lat: NaN, lon: NaN, x: 50, y: r1(p.y / 10) })),
};

export const BODIES = { moon, mars, solar };
export type BodyId = keyof typeof BODIES;
