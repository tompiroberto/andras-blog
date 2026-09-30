/**
 * Build-time geometry for the scrollbar ribbons: countries (from world-atlas, like the map), rivers
 * (Natural Earth centrelines in src/data/rivers.json), lakes (src/data/lakes.json) and three places in
 * space (src/lib/bodies.ts). Each shape is stretched into a tall, thin ribbon: latitude maps linearly
 * to y, longitude to a narrow fixed band – or, for west–east shapes (axis: 'lon'), turned on its side:
 * west at the top, north on the right.
 * Top of the page = the first city, bottom = the last one.
 */
import fs from 'node:fs';
import path from 'node:path';
import { feature } from 'topojson-client';
import { geoPath, geoTransform } from 'd3-geo';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Feature, MultiPolygon, Polygon, Position } from 'geojson';
import chileCities from '../data/chile-cities.json';
import argentinaCities from '../data/argentina-cities.json';
import ribbonCities from '../data/ribbon-cities.json';
import rivers from '../data/rivers.json';
import lakes from '../data/lakes.json';
import { BODIES, type BodyId } from './bodies';
import type { TKey } from '../i18n';

/** ViewBox of every ribbon (stretched non-uniformly by the container). */
export const VB_W = 56;
export const VB_H = 1000;

interface City {
  name: string;
  lat: number;
  lon: number;
}

type Shape =
  | { kind: 'country'; atlasId: string; keep?: (ring: Position[]) => boolean }
  | { kind: 'river'; river: keyof typeof rivers }
  | { kind: 'lake'; lake: keyof typeof lakes }
  | { kind: 'body'; body: BodyId };

interface RibbonDef {
  id: string;
  continent: (typeof CONTINENTS)[number];
  /** 'lon': turned on its side for west–east shapes (west at the top) */
  axis?: 'lon';
  nameKey: TKey;
  shape: Shape;
  /** Geographic frame of the ribbon */
  latTop: number;
  latBottom: number;
  lonWest: number;
  lonEast: number;
  /** On-screen width of the desktop ribbon, px */
  width: number;
  cities: City[];
}

export const CONTINENTS = ['southAmerica', 'europe', 'africa', 'northAmerica', 'asia', 'oceania', 'rivers', 'lakes', 'space'] as const;

const everyPoint = (test: (lon: number, lat: number) => boolean) => (ring: Position[]) => ring.every(([lon, lat]) => test(lon, lat));

