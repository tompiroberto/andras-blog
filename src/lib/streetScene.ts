/**
 * The drawn street view (StreetView.astro): a road in 3D, looked at from a camera that can turn
 * all the way round (heading) and look up and down (pitch). Every region has its own sky, ground,
 * road markings, far skyline, utility poles (with their wires), roadside things and animals that move.
 * Pure drawing: `drawScene(state)` returns the SVG for one frame.
 */

export type Region =
  | 'japan' | 'thailand' | 'indonesia'
  | 'usa' | 'mexico'
  | 'chile' | 'brazil' | 'argentina'
  | 'namibia' | 'kenya' | 'southafrica'
  | 'hungary' | 'norway' | 'iceland'
  | 'australia'
  | 'peru' | 'mongolia';

type Pole = 'jp' | 'ladder' | 'wood' | 'woodH' | 'cross' | 'concrete' | 'tangle' | 'stobie' | 'snowpole' | 'stub' | 'none';
type Gen = [every: number, x: number, kind: string, offset?: number, jitter?: number];
type AnimalGen = { kind: string; n: number; x: [number, number]; speed: number };

interface Look {
  sky: [string, string];
  ground: string;
  road: string;
  roadW: number;
  edge?: string;
  center?: { color: string; type: 'dash' | 'double' | 'solid' };
  gravel?: boolean;
  camH: number;
  far: string;
  snow?: boolean;
  /** skyline height (angle, radians) by bearing */
  hills: (b: number) => number;
  hood: string;
  hoodExtra?: 'antenna' | 'snorkel';
  pole: Pole;
  poleEvery: number;
  things: Gen[];
  animals: AnimalGen[];
  birds?: { kind: 'crow' | 'stork' | 'parrot' | 'vulture' | 'gull'; n: number };
}

