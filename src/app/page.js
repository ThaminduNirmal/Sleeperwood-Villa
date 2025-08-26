import BookingCta from "@/components/booking-cta";
import RoomCard from "@/components/room-card";
import { rooms } from "@/lib/rooms";
import ReviewsStrip from "@/components/reviews-strip";
import { reviews } from "@/lib/reviews";

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 grid gap-6 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Unwind in wood and greenery.</h1>
          <p className="mt-3 text-xl text-muted-foreground">Moments from Unawatuna Beach.</p>
          <div className="mt-6 flex gap-3">
            <BookingCta className="px-5 py-3">Check availability on Booking.com</BookingCta>
            <a className="inline-flex items-center rounded-md border border-border px-5 py-3" href="/rooms">View rooms</a>
          </div>
        </div>
        <div className="aspect-video rounded-xl overflow-hidden bg-[var(--secondary)] relative">
          <img src="/images/hero/605593870.jpg" alt="Sleeperwood Villa garden and exterior" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-4">
        <div className="p-4 rounded-lg bg-white border">
          <div className="font-medium">Near beach.</div>
          <div className="text-sm text-muted-foreground">Steps to Unawatuna’s waves and vibrant local life.</div>
        </div>
        <div className="p-4 rounded-lg bg-white border">
          <div className="font-medium">Garden calm.</div>
          <div className="text-sm text-muted-foreground">Relax in the leafy courtyard with gentle shade.</div>
        </div>
        <div className="p-4 rounded-lg bg-white border">
          <div className="font-medium">A/C, fast Wi‑Fi.</div>
          <div className="text-sm text-muted-foreground">Comfort and connectivity throughout your stay.</div>
        </div>
        <div className="p-4 rounded-lg bg-white border">
          <div className="font-medium">Attentive hosts.</div>
          <div className="text-sm text-muted-foreground">Local insights and warm, friendly service.</div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Featured rooms</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {rooms.map(function(r) { return <RoomCard key={r.id} room={r} />; })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Nearby experiences</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="p-4 rounded-lg bg-white border"><div className="font-medium">Unawatuna Beach</div><div className="text-sm text-muted-foreground">Golden sand, calm bay, 3 min walk.</div></div>
          <div className="p-4 rounded-lg bg-white border"><div className="font-medium">Jungle Beach</div><div className="text-sm text-muted-foreground">Snorkeling & calm, 10 min drive.</div></div>
          <div className="p-4 rounded-lg bg-white border"><div className="font-medium">Galle Fort</div><div className="text-sm text-muted-foreground">UNESCO walls, sunset strolls, 20 min.</div></div>
          <div className="p-4 rounded-lg bg-white border"><div className="font-medium">Japanese Pagoda</div><div className="text-sm text-muted-foreground">Hilltop views, 10 min by tuk‑tuk.</div></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-xl border bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Where to find us</h3>
            <p className="text-sm text-muted-foreground">34/1 New Dewata Rd, Unawatuna. 2 min walk to the beach, easy tuk‑tuk to Galle.</p>
          </div>
          <a className="inline-flex items-center rounded-md border border-border px-5 py-3" target="_blank" href="https://maps.google.com/?q=Sleeperwood%20Villa%20Unawatuna">Open in Google Maps</a>
        </div>
      </section>

      <ReviewsStrip reviews={reviews} />
    </div>
  );
}
