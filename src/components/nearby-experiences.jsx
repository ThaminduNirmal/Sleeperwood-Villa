export default function NearbyExperiences() {
  const items = [
    { title: "Unawatuna Beach", text: "Golden sand, calm bay, 3 min walk.", img: "/images/area/area-unawatuna-hero.jpg" },
    { title: "Jungle Beach", text: "Snorkeling & calm, 10 min drive.", img: "/images/area/area-jungle-beach-cove.jpg" },
    { title: "Galle Fort", text: "UNESCO walls, sunset strolls, 20 min.", img: "/images/area/area-galle-fort-street.jpg" },
    { title: "Japanese Pagoda", text: "Hilltop views, 10 min by tuk‑tuk.", img: "/images/area/area-peace-pagoda-exterior.jpg" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Nearby experiences</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {items.map(function (i) {
          return (
            <div key={i.title} className="group rounded-xl overflow-hidden border shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
              <div className="relative aspect-[4/3]">
                <img src={encodeURI(i.img)} alt={i.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white font-semibold drop-shadow">{i.title}</div>
                  <div className="text-white/85 text-sm drop-shadow-sm">{i.text}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


