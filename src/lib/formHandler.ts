/**
 * Contact-form transport, kept separate from the UI so the provider can be swapped.
 *
 * - 'netlify'   (default): posts URL-encoded data to the static form copy in public/__forms.html,
 *                which Netlify detects at deploy time.
 * - 'formspree': set FORM_PROVIDER = 'formspree' and fill in FORMSPREE_ENDPOINT
 *                (e.g. https://formspree.io/f/xxxxxxx).
 */
export type FormProvider = 'netlify' | 'formspree';

export const FORM_PROVIDER: FormProvider = 'netlify';
export const NETLIFY_FORM_ENDPOINT = '/__forms.html';
export const FORMSPREE_ENDPOINT = '';

export async function submitForm(form: HTMLFormElement, provider: FormProvider = FORM_PROVIDER): Promise<void> {
  const data = new FormData(form);
  let res: Response;

  if (provider === 'formspree') {
    if (!FORMSPREE_ENDPOINT) throw new Error('FORMSPREE_ENDPOINT is not configured');
    data.delete('form-name');
    res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data,
    });
  } else {
    const body = new URLSearchParams();
    data.forEach((value, key) => body.append(key, typeof value === 'string' ? value : value.name));
    res = await fetch(NETLIFY_FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
  }

  if (!res.ok) throw new Error(`Form submission failed with status ${res.status}`);
}
