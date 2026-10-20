import React from "react";
import { Gift, PenLine, FileCheck, MessageCircle, Truck } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Choose a Hamper",
      description: "Browse our curated collection of birthday, anniversary, and everyday gift sets.",
      icon: Gift,
    },
    {
      number: "02",
      title: "Add a Personal Message",
      description: "Write your greeting card note with our live stationery preview.",
      icon: PenLine,
    },
    {
      number: "03",
      title: "Review Your Order",
      description: "Provide your delivery address and check your order summary on our checkout page.",
      icon: FileCheck,
    },
    {
      number: "04",
      title: "Send via WhatsApp",
      description: "Click to generate a pre-formatted WhatsApp inquiry message sent directly to us.",
      icon: MessageCircle,
    },
    {
      number: "05",
      title: "Confirm & Deliver",
      description: "We confirm stock, finalize delivery cost to your PIN, and share payment details.",
      icon: Truck,
    },
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-cream-50 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold font-sans">
            Simple & Transparent
          </span>
          <h2 className="mt-1 sm:mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal">
            How Ordering Works
          </h2>
          <p className="mt-2 text-xs sm:text-sm lg:text-base text-charcoal/70">
            A seamless, personal ordering process via WhatsApp with zero complicated account creation.
          </p>
        </div>

        {/* Mobile: Horizontal snap carousel | Desktop: 5-column grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 overflow-x-auto snap-x snap-mandatory gap-3.5 sm:gap-6 pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="min-w-[240px] sm:min-w-0 snap-start relative bg-white rounded-2xl p-5 sm:p-6 border border-cream-200 shadow-2xs flex flex-col justify-between shrink-0 sm:shrink"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-gold/90">
                      {step.number}
                    </span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-burgundy/5 text-burgundy flex items-center justify-center">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-burgundy" />
                    </div>
                  </div>

                  <h3 className="font-serif text-sm sm:text-base font-bold text-charcoal mb-1.5 sm:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-charcoal/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 pt-2.5 sm:pt-3 border-t border-cream-100 text-[10px] sm:text-[11px] font-semibold text-gold-700">
                  Step {idx + 1} of 5
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile swipe helper */}
        <div className="sm:hidden text-center text-[11px] text-gold-700 font-semibold mt-1 flex items-center justify-center gap-1">
          <span>Swipe steps</span>
          <span>→</span>
        </div>
      </div>
    </section>
  );
}
