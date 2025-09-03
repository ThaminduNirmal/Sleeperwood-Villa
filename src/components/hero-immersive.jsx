"use client";
import { useEffect, useState } from "react";

export default function HeroImmersive() {
  const [show, setShow] = useState(false);
  useEffect(function(){ setShow(true); }, []);
  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/hero/output.mp4"
        poster="/images/hero/605593870.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/40" />
      <div className="relative z-10 h-full">
        <div className="relative mx-auto max-w-7xl h-full px-4 pt-28 md:pt-36">
          <div className="md:absolute md:bottom-16 md:left-4 lg:left-8 max-w-3xl transition-all duration-700" style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(12px)" }}>
            <h1 className="text-white text-3xl md:text-5xl lg:text-7xl leading-tight font-semibold whitespace-nowrap" style={{ fontFamily: "var(--font-display)", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>Unwind in wood and greenery.</h1>
            <p className="mt-4 text-white/90 text-lg md:text-xl lg:text-2xl max-w-2xl" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.45)" }}>Moments from Unawatuna Beach.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 pb-[env(safe-area-inset-bottom)]">
              <a
                href="#rooms"
                className="inline-flex h-12 sm:h-14 min-w-[220px] px-7 sm:px-8 items-center justify-center rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg transition-transform will-change-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Check availability
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm flex flex-col items-center">
        <div className="w-3 h-3 border-b-2 border-r-2 border-white rotate-45 animate-bounce" />
      </div>
    </section>
  );
}

