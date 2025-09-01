export const metadata = { title: "Gallery — Sleeperwood Villa" };

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Gallery</h1>
      <div className="mt-8">
        {/* Reuse the SectionGallery component for consistency and lightbox */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/** We import dynamically to avoid duplicating logic; SSR-safe because images are static */}
        {/* Render SectionGallery inline */}
        <InlineGallery />
      </div>
    </div>
  );
}

function InlineGallery() {
  // Duplicate the same gallery used on home but with a larger set
  const villa = [
    "/images/villa/605593380.jpg",
    "/images/villa/605593633.jpg",
    "/images/villa/605593646.jpg",
    "/images/villa/605593710.jpg",
    "/images/villa/605593715.jpg",
    "/images/villa/605593811.jpg",
    "/images/villa/605593857.jpg",
    "/images/villa/605593861.jpg",
    "/images/villa/605593862.jpg",
    "/images/villa/605593866.jpg",
    "/images/villa/605593944.jpg",
    "/images/villa/605593964.jpg",
    "/images/villa/605594007.jpg",
    "/images/villa/605594017.jpg",
    "/images/villa/612213298.jpg",
    "/images/villa/612213473.jpg",
  ].map(encodeURI);
  const area = [
    "/images/area/area-unawatuna-hero.jpg",
    "/images/area/area-unawatuna-waves.jpg",
    "/images/area/area-unawatuna-evening-cafes.jpg",
    "/images/area/area-jungle-beach-cove.jpg",
    "/images/area/area-jungle-beach-snorkeling.jpg",
    "/images/area/area-peace-pagoda-exterior.jpg",
    "/images/area/area-peace-pagoda-viewpoint.jpg",
    "/images/area/area-galle-fort-street.jpg",
    "/images/area/area-dalawella-rope-swing-action.jpg",
    "/images/area/area-local-tuk-tuks.jpg",
    "/images/area/area-local-fruit-stand.jpg",
    "/images/area/area-local-seafood-plate.jpg",
  ].map(encodeURI);
  const rooms = [
    "/images/rooms/room1/605593471.jpg",
    "/images/rooms/room1/605593530.jpg",
    "/images/rooms/room1/605593706 (1).jpg",
    "/images/rooms/room1/605593732 (1).jpg",
    "/images/rooms/room1/605593779.jpg",
    "/images/rooms/room1/1.11.jpg",
    "/images/rooms/room2/2.1.jpg",
    "/images/rooms/room2/2.2.jpg",
    "/images/rooms/room2/2.3.jpg",
    "/images/rooms/room2/2.4.jpg",
    "/images/rooms/room3/3.1.jpg",
    "/images/rooms/room3/3.2.jpg",
    "/images/rooms/room3/3.3.jpg",
    "/images/rooms/room3/3.4.jpg",
    "/images/rooms/room3/3.5.jpg",
  ].map(encodeURI);

  return (
    <div>
      {/* Lightweight inline lightbox replicating SectionGallery behavior */}
      {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
      {require("@/components/section-gallery").default()}
      {/* Extra rows unique to Gallery page */}
      <div className="grid gap-4 mt-8 grid-cols-2 md:grid-cols-4">
        {[...villa, ...rooms, ...area].map(function(src) {
          return <img key={src} src={src} alt="Gallery image" className="w-full h-auto rounded-lg border" loading="lazy" />;
        })}
      </div>
    </div>
  );
}

