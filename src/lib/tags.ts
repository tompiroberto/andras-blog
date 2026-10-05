/**
 * Hashtags typed by hand: "#tenger #road trip, Erasmus" → ["tenger", "road trip", "erasmus"]
 * (split at # and commas, trimmed, lower case, each once).
 */
export function parseTags(text: string): string[] {
  return [...new Set(text.split(/[#,]/).map((x) => x.trim().toLowerCase()).filter(Boolean))];
}

/** ["tenger", "road trip"] → "#tenger #road trip" */
export const showTags = (tags: string[] = []) => tags.map((x) => `#${x}`).join(' ');
