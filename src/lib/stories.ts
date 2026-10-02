/**
 * "Click to read the story": buttons carrying data-story="text" inside `root` show their text in the
 * root's [data-story-box]; the same button again (or Esc) closes it. Used by the icon strip and the
 * language chips.
 */
export function wireStories(root: HTMLElement, selector: string): void {
  const box = root.querySelector<HTMLElement>('[data-story-box]');
  if (!box) return;
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>(selector));
  const close = () => {
    box.hidden = true;
    buttons.forEach((b) => b.setAttribute('aria-expanded', 'false'));
  };
  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      const open = b.getAttribute('aria-expanded') === 'true';
      close();
      if (open) return;
      box.textContent = b.dataset.story ?? '';
      box.hidden = false;
      b.setAttribute('aria-expanded', 'true');
    }),
  );
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
