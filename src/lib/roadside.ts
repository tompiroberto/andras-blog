/**
 * Roadside tiles for the horizontal page, one look per scrollbar country: its kind of utility poles,
 * road signs, traffic lights and a few local specialities (Georgia's yellow gas pipes, Swedish moose
 * signs, New Zealand's kiwi sign, Japan's horizontal traffic lights, Vietnam's tangled cables…).
 * Everything is drawn as simple SVG in the site's style; the tile repeats along the page.
 */
export const TILE_W = 1600;
export const TILE_H = 130;
const G = 124; // ground line
const RED = '#d7263d';
const YEL = '#ffc400';
const f = (n: number) => Math.round(n * 10) / 10;

type PoleKind = 'ladder' | 'concrete' | 'wood' | 'jp' | 'tangle';
type Sign =
  | { k: 'speed'; v: number; style?: 'eu' | 'se' | 'jp' | 'us' }
  | { k: 'giveway'; text?: string }
  | { k: 'stop'; text: string; jp?: boolean }
  | { k: 'priority' }
  | { k: 'crossing' }
  | { k: 'warning'; sym: '!' | 'moose' | 'camel'; yellow?: boolean }
  | { k: 'diamond'; sym: '!' | 'curve' | 'walker' | 'kiwi' };

interface Profile {
  pole: PoleKind;
  /** extra loose cables between the poles */
  extraWires?: number;
  transformer?: boolean;
  /** six signs, left to right */
  signs: [Sign, Sign, Sign, Sign, Sign, Sign];
  light: 'v' | 'h' | 'us';
  chevron: 'eu' | 'yellow';
  rail?: 'grey' | 'white';
  gasPipe?: boolean;
}

const eu = (speed: number, last: Sign = { k: 'warning', sym: '!' }, stop = 'STOP'): Profile['signs'] => [
  { k: 'speed', v: speed },
  { k: 'giveway' },
  { k: 'crossing' },
  { k: 'stop', text: stop },
  { k: 'priority' },
  last,
];
const americas = (speed: number, stop: string, extra: Sign = { k: 'diamond', sym: '!' }): Profile['signs'] => [
  { k: 'speed', v: speed },
  { k: 'diamond', sym: 'curve' },
  { k: 'diamond', sym: 'walker' },
  { k: 'stop', text: stop },
  { k: 'giveway' },
  extra,
];

export const PROFILES: Record<string, Profile> = {
  hungary: { pole: 'ladder', signs: eu(50), light: 'v', chevron: 'eu' },
  georgia: { pole: 'ladder', signs: eu(60), light: 'v', chevron: 'eu', gasPipe: true },
  portugal: { pole: 'concrete', signs: eu(50), light: 'v', chevron: 'eu' },
  sweden: { pole: 'wood', signs: [{ k: 'speed', v: 70, style: 'se' }, { k: 'giveway' }, { k: 'crossing' }, { k: 'stop', text: 'STOP' }, { k: 'priority' }, { k: 'warning', sym: 'moose', yellow: true }], light: 'v', chevron: 'eu' },
  norway: { pole: 'wood', signs: eu(80, { k: 'warning', sym: 'moose', yellow: true }), light: 'v', chevron: 'eu' },
  chile: { pole: 'concrete', extraWires: 1, signs: americas(60, 'PARE'), light: 'v', chevron: 'yellow' },
  argentina: { pole: 'concrete', extraWires: 1, signs: americas(60, 'PARE'), light: 'v', chevron: 'yellow' },
  brazil: { pole: 'concrete', extraWires: 3, transformer: true, signs: americas(60, 'PARE'), light: 'v', chevron: 'yellow' },
  mexico: { pole: 'concrete', extraWires: 2, transformer: true, signs: americas(60, 'ALTO'), light: 'v', chevron: 'yellow' },
  mississippi: { pole: 'wood', transformer: true, signs: americas(55, 'STOP'), light: 'us', chevron: 'yellow' },
  japan: {
    pole: 'jp',
    transformer: true,
    signs: [{ k: 'speed', v: 40, style: 'jp' }, { k: 'diamond', sym: 'curve' }, { k: 'crossing' }, { k: 'stop', text: '止まれ', jp: true }, { k: 'diamond', sym: 'walker' }, { k: 'diamond', sym: '!' }],
    light: 'h',
    chevron: 'yellow',
    rail: 'white',
  },
  vietnam: { pole: 'tangle', extraWires: 6, signs: eu(50, { k: 'warning', sym: '!', yellow: true }), light: 'v', chevron: 'eu' },
  newzealand: { pole: 'wood', signs: americas(100, 'STOP', { k: 'diamond', sym: 'kiwi' }), light: 'v', chevron: 'yellow' },
  mozambique: { pole: 'wood', signs: eu(60), light: 'v', chevron: 'eu' },
  nile: { pole: 'concrete', signs: eu(60, { k: 'warning', sym: 'camel' }), light: 'v', chevron: 'eu' },
};

