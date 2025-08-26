export const metadata = { title: "Experiences — Sleeperwood Villa" };

export default function ExperiencesPage() {
  const items = [
    { title: "Unawatuna Beach", text: "Golden sand, calm bay, 3 min walk." },
    { title: "Jungle Beach", text: "Snorkeling & calm, 10 min drive." },
    { title: "Galle Fort", text: "UNESCO walls, sunset strolls, 20 min." },
    { title: "Japanese Pagoda", text: "Hilltop view, 10 min by tuk‑tuk." },
    { title: "Dalawella Rope Swing", text: "Photo spot, 15 min drive." },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Experiences</h1>
      <div className="grid gap-6 mt-8 md:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="p-4 rounded-lg border bg-white">
            <div className="font-medium">{i.title}</div>
            <div className="text-sm text-muted-foreground">{i.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

