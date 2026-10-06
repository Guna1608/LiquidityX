"use client";

import type { ReactNode } from "react";
import { DeviceProvider } from "@/lib/device";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageTransition } from "@/components/motion/PageTransition";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <DeviceProvider>
      <SmoothScroll>
        <PageTransition>{children}</PageTransition>
      </SmoothScroll>
    </DeviceProvider>
  );
}
