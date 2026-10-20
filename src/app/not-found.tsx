import React from "react";
import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-20 sm:py-32 bg-cream text-center px-4">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6 text-burgundy border border-cream-300">
          <Gift className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase tracking-widest font-semibold text-gold font-sans">
          Page Not Found
        </span>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-charcoal">
          Hamper or Page Not Found
        </h1>
        <p className="mt-3 text-sm text-charcoal/70 leading-relaxed">
          The hamper you’re looking for might have been moved or is currently unavailable. Explore our latest gift collection below.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-burgundy hover:bg-burgundy-800 text-cream font-semibold text-sm rounded-xl transition-all shadow-xs"
          >
            <span>Explore All Hampers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-cream-100 text-charcoal border border-cream-300 font-medium text-sm rounded-xl transition-colors"
          >
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