const S = Math.sin;
export const LOOK: Record<Region, Look> = {
  japan: {
    sky: ['#bfdcf7', '#eef6ff'], ground: '#8fae6a', road: '#5d6066', roadW: 2.6, edge: '#f4f4f4', camH: 1.35, far: '#6f9b6a',
    hills: (b) => 0.07 + 0.04 * S(b * 3) + 0.025 * S(b * 7 + 1), hood: '', pole: 'jp', poleEvery: 30,
    things: [[22, -7.5, 'house', 5, 3], [26, 10.6, 'house', 13, 3], [58, -4.6, 'mirror', 20], [40, 5, 'vending', 17], [16, -3.6, 'hedge', 3, 1]],
    animals: [{ kind: 'cat', n: 1, x: [3.3, 4.2], speed: 0.6 }], birds: { kind: 'crow', n: 3 },
  },
  thailand: {
    sky: ['#9fcff2', '#f2f7e8'], ground: '#79a64a', road: '#56585d', roadW: 3.2, edge: '#f4f4f4', center: { color: '#f5c518', type: 'double' }, camH: 2.4, far: '#5f8f4a',
    hills: (b) => 0.05 + 0.05 * Math.abs(S(b * 2.5)), hood: '#f4f6f8', pole: 'tangle', poleEvery: 28,
    things: [[24, 8, 'banana', 4, 4], [30, -8, 'palm', 12, 4], [150, -20, 'temple', 60, 4], [36, -5, 'house', 20, 2]],
    animals: [{ kind: 'buffalo', n: 2, x: [12, 30], speed: 0.3 }, { kind: 'dog', n: 1, x: [4.2, 6], speed: 0.8 }], birds: { kind: 'crow', n: 2 },
  },
  indonesia: {
    sky: ['#a7d3f0', '#f0f6ea'], ground: '#6fae4a', road: '#56585d', roadW: 2.8, center: { color: '#f4f4f4', type: 'dash' }, camH: 2.4, far: '#557d63',
    hills: (b) => (Math.abs(((b % 6.283) + 6.283) % 6.283 - 1.2) < 0.5 ? 0.3 - Math.abs((((b % 6.283) + 6.283) % 6.283) - 1.2) * 0.5 : 0.05), hood: '#f4f6f8', pole: 'tangle', poleEvery: 30,
    things: [[18, -9, 'rice', 0, 4], [18, 10, 'rice', 9, 4], [34, 6, 'palm', 8, 5], [70, -6, 'house', 30, 2]],
    animals: [{ kind: 'chicken', n: 3, x: [3.6, 6], speed: 1.2 }, { kind: 'monkey', n: 1, x: [4, 6], speed: 0.5 }], birds: { kind: 'parrot', n: 2 },
  },
  usa: {
    sky: ['#7fbff0', '#e3f2ff'], ground: '#d9b45a', road: '#4b4d52', roadW: 3.6, edge: '#f4f4f4', center: { color: '#f5c518', type: 'double' }, camH: 2.4, far: '#b89a4a',
    hills: (b) => 0.01 + 0.005 * S(b * 5), hood: '#1b1b24', pole: 'wood', poleEvery: 48,
    things: [[140, -44, 'silo', 60, 10], [95, 6.6, 'mailbox', 30], [30, -16, 'wheat', 0, 10], [30, 20, 'wheat', 15, 10], [200, 30, 'barn', 90, 6], [12, -7, 'fence', 0]],
    animals: [{ kind: 'cow', n: 3, x: [14, 40], speed: 0.25 }], birds: { kind: 'vulture', n: 1 },
  },
  mexico: {
    sky: ['#8cc6f0', '#f3efe2'], ground: '#c7a86a', road: '#4f5156', roadW: 3.4, edge: '#f4f4f4', center: { color: '#f5c518', type: 'double' }, camH: 2.4, far: '#8f7f62',
    hills: (b) => 0.06 + 0.04 * S(b * 4 + 1) + 0.02 * S(b * 9), hood: '#f4f6f8', pole: 'concrete', poleEvery: 36,
    things: [[18, 9, 'cactus', 3, 6], [22, -10, 'cactus', 11, 6], [120, -5, 'topes', 40], [60, 7, 'house', 25, 2]],
    animals: [{ kind: 'dog', n: 2, x: [4.5, 8], speed: 0.9 }], birds: { kind: 'vulture', n: 2 },
  },
  chile: {
    sky: ['#4f8fd8', '#cfe6ff'], ground: '#d6b98a', road: '#55575c', roadW: 3.6, edge: '#f4f4f4', center: { color: '#f4f4f4', type: 'dash' }, camH: 2.4, far: '#8d8f99', snow: true,
    hills: (b) => (Math.cos(b) < 0.2 ? 0.06 : 0.15 + 0.06 * S(b * 6) + 0.04 * S(b * 11 + 2)), hood: '#f4f6f8', pole: 'concrete', poleEvery: 60,
    things: [[25, 4.8, 'bollard'], [25, -4.8, 'bollard', 12], [170, -7.6, 'animita', 70], [40, 17, 'rock', 8, 8], [300, 11, 'km', 150]],
    animals: [{ kind: 'guanaco', n: 2, x: [14, 30], speed: 0.4 }],
  },
  brazil: {
    sky: ['#86c3f0', '#eef7ee'], ground: '#b85f36', road: '#4a4c51', roadW: 3.4, edge: '#f4f4f4', center: { color: '#f5c518', type: 'double' }, camH: 2.4, far: '#4f8a4a',
    hills: (b) => 0.05 + 0.03 * S(b * 3) + 0.02 * S(b * 8), hood: '#f4f6f8', pole: 'cross', poleEvery: 32,
    things: [[28, 9, 'palm', 6, 5], [22, -9, 'tree', 14, 6], [60, 6.5, 'house', 25, 2], [14, -6.5, 'fence', 0]],
    animals: [{ kind: 'capybara', n: 2, x: [7, 16], speed: 0.3 }, { kind: 'cow', n: 2, x: [18, 36], speed: 0.2 }], birds: { kind: 'parrot', n: 3 },
  },
  argentina: {
    sky: ['#7db8ec', '#eef5fb'], ground: '#a9b86a', road: '#4f5156', roadW: 3.4, edge: '#f4f4f4', center: { color: '#f4f4f4', type: 'dash' }, camH: 2.4, far: '#8fa46a',
    hills: (b) => 0.008, hood: '#f4f6f8', pole: 'concrete', poleEvery: 55,
    things: [[16, -8, 'fence', 0], [16, 8, 'fence', 8], [90, -22, 'tree', 20, 12], [220, 26, 'barn', 80, 4], [60, 12, 'hay', 30, 6]],
    animals: [{ kind: 'cow', n: 4, x: [12, 40], speed: 0.2 }, { kind: 'horse', n: 1, x: [12, 30], speed: 0.4 }, { kind: 'rhea', n: 1, x: [20, 36], speed: 0.7 }],
  },
  namibia: {
    sky: ['#a9d5f2', '#f6ecdc'], ground: '#d98a4b', road: '#c9a27a', roadW: 4, gravel: true, camH: 2.4, far: '#c96a35',
    hills: (b) => 0.09 + 0.055 * Math.abs(S(b * 4)) + 0.02 * S(b * 9), hood: '#f4f6f8', hoodExtra: 'antenna', pole: 'wood', poleEvery: 70,
    things: [[70, 13, 'acacia', 10, 8], [55, -16, 'acacia', 35, 10], [120, 29, 'dune', 50, 10]],
    animals: [{ kind: 'oryx', n: 2, x: [14, 34], speed: 0.4 }],
  },
  kenya: {
    sky: ['#8ec6ee', '#f4efe2'], ground: '#b4703e', road: '#4f5156', roadW: 3.2, edge: '#f5c518', center: { color: '#f4f4f4', type: 'dash' }, camH: 2.6, far: '#8a8f6a',
    hills: (b) => 0.03 + 0.03 * S(b * 2), hood: '#1b1b24', hoodExtra: 'snorkel', pole: 'wood', poleEvery: 50,
    things: [[45, 14, 'acacia', 10, 10], [55, -16, 'acacia', 30, 10], [110, -6.5, 'busstop', 40]],
    animals: [{ kind: 'zebra', n: 2, x: [14, 34], speed: 0.35 }, { kind: 'giraffe', n: 1, x: [20, 40], speed: 0.3 }], birds: { kind: 'vulture', n: 1 },
  },
  southafrica: {
    sky: ['#7fbcec', '#eef4f6'], ground: '#a99a5a', road: '#4b4d52', roadW: 3.6, edge: '#f5c518', center: { color: '#f4f4f4', type: 'dash' }, camH: 2.4, far: '#7c7f86',
    hills: (b) => 0.08 + 0.05 * S(b * 3 + 2) + 0.03 * S(b * 7), hood: '#f4f6f8', pole: 'woodH', poleEvery: 60,
    things: [[30, -10, 'fence', 0], [80, 16, 'tree', 20, 10], [140, -9, 'house', 60, 3]],
    animals: [{ kind: 'springbok', n: 3, x: [14, 34], speed: 0.5 }, { kind: 'baboon', n: 1, x: [5, 8], speed: 0.6 }],
  },
  hungary: {
    sky: ['#9fd0f5', '#f2f7fb'], ground: '#9cb45a', road: '#55575c', roadW: 3.2, edge: '#f4f4f4', center: { color: '#f4f4f4', type: 'dash' }, camH: 2.4, far: '#8aa35a',
    hills: (b) => 0.012 + 0.006 * S(b * 3), hood: '#f4f6f8', pole: 'ladder', poleEvery: 40,
    things: [[20, -12, 'sunflower', 0, 6], [20, 14, 'sunflower', 10, 6], [36, -6, 'poplar', 9, 2], [36, 6.5, 'tree', 27, 3], [100, 5.4, 'bollard', 20], [180, -8, 'house', 70, 3]],
    animals: [{ kind: 'sheep', n: 3, x: [12, 24], speed: 0.3 }], birds: { kind: 'stork', n: 2 },
  },
  norway: {
    sky: ['#9ccbef', '#eef6fb'], ground: '#5f8f4a', road: '#4f5156', roadW: 3, edge: '#f4f4f4', center: { color: '#f5c518', type: 'dash' }, camH: 2.4, far: '#5f6f7a', snow: true,
    hills: (b) => 0.2 + 0.08 * S(b * 3) + 0.05 * S(b * 7 + 1), hood: '#f4f6f8', pole: 'wood', poleEvery: 45,
    things: [[30, -9, 'pine', 5, 6], [26, 10, 'pine', 12, 6], [40, 4.3, 'reflector', 10], [160, 14, 'church', 60, 4], [120, -9, 'house', 40, 4]],
    animals: [{ kind: 'moose', n: 1, x: [12, 26], speed: 0.3 }], birds: { kind: 'gull', n: 2 },
  },
  iceland: {
    sky: ['#aacfe8', '#eef3f6'], ground: '#6c8a55', road: '#4b4d52', roadW: 3, center: { color: '#f4f4f4', type: 'dash' }, camH: 2.4, far: '#4f5560', snow: true,
    hills: (b) => 0.12 + 0.07 * Math.abs(S(b * 2.2)) + 0.03 * S(b * 9), hood: '#f4f6f8', pole: 'snowpole', poleEvery: 25,
    things: [[18, -9, 'lava', 3, 8], [20, 11, 'lava', 12, 8], [210, 20, 'church', 90, 4]],
    animals: [{ kind: 'horse', n: 3, x: [10, 22], speed: 0.35 }, { kind: 'sheep', n: 2, x: [6, 14], speed: 0.4 }], birds: { kind: 'gull', n: 3 },
  },
  australia: {
    sky: ['#8cc8f2', '#e9f4fb'], ground: '#b5542f', road: '#3f4146', roadW: 3.4, edge: '#f4f4f4', center: { color: '#f4f4f4', type: 'dash' }, camH: 2.4, far: '#9b3f22',
    hills: (b) => 0.006 + (Math.abs(((b % 6.283) + 6.283) % 6.283 - 2.2) < 0.18 ? 0.045 : 0), hood: '#f4f6f8', pole: 'stobie', poleEvery: 45,
    things: [[20, 4.8, 'guide'], [14, 9.4, 'spinifex', 0, 6], [16, -8.4, 'spinifex', 7, 6], [150, -5.6, 'roosign', 45]],
    animals: [{ kind: 'kangaroo', n: 3, x: [8, 26], speed: 0.9 }], birds: { kind: 'crow', n: 2 },
  },
  peru: {
    sky: ['#5f9fe0', '#dcebf8'], ground: '#a89a6a', road: '#55575c', roadW: 3, edge: '#f4f4f4', center: { color: '#f5c518', type: 'solid' }, camH: 2.4, far: '#7a7e86', snow: true,
    hills: (b) => 0.22 + 0.09 * S(b * 3 + 1) + 0.05 * S(b * 8), hood: '#f4f6f8', pole: 'concrete', poleEvery: 40,
    things: [[40, -8, 'adobe', 10, 4], [55, 9, 'adobe', 30, 4], [14, -6, 'stonewall', 0], [90, 12, 'tree', 45, 8]],
    animals: [{ kind: 'llama', n: 3, x: [7, 20], speed: 0.4 }],
  },
  mongolia: {
    sky: ['#6fb0ec', '#e6f1fb'], ground: '#9aa85a', road: '#55575c', roadW: 3.2, center: { color: '#f4f4f4', type: 'dash' }, camH: 2.4, far: '#7f8a5a',
    hills: (b) => 0.05 + 0.04 * Math.abs(S(b * 2.5)), hood: '#f4f6f8', pole: 'stub', poleEvery: 50,
    things: [[140, -18, 'ger', 50, 10], [180, 22, 'ger', 120, 10]],
    animals: [{ kind: 'horse', n: 3, x: [10, 30], speed: 0.5 }, { kind: 'camel', n: 1, x: [14, 30], speed: 0.3 }, { kind: 'yak', n: 1, x: [12, 24], speed: 0.25 }],
    birds: { kind: 'vulture', n: 1 },
  },
};

