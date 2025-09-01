"use client";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Star } from "lucide-react";

export default function ReviewsStrip({ reviews }) {
  const withDerived = useMemo(function(){
    return (reviews || []).map(function(r){
      const numeric = r.ratings ? avg([r.ratings.rooms, r.ratings.service, r.ratings.location]) : null;
      return Object.assign({}, r, { score: numeric });
    });
  }, [reviews]);

  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  function openReview(i) {
    setActiveIdx(i);
    setOpen(true);
  }

  const aggregate = useMemo(function(){
    const scores = withDerived.map(function(r){ return r.score; }).filter(Boolean);
    if (!scores.length) return null;
    const value = Number((scores.reduce(function(a,b){ return a + b; }, 0) / scores.length).toFixed(1));
    return { value, count: scores.length };
  }, [withDerived]);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="flex items-end justify-between gap-3 mb-4">
        <h2 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>What guests love</h2>
        {aggregate ? (
          <div className="text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1 align-middle">
              <Star size={14} className="text-[color:var(--chart-1)] fill-[color:var(--chart-1)]" />
              <span className="font-medium text-foreground">{aggregate.value}</span>
            </span>
            <span className="ml-2">({aggregate.count} rated reviews)</span>
          </div>
        ) : null}
      </div>

      <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid auto-cols-[minmax(280px,1fr)] md:auto-cols-[minmax(320px,1fr)] grid-flow-col gap-4 snap-x snap-mandatory">
          {withDerived.map(function(r, i) {
            return (
              <Card
                key={i}
                onClick={function(){ openReview(i); }}
                onKeyDown={function(e){ if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openReview(i); } }}
                role="button"
                tabIndex={0}
                aria-label="Open full review"
                className="snap-start relative overflow-hidden group bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ring-1 ring-white/10 hover:ring-[color:var(--primary)]/30 cursor-pointer"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-[color:var(--primary)]/10 blur-3xl" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{r.author}</div>
                    {r.score ? <ScoreChip score={r.score} /> : null}
                  </div>
                  {r.source || r.date ? (
                    <div className="text-xs text-muted-foreground mt-1">
                      {r.source ? <span className="mr-2">Verified on {r.source}</span> : null}
                      {r.date ? <span>{formatDate(r.date)}</span> : null}
                    </div>
                  ) : null}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-4 whitespace-pre-line">{r.text}</p>
                  <div className="flex items-center justify-between mt-3">
                    {r.ratings ? (
                      <div className="text-xs text-muted-foreground">Rooms: {r.ratings.rooms}/5  |  Service: {r.ratings.service}/5  |  Location: {r.ratings.location}/5</div>
                    ) : <span />}
                    <button onClick={function(){ openReview(i); }} className="text-xs underline">Read more</button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <div className="text-sm text-muted-foreground mb-2">
            {withDerived[activeIdx]?.source ? <span className="mr-2">Verified on {withDerived[activeIdx]?.source}</span> : null}
            {withDerived[activeIdx]?.date ? <span>{formatDate(withDerived[activeIdx]?.date)}</span> : null}
          </div>
          <DialogTitle className="text-lg leading-none font-semibold mb-1">{withDerived[activeIdx]?.author || "Guest review"}</DialogTitle>
          {withDerived[activeIdx]?.score ? <ScoreChip score={withDerived[activeIdx]?.score} /> : null}
          <div className="mt-3 whitespace-pre-line text-sm text-foreground">{withDerived[activeIdx]?.text}</div>
        </DialogContent>
      </Dialog>
      {aggregate ? <AggregateJsonLd value={aggregate.value} count={aggregate.count} /> : null}
    </section>
  );
}

function ScoreChip({ score }) {
  const rounded = Number(score).toFixed(1);
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-[color:var(--primary)]/10 text-[color:var(--primary)] px-2 py-1 text-xs">
      <Star size={12} className="fill-[color:var(--primary)] text-[color:var(--primary)]" />
      {rounded}
    </span>
  );
}

function formatDate(s) {
  try {
    const d = new Date(s);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
  } catch {
    return s;
  }
}

function avg(list) {
  const arr = list.filter(function(n){ return typeof n === "number" && !Number.isNaN(n); });
  if (!arr.length) return null;
  return arr.reduce(function(a,b){ return a + b; }, 0) / arr.length;
}

function AggregateJsonLd({ value, count }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Sleeperwood Villa",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(value),
      reviewCount: String(count)
    }
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

