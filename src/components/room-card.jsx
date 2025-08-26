import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import BookingCta from "@/components/booking-cta";
import AvailabilityCalendar from "@/components/availability-calendar";

export default function RoomCard({ room }) {
  const img = room.images && room.images[0];
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] bg-secondary relative">
        {img ? (
          <Image src={img} alt={room.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
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
          <AvailabilityCalendar roomId={room.id} />
        </div>
      </CardContent>
      <CardFooter>
        <BookingCta className="w-full">See dates on Booking.com</BookingCta>
      </CardFooter>
    </Card>
  );
}

