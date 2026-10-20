import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#722F37",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.businessName} — ${siteConfig.primaryTagline}`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description:
    "Thoughtfully curated gift hampers for birthdays, anniversaries, and special moments in India. Personalize greeting cards and order seamlessly via WhatsApp.",
  keywords: [
    "gift hampers",
    "personalized gifts",
    "birthday hampers",
    "anniversary gifts",
    "girls accessories hamper",
    "gifting India",
    "Darbhanga Hamper",
  ],
  authors: [{ name: siteConfig.businessName }],
  creator: siteConfig.businessName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.siteUrl,
    siteName: siteConfig.businessName,
    title: `${siteConfig.businessName} — ${siteConfig.primaryTagline}`,
    description:
      "Thoughtfully curated gift hampers for birthdays, anniversaries, and special celebrations across India.",
    images: [
      {
        url: "/images/hero/hero-gift-hampers.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.businessName} Luxury Hampers`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.businessName} — ${siteConfig.primaryTagline}`,
    description:
      "Thoughtfully curated gift hampers for birthdays, anniversaries, and special celebrations across India.",
    images: ["/images/hero/hero-gift-hampers.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-charcoal font-sans antialiased selection:bg-burgundy/10 selection:text-burgundy">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
