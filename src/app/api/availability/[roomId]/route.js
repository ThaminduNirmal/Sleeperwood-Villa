import { roomIcs } from "@/lib/availabilityConfig";
import { fetchText, parseIcsToRanges } from "@/lib/ics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE = globalThis.__availCache || (globalThis.__availCache = new Map());
const TTL_MS = 10 * 60 * 1000; // 10 minutes fresh
const STALE_MS = 60 * 60 * 1000; // serve stale up to 60 minutes on error

export async function GET(req, { params }) {
  const { roomId } = await params;
  const url = roomIcs[roomId];
  if (!url) {
    return new Response(JSON.stringify({ roomId, booked: [] }), { headers: { "content-type": "application/json" } });
  }

  const now = Date.now();
  const entry = CACHE.get(roomId);
  const u = (() => { try { return new URL(req.url); } catch { return null; } })();
  const debug = u ? u.searchParams.get("debug") === "1" : false;
  const refresh = u ? u.searchParams.get("refresh") === "1" : false;
  if (!refresh && entry && now - entry.updatedAt < TTL_MS) {
    const payload = { roomId, booked: entry.booked };
    if (debug) Object.assign(payload, { cachedAt: entry.updatedAt, eventCount: entry.eventCount });
    return new Response(JSON.stringify(payload), { headers: { "content-type": "application/json" }, status: 200 });
  }

  try {
    const text = await fetchWithRetry(url, 2);
    const booked = parseIcsToRanges(text);
    const eventCount = (text.match(/BEGIN:VEVENT/g) || []).length;
    CACHE.set(roomId, { booked, updatedAt: now, eventCount });
    const payload = { roomId, booked, cachedAt: now };
    if (debug) Object.assign(payload, { eventCount, icsHead: text.slice(0, 240) });
    return new Response(JSON.stringify(payload), { headers: { "content-type": "application/json" }, status: 200 });
  } catch (e) {
    console.error("ICS fetch failed", roomId, e?.message);
    if (entry && now - entry.updatedAt < STALE_MS) {
      const payload = { roomId, booked: entry.booked, stale: true, cachedAt: entry.updatedAt };
      if (debug) Object.assign(payload, { eventCount: entry.eventCount });
      return new Response(JSON.stringify(payload), { headers: { "content-type": "application/json" }, status: 200 });
    }
    return new Response(JSON.stringify({ roomId, booked: [], error: true, errorMessage: e?.message || "fetch_failed", lastTriedAt: now }), { headers: { "content-type": "application/json" }, status: 200 });
  }
}

async function fetchWithRetry(url, retries) {
  try {
    return await fetchText(url);
  } catch (e) {
    if (retries > 0) {
      await new Promise(function(res){ setTimeout(res, 600); });
      return fetchWithRetry(url, retries - 1);
    }
    throw e;
  }
}

