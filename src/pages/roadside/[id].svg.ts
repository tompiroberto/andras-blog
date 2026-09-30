/**
 * One roadside tile per scrollbar country (src/lib/roadside.ts), fetched by the Roadside component only
 * when the page is switched to horizontal – so the drawings do not weigh down every page.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { PROFILES, TILE_H, TILE_W, buildTile } from '../../lib/roadside';

export const getStaticPaths: GetStaticPaths = () => Object.keys(PROFILES).map((id) => ({ params: { id } }));

export const GET: APIRoute = ({ params }) => {
  const profile = PROFILES[params.id as string];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" class="roadside__tile" viewBox="0 0 ${TILE_W} ${TILE_H}" width="${TILE_W}" height="${TILE_H}" focusable="false">${buildTile(profile)}</svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
