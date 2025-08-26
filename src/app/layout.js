import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BookingStickyBar from "@/components/booking-sticky-bar";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground`}>
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <BookingStickyBar />
      </body>
    </html>
  );
}
