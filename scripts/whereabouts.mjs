/**
 * Sets the "now" country in src/data/countries.json from src/data/whereabouts.json (the step that has
 * started): that country becomes "now" (home stays "home"), the one before becomes "visited", and
 * src/data/site.json currentlyIn follows. Run by .github/workflows/whereabouts.yml at the step times;
 * prints "changed" when it wrote something.
 */
import fs from 'node:fs';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, d) => fs.writeFileSync(p, `${JSON.stringify(d, null, 2)}\n`);
const { steps } = read('src/data/whereabouts.json');
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
