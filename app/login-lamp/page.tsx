"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import CustomCursor from "@/components/CustomCursor";

export default function LoginLamp() {
  const [isOn, setIsOn] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const lightBeamRef = useRef<HTMLDivElement>(null);
  const stringRef = useRef<HTMLDivElement>(null);

  const toggleLamp = () => {
    const nextState = !isOn;
    
    // Animate the pull string being pulled down
    gsap.to(stringRef.current, {
      y: 15,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
      onComplete: () => {
        setIsOn(nextState);
      }
    });

    if (nextState) {
      // Turn ON animations
      gsap.to(bgRef.current, { backgroundColor: "#1e2128", duration: 0.6, ease: "power2.out" });
      gsap.to(formRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" });
      gsap.to(lightBeamRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
    } else {
      // Turn OFF animations
      gsap.to(bgRef.current, { backgroundColor: "#0a0a0c", duration: 0.6, ease: "power2.out" });
      gsap.to(formRef.current, { opacity: 0.1, y: 20, duration: 0.6, ease: "power2.in" });
      gsap.to(lightBeamRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" });
    }
  };

  // Initial setup
  useEffect(() => {
    gsap.set(formRef.current, { opacity: 0.1, y: 20 });
    gsap.set(lightBeamRef.current, { opacity: 0 });
    gsap.set(bgRef.current, { backgroundColor: "#0a0a0c" });
  }, []);

  return (
    <main ref={bgRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden transition-colors selection:bg-[#facc15] selection:text-black">
      
      {/* Title */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50">
         <h1 className="text-white text-3xl font-light tracking-widest font-inter">Login Lamp</h1>
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-24 px-8">
        
        {/* The Lamp */}
        <div className="relative flex flex-col items-center">
          
          {/* Light Beam (Behind the lamp) */}
          <div 
            ref={lightBeamRef}
            className="absolute top-[80px] w-[300px] h-[400px] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(255, 250, 220, 0.4) 0%, rgba(255, 250, 220, 0) 100%)",
              clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
              filter: "blur(20px)"
            }}
          />

          {/* Lamp Shade & Glow */}
          <div className={`relative z-30 w-56 h-24 rounded-[100px_100px_10px_10px] transition-all duration-500 ease-in-out ${isOn ? 'bg-[#fffae6] shadow-[0_0px_80px_rgba(255,250,220,0.9)]' : 'bg-[#e0e0e0]'}`} />
          
          {/* Middle Stand */}
          <div className={`z-20 w-5 h-56 transition-all duration-500 ease-in-out ${isOn ? 'bg-[#f4ebd0]' : 'bg-[#d0d0d0]'}`} />
          
          {/* Base */}
          <div className={`z-20 w-40 h-6 rounded-t-xl rounded-b-sm transition-all duration-500 ease-in-out ${isOn ? 'bg-[#f4ebd0]' : 'bg-[#d0d0d0]'}`} />

          {/* Interactive Pull String */}
          <div 
            ref={stringRef}
            onClick={toggleLamp}
            className="absolute top-[96px] right-[48px] z-10 cursor-pointer flex flex-col items-center group pointer-events-auto"
            style={{ paddingBottom: '20px' }} 
          >
            {/* The literal string */}
            <div className={`w-[2px] h-20 transition-colors duration-500 ease-in-out ${isOn ? 'bg-[#c2aa70]' : 'bg-[#888]'}`} />
            {/* The little wooden ball */}
            <div className={`w-5 h-5 rounded-full transition-colors duration-500 shadow-md group-hover:scale-125 ease-in-out ${isOn ? 'bg-[#d49938]' : 'bg-[#666]'}`} />
          </div>

        </div>

        {/* The Login Form */}
        <div 
          ref={formRef}
          className="relative z-20 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl"
        >
          <h2 className="text-white text-3xl font-bold mb-8 font-inter">Welcome</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium ml-1">Username</label>
              <input 
                type="text" 
                placeholder="batman_returns"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#facc15]/50 focus:bg-black/60 transition-all font-mono"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#facc15]/50 focus:bg-black/60 transition-all font-mono"
              />
            </div>
            
            <button className="w-full mt-4 bg-white text-black font-bold py-4 rounded-xl hover:bg-[#fffae6] hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95">
              Sign In
            </button>
          </div>
        </div>

      </div>

      <CustomCursor />
    </main>
  );
}
