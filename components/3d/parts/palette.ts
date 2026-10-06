import { Color } from "three";

export const C = {
  gold: new Color("#ffbd7d"),
  goldDeep: new Color("#ff7a1a"),
  goldPale: new Color("#fff3e6"),
  cyan: new Color("#8ea3b8"),
  cyanPale: new Color("#c4f3f7"),
  graphite: new Color("#1b2029"),
  ink: new Color("#050608"),
  down: new Color("#ff6a4d"),
};

/** Deterministic PRNG so scenes look identical across reloads (no layout "jumps"). */
export function seeded(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const smooth = (e0: number, e1: number, x: number) => {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};
