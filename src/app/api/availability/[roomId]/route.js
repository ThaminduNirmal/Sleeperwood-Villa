import { roomIcs } from "@/lib/availabilityConfig";
import { fetchText, parseIcsToRanges } from "@/lib/ics";

export async function GET(req, { params }) {
  const { roomId } = await params;
  const url = roomIcs[roomId];
  if (!url) {
    return new Response(JSON.stringify({ roomId, booked: [] }), { headers: { "content-type": "application/json" } });
  }
  try {
    const text = await fetchText(url);
    const booked = parseIcsToRanges(text);
    return new Response(JSON.stringify({ roomId, booked }), { headers: { "content-type": "application/json" }, status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ roomId, booked: [], error: true }), { headers: { "content-type": "application/json" }, status: 200 });
  }
}