// ---- small symbols (drawn around 0,0, about 16 px tall) ----
const SYM = {
  moose: '<path d="M-7 5 V1 Q-7 -2 -3 -2 H3 L5 -5 L7 -4 L6 -1 L7 1 L5 1 L4 5 M-5 5 V2 M2 5 V1 M4 -5 L2 -8 M5 -5 L7 -8" fill="none" stroke="#111" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  camel: '<path d="M-8 5 V0 Q-8 -3 -5 -3 Q-4 -6 -2 -3 Q0 -6 2 -3 H4 L6 -6 L8 -5 L6 -1 V5 M-5 5 V1 M3 5 V1" fill="none" stroke="#111" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  kiwi: '<ellipse cx="-1" cy="0" rx="6" ry="4.5" fill="#111"/><path d="M4 -2 L10 3 M-2 4 v3 M1 4 v3" stroke="#111" stroke-width="1.3" stroke-linecap="round"/>',
  walker: '<circle cx="0" cy="-6" r="2" fill="#111"/><path d="M0 -3 L-1 3 L-4 8 M-1 3 L2 8 M-4 0 L3 -1" fill="none" stroke="#111" stroke-width="1.8" stroke-linecap="round"/>',
  curve: '<path d="M-3 7 V1 Q-3 -3 2 -4 V-7 L7 -2 L2 3 V0 Q1 0 1 2 V7" fill="#111"/>',
  '!': '<path d="M0 -6 V2" stroke="#111" stroke-width="2.6" stroke-linecap="round"/><circle cx="0" cy="6" r="1.5" fill="#111"/>',
};

