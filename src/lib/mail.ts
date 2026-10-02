/**
 * Messages go through the visitor's own e-mail app (mailto:), so the site needs no form backend
 * and stores nothing.
 */
export function mailtoHref(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function openMail(email: string, subject: string, body: string): void {
  window.location.href = mailtoHref(email, subject, body);
}

/** Buttons with data-copy="text" copy it and briefly show data-copied (for visitors without a mail app). */
export function wireCopyButtons(root: ParentNode): void {
  root.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((b) => {
    const idle = b.textContent;
    b.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(b.dataset.copy!);
        b.textContent = b.dataset.copied ?? idle;
        setTimeout(() => (b.textContent = idle), 1600);
      } catch {
        /* clipboard blocked: the address is still visible next to the button */
      }
    });
  });
}
