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
    <section className="py-16 sm:py-24 bg-cream-50 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold font-sans">
            Simple & Transparent
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            How Ordering Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal/70">
            A seamless, personal ordering process via WhatsApp with zero complicated account creation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-2xl p-6 border border-cream-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-gold/80">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-burgundy/5 text-burgundy flex items-center justify-center">
                      <Icon className="w-5 h-5 text-burgundy" />
                    </div>
                  </div>

                  <h3 className="font-serif text-base font-bold text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-cream-100 text-[11px] font-medium text-gold-700">
                  Step {idx + 1} of 5
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
