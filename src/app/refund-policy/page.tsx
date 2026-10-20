import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cancellation and Refund Policy",
  description: `Cancellation, return, and refund policies for ${siteConfig.businessName} gift hampers.`,
};

export default function RefundPolicyPage() {
  return (
    <div className="py-12 sm:py-20 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal/70 hover:text-burgundy transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-cream-200 shadow-xs space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-gold font-sans">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Customer Satisfaction</span>
            </div>
            <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Cancellation & Refund Policy
            </h1>
            <p className="mt-2 text-xs text-charcoal/50">
              Last updated: October 2026 • Starter terms for {siteConfig.businessName}
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
            <strong>Owner Notice:</strong> Because gift hampers involve customized greeting messages and perishable/fragile items (chocolates, perfumes), review these return rules against your supplier policies.
          </div>

          <div className="space-y-6 text-sm text-charcoal/80 leading-relaxed font-sans">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">1. Order Cancellation</h2>
              <p>
                You may request order cancellation prior to dispatch by messaging us directly on WhatsApp. If your personalized greeting card has already been printed and the box assembled, a nominal customization fee may be deducted from the refund. Once a hamper has been handed over to the courier partner, cancellations cannot be accepted.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">2. Personalized & Fragile Items</h2>
              <p>
                Due to the customized nature of printed greeting cards and hygienic/perishable components (e.g. chocolates, beauty essentials, hair accessories), we do not accept general change-of-mind returns once delivered.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">3. Damaged or Incorrect Deliveries</h2>
              <p>
                Your satisfaction is our priority. If any item arrives damaged in transit or if there is an omission:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Please notify us on WhatsApp or email within <strong>24 hours</strong> of delivery.</li>
                <li>Share clear photos or an unboxing video showing the outer shipping box and damaged items.</li>
                <li>Upon verification, we will promptly arrange a replacement of the damaged component or issue an appropriate refund.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">4. Refund Processing</h2>
              <p>
                Approved refunds are initiated within 2 business days and credited back to your original source of payment (UPI / bank account).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">5. Contact for Support</h2>
              <p>
                For assistance with any order issue, please reach out to us at{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-burgundy underline">
                  {siteConfig.contactEmail}
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
