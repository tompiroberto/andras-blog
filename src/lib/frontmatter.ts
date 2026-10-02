/**
 * Just enough YAML front matter handling to edit a post on the site: read the simple fields and write
 * them back while keeping every other block (facts, strava, countries, icon …) exactly as it was.
 */
export interface FrontBlock {
  key: string;
  lines: string[];
}

export interface ParsedPost {
  blocks: FrontBlock[];
  body: string;
}

export function parsePost(text: string): ParsedPost {
  const m = text.replace(/^﻿/, '').match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { blocks: [], body: text };
  const blocks: FrontBlock[] = [];
  for (const line of m[1].split(/\r?\n/)) {
    const key = line.match(/^([A-Za-z][\w-]*):/)?.[1];
    if (key) blocks.push({ key, lines: [line] });
    else if (blocks.length) blocks[blocks.length - 1].lines.push(line);
  }
  return { blocks, body: m[2].replace(/^\r?\n/, '') };
}

/** the value of a one-line field ("…", '…' or plain), without a trailing comment */
export function fieldValue(post: ParsedPost, key: string): string {
  const b = post.blocks.find((x) => x.key === key);
  if (!b) return '';
  let raw = b.lines[0].slice(key.length + 1).trim();
  if (raw.startsWith('"')) {
    try {
      return JSON.parse(raw.match(/^"(?:[^"\\]|\\.)*"/)?.[0] ?? raw);
    } catch {
      return raw.slice(1, -1);
    }
  }
  if (raw.startsWith("'")) return (raw.match(/^'((?:[^']|'')*)'/)?.[1] ?? raw.slice(1, -1)).replace(/''/g, "'");
  raw = raw.replace(/\s+#.*$/, '');
  return raw;
}

/** set one-line fields (null removes the field); new fields are added at the end */
export function setFields(post: ParsedPost, values: Record<string, string | null>): void {
  for (const [key, value] of Object.entries(values)) {
    const i = post.blocks.findIndex((x) => x.key === key);
    if (value === null) {
      if (i >= 0) post.blocks.splice(i, 1);
      continue;
    }
    const line = `${key}: ${value}`;
    if (i >= 0) post.blocks[i] = { key, lines: [line] };
    else post.blocks.push({ key, lines: [line] });
  }
}

export function writePost(post: ParsedPost): string {
  return `---\n${post.blocks.flatMap((b) => b.lines).join('\n')}\n---\n\n${post.body.trim()}\n`;
}
