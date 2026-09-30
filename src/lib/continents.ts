/**
 * Which continent a city belongs to (for the chaos map's continent views). Simple boxes checked in
 * order, plus a few explicit answers where the boxes disagree with geography.
 */
export const CONTINENT_IDS = ['northAmerica', 'southAmerica', 'europe', 'africa', 'asia', 'oceania'] as const;
export type ContinentId = (typeof CONTINENT_IDS)[number];

const OVERRIDES: Record<string, ContinentId> = {
  Tunis: 'africa',
  Algiers: 'africa',
  Riyadh: 'asia',
  Tehran: 'asia',
  'Panama City': 'northAmerica',
  Nuuk: 'northAmerica',
  Honolulu: 'oceania',
};

// [continent, west, south, east, north] – checked in this order
const BOXES: [ContinentId, number, number, number, number][] = [
  ['oceania', 110, -50, 180, -1],
  ['southAmerica', -92, -57, -30, 13],
  ['northAmerica', -170, 7, -50, 84],
  ['europe', -32, 36, 46, 72],
  ['africa', -20, -36, 52, 36],
  ['asia', 25, -12, 180, 80],
];

export function continentOf(name: string, lat: number, lon: number): ContinentId | null {
  if (OVERRIDES[name]) return OVERRIDES[name];
  for (const [id, w, s, e, n] of BOXES) if (lon >= w && lon <= e && lat >= s && lat <= n) return id;
  return null;
}
