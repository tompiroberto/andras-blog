/**
 * Where András is right now. Two sources, merged in time:
 *  - src/data/whereabouts.json: steps set by hand (developer mode: a click on the "currently in" pill);
 *  - src/data/calendar.json: every trip with a country – from its first day he is there, the day after
 *    its last day he is back home (HU).
 * The last step that has started wins; at the same moment a step set by hand wins over a trip.
 * scripts/whereabouts.mjs does the same for the maps' "now" country.
 */
import data from '../data/whereabouts.json';
import calendar from '../data/calendar.json';

export type Step = {
  from: string;
  country: string;
  key?: string;
  text?: string;
  text_en?: string;
  /** a trip of the calendar: its place, in Hungarian / English */
  trip?: string;
  place?: string;
  place_en?: string;
  manual?: boolean;
};
/** depart / back: the hour he leaves on the first day and is home on the last day ("17:00", Hungarian time) */
export type Trip = { id: string; country?: string; place?: string; place_en?: string; from: string; to: string; depart?: string; back?: string };

const dayAfter = (day: string) => {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
};

/** a moment of a day in Hungarian time (the trips' days are Hungarian days, wherever the visitor is) */
export const huStamp = (day: string, time = '00:00') =>
  `${day}T${time}:00${new Date(`${day}T12:00:00Z`).toLocaleString('en', { timeZone: 'Europe/Budapest', timeZoneName: 'shortOffset' }).includes('GMT+2') ? '+02:00' : '+01:00'}`;
const huMidnight = (day: string) => huStamp(day);
/** when a trip starts and ends (ms): its hours, else the first day's midnight and the midnight after its last day */
export const tripStart = (e: Pick<Trip, 'from' | 'depart'>) => Date.parse(huStamp(e.from, e.depart || '00:00'));
export const tripEnd = (e: Pick<Trip, 'to' | 'back'>) => Date.parse(e.back ? huStamp(e.to, e.back) : huStamp(dayAfter(e.to)));

export function timeline(steps: Step[], trips: Trip[]): Step[] {
  const out: Step[] = steps.map((s) => ({ ...s, manual: true }));
  for (const e of trips) {
    if (!e.country) continue;
    out.push({ from: huStamp(e.from, e.depart || '00:00'), country: e.country, trip: e.id, place: e.place, place_en: e.place_en });
    out.push({ from: e.back ? huStamp(e.to, e.back) : huMidnight(dayAfter(e.to)), country: 'HU', key: 'HU' });
  }
  return out.sort((a, b) => Date.parse(a.from) - Date.parse(b.from) || Number(!!a.manual) - Number(!!b.manual));
}

export const stepNow = (list: Step[], time: number = Date.now()) => list.filter((s) => Date.parse(s.from) <= time).pop();

/** the pill's text: its own (Hungarian on the Hungarian page, English elsewhere), a translated one, or a trip's */
export function stepText(st: Step, lang: string, words: Record<string, string>): string {
  if (st.text) return lang === 'hu' ? st.text : st.text_en || st.text;
  if (st.key && words[st.key]) return words[st.key];
  const hu = lang === 'hu';
  let country = st.country;
  try {
    country = new Intl.DisplayNames([hu ? 'hu' : 'en'], { type: 'region' }).of(st.country) ?? st.country;
  } catch {
    /* not a country code */
  }
  const place = hu ? st.place : st.place_en || st.place;
  const extra = place && place !== country ? ` · ${place}` : '';
  if (st.country === 'HU') return hu ? `Jelenleg itthon${place ? `: ${place}` : ', Magyarországon'}` : `Back home in Hungary${place ? ` · ${place}` : ''}`;
  return hu ? `Jelenleg itt: ${country}${extra}` : `Currently in ${country}${extra}`;
}

export const STEPS = timeline(data.steps as Step[], calendar.events as Trip[]);
export const MANUAL = data.steps as Step[];

export function stepAt(time: number = Date.now()): Step | undefined {
  return stepNow(STEPS, time);
}
