/**
 * Rough journey planner for map mode's "distance from me": by plane (a small network of real hub and
 * regional airports, shortest route with a penalty per flight), by train or bus (only within connected
 * rail networks / landmasses) or on foot. Times are estimates, not timetables.
 */
import { distanceKm } from './myLocation';
import { continentOf } from './continents';

export type Mode = 'plane' | 'train' | 'bus' | 'car' | 'hitch' | 'walk';

export interface Leg {
  kind: 'air' | 'ground';
  from: { name: string; lat: number; lon: number };
  to: { name: string; lat: number; lon: number };
  km: number;
  hours: number;
}

export interface Plan {
  mode: Mode;
  legs: Leg[];
  /** total door-to-door estimate in hours (including airports and changes) */
  hours: number;
  /** no way to do it like this: which joke to show */
  joke?: 'water' | 'noRail' | 'noRoad' | 'here';
}

type Airport = [name: string, lat: number, lon: number, major: 0 | 1];
// big hubs (1) fly anywhere in range; regional airports (0) only to airports within 3500 km
const AIRPORTS: Airport[] = [
  ['London', 51.47, -0.45, 1], ['Paris', 49.01, 2.55, 1], ['Frankfurt', 50.04, 8.56, 1], ['Amsterdam', 52.31, 4.76, 1],
  ['Madrid', 40.49, -3.57, 1], ['Istanbul', 41.26, 28.74, 1], ['Dubai', 25.25, 55.36, 1], ['Doha', 25.27, 51.61, 1],
  ['Moscow', 55.97, 37.41, 0], ['Cairo', 30.12, 31.41, 1], ['Addis Ababa', 8.98, 38.8, 1], ['Johannesburg', -26.14, 28.24, 1],
  ['Nairobi', -1.32, 36.93, 1], ['Lagos', 6.58, 3.32, 1], ['Casablanca', 33.37, -7.59, 0], ['New York', 40.64, -73.78, 1],
  ['Atlanta', 33.64, -84.43, 1], ['Chicago', 41.97, -87.9, 1], ['Los Angeles', 33.94, -118.41, 1], ['Miami', 25.79, -80.29, 1],
  ['Toronto', 43.68, -79.63, 1], ['Mexico City', 19.44, -99.07, 1], ['Panama City', 9.07, -79.38, 1], ['Bogotá', 4.7, -74.15, 1],
  ['Lima', -12.02, -77.11, 1], ['São Paulo', -23.43, -46.47, 1], ['Santiago', -33.39, -70.79, 1], ['Buenos Aires', -34.82, -58.54, 1],
  ['Delhi', 28.56, 77.1, 1], ['Mumbai', 19.09, 72.87, 1], ['Bangkok', 13.69, 100.75, 1], ['Singapore', 1.36, 103.99, 1],
  ['Hong Kong', 22.31, 113.91, 1], ['Beijing', 40.08, 116.58, 1], ['Shanghai', 31.14, 121.81, 1], ['Tokyo', 35.55, 139.78, 1],
  ['Seoul', 37.46, 126.44, 1], ['Sydney', -33.94, 151.18, 1], ['Auckland', -37.01, 174.79, 1], ['Honolulu', 21.32, -157.92, 1],
  ['Helsinki', 60.32, 24.96, 1], ['Almaty', 43.35, 77.04, 1],
  ['Budapest', 47.44, 19.26, 0], ['Vienna', 48.11, 16.57, 0], ['Athens', 37.94, 23.94, 0], ['Tbilisi', 41.67, 44.95, 0],
  ['Lisbon', 38.77, -9.13, 0], ['Rome', 41.8, 12.25, 0], ['Warsaw', 52.17, 20.97, 0], ['Stockholm', 59.65, 17.92, 0],
  ['Oslo', 60.19, 11.1, 0], ['Bucharest', 44.57, 26.08, 0], ['Vilnius', 54.63, 25.28, 0], ['Reykjavík', 63.99, -22.62, 0],
  ['Maputo', -25.92, 32.57, 0], ['Cape Town', -33.97, 18.6, 0], ['Hanoi', 21.22, 105.81, 0], ['Kathmandu', 27.7, 85.36, 0],
  ['Denver', 39.86, -104.67, 0], ['Vancouver', 49.19, -123.18, 0], ['Anchorage', 61.17, -150.0, 0], ['Perth', -31.94, 115.97, 0],
  ['Manaus', -3.04, -60.05, 0], ['Punta Arenas', -53.0, -70.85, 0], ['Ushuaia', -54.84, -68.3, 0], ['Ulaanbaatar', 47.65, 106.82, 0],
  ['Munich', 48.35, 11.79, 0], ['Zurich', 47.46, 8.55, 0], ['Milan', 45.63, 8.72, 0], ['Barcelona', 41.3, 2.08, 0],
  ['Berlin', 52.36, 13.5, 0], ['Copenhagen', 55.62, 12.65, 0], ['Prague', 50.1, 14.26, 0], ['Belgrade', 44.82, 20.29, 0],
  ['Kyiv', 50.34, 30.89, 0], ['Dublin', 53.42, -6.27, 0], ['Nice', 43.66, 7.21, 0], ['Split', 43.54, 16.3, 0],
  ['Christchurch', -43.49, 172.53, 0], ['Cusco', -13.54, -71.94, 0], ['Marrakesh', 31.6, -8.04, 0], ['Dakar', 14.74, -17.49, 0],
];
const REGIONAL_RANGE = 3500;
const LONG_RANGE = 13500;
const LEG_PENALTY_KM = 900; // one more flight feels like this many extra km
const CRUISE = 820; // km/h

