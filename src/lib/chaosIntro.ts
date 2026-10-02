/**
 * The "destruction" played when switching to the Chaos theme: the screen shakes and cracks, then
 * every visible part of the page breaks loose and falls away. The world map and the city names in
 * the background stay (tinted in chaos colours). When it finishes the theme is applied and the
 * ChaosView plays its own entrance. All animations are cancelled afterwards, so leaving chaos later
 * shows the page untouched. Skipped entirely with prefers-reduced-motion.
 */
import { effectiveZoom } from './zoom';

const PIECES = [
  '.site-header .brand',
  '.nav-desktop li',
  '.nav-contact',
  '.nav-desktop .lang-switch',
  '.header-tools > *',
  '.chile',
  '.ribbon-switch--floating',
  'main .globe',
  'main .shape',
  'main h1',
  'main h2',
  'main h3',
  'main p',
  'main li',
  'main figure',
  'main img',
  'main .btn',
  'main .pill',
  'main .icon-circle',
  'main .card',
  'main .map-panel',
  'main .section-heading',
  'main .plans-board',
  'main .facts',
  '.powerlines',
  '.site-footer .globe',
  '.site-footer h2',
  '.site-footer li',
  '.supporters',
  '.site-footer__bottom > *',
].join(',');
const MAX_PIECES = 160;
const CHAOS_COLORS = ['#ff00c8', '#c6ff00', '#00f0ff', '#ff6b00', '#ffffff'];

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Visible elements to knock down; nested matches are dropped (the outer one falls as a whole). */
function collectPieces(): HTMLElement[] {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const candidates = Array.from(document.querySelectorAll<HTMLElement>(PIECES)).filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.bottom > -40 && r.top < vh + 40 && r.right > 0 && r.left < vw;
  });
  const set = new Set(candidates);
  return candidates
    .filter((el) => {
      for (let p = el.parentElement; p; p = p.parentElement) if (set.has(p as HTMLElement)) return false;
      return true;
    })
    .slice(0, MAX_PIECES);
}

/** Fixed overlay with neon flashes and jagged cracks radiating from the centre. */
function crackOverlay(): { el: HTMLElement; done: Promise<void> } {
  const el = document.createElement('div');
  el.setAttribute('aria-hidden', 'true');
  el.style.cssText = 'position:fixed;inset:0;z-index:650;pointer-events:none;overflow:hidden;';
  const W = window.innerWidth;
  const H = window.innerHeight;
  const cx = W / 2;
  const cy = H / 2;
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', String(W));
  svg.setAttribute('height', String(H));
  svg.style.cssText = 'position:absolute;inset:0;overflow:visible;';
  const cracks: SVGPathElement[] = [];
  const RAYS = 14;
  for (let i = 0; i < RAYS; i++) {
    const angle = (i / RAYS) * Math.PI * 2 + rand(-0.2, 0.2);
    let x = cx;
    let y = cy;
    let d = `M${x.toFixed(0)} ${y.toFixed(0)}`;
    const len = Math.hypot(W, H) * rand(0.35, 0.75);
    const steps = 7;
    for (let s = 1; s <= steps; s++) {
      const a = angle + rand(-0.45, 0.45);
      const seg = len / steps;
      x += Math.cos(a) * seg;
      y += Math.sin(a) * seg;
      d += ` L${x.toFixed(0)} ${y.toFixed(0)}`;
      // little side branches
      if (Math.random() < 0.35) {
        const b = a + rand(0.6, 1.2) * (Math.random() < 0.5 ? -1 : 1);
        d += ` M${x.toFixed(0)} ${y.toFixed(0)} l${(Math.cos(b) * seg * 0.6).toFixed(0)} ${(Math.sin(b) * seg * 0.6).toFixed(0)} M${x.toFixed(0)} ${y.toFixed(0)}`;
      }
    }
    for (const [stroke, width] of [
      ['#1b0033', 6],
      [CHAOS_COLORS[i % CHAOS_COLORS.length], 2.5],
    ] as const) {
      const p = document.createElementNS(ns, 'path');
      p.setAttribute('d', d);
      p.setAttribute('fill', 'none');
      p.setAttribute('stroke', stroke);
      p.setAttribute('stroke-width', String(width));
      p.setAttribute('stroke-linecap', 'round');
      p.setAttribute('stroke-linejoin', 'round');
      p.setAttribute('pathLength', '1');
      p.style.strokeDasharray = '1';
      p.style.strokeDashoffset = '1';
      svg.append(p);
      cracks.push(p);
    }
  }
  el.append(svg);
  document.body.append(el);

  const anims: Animation[] = [];
  // neon flashes
  anims.push(
    el.animate(
      CHAOS_COLORS.slice(0, 4).flatMap((c) => [
        { background: 'transparent' },
        { background: `${c}55` },
      ]),
      { duration: 520, easing: 'steps(8, jump-none)' },
    ),
  );
  // cracks shoot out
  cracks.forEach((p, i) =>
    anims.push(
      p.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
        duration: 320,
        delay: Math.floor(i / 2) * 22,
        easing: 'cubic-bezier(.2,.9,.3,1)',
        fill: 'forwards',
      }),
    ),
  );
  return { el, done: Promise.all(anims.map((a) => a.finished)).then(() => undefined) };
}

