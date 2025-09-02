export default function SectionLocation() {
  return (
    <section id="location" className="mx-auto max-w-7xl px-4 pb-20">
      <div className="relative overflow-hidden rounded-xl border shadow-sm">
        <div className="aspect-[16/9] w-full relative">
          <iframe
            title="Sleeperwood Villa location"
            src={"https://www.google.com/maps?q=" + encodeURIComponent("Sleeperwood Villa, Unawatuna") + "&output=embed"}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none" />
          <div className="absolute inset-0 flex items-end justify-start p-4 md:p-6">
            <div className="max-w-lg rounded-xl border border-white/20 bg-black/55 backdrop-blur-md shadow-xl p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>Where to find us</h3>
              <p className="text-sm md:text-base text-white/95 mt-1">34/1 New Dewata Rd, Unawatuna. 2 min walk to the beach, easy tuk‑tuk to Galle.</p>
              <a
                className="mt-4 inline-flex items-center rounded-md px-5 py-3 text-white shadow-lg transition-all border border-white/30 bg-white/15 hover:bg-white/25 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                target="_blank"
                rel="noopener noreferrer"
                href="https://maps.app.goo.gl/crBKPC9sTSymAQnG7"
                aria-label="Open in Google Maps"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


