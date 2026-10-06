/**
 * Developer mode: write files straight into the GitHub repository from the browser, as ONE commit
 * (Git Data API).
 *
 * Saving and publishing are separate, because every Netlify deploy costs credits (Free plan: 300 a
 * month, 15 per production deploy): saves are committed with "[skip netlify]" (safe on GitHub, no
 * deploy) and counted; publishSite() then puts everything online with a single deploy. Needs a fine-grained personal access token with
 * "Contents: read and write" on this repository only; it is kept in this browser's localStorage.
 */
export const REPO = 'tompiroberto/andras-blog';
export const BRANCH = 'main';
export const TOKEN_KEY = 'andras-gh-token';

export type NewFile = { path: string } & ({ base64: string } | { text: string } | { delete: true });

async function gh<T>(token: string, path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const res = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    method: init?.method ?? 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    // never an old answer from the browser's cache (an old branch head makes the save "not a fast forward")
    cache: 'no-store',
  });
  if (!res.ok) {
    let detail = '';
    try {
      detail = ((await res.json()) as { message?: string }).message ?? '';
    } catch {
      /* no JSON body */
    }
    // the usual reasons, in plain words
    if (res.status === 401) throw new Error('GitHub 401: a GitHub-kulcs nem érvényes (elírva, törölve vagy lejárt) – készíts újat: github.com/settings/personal-access-tokens');
    if (res.status === 403 && !/rate limit/i.test(detail))
      throw new Error('GitHub 403: a kulcsnak nincs írási joga – a kulcsnál ez kell: Repository access → tompiroberto/andras-blog, Permissions → Contents: Read and write (vagy lejárt). github.com/settings/personal-access-tokens');
    throw new Error(`GitHub ${res.status}${detail ? `: ${detail}` : ''}`);
  }
  return (await res.json()) as T;
}

export const PENDING_KEY = 'andras-pending';
export const PENDING_EVENT = 'andras:pending';

export function pendingCount(): number {
  try {
    return Number(localStorage.getItem(PENDING_KEY)) || 0;
  } catch {
    return 0;
  }
}
function setPending(n: number) {
  try {
    localStorage.setItem(PENDING_KEY, String(n));
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent(PENDING_EVENT, { detail: n }));
}

/** What was saved and waits for "Publish" (the developer panel's change log) */
export const PENDING_LOG_KEY = 'andras-pending-log';
export type PendingEntry = { at: string; message: string; files: string[]; lines?: string[] };
export function pendingLog(): PendingEntry[] {
  try {
    return JSON.parse(localStorage.getItem(PENDING_LOG_KEY) ?? '[]') as PendingEntry[];
  } catch {
    return [];
  }
}
function setPendingLog(log: PendingEntry[]) {
  try {
    localStorage.setItem(PENDING_LOG_KEY, JSON.stringify(log.slice(-100)));
  } catch {
    /* storage unavailable */
  }
}

/** Save to GitHub without a deploy (it waits for "Publish"). lines: what changed, in words (for the log) */
export async function commitFiles(token: string, files: NewFile[], message: string, lines?: string[]): Promise<void> {
  await commitRaw(token, files, `${message} [skip netlify]`);
  setPendingLog([...pendingLog(), { at: new Date().toISOString(), message, files: files.map((f) => f.path), lines }]);
  setPending(pendingCount() + 1);
}

/** One deploy for everything saved so far. */
export async function publishSite(token: string): Promise<void> {
  const n = pendingCount();
  await commitRaw(token, [{ path: 'src/data/published.json', text: `${JSON.stringify({ at: new Date().toISOString() }, null, 2)}\n` }], `Publish the site (${n} saved change${n === 1 ? '' : 's'})`);
  setPendingLog([]);
  setPending(0);
}