// ---- which network / landmass a country belongs to (world-atlas numeric ids) ----
const RAIL: Record<string, string[]> = {
  eurasia: ['008', '040', '056', '070', '100', '112', '191', '203', '208', '233', '246', '250', '276', '300', '348', '380', '428', '440', '442', '498', '499', '528', '807', '578', '616', '620', '642', '643', '688', '703', '705', '724', '752', '756', '804', '826', '792', '268', '051', '031', '398', '860', '417', '762', '795', '496', '156', '704', '418', '764', '458', '364'],
  southasia: ['356', '586', '050', '524'],
  northam: ['840', '124'],
  japan: ['392'],
  korea: ['410'],
  australia: ['036'],
  maghreb: ['012', '504', '788'],
  egypt: ['818'],
  southafrica: ['710'],
};
const railOf = Object.fromEntries(Object.entries(RAIL).flatMap(([net, ids]) => ids.map((id) => [id, net])));
/** islands (no road to the mainland) */
const ISLANDS: Record<string, string> = {
  '392': 'japan', '352': 'iceland', '144': 'srilanka', '360': 'indonesia', '608': 'philippines', '450': 'madagascar', '554': 'nz',
  '158': 'taiwan', '192': 'cuba', '332': 'hispaniola', '214': 'hispaniola', '388': 'jamaica', '598': 'newguinea', '242': 'fiji',
  '090': 'solomon', '548': 'vanuatu', '304': 'greenland', '010': 'antarctica', '626': 'timor', '196': 'cyprus', '540': 'newcaledonia',
  '780': 'trinidad', '044': 'bahamas', '238': 'falklands', '036': 'australia',
};
const NORTH_AMERICA = new Set(['591', '188', '558', '340', '222', '320', '084', '484']);

export function landOf(countryId: string | null, lat: number, lon: number): string {
  if (!countryId) return 'water';
  if (ISLANDS[countryId]) return ISLANDS[countryId];
  if (NORTH_AMERICA.has(countryId)) return 'northam';
  const c = continentOf('', lat, lon);
  if (c === 'europe' || c === 'africa' || c === 'asia') return 'afroeurasia';
  if (c === 'northAmerica') return 'northam';
  if (c === 'southAmerica') return 'southam';
  return `land-${countryId}`;
}

type Place = { name: string; lat: number; lon: number; country: string | null };
const km = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) => distanceKm(a.lat, a.lon, b.lat, b.lon);
const groundHours = (d: number, speed: number) => (d * 1.25) / speed;

function nearestAirport(p: { lat: number; lon: number }) {
  let best = 0;
  let bd = Infinity;
  AIRPORTS.forEach((a, i) => {
    const d = distanceKm(p.lat, p.lon, a[1], a[2]);
    if (d < bd) {
      bd = d;
      best = i;
    }
  });
  return { i: best, km: bd };
}

