/**
 * Developer mode: write files straight into the GitHub repository from the browser, as ONE commit
 * (Git Data API), so Netlify rebuilds once. Needs a fine-grained personal access token with
 * "Contents: read and write" on this repository only; it is kept in this browser's localStorage.
 */
export const REPO = 'tompiroberto/andras-blog';
export const BRANCH = 'main';
export const TOKEN_KEY = 'andras-gh-token';

export type NewFile = { path: string } & ({ base64: string } | { text: string });

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
  });
  if (!res.ok) {
    let detail = '';
    try {
      detail = ((await res.json()) as { message?: string }).message ?? '';
    } catch {
      /* no JSON body */
    }
    throw new Error(`GitHub ${res.status}${detail ? `: ${detail}` : ''}`);
  }
  return (await res.json()) as T;
}

export async function commitFiles(token: string, files: NewFile[], message: string): Promise<void> {
  const ref = await gh<{ object: { sha: string } }>(token, `/git/ref/heads/${BRANCH}`);
  const parent = ref.object.sha;
  const head = await gh<{ tree: { sha: string } }>(token, `/git/commits/${parent}`);
  const tree = [];
  for (const f of files) {
    if ('base64' in f) {
      const blob = await gh<{ sha: string }>(token, '/git/blobs', { method: 'POST', body: { content: f.base64, encoding: 'base64' } });
      tree.push({ path: f.path, mode: '100644', type: 'blob', sha: blob.sha });
    } else {
      tree.push({ path: f.path, mode: '100644', type: 'blob', content: f.text });
    }
  }
  const newTree = await gh<{ sha: string }>(token, '/git/trees', { method: 'POST', body: { base_tree: head.tree.sha, tree } });
  const commit = await gh<{ sha: string }>(token, '/git/commits', { method: 'POST', body: { message, tree: newTree.sha, parents: [parent] } });
  await gh(token, `/git/refs/heads/${BRANCH}`, { method: 'PATCH', body: { sha: commit.sha } });
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