/** In the order shown in the switch (grouped by continent). */
export const RIBBONS: RibbonDef[] = [
  {
    id: 'chile',
    continent: 'southAmerica',
    nameKey: 'country.chile',
    // Mainland only: no Easter Island / Juan Fernández (west of −80°)
    shape: { kind: 'country', atlasId: '152', keep: everyPoint((lon) => lon > -80) },
    latTop: -17.4,
    latBottom: -56.1,
    lonWest: -75.8,
    lonEast: -66.3,
    width: 56,
    cities: chileCities.cities,
  },
  {
    id: 'argentina',
    continent: 'southAmerica',
    nameKey: 'country.argentina',
    shape: { kind: 'country', atlasId: '032' },
    latTop: -21.6,
    latBottom: -55.2,
    lonWest: -73.8,
    lonEast: -53.4,
    width: 84,
    cities: argentinaCities.cities,
  },
  {
    id: 'brazil',
    continent: 'southAmerica',
    nameKey: 'country.brazil',
    // Mainland only: no Fernando de Noronha or Trindade far out in the Atlantic
    shape: { kind: 'country', atlasId: '076', keep: everyPoint((lon) => lon < -33) },
    latTop: 5.5,
    latBottom: -34.0,
    lonWest: -74.2,
    lonEast: -34.6,
    width: 90,
    cities: ribbonCities.brazil,
  },
  {
    id: 'hungary',
    continent: 'europe',
    nameKey: 'country.hungary',
    shape: { kind: 'country', atlasId: '348' },
    latTop: 48.65,
    latBottom: 45.7,
    lonWest: 16.0,
    lonEast: 23.0,
    width: 70,
    cities: ribbonCities.hungary,
  },
  {
    id: 'georgia',
    continent: 'europe',
    nameKey: 'country.georgia',
    shape: { kind: 'country', atlasId: '268' },
    latTop: 43.65,
    latBottom: 41.0,
    lonWest: 39.9,
    lonEast: 46.8,
    width: 70,
    cities: ribbonCities.georgia,
  },
  {
    id: 'sweden',
    continent: 'europe',
    nameKey: 'country.sweden',
    shape: { kind: 'country', atlasId: '752' },
    latTop: 69.2,
    latBottom: 55.2,
    lonWest: 10.9,
    lonEast: 24.3,
    width: 60,
    cities: ribbonCities.sweden,
  },
  {
    id: 'norway',
    continent: 'europe',
    nameKey: 'country.norway',
    // Mainland and coastal islands only: no Svalbard, Jan Mayen or Bouvet Island
    shape: { kind: 'country', atlasId: '578', keep: everyPoint((lon, lat) => lat < 72 && lat > 50 && lon > 4) },
    latTop: 71.3,
    latBottom: 57.8,
    lonWest: 4.6,
    lonEast: 31.2,
    width: 80,
    cities: ribbonCities.norway,
  },
  {
    id: 'portugal',
    continent: 'europe',
    nameKey: 'country.portugal',
    // Mainland only: no Azores or Madeira (west of −10°)
    shape: { kind: 'country', atlasId: '620', keep: everyPoint((lon) => lon > -10) },
    latTop: 42.2,
    latBottom: 36.9,
    lonWest: -9.6,
    lonEast: -6.1,
    width: 56,
    cities: ribbonCities.portugal,
  },
  {
    id: 'mozambique',
    continent: 'africa',
    nameKey: 'country.mozambique',
    shape: { kind: 'country', atlasId: '508' },
    latTop: -10.3,
    latBottom: -27.0,
    lonWest: 30.1,
    lonEast: 40.9,
    width: 72,
    cities: ribbonCities.mozambique,
  },
  {
    id: 'nile',
    continent: 'rivers',
    nameKey: 'river.nile',
    shape: { kind: 'river', river: 'nile' },
    latTop: 30.6,
    latBottom: 0.1,
    lonWest: 29.8,
    lonEast: 34.4,
    width: 44,
    cities: ribbonCities.nile,
  },
  {
    id: 'mississippi',
    continent: 'rivers',
    nameKey: 'river.mississippi',
    shape: { kind: 'river', river: 'mississippi' },
    latTop: 47.8,
    latBottom: 28.7,
    lonWest: -95.4,
    lonEast: -88.7,
    width: 44,
    cities: ribbonCities.mississippi,
  },
  {
    id: 'mexico',
    continent: 'northAmerica',
    nameKey: 'country.mexico',
    // No Guadalupe Island far out in the Pacific
    shape: { kind: 'country', atlasId: '484', keep: everyPoint((lon) => lon > -117.3) },
    latTop: 32.9,
    latBottom: 14.3,
    lonWest: -117.3,
    lonEast: -86.6,
    width: 110,
    cities: ribbonCities.mexico,
  },
  {
    id: 'japan',
    continent: 'asia',
    nameKey: 'country.japan',
    // The four main islands and their neighbours; no Ryukyu Islands (south of 30°)
    shape: { kind: 'country', atlasId: '392', keep: everyPoint((_, lat) => lat > 30) },
    latTop: 45.7,
    latBottom: 30.8,
    lonWest: 129.4,
    lonEast: 146.0,
    width: 80,
    cities: ribbonCities.japan,
  },
  {
    id: 'vietnam',
    continent: 'asia',
    nameKey: 'country.vietnam',
    shape: { kind: 'country', atlasId: '704' },
    latTop: 23.5,
    latBottom: 8.4,
    lonWest: 102.0,
    lonEast: 109.6,
    width: 60,
    cities: ribbonCities.vietnam,
  },
  {
    id: 'newzealand',
    continent: 'oceania',
    nameKey: 'country.newzealand',
    // North, South and Stewart Island; no Chatham or sub-Antarctic islands
    shape: { kind: 'country', atlasId: '554', keep: everyPoint((lon, lat) => lon > 165 && lon < 179 && lat > -48) },
    latTop: -34.2,
    latBottom: -47.5,
    lonWest: 166.3,
    lonEast: 178.7,
    width: 76,
    cities: ribbonCities.newzealand,
  },
  {
    id: 'peru',
    continent: 'southAmerica',
    nameKey: 'country.peru',
    shape: { kind: 'country', atlasId: '604' },
    latTop: 0,
    latBottom: -18.4,
    lonWest: -81.4,
    lonEast: -68.6,
    width: 70,
    cities: ribbonCities.peru,
  },
  {
    id: 'colombia',
    continent: 'southAmerica',
    nameKey: 'country.colombia',
    // No San Andrés far out in the Caribbean
    shape: { kind: 'country', atlasId: '170', keep: everyPoint((lon) => lon > -80) },
    latTop: 12.5,
    latBottom: -4.3,
    lonWest: -79.1,
    lonEast: -66.8,
    width: 80,
    cities: ribbonCities.colombia,
  },
  {
    id: 'bolivia',
    continent: 'southAmerica',
    nameKey: 'country.bolivia',
    shape: { kind: 'country', atlasId: '068' },
    latTop: -9.6,
    latBottom: -22.9,
    lonWest: -69.7,
    lonEast: -57.4,
    width: 80,
    cities: ribbonCities.bolivia,
  },
  {
    id: 'italy',
    continent: 'europe',
    nameKey: 'country.italy',
    shape: { kind: 'country', atlasId: '380' },
    latTop: 47.1,
    latBottom: 36.6,
    lonWest: 6.6,
    lonEast: 18.6,
    width: 70,
    cities: ribbonCities.italy,
  },
  {
    id: 'greece',
    continent: 'europe',
    nameKey: 'country.greece',
    shape: { kind: 'country', atlasId: '300' },
    latTop: 41.8,
    latBottom: 34.8,
    lonWest: 19.3,
    lonEast: 28.3,
    width: 76,
    cities: ribbonCities.greece,
  },
  {
    id: 'finland',
    continent: 'europe',
    nameKey: 'country.finland',
    shape: { kind: 'country', atlasId: '246' },
    latTop: 70.1,
    latBottom: 59.7,
    lonWest: 19.5,
    lonEast: 31.6,
    width: 60,
    cities: ribbonCities.finland,
  },
  {
    id: 'egypt',
    continent: 'africa',
    nameKey: 'country.egypt',
    shape: { kind: 'country', atlasId: '818' },
    latTop: 31.7,
    latBottom: 21.9,
    lonWest: 24.7,
    lonEast: 36.9,
    width: 70,
    cities: ribbonCities.egypt,
  },
  {
    id: 'madagascar',
    continent: 'africa',
    nameKey: 'country.madagascar',
    shape: { kind: 'country', atlasId: '450' },
    latTop: -11.9,
    latBottom: -25.7,
    lonWest: 43.1,
    lonEast: 50.6,
    width: 56,
    cities: ribbonCities.madagascar,
  },
  {
    id: 'southafrica',
    continent: 'africa',
    nameKey: 'country.southafrica',
    // No Prince Edward Islands
    shape: { kind: 'country', atlasId: '710', keep: everyPoint((_, lat) => lat > -36) },
    latTop: -22.1,
    latBottom: -34.9,
    lonWest: 16.4,
    lonEast: 32.9,
    width: 86,
    cities: ribbonCities.southafrica,
  },
  {
    id: 'usa',
    continent: 'northAmerica',
    nameKey: 'country.usa',
    // The 48 contiguous states
    shape: { kind: 'country', atlasId: '840', keep: everyPoint((lon, lat) => lon > -125 && lon < -66 && lat > 24 && lat < 50) },
    latTop: 49.4,
    latBottom: 24.4,
    lonWest: -124.8,
    lonEast: -66.9,
    width: 110,
    cities: ribbonCities.usa,
  },
  {
    id: 'canada',
    continent: 'northAmerica',
    nameKey: 'country.canada',
    // Without the high Arctic islands
    shape: { kind: 'country', atlasId: '124', keep: everyPoint((_, lat) => lat < 72) },
    latTop: 70,
    latBottom: 41.7,
    lonWest: -141,
    lonEast: -52.6,
    width: 120,
    cities: ribbonCities.canada,
  },
  {
    id: 'cuba',
    continent: 'northAmerica',
    nameKey: 'country.cuba',
    // Long and thin from west to east: on its side
    axis: 'lon',
    shape: { kind: 'country', atlasId: '192' },
    latTop: 23.3,
    latBottom: 19.8,
    lonWest: -85,
    lonEast: -74.1,
    width: 56,
    cities: ribbonCities.cuba,
  },
  {
    id: 'india',
    continent: 'asia',
    nameKey: 'country.india',
    // No Andaman and Nicobar Islands
    shape: { kind: 'country', atlasId: '356', keep: everyPoint((lon, lat) => lon <= 91.5 || lat >= 15) },
    latTop: 35.5,
    latBottom: 6.7,
    lonWest: 68.1,
    lonEast: 97.4,
    width: 90,
    cities: ribbonCities.india,
  },
  {
    id: 'southkorea',
    continent: 'asia',
    nameKey: 'country.southkorea',
    shape: { kind: 'country', atlasId: '410', keep: everyPoint((lon) => lon < 130.5) },
    latTop: 38.7,
    latBottom: 33.1,
    lonWest: 124.6,
    lonEast: 130.5,
    width: 60,
    cities: ribbonCities.southkorea,
  },
  {
    id: 'thailand',
    continent: 'asia',
    nameKey: 'country.thailand',
    shape: { kind: 'country', atlasId: '764' },
    latTop: 20.5,
    latBottom: 5.6,
    lonWest: 97.3,
    lonEast: 105.7,
    width: 60,
    cities: ribbonCities.thailand,
  },
  {
    id: 'australia',
    continent: 'oceania',
    nameKey: 'country.australia',
    shape: { kind: 'country', atlasId: '036', keep: everyPoint((lon, lat) => lat > -44.5 && lon > 112 && lon < 154) },
    latTop: -10.6,
    latBottom: -43.7,
    lonWest: 113,
    lonEast: 153.7,
    width: 110,
    cities: ribbonCities.australia,
  },
  {
    id: 'png',
    continent: 'oceania',
    nameKey: 'country.png',
    shape: { kind: 'country', atlasId: '598' },
    latTop: -1.0,
    latBottom: -11.7,
    lonWest: 140.8,
    lonEast: 156.0,
    width: 90,
    cities: ribbonCities.png,
  },
  {
    id: 'vanuatu',
    continent: 'oceania',
    nameKey: 'country.vanuatu',
    shape: { kind: 'country', atlasId: '548' },
    latTop: -13.0,
    latBottom: -20.3,
    lonWest: 166.5,
    lonEast: 170.3,
    width: 44,
    cities: ribbonCities.vanuatu,
  },
  {
    id: 'amazon',
    continent: 'rivers',
    nameKey: 'river.amazon',
    // From the Peruvian Andes (top) to the Atlantic
    axis: 'lon',
    shape: { kind: 'river', river: 'amazon' },
    latTop: 1,
    latBottom: -15.5,
    lonWest: -78.8,
    lonEast: -52.4,
    width: 60,
    cities: ribbonCities.amazon,
  },
  {
    id: 'yangtze',
    continent: 'rivers',
    nameKey: 'river.yangtze',
    axis: 'lon',
    shape: { kind: 'river', river: 'yangtze' },
    latTop: 33.5,
    latBottom: 25.5,
    lonWest: 98,
    lonEast: 122,
    width: 60,
    cities: ribbonCities.yangtze,
  },
  {
    id: 'huanghe',
    continent: 'rivers',
    nameKey: 'river.huanghe',
    axis: 'lon',
    shape: { kind: 'river', river: 'huanghe' },
    latTop: 41.5,
    latBottom: 32.5,
    lonWest: 95.5,
    lonEast: 119.5,
    width: 70,
    cities: ribbonCities.huanghe,
  },
  {
    id: 'yenisei',
    continent: 'rivers',
    nameKey: 'river.yenisei',
    shape: { kind: 'river', river: 'yenisei' },
    latTop: 70.5,
    latBottom: 50.8,
    lonWest: 83,
    lonEast: 99,
    width: 44,
    cities: ribbonCities.yenisei,
  },
  {
    id: 'congo',
    continent: 'rivers',
    nameKey: 'river.congo',
    shape: { kind: 'river', river: 'congo' },
    latTop: 2.6,
    latBottom: -12,
    lonWest: 12,
    lonEast: 30,
    width: 70,
    cities: ribbonCities.congo,
  },
  {
    id: 'caspian',
    continent: 'lakes',
    nameKey: 'lake.caspian',
    shape: { kind: 'lake', lake: 'caspian' },
    latTop: 47.2,
    latBottom: 36.5,
    lonWest: 46.6,
    lonEast: 54.9,
    width: 56,
    cities: ribbonCities.caspian,
  },
  {
    id: 'superior',
    continent: 'lakes',
    nameKey: 'lake.superior',
    axis: 'lon',
    shape: { kind: 'lake', lake: 'superior' },
    latTop: 49.1,
    latBottom: 46.3,
    lonWest: -92.3,
    lonEast: -84.2,
    width: 56,
    cities: ribbonCities.superior,
  },
  {
    id: 'victoria',
    continent: 'lakes',
    nameKey: 'lake.victoria',
    shape: { kind: 'lake', lake: 'victoria' },
    latTop: 0.6,
    latBottom: -3.1,
    lonWest: 31.4,
    lonEast: 34.95,
    width: 70,
    cities: ribbonCities.victoria,
  },
  {
    id: 'baikal',
    continent: 'lakes',
    nameKey: 'lake.baikal',
    shape: { kind: 'lake', lake: 'baikal' },
    latTop: 55.95,
    latBottom: 51.4,
    lonWest: 103.6,
    lonEast: 110,
    width: 56,
    cities: ribbonCities.baikal,
  },
  {
    id: 'tanganyika',
    continent: 'lakes',
    nameKey: 'lake.tanganyika',
    shape: { kind: 'lake', lake: 'tanganyika' },
    latTop: -3.2,
    latBottom: -8.9,
    lonWest: 29,
    lonEast: 31.3,
    width: 44,
    cities: ribbonCities.tanganyika,
  },
  {
    id: 'moon',
    continent: 'space',
    nameKey: 'space.moon',
    shape: { kind: 'body', body: 'moon' },
    latTop: 90,
    latBottom: -90,
    lonWest: -180,
    lonEast: 180,
    width: 90,
    cities: [],
  },
  {
    id: 'mars',
    continent: 'space',
    nameKey: 'space.mars',
    shape: { kind: 'body', body: 'mars' },
    latTop: 90,
    latBottom: -90,
    lonWest: -180,
    lonEast: 180,
    width: 90,
    cities: [],
  },
  {
    id: 'solar',
    continent: 'space',
    nameKey: 'space.solar',
    shape: { kind: 'body', body: 'solar' },
    latTop: 90,
    latBottom: -90,
    lonWest: -180,
    lonEast: 180,
    width: 56,
    cities: [],
  },
];

