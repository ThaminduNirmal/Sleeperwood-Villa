export async function fetchText(url, opt) {
  const res = await fetch(url, Object.assign({ cache: "no-store" }, opt));
  if (!res.ok) throw new Error("Failed to fetch ICS");
  return res.text();
}

export function parseIcsToRanges(ics) {
  const blocks = ics.split("BEGIN:VEVENT");
  const ranges = [];
  for (let i = 1; i < blocks.length; i++) {
    const b = blocks[i];
    const s = /DTSTART(?:;[^:]+)?:([^\r\n]+)/i.exec(b)?.[1];
    const e = /DTEND(?:;[^:]+)?:([^\r\n]+)/i.exec(b)?.[1];
    if (!s || !e) continue;
    const start = toIsoDate(new Date(normalizeIcsDate(s)));
    const end = toIsoDate(new Date(normalizeIcsDate(e)));
    ranges.push({ start, end });
  }
  return ranges;
}

function normalizeIcsDate(s) {
  if (/Z$/.test(s)) return s;
  if (/T/.test(s)) return s + "Z";
  return s + "T00:00:00Z";
}

function toIsoDate(d) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString().slice(0, 10);
}