export async function playChaosIntro(): Promise<void> {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const html = document.documentElement;
  const pieces = collectPieces();
  const animations: Animation[] = [];

  html.classList.add('chaos-transition'); // tints the background map and cities in chaos colours

  // 1) impact: shake + flashes + cracks
  const shake = document.body.animate(
    [
      { transform: 'translate(0,0)' },
      { transform: 'translate(-9px,5px) rotate(-0.4deg)' },
      { transform: 'translate(8px,-6px) rotate(0.5deg)' },
      { transform: 'translate(-6px,-4px)' },
      { transform: 'translate(7px,6px) rotate(-0.3deg)' },
      { transform: 'translate(-4px,3px)' },
      { transform: 'translate(0,0)' },
    ],
    { duration: 480, easing: 'linear' },
  );
  const cracks = crackOverlay();
  await Promise.all([shake.finished.catch(() => {}), cracks.done.catch(() => {})]);
  animations.push(shake);

  // 2) collapse: every piece breaks loose and falls with gravity
  const vh = window.innerHeight;
  let longest = 0;
  for (const el of pieces) {
    const r = el.getBoundingClientRect();
    const z = effectiveZoom(el);
    const fall = (vh - r.top + r.height + rand(80, 400)) / z; // off the bottom of the screen
    const dx = rand(-220, 220) / z;
    const rot = rand(-120, 120);
    const lift = rand(8, 40) / z;
    // things near the top go first, like a building coming down
    const delay = Math.max(0, (r.top / vh) * 260 + rand(0, 420));
    const duration = rand(900, 1500);
    longest = Math.max(longest, delay + duration);
    animations.push(
      el.animate(
        [
          { transform: 'translate(0, 0) rotate(0deg)', offset: 0 },
          { transform: `translate(${(dx * 0.05).toFixed(1)}px, ${(-lift).toFixed(1)}px) rotate(${(rot * 0.06).toFixed(1)}deg)`, offset: 0.12 },
          { transform: `translate(${dx.toFixed(1)}px, ${fall.toFixed(1)}px) rotate(${rot.toFixed(1)}deg)`, offset: 1 },
        ],
        { duration, delay, easing: 'cubic-bezier(.55,0,.9,.45)', fill: 'forwards', composite: 'add' },
      ),
    );
  }
  cracks.el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, delay: 250, fill: 'forwards' });
  await wait(Math.min(longest, 2200));

  // 3) hand over to the chaos view (the caller applies the theme); clean up right after it is shown
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      animations.forEach((a) => a.cancel());
      cracks.el.remove();
      html.classList.remove('chaos-transition');
    }),
  );
}

/**
 * The way back: called right after the chaos theme is removed. The visible pieces of the page fly up
 * from below the screen and snap back into place (the destruction in reverse).
 */
export async function playChaosOutro(): Promise<void> {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const pieces = collectPieces();
  const vh = window.innerHeight;
  const animations: Animation[] = [];
  let longest = 0;
  for (const el of pieces) {
    const r = el.getBoundingClientRect();
    const z = effectiveZoom(el);
    const from = (vh - r.top + r.height + rand(60, 300)) / z;
    const dx = rand(-180, 180) / z;
    const rot = rand(-100, 100);
    // bottom pieces land first, the header last – the building goes back up
    const delay = Math.max(0, ((vh - r.top) / vh) * 220 + rand(0, 320));
    const duration = rand(650, 1000);
    longest = Math.max(longest, delay + duration);
    animations.push(
      el.animate(
        [
          { transform: `translate(${dx.toFixed(1)}px, ${from.toFixed(1)}px) rotate(${rot.toFixed(1)}deg)`, opacity: 0 },
          { transform: `translate(${(dx * 0.1).toFixed(1)}px, ${(-12 / z).toFixed(1)}px) rotate(${(rot * -0.04).toFixed(1)}deg)`, opacity: 1, offset: 0.8 },
          { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        ],
        { duration, delay, easing: 'cubic-bezier(.2,.8,.3,1)', fill: 'backwards', composite: 'add' },
      ),
    );
  }
  await wait(longest);
  animations.forEach((a) => a.cancel());
}
