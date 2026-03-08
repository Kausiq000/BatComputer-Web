"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorDot.current) return;

    // Smooth "buttery" follow for the single dot cursor
    const dotX = gsap.quickTo(cursorDot.current, "x", { duration: 0.15, ease: "power3.out" });
    const dotY = gsap.quickTo(cursorDot.current, "y", { duration: 0.15, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
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
        className="fixed top-0 left-0 w-4 h-4 bg-[#facc15] shadow-[0_0_15px_#facc15] rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      />
    </>
  );
}
