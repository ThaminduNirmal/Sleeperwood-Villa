"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buildBookingUrl } from "@/lib/bookingLink";

export default function BookingStickyBar() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  function openBooking() {
    const url = buildBookingUrl({ checkIn, checkOut, adults, childrenAges: [], rooms: 1 });
    window.open(url, "_blank");
  }
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2">
        <Input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="flex-1" />
        <Input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="flex-1" />
        <Input type="number" min={1} value={adults} onChange={e => setAdults(Number(e.target.value || 1))} className="w-20" />
        <Button onClick={openBooking} className="bg-[var(--primary)] text-[var(--primary-foreground)]">Booking.com</Button>
      </div>
    </div>
  );
}

