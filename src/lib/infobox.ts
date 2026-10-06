/**
 * Info boxes: a button with data-info-title / data-info-text (and optionally data-info-facts, a JSON
 * list of short facts) opens a card that pops out of it with an arrow pointing at it. The card sits on
 * the page itself (in <body>, so it scrolls and zooms with it), above the background map with its city
 * names and drawings and below the header. Its colours come from the theme (white normally, dark in
 * developer mode). One box at a time; the same button, the ✕, Esc or a click elsewhere closes it.
 * A mouse resting on a button for HOVER_MS opens it too; such a box closes when the mouse leaves both
 * the button and the box (unless the button was clicked, which keeps it open).
 * Styles: .infobox in src/styles/global.css.
 */
let current: { box: HTMLElement; button: HTMLElement; byHover: boolean } | null = null;

const HOVER_MS = 400;
let hoverTimer = 0;
let openTimer = 0;
const cancelHoverClose = () => window.clearTimeout(hoverTimer);
function hoverClose(button: HTMLElement) {
  cancelHoverClose();
  // a short grace time to cross the gap between the button and its box
  hoverTimer = window.setTimeout(() => current?.button === button && current.byHover && close(), 250);
}

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

function open(button: HTMLElement, byHover = false) {
  // on <body> (position: relative), above the background layer (--z-grid) with the city names
  const root = document.body;
  const box = document.createElement('div');
  // opened with a click: bigger (a race's photos are seen whole)
  box.className = byHover ? 'infobox' : 'infobox is-big';
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

  // data-info-photos: a few photos (a JSON list of image paths), a click opens one large
  const photos: string[] = button.dataset.infoPhotos ? JSON.parse(button.dataset.infoPhotos) : [];
  if (photos.length) {
    const row = document.createElement('div');
    row.className = 'infobox__photos';
    for (const p of photos) {
      const a = Object.assign(document.createElement('a'), { href: p, target: '_blank', rel: 'noopener' });
      a.append(Object.assign(document.createElement('img'), { src: p, alt: '', loading: 'lazy' }));
      row.append(a);
    }
    box.append(row);
  }

  // data-info-audio: a song that belongs to it (a record's music) – it plays on in the mini player when
  // the box is closed (MiniPlayer.astro)
  // (data-info-songs: several, a JSON list of { file, title })
  const songs: { file: string; title: string }[] = button.dataset.infoSongs
    ? JSON.parse(button.dataset.infoSongs)
    : button.dataset.infoAudio
      ? [{ file: button.dataset.infoAudio, title: button.dataset.infoAudioTitle ?? '' }]
      : [];
  for (const s of songs) {
    const song = document.createElement('div');
    song.className = 'infobox__audio';
    song.append(Object.assign(document.createElement('span'), { textContent: `♪ ${s.title}` }));
    const audio = Object.assign(document.createElement('audio'), { controls: true, preload: 'none', src: s.file });
    audio.dataset.title = s.title;
    song.append(audio);
    box.append(song);
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
  box.addEventListener('pointerenter', () => {
    cancelHoverClose();
    window.clearTimeout(openTimer);
  });
  box.addEventListener('pointerleave', (e) => e.pointerType === 'mouse' && hoverClose(button));

  // position under the button, measured in the root's own (zoom-free) pixels
  const rr = root.getBoundingClientRect();
  const br = button.getBoundingClientRect();
  const k = rr.width / (root.offsetWidth || rr.width) || 1;
  const width = box.offsetWidth;
  const centre = (br.left + br.width / 2 - rr.left) / k;
  // kept inside the visible part of the page
  // (and inside the page itself: zoomed out, the space beside it cuts the box off)
  const visLeft = Math.max(0, -rr.left / k);
  let visRight = Math.min(root.offsetWidth, (window.innerWidth - rr.left) / k);
  // ... and off the country ribbon on the right, which lies above it (its ✕ would be unclickable)
  const ribbon = document.querySelector<HTMLElement>('.chile')?.getBoundingClientRect();
  if (ribbon && ribbon.width > 0 && ribbon.left > br.right) visRight = Math.min(visRight, (ribbon.left - rr.left) / k);
  const left = Math.max(visLeft + 8, Math.min(visRight - width - 8, centre - width / 2));
  box.style.left = `${left}px`;
  box.style.top = `${(br.bottom - rr.top) / k + 14}px`;
  // a box opened from the sticky header must not slide under it
  if (button.closest('.site-header')) box.style.zIndex = '80';
  box.style.setProperty('--arrow-x', `${centre - left}px`);

  button.setAttribute('aria-expanded', 'true');
  current = { box, button, byHover };
}

/** (Re)open the box of this button – also when it is already open (e.g. with a new text). */
export function showInfoBox(button: HTMLElement): void {
  close(false);
  open(button);
}

/** a click opens / closes the box; a mouse resting on the button opens it too (touch has no hover) */
export function wireInfoBoxes(scope: ParentNode = document): void {
  scope.querySelectorAll<HTMLElement>('[data-info-title]').forEach((b) => {
    if (b.dataset.infoWired) return;
    b.dataset.infoWired = '1';
    b.setAttribute('aria-expanded', 'false');
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      window.clearTimeout(openTimer);
      const same = current?.button === b;
      // already opened by the mouse resting on it: a click keeps it open
      // already opened by the mouse resting on it: a click keeps it open – and makes it big
      if (same && current!.byHover) {
        close(false);
        return open(b);
      }
      close(!same ? false : true);
      if (!same) open(b);
    });
    b.addEventListener('pointerenter', (e) => {
      // data-info-nohover: this one opens on a click only
      if (e.pointerType !== 'mouse' || b.dataset.infoNohover !== undefined) return;
      window.clearTimeout(openTimer);
      if (current?.button === b) return cancelHoverClose();
      // only a mouse that stays opens it (not one passing by, e.g. on its way to an open box)
      openTimer = window.setTimeout(() => {
        cancelHoverClose();
        close(false);
        open(b, true);
      }, HOVER_MS);
    });
    b.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse') return;
      window.clearTimeout(openTimer);
      if (current?.button === b) hoverClose(b);
    });
  });
}

document.addEventListener('click', (e) => {
  if (current && !current.box.contains(e.target as Node)) close();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') close();
});