export type RibbonId = string;
export const DEFAULT_RIBBON = 'chile';

/** Along the ribbon (0 … VB_H) */
const yOf = (r: RibbonDef, lat: number, lon: number) =>
  r.axis === 'lon' ? ((lon - r.lonWest) / (r.lonEast - r.lonWest)) * VB_H : ((r.latTop - lat) / (r.latTop - r.latBottom)) * VB_H;
/** Across the ribbon (0 … VB_W) */
const xOf = (r: RibbonDef, lat: number, lon: number) =>
  r.axis === 'lon' ? ((lat - r.latBottom) / (r.latTop - r.latBottom)) * VB_W : ((lon - r.lonWest) / (r.lonEast - r.lonWest)) * VB_W;
const round = (d: string) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10));

let topology: Topology<{ countries: GeometryCollection }> | undefined;

function ribbonPath(r: RibbonDef): string {
  const stretch = geoTransform({
    point(lon, lat) {
      this.stream.point(xOf(r, lat, lon), yOf(r, lat, lon));
    },
  });
  const draw = geoPath(stretch);
  if (r.shape.kind === 'river') {
    return round(draw({ type: 'MultiLineString', coordinates: rivers[r.shape.river] as unknown as Position[][] }) ?? '');
  }
  if (r.shape.kind === 'lake') {
    return round(draw({ type: 'MultiPolygon', coordinates: lakes[r.shape.lake] as unknown as Position[][][] }) ?? '');
  }
  if (r.shape.kind === 'body') return BODIES[r.shape.body].d;
  const { atlasId, keep } = r.shape;
  topology ??= JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'public/data/countries-50m.json'), 'utf8'));
  const topo = topology!;
  const shape = feature(topo, topo.objects.countries).features.find((f) => String(f.id) === atlasId) as Feature<Polygon | MultiPolygon> | undefined;
  if (!shape) throw new Error(`[ribbon] Feature ${atlasId} not found in countries-50m.json`);
  const polygons: Position[][][] = shape.geometry.type === 'Polygon' ? [shape.geometry.coordinates] : shape.geometry.coordinates;
  return round(draw({ type: 'MultiPolygon', coordinates: keep ? polygons.filter((p) => keep(p[0])) : polygons }) ?? '');
}

