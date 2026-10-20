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
    <section id="occasions" className="py-16 sm:py-24 bg-cream-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold font-sans">
            Curated For Every Celebration
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Shop by Occasion
          </h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal/70">
            Find an exquisitely packaged gift hamper crafted specifically for the special person in your life.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occasion) => {
            const Icon = occasion.icon;
            return (
              <Link
                key={occasion.title}
                href={occasion.href}
                className="group relative bg-white rounded-2xl p-6 border border-cream-200/80 hover:border-gold/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-burgundy/5 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-cream transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-100">
                      {occasion.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-burgundy transition-colors">
                    {occasion.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                    {occasion.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-cream-100 flex items-center justify-between text-xs font-semibold text-burgundy group-hover:text-burgundy-800">
                  <span>Explore Hampers</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
