"use client";

import dynamic from "next/dynamic";

/** Code-split WebGL entry point — three.js only downloads where the object is used. */
export const LXObject3D = dynamic(() => import("./LXObject3D"), { ssr: false });
