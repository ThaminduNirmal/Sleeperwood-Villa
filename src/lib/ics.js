export async function fetchText(url, opt) {
  const controller = new AbortController();
  const id = setTimeout(function(){ controller.abort(); }, 10000);
  const res = await fetch(url, Object.assign({
    cache: "no-store",
    headers: { "user-agent": "Mozilla/5.0 (compatible; SleeperwoodBot/1.0)", "accept": "text/calendar,text/plain,*/*" },
    signal: controller.signal,
  }, opt)).finally(function(){ clearTimeout(id); });
  if (!res.ok) throw new Error("HTTP " + res.status + " while fetching ICS");
  return res.text();
}

export function parseIcsToRanges(ics) {
  const text = unfoldIcsLines(ics);
  const eventRegex = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/gim;
  const ranges = [];
  let match;
  while ((match = eventRegex.exec(text))) {
    const block = match[1];
    if (/STATUS\s*:\s*CANCELLED/i.test(block)) continue;
    const s = /DTSTART(?:;[^:]+)?:([^\r\n]+)/i.exec(block)?.[1];
    let e = /DTEND(?:;[^:]+)?:([^\r\n]+)/i.exec(block)?.[1];
    if (!s && !e) continue;
    const kind = classifyKind(block);
    const start = tryIsoFromIcs(s);
    if (!start) continue;
    let end = e ? tryIsoFromIcs(e) : null;
    if (!end) {
      end = addDaysIso(start, 1);
    }
    // Ensure end is after start; if not, bump by 1 day
    if (end <= start) end = addDaysIso(start, 1);
    ranges.push({ start, end, kind });
  }
  return mergeRanges(ranges);
}

function normalizeIcsDate(s) {
  if (!s) return s;
  // Handle basic date YYYYMMDD
  if (/^\d{8}$/.test(s)) {
    const y = s.slice(0, 4), m = s.slice(4, 6), d = s.slice(6, 8);
    return `${y}-${m}-${d}T00:00:00Z`;
  }
  // Handle basic datetime YYYYMMDDTHHmmss(Z?)
  if (/^\d{8}T\d{6}Z?$/.test(s)) {
    const y = s.slice(0, 4), m = s.slice(4, 6), d = s.slice(6, 8);
    const hh = s.slice(9, 11), mm = s.slice(11, 13), ss = s.slice(13, 15);
    return `${y}-${m}-${d}T${hh}:${mm}:${ss}Z`;
  }
  // Extended without Z → add Z
  if (/Z$/.test(s)) return s;
  if (/T/.test(s)) return s + "Z";
  // Fallback: treat as date string and add time
  return s + "T00:00:00Z";
}

function toIsoDate(d) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString().slice(0, 10);
}

function unfoldIcsLines(s) {
  // Unfold folded lines per RFC 5545 (CRLF followed by space or tab)
  return s.replace(/\r?\n[ \t]/g, "");
}

function mergeRanges(ranges) {
  if (!ranges.length) return [];
  const sorted = ranges.slice().sort(function(a, b){
    if (a.start < b.start) return -1; if (a.start > b.start) return 1; return 0;
  });
  const merged = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const prev = merged[merged.length - 1];
    const curr = sorted[i];
    if (curr.kind === prev.kind && (curr.start <= prev.end || curr.start === prev.end)) {
      if (curr.end > prev.end) prev.end = curr.end;
    } else {
      merged.push({ start: curr.start, end: curr.end, kind: curr.kind });
    }
  }
  return merged;
}

function classifyKind(block) {
  const m = /SUMMARY\s*:\s*([^\r\n]+)/i.exec(block);
  const summary = (m?.[1] || "").toLowerCase();
  if (/not available|closed|block|stop sell|stopsell/.test(summary)) return "closed";
  if (/reservation|reserved|booked|booking\.com|guest/.test(summary)) return "booked";
  return "booked";
}

function tryIsoFromIcs(raw) {
  if (!raw) return null;
  const d = new Date(normalizeIcsDate(raw));
  if (Number.isNaN(d.getTime())) return null;
  return toIsoDate(d);
}

function addDaysIso(iso, days) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return toIsoDate(d);
}

