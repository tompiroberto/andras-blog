/**
 * City name -> coordinates. Open-Meteo geocoding first (free, no key); if it errors or is slow,
 * OpenStreetMap Nominatim. Only the typed text is sent; nothing is stored.
 */
const OPEN_METEO = 'https://geocoding-api.open-meteo.com/v1/search';
const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
const TIMEOUT_MS = 8000;
const MAX_RESULTS = 6;

export interface GeoResult {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

export async function getJson<T>(url: string, timeoutMs = TIMEOUT_MS): Promise<T> {
  const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs), headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

/** Coordinates -> a short place name ("Budapest, Magyarország"), via OpenStreetMap Nominatim. */
export async function reverseGeocode(lat: number, lng: number, lang: string): Promise<string> {
  interface Place {
    address?: { city?: string; town?: string; village?: string; municipality?: string; county?: string; state?: string; country?: string };
  }
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2&zoom=10&accept-language=${encodeURIComponent(lang)}`;
  const a = (await getJson<Place>(url)).address ?? {};
  return [a.city ?? a.town ?? a.village ?? a.municipality ?? a.county ?? a.state, a.country].filter(Boolean).join(', ');
}

export async function geocode(q: string, lang: string): Promise<GeoResult[]> {
  try {
    const url = `${OPEN_METEO}?name=${encodeURIComponent(q)}&count=${MAX_RESULTS}&language=${encodeURIComponent(lang)}&format=json`;
    return (await getJson<{ results?: GeoResult[] }>(url)).results ?? [];
  } catch (err) {
    console.warn('[geocode] Open-Meteo failed, trying Nominatim', err);
  }
  interface Place {
    name?: string;
    display_name: string;
    lat: string;
    lon: string;
    address?: { country?: string; state?: string };
  }
  const url = `${NOMINATIM}?q=${encodeURIComponent(q)}&format=jsonv2&addressdetails=1&limit=${MAX_RESULTS}&accept-language=${encodeURIComponent(lang)}`;
  return (await getJson<Place[]>(url)).map((p) => ({
    name: p.name || p.display_name.split(',')[0],
    latitude: Number(p.lat),
    longitude: Number(p.lon),
    country: p.address?.country,
    admin1: p.address?.state,
  }));
}