export interface SceneState {
  region: Region;
  z0: number;
  heading: number;
  pitch: number;
  W: number;
  H: number;
  t: number;
  info: { kind: string; title: string; text: string; links: unknown[] }[];
}

export const FOV = (100 * Math.PI) / 180;
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
export const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));
const q = (n: number) => (Number.isFinite(n) ? n.toFixed(1) : '0');
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const INK = '#1b1b24';

export function drawScene(st: SceneState): string {
  const L = LOOK[st.region];
  const { W, H, heading, pitch, z0, t } = st;
  const f = W / 2 / Math.tan(FOV / 2);
  const cy = Math.cos(heading);
  const sy = Math.sin(heading);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  /** world (x across, y up, z along the road) → screen; null behind the camera */
  const proj = (x: number, y: number, z: number) => {
    const dz = z - z0;
    const vx = x * cy - dz * sy;
    const vz1 = x * sy + dz * cy;
    const dy = y - L.camH;
    const vy = dy * cp - vz1 * sp;
    const vz = dy * sp + vz1 * cp;
    if (vz < 0.35) return null;
    return { x: W / 2 + (vx * f) / vz, y: H / 2 - (vy * f) / vz, s: f / vz, d: vz };
  };
  /** screen y of something at elevation angle `el` (radians) far away */
  const skyY = (el: number) => H / 2 + f * Math.tan(pitch - el);
  const hy = skyY(0);
  const bearingAt = (x: number) => heading + Math.atan((x - W / 2) / f);

  // ---- sky, sun, clouds, skyline, ground ----
  let out = `<defs><linearGradient id="sv-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${L.sky[0]}"/><stop offset="1" stop-color="${L.sky[1]}"/></linearGradient>
    <linearGradient id="sv-far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${L.snow ? '#ffffff' : L.far}"/><stop offset="${L.snow ? 0.35 : 1}" stop-color="${L.far}"/></linearGradient>
    <pattern id="sv-stripe" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)"><rect width="8" height="8" fill="#ffd60a"/><rect width="4" height="8" fill="${INK}"/></pattern></defs>`;
  out += `<rect width="${W}" height="${q(Math.max(0, Math.min(H, hy + 2)))}" fill="url(#sv-sky)"/>`;
  // the sun (high in the sky behind you at the start)
  const sunRel = wrapAngle(2.5 - heading);
  if (Math.abs(sunRel) < FOV / 2 + 0.3) {
    const sx = W / 2 + Math.tan(sunRel) * f;
    const syy = skyY(0.75);
    out += `<circle cx="${q(sx)}" cy="${q(syy)}" r="60" fill="#fff6c2" fill-opacity="0.5"/><circle cx="${q(sx)}" cy="${q(syy)}" r="34" fill="#ffe27a"/>`;
  }
  for (let i = 0; i < 8; i++) {
    const b = (i / 8) * Math.PI * 2 + 0.4 + t * 0.004;
    const rel = wrapAngle(b - heading);
    if (Math.abs(rel) > FOV / 2 + 0.4) continue;
    const cx = W / 2 + Math.tan(rel) * f;
    const cyy = skyY(0.18 + 0.07 * (i % 3));
    const k = 1 + (i % 3) * 0.2;
    out += `<g fill="#fff" fill-opacity="0.9"><ellipse cx="${q(cx)}" cy="${q(cyy)}" rx="${q(70 * k)}" ry="${q(22 * k)}"/><ellipse cx="${q(cx - 40 * k)}" cy="${q(cyy + 8)}" rx="${q(44 * k)}" ry="18"/><ellipse cx="${q(cx + 46 * k)}" cy="${q(cyy + 6)}" rx="${q(50 * k)}" ry="17"/></g>`;
  }
  let hills = `M0 ${q(hy)}`;
  for (let x = 0; x <= W + 10; x += 10) hills += `L${x} ${q(skyY(L.hills(bearingAt(x))))}`;
  hills += `L${W + 10} ${q(hy)}Z`;
  out += `<path d="${hills}" fill="url(#sv-far)"/>`;
  if (hy < H) out += `<rect y="${q(Math.max(0, hy))}" width="${W}" height="${q(H - Math.max(0, hy))}" fill="${L.ground}"/>`;
  // birds in the sky
  if (L.birds) {
    for (let i = 0; i < L.birds.n; i++) {
      const seed = hash(i * 17 + 3);
      const x = -70 + ((t * 3 * (0.6 + seed) + seed * 140) % 140);
      const p = proj(x, 22 + seed * 14 + Math.sin(t * 0.8 + i) * 1.5, z0 + 50 + seed * 90);
      if (!p) continue;
      const flap = Math.sin(t * 9 + i * 2);
      const w = (L.birds.kind === 'vulture' || L.birds.kind === 'stork' ? 1.6 : 0.8) * p.s;
      const col = { crow: INK, vulture: '#3a2d25', stork: '#fff', parrot: i % 2 ? '#2ecc40' : '#d7263d', gull: '#fff' }[L.birds.kind];
      out += `<path d="M${q(p.x - w)} ${q(p.y)} Q${q(p.x - w / 2)} ${q(p.y - flap * w * 0.5)} ${q(p.x)} ${q(p.y)} Q${q(p.x + w / 2)} ${q(p.y - flap * w * 0.5)} ${q(p.x + w)} ${q(p.y)}" fill="none" stroke="${col}" stroke-width="${q(Math.max(1.5, w * 0.18))}" stroke-linecap="round"/>`;
      if (L.birds.kind === 'stork') out += `<path d="M${q(p.x - w)} ${q(p.y)} l${q(w * 0.3)} 0 M${q(p.x + w)} ${q(p.y)} l${q(-w * 0.3)} 0" stroke="${INK}" stroke-width="${q(Math.max(1.5, w * 0.18))}"/>`;
    }
  }

  // ---- the road ----
  const quad = (x1: number, x2: number, z1: number, z2: number, fill: string) => {
    const a = proj(x1, 0, z1);
    const b = proj(x2, 0, z1);
    const c = proj(x2, 0, z2);
    const d = proj(x1, 0, z2);
    if (!a || !b || !c || !d) return '';
    return `<path d="M${q(a.x)} ${q(a.y)}L${q(b.x)} ${q(b.y)}L${q(c.x)} ${q(c.y)}L${q(d.x)} ${q(d.y)}Z" fill="${fill}"/>`;
  };
  const strip = (x1: number, x2: number, fill: string, from = -120, to = 400) => {
    let o = '';
    for (let zz = z0 + from; zz < z0 + to; ) {
      const step = 0.8 + Math.abs(zz - z0) * 0.06;
      o += quad(x1, x2, zz, zz + step + 0.05, fill);
      zz += step;
    }
    return o;
  };
  const dashes = (x: number, w: number, color: string, on: number, off: number) => {
    let o = '';
    for (let k = Math.floor((z0 - 100) / (on + off)); k * (on + off) < z0 + 300; k++) o += quad(x - w, x + w, k * (on + off), k * (on + off) + on, color);
    return o;
  };
  out += strip(-L.roadW - 0.6, L.roadW + 0.6, L.gravel ? L.road : shade(L.ground, -0.12));
  out += strip(-L.roadW, L.roadW, L.road);
  if (L.gravel) out += strip(-1.7, -1.1, shade(L.road, -0.1)) + strip(1.1, 1.7, shade(L.road, -0.1));
  if (L.edge) out += strip(-L.roadW + 0.15, -L.roadW + 0.3, L.edge, -100, 300) + strip(L.roadW - 0.3, L.roadW - 0.15, L.edge, -100, 300);
  if (L.center) {
    if (L.center.type === 'dash') out += dashes(0, 0.07, L.center.color, 3, 6);
    else if (L.center.type === 'double') out += strip(-0.22, -0.1, L.center.color, -100, 300) + strip(0.1, 0.22, L.center.color, -100, 300);
    else out += strip(-0.07, 0.07, L.center.color, -100, 300);
  }

  // ---- things by the road, poles, animals, the site's content – far to near ----
  type Obj = { kind: string; x: number; z: number; v: number; info?: number; animal?: AnimalGen; phase?: number };
  const objs: Obj[] = [];
  const add = ([every, x, kind, offset = 0, jitter = 0]: Gen) => {
    for (let i = Math.floor((z0 - 90) / every); i <= Math.floor((z0 + 260) / every); i++) {
      const v = hash(i * 13 + kind.length * 7 + x);
      objs.push({ kind, x: x + (jitter ? (v - 0.5) * jitter : 0), z: i * every + offset + (jitter ? (hash(i * 3 + x) - 0.5) * jitter : 0), v });
    }
  };
  L.things.forEach(add);
  const poleX = L.roadW + (L.pole === 'snowpole' ? 0.9 : 1.6);
  if (L.pole !== 'none') add([L.poleEvery, poleX, 'pole', 0]);
  if (L.pole === 'snowpole') add([L.poleEvery, -poleX, 'pole', L.poleEvery / 2]);
  // animals: a few in every 120 m, walking to and fro along the road
  for (const a of L.animals) {
    for (let b = Math.floor((z0 - 90) / 120); b <= Math.floor((z0 + 260) / 120); b++) {
      for (let j = 0; j < a.n; j++) {
        const seed = hash(b * 31 + j * 7 + a.kind.length);
        const side = hash(b * 5 + j * 11 + a.kind.length) < 0.5 ? -1 : 1;
        const phase = seed * 20;
        const baseZ = b * 120 + seed * 110;
        objs.push({ kind: 'animal', animal: a, phase, x: side * (a.x[0] + hash(seed * 99) * (a.x[1] - a.x[0])), z: baseZ + Math.sin(t * a.speed * 0.5 + phase) * 6, v: seed });
      }
    }
  }
  st.info.forEach(() => undefined);
  for (let i = Math.floor((z0 - 90) / 60); i <= Math.floor((z0 + 260) / 60); i++) {
    const idx = ((i % st.info.length) + st.info.length) % st.info.length;
    const kind = st.info[idx].kind;
    const side = i % 2 === 0 ? -1 : 1;
    objs.push({ kind: 'info', x: side * (L.roadW + (kind === 'mailbox' ? 1.6 : kind === 'roadsign' ? 2 : 4.8)), z: i * 60 + 30, v: idx, info: idx });
  }
  const placed = objs
    .map((o) => ({ o, p: proj(o.x, 0, o.z) }))
    .filter((e) => e.p && e.p.d < 260 && e.p.x > -W && e.p.x < W * 2)
    .sort((a, b) => b.p!.d - a.p!.d);

  // the wires between the poles (drawn once, behind the near things)
  const tips = poleTips(L.pole);
  if (tips.length) {
    const poles = objs.filter((o) => o.kind === 'pole' && o.x > 0).sort((a, b) => a.z - b.z);
    let wires = '';
    for (let i = 1; i < poles.length; i++) {
      const A = poles[i - 1];
      const B = poles[i];
      for (const [tx, ty] of tips) {
        const a = proj(A.x + tx, ty, A.z);
        const b = proj(B.x + tx, ty, B.z);
        const m = proj(A.x + tx, ty - 0.9, (A.z + B.z) / 2);
        if (!a || !b || !m || a.d < 3 || b.d < 3) continue;
        const cxp = 2 * m.x - (a.x + b.x) / 2;
        const cyp = 2 * m.y - (a.y + b.y) / 2;
        wires += `M${q(a.x)} ${q(a.y)}Q${q(cxp)} ${q(cyp)} ${q(b.x)} ${q(b.y)}`;
      }
    }
    if (wires) out += `<path d="${wires}" fill="none" stroke="${INK}" stroke-width="1.1" stroke-opacity="0.8"/>`;
  }

  for (const { o, p } of placed) out += drawThing(o, p!, L, st, proj);
  return out;
}

