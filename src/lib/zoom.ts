/**
 * Page zoom (the slider in the header) is CSS `zoom` on <html>: the whole page – background world
 * included – gets smaller or bigger. Zoomed out (level < 100 %, html.zoomed-out) the page keeps the
 * width of the screen at 100 % and floats in the middle; the empty space around it is outer space
 * with floating cows, aliens and Nutella jars (ZoomSpace.astro).
 *  --tz / --fill  kept at 1 (they used to keep text at its size while zooming out; the rules that use
 *                 them in global.css still work)
 *  --inv-zoom  1 / zoom: undoes the page zoom completely (the Chaos view always keeps one size).
 *
 * Screen measurements (getBoundingClientRect, mouse positions, scrollY, scrollHeight) are in zoomed
 * pixels; lengths we set are in the element's own CSS pixels. Convert with pageZoom() for elements
 * in the page, effectiveZoom(el) for counter-zoomed elements.
 */
export const ZOOM_MIN = 25;
export const ZOOM_MAX = 150;
export const ZOOM_STEP = 5;
export const DEFAULT_ZOOM = 90;

export const clampZoom = (level: number) =>
  Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(level / ZOOM_STEP) * ZOOM_STEP));

/** Custom-property values for a zoom level (the inline head script mirrors this formula). */
export function zoomVars(level: number) {
  const z = clampZoom(level) / 100;
  return { zoom: z, tz: 1, fill: 1, inv: 1 / z };
}

export function applyZoom(level: number) {
  const { zoom, tz, fill, inv } = zoomVars(level);
  const html = document.documentElement;
  html.style.zoom = String(zoom);
  html.style.setProperty('--tz', String(tz));
  html.style.setProperty('--fill', String(fill));
  html.style.setProperty('--inv-zoom', String(inv));
  html.classList.toggle('zoomed-out', zoom < 1);
}

export function pageZoom(): number {
  const html = document.documentElement as HTMLElement & { currentCSSZoom?: number };
  const z = html.currentCSSZoom ?? Number(getComputedStyle(html).zoom);
  return Number.isFinite(z) && z > 0 ? z : 1;
}

/** Zoom actually applied to an element (page zoom × any counter-zoom on it or its ancestors). */
export function effectiveZoom(el: Element): number {
  const z = (el as Element & { currentCSSZoom?: number }).currentCSSZoom;
  return typeof z === 'number' && z > 0 ? z : pageZoom();
}

/** The current counter-zoom factor (--tz). */
export function textZoom(): number {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tz'));
  return Number.isFinite(v) && v > 0 ? v : 1;
}
