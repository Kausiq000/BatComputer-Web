"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import gsap from "gsap";
import { cinematicArchives } from "@/lib/movieData";
import CustomCursor from "@/components/CustomCursor";

export default function MovieDetail() {
  const router = useRouter();
  const params = useParams();
  // Unwrap params using React.use() or access directly if not using async Server Component
  // In Next.js App Router client components, params is a promise in canary, but synchronous in stable.
  // We will assume synchronous access for this standard implementation.
  const id = params.id as string;
  
  const movie = cinematicArchives.find((m) => m.id === id);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!movie) return;
    
    const ctx = gsap.context(() => {
      // Background slow zoom with improved opacity
      gsap.fromTo(bgRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 0.6, duration: 2, ease: "power2.out" });
      
      // Text stagger in
      gsap.fromTo(
        ".stagger-item",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [movie]);

  if (!movie) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-red-500 font-oswald text-2xl tracking-widest uppercase">File Not Found</div>;
  }

  // Get a backdrop image based on the movie for maximum cinematic feel
  // Pulling specific images mapped explicitly for each film context.
  const getBackdrop = () => {
    switch (id) {
      case "tdk": return "/photos/HD-wallpaper-batman-joker-film-knight.jpg";
      case "thebatman": return "/photos/the batman.jpg";
      case "begins": return "/photos/batman begins.jpg";
      case "bvs": return "/photos/batman vs superman.jpg";
      case "tdkr": return "/photos/the dark knight rises.jpg";
      default: return "/photos/batman2.jpg";
    }
  };

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black text-white pb-24 selection:bg-[#facc15] selection:text-black">
      
      {/* Background Image Layer perfectly fitted and set to fixed so it persists while scrolling */}
      <div 
        ref={bgRef}
        className="fixed inset-0 z-0 bg-contain bg-top mt-12 bg-no-repeat"
        style={{ backgroundImage: `url('${getBackdrop()}')` }}
      />

      {/* Heavy Cinematic Gradient Overlay so text isn't overpowered */}
      <div className="fixed inset-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-20 min-h-screen p-8 md:p-24 flex flex-col justify-end">
        
        {/* Back Button */}
        <button 
          onClick={() => {
            gsap.to(containerRef.current, { opacity: 0, duration: 0.5, onComplete: () => router.back() });
          }}
          className="absolute top-12 left-12 flex items-center gap-2 text-neutral-400 hover:text-[#facc15] transition-colors font-oswald tracking-widest uppercase text-sm border border-white/10 hover:border-[#facc15]/50 px-6 py-3 rounded-full cursor-none z-50 group hover:bg-[#27272a]/60 backdrop-blur-md"
        >
           <span className="group-hover:-translate-x-1 transition-transform">←</span> ACCESS MAINFRAME
        </button>

        {/* Text Container */}
        <div ref={textGroupRef} className="max-w-5xl">
          <div className="stagger-item text-[#facc15] font-oswald tracking-[0.4em] mb-6 uppercase text-sm md:text-base opacity-80 backdrop-blur-sm border border-white/10 inline-block px-4 py-2 rounded-sm bg-black/40">
            CINEMATIC ARCHIVE FILE MK-{movie.year}
          </div>
          
          <h1 className="stagger-item text-6xl md:text-8xl lg:text-9xl font-black font-oswald uppercase leading-none mb-12 drop-shadow-[0_0_30px_rgba(250,204,21,0.2)]">
            {movie.title}
          </h1>

          <div className="stagger-item grid grid-cols-2 lg:grid-cols-5 gap-8 mb-16 border-y border-white/5 py-10 bg-black/20 backdrop-blur-md p-8 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div>
              <p className="text-neutral-500 font-oswald tracking-widest text-xs mb-2">YEAR</p>
              <p className="text-white font-inter text-xl font-medium">{movie.year}</p>
            </div>
            <div>
              <p className="text-neutral-500 font-oswald tracking-widest text-xs mb-2">DIRECTOR</p>
              <p className="text-white font-inter text-xl font-medium">{movie.director}</p>
            </div>
            <div>
              <p className="text-neutral-500 font-oswald tracking-widest text-xs mb-2">LEAD CAST</p>
              <p className="text-white font-inter text-xl font-medium">{movie.cast}</p>
            </div>
            <div>
              <p className="text-neutral-500 font-oswald tracking-widest text-xs mb-2">BOX OFFICE</p>
              <p className="text-[#facc15] font-inter text-xl font-bold tracking-tight">{movie.boxOffice}</p>
            </div>
            <div>
              <p className="text-neutral-500 font-oswald tracking-widest text-xs mb-2">IMDB RATING</p>
              <p className="text-[#facc15] font-inter text-2xl font-black drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">{movie.imdb}</p>
            </div>
          </div>

          <p className="stagger-item text-neutral-300 text-xl md:text-3xl font-inter leading-relaxed max-w-4xl text-balance">
            {movie.synopsis}
          </p>
        </div>
      </div>

      <CustomCursor />
    </main>
  );
}