/** Wire attachment points of each pole type: [x offset, height] */
function poleTips(pole: Pole): [number, number][] {
  switch (pole) {
    case 'jp':
      return [[-1, 9.2], [1, 9.2], [-0.6, 8], [0.6, 8]];
    case 'ladder':
      return [[-1, 8.6], [1, 8.6], [0, 9.2]];
    case 'wood':
    case 'concrete':
      return [[-1.1, 9.8], [1.1, 9.8], [0, 10.3]];
    case 'woodH':
      return [[-1.6, 8.8], [0, 8.8], [1.6, 8.8]];
    case 'cross':
      return [[-1, 9.6], [1, 9.6], [-0.8, 8.4], [0.8, 8.4], [-0.6, 6.6], [0.6, 6.6]];
    case 'tangle':
      return [[-0.9, 9.4], [0.9, 9.4], [-0.4, 7.2], [0.4, 7.2], [0, 6.4]];
    case 'stobie':
      return [[-1.2, 9.4], [1.2, 9.4]];
    case 'stub':
      return [[-1.1, 9.2], [1.1, 9.2]];
    default:
      return [];
  }
}

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v + 255 * amt)));
  return `rgb(${c(n >> 16)} ${c((n >> 8) & 255)} ${c(n & 255)})`;
}

