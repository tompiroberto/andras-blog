/**
 * "Distance from me": the visitor's location, found by IP address (GeoJS, only when asked for)
 * or typed in (then remembered in localStorage), and the great-circle distance to a place.
 */
export interface MyLocation {
  name: string;
  lat: number;
  lon: number;
}

const KEY = 'andras-my-location';

export function loadMyLocation(): MyLocation | null {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    return v && Number.isFinite(v.lat) && Number.isFinite(v.lon) ? v : null;
  } catch {
    return null;
  }
}

export function saveMyLocation(loc: MyLocation) {
  try {
    localStorage.setItem(KEY, JSON.stringify(loc));
  } catch {
    /* storage unavailable */
  }
}

/** Approximate location from the IP address (city level). */
export async function findMyLocation(): Promise<MyLocation> {
  const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
  if (!res.ok) throw new Error(`GeoJS ${res.status}`);
  const d = (await res.json()) as { latitude?: string; longitude?: string; city?: string; country?: string };
  const lat = Number(d.latitude);
  const lon = Number(d.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) throw new Error('no location');
  return { name: [d.city, d.country].filter(Boolean).join(', ') || `${lat.toFixed(1)}, ${lon.toFixed(1)}`, lat, lon };
}

/** Great-circle distance in km (haversine). */
export function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const r = Math.PI / 180;
  const a = Math.sin(((lat2 - lat1) * r) / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(((lon2 - lon1) * r) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(a)));
}
