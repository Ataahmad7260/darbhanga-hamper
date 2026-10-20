import React from "react";
import Link from "next/link";
import { Cake, Sparkles, Heart, Gift, ArrowRight } from "lucide-react";

export function OccasionSection() {
  const occasions = [
    {
      title: "Birthday Gifts",
      description: "Celebrate milestones with curated keepsakes and surprises.",
      href: "/shop?category=Birthday+Gifts",
      icon: Cake,
      badge: "Most Popular",
    },
    {
      title: "Gifts for Her",
      description: "Delightful aesthetics, charming accessories, and sweet treats.",
      href: "/shop?q=her",
      icon: Sparkles,
      badge: "Curated Sets",
    },
    {
      title: "Gifts for Him",
      description: "Everyday essentials, sophisticated styling, and cologne.",
      href: "/shop?q=him",
      icon: Gift,
      badge: "Gentlemen's Edit",
    },
    {
      title: "Anniversary Gifts",
      description: "Romantic keepsakes and his & her fragrances to celebrate love.",
      href: "/shop?category=Anniversary+Gifts",
      icon: Heart,
      badge: "Couple Favorite",
    },
  ];

  return (
    <section id="occasions" className="py-12 sm:py-20 lg:py-24 bg-cream-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold font-sans">
            Curated For Every Celebration
          </span>
          <h2 className="mt-1 sm:mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal">
            Shop by Occasion
          </h2>
          <p className="mt-2 text-xs sm:text-sm lg:text-base text-charcoal/70">
            Find an exquisitely packaged gift hamper crafted specifically for the special person in your life.
          </p>
        </div>

        {/* 2-column on mobile, 4-column on desktop */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {occasions.map((occasion) => {
            const Icon = occasion.icon;
            return (
              <Link
                key={occasion.title}
                href={occasion.href}
                className="group relative bg-white rounded-2xl p-3.5 sm:p-6 border border-cream-200/90 hover:border-gold/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between active:scale-98"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4 gap-1">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-burgundy/5 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-cream transition-colors duration-300 shrink-0">
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[9px] sm:text-[11px] font-bold text-gold-800 bg-gold/15 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-gold/30 truncate">
                      {occasion.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-sm sm:text-lg lg:text-xl font-bold text-charcoal group-hover:text-burgundy transition-colors leading-snug">
                    {occasion.title}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs lg:text-sm text-charcoal/70 leading-relaxed line-clamp-2">
                    {occasion.description}
                  </p>
                </div>

                <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-4 border-t border-cream-100 flex items-center justify-between text-[11px] sm:text-xs font-bold text-burgundy group-hover:text-burgundy-800">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