function flights(fromI: number, toI: number): number[] {
  // Dijkstra over the airport network
  const n = AIRPORTS.length;
  const dist = Array(n).fill(Infinity);
  const prev: number[] = Array(n).fill(-1);
  const done = Array(n).fill(false);
  dist[fromI] = 0;
  for (;;) {
    let u = -1;
    for (let i = 0; i < n; i++) if (!done[i] && (u < 0 || dist[i] < dist[u])) u = i;
    if (u < 0 || dist[u] === Infinity) break;
    if (u === toI) break;
    done[u] = true;
    for (let v = 0; v < n; v++) {
      if (done[v] || v === u) continue;
      const d = distanceKm(AIRPORTS[u][1], AIRPORTS[u][2], AIRPORTS[v][1], AIRPORTS[v][2]);
      const range = AIRPORTS[u][3] && AIRPORTS[v][3] ? LONG_RANGE : REGIONAL_RANGE;
      if (d > range) continue;
      const c = dist[u] + d + LEG_PENALTY_KM;
      if (c < dist[v]) {
        dist[v] = c;
        prev[v] = u;
      }
    }
  }
  const path: number[] = [];
  for (let v = toI; v >= 0; v = prev[v]) path.unshift(v);
  return path[0] === fromI ? path : [fromI, toI];
}

export function plan(mode: Mode, from: Place, to: Place): Plan {
  const total = km(from, to);
  if (total < 20) return { mode, legs: [], hours: 0, joke: 'here' };
  const a = { name: from.name, lat: from.lat, lon: from.lon };
  const b = { name: to.name, lat: to.lat, lon: to.lon };
  const landA = landOf(from.country, from.lat, from.lon);
  const landB = landOf(to.country, to.lat, to.lon);

  if (mode === 'plane') {
    if (total < 300) mode = 'bus';
    else {
      const s = nearestAirport(from);
      const e = nearestAirport(to);
      const legs: Leg[] = [];
      let hours = 2; // getting to the airport, security
      const ap = (i: number) => ({ name: AIRPORTS[i][0], lat: AIRPORTS[i][1], lon: AIRPORTS[i][2] });
      if (s.km > 60) {
        legs.push({ kind: 'ground', from: a, to: ap(s.i), km: s.km, hours: groundHours(s.km, 70) });
        hours += groundHours(s.km, 70);
      }
      const path = s.i === e.i ? [s.i] : flights(s.i, e.i);
      for (let k = 1; k < path.length; k++) {
        const d = distanceKm(AIRPORTS[path[k - 1]][1], AIRPORTS[path[k - 1]][2], AIRPORTS[path[k]][1], AIRPORTS[path[k]][2]);
        const h = d / CRUISE + 0.6;
        legs.push({ kind: 'air', from: ap(path[k - 1]), to: ap(path[k]), km: d, hours: h });
        hours += h + (k > 1 ? 2 : 0); // a change of planes
      }
      if (e.km > 60) {
        legs.push({ kind: 'ground', from: ap(e.i), to: b, km: e.km, hours: groundHours(e.km, 70) });
        hours += groundHours(e.km, 70) + 1;
      }
      return { mode, legs, hours };
    }
  }
  if (landB === 'water' || landA === 'water') return { mode, legs: [], hours: 0, joke: 'water' };
  if (mode === 'train') {
    const netA = from.country ? railOf[from.country] : undefined;
    const netB = to.country ? railOf[to.country] : undefined;
    if (!netA || netA !== netB) return { mode, legs: [], hours: 0, joke: 'noRail' };
    const h = groundHours(total, 80) + Math.floor(total / 1500) * 2; // changes
    return { mode, legs: [{ kind: 'ground', from: a, to: b, km: total, hours: h }], hours: h };
  }
  if (landA !== landB) return { mode, legs: [], hours: 0, joke: 'noRoad' };
  // on foot: 50 km a day; by bus with stops; by car; hitchhiking: slower, plus waiting by the road
  const speed = mode === 'walk' ? 50 / 24 : mode === 'car' ? 75 : mode === 'hitch' ? 60 : 60;
  const h =
    mode === 'walk'
      ? (total * 1.2) / speed
      : mode === 'hitch'
        ? groundHours(total, speed) + Math.ceil(total / 250) * 0.75
        : mode === 'car'
          ? groundHours(total, speed) + Math.floor(total / 400) * 0.5
          : groundHours(total, speed) + Math.floor(total / 800) * 1.5;
  return { mode, legs: [{ kind: 'ground', from: a, to: b, km: total, hours: h }], hours: h };
}
