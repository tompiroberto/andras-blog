export type MapStatus = 'home' | 'visited' | 'transit' | 'now' | 'planned';

/** One country as passed from the build to the map script. */
export interface MapCountry {
  iso: string;
  status: MapStatus;
  name: string;
  text: string;
  link?: string;
}
