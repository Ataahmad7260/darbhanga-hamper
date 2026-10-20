import React from "react";
import { Sparkles, MessageCircle, HeartHandshake, PackageCheck } from "lucide-react";

export function WhyChooseSection() {
  const features = [
    {
      title: "Thoughtfully Curated Gifts",
      description:
        "Every hamper combines useful lifestyle items, fragrant scents, and sweet surprises selected to complement each other.",
      icon: HeartHandshake,
    },
    {
      title: "Personal Greeting Messages",
      description:
        "Add your heartfelt custom message to any hamper at checkout. We print and tuck it inside an elegant stationery card.",
      icon: Sparkles,
    },
    {
      title: "Attractive Gift Presentation",
      description:
        "Delivered in our signature sturdy gift box with color-coordinated satin ribbon and protective crinkle filler — ready to gift.",
      icon: PackageCheck,
    },
    {
      title: "Easy WhatsApp Ordering",
      description:
        "Direct one-to-one communication with our team to verify order details, delivery timelines to your PIN code, and payment.",
      icon: MessageCircle,
    },
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-cream-50 border-y border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold font-sans">
            The Darbhanga Promise
          </span>
          <h2 className="mt-1 sm:mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal">
            Why Choose Darbhanga Hamper?
          </h2>
          <p className="mt-2 text-xs sm:text-sm lg:text-base text-charcoal/70">
            We focus on genuine craftsmanship, warm personal touches, and transparent communication for every order.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white p-5 sm:p-7 rounded-2xl border border-cream-200/90 shadow-2xs hover:border-burgundy/30 transition-all flex flex-col justify-start"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-burgundy-50 text-burgundy flex items-center justify-center mb-4 sm:mb-5 shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-charcoal mb-1.5 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
