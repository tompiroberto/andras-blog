/**
 * Folders of a category page (Random things, Adventures), in this order; each lists its posts (their
 * slugs). A post of the category that is in none of them goes to the last folder. The category page
 * shows a card for each folder; a click opens the folder (/[lang]/<category>/<folder>/) with its posts as
 * a list. background: the folder page's drawing (else the category's). blurb: a few words on its card (Hungarian, English). cover: a picture in src/assets/photos (else a post's cover or photo is used).
 */
export type Folder = { id: string; name: string; icon: string; cover?: string; posts: string[]; blurb?: [hu: string, en: string]; background?: 'eu' | 'map' | 'random' | 'adventure' | 'none' };

export const FOLDERS: Record<string, Folder[]> = {
  random: [
    { id: 'traveling', name: 'Traveling', icon: '✈️', cover: 'warsaw-flixbus.jpg', background: 'map', posts: ['traveling'], blurb: ["Repülőterek, buszok, vonatok – és minden, ami közben történik.", "Airports, buses, trains – and everything that happens on the way."] },
    { id: 'edits', name: 'Edits & videos', icon: '🎬', posts: ['edits'], blurb: ["Rövid videók a kalandjaimról – van, amit én vágtam, van, amit a barátaim.", "Short videos of my adventures – some cut by me, some by friends."] },
    { id: 'eating', name: 'Eating', icon: '🍽️', cover: 'andras-nutella.jpg', posts: ['eating-records'], blurb: ["Nagyon szeretek enni – és az a jó, hogy sokat is tudok.", "I really love eating – and the good thing is, I can eat a lot."] },
    { id: 'sleeping-rough', name: 'Sleeping rough', icon: '🏕️', background: 'adventure', cover: 'sleeping-rough-zamardi-2.jpg', posts: ['where-i-have-slept'], blurb: ["Low-budget utazóként edzenem kell arra, hogy egyszer szinte biztosan nem lesz tető a fejem fölött.", "As a low-budget traveller I have to train for the night when there will almost certainly be no roof over my head."] },
    { id: 'running', name: 'Running', icon: '🏃', cover: 'skyrunning-2026-3.jpg', posts: ['running-at-night'], blurb: ["A futás nem csak versenyekből áll – néha a legfurább helyeken és időpontokban.", "Running is not only races – sometimes it happens in the strangest places and at the strangest times."] },
    { id: 'random-facts', name: 'Random facts', icon: '💡', posts: ['utility-poles', 'chilean-cities-and-street-lamps', 'holding-my-breath'], blurb: ["Néhány random tény rólam és bármiről, amit csak meg akarok osztani.", "Some random facts about me and anything that I just want to share."] },
  ],
  adventures: [
    { id: 'cycling', name: 'Cycling', icon: '🚴', posts: ['cycling-to-my-classmate', 'cycling-300km-without-food'], blurb: ["Két kerék, sok kilométer – és néha egy kis éhség.", "Two wheels, lots of kilometres – and sometimes a bit of hunger."] },
    { id: 'long-distance-hiking', name: 'Long distance hiking', icon: '🥾', cover: 'kektura-tuzgyujtas.jpg', posts: ['walking-70km-csepel-island'], blurb: ["Amikor a lábam visz, nem a térkép szabja meg, meddig.", "When my legs carry me, it is not the map that decides how far."] },
    { id: 'hitchhiking', name: 'Hitchhiking', icon: '👍', posts: [], blurb: ["Kitartott hüvelykujj, egy tábla, és ami jön.", "A thumb out, a sign, and whatever comes."] },
    { id: 'random-travels', name: 'Random travels', icon: '🧭', cover: 'andras-sumeg.jpg', posts: [], blurb: ["Spontán utak, amik csak úgy jöttek.", "Spontaneous trips that just happened."] },
  ],
};
/** the Random things' folders (kept for the old name) */
export const RANDOM_FOLDERS = FOLDERS.random;

/** the folder of a post in a category with folders: its own "folder" (front matter), else the list above, else the last */
export function folderOfPost(category: string, slug: string, own?: string): string {
  const list = FOLDERS[category] ?? [];
  if (own && list.some((f) => f.id === own)) return own;
  return (list.find((f) => f.posts.includes(slug)) ?? list[list.length - 1])?.id ?? '';
}

const covers = import.meta.glob<ImageMetadata>('../assets/photos/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
/** the cover picture of a folder (from src/assets/photos), if it has one */
export const folderCover = (file?: string) => (file ? Object.entries(covers).find(([p]) => p.endsWith(`/${file}`))?.[1] : undefined);
