"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, ShaderMaterial } from "three";
import { seeded } from "./palette";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uFar;
  uniform float uSpeed;
  attribute float aScale;
  attribute float aPhase;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.25 * uSpeed + aPhase) * 0.22;
    p.x += cos(uTime * 0.18 * uSpeed + aPhase * 1.7) * 0.16;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (12.0 / -mv.z);
    float twinkle = 0.55 + 0.45 * sin(uTime * 1.1 + aPhase * 7.0);
    vAlpha = twinkle * smoothstep(uFar, uFar * 0.25, -mv.z);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, a * a * vAlpha * uOpacity);
  }
`;

/** Soft, twinkling, drifting point field with depth fade. */
export function Particles({
  count = 600,
  spread = [30, 14, 30],
  center = [0, 0, 0],
  color = "#ffbd7d",
  size = 1.4,
  opacity = 0.8,
  speed = 1,
  far = 40,
  seed = 7,
}: {
  count?: number;
  spread?: [number, number, number];
  center?: [number, number, number];
  color?: string;
  size?: number;
  opacity?: number;
  speed?: number;
  far?: number;
  seed?: number;
}) {
  const dpr = useThree((s) => s.viewport.dpr);
  const material = useRef<ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const rand = seeded(seed);
    const pos = new Float32Array(count * 3);
    const scale = new Float32Array(count);
    const phase = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = center[0] + (rand() - 0.5) * spread[0];
      pos[i * 3 + 1] = center[1] + (rand() - 0.5) * spread[1];
      pos[i * 3 + 2] = center[2] + (rand() - 0.5) * spread[2];
      scale[i] = 0.3 + rand() * rand() * 1.7;
      phase[i] = rand() * Math.PI * 2;
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("aScale", new BufferAttribute(scale, 1));
    g.setAttribute("aPhase", new BufferAttribute(phase, 1));
    return g;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, seed, spread[0], spread[1], spread[2], center[0], center[1], center[2]]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: size },
      uPixelRatio: { value: Math.min(dpr, 2) },
      uFar: { value: far },
      uSpeed: { value: speed },
      uColor: { value: new Color(color) },
      uOpacity: { value: opacity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((_, delta) => {
    if (material.current) material.current.uniforms.uTime.value += delta;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
