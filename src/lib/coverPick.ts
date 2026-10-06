/** A post with two covers (cover + cover2): each visit shows one of them at random. */
export function pickCovers(): void {
  const groups = new Map<Element, HTMLElement[]>();
  document.querySelectorAll<HTMLElement>('[data-cover-pick]').forEach((img) => {
    const parent = img.parentElement!;
    groups.set(parent, [...(groups.get(parent) ?? []), img]);
  });
  for (const imgs of groups.values()) {
    if (imgs.length < 2) continue;
    const pick = Math.floor(Math.random() * imgs.length);
    imgs.forEach((img, i) => (img.hidden = i !== pick));
  }
}
