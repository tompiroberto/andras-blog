/** localStorage key holding the visitor's chosen language (used by the / redirect). */
export const LANG_STORAGE_KEY = 'andras-lang';

/** Breakpoint where the layout switches to mobile (hamburger menu, slim Chile ribbon). */
export const MOBILE_BREAKPOINT = 900;

/** Media query for the full desktop Chile scrollbar. */
export const DESKTOP_POINTER_QUERY = `(min-width: ${MOBILE_BREAKPOINT}px) and (pointer: fine)`;

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export const CATEGORIES = ['adventures', 'erasmus', 'random'] as const;
/** Crop positions for post covers on the cards (sharp's names; 'attention' = smart crop) */
export const COVER_POSITIONS = ['attention', 'left top', 'top', 'right top', 'left', 'center', 'right', 'left bottom', 'bottom', 'right bottom'] as const;
export type CoverPosition = (typeof COVER_POSITIONS)[number];
export type Category = (typeof CATEGORIES)[number];

/** localStorage key ('1' / '0') and window event for the coordinate-grid overlay. */
export const GRID_STORAGE_KEY = 'andras-grid';
export const GRID_EVENT = 'andras:grid-change';

/** localStorage key and window event for the scrollbar country (Chile / Argentina). */
export const RIBBON_STORAGE_KEY = 'andras-ribbon';
export const RIBBON_EVENT = 'andras:ribbon-change';

/** localStorage key and window event for the colour theme. */
export const THEME_STORAGE_KEY = 'andras-theme';
export const THEME_EVENT = 'andras:theme-change';

/** Background city labels on/off (localStorage '1' / '0'; on by default). */
export const CITIES_STORAGE_KEY = 'andras-cities';
/** background: world map (default) or the dynamic photo background (html.bg-dynamic) */
export const BG_STORAGE_KEY = 'andras-bg';
export const BG_EVENT = 'andras:bg-change';
export const CITIES_EVENT = 'andras:cities-change';

/** Fired when the map centre moves (city search); detail = SearchTarget or null for home. */
export const CENTER_EVENT = 'andras:center-change';
export interface SearchTarget {
  name: string;
  lat: number;
  lon: number;
}

/** Page zoom level in % (the magnifier), and the event fired when it changes. */
export const ZOOM_STORAGE_KEY = 'andras-zoom';
export const ZOOM_EVENT = 'andras:zoom-change';

/** Ask the fact card to show a random fact about a place; detail = SearchTarget. */
export const FACTS_EVENT = 'andras:show-facts';

/** Scrollbar shape: stretched into a tall ribbon (default) or true proportions ('1' in storage = true shape). */
export const RIBBON_TRUE_STORAGE_KEY = 'andras-ribbon-true';

/** Map mode: the whole site as a pannable, zoomable world map ('1' in storage = on). */
export const MAP_MODE_STORAGE_KEY = 'andras-map-mode';
/** The calendar (html.cal-mode); it is not reopened by itself on the next page. */
export const CAL_STORAGE_KEY = 'andras-cal';
export const CAL_EVENT = 'andras:cal-change';
export const MAP_MODE_EVENT = 'andras:map-mode-change';

/** Horizontal page: sections side by side, scrolling left and right ('1' in storage = on). */
export const HORIZONTAL_STORAGE_KEY = 'andras-horizontal';
export const HORIZONTAL_EVENT = 'andras:horizontal-change';

/** Open the "message me about this place" window; detail = PlaceMessageDetail. */
export const PLACE_MESSAGE_EVENT = 'andras:place-message';
export interface PlaceMessageDetail {
  place: string;
  topic?: 'say' | 'host' | 'buddy';
  /** 'date': about a day or a period of the calendar (come along / help / a suggestion) */
  kind?: 'place' | 'date';
}

/** CV view: a separate, printable CV page ('1' in storage = on). */
export const CV_STORAGE_KEY = 'andras-cv';
/** sessionStorage: 'cv' | 'blog' – the CV is the front page until the visitor goes to the blog */
export const VIEW_SESSION_KEY = 'andras-view';
export const CV_EVENT = 'andras:cv-change';

/** Open the country / river page for a scrollbar ribbon; detail = ribbon id. */
export const COUNTRY_EVENT = 'andras:country-page';

/** Open the route planner towards a place; detail = SearchTarget (name, lat, lon). */
export const ROUTE_EVENT = 'andras:route';

/** Street View theme: the site as a walk along a road ('1' in storage = on). */
export const STREET_STORAGE_KEY = 'andras-street';
export const STREET_EVENT = 'andras:street-change';
