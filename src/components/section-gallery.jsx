"use client";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function SectionGallery() {
  const villa = [
    "/images/villa/605593380.jpg",
    "/images/villa/605593633.jpg",
    "/images/villa/605593646.jpg",
    "/images/villa/605593710.jpg",
    "/images/villa/605593715.jpg",
    "/images/villa/605593811.jpg",
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
    "/images/area/area-local-coconut-vendor.jpg",
  ].map(encodeURI);

  const items = useMemo(function(){ return [...villa, ...area]; }, [villa, area]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  function openAt(idx) {
    setActive(idx);
    setOpen(true);
  }

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Gallery</h2>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-x-4">
        {items.map(function (src, idx) {
          return (
            <button
              key={src}
              onClick={function(){ openAt(idx); }}
              className="group relative mb-4 inline-block w-full overflow-hidden rounded-xl border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)]/40 break-inside-avoid"
              aria-label="Open image in lightbox"
            >
              <img src={src} alt="Gallery image" loading="lazy" className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-5xl">
          <DialogTitle className="sr-only">Gallery image</DialogTitle>
          <div className="relative w-full">
            <img src={items[active]} alt="Expanded gallery" className="w-full h-auto rounded-xl shadow-2xl" />
            <div className="absolute inset-x-0 -bottom-10 hidden md:flex items-center justify-between text-white/90 text-sm">
              <button onClick={function(){ setActive((active - 1 + items.length) % items.length); }} className="rounded-md px-3 py-2 bg-black/50 hover:bg-black/60 backdrop-blur border border-white/10">Prev</button>
              <button onClick={function(){ setActive((active + 1) % items.length); }} className="rounded-md px-3 py-2 bg-black/50 hover:bg-black/60 backdrop-blur border border-white/10">Next</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}


