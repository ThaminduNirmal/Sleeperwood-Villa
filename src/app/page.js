import BookingCta from "@/components/booking-cta";
import RoomCard from "@/components/room-card";
import { rooms } from "@/lib/rooms";
import ReviewsStrip from "@/components/reviews-strip";
import { reviews } from "@/lib/reviews";
import HeroImmersive from "@/components/hero-immersive";
import ValueCards from "@/components/value-cards";
import SectionGallery from "@/components/section-gallery";
import SectionLocation from "@/components/section-location";
import SectionContact from "@/components/section-contact";
import NearbyExperiences from "@/components/nearby-experiences";

export default function Home() {
  return (
    <div>
      <HeroImmersive />

      <div id="experiences" />
      <ValueCards />

      <section id="rooms" className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Featured rooms</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {rooms.map(function(r) { return <RoomCard key={r.id} room={r} />; })}
        </div>
      </section>

      <NearbyExperiences />

      <SectionLocation />
      <SectionGallery />
      <ReviewsStrip reviews={reviews} />
      <SectionContact />
    </div>
  );
}