type P = { x: number; y: number; s: number; d: number };
function drawThing(
  o: { kind: string; x: number; z: number; v: number; info?: number; animal?: AnimalGen; phase?: number },
  p: P,
  L: Look,
  st: SceneState,
  proj: (x: number, y: number, z: number) => P | null,
): string {
  const s = p.s;
  const X = p.x;
  const Y = p.y;
  const sw = q(Math.max(0.5, 0.06 * s));
  const ink = `stroke="${INK}" stroke-width="${sw}"`;
  const r = (x: number, y: number, w: number, h: number, fill: string, extra = '') =>
    `<rect x="${q(X + x * s)}" y="${q(Y - (y + h) * s)}" width="${q(Math.max(0.6, w * s))}" height="${q(Math.max(0.6, h * s))}" fill="${fill}" ${extra}/>`;
  const c = (x: number, y: number, rad: number, fill: string, extra = '') => `<circle cx="${q(X + x * s)}" cy="${q(Y - y * s)}" r="${q(Math.max(0.5, rad * s))}" fill="${fill}" ${extra}/>`;
  const e = (x: number, y: number, rx: number, ry: number, fill: string, extra = '') =>
    `<ellipse cx="${q(X + x * s)}" cy="${q(Y - y * s)}" rx="${q(Math.max(0.5, rx * s))}" ry="${q(Math.max(0.5, ry * s))}" fill="${fill}" ${extra}/>`;
  const poly = (pts: [number, number][], fill: string, extra = '') => `<path d="M${pts.map(([x, y]) => `${q(X + x * s)} ${q(Y - y * s)}`).join('L')}Z" fill="${fill}" ${extra}/>`;
  const text = (x: number, y: number, size: number, str: string, fill = INK, weight = 800) =>
    size * s < 6 ? '' : `<text x="${q(X + x * s)}" y="${q(Y - y * s)}" font-size="${q(size * s)}" font-weight="${weight}" fill="${fill}" text-anchor="middle" font-family="DM Sans, system-ui, sans-serif">${esc(str)}</text>`;
  const shadow = (w: number) => e(0, 0, w, w * 0.18, '#000', 'fill-opacity="0.15"');
  const g = (body: string, cls = 'sv-obj') => `<g class="${cls}">${body}</g>`;

  switch (o.kind) {
    case 'pole':
      return g(drawPole(L.pole, r, c, poly, ink, o.v));
    case 'house':
      return g(shadow(4.5) + r(-4, 0, 8, 5.5, o.v > 0.5 ? '#f1ede4' : '#dfe3e8', ink) + poly([[-4.6, 5.5], [0, 8], [4.6, 5.5]], o.v > 0.3 ? '#3d4452' : '#7a3b2e', ink) + r(-2.8, 2, 1.6, 1.4, '#9fc9ee', ink) + r(1, 2, 1.6, 1.4, '#9fc9ee', ink) + r(-0.5, 0, 1, 2.2, '#6b4420', ink));
    case 'mirror':
      return g(r(-0.05, 0, 0.1, 2.6, '#e9762b') + c(0, 2.9, 0.42, '#cfe6ff', `stroke="#e9762b" stroke-width="${q(0.12 * s)}"`));
    case 'vending':
      return g(r(-0.5, 0, 1, 1.8, '#f4f6f8', ink) + r(-0.4, 1, 0.8, 0.6, '#9fc9ee') + r(-0.4, 0.4, 0.8, 0.3, '#d7263d'));
    case 'hedge':
      return g(e(0, 0.5, 1.6, 0.6, '#5f8f3a', ink));
    case 'silo':
      return g(r(-3, 0, 6, 16, '#cfd4da', ink) + e(0, 16, 3, 1.5, '#aeb4bb', ink) + r(3, 0, 4, 11, '#c0c6cd', ink) + r(-7, 0, 4, 8, '#a33a2a', ink));
    case 'barn':
      return g(r(-5, 0, 10, 5, '#a33a2a', ink) + poly([[-5.4, 5], [0, 8.5], [5.4, 5]], '#6e2a20', ink) + r(-1.5, 0, 3, 3.4, '#f4f4f4', ink));
    case 'mailbox':
      return g(r(-0.05, 0, 0.1, 1.1, '#6b4420') + r(-0.3, 1.1, 0.6, 0.35, '#8a9099', ink));
    case 'wheat':
      return g(r(-4, 0, 8, 0.9, '#e2c26a') + r(-4, 0.9, 8, 0.25, '#f0d88a'));
    case 'sunflower':
      return g(r(-4, 0, 8, 1.3, '#4f7a2a') + [-3, -1.5, 0, 1.5, 3].map((x, i) => c(x, 1.5 + (i % 2) * 0.15, 0.35, '#ffc400', ink) + c(x, 1.5 + (i % 2) * 0.15, 0.13, '#5b3a22')).join(''));
    case 'fence':
      return g([-4, -2, 0, 2, 4].map((x) => r(x - 0.06, 0, 0.12, 1.2, '#8a5a2b')).join('') + r(-4, 0.9, 8, 0.08, '#8a5a2b') + r(-4, 0.5, 8, 0.08, '#8a5a2b'));
    case 'hay':
      return g(e(0, 0.7, 0.9, 0.7, '#e2c26a', ink) + e(0, 0.7, 0.4, 0.35, '#c9a64a'));
    case 'bollard':
      return g(r(-0.08, 0, 0.16, 1, '#fff', ink) + r(-0.08, 0.72, 0.16, 0.14, '#d7263d'));
    case 'reflector':
      return g(r(-0.07, 0, 0.14, 1.2, INK) + r(-0.07, 0.95, 0.14, 0.15, '#f5c518'));
    case 'km':
      return g(r(-0.3, 0, 0.6, 0.9, '#fff', ink) + text(0, 0.45, 0.28, String(Math.abs(Math.round(o.z / 100)))));
    case 'animita':
      return g(r(-0.45, 0, 0.9, 0.8, '#f4f6f8', ink) + poly([[-0.55, 0.8], [0, 1.25], [0.55, 0.8]], '#d7263d', ink) + r(-0.03, 1.25, 0.06, 0.3, INK) + r(-0.12, 1.4, 0.24, 0.05, INK));
    case 'rock':
      return g(e(0, 0.5, 2, 0.8, '#b89b72', ink));
    case 'lava':
      return g(e(0, 0.35, 2.4, 0.5, '#3f3f45', ink) + e(-0.8, 0.6, 0.9, 0.3, '#7fa66a') + e(1, 0.55, 0.8, 0.28, '#7fa66a'));
    case 'acacia':
      return g(shadow(2.4) + r(-0.12, 0, 0.24, 2.6, '#5b3a22') + e(0, 3, 2.6, 0.7, '#6f8f3a', ink));
    case 'tree':
      return g(shadow(2) + r(-0.18, 0, 0.36, 2.4, '#6b4420') + c(0, 3.6, 1.8, o.v > 0.5 ? '#5f8f3a' : '#4f7f35', ink));
    case 'poplar':
      return g(r(-0.12, 0, 0.24, 1.5, '#6b4420') + e(0, 5, 0.9, 4, '#4f7f35', ink));
    case 'pine':
      return g(r(-0.12, 0, 0.24, 1, '#6b4420') + poly([[-1.6, 1], [0, 8], [1.6, 1]], '#2f5f3a', ink));
    case 'palm':
      return g(`<path d="M${q(X)} ${q(Y)} Q${q(X + 0.6 * s)} ${q(Y - 3 * s)} ${q(X + 0.3 * s)} ${q(Y - 6.5 * s)}" fill="none" stroke="#8a5a2b" stroke-width="${q(0.3 * s)}"/>` + [0, 1, 2, 3, 4].map((i) => {
        const a = -Math.PI / 2 + (i - 2) * 0.7;
        return `<path d="M${q(X + 0.3 * s)} ${q(Y - 6.5 * s)} Q${q(X + (0.3 + Math.cos(a) * 1.4) * s)} ${q(Y - (6.9 + Math.sin(-a) * 0.6) * s)} ${q(X + (0.3 + Math.cos(a) * 2.6) * s)} ${q(Y - (6.1 + Math.sin(-a) * 1.2) * s)}" fill="none" stroke="#3f8f3a" stroke-width="${q(0.35 * s)}" stroke-linecap="round"/>`;
      }).join(''));
    case 'banana':
      return g(r(-0.12, 0, 0.24, 2.2, '#8a9a4a') + e(-0.9, 2.6, 1.2, 0.35, '#5faf3a', ink) + e(0.9, 2.8, 1.2, 0.35, '#5faf3a', ink) + e(0, 3.2, 0.4, 1, '#5faf3a', ink));
    case 'rice':
      return g(r(-5, 0, 10, 0.4, '#8fcf5a') + r(-5, 0.4, 10, 0.08, '#6f9f3a') + r(-4, 0.5, 8, 0.4, '#9fdf6a'));
    case 'cactus':
      return g(r(-0.25, 0, 0.5, 3, '#4f8f3a', ink) + r(-1, 1.4, 0.35, 1.2, '#4f8f3a', ink) + r(-1, 1.4, 0.8, 0.3, '#4f8f3a') + r(0.65, 1.8, 0.35, 1, '#4f8f3a', ink) + r(0.2, 1.8, 0.8, 0.3, '#4f8f3a'));
    case 'temple':
      return g(r(-4, 0, 8, 3, '#f4e6c8', ink) + poly([[-5, 3], [0, 7], [5, 3]], '#d7263d', ink) + poly([[-3.5, 5], [0, 8.5], [3.5, 5]], '#e0a020', ink) + r(-0.1, 8.5, 0.2, 1.5, '#e0a020'));
    case 'church':
      return g(r(-2.5, 0, 5, 4, '#fff', ink) + poly([[-2.8, 4], [0, 6.5], [2.8, 4]], '#a33a2a', ink) + r(1.4, 4, 1, 3.5, '#fff', ink) + poly([[1.2, 7.5], [1.9, 9.5], [2.6, 7.5]], '#a33a2a', ink));
    case 'dune':
      return g(poly([[-16, 0], [-3, 9], [2, 8], [9, 4], [18, 0]], '#e0894a') + poly([[2, 8], [9, 4], [18, 0], [4, 0]], '#c7703a'));
    case 'guide':
      return g(r(-0.07, 0, 0.14, 1, '#fff', ink) + r(-0.07, 0.8, 0.14, 0.12, '#d7263d'));
    case 'spinifex':
      return g(e(0, 0.3, 0.9, 0.4, '#b8a255', ink));
    case 'roosign':
      return g(r(-0.05, 0, 0.1, 2, '#8a9099') + poly([[0, 1.9], [0.55, 2.45], [0, 3], [-0.55, 2.45]], '#ffc400', ink) + text(0, 2.35, 0.32, '🦘'));
    case 'topes':
      return g(r(-0.05, 0, 0.1, 2, '#8a9099') + poly([[0, 1.9], [0.55, 2.45], [0, 3], [-0.55, 2.45]], '#ffc400', ink) + text(0, 2.38, 0.2, 'TOPE'));
    case 'ger': // Mongolian yurt
      return g(shadow(3.4) + r(-3, 0, 6, 2, '#f4f1ea', ink) + poly([[-3.2, 2], [0, 3.6], [3.2, 2]], '#f4f1ea', ink) + r(-0.5, 0, 1, 1.5, '#d7263d', ink) + r(-3, 1.2, 6, 0.2, '#2f6fb0'));
    case 'adobe':
      return g(shadow(3.4) + r(-3, 0, 6, 3, '#c98a5a', ink) + poly([[-3.3, 3], [0, 4.2], [3.3, 3]], '#a33a2a', ink) + r(-0.5, 0, 1, 1.8, '#6b4420', ink) + r(1.4, 1.4, 0.8, 0.7, '#3a2d25'));
    case 'stonewall':
      return g(r(-5, 0, 10, 0.9, '#9aa0a8', ink) + [-4, -2, 0, 2, 4].map((x) => e(x, 0.5, 0.6, 0.25, '#b8bdc4')).join(''));
    case 'busstop':
      return g(r(-1.4, 0, 0.12, 2.4, '#8a9099') + r(1.3, 0, 0.12, 2.4, '#8a9099') + r(-1.6, 2.4, 3.2, 0.3, '#2f6fb0', ink) + r(-1, 0.5, 2, 0.1, '#6b4420'));
    case 'animal':
      return drawAnimal(o, p, st, proj);
    case 'info':
      return drawInfo(o.info!, o.v, st, r, c, poly, text, ink, s, X, Y);
  }
  return '';
}

