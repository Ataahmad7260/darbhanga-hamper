import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Gift } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-burgundy-900 text-cream py-16 sm:py-24 lg:py-32">
      {/* Background Banner with Soft Dark/Burgundy Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
        <Image
          src="/images/hero/hero-gift-hampers.jpg"
          alt="Curated gift hampers by Darbhanga Hamper"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-burgundy-900/95 via-burgundy-900/80 to-burgundy-900/40 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream/10 backdrop-blur-sm border border-gold/30 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Handmade with Love in India</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            Make Every Moment Feel Special.
          </h1>

          {/* Supporting copy */}
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-cream-200 leading-relaxed font-sans max-w-xl">
            Thoughtfully curated hampers for birthdays, anniversaries, and all the little moments worth celebrating.
          </p>

          {/* CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gold hover:bg-gold-400 text-charcoal font-semibold text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-lg focus-visible:outline-white active:scale-95"
            >
              <Gift className="w-4 h-4" />
              <span>Shop Gift Hampers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#occasions"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-cream/10 hover:bg-cream/20 text-cream border border-cream/30 font-medium text-sm sm:text-base rounded-xl transition-all focus-visible:outline-white"
            >
              Find the Perfect Gift
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-12 pt-8 border-t border-cream/20 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-cream-200">
            <div>
              <span className="block font-serif text-lg font-bold text-gold">₹299 onwards</span>
              <span className="text-cream-300/80">Affordable Luxury</span>
            </div>
            <div>
              <span className="block font-serif text-lg font-bold text-gold">Personal Card</span>
              <span className="text-cream-300/80">Included in Every Hamper</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block font-serif text-lg font-bold text-gold">WhatsApp Order</span>
              <span className="text-cream-300/80">Direct Personal Service</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
