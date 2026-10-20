"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How can I order a hamper?",
      answer:
        "Simply choose your favorite hamper, optionally add a personal greeting message, and click 'Proceed to Order' from your cart. You will review your order summary and generate an inquiry message sent directly to our team via WhatsApp. We will confirm availability and guide you through payment.",
    },
    {
      question: "Can I personalize a greeting card?",
      answer:
        "Yes! Every hamper includes a complimentary greeting card. When viewing a hamper or at checkout, type your personal message (up to 250 characters). We will carefully print and include your message inside the gift box.",
    },
    {
      question: "Can I request a specific delivery date?",
      answer:
        "You can specify a preferred delivery date during checkout. Our team will verify courier transit times to your destination PIN code via WhatsApp to let you know if delivery by your requested date is feasible.",
    },
    {
      question: "How do I confirm delivery charges?",
      answer:
        "Because shipping rates vary based on weight and your delivery PIN code across India, delivery charges are confirmed directly during our WhatsApp order conversation before you make payment.",
    },
    {
      question: "Can product availability change?",
      answer:
        "Yes. While we keep our product listings updated, hamper components are assembled in small batches. Once you send your order inquiry, our team confirms that all items and box supplies are in stock before accepting payment.",
    },
    {
      question: "Which payment methods are available?",
      answer:
        "Once your order details and delivery charges are confirmed via WhatsApp, our business shares safe digital payment options (such as UPI, Google Pay, PhonePe, or direct bank transfer) for order completion.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-cream-50 border-t border-cream-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-gold font-sans">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal/70">
            Everything you need to know about ordering, delivery, and personalizing with {siteConfig.businessName}.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-xl border border-cream-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 hover:bg-cream-50/50 transition-colors focus-visible:outline-burgundy"
                >
                  <span className="font-serif text-base sm:text-lg font-semibold text-charcoal">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-burgundy transition-transform duration-200 shrink-0 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-charcoal/75 leading-relaxed border-t border-cream-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