function drawPole(pole: Pole, r: (x: number, y: number, w: number, h: number, fill: string, extra?: string) => string, c: (x: number, y: number, rad: number, fill: string, extra?: string) => string, poly: (pts: [number, number][], fill: string, extra?: string) => string, ink: string, v: number): string {
  switch (pole) {
    case 'jp': // concrete, yellow-black stripes, tag plates
      return r(-0.14, 0, 0.28, 10, '#b8b4aa', ink) + r(-0.16, 0.2, 0.32, 1.4, 'url(#sv-stripe)') + r(-0.24, 2.4, 0.48, 0.55, '#fff', ink) + r(-0.24, 3.1, 0.48, 0.35, '#ffd60a', ink) + r(-1.1, 9.1, 2.2, 0.14, INK) + r(-0.7, 7.9, 1.4, 0.12, INK) + c(0.4, 7, 0.38, '#9aa3ad', ink);
    case 'ladder': // Hungarian concrete pole with the row of holes
      return poly([[-0.3, 0], [-0.16, 9], [0.16, 9], [0.3, 0]], '#b9b4a8', ink) + Array.from({ length: 10 }, (_, i) => r(-0.05, 0.8 + i * 0.8, 0.1, 0.45, '#f2f0ea')).join('') + r(-1.1, 8.5, 2.2, 0.16, INK);
    case 'wood':
      return r(-0.14, 0, 0.28, 10.5, '#8a5a2b', ink) + r(-1.3, 9.7, 2.6, 0.2, '#6b4420') + c(-1.1, 9.95, 0.1, '#dfe3e8') + c(1.1, 9.95, 0.1, '#dfe3e8') + (v > 0.6 ? r(0.15, 7, 0.6, 0.9, '#9aa3ad', ink) : '');
    case 'woodH': // two wooden legs, one beam
      return r(-1.4, 0, 0.26, 9, '#8a5a2b', ink) + r(1.14, 0, 0.26, 9, '#8a5a2b', ink) + r(-1.8, 8.6, 3.6, 0.22, '#6b4420');
    case 'cross': // Brazilian concrete pole with several cross-arms
      return poly([[-0.28, 0], [-0.14, 10], [0.14, 10], [0.28, 0]], '#c9c4b8', ink) + r(-1.1, 9.5, 2.2, 0.14, '#9aa3ad') + r(-0.9, 8.3, 1.8, 0.14, '#9aa3ad') + r(-0.7, 6.5, 1.4, 0.14, '#9aa3ad') + (v > 0.5 ? r(0.2, 5, 0.7, 1, '#9aa3ad', ink) : '');
    case 'concrete':
      return poly([[-0.26, 0], [-0.13, 10.3], [0.13, 10.3], [0.26, 0]], '#c9c4b8', ink) + r(-1.3, 9.7, 2.6, 0.16, '#6b6f76');
    case 'tangle': // concrete with a knot of cables
      return poly([[-0.26, 0], [-0.13, 9.8], [0.13, 9.8], [0.26, 0]], '#c9c4b8', ink) + r(-1, 9.3, 2, 0.14, '#6b6f76') + `<g fill="none" stroke="${INK}" stroke-width="1.2">${c(0, 6.6, 0.55, 'none')}${c(0.15, 6.8, 0.35, 'none')}</g>` + r(0.2, 5.2, 0.6, 0.8, '#9aa3ad', ink);
    case 'stobie': // South Australia's steel-and-concrete pole
      return r(-0.22, 0, 0.44, 10, '#9aa3ad', ink) + r(-0.22, 0, 0.08, 10, '#4b5058') + r(0.14, 0, 0.08, 10, '#4b5058') + r(-1.3, 9.3, 2.6, 0.16, '#4b5058');
    case 'stub': // wooden pole bolted to a concrete stub (Mongolia)
      return r(-0.24, 0, 0.48, 2.2, '#c9c4b8', ink) + r(-0.14, 1.6, 0.28, 8, '#8a5a2b', ink) + r(-1.3, 9, 2.6, 0.18, '#6b4420');
    case 'snowpole': // Iceland's yellow-and-black marker posts
      return r(-0.06, 0, 0.12, 1.4, '#ffd60a', ink) + r(-0.06, 1.1, 0.12, 0.3, INK);
  }
  return '';
}

