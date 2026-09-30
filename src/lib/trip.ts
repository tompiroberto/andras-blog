/**
 * The travel animation shown before a route (or a country page) opens: a plane on a dashed arc, a
 * train on its rails, a car on the road, a hitchhiker being picked up, a walker, or a rocket in space.
 * Builds its own overlay inside `host` (styles: .trip-ov in global.css) and resolves when it is over.
 */
import { REDUCED_MOTION_QUERY } from './constants';

export type TripVehicle = 'plane' | 'train' | 'car' | 'hitch' | 'walk' | 'rocket';

const PLANE = `<svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`;
const CAR = `<svg viewBox="0 0 80 40" width="112" height="56"><path d="M6 28 V20 Q6 16 10 16 H22 L30 7 H54 L64 16 H72 Q76 16 76 20 V28 Z" fill="#FFD60A" stroke="#1b1b24" stroke-width="2.5" stroke-linejoin="round"/><path d="M32 10 H43 V16 H27Z M46 10 H53 L59 16 H46Z" fill="#cde8ff" stroke="#1b1b24" stroke-width="1.5"/><g class="trip-wheel"><circle cx="22" cy="30" r="6" fill="#1b1b24"/><path d="M19 30 H25" stroke="#ddd" stroke-width="1.6"/></g><g class="trip-wheel"><circle cx="60" cy="30" r="6" fill="#1b1b24"/><path d="M57 30 H63" stroke="#ddd" stroke-width="1.6"/></g></svg>`;
const HIKER = `<svg viewBox="0 0 40 60" width="48" height="72"><rect x="19" y="16" width="10" height="14" rx="3" fill="#FFD60A" stroke="#1b1b24" stroke-width="1.5"/><circle cx="18" cy="8" r="6" fill="#fff" stroke="#1b1b24" stroke-width="2"/><path d="M18 14 V36 M18 36 L11 56 M18 36 L25 56 M18 20 L8 28 M18 20 L30 14" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M30 14 L31 7" stroke="#FFD60A" stroke-width="4" stroke-linecap="round"/></svg>`;
const WALKER = `<svg viewBox="0 0 40 60" width="48" height="72"><rect x="8" y="16" width="10" height="14" rx="3" fill="#FFD60A" stroke="#1b1b24" stroke-width="1.5"/><circle cx="20" cy="8" r="6" fill="#fff" stroke="#1b1b24" stroke-width="2"/><g class="trip-legs"><path d="M20 14 V34 M20 34 L12 54 M20 34 L28 54 M20 20 L30 30 M20 20 L12 28" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none"/></g></svg>`;
const TRAIN = `<svg viewBox="0 0 220 50" width="330" height="75"><g stroke="#1b1b24" stroke-width="2" stroke-linejoin="round"><path d="M4 12 H58 Q70 12 74 26 V40 H4Z" fill="#d7263d"/><rect x="10" y="17" width="14" height="10" fill="#cde8ff"/><rect x="30" y="17" width="14" height="10" fill="#cde8ff"/><rect x="80" y="12" width="64" height="28" rx="3" fill="#7B2FF7"/><rect x="86" y="17" width="12" height="10" fill="#cde8ff"/><rect x="104" y="17" width="12" height="10" fill="#cde8ff"/><rect x="122" y="17" width="12" height="10" fill="#cde8ff"/><rect x="150" y="12" width="64" height="28" rx="3" fill="#FFD60A"/><rect x="156" y="17" width="12" height="10" fill="#cde8ff"/><rect x="174" y="17" width="12" height="10" fill="#cde8ff"/><rect x="192" y="17" width="12" height="10" fill="#cde8ff"/></g><g fill="#1b1b24"><circle cx="16" cy="43" r="5"/><circle cx="56" cy="43" r="5"/><circle cx="92" cy="43" r="5"/><circle cx="132" cy="43" r="5"/><circle cx="162" cy="43" r="5"/><circle cx="202" cy="43" r="5"/></g></svg>`;
const ROCKET = `<svg viewBox="0 0 40 80" width="52" height="104"><path class="trip-flame" d="M12 50 Q20 80 28 50Z" fill="#FFD60A"/><path d="M20 2 Q34 16 32 50 H8 Q6 16 20 2Z" fill="#fff" stroke="#1b1b24" stroke-width="2.5"/><circle cx="20" cy="26" r="6" fill="#7B2FF7" stroke="#1b1b24" stroke-width="2"/><path d="M8 38 L0 58 L9 51Z M32 38 L40 58 L31 51Z" fill="#d7263d" stroke="#1b1b24" stroke-width="2" stroke-linejoin="round"/></svg>`;

