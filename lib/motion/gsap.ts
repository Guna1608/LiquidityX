"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

export function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
    gsap.defaults({ ease: "expo.out", duration: 1.1 });
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

ensureGsap();

export { gsap, ScrollTrigger, useGSAP };