export interface RibbonCity {
  name: string;
  /** translated name (the planets) */
  key?: TKey;
  lat: number;
  lon: number;
  /** share of the page scroll: 0 = first city (top), 1 = last city (bottom) */
  position: number;
  /** % from the top / left of the ribbon */
  y: number;
  x: number;
}

export interface BuiltRibbon {
  id: string;
  continent: RibbonDef['continent'];
  nameKey: TKey;
  kind: Shape['kind'];
  d: string;
  width: number;
  /** True width ÷ height of the ribbon's frame (longitude shrunk by cos(latitude)), for the undistorted mode */
  aspect: number;
  cities: RibbonCity[];
  /** Where the scroll track starts and ends on the ribbon, % of its height */
  track: { top: number; bottom: number };
  /** extra drawing between the shape and the progress fill (the Moon's seas, the planets' colours) */
  decor: string;
  /** not on Earth: no map facts, no travel by road */
  space: boolean;
}

let built: BuiltRibbon[] | undefined;

export function getRibbons(): BuiltRibbon[] {
  built ??= RIBBONS.map((r) => {
    const base = { id: r.id, continent: r.continent, nameKey: r.nameKey, kind: r.shape.kind, d: ribbonPath(r), width: r.width };
    if (r.shape.kind === 'body') {
      const body = BODIES[r.shape.body];
      const first = body.cities[0].y;
      const last = body.cities[body.cities.length - 1].y;
      return {
        ...base,
        aspect: body.aspect,
        decor: body.decor,
        space: true,
        cities: body.cities.map((c) => ({ ...c, position: Math.round(((c.y - first) / (last - first)) * 1000) / 1000 })),
        track: { top: first, bottom: last },
      };
    }
    const ys = r.cities.map((c) => yOf(r, c.lat, c.lon));
    const first = ys[0];
    const last = ys[ys.length - 1];
    const spanLat = r.latTop - r.latBottom;
    const spanLon = (r.lonEast - r.lonWest) * Math.cos((((r.latTop + r.latBottom) / 2) * Math.PI) / 180);
    return {
      ...base,
      aspect: Math.round((r.axis === 'lon' ? spanLat / spanLon : spanLon / spanLat) * 1000) / 1000,
      decor: '',
      space: false,
      cities: r.cities.map((c, i) => ({
        name: c.name,
        lat: c.lat,
        lon: c.lon,
        // Chile's file has precomputed positions; the others follow their place on the ribbon
        position: 'position' in c && typeof c.position === 'number' ? c.position : Math.round(((ys[i] - first) / (last - first)) * 1000) / 1000,
        y: (ys[i] / VB_H) * 100,
        x: (xOf(r, c.lat, c.lon) / VB_W) * 100,
      })),
      track: { top: (first / VB_H) * 100, bottom: (last / VB_H) * 100 },
    };
  });
  return built;
}

/** Desktop ribbon widths by id (used before first paint to reserve the right space). */
export const RIBBON_WIDTHS: Record<string, number> = Object.fromEntries(RIBBONS.map((r) => [r.id, r.width]));
