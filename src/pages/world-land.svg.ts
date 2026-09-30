/**
 * Continent outlines for the page background, generated at build time from world-atlas land-110m.
 * Plate carrée in a 360 × 180 viewBox (x = longitude + 180, y = 90 − latitude), stretched with
 * preserveAspectRatio="none" over the whole page – the same mapping as the coordinate grid.
 * Used as a CSS mask, so the colour comes from the current theme.
 */
import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { feature } from 'topojson-client';
import { geoEquirectangular, geoPath } from 'd3-geo';
import type { Topology, GeometryCollection } from 'topojson-specification';

export const GET: APIRoute = () => {
  const file = path.resolve(process.cwd(), 'node_modules/world-atlas/land-110m.json');
  const topo = JSON.parse(fs.readFileSync(file, 'utf8')) as Topology<{ land: GeometryCollection }>;
  // Equirectangular projection (it cuts shapes at the antimeridian correctly)
  const projection = geoEquirectangular()
    .scale(180 / Math.PI)
    .translate([180, 90])
    .precision(0.1);
  const d = (geoPath(projection)(feature(topo, topo.objects.land)) ?? '').replace(/-?\d+\.\d+/g, (n) =>
    String(Math.round(Number(n) * 100) / 100),
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 180" preserveAspectRatio="none">
<path d="${d}" fill="#000" fill-opacity="0.28" stroke="#000" stroke-width="1.4" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
</svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
