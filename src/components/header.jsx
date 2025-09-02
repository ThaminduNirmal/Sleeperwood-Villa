"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buildBookingUrl } from "@/lib/bookingLink";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [atTop, setAtTop] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(function(){
    setMounted(true);
    function onScroll(){ setAtTop(window.scrollY <= 8); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return function(){ window.removeEventListener("scroll", onScroll); };
  }, []);
  function openBooking() {
    const url = buildBookingUrl({ checkIn: "", checkOut: "", adults: 2, childrenAges: [], rooms: 1 });
    window.open(url, "_blank");
  }
  return (
    <header className={(atTop ? "bg-transparent border-none shadow-none backdrop-blur-0 " : "bg-white/60 border-b border-border shadow-sm backdrop-blur-md ") + "fixed top-0 left-0 right-0 z-50 transition-colors"}>
      <div suppressHydrationWarning className={(mounted ? (atTop ? "text-white " : "text-foreground ") : "") + "mx-auto max-w-6xl px-4 py-3 flex items-center justify-between"}>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.PNG" alt="Sleeperwood logo" width={40} height={40} className="rounded-sm object-cover" priority unoptimized />
          <span className="hidden sm:inline font-semibold text-lg" style={{ fontFamily: "var(--font-display)" }}>Sleeperwood Villa</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#rooms">Rooms</a>
          <a href="#experiences">Experiences</a>
          <a href="#gallery">Gallery</a>
          <a href="#location">Location</a>
          <a href="#contact">Contact</a>
        </nav>
        <Button
          suppressHydrationWarning
          onClick={openBooking}
          variant={atTop ? "ghost" : "default"}
          className={(mounted ? (atTop ? "text-white" : "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90") : "")}
        >
          View on Booking.com
        </Button>
      </div>
    </header>
  );
}

