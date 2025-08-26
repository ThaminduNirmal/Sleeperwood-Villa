export const metadata = { title: "Location — Sleeperwood Villa" };

export default function LocationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Where to find us</h1>
      <p className="mt-2 text-muted-foreground">Sleeperwood Villa, 34/1 New Dewata Rd, Unawatuna. 2 min walk to the beach, easy tuk-tuk to Galle.</p>
      <a className="mt-4 inline-flex underline" href="https://maps.app.goo.gl/crBKPC9sTSymAQnG7" target="_blank">Open in Google Maps</a>
      <div className="mt-6 aspect-video rounded-xl bg-secondary" />
    </div>
  );
}

