"use client";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import BookingCta from "@/components/booking-cta";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { buildBookingUrl } from "@/lib/bookingLink";
import { BedDouble, Users, Snowflake, ShowerHead, Trees, Utensils, Wifi, DoorOpen, Shirt, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function RoomCard({ room }) {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [idx, setIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showCal, setShowCal] = useState(true);
  const [CalendarComp, setCalendarComp] = useState(null);
  const img = room.images && room.images[0];
  const safeSrc = img ? encodeURI(img) : null;
  function openBooking() {
    const checkIn = range?.from ? range.from.toISOString().slice(0,10) : "";
    const checkOut = range?.to ? range.to.toISOString().slice(0,10) : "";
    const url = buildBookingUrl({ checkIn, checkOut, adults: 2, childrenAges: [], rooms: 1 });
    window.open(url, "_blank");
  }
  function next(e){ if (e) e.stopPropagation(); setIdx(function(v){ return (v + 1) % (room.images?.length || 1); }); }
  function prev(e){ if (e) e.stopPropagation(); setIdx(function(v){ return (v - 1 + (room.images?.length || 1)) % (room.images?.length || 1); }); }
  function jump(e, i){ if (e) e.stopPropagation(); setIdx(i); }

  // Lazy-load calendar on mount
  useEffect(function(){
    if (!CalendarComp) {
      const Comp = dynamic(() => import("@/components/availability-calendar"), { ssr: false });
      setCalendarComp(() => Comp);
    }
    setShowCal(true);
  }, [CalendarComp]);

  return (
    <Card className="overflow-hidden p-0">
      <div onClick={function(){ setLightboxOpen(true); }} className="aspect-[4/3] bg-secondary relative cursor-zoom-in select-none">
        {room.images && room.images.length ? (
          <Image src={encodeURI(room.images[idx])} alt={room.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        ) : (safeSrc ? <Image src={safeSrc} alt={room.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /> : null)}

        {/* Arrows */}
        {room.images && room.images.length > 1 ? (
          <>
            <button onClick={prev} aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center size-8 rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center size-8 rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
              <ChevronRight size={18} />
            </button>
            {/* Dots */}
            <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1.5">
              {room.images.map(function(_, i){
                const active = i === idx;
                return (
                  <span key={i} onClick={function(e){ jump(e, i); }} className={(active ? "bg-white" : "bg-white/60") + " inline-block h-1.5 w-1.5 rounded-full cursor-pointer"} />
                );
              })}
            </div>
          </>
        ) : null}
      </div>
      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-5xl">
          <DialogTitle className="sr-only">{room.name} photo</DialogTitle>
          <div className="relative w-full">
            <img src={encodeURI(room.images?.[idx] || "")} alt={room.name + " photo"} className="w-full h-auto rounded-xl shadow-2xl" />
            {room.images && room.images.length > 1 ? (
              <>
                <button onClick={prev} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center size-9 rounded-full bg-black/45 text-white backdrop-blur border border-white/20 hover:bg-black/60">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={next} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center size-9 rounded-full bg-black/45 text-white backdrop-blur border border-white/20 hover:bg-black/60">
                  <ChevronRight size={18} />
                </button>
                <div className="absolute -bottom-8 inset-x-0 hidden md:flex items-center justify-center gap-1.5">
                  {room.images.map(function(_, i){
                    const active = i === idx;
                    return (<span key={i} onClick={function(){ setIdx(i); }} className={(active ? "bg-white" : "bg-white/60") + " inline-block h-1.5 w-1.5 rounded-full cursor-pointer"} />);
                  })}
                </div>
              </>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
      <CardHeader>
        <CardTitle className="text-lg">{room.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Key facts */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5"><BedDouble size={16} /> {room.beds}</span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Users size={16} /> up to {room.capacity} guests</span>
        </div>

        {/* Amenity chips with icons */}
        <div className="mt-3 flex flex-wrap gap-2">
          {room.amenities.map(function(a){
            const Icon = mapAmenityToIcon(a);
            return (
              <span key={a} className="inline-flex items-center gap-1.5 rounded-full border bg-white/60 dark:bg-white/[0.06] backdrop-blur px-2.5 py-1 text-xs text-foreground">
                {Icon ? <Icon size={14} className="text-muted-foreground" /> : null}
                {a}
              </span>
            );
          })}
        </div>

        {/* Vibe/description */}
        <ul className="mt-3 text-sm text-muted-foreground space-y-1">
          {room.vibe.split(" • ").map(function(bit, i){ return (<li key={i} className="leading-relaxed">• {bit}</li>); })}
        </ul>
        <div className="mt-4">
          {CalendarComp ? (
            <CalendarComp roomId={room.id} value={range} onChange={setRange} />
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <BookingCta className="w-full rounded-none rounded-b-xl" checkIn={range?.from ? range.from.toISOString().slice(0,10) : ""} checkOut={range?.to ? range.to.toISOString().slice(0,10) : ""}>Book on Booking.com</BookingCta>
      </CardFooter>
    </Card>
  );
}

function mapAmenityToIcon(name){
  name = String(name).toLowerCase();
  if (name.includes("a/c") || name.includes("air")) return Snowflake;
  if (name.includes("bath")) return ShowerHead;
  if (name.includes("balcony")) return Trees;
  if (name.includes("kitchen")) return Utensils;
  if (name.includes("wi")) return Wifi;
  if (name.includes("entrance")) return DoorOpen;
  if (name.includes("wardrobe") || name.includes("closet")) return Shirt;
  return null;
}

