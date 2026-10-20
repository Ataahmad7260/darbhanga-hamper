import React from "react";
import { siteConfig } from "@/config/site";
import { Heart } from "lucide-react";

export function BrandStorySection() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-semibold uppercase tracking-wider mb-5">
          <Heart className="w-3.5 h-3.5 text-burgundy fill-burgundy/20" />
          <span>Our Philosophy</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal">
          Every Gift Tells a Story
        </h2>

        <div className="mt-6 space-y-4 text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
          <p>
            At <strong className="text-burgundy font-semibold">{siteConfig.businessName}</strong>, we believe the true magic of gifting lies in the intention behind it. Whether it’s an unexpected birthday surprise, a milestone anniversary, or a thoughtful token of appreciation, a gift should carry genuine emotion.
          </p>
          <p>
            We curate ready-to-gift hampers that combine everyday charm, delightful fragrances, and personal keepsake details. Each hamper is carefully prepared by hand, finished with elegant ribbons, and paired with your handwritten greeting card message.
          </p>
          <p className="text-sm sm:text-base text-charcoal/60 pt-2 italic">
            “Thoughtful Gifts. Beautiful Memories.” — Made for the moments that matter most.
          </p>
        </div>
      </div>
    </section>
  );
}
