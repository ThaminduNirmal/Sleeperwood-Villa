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
  const [conflictDates, setConflictDates] = useState([]);
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
      var today = ymd(new Date());
      return d < today;
    };
  }, []);
  const [internalRange, setInternalRange] = useState({ from: undefined, to: undefined });
  const range = value || internalRange;
  function handleSelect(next) {
    if (onChange) onChange(next);
    else setInternalRange(next);
    if (next?.from && next?.to) {
      var dates = enumerateDates(next.from, next.to);
      var conflicts = [];
      for (var i=0;i<dates.length;i++){
        var d = dates[i];
        var dy = ymd(d);
        for (var j=0;j<booked.length;j++){
          var r = booked[j];
          if (dy >= r.start && dy < r.end) { conflicts.push(new Date(d)); break; }
        }
      }
      setConflictDates(conflicts);
      setMobileOpen(false);
    } else {
      setConflictDates([]);
    }
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
          modifiers={{ conflict: conflictDates }}
          modifiersStyles={{ conflict: { backgroundColor: "rgba(255,80,80,0.40)", color: "inherit" } }}
          className="mx-auto"
        />
        <div className="px-3 pb-3 text-xs text-muted-foreground flex items-center justify-between">
          <span>{error ? "Could not load availability" : "Select your dates; unavailable days are highlighted."}</span>
          {range?.from && range?.to ? <span>{diffDays(range.from, range.to)} nights</span> : null}
        </div>
      </div>

      {/* Mobile: collapsed view with button */}
      <div className="md:hidden p-3">
        <Button onClick={function(){ setMobileOpen(true); }} className="w-full bg-[#ffcc00] text-black hover:brightness-110">Select dates</Button>
        <div className="mt-2 text-xs text-muted-foreground flex items-center justify-between">
          <span>{error ? "Could not load availability" : "Select your dates; unavailable days are highlighted."}</span>
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
            modifiers={{ conflict: conflictDates }}
            modifiersStyles={{ conflict: { backgroundColor: "rgba(255,80,80,0.40)", color: "inherit" } }}
            className="mx-auto"
          />
          <div className="text-xs text-muted-foreground flex items-center justify-between">
            <span>{error ? "Could not load availability" : "Select your dates; unavailable days are highlighted."}</span>
            {range?.from && range?.to ? <span>{diffDays(range.from, range.to)} nights</span> : null}
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

function enumerateDates(from, to){
  // Inclusive of from, exclusive of to
  if (!from || !to) return [];
  var days = [];
  var d = new Date(Date.UTC(from.getFullYear(), from.getMonth(), from.getDate()));
  var end = new Date(Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()));
  while (d < end) {
    days.push(new Date(d));
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return days;
}

