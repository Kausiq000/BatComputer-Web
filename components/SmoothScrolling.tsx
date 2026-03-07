"use client";

import { ReactNode } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05, // Heavy, premium scroll feel
        duration: 2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
