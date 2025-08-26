"use client";
import { useEffect, useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function AvailabilityCalendar({ roomId }) {
  const [booked, setBooked] = useState([]);
  useEffect(function() {
    let active = true;
    fetch(`/api/availability/${roomId}`).then(function(r){ return r.json(); }).then(function(d){ if (active) setBooked(d.booked || []); }).catch(function(){});
    return function(){ active = false; };
  }, [roomId]);
  const disabled = useMemo(function(){
    return function(date){
      for (var i=0;i<booked.length;i++){
        var r = booked[i];
        var s = new Date(r.start);
        var e = new Date(r.end);
        if (date >= s && date < e) return true;
      }
      return false;
    };
  }, [booked]);
  const [range, setRange] = useState({ from: undefined, to: undefined });
  return (
    <div className="border rounded-lg">
      <Calendar mode="range" selected={range} onSelect={setRange} disabled={disabled} initialFocus />
      <div className="px-3 pb-3 text-xs text-muted-foreground">Live availability on Booking.com</div>
    </div>
  );
}