function drawAnimal(o: { x: number; z: number; v: number; animal?: AnimalGen; phase?: number }, p: P, st: SceneState, proj: (x: number, y: number, z: number) => P | null): string {
  const a = o.animal!;
  const t = st.t;
  // which way does it walk on screen? (compare with a moment later)
  const vz = Math.cos(t * a.speed * 0.5 + (o.phase ?? 0));
  const ahead = proj(o.x, 0, o.z + vz * 0.5);
  const dir = ahead ? (ahead.x >= p.x ? 1 : -1) : 1;
  const hop = a.kind === 'kangaroo' ? Math.abs(Math.sin(t * 5 + (o.phase ?? 0))) * 0.8 : 0;
  const swing = Math.sin(t * 7 + (o.phase ?? 0)) * 0.35;
  const body = ANIMALS[a.kind]?.(swing) ?? '';
  // drawn in metres (y up), then placed and scaled
  return `<g class="sv-obj sv-animal" transform="translate(${q(p.x)} ${q(p.y - hop * p.s)}) scale(${q(dir * p.s)} ${q(p.s)})"><ellipse cx="0" cy="${q(hop)}" rx="0.9" ry="0.14" fill="#000" fill-opacity="0.15"/>${body}</g>`;
}

// ---- animals, side view, facing right, in metres (y up is negative) ----
const leg = (x: number, top: number, len: number, swing: number, col: string) =>
  `<path d="M${x} ${-top} l${(Math.sin(swing) * len).toFixed(2)} ${(Math.cos(swing) * len).toFixed(2)}" stroke="${col}" stroke-width="0.14" stroke-linecap="round" fill="none"/>`;
const quad4 = (o: { len: number; h: number; bodyH: number; col: string; legCol?: string; neck?: number; head?: string; extra?: string; tail?: string }, sw: number) => {
  const { len, h, bodyH, col } = o;
  const lc = o.legCol ?? col;
  const legs = leg(-len * 0.35, h, h, sw, lc) + leg(-len * 0.25, h, h, -sw, lc) + leg(len * 0.3, h, h, -sw, lc) + leg(len * 0.4, h, h, sw, lc);
  const neck = o.neck ?? 0.3;
  return `${legs}<ellipse cx="0" cy="${-(h + bodyH / 2)}" rx="${len / 2}" ry="${bodyH / 2}" fill="${col}" stroke="${INK}" stroke-width="0.05"/>` +
    `<path d="M${len * 0.4} ${-(h + bodyH * 0.6)} L${len * 0.5 + neck * 0.3} ${-(h + bodyH + neck)}" stroke="${col}" stroke-width="${Math.max(0.12, bodyH * 0.35)}" stroke-linecap="round"/>` +
    (o.head ?? `<ellipse cx="${len * 0.55 + neck * 0.3}" cy="${-(h + bodyH + neck)}" rx="${bodyH * 0.35}" ry="${bodyH * 0.25}" fill="${col}" stroke="${INK}" stroke-width="0.05"/>`) +
    (o.tail ?? `<path d="M${-len / 2} ${-(h + bodyH * 0.7)} q-0.2 0.3 -0.15 ${bodyH * 0.6}" stroke="${col}" stroke-width="0.08" fill="none"/>`) +
    (o.extra ?? '');
};
const ANIMALS: Record<string, (sw: number) => string> = {
  cow: (sw) => quad4({ len: 2.2, h: 0.8, bodyH: 0.9, col: '#fff', extra: '<ellipse cx="-0.3" cy="-1.3" rx="0.35" ry="0.25" fill="#1b1b24"/><ellipse cx="0.5" cy="-1.1" rx="0.25" ry="0.2" fill="#1b1b24"/>' }, sw),
  sheep: (sw) => quad4({ len: 1.2, h: 0.45, bodyH: 0.7, col: '#f4f1ea', legCol: '#1b1b24', neck: 0.1, head: '<ellipse cx="0.72" cy="-1.05" rx="0.22" ry="0.17" fill="#1b1b24"/>' }, sw),
  horse: (sw) => quad4({ len: 2.1, h: 1, bodyH: 0.8, col: '#8a5a2b', neck: 0.7, extra: '<path d="M1.05 -2.1 l-0.4 0.7" stroke="#f0e2c0" stroke-width="0.18"/>' }, sw),
  zebra: (sw) => quad4({ len: 2, h: 0.9, bodyH: 0.8, col: '#fff', neck: 0.6, extra: [-0.6, -0.3, 0, 0.3, 0.6].map((x) => `<path d="M${x} -1 l0.1 -0.7" stroke="#1b1b24" stroke-width="0.12"/>`).join('') }, sw),
  giraffe: (sw) => quad4({ len: 1.9, h: 1.6, bodyH: 0.9, col: '#e8b04a', neck: 2.2, extra: '<circle cx="-0.4" cy="-2.1" r="0.15" fill="#8a5a2b"/><circle cx="0.2" cy="-2" r="0.15" fill="#8a5a2b"/><circle cx="0.5" cy="-2.3" r="0.12" fill="#8a5a2b"/>' }, sw),
  oryx: (sw) => quad4({ len: 1.8, h: 0.9, bodyH: 0.7, col: '#d9c7a0', neck: 0.5, extra: '<path d="M1.1 -2.1 l0.9 -0.9" stroke="#1b1b24" stroke-width="0.06"/><path d="M-0.9 -1.4 h1.8" stroke="#1b1b24" stroke-width="0.08"/>' }, sw),
  springbok: (sw) => quad4({ len: 1.3, h: 0.7, bodyH: 0.55, col: '#c98a4a', neck: 0.4, extra: '<path d="M0.8 -1.7 q0.2 -0.4 0 -0.6" stroke="#1b1b24" stroke-width="0.05" fill="none"/><path d="M-0.6 -1 h1.2" stroke="#fff" stroke-width="0.1"/>' }, sw),
  moose: (sw) => quad4({ len: 2.4, h: 1.2, bodyH: 1, col: '#4a3222', neck: 0.4, extra: '<path d="M1.3 -2.7 l0.5 -0.5 m-0.3 0.2 l0.2 -0.5 m-0.8 0.8 l-0.2 -0.6" stroke="#c9b28a" stroke-width="0.12"/>' }, sw),
  guanaco: (sw) => quad4({ len: 1.5, h: 0.9, bodyH: 0.6, col: '#c9955a', neck: 1, legCol: '#b07a45' }, sw),
  capybara: (sw) => quad4({ len: 1.1, h: 0.25, bodyH: 0.55, col: '#8a6a45', neck: 0.05, tail: '' }, sw),
  dog: (sw) => quad4({ len: 0.8, h: 0.35, bodyH: 0.35, col: '#b07a45', neck: 0.15, tail: '<path d="M-0.4 -0.6 q-0.2 -0.3 -0.1 -0.4" stroke="#b07a45" stroke-width="0.07" fill="none"/>' }, sw),
  cat: (sw) => quad4({ len: 0.5, h: 0.2, bodyH: 0.22, col: '#e0913a', neck: 0.05, tail: '<path d="M-0.25 -0.35 q-0.15 -0.3 0 -0.45" stroke="#e0913a" stroke-width="0.06" fill="none"/>' }, sw),
  buffalo: (sw) => quad4({ len: 2.2, h: 0.75, bodyH: 0.95, col: '#5b5d63', neck: 0.1, extra: '<path d="M1.05 -1.7 q0.5 -0.3 0.3 0.2" stroke="#d9d4c8" stroke-width="0.1" fill="none"/>' }, sw),
  baboon: (sw) => quad4({ len: 0.9, h: 0.4, bodyH: 0.45, col: '#8a7a5a', neck: 0.1, tail: '<path d="M-0.45 -0.7 q-0.3 -0.2 -0.2 0.3" stroke="#8a7a5a" stroke-width="0.08" fill="none"/>' }, sw),
  monkey: (sw) => quad4({ len: 0.6, h: 0.25, bodyH: 0.35, col: '#9a7a55', neck: 0.1, tail: '<path d="M-0.3 -0.45 q-0.4 -0.4 -0.1 -0.8" stroke="#9a7a55" stroke-width="0.06" fill="none"/>' }, sw),
  chicken: (sw) => `${leg(0, 0.25, 0.25, sw, '#e0a020')}${leg(0.08, 0.25, 0.25, -sw, '#e0a020')}<ellipse cx="0" cy="-0.42" rx="0.25" ry="0.2" fill="#fff" stroke="#1b1b24" stroke-width="0.03"/><circle cx="0.22" cy="-0.6" r="0.09" fill="#fff" stroke="#1b1b24" stroke-width="0.03"/><path d="M0.2 -0.7 l0.04 -0.07 l0.05 0.07" fill="#d7263d"/>`,
  rhea: (sw) => `${leg(0, 0.8, 0.8, sw, '#8a8f99')}${leg(0.1, 0.8, 0.8, -sw, '#8a8f99')}<ellipse cx="0" cy="-1.05" rx="0.5" ry="0.35" fill="#9aa0a8" stroke="#1b1b24" stroke-width="0.04"/><path d="M0.4 -1.2 L0.55 -1.9" stroke="#9aa0a8" stroke-width="0.1"/><circle cx="0.58" cy="-1.95" r="0.09" fill="#9aa0a8"/>`,
  llama: (sw) => quad4({ len: 1.3, h: 0.8, bodyH: 0.6, col: '#f1e6d0', neck: 0.9, extra: '<path d="M0.96 -2.4 l0.05 -0.2 M1.08 -2.4 l0.06 -0.2" stroke="#1b1b24" stroke-width="0.05"/>' }, sw),
  yak: (sw) => quad4({ len: 2, h: 0.6, bodyH: 1, col: '#3a2d25', neck: 0.1, extra: '<path d="M-1 -0.6 q1 0.3 2 0" stroke="#3a2d25" stroke-width="0.2" fill="none"/><path d="M1.1 -1.8 q0.3 -0.3 0.1 -0.5" stroke="#d9d4c8" stroke-width="0.08" fill="none"/>' }, sw),
  camel: (sw) => quad4({ len: 2, h: 1.2, bodyH: 0.8, col: '#c9a26a', neck: 0.6, extra: '<ellipse cx="-0.4" cy="-2.2" rx="0.35" ry="0.3" fill="#c9a26a"/><ellipse cx="0.3" cy="-2.2" rx="0.35" ry="0.3" fill="#c9a26a"/>' }, sw),
  kangaroo: () => `<path d="M-0.3 -0.2 q0.1 -0.8 0.3 -1.2 q0.3 -0.3 0.35 -0.8" stroke="#b86a3a" stroke-width="0.45" stroke-linecap="round" fill="none"/><ellipse cx="0.42" cy="-2.1" rx="0.18" ry="0.14" fill="#b86a3a"/><path d="M0.36 -2.25 l-0.05 -0.2 M0.46 -2.25 l0.02 -0.2" stroke="#b86a3a" stroke-width="0.07"/><path d="M-0.35 -0.4 q-0.6 0.1 -0.9 0.4" stroke="#b86a3a" stroke-width="0.15" fill="none"/><path d="M-0.2 0 h0.5" stroke="#8a4a2a" stroke-width="0.12"/>`,
};

