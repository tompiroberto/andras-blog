/**
 * E-mail fallback for the message forms: when sending through Netlify Forms fails, the visitor's own
 * e-mail app (mailto:) opens with the message already written.
 */
export function mailtoHref(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function openMail(email: string, subject: string, body: string): void {
  window.location.href = mailtoHref(email, subject, body);
}

/** The letter for the e-mail fallback: the message, then the sender's name and contact. */
export function letterBody(data: FormData): string {
  const get = (k: string) => String(data.get(k) ?? '').trim();
  const sign = [get('name'), get('contact')].filter(Boolean).join(' · ');
  return sign ? `${get('message')}

— ${sign}` : get('message');
}
