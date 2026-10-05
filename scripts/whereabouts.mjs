/**
 * Sets the "now" country in src/data/countries.json from where András is (src/lib/whereabouts.ts does the
 * same for the pill): the steps of src/data/whereabouts.json and the trips of src/data/calendar.json (from a
 * trip's first day its country, the day after its last day home). That country becomes "now" (home stays
 * "home"), the one before becomes "visited", and src/data/site.json currentlyIn follows. Run by
 * .github/workflows/whereabouts.yml; prints "changed" when it wrote something.
 */
import fs from 'node:fs';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, d) => fs.writeFileSync(p, `${JSON.stringify(d, null, 2)}\n`);
const dayAfter = (day) => {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
};
// Hungarian time for the trips' days (the site is run from Hungary)
const offset = (day) => (new Date(`${day}T12:00:00Z`).toLocaleString('en', { timeZone: 'Europe/Budapest', timeZoneName: 'shortOffset' }).includes('GMT+2') ? '+02:00' : '+01:00');
const steps = read('src/data/whereabouts.json').steps.map((s) => ({ ...s, manual: true }));
for (const e of read('src/data/calendar.json').events) {
  if (!e.country) continue;
  steps.push({ from: `${e.from}T00:00:00${offset(e.from)}`, country: e.country });
  const back = dayAfter(e.to);
  steps.push({ from: `${back}T00:00:00${offset(back)}`, country: 'HU' });
}
steps.sort((a, b) => Date.parse(a.from) - Date.parse(b.from) || Number(!!a.manual) - Number(!!b.manual));
const now = Date.now();
const step = steps.filter((s) => Date.parse(s.from) <= now).pop();
if (!step) process.exit(0);

const countries = read('src/data/countries.json');
let changed = false;
for (const c of countries.countries) {
  if (c.id === step.country) {
    if (c.status !== 'home' && c.status !== 'now') {
      c.status = 'now';
      changed = true;
    }
  } else if (c.status === 'now') {
    c.status = 'visited';
    changed = true;
  }
}
const site = read('src/data/site.json');
if (site.currentlyIn?.countryId !== step.country) {
  site.currentlyIn = { ...site.currentlyIn, countryId: step.country };
  changed = true;
  write('src/data/site.json', site);
}
if (changed) {
  write('src/data/countries.json', countries);
  console.log('changed');
}
