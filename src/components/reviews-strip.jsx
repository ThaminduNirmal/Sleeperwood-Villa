import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ReviewsStrip({ reviews }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>What guests love</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map(function(r, i) {
          return (
            <Card key={i}>
              <CardHeader>
                <div className="font-medium">{r.author}</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{r.text}</p>
                {r.ratings ? (
                  <div className="text-xs mt-3 text-muted-foreground">Rooms: {r.ratings.rooms}/5  |  Service: {r.ratings.service}/5  |  Location: {r.ratings.location}/5</div>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