function drawInfo(
  idx: number,
  v: number,
  st: SceneState,
  r: (x: number, y: number, w: number, h: number, fill: string, extra?: string) => string,
  c: (x: number, y: number, rad: number, fill: string, extra?: string) => string,
  poly: (pts: [number, number][], fill: string, extra?: string) => string,
  text: (x: number, y: number, size: number, str: string, fill?: string, weight?: number) => string,
  ink: string,
  s: number,
  X: number,
  Y: number,
): string {
  const it = st.info[idx] as { kind: string; title: string; text: string; links: { label: string }[] };
  const cut = it.title.length > 18 ? (it.title.lastIndexOf(' ', 18) > 0 ? it.title.lastIndexOf(' ', 18) : 18) : -1;
  const lines = cut > 0 ? [it.title.slice(0, cut), it.title.slice(cut).trim()] : [it.title];
  let g = '';
  if (it.kind === 'billboard') {
    g = r(-2.4, 0, 0.25, 4, '#6b4420') + r(2.15, 0, 0.25, 4, '#6b4420') + r(-3.4, 3.5, 6.8, 3.4, v % 2 ? '#7B2FF7' : '#FFD60A', ink) + r(-3.1, 3.8, 6.2, 2.8, '#fff', ink) +
      lines.map((l, i) => text(0, 5.9 - i * 0.75, 0.62, l)).join('') + text(0, 4.1, 0.38, '▶ ' + (lines.length > 1 ? '' : it.text.slice(0, 26) + '…'), '#5A14D1', 700);
  } else if (it.kind === 'roadsign') {
    g = r(-0.07, 0, 0.14, 2.2, '#8a9099') + r(-1.3, 2.1, 2.6, 1.9, '#1f7a3d', ink) + it.text.split('\n').slice(0, 3).map((l, i) => text(0, 3.6 - i * 0.55, 0.42, l, '#fff')).join('');
  } else if (it.kind === 'signpost') {
    g = r(-0.08, 0, 0.16, 3.6, '#6b4420') + it.links.slice(0, 3).map((l, i) => poly([[-1.4, 3.3 - i * 0.62], [1.2, 3.3 - i * 0.62], [1.55, 3.08 - i * 0.62], [1.2, 2.86 - i * 0.62], [-1.4, 2.86 - i * 0.62]], i % 2 ? '#FFD60A' : '#fff', ink) + text(0.1, 2.98 - i * 0.62, 0.3, l.label.slice(0, 16))).join('');
  } else {
    g = r(-0.06, 0, 0.12, 1.1, '#6b4420') + r(-0.4, 1.1, 0.8, 0.5, '#d7263d', ink) + text(0, 1.28, 0.24, '✉', '#fff') + text(0, 1.9, 0.26, it.title);
  }
  void c;
  void s;
  void X;
  void Y;
  return `<g class="sv-obj sv-info" data-info="${idx}" tabindex="0" role="button" aria-label="${esc(it.title)}">${g}</g>`;
}
