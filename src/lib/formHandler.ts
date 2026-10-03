/**
 * Contact-form transport, kept separate from the UI. Every message form on the site ("Message me" and
 * the "message me about this place" window) sends through submitForm():
 *
 * 1. The chosen service (site.json → formProvider, switched in developer mode; the form carries it as
 *    data-provider): Formspree (FORMSPREE_ENDPOINT, Free plan about 50 messages a month) or Netlify Forms
 *    (the static copy in public/__forms.html).
 * 2. If that fails (monthly limit, network…): the other one.
 * 3. If both fail, the form itself opens the visitor's e-mail app with the message (src/lib/mail.ts).
 */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbglvnoe';
export const NETLIFY_FORM_ENDPOINT = '/__forms.html';

const TOPIC_LABELS: Record<string, string> = {
  idea: 'Idea / crazy thing',
  join: 'Wants to join',
  work: 'Work / collaboration',
  say: 'About a place',
  host: 'Offers a place to stay / a ride',
  buddy: 'Travel buddy',
};

async function viaFormspree(form: HTMLFormElement): Promise<void> {
  const data = new FormData(form);
  // Formspree's own field names: honeypot, e-mail subject, reply address
  const trap = String(data.get('bot-field') ?? '');
  data.delete('bot-field');
  data.delete('form-name');
  data.set('_gotcha', trap);
  const topic = String(data.get('topic') ?? '');
  const place = String(data.get('place') ?? '').trim();
  const name = String(data.get('name') ?? '').trim();
  data.set('_subject', ['Message from the website', TOPIC_LABELS[topic] ?? topic, place, name].filter(Boolean).join(' · '));
  const contact = String(data.get('contact') ?? '').trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) data.set('_replyto', contact);
  const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: data });
  if (!res.ok) throw new Error(`Formspree: ${res.status}`);
}

async function viaNetlify(form: HTMLFormElement): Promise<void> {
  // a copy on another host (scripts/export.mjs): there are no Netlify Forms – a plain server would even
  // answer the POST with 200, so it must not be tried (the e-mail app is the fallback)
  if (import.meta.env.PUBLIC_STATIC_EXPORT === '1') throw new Error('Netlify Forms: not on this host');
  const body = new URLSearchParams();
  new FormData(form).forEach((value, key) => body.append(key, typeof value === 'string' ? value : value.name));
  const res = await fetch(NETLIFY_FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) throw new Error(`Netlify: ${res.status}`);
}

export async function submitForm(form: HTMLFormElement): Promise<void> {
  const [first, second] = form.dataset.provider === 'netlify' ? [viaNetlify, viaFormspree] : [viaFormspree, viaNetlify];
  try {
    await first(form);
  } catch (err) {
    console.warn('[form] the first service did not take it, trying the other one', err);
    await second(form);
  }
}
