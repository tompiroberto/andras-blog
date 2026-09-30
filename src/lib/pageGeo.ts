/**
 * The page's own coordinate system, shared by the coordinate grid, the background world layer and the
 * city search. Latitude runs down the whole document (90° N at the top … 90° S at the bottom).
 * Longitude uses the same scale (so continents keep their true proportions) and the screen is centred
 * on home – Budapest, 19.04° E – unless a city search has moved the centre (html[data-center-lon]).
 *
 * Horizontal page (html.horizontal): turned around – longitude runs along the whole document width
 * (the whole world, west to east) and the screen height shows a band of latitudes around Budapest.
 */
import { pageZoom } from './zoom';

export const HOME_LON = 19.04;
export const HOME_LAT = 47.5;

export const isHorizontal = () => document.documentElement.classList.contains('horizontal');

export interface PageGeo {
  /** pixels per degree (both axes) */
  k: number;
  lonAt: (x: number) => number;
  latAt: (docY: number) => number;
  xOf: (lon: number) => number;
  yOf: (lat: number) => number;
  lonMin: number;
  lonMax: number;
  /** latitudes at the top and the bottom of the page */
  latTop: number;
  latBottom: number;
}

/** Longitude at the centre of the screen: home, or the last searched city. */
export function centerLon(): number {
  const v = Number(document.documentElement.dataset.centerLon);
  return Number.isFinite(v) && document.documentElement.dataset.centerLon !== undefined ? v : HOME_LON;
}

export function pageGeo(width: number, docHeight: number, center = HOME_LON, horizontal = false): PageGeo {
  if (horizontal) {
    const k = Math.max(1, width) / 360;
    const lonAt = (x: number) => center + (x - width / 2) / k;
    const latAt = (y: number) => HOME_LAT - (y - docHeight / 2) / k;
    return {
      k,
      lonAt,
      latAt,
      xOf: (lon) => width / 2 + (lon - center) * k,
      yOf: (lat) => docHeight / 2 + (HOME_LAT - lat) * k,
      lonMin: lonAt(0),
      lonMax: lonAt(width),
      latTop: latAt(0),
      latBottom: latAt(docHeight),
    };
  }
  const k = Math.max(1, docHeight) / 180;
  const lonAt = (x: number) => center + (x - width / 2) / k;
  return {
    k,
    lonAt,
    latAt: (docY) => 90 - docY / k,
    xOf: (lon) => width / 2 + (lon - center) * k,
    yOf: (lat) => (90 - lat) * k,
    lonMin: lonAt(0),
    lonMax: lonAt(width),
    latTop: 90,
    latBottom: -90,
  };
}

/** The coordinate system for the page as it is now (size, centre, direction). */
export const currentGeo = () => {
  const { width, height } = pageSize();
  return pageGeo(width, height, centerLon(), isHorizontal());
};

/** Current page size in CSS pixels (the units both layers are laid out in), whatever the page zoom. */
export const pageSize = () => {
  const z = pageZoom();
  return {
    width: (isHorizontal() ? document.documentElement.scrollWidth : document.body.getBoundingClientRect().width) / z,
    height: (isHorizontal() ? document.documentElement.clientHeight : document.documentElement.scrollHeight) / z,
  };
};
