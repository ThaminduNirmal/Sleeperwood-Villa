import { Waves, Leaf, Wifi, HandHeart } from "lucide-react";

const items = [
  {
    icon: Waves,
    title: "Near beach.",
    text: "Steps to Unawatuna’s waves and vibrant local life.",
  },
  {
    icon: Leaf,
    title: "Garden calm.",
    text: "Relax in the leafy courtyard with gentle shade.",
  },
  {
    icon: Wifi,
    title: "A/C, fast Wi‑Fi.",
    text: "Comfort and connectivity throughout your stay.",
  },
  {
    icon: HandHeart,
    title: "Attentive hosts.",
    text: "Local insights and warm, friendly service.",
  },
];

export default function ValueCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12" id="experiences">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {items.map(function (it) {
          const Icon = it.icon;
          return (
            <a key={it.title} href="#experiences" className="group block focus-visible:outline-none">
              <div className="relative p-5 rounded-2xl border bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg ring-1 ring-transparent group-hover:ring-[color:var(--primary)]/30">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full grid place-items-center bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-base md:text-lg font-semibold tracking-tight text-[color:var(--accent, #5A3E2B)]">{it.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{it.text}</div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--primary)]/30 to-transparent" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}


