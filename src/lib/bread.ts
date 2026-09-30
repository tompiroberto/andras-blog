/** A slice of bread in the site's drawing style (the Nutella wiper). `smeared` = chocolate on it. */
export function breadSvg(smeared = false): string {
  const shape = 'M8 21Q2 9 14 6Q24 0 34 6Q46 9 40 21V46Q40 51 35 51H13Q8 51 8 46Z';
  const choc = smeared
    ? '<path d="M12 24Q20 18 30 22Q38 26 35 34Q30 44 20 41Q11 38 12 30Z" fill="#4a2812"/><path d="M16 26q6-3 12 0" stroke="#fff" stroke-opacity=".2" stroke-width="2" fill="none" stroke-linecap="round"/>'
    : '';
  return `<svg viewBox="0 0 48 54" width="20" height="22" aria-hidden="true" focusable="false">
  <path d="${shape}" fill="#f3d9a4" stroke="#9a6224" stroke-width="4" stroke-linejoin="round"/>
  <path d="${shape}" fill="none" stroke="#1b1b24" stroke-width="1.5" stroke-linejoin="round"/>
  <circle cx="18" cy="22" r="1.4" fill="#d9b67a"/><circle cx="29" cy="30" r="1.6" fill="#d9b67a"/><circle cx="21" cy="38" r="1.2" fill="#d9b67a"/><circle cx="31" cy="17" r="1.2" fill="#d9b67a"/>
  ${choc}
</svg>`;
}
