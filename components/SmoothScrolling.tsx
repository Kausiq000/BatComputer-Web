"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05, // Heavy, premium scroll feel
        duration: 2,
        smoothWheel: true,
      }}
    >
      {/* @ts-expect-error - ReactLenis types may conflict with React 19 children types */}
      {children}
    </ReactLenis>
  );
}
