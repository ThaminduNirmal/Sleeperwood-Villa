"use client";
import Link from "next/link";
import { useRef } from "react";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  function onMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - rect.left + "px");
    el.style.setProperty("--my", e.clientY - rect.top + "px");
  }
  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "-999px");
    el.style.setProperty("--my", "-999px");
  }
  return (
    <footer className="mt-16">
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative overflow-hidden border-t bg-white/60 dark:bg-white/[0.04] backdrop-blur ring-1 ring-white/10"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />
        <span aria-hidden className="pointer-events-none absolute -inset-px opacity-0 hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(220px circle at var(--mx, -999px) var(--my, -999px), color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)" }} />

        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-4 text-sm">
          <div>
            <div className="font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>Stay</div>
            <ul className="space-y-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#rooms">Rooms</Link></li>
              <li><Link href="/#experiences">Experiences</Link></li>
              <li><Link href="/#gallery">Gallery</Link></li>
              <li><Link href="/#location">Location</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>Contact</div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><Phone className="size-4 text-muted-foreground" /><a href="tel:+94713556970">071 355 6970</a></li>
              <li className="flex items-center gap-2"><Mail className="size-4 text-muted-foreground" /><a href="mailto:sleeperwooduna@gmail.com">sleeperwooduna@gmail.com</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>Social</div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><Instagram className="size-4 text-muted-foreground" /><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li className="flex items-center gap-2"><Facebook className="size-4 text-muted-foreground" /><a href="#" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>Address</div>
            <div className="text-muted-foreground">34/1 New Dewata Rd<br/>Unawatuna, Sri Lanka</div>
            <a className="mt-3 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:bg-white/50 transition-colors" href="https://maps.app.goo.gl/crBKPC9sTSymAQnG7" target="_blank" rel="noopener noreferrer">
              <MapPin className="size-4" /> Open in Google Maps
            </a>
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground py-4 border-t border-border/60">© 2025 Sleeperwood</div>
      </div>
    </footer>
  );
}

