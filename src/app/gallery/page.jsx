export const metadata = { title: "Gallery — Sleeperwood Villa" };

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Gallery</h1>
      <div className="mt-4 text-sm text-muted-foreground">Add room, villa, and area photos here.</div>
      <div className="grid gap-4 mt-8 grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-lg bg-secondary" />
        ))}
      </div>
    </div>
  );
}

