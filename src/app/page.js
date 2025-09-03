import BookingCta from "@/components/booking-cta";
import RoomCard from "@/components/room-card";
import { rooms } from "@/lib/rooms";
import { reviews } from "@/lib/reviews";
import dynamic from "next/dynamic";
import HeroImmersive from "@/components/hero-immersive";

// Below-the-fold sections – dynamically imported to reduce initial JS/LCP
const ValueCards = dynamic(() => import("@/components/value-cards"), { loading: () => <div className="mx-auto max-w-6xl px-4 py-12" /> });
const NearbyExperiences = dynamic(() => import("@/components/nearby-experiences"), { loading: () => <div className="mx-auto max-w-6xl px-4 py-12" /> });
const SectionLocation = dynamic(() => import("@/components/section-location"), { loading: () => <div className="mx-auto max-w-7xl px-4 py-12" /> });
const SectionGallery = dynamic(() => import("@/components/section-gallery"), { loading: () => <div className="mx-auto max-w-7xl px-4 py-12" /> });
const ReviewsStrip = dynamic(() => import("@/components/reviews-strip"), { loading: () => <div className="mx-auto max-w-6xl px-4 pb-16" /> });
const SectionContact = dynamic(() => import("@/components/section-contact"), { loading: () => <div className="mx-auto max-w-6xl px-4 py-12" /> });

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