export function buildTile(p: Profile): string {
  const parts: string[] = [];
  const back: string[] = [];

  // ---- Georgia: yellow gas pipes along the road, arching up over the entrances ----
  if (p.gasPipe) {
    const d = `M-10 106 H250 V70 H300 V106 H760 V64 H820 V106 H1240 V70 H1290 V106 H${TILE_W + 10}`;
    back.push(`<path d="${d}" fill="none" stroke="#111" stroke-width="7" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${YEL}" stroke-width="4.5" stroke-linejoin="round"/>`);
    for (const x of [100, 520, 640, 1000, 1450]) back.push(`<path d="M${x} 106 V${G}" stroke="#111" stroke-width="2.5"/>`);
  }

  // ---- guardrails ----
  const railFill = p.rail === 'white' ? '#f4f6f8' : '#c9ced6';
  const guardrail = (x1: number, x2: number) => {
    for (let x = x1 + 6; x <= x2 - 4; x += 50) parts.push(`<rect x="${x - 2.5}" y="96" width="5" height="${G - 96}" class="rs-ink"/>`);
    parts.push(`<rect x="${x1}" y="90" width="${x2 - x1}" height="11" rx="3" fill="${railFill}" class="rs-edge"/>`);
    parts.push(`<path d="M${x1 + 3} 95.5 H${x2 - 3}" class="rs-rail-line"/>`);
  };
  guardrail(110, 390);
  guardrail(1060, 1340);

  // ---- delineator posts ----
  const bollard = (x: number) =>
    parts.push(
      `<rect x="${x - 5}" y="84" width="10" height="${G - 84}" rx="2" class="rs-bollard"/>`,
      `<rect x="${x - 5}" y="88" width="10" height="8" class="rs-ink"/>`,
      `<rect x="${x - 3}" y="90" width="6" height="4" rx="1" fill="${p.chevron === 'yellow' ? YEL : '#ff8a00'}"/>`,
    );
  [480, 530, 790, 840, 890, 1560].forEach(bollard);

  // ---- chevron boards ----
  const chevron = (x: number, dir: 1 | -1) => {
    const c = (dx: number) => `M${x + dx - 3 * dir} 80 l${6 * dir} 6 l${-6 * dir} 6`;
    const [bg, fg] = p.chevron === 'yellow' ? [YEL, '#111'] : [RED, '#fff'];
    parts.push(
      `<rect x="${x - 1.5}" y="92" width="3" height="${G - 92}" class="rs-ink"/>`,
      `<rect x="${x - 13}" y="77" width="26" height="18" rx="2" fill="${bg}" class="rs-edge"/>`,
      `<path d="${c(-5)} ${c(5)}" fill="none" stroke="${fg}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,
    );
  };
  [300, 345].forEach((x) => chevron(x, 1));
  [1170, 1215, 1260].forEach((x) => chevron(x, -1));

  // ---- signs ----
  const post = (x: number, top: number) => parts.push(`<path d="M${x} ${G} V${top}" class="rs-post"/>`);
  const text = (x: number, y: number, size: number, t: string, fill = '#111') =>
    `<text x="${x}" y="${y}" class="rs-text" font-size="${size}" fill="${fill}">${t}</text>`;
  const sign = (s: Sign, x: number) => {
    post(x, 72);
    switch (s.k) {
      case 'speed':
        if (s.style === 'us') {
          parts.push(`<rect x="${x - 12}" y="36" width="24" height="32" rx="2" fill="#fff" class="rs-edge"/>`,
            text(x, 45, 5.2, 'SPEED'), text(x, 51, 5.2, 'LIMIT'), text(x, 64, 11, String(s.v)));
        } else {
          const bg = s.style === 'se' ? YEL : '#fff';
          const num = s.style === 'jp' ? '#1e5bd6' : '#111';
          parts.push(`<circle cx="${x}" cy="56" r="14" fill="${bg}" stroke="${RED}" stroke-width="4.5" class="rs-edge"/>`, text(x, 60.5, s.v >= 100 ? 10.5 : 12.5, String(s.v), num));
        }
        break;
      case 'giveway':
        parts.push(`<path d="M${x - 16} 44 H${x + 16} L${x} 72 Z" fill="#fff" stroke="${RED}" stroke-width="4" stroke-linejoin="round"/>`);
        break;
      case 'stop':
        if (s.jp) {
          parts.push(`<path d="M${x - 17} 42 H${x + 17} L${x} 72 Z" fill="${RED}" stroke="#fff" stroke-width="1.5" class="rs-edge"/>`, text(x, 53, 7, s.text, '#fff'));
        } else {
          const pts = Array.from({ length: 8 }, (_, i) => {
            const a = Math.PI / 8 + (i * Math.PI) / 4;
            return `${f(x + 15 * Math.cos(a))},${f(57 + 15 * Math.sin(a))}`;
          }).join(' ');
          parts.push(`<polygon points="${pts}" fill="${RED}" stroke="#fff" stroke-width="1.5" class="rs-edge"/>`, text(x, 60, s.text.length > 4 ? 6.5 : 7.5, s.text, '#fff'));
        }
        break;
      case 'priority':
        parts.push(`<path d="M${x} 42 L${x + 15} 57 L${x} 72 L${x - 15} 57 Z" fill="#fff" class="rs-edge"/>`, `<path d="M${x} 47 L${x + 10} 57 L${x} 67 L${x - 10} 57 Z" fill="${YEL}"/>`);
        break;
      case 'crossing':
        parts.push(`<rect x="${x - 14}" y="43" width="28" height="28" rx="3" fill="#1e5bd6" class="rs-edge"/>`, `<path d="M${x} 46.5 L${x + 11.5} 67 H${x - 11.5} Z" fill="#fff"/>`,
          `<g transform="translate(${x} 60) scale(0.62)">${SYM.walker}</g>`);
        break;
      case 'warning':
        parts.push(`<path d="M${x} 41 L${x + 18} 72 H${x - 18} Z" fill="${s.yellow ? YEL : '#fff'}" stroke="${RED}" stroke-width="4" stroke-linejoin="round"/>`,
          `<g transform="translate(${x} 63) scale(${s.sym === '!' ? 0.8 : 0.85})">${SYM[s.sym]}</g>`);
        break;
      case 'diamond':
        parts.push(`<path d="M${x} 40 L${x + 16} 56 L${x} 72 L${x - 16} 56 Z" fill="${YEL}" stroke="#111" stroke-width="1.8" stroke-linejoin="round"/>`,
          `<g transform="translate(${x} 57) scale(0.8)">${SYM[s.sym]}</g>`);
        break;
    }
  };
  [60, 660, 725, 950, 1455, 1510].forEach((x, i) => sign(p.signs[i], x));

  // ---- traffic light ----
  const lx = 430;
  post(lx, 78);
  if (p.light === 'h') {
    parts.push(`<rect x="${lx - 26}" y="34" width="52" height="18" rx="5" class="rs-ink"/>`,
      `<circle cx="${lx - 15}" cy="43" r="5.5" class="tl tl-g tl-jp"/>`, `<circle cx="${lx}" cy="43" r="5.5" class="tl tl-y"/>`, `<circle cx="${lx + 15}" cy="43" r="5.5" class="tl tl-r"/>`,
      `<path d="M${lx} 52 V78" class="rs-post"/>`);
  } else {
    parts.push(`<rect x="${lx - 10}" y="30" width="20" height="50" rx="5" fill="${p.light === 'us' ? YEL : '#111'}" class="rs-edge"/>`,
      `<circle cx="${lx}" cy="40" r="5.5" class="tl tl-r"/>`, `<circle cx="${lx}" cy="55" r="5.5" class="tl tl-y"/>`, `<circle cx="${lx}" cy="70" r="5.5" class="tl tl-g"/>`);
  }

  // ---- poles and wires ----
  const POLES = [200, 600, 1000, 1400];
  const TOP = p.pole === 'jp' ? 8 : 20;
  const tipsOf = (x: number): [number, number][] => {
    switch (p.pole) {
      case 'jp':
        return [[x - 20, TOP + 4], [x + 20, TOP + 4], [x - 15, TOP + 20], [x + 15, TOP + 20], [x, TOP - 4]];
      case 'wood':
        return [[x - 20, TOP + 3], [x + 20, TOP + 3], [x, TOP - 4]];
      default:
        return [[x - 19, TOP + 2], [x + 19, TOP + 2], [x, TOP - 5]];
    }
  };
  const poleSvg = (x: number) => {
    const half = (y: number, a: number, b: number) => a + (b - a) * ((y - TOP) / (G - TOP));
    const out: string[] = [];
    if (p.pole === 'wood') {
      out.push(`<path d="M${x - 4.5} ${G} L${x - 3} ${TOP} H${x + 3} L${x + 4.5} ${G} Z" fill="#8a5a2b" class="rs-edge"/>`,
        `<path d="M${x - 23} ${TOP + 8} H${x + 23}" stroke="#6b4420" stroke-width="4" stroke-linecap="round"/>`,
        `<path d="M${x - 20} ${TOP + 8} v-5 M${x + 20} ${TOP + 8} v-5 M${x} ${TOP} v-4" class="rs-insulator"/>`);
    } else {
      const w0 = p.pole === 'jp' ? 3 : 3.5;
      const w1 = p.pole === 'jp' ? 6 : p.pole === 'ladder' ? 7.5 : 6.5;
      out.push(`<path d="M${f(x - w1)} ${G} L${x - w0} ${TOP} H${x + w0} L${f(x + w1)} ${G} Z" class="rs-concrete"/>`);
      if (p.pole === 'ladder') {
        for (let y = TOP + 12; y < G - 6; y += 8) out.push(`<rect x="${f(x - 1.3)}" y="${y}" width="2.6" height="4.6" class="rs-hole"/>`);
      }
      if (p.pole === 'jp') {
        // climbing steps and two cross-arms
        for (let y = TOP + 30; y < G - 30; y += 12) out.push(`<path d="M${f(x - half(y, w0, w1) - 4)} ${y} h4 M${f(x + half(y + 6, w0, w1))} ${y + 6} h4" stroke="#111" stroke-width="1.4"/>`);
        out.push(`<path d="M${x - 23} ${TOP + 8} H${x + 23} M${x - 18} ${TOP + 24} H${x + 18}" class="rs-arm"/>`,
          `<path d="M${x - 20} ${TOP + 8} v-5 M${x + 20} ${TOP + 8} v-5 M${x - 15} ${TOP + 24} v-5 M${x + 15} ${TOP + 24} v-5 M${x} ${TOP} v-5" class="rs-insulator"/>`);
      } else {
        out.push(`<path d="M${x - 22} ${TOP + 7} H${x + 22}" class="rs-arm"/>`, `<path d="M${x - 19} ${TOP + 7} v-5 M${x + 19} ${TOP + 7} v-5 M${x} ${TOP} v-5" class="rs-insulator"/>`);
      }
    }
    if (p.transformer && x % 800 === 200) {
      out.push(`<rect x="${x + 6}" y="${TOP + 36}" width="14" height="20" rx="3" fill="#9aa3ad" class="rs-edge"/><path d="M${x + 4} ${TOP + 40} h4 M${x + 4} ${TOP + 52} h4" stroke="#111" stroke-width="1.6"/>`);
    }
    if (p.pole === 'tangle') {
      // the famous knot of cables and a coil hanging on the pole
      out.push(`<ellipse cx="${x}" cy="${TOP + 44}" rx="11" ry="7" fill="none" stroke="#111" stroke-width="2"/><ellipse cx="${x + 2}" cy="${TOP + 46}" rx="7" ry="4" fill="none" stroke="#111" stroke-width="1.6"/>`);
    }
    return out.join('');
  };
  const poles = POLES.map(poleSvg);
  const wires: string[] = [];
  POLES.forEach((x, i) => {
    const next = POLES[i + 1] ?? POLES[0] + TILE_W; // the last span reaches into the next tile
    const ta = tipsOf(x);
    const tb = tipsOf(next);
    ta.forEach(([ax, ay], j) => {
      const [bx, by] = tb[j];
      const d = `M${ax} ${ay} Q${(ax + bx) / 2} ${ay + 26} ${bx} ${by}`;
      wires.push(`<path d="${d}" class="rs-wire"/><path d="${d}" class="spark" pathLength="1"/>`);
    });
    // loose telephone / cable TV lines lower down, sagging more
    for (let k = 0; k < (p.extraWires ?? 0); k++) {
      const ay = TOP + 34 + k * 5;
      const sag = 30 + ((k * 37 + i * 19) % 40);
      const d = `M${x} ${ay} Q${(x + next) / 2} ${ay + sag} ${next} ${ay + ((k * 7) % 5)}`;
      wires.push(`<path d="${d}" class="rs-wire rs-wire--low"/>`);
    }
  });
  const birds = [
    `<circle cx="400" cy="${TOP + 22}" r="4.5" class="rs-bird rs-bird--y zap-hop"/>`,
    `<path d="M1195 ${TOP + 26} h10 l-5 -10 Z" class="rs-bird rs-bird--v zap-hop"/>`,
  ];
  return [...back, ...parts, ...poles, ...wires, ...birds].join('');
}
