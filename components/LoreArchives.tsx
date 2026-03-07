"use client";

import { useState, useRef } from "react";
import { archiveEntries } from "@/lib/archivesData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function LoreArchives() {
  const [activeEntry, setActiveEntry] = useState(archiveEntries[0]);
  const [prevEntry, setPrevEntry] = useState(archiveEntries[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const newImgRef = useRef<HTMLImageElement>(null);
  const oldImgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (activeEntry.id === prevEntry.id) return;

    // The Outgoing Image (Scale up and fade out)
    gsap.to(oldImgRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 1,
      ease: "power4.inOut"
    });

    // The Incoming Image Swipe (Clip-path vertical wipe + slight scale)
    gsap.fromTo(newImgRef.current,
      { clipPath: "inset(100% 0 0 0)", scale: 1.1, opacity: 0 },
      { clipPath: "inset(0% 0 0 0)", scale: 1.0, opacity: 0.6, duration: 1, ease: "power4.inOut", onComplete: () => {
          setPrevEntry(activeEntry);
          setIsAnimating(false);
      }}
    );

    // The Text Reveal (Stagger fade up in lore box)
    gsap.fromTo(".lore-stagger > *",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.3 }
    );
  }, { dependencies: [activeEntry], scope: containerRef });

  const handleHoverEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { color: "#facc15", x: 10, duration: 0.2 });
    gsap.to(e.currentTarget, { opacity: 0.8, duration: 0.1, yoyo: true, repeat: 3 });
  };

  const handleHoverLeave = (e: React.MouseEvent<HTMLButtonElement>, isActive: boolean) => {
    if (!isActive) {
      gsap.to(e.currentTarget, { color: "#71717a", x: 0, opacity: 1, duration: 0.2 });
    } else {
      gsap.to(e.currentTarget, { color: "#facc15", x: 10, opacity: 1, duration: 0.2 });
    }
  };

  return (
    <div id="archives-section" ref={containerRef} className="relative z-10 w-full h-screen bg-transparent flex flex-col md:flex-row items-center border-t border-white/5">
      {/* Left Panel (30% on Desktop, 50% on Mobile) */}
      <div className="w-full md:w-[30%] h-[40vh] md:h-screen flex flex-col justify-center px-8 md:px-12 gap-4 md:gap-8 bg-black/80 border-b md:border-b-0 md:border-r border-white/5 backdrop-blur-md z-20">
        <h2 className="text-[#facc15] font-oswald text-xl uppercase tracking-[0.3em] mb-4">Batcomputer Archives</h2>
        <div className="flex flex-col gap-6 items-start">
          {archiveEntries.map((entry) => {
            const isActive = activeEntry.id === entry.id;
            return (
              <button
                key={entry.id}
                onClick={() => {
                   if (isAnimating || entry.id === activeEntry.id) return;
                   setIsAnimating(true);
                   setActiveEntry(entry);
                }}
                onMouseEnter={handleHoverEnter}
                onMouseLeave={(e) => handleHoverLeave(e, isActive)}
                className={`font-oswald text-3xl lg:text-5xl uppercase font-black tracking-widest text-left transition-all duration-300 ${
                  isActive
                    ? "text-yellow-500 border-l-4 border-yellow-500 pl-4 translate-x-[10px]"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {entry.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Panel (70% on Desktop, 50% on Mobile) */}
      <div className="w-full md:w-[70%] relative w-full h-full overflow-hidden bg-zinc-900 rounded-2xl">
        
        <img
          ref={oldImgRef}
          src={prevEntry.image}
          alt={prevEntry.name}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        />

        <img
          ref={newImgRef}
          src={activeEntry.image}
          alt={activeEntry.name}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        />

        {/* The Lore Box Layer on Top */}
        <div className="relative z-10 p-8 mt-auto flex flex-col justify-end h-full bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="lore-stagger mt-auto max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-2xl">
          <h3 className="text-yellow-500 text-4xl lg:text-6xl font-black uppercase font-oswald mb-6 tracking-wide drop-shadow-lg">
            {activeEntry.classification}
          </h3>
          <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-inter font-medium">
            {activeEntry.bio}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
