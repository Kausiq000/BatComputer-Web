"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import BatmanCanvas2 from "@/components/Batmancanvas2";
import CustomCursor from "@/components/CustomCursor";
import { cinematicArchives } from "@/lib/movieData";

export default function BatcomputerMainframe() {
  const [activeSchematic, setActiveSchematic] = useState<string | null>(null);

  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const centerPanelRef = useRef<HTMLDivElement>(null);
  const scannerLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // GSAP Boot-Up Sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftPanelRef.current, { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 });
      gsap.fromTo(rightPanelRef.current, { x: 300, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.4 });
      gsap.fromTo(centerPanelRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.6 });
      
      // Live feed effect for GCPD scanner
      gsap.fromTo(scannerLinesRef.current, 
        { opacity: 0, x: -10 }, 
        { opacity: 1, x: 0, duration: 0.5, stagger: 1.2, ease: "power2.out", delay: 1.5 }
      );
    });
    return () => ctx.revert();
  }, []);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>, originalText: string) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" });
    
    // Matrix style subtitle decryption effect
    const titleElement = e.currentTarget.querySelector("h4");
    if (titleElement) {
      let iterations = 0;
      const interval = setInterval(() => {
        titleElement.innerText = originalText.split("")
          .map((letter, index) => {
            if (index < iterations) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        if (iterations >= originalText.length) clearInterval(interval);
        iterations += 1 / 3;
      }, 30);
    }
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseMoveMain = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <main 
      onMouseMove={handleMouseMoveMain}
      className="relative w-full min-h-screen bg-[#050505] p-6 selection:bg-[#facc15] selection:text-black pb-24"
    >
      {/* Dynamic Sonar Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: "linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage: "radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)"
        }}
      />

      <div className="relative z-10 w-full min-h-[90vh] grid grid-cols-12 gap-6">
        
        {/* Left Layer (Cols 1-3): Threat Radar & Live Scanner */}
        <div ref={leftPanelRef} className="col-span-12 md:col-span-3 flex flex-col gap-6 h-full">
          
          {/* Threat Radar */}
          <div className="bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <h3 className="text-[#facc15] font-oswald text-lg uppercase tracking-widest w-full text-left mb-6">Gotham Threat Level</h3>
            <div className="relative w-48 h-48 rounded-full border border-white/20 bg-black/40 overflow-hidden flex items-center justify-center">
              {/* Radar Grid */}
              <div className="absolute inset-0 rounded-full border-2 border-green-500/20 m-4"></div>
              <div className="absolute inset-0 rounded-full border-2 border-green-500/20 m-10"></div>
              <div className="absolute w-full h-[1px] bg-green-500/20"></div>
              <div className="absolute h-full w-[1px] bg-green-500/20"></div>
              {/* Hardware-Accelerated Radar Sweep */}
              <div 
                className="absolute w-full h-full rounded-full pointer-events-none opacity-50 animate-[spin_4s_linear_infinite]"
                style={{
                  background: "conic-gradient(from 0deg, transparent 70%, rgba(34, 197, 94, 0.4) 100%)",
                }}
              />
              {/* Dots */}
              <div className="absolute w-2 h-2 bg-red-500 rounded-full top-10 left-10 shadow-[0_0_10px_red]"></div>
              <div className="absolute w-2 h-2 bg-red-500 rounded-full bottom-16 right-12 shadow-[0_0_10px_red]"></div>
              <div className="absolute w-2 h-2 bg-yellow-500 rounded-full top-24 left-16 shadow-[0_0_10px_yellow]"></div>
            </div>
            <div className="w-full flex justify-between mt-6 text-xs font-inter text-neutral-500">
              <span>SCANNING...</span>
              <span className="text-red-500">3 THREATS</span>
            </div>
          </div>

          {/* Static GCPD Scanner Showpiece */}
          <div className="bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex-1 flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden">
            <h3 className="text-[#facc15] font-oswald text-lg uppercase tracking-widest mb-4">Live GCPD Scanner</h3>
            <div className="flex-1 space-y-3 font-mono text-xs text-green-500/80">
              {[
                "[10:41] 10-31 Crime in Progress: Crime Alley",
                "[10:42] Arkham Asylum cell block B secure",
                "[10:45] Unidentified vigilante spotted near Clock Tower",
                "[10:47] Signal intercepted: Joker toxin signature detected",
                "[10:51] WayneTech satellite repositioning...",
                "[11:04] Bat-Signal lit."
              ].map((log, i) => (
                <div 
                  key={i} 
                  ref={el => { scannerLinesRef.current[i] = el; }}
                  className={`border-b border-green-500/10 pb-2 break-words opacity-0 ${log.includes("Joker") ? "text-red-500/80" : ""} ${log.includes("vigilante") ? "text-yellow-500/80" : ""}`}
                >
                  {log.includes("Bat-Signal") ? <div className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></div> : null}
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Layer (Cols 4-9): 3D Model & Specs */}
        <div ref={centerPanelRef} className="col-span-12 md:col-span-6 relative rounded-2xl border border-white/10 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] min-h-[600px]">
          
          {/* High Performance Canvas 2 */}
          <BatmanCanvas2 />

          {/* Center UI Overlay */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">
            <div className="flex justify-between w-full">
              <div className="text-white/30 font-oswald text-sm tracking-[0.4em]">WAYNE SECURE NODE</div>
              <div className="text-white/30 font-oswald text-sm tracking-[0.4em]">ID: 849-B</div>
            </div>
            
            {/* High-Tech Spec Tooltip */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] max-w-md h-32 pointer-events-auto">
              {activeSchematic ? (
                <div className="w-full h-full bg-black/60 backdrop-blur-xl border border-[#facc15]/40 rounded-xl p-6 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h4 className="text-[#facc15] font-oswald text-xl uppercase tracking-wider mb-2">{activeSchematic}</h4>
                  <p className="text-neutral-300 font-inter text-sm leading-relaxed">
                    {activeSchematic === "Nomex Survival Suit" && "Kevlar bi-weave. Impact resistant. Flame retardant."}
                    {activeSchematic === "Chest Vector Plate" && "Titanium-dipped plate. Designed to draw fire to the most heavily armored point."}
                    {activeSchematic === "Utility Belt" && "Grapnel gun, Batarangs, EMP charges, smoke pellets, cryptographic sequencer."}
                  </p>
                </div>
              ) : (
                <div className="w-full h-full border border-white/10 rounded-xl border-dashed flex items-center justify-center p-6 text-neutral-500 text-sm font-inter tracking-wider text-center bg-black/20 backdrop-blur-sm">
                  CLICK HOTSPOTS TO VIEW TACTICAL SCHEMATICS
                </div>
              )}
            </div>
          </div>

          {/* Hotspots mapped to the massive scaled model */}
          <button 
            onClick={() => setActiveSchematic("Chest Vector Plate")}
            className="absolute top-[35%] left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-[#facc15] bg-[#facc15]/20 animate-pulse hover:bg-[#facc15] hover:scale-125 transition-all z-20 pointer-events-auto shadow-[0_0_15px_#facc15]"
          />
          <button 
            onClick={() => setActiveSchematic("Utility Belt")}
            className="absolute top-[50%] left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-[#facc15] bg-[#facc15]/20 animate-pulse hover:bg-[#facc15] hover:scale-125 transition-all z-20 pointer-events-auto shadow-[0_0_15px_#facc15]"
          />
          <button 
            onClick={() => setActiveSchematic("Nomex Survival Suit")}
            className="absolute top-[45%] left-[35%] w-6 h-6 rounded-full border-2 border-[#facc15] bg-[#facc15]/20 animate-pulse hover:bg-[#facc15] hover:scale-125 transition-all z-20 pointer-events-auto shadow-[0_0_15px_#facc15]"
          />

        </div>

        {/* Right Layer (Cols 10-12): Cinematic Archives */}
        <div ref={rightPanelRef} className="col-span-12 md:col-span-3 h-full flex flex-col bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <h3 className="text-[#facc15] font-oswald text-lg uppercase tracking-widest mb-6">Cinematic Archives</h3>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-hide">
            {cinematicArchives.map((movie) => (
              <Link 
                href={`/batcomputer/movie/${movie.id}`}
                key={movie.id}
                onMouseEnter={(e) => handleMouseEnter(e, movie.title)}
                onMouseLeave={handleMouseLeave}
                className="group relative block bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[#facc15]/50 hover:bg-[#27272a]/60 transition-all duration-300 cursor-none"
              >
                <div className="absolute top-0 right-0 p-3 flex flex-col items-end opacity-50 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-oswald text-white/50 tracking-widest leading-none">MK-{movie.year}</span>
                </div>
                <h4 className="text-white font-oswald text-xl uppercase tracking-wider mb-2 group-hover:text-[#facc15] group-hover:drop-shadow-[0_0_10px_rgba(250,204,21,0.5)] transition-colors">
                  {movie.title}
                </h4>
                <p className="text-neutral-400 font-inter text-xs leading-relaxed group-hover:text-neutral-300 line-clamp-3">
                  {movie.synopsis}
                </p>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Layer 3: Polish */}
      <CustomCursor />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}
