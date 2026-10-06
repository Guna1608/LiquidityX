"use client";

import { Environment, Float, Lightformer } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CurvePath, Group, LineCurve3, TubeGeometry, Vector3 } from "three";
import { pointer } from "@/lib/pointer";
import { SceneCanvas } from "./SceneCanvas";
import { GridFallback } from "./Fallbacks";
import { Particles } from "./parts/Particles";

/** The LX monogram as a faceted metal object, built from the 2D logo paths. */
const v = (x: number, y: number) => new Vector3((x - 32) / 10, -(y - 31) / 10, 0);

function bar(points: [number, number][], radius: number) {
  const path = new CurvePath<Vector3>();
  for (let i = 0; i < points.length - 1; i++) path.add(new LineCurve3(v(...points[i]), v(...points[i + 1])));
  return new TubeGeometry(path, 64 * points.length, radius, 4, false);
}

function Monogram() {
  const group = useRef<Group>(null);
  const geos = useMemo(
    () => ({
      l: bar([[18, 16], [18, 46], [30, 46]], 0.17),
      x1: bar([[30, 16], [46, 46]], 0.17),
      x2: bar([[46, 16], [30, 46]], 0.17),
      corners: [
        bar([[6, 16], [6, 6], [16, 6]], 0.05),
        bar([[48, 6], [58, 6], [58, 16]], 0.05),
        bar([[58, 48], [58, 58], [48, 58]], 0.05),
        bar([[16, 58], [6, 58], [6, 48]], 0.05),
      ],
    }),
    [],
  );

  useFrame(({ clock }, d) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.exp(-d * 3);
    g.rotation.y += (pointer.x * 0.6 + Math.sin(clock.elapsedTime * 0.3) * 0.25 - g.rotation.y) * k;
    g.rotation.x += (-pointer.y * 0.35 - g.rotation.x) * k;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={group} rotation={[0, 0, 0]}>
        {[geos.l, geos.x1, geos.x2].map((g, i) => (
          <mesh key={i} geometry={g}>
            <meshStandardMaterial color="#e2bf77" metalness={0.85} roughness={0.28} envMapIntensity={1.6} emissive="#4a3412" emissiveIntensity={0.6} />
          </mesh>
        ))}
        {geos.corners.map((g, i) => (
          <mesh key={i} geometry={g}>
            <meshStandardMaterial color="#ff7a1a" metalness={0.8} roughness={0.35} emissive="#2c1f0a" emissiveIntensity={0.6} />
          </mesh>
        ))}
        <mesh position={v(38, 31)}>
          <sphereGeometry args={[0.2, 24, 24]} />
          <meshBasicMaterial color="#fff3e6" toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

export default function LXObject3D({ className }: { className?: string }) {
  return (
    <SceneCanvas className={className ?? "absolute inset-0"} camera={{ position: [0, 0, 9], fov: 38 }} fallback={<GridFallback />}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#fff3e6" />
      <pointLight position={[-4, -2, 4]} intensity={30} color="#8ea3b8" />
      <pointLight position={[4, 3, 3]} intensity={40} color="#ffbd7d" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color="#fff3e6" position={[0, 4, 4]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#8ea3b8" position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffbd7d" position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="ring" intensity={1} color="#ffffff" position={[0, 0, -6]} scale={4} />
      </Environment>
      <Monogram />
      <Particles count={260} spread={[12, 9, 8]} color="#ffbd7d" size={1.1} opacity={0.7} far={20} />
      <Particles count={100} spread={[12, 9, 8]} color="#8ea3b8" size={0.9} opacity={0.5} far={20} seed={5} />
    </SceneCanvas>
  );
}
