"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { useDevice } from "@/lib/device";
import { cn } from "@/lib/cn";

/**
 * Every WebGL scene mounts through here:
 *  - lazy: the Canvas mounts only when the container nears the viewport
 *  - paused: frameloop stops when off-screen (or when `paused` is set)
 *  - tiered: DPR / antialias by device tier; `low` tier renders `fallback`
 *  - resilient: context loss or a render error swaps to `fallback`
 */
type Props = {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  camera?: CanvasProps["camera"];
  paused?: boolean;
  /** Keep mounted even when off-screen (fixed backgrounds). */
  eager?: boolean;
  onVisibility?: (visible: boolean) => void;
};

class SceneErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err: unknown) {
    if (process.env.NODE_ENV !== "production") console.warn("[SceneCanvas] WebGL scene failed, using fallback.", err);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function SceneCanvas({ children, className, fallback = null, camera, paused = false, eager = false, onVisibility }: Props) {
  const { ready, tier } = useDevice();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(eager);
  const [mounted, setMounted] = useState(eager);
  const [lost, setLost] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        onVisibility?.(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin: "240px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onVisibility]);

  const useFallback = !ready || tier === "low" || lost;

  return (
    <div ref={ref} className={cn("pointer-events-none", className)} aria-hidden>
      {ready && useFallback && fallback}
      {!useFallback && mounted && (
        <SceneErrorBoundary fallback={fallback}>
          <Canvas
            frameloop={inView && !paused ? "always" : "never"}
            dpr={tier === "high" ? [1, 1.75] : [1, 1.25]}
            gl={{ antialias: tier === "high", alpha: true, powerPreference: "high-performance", stencil: false }}
            camera={camera ?? { position: [0, 0, 8], fov: 42, near: 0.1, far: 80 }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
              gl.domElement.addEventListener("webglcontextlost", (e) => {
                e.preventDefault();
                setLost(true);
              });
            }}
          >
            {children}
          </Canvas>
        </SceneErrorBoundary>
      )}
    </div>
  );
}
