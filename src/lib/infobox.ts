/**
 * Info boxes: a button with data-info-title / data-info-text (and optionally data-info-facts, a JSON
 * list of short facts) opens a card that pops out of it with an arrow pointing at it. The card sits on
 * the page itself (in <body>, so it scrolls and zooms with it), above the background map with its city
 * names and drawings and below the header. Its colours come from the theme (white normally, dark in
 * developer mode). One box at a time; the same button, the ✕, Esc or a click elsewhere closes it.
 * Styles: .infobox in src/styles/global.css.
 */
let current: { box: HTMLElement; button: HTMLElement } | null = null;

function close(animate = true) {
  if (!current) return;
  const { box, button } = current;
  current = null;
  button.setAttribute('aria-expanded', 'false');
  if (!animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return box.remove();
  box.classList.add('is-closing');
  box.addEventListener('animationend', () => box.remove(), { once: true });
  setTimeout(() => box.remove(), 400);
}

/** the title: data-info-title, or the text of the element named by data-info-title-from */
const titleOf = (b: HTMLElement) => (b.dataset.infoTitleFrom ? b.querySelector(b.dataset.infoTitleFrom)?.textContent?.trim() : undefined) || b.dataset.infoTitle || '';

function open(button: HTMLElement) {
  // on <body> (position: relative), above the background layer (--z-grid) with the city names
  const root = document.body;
  const box = document.createElement('div');
  box.className = 'infobox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-label', titleOf(button));

  const arrow = document.createElement('span');
  arrow.className = 'infobox__arrow';
  const x = document.createElement('button');
  x.type = 'button';
  x.className = 'infobox__x';
  x.textContent = '✕';
  x.setAttribute('aria-label', '✕');
  x.addEventListener('click', () => close());

  const head = document.createElement('div');
  head.className = 'infobox__head';
  // data-info-icon picks the icon when the button holds several pictures (e.g. the record rings)
  const icon = button.querySelector(button.dataset.infoIcon ?? 'svg');
  if (icon) {
    const holder = document.createElement('span');
    holder.className = 'infobox__icon';
    holder.append(icon.cloneNode(true));
    head.append(holder);
  }
  const title = document.createElement('strong');
  title.textContent = titleOf(button);
  head.append(title);

  const text = document.createElement('p');
  text.className = 'infobox__text';
  text.textContent = button.dataset.infoText ?? '';
  box.append(arrow, x, head, text);
  if (button.dataset.infoLink) {
    const a = document.createElement('a');
    a.className = 'infobox__link';
    a.href = button.dataset.infoLink;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = `🗺 ${button.dataset.infoLinkText ?? 'Map'} →`;
    box.append(a);
  }

  const facts: string[] = button.dataset.infoFacts ? JSON.parse(button.dataset.infoFacts) : [];
  if (facts.length) {
    const ul = document.createElement('ul');
    ul.className = 'infobox__facts';
    facts.forEach((f, i) => {
      const li = document.createElement('li');
      li.textContent = f;
      li.style.animationDelay = `${180 + i * 90}ms`;
      ul.append(li);
    });
    box.append(ul);
  }
  root.append(box);

  // position under the button, measured in the root's own (zoom-free) pixels
  const rr = root.getBoundingClientRect();
  const br = button.getBoundingClientRect();
  const k = rr.width / (root.offsetWidth || rr.width) || 1;
  const width = box.offsetWidth;
  const centre = (br.left + br.width / 2 - rr.left) / k;
  // kept inside the visible part of the page
  const visLeft = -rr.left / k;
  const visRight = (window.innerWidth - rr.left) / k;
  const left = Math.max(visLeft + 8, Math.min(visRight - width - 8, centre - width / 2));
  box.style.left = `${left}px`;
  box.style.top = `${(br.bottom - rr.top) / k + 14}px`;
  // a box opened from the sticky header must not slide under it
  if (button.closest('.site-header')) box.style.zIndex = '80';
  box.style.setProperty('--arrow-x', `${centre - left}px`);

  button.setAttribute('aria-expanded', 'true');
  current = { box, button };
}

/** (Re)open the box of this button – also when it is already open (e.g. with a new text). */
export function showInfoBox(button: HTMLElement): void {
  close(false);
  open(button);
}

export function wireInfoBoxes(scope: ParentNode = document): void {
  scope.querySelectorAll<HTMLElement>('[data-info-title]').forEach((b) => {
    if (b.dataset.infoWired) return;
    b.dataset.infoWired = '1';
    b.setAttribute('aria-expanded', 'false');
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const same = current?.button === b;
      close(!same ? false : true);
      if (!same) open(b);
    });
  });
}

document.addEventListener('click', (e) => {
  if (current && !current.box.contains(e.target as Node)) close();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') close();
});
