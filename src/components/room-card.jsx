"use client";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import BookingCta from "@/components/booking-cta";
import AvailabilityCalendar from "@/components/availability-calendar";
import { useState } from "react";
import { buildBookingUrl } from "@/lib/bookingLink";

export default function RoomCard({ room }) {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const img = room.images && room.images[0];
  const safeSrc = img ? encodeURI(img) : null;
  function openBooking() {
    const checkIn = range?.from ? range.from.toISOString().slice(0,10) : "";
    const checkOut = range?.to ? range.to.toISOString().slice(0,10) : "";
    const url = buildBookingUrl({ checkIn, checkOut, adults: 2, childrenAges: [], rooms: 1 });
    window.open(url, "_blank");
  }
  return (
    <Card className="overflow-hidden">
      <div onClick={openBooking} className="aspect-[4/3] bg-secondary relative cursor-pointer">
        {safeSrc ? (
          <Image src={safeSrc} alt={room.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        ) : null}
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{room.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">{room.vibe}</div>
        <div className="mt-3 text-sm">{room.beds} • up to {room.capacity} guests</div>
        <div className="mt-2 text-xs text-muted-foreground">{room.amenities.join(" • ")}</div>
        <div className="mt-4">
          <AvailabilityCalendar roomId={room.id} value={range} onChange={setRange} />
        </div>
      </CardContent>
      <CardFooter>
        <BookingCta className="w-full" checkIn={range?.from ? range.from.toISOString().slice(0,10) : ""} checkOut={range?.to ? range.to.toISOString().slice(0,10) : ""}>See dates on Booking.com</BookingCta>
      </CardFooter>
    </Card>
  );
}