async function commitRaw(token: string, files: NewFile[], message: string): Promise<void> {
  // the big files go up once
  const tree: { path: string; mode: string; type: string; sha?: string | null; content?: string }[] = [];
  for (const f of files) {
    if ('delete' in f) {
      tree.push({ path: f.path, mode: '100644', type: 'blob', sha: null });
    } else if ('base64' in f) {
      const blob = await gh<{ sha: string }>(token, '/git/blobs', { method: 'POST', body: { content: f.base64, encoding: 'base64' } });
      tree.push({ path: f.path, mode: '100644', type: 'blob', sha: blob.sha });
    } else {
      tree.push({ path: f.path, mode: '100644', type: 'blob', content: f.text });
    }
  }
  // something else may have been saved in the meantime (another tab, a scheduled job): then once more on top of it
  for (let attempt = 1; ; attempt++) {
    const ref = await gh<{ object: { sha: string } }>(token, `/git/ref/heads/${BRANCH}`);
    const parent = ref.object.sha;
    const head = await gh<{ tree: { sha: string } }>(token, `/git/commits/${parent}`);
    const newTree = await gh<{ sha: string }>(token, '/git/trees', { method: 'POST', body: { base_tree: head.tree.sha, tree } });
    const commit = await gh<{ sha: string }>(token, '/git/commits', { method: 'POST', body: { message, tree: newTree.sha, parents: [parent] } });
    try {
      await gh(token, `/git/refs/heads/${BRANCH}`, { method: 'PATCH', body: { sha: commit.sha } });
      return;
    } catch (err) {
      const busy = err instanceof Error && /(422|409).*(fast forward|fast-forward|conflict|reference)/i.test(err.message);
      if (!busy || attempt >= 4) throw err;
      await new Promise((r) => setTimeout(r, 600 * attempt));
    }
  }
}

/** Current text of a file on the branch (UTF-8). */
export async function readFile(token: string, path: string): Promise<string> {
  const file = await gh<{ content: string }>(token, `/contents/${path}?ref=${BRANCH}`);
  const bytes = Uint8Array.from(atob(file.content.replace(/\n/g, '')), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/** true when the path already exists on the branch (a new post must not overwrite an old one) */
export async function fileExists(token: string, path: string): Promise<boolean> {
  try {
    await gh(token, `/contents/${path}?ref=${BRANCH}`);
    return true;
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('GitHub 404')) return false;
    throw err;
  }
}

/**
 * Is this a real key to the site – one that may write to the repository? Developer mode opens only
 * with one: the access code alone only keeps out the curious (it is checked in the browser).
 */
export async function keyCanWrite(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'X-GitHub-Api-Version': '2022-11-28' },
      cache: 'no-store',
    });
    if (!res.ok) return false;
    const repo = (await res.json()) as { permissions?: { push?: boolean } };
    return repo.permissions?.push === true;
  } catch {
    return false;
  }
}

export function getToken(): string {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? '';
  } catch {
    return '';
  }
}

/**
 * Wires a TokenField inside `root`: shows the key box or the "key saved" line. Returns read() – the saved
 * key or the typed one – and saved(), to call after a successful commit (keeps the typed key).
 */
export function wireTokenField(root: ParentNode): { refresh: () => void; read: () => string; saved: () => void } {
  const box = root.querySelector<HTMLElement>('[data-token-box]')!;
  const input = root.querySelector<HTMLInputElement>('[data-token-input]')!;
  const savedLine = root.querySelector<HTMLElement>('[data-token-saved]')!;
  const refresh = () => {
    const has = !!getToken();
    box.hidden = has;
    savedLine.hidden = !has;
  };
  root.querySelector('[data-token-forget]')!.addEventListener('click', () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* storage unavailable */
    }
    refresh();
  });
  return {
    refresh,
    read: () => getToken() || input.value.trim(),
    saved: () => {
      try {
        if (input.value.trim()) localStorage.setItem(TOKEN_KEY, input.value.trim());
      } catch {
        /* storage unavailable: the key is asked again next time */
      }
      input.value = '';
      refresh();
    },
  };
}

/** Phone photos are huge: scale to at most `max` px on the long side and save as JPEG (base64, no prefix). */
export async function shrinkToJpeg(file: File, max = 2400, quality = 0.85): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL('image/jpeg', quality).split(',')[1];
}

/** "Bali, rizsteraszok!" → "bali-rizsteraszok" (file names) */
/** a file as base64 (unchanged – a video, a song …) */
export function toBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).replace(/^data:[^,]*,/, ''));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}

export function slugify(text: string): string {
  return (
    text
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'foto'
  );
}
