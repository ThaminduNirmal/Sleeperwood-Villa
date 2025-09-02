"use client";
import { useEffect, useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function AvailabilityCalendar({ roomId, value, onChange }) {
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(function() {
    let active = true;
    setLoading(true);
    setError(false);
    fetch(`/api/availability/${roomId}`)
      .then(function(r){ return r.json(); })
      .then(function(d){ if (active) { setBooked(d.booked || []); setError(Boolean(d.error)); } })
      .catch(function(){ if (active) setError(true); })
      .finally(function(){ if (active) setLoading(false); });
    return function(){ active = false; };
  }, [roomId]);
  const disabled = useMemo(function(){
    return function(date){
      var d = ymd(date);
      // Disable past dates
      var today = ymd(new Date());
      if (d < today) return true;
      // Disable booked ranges (compare by Y-M-D to avoid timezone drift)
      for (var i=0;i<booked.length;i++){
        var r = booked[i];
        if (d >= r.start && d < r.end) return true;
      }
      return false;
    };
  }, [booked]);
  const [internalRange, setInternalRange] = useState({ from: undefined, to: undefined });
  const range = value || internalRange;
  function handleSelect(next) {
    if (onChange) onChange(next);
    else setInternalRange(next);
    if (next?.from && next?.to) setMobileOpen(false);
  }
  return (
    <div className="relative border rounded-lg overflow-hidden">
      {/* Desktop/tablet inline calendar */}
      <div className="hidden md:block">
        <Calendar
          mode="range"
          selected={range}
          onSelect={handleSelect}
          disabled={disabled}
          initialFocus
          modifiers={{ booked: booked.filter(function(r){ return r.kind === "booked"; }), closed: booked.filter(function(r){ return r.kind === "closed"; }) }}
          modifiersStyles={{
            booked: { backgroundColor: "rgba(229,72,77,0.18)", color: "inherit" },
            closed: { backgroundColor: "rgba(90,62,43,0.18)", color: "inherit" },
          }}
          className="mx-auto"
        />
        <div className="px-3 pb-3 text-xs text-muted-foreground flex items-center justify-between">
          <span>
            {error ? "Could not load availability" : "Live availability on Booking.com"}
          </span>
          {range?.from && range?.to ? <span>{diffDays(range.from, range.to)} nights</span> : null}
        </div>
        <div className="px-3 pb-3 text-[10px] text-muted-foreground flex items-center gap-3">
          <span className="inline-flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: "rgba(229,72,77,0.35)" }} /> Booked</span>
          <span className="inline-flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: "rgba(90,62,43,0.35)" }} /> Closed</span>
        </div>
      </div>

      {/* Mobile: collapsed view with button */}
      <div className="md:hidden p-3">
        <Button onClick={function(){ setMobileOpen(true); }} className="w-full bg-[var(--primary)] text-[var(--primary-foreground)]">Select dates</Button>
        <div className="mt-2 text-xs text-muted-foreground flex items-center justify-between">
          <span>{error ? "Could not load availability" : "Live availability on Booking.com"}</span>
          {range?.from && range?.to ? <span>{diffDays(range.from, range.to)} nights</span> : null}
        </div>
      </div>

      {/* Shared loading overlay for inline calendar */}
      {loading ? (
        <div className="pointer-events-none absolute inset-0 hidden md:grid bg-background/40 place-items-center">
          <div className="h-5 w-5 rounded-full border-2 border-[color:var(--primary)] border-t-transparent animate-spin" />
        </div>
      ) : null}

      {/* Mobile dialog calendar */}
      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-base">Select dates</DialogTitle>
          <Calendar
            mode="range"
            selected={range}
            onSelect={handleSelect}
            disabled={disabled}
            initialFocus
            modifiers={{ booked: booked.filter(function(r){ return r.kind === "booked"; }), closed: booked.filter(function(r){ return r.kind === "closed"; }) }}
            modifiersStyles={{
              booked: { backgroundColor: "rgba(229,72,77,0.18)", color: "inherit" },
              closed: { backgroundColor: "rgba(90,62,43,0.18)", color: "inherit" },
            }}
            className="mx-auto"
          />
          <div className="text-xs text-muted-foreground flex items-center justify-between">
            <span>{error ? "Could not load availability" : "Live availability on Booking.com"}</span>
            {range?.from && range?.to ? <span>{diffDays(range.from, range.to)} nights</span> : null}
          </div>
          <div className="text-[10px] text-muted-foreground flex items-center gap-3 mt-1">
            <span className="inline-flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: "rgba(229,72,77,0.35)" }} /> Booked</span>
            <span className="inline-flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: "rgba(90,62,43,0.35)" }} /> Closed</span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ymd(date){
  // Normalize to UTC date-only string YYYY-MM-DD to avoid timezone drift
  var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return d.toISOString().slice(0,10);
}

function diffDays(a, b){
  var ms = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  return Math.max(1, Math.round(ms / 86400000));
}

