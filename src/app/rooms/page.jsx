import RoomCard from "@/components/room-card";
import { rooms } from "@/lib/rooms";

export const metadata = { title: "Rooms — Sleeperwood Villa" };

export default function RoomsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Rooms</h1>
      <p className="text-muted-foreground mt-2">Choose the room that suits your pace of travel.</p>
      <div className="grid gap-6 mt-8 md:grid-cols-3">
        {rooms.map(r => (
          <RoomCard key={r.id} room={r} />
        ))}
      </div>
      <div className="mt-6 text-xs text-muted-foreground">Live availability on Booking.com</div>
    </div>
  );
}

