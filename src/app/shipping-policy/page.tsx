import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Shipping and Delivery Policy",
  description: `Shipping guidelines, dispatch timelines, and delivery terms for ${siteConfig.businessName}.`,
};

export default function ShippingPolicyPage() {
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
              <Truck className="w-3.5 h-3.5" />
              <span>Nationwide Delivery</span>
            </div>
            <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Shipping & Delivery Policy
            </h1>
            <p className="mt-2 text-xs text-charcoal/50">
              Last updated: October 2026 • Policy for {siteConfig.businessName}
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
            <strong>Owner Notice:</strong> Verify your designated courier partners (e.g. Delhivery, DTDC, Blue Dart, India Post) and typical regional shipping rates before publishing.
          </div>

          <div className="space-y-6 text-sm text-charcoal/80 leading-relaxed font-sans">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">1. Order Processing Time</h2>
              <p>
                Each {siteConfig.businessName} hamper is hand-assembled with fresh packaging, satin ribbons, and your printed greeting card. Orders are typically prepared and dispatched within 1 to 2 business days after payment confirmation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">2. Delivery Charges</h2>
              <p>
                Because shipping fees depend on parcel weight, package dimensions, and your delivery PIN code, shipping charges are not fixed arbitrarily. During your WhatsApp order conversation, we check real-time courier rates to your destination PIN and provide the exact courier fee before you complete payment.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">3. Estimated Transit Timelines</h2>
              <p>
                Standard courier delivery across India typically takes:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Metro Cities:</strong> 2 to 4 business days post-dispatch.</li>
                <li><strong>Rest of India:</strong> 4 to 7 business days post-dispatch.</li>
              </ul>
              <p className="text-xs text-charcoal/60">
                Note: Delivery timelines are estimates provided by courier partners and can vary during national holidays, festive seasons, or regional weather events.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">4. Packaging Safety</h2>
              <p>
                We take special care to ensure your gift reaches its recipient in pristine condition. All hampers are cushioned with crinkle filler, bubble-wrapped, and shipped in sturdy external corrugated cartons to protect delicate items, perfumes, and greeting cards.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">5. Tracking and Inquiries</h2>
              <p>
                Once your package is handed over to the courier partner, our team sends the tracking number / link directly to you on WhatsApp so you can monitor transit in real time.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
