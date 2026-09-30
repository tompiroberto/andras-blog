/**
 * A chocolate–hazelnut spread jar in the site's drawing style (a generic jar – no brand logo).
 * Used by map mode's Nutella factories, the Nutella rain and the solar system.
 */
export function jarSvg(label = true): string {
  return `<svg viewBox="0 0 46 56" aria-hidden="true" focusable="false">
  <rect x="9" y="3" width="28" height="10" rx="3" fill="#fff" stroke="#1b1b24" stroke-width="2"/>
  <path d="M11 6.5h24M11 9.5h24" stroke="#d9d9e3" stroke-width="1.2"/>
  <path d="M8 14h30q4 0 4 5v27q0 7-7 7H11q-7 0-7-7V19q0-5 4-5Z" fill="#5a3217" stroke="#1b1b24" stroke-width="2"/>
  <path d="M9 18q14 4 28 0" fill="none" stroke="#7a4a26" stroke-width="3" stroke-linecap="round"/>
  ${label ? `<rect x="7" y="26" width="32" height="15" rx="3" fill="#fff" stroke="#1b1b24" stroke-width="1.5"/>
  <circle cx="15" cy="33.5" r="3.4" fill="#b8742c" stroke="#1b1b24" stroke-width="1"/>
  <path d="M21 31h13M21 36h9" stroke="#d7263d" stroke-width="2.4" stroke-linecap="round"/>` : ''}
  <path d="M34 20v18" stroke="#fff" stroke-opacity="0.35" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;
}
