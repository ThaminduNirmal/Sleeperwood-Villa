"use client";
import { useEffect, useRef, useState } from "react";

export function ScrollReveal({ children, className = "", threshold = 0.2, y = 24, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(function(){
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting) setShown(true); });
    }, { threshold });
    io.observe(el);
    return function(){ io.disconnect(); };
  }, [threshold]);
  const style = { transition: "opacity 600ms ease, transform 700ms ease", transitionDelay: delay + "ms", transform: shown ? "translateY(0)" : "translateY("+y+"px)", opacity: shown ? 1 : 0 };
  return <div ref={ref} style={style} className={className}>{children}</div>;
}

export function useParallax(speed = 0.3) {
  const ref = useRef(null);
  useEffect(function(){
    const el = ref.current;
    if (!el) return;
    function onScroll(){
      const rect = el.getBoundingClientRect();
      const offset = rect.top * speed;
      el.style.transform = "translate3d(0," + offset + "px,0)";
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return function(){ window.removeEventListener("scroll", onScroll); };
  }, [speed]);
  return ref;
}


