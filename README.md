# Sleeperwood Villa — Website

Production site: https://sleeperwoodvilla.com

Marketing site for Sleeperwood Villa built with Next.js App Router. It features live availability via Booking.com iCal, an inline calendar, SEO best‑practices (sitemap, robots, JSON‑LD), and performance optimizations for LCP/FCP.

## Tech stack

- Next.js 15 (App Router) with React 19
- Tailwind CSS v4
- Radix UI primitives + shadcn/ui components
- Sonner toasts

## Getting started

Requirements: Node 18+ (Node 20 recommended), npm.

Install dependencies:

```bash
npm install
```

Run the dev server (Turbopack):

```bash
npm run dev
```

Build and start:

```bash
npm run build
npm start
```

Lint:

```bash
npm run lint
```

## Project structure

```
public/            # static assets
  images/          # hero, rooms, villa, area
  logo.PNG         # site icon (favicon)
src/
  app/             # Next.js app router pages
    api/availability/[roomId]/route.js  # Booking.com iCal → JSON API
    robots.js      # robots.txt
    sitemap.js     # sitemap.xml
    layout.js      # global metadata, JSON-LD, favicon
    page.js        # landing, lazy-loaded sections
  components/      # UI components (calendar, cards, header, hero, etc.)
  lib/             # utils, rooms config, booking link, iCal parser
scripts/
  fetch-area-images.mjs  # optional: fetch/process area photos
```

## Environment variables

Create `.env.local` in the project root for local use (Vercel → Project Settings → Environment Variables in production):

```
# Used for Google Search Console verification (read server-side)
GOOGLE_SITE_VERIFICATION=xxxxxx

# Only needed if you use the area image fetch script
PEXELS_API_KEY=your_pexels_api_key

# Booking.com iCal (server-only) — do not commit tokens
ROOM_01_ICS_URL=https://ical.booking.com/v1/export?t=...
ROOM_02_ICS_URL=https://ical.booking.com/v1/export?t=...
ROOM_03_ICS_URL=https://ical.booking.com/v1/export?t=...
```

Notes:
- `ROOM_01_ICS_URL`, `ROOM_02_ICS_URL`, `ROOM_03_ICS_URL` are read server‑side by `src/lib/availabilityConfig.js` and used by the API in `src/app/api/availability/[roomId]/route.js`. Set them in Vercel → Project → Settings → Environment Variables (scope: All Environments). Do not use `NEXT_PUBLIC_*`.
- `GOOGLE_SITE_VERIFICATION` is read by `src/app/layout.js` via `metadata.verification.google`.
- No public env vars are required for the website runtime.

## Availability API (Booking.com iCal)

The app serves availability from Booking.com iCal feeds via a small API with caching.

- iCal URLs come from server env vars, wired through: `src/lib/availabilityConfig.js`
- API route: `GET /api/availability/:roomId`

Example (with debug data):

```
http://localhost:3000/api/availability/room-01?debug=1
```

Response shape:

```json
{ "roomId": "room-01", "booked": [{ "start": "YYYY-MM-DD", "end": "YYYY-MM-DD", "kind": "booked" | "closed" }] }
```

If you rotate Booking.com iCal tokens, update `src/lib/availabilityConfig.js` and redeploy.

## Useful URLs

- Site: `https://sleeperwoodvilla.com/`
- robots.txt: `https://sleeperwoodvilla.com/robots.txt`
- sitemap.xml: `https://sleeperwoodvilla.com/sitemap.xml`
- Availability debug (prod):
  - `https://sleeperwoodvilla.com/api/availability/room-01?debug=1`
  - `https://sleeperwoodvilla.com/api/availability/room-02?debug=1`
  - `https://sleeperwoodvilla.com/api/availability/room-03?debug=1`

## Booking CTA

The “Book on Booking.com” button opens a Booking.com search URL based on selected dates.
- Code: `src/components/booking-cta.jsx`
- URL builder: `src/lib/bookingLink.js`

## Performance highlights

- Inline hero poster preloaded in `layout.js` to improve LCP
- Hero video `preload="none"` and gradient overlay
- Below-the-fold sections lazy-loaded via dynamic imports in `src/app/page.js`
- Room calendars cached and fetched on demand

## SEO

- Canonical URL and `metadataBase` in `src/app/layout.js`
- Open Graph metadata and site name
- JSON‑LD: `LodgingBusiness`, `Organization`, and `WebSite` (with alternate names “Sleeperwood” and “Sleeper wood”)
- `src/app/robots.js` → robots.txt
- `src/app/sitemap.js` → sitemap.xml
- Favicon/icon configured to use `/logo.PNG` with explicit sizes

After deploy, request indexing in Google Search Console:
1. URL Inspection → `https://sleeperwoodvilla.com/` → Request indexing
2. Re-inspect after a few minutes; favicon/brand queries can take 24–72 hours

## Content updates

- Rooms list and metadata: `src/lib/rooms.js`
- Reviews data: `src/lib/reviews.js`
- Hero and gallery assets: place under `public/images/...` and reference with absolute paths
- Booking button label/behavior: `src/components/booking-cta.jsx`

## Images

- Place images under `public/images/...` and reference with absolute paths (e.g. `/images/hero/605593870.jpg`).
- Optional: fetch/process area photos via Pexels/Unsplash/Wikipedia using the script:

```bash
PEXELS_API_KEY=... npm run fetch-area
```

Targets are defined in `scripts/area-manifest.json`.

## Troubleshooting

- Availability shows empty or errors:
  - Confirm iCal URLs in `src/lib/availabilityConfig.js`
  - In production, verify env vars are present in Vercel (All Environments) and redeploy
  - Retry with `?refresh=1` and check server logs
- Favicon not visible in SERP:
  - Ensure `/logo.PNG` is deployed and accessible
  - Wait for reindexing; request indexing again in GSC
- Styles look off after upgrade:
  - Clear browser cache and verify Tailwind v4 is installed

## Deployment

Recommended: Vercel

1. Push to GitHub/GitLab/Bitbucket and import the repo in Vercel
2. Set env vars: `GOOGLE_SITE_VERIFICATION`, `ROOM_01_ICS_URL`, `ROOM_02_ICS_URL`, `ROOM_03_ICS_URL` (scope: All Environments)
3. Deploy; validate `robots.txt` and `sitemap.xml` are reachable
4. Verify availability endpoints return data (`/api/availability/room-01?debug=1`)
5. Request indexing in Google Search Console

## Security

See `SECURITY.md` for vulnerability reporting and how secrets are handled. Booking.com iCal URLs are kept as server‑only env vars and are never exposed client‑side.

