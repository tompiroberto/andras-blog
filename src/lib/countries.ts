/**
 * Countries from src/data/countries.json (the "Where I've been" map).
 */
import countriesData from '../data/countries.json';

/** Countries I have been to: home, visited, where I am now and passed through (not the planned ones). */
export function beenCount(): number {
  return countriesData.countries.filter((c) => c.isoNumeric && c.status !== 'planned').length;
}
