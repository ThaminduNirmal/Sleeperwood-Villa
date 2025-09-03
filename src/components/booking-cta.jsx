"use client";
import { Button } from "@/components/ui/button";
import { buildBookingUrl } from "@/lib/bookingLink";

export default function BookingCta({ checkIn = "", checkOut = "", adults = 2, childrenAges = [], rooms = 1, variant = "primary", className = "", children = "Book on Booking.com" }) {
  function onClick() {
    const url = buildBookingUrl({ checkIn, checkOut, adults, childrenAges, rooms });
    window.open(url, "_blank");
  }
  if (variant === "link") {
    return (
      <a onClick={onClick} className={"cursor-pointer underline " + className}>
        {children}
      </a>
    );
  }
  return (
    <Button onClick={onClick} className={"bg-[var(--primary)] text-[var(--primary-foreground)] " + className}>{children}</Button>
  );
}

