"use client";

import { useEffect, useRef } from "react";
import { Power, Crosshair, Wind, Eye } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BatmanCanvas from "@/components/Batmancanvas";
import LoreArchives from "@/components/LoreArchives";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [btnText, setBtnText] = useState("Initialize Batcomputer");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const ctx = gsap.context(() => {
      // Stagger UI Elements entering viewport
      gsap.from(".fade-up", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // Animate Arsenal Cards
      gsap.from(".arsenal-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: "#arsenal-section",
          start: "top 75%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative w-full min-h-screen bg-[#050505] overflow-x-hidden">
      
      {/* Layer 1: The Fixed 3D Background */}
      <BatmanCanvas />

      {/* Layer 2: The Interactive UI Overlay */}
      <div className="relative z-10 w-full flex flex-col pt-32">

        {/* Nav: Removed per user request */}

        {/* Hero Section */}
        <section className="min-h-screen px-8 md:px-24 flex items-center pb-32 pt-20">
          <div className="max-w-3xl flex flex-col items-start gap-8">
            {/* The Batman Logo Title */}
            <div className="fade-up">
              <h2 className="text-4xl md:text-6xl font-black tracking-[0.3em] text-[#facc15] uppercase drop-shadow-[0_0_20px_rgba(250,204,21,0.3)]" style={{ fontFamily: "var(--font-oswald)" }}>
                THE BATMAN
              </h2>
            </div>
            
            <h1 className="fade-up text-6xl md:text-8xl font-black tracking-tighter text-[#ededed] uppercase leading-[0.9]" style={{ fontFamily: "var(--font-oswald)", letterSpacing: "-0.02em" }}>
              I AM THE<br /><span className="text-[#facc15]">NIGHT.</span>
            </h1>
            <p className="fade-up text-xl text-neutral-400 font-medium max-w-xl leading-relaxed">
              Accessing Wayne Enterprises Mainframe... Cryptographic handshake verified. Engage the Batcomputer tactical database to review the Dark Knight's arsenal, allies, and highest-priority targets.
            </p>
            <button 
              onClick={(e) => {
                // Change text and flash
                setBtnText("DECRYPTING WAYNE SECURE NODE...");
                gsap.to(e.currentTarget, { backgroundColor: "#facc15", color: "#000", duration: 0.1, yoyo: true, repeat: 5 });
                
                // Fade out to black and push route
                gsap.to("#transition-overlay", {
                  opacity: 1, 
                  duration: 1, 
                  delay: 0.5,
                  ease: "power2.inOut",
                  onComplete: () => {
                    router.push('/batcomputer');
                  }
                });
              }}
              className="fade-up mt-8 flex items-center gap-4 bg-[#facc15] text-black px-8 py-5 rounded-sm font-bold uppercase tracking-wider transition-colors shadow-[0_0_40px_rgba(250,204,21,0.2)] hover:shadow-[0_0_60px_rgba(250,204,21,0.4)]"
            >
              <Power className="w-5 h-5 animate-pulse" />
              {btnText}
            </button>
          </div>
        </section>

        {/* The Interactive Lore Archives */}
        <LoreArchives />

        {/* The Arsenal (Features) */}
        <section id="arsenal-section" className="min-h-screen px-8 md:px-24 py-32 flex flex-col justify-center border-t border-white/5 bg-gradient-to-b from-transparent to-black/80">
          <div className="max-w-xl mb-20 fade-up">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#ededed] uppercase" style={{ fontFamily: "var(--font-oswald)" }}>
              The Arsenal
            </h2>
            <div className="w-24 h-1 bg-[#facc15] mt-8 mb-6"></div>
            <p className="text-xl text-neutral-400">
              Wayne Enterprises classified R&D. Military-grade combat technology repurposed for Gotham's shadows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-up">
            {/* Card 1 */}
            <div className="arsenal-card backdrop-blur-md bg-black/40 border border-white/10 p-10 rounded-2xl hover:border-[#facc15]/30 hover:bg-[#27272a]/40 transition-all duration-500 group">
              <div className="bg-[#27272a] w-16 h-16 rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#facc15] transition-colors duration-500">
                <Crosshair className="w-8 h-8 text-[#ededed] group-hover:text-black transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#ededed] mb-4 font-oswald">Grapple Gun</h3>
              <p className="text-neutral-400 leading-relaxed font-inter">High-tensile ascension protocol using magnetic pneumatic firing. Tested to support 400lbs of dynamic load for urban traversal.</p>
            </div>

            {/* Card 2 */}
            <div className="arsenal-card backdrop-blur-md bg-black/40 border border-white/10 p-10 rounded-2xl hover:border-[#facc15]/30 hover:bg-[#27272a]/40 transition-all duration-500 group">
              <div className="bg-[#27272a] w-16 h-16 rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#facc15] transition-colors duration-500">
                <Wind className="w-8 h-8 text-[#ededed] group-hover:text-black transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#ededed] mb-4 font-oswald">Batarangs</h3>
              <p className="text-neutral-400 leading-relaxed font-inter">Precision crowd control. Programmable flight path and detonation delay.</p>
            </div>

            {/* Card 3 */}
            <div className="arsenal-card backdrop-blur-md bg-black/40 border border-white/10 p-10 rounded-2xl hover:border-[#facc15]/30 hover:bg-[#27272a]/40 transition-all duration-500 group">
              <div className="bg-[#27272a] w-16 h-16 rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#facc15] transition-colors duration-500">
                <Eye className="w-8 h-8 text-[#ededed] group-hover:text-black transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#ededed] mb-4 font-oswald">Sonar Vision</h3>
              <p className="text-neutral-400 leading-relaxed font-inter">Echolocation mapping active. Real-time tactical threat assessment.</p>
            </div>
          </div>
        </section>

      </div>

      {/* Layer 3: The Polish */}
      <CustomCursor />
      
      {/* GSAP Routing Overlay */}
      <div id="transition-overlay" className="fixed inset-0 bg-black z-[9999] pointer-events-none opacity-0"></div>

    </main>
  );
}