export function playTrip(host: HTMLElement, vehicle: TripVehicle, text: string): Promise<void> {
  if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return Promise.resolve();
  const ov = document.createElement('div');
  ov.className = `trip-ov trip-ov--${vehicle}`;
  ov.setAttribute('aria-hidden', 'true');
  ov.innerHTML = `<svg class="trip-arc" viewBox="0 0 1000 600" preserveAspectRatio="none"><path d="M-40 560 Q 420 40 1040 140"/></svg><div class="trip-road"></div><p class="trip-text"></p>`;
  ov.querySelector('.trip-text')!.textContent = text;
  host.append(ov);
  const W = host.clientWidth;
  const H = host.clientHeight;
  const actor = (html: string) => {
    const el = document.createElement('div');
    el.className = 'trip-actor';
    el.innerHTML = html;
    ov.append(el);
    return el;
  };
  let duration = 1600;
  const roadY = H * 0.72;
  const line = (el: HTMLElement, h: number, frames: [number, number][], opts: KeyframeAnimationOptions) =>
    el.animate(frames.map(([x, o]) => ({ transform: `translate(${x}px, ${roadY - h}px)`, offset: o })), opts);

  if (vehicle === 'plane') {
    const plane = actor(PLANE);
    const pts = Array.from({ length: 21 }, (_, i) => {
      const t = i / 20;
      const x = ((1 - t) ** 2 * -40 + 2 * (1 - t) * t * 420 + t * t * 1040) / 1000;
      const y = ((1 - t) ** 2 * 560 + 2 * (1 - t) * t * 40 + t * t * 140) / 600;
      return [x * W, y * H];
    });
    plane.animate(
      pts.map(([x, y], i) => {
        const [nx, ny] = pts[Math.min(i + 1, pts.length - 1)];
        const [px, py] = pts[Math.max(i - 1, 0)];
        const a = (Math.atan2(ny - py, nx - px) * 180) / Math.PI + 45;
        return { transform: `translate(${x - 23}px, ${y - 23}px) rotate(${a}deg)` };
      }),
      { duration, easing: 'ease-in-out', fill: 'both' },
    );
  } else if (vehicle === 'car') {
    line(actor(CAR), 50, [[-140, 0], [W + 40, 1]], { duration, easing: 'ease-in-out', fill: 'both' });
  } else if (vehicle === 'hitch') {
    duration = 2200;
    const hx = W * 0.55;
    const hiker = actor(HIKER);
    hiker.style.transform = `translate(${hx}px, ${roadY - 76}px)`;
    hiker.animate([{ opacity: 1 }, { opacity: 1, offset: 0.5 }, { opacity: 0, offset: 0.58 }, { opacity: 0 }], { duration, fill: 'both' });
    line(actor(CAR), 50, [[-140, 0], [hx - 120, 0.45], [hx - 110, 0.62], [W + 40, 1]], { duration, easing: 'ease-in-out', fill: 'both' });
  } else if (vehicle === 'train') {
    duration = 1900;
    ov.classList.add('has-rails');
    line(actor(TRAIN), 74, [[-360, 0], [W + 40, 1]], { duration, easing: 'cubic-bezier(0.5, 0, 0.5, 1)', fill: 'both' });
  } else if (vehicle === 'walk') {
    duration = 2000;
    line(actor(WALKER), 74, [[-60, 0], [W + 20, 1]], { duration, easing: 'linear', fill: 'both' });
  } else {
    duration = 1700;
    actor(ROCKET).animate(
      [
        { transform: `translate(${W * 0.12}px, ${H + 40}px) rotate(38deg)` },
        { transform: `translate(${W * 0.45}px, ${H * 0.55}px) rotate(38deg)`, offset: 0.4 },
        { transform: `translate(${W * 0.9}px, -160px) rotate(38deg)` },
      ],
      { duration, easing: 'ease-in', fill: 'both' },
    );
  }
  return new Promise((resolve) => {
    window.setTimeout(() => ov.classList.add('is-done'), duration - 150);
    window.setTimeout(() => {
      ov.remove();
      resolve();
    }, duration + 350);
  });
}
