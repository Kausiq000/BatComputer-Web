"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorDot.current || !cursorRing.current) return;

    // Use gsap.quickTo for high performance following
    const dotX = gsap.quickTo(cursorDot.current, "x", { duration: 0, ease: "none" });
    const dotY = gsap.quickTo(cursorDot.current, "y", { duration: 0, ease: "none" });

    // The ring trails behind with a short duration for the "buttery" feel
    const ringX = gsap.quickTo(cursorRing.current, "x", { duration: 0.15, ease: "power3.out" });
    const ringY = gsap.quickTo(cursorRing.current, "y", { duration: 0.15, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDot}
        className="fixed top-0 left-0 w-2 h-2 bg-[#facc15] rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={cursorRing}
        className="fixed top-0 left-0 w-8 h-8 border border-[#facc15]/50 rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
