/**
 * Where András is right now (src/data/whereabouts.json): the last step that has started.
 */
import data from '../data/whereabouts.json';

export type Step = { from: string; country: string; key: string };
export const STEPS = data.steps as Step[];

export function stepAt(time: number = Date.now()): Step | undefined {
  return [...STEPS].filter((s) => Date.parse(s.from) <= time).pop();
}
