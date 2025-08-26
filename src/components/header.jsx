"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buildBookingUrl } from "@/lib/bookingLink";

export default function Header() {
  function openBooking() {
    const url = buildBookingUrl({ checkIn: "", checkOut: "", adults: 2, childrenAges: [], rooms: 1 });
    window.open(url, "_blank");
  }
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg" style={{ fontFamily: "var(--font-display)" }}>
          Sleeperwood Villa
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/rooms">Rooms</Link>
          <Link href="/experiences">Experiences</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/location">Location</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Button onClick={openBooking} className="bg-[var(--primary)] hover:opacity-90 text-[var(--primary-foreground)]">Check availability</Button>
      </div>
    </header>
  );
}

