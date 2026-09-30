/**
 * Electricity along the power lines: every wire (a `.spark` path with pathLength="1" drawn over it)
 * gets a bright pulse, starting at the clicked point and running outwards along the line.
 * Birds and other `.zap-hop` shapes jump while the current passes (the `.is-live` class).
 */
import { REDUCED_MOTION_QUERY } from './constants';

/** How fast the current travels along the line, screen px per second */
const SPEED = 1400;
/** How long one pulse takes to cross a wire, s */
const WIRE_TIME = 0.35;

export function zap(root: HTMLElement | SVGElement, clientX: number) {
  if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;
  let last = 0;
  root.querySelectorAll<SVGPathElement>('.spark').forEach((p) => {
    const r = p.getBoundingClientRect();
    // only what is on (or close to) the screen
    if (r.right < -innerWidth || r.left > innerWidth * 2 || !r.width) return;
    const mid = (r.left + r.right) / 2;
    const delay = Math.max(0, Math.abs(mid - clientX) - r.width / 2) / SPEED;
    last = Math.max(last, delay);
    p.classList.remove('is-zap');
    p.classList.toggle('is-rev', mid < clientX);
    p.style.setProperty('--zap-delay', `${delay.toFixed(3)}s`);
    p.style.setProperty('--zap-dur', `${WIRE_TIME}s`);
    void p.getBoundingClientRect(); // restart the animation
    p.classList.add('is-zap');
  });
  root.classList.remove('is-live');
  void root.getBoundingClientRect();
  root.classList.add('is-live');
  window.setTimeout(() => root.classList.remove('is-live'), (last + WIRE_TIME * 2) * 1000 + 200);
}
