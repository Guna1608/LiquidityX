/**
 * Single global pointer tracker shared by every 3D scene and parallax effect.
 * Values are normalised to [-1, 1] and smoothed in `useFrame` by consumers.
 */
export const pointer = { x: 0, y: 0, active: false };

let attached = false;

export function attachPointer() {
  if (attached || typeof window === "undefined") return;
  attached = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType === "touch") return;
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.active = true;
    },
    { passive: true },
  );
}
