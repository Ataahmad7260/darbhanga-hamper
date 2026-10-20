import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ShopClient } from "./ShopClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Shop All Gift Hampers",
  description:
    "Explore our complete range of personalized gift hampers for birthdays, anniversaries, and special moments across India. Free custom greeting card included.",
  openGraph: {
    title: `Shop Gift Hampers | ${siteConfig.businessName}`,
    description:
      "Explore curated gift hampers with personalized greeting cards. Order directly via WhatsApp.",
  },
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-8 h-8 border-3 border-burgundy border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-serif text-lg text-charcoal/70">Loading gift hampers...</p>
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
