import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-4 text-sm">
        <div>
          <div className="font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>Stay</div>
          <ul className="space-y-2">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/rooms">Rooms</Link></li>
            <li><Link href="/experiences">Experiences</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>Contact</div>
          <ul className="space-y-2">
            <li><a href="https://wa.me/94713556970" target="_blank">WhatsApp</a></li>
            <li><a href="tel:+94713556970">071 355 6970</a></li>
            <li><a href="mailto:sleeperwooduna@gmail.com">sleeperwooduna@gmail.com</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>Social</div>
          <ul className="space-y-2">
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>Address</div>
          <div>34/1 New Dewata Rd<br/>Unawatuna, Sri Lanka</div>
          <a className="underline text-xs mt-2 inline-block" href="https://maps.app.goo.gl/crBKPC9sTSymAQnG7" target="_blank">Open in Google Maps</a>
        </div>
      </div>
      <div className="text-xs text-center text-muted-foreground py-4">© 2025 Sleeperwood</div>
    </footer>
  );
}

