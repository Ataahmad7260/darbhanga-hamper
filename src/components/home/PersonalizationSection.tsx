import React from "react";
import Link from "next/link";
import { Sparkles, Heart, ArrowRight } from "lucide-react";

export function PersonalizationSection() {
  return (
    <section className="py-16 sm:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-cream-100 via-white to-cream-50 rounded-3xl border border-gold/30 p-8 sm:p-12 lg:p-16 shadow-sm overflow-hidden relative">
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column: Description & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-burgundy-50 text-burgundy text-xs font-semibold rounded-full border border-burgundy-100 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Complimentary Personalization</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
                Add a Personal Message to Every Hamper
              </h2>

              <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed font-sans">
                A gift is only as meaningful as the words behind it. With Darbhanga Hamper, you can pen a heartfelt note for your loved one. We format and print your greeting on an elegant physical card, nestled right on top of their gift box.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-burgundy hover:bg-burgundy-800 text-cream font-semibold text-sm sm:text-base rounded-xl transition-all shadow-sm focus-visible:outline-burgundy active:scale-95"
                >
                  <span>Personalize Your Gift</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products/birthday-hamper-for-her"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-white hover:bg-cream-100 text-charcoal border border-cream-300 font-medium text-sm sm:text-base rounded-xl transition-all"
                >
                  Try Card Preview
                </Link>
              </div>
            </div>

            {/* Right Column: Physical Card Stationery Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 sm:p-8 border-2 border-gold/50 shadow-md relative transform lg:rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="absolute inset-2 border border-gold/30 rounded-xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gold/20">
                    <span className="font-serif text-xs font-bold text-burgundy uppercase tracking-widest">
                      Darbhanga Hamper
                    </span>
                    <Heart className="w-4 h-4 text-burgundy fill-burgundy/20" />
                  </div>

                  <div className="py-2">
                    <span className="text-[11px] uppercase tracking-wider text-charcoal/50 block font-medium">
                      Sample Greeting Message
                    </span>
                    <p className="font-serif text-base sm:text-lg text-charcoal/90 italic leading-relaxed mt-2">
                      “Happy Birthday, Priya! May this year bring endless laughter, sweet surprises, and big dreams. So grateful for you every day!”
                    </p>
                    <span className="block text-right font-serif text-xs sm:text-sm text-burgundy font-semibold mt-3">
                      — With all our love, Aisha & Rohan
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gold/20 flex items-center justify-between text-[11px] text-gold-700">
                    <span>💌 Printed on Luxury Cardstock</span>
                    <span>Tied with Satin Ribbon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
