import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sleeperwood Villa — Wood, waves, and warm hospitality",
  description: "Light, wood, and green near Unawatuna Beach. Book on Booking.com.",
  metadataBase: new URL("https://sleeperwoodvilla.com"),
  alternates: { canonical: "/" },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  icons: {
    icon: "/TAB.png",
    shortcut: "/TAB.png",
    apple: "/TAB.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="ld-json-hotel"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Sleeperwood Villa",
              url: "https://sleeperwoodvilla.com",
              logo: "https://sleeperwoodvilla.com/logo.PNG",
              image: [
                "https://sleeperwoodvilla.com/images/hero/605593870.jpg",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Unawatuna",
                addressRegion: "Southern Province",
                addressCountry: "LK",
              },
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground`}>
        <link rel="preload" as="image" href="/images/hero/605593870.jpg" />
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
