import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `Terms and Conditions for using and ordering through ${siteConfig.businessName}.`,
};

export default function TermsPage() {
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
              <FileText className="w-3.5 h-3.5" />
              <span>Store Policies</span>
            </div>
            <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Terms & Conditions
            </h1>
            <p className="mt-2 text-xs text-charcoal/50">
              Last updated: October 2026 • Starter terms for {siteConfig.businessName}
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
            <strong>Owner Notice:</strong> Please review these starter terms with your business and legal advisor to ensure alignment with local commercial laws, tax regulations, and shipping agreements.
          </div>

          <div className="space-y-6 text-sm text-charcoal/80 leading-relaxed font-sans">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">1. Acceptance of Terms</h2>
              <p>
                By browsing the {siteConfig.businessName} website or placing an order inquiry via WhatsApp, you agree to abide by these terms and conditions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">2. Products & Pricing</h2>
              <p>
                All prices are stated in Indian Rupees (₹). Product contents, boxes, ribbons, and included items are described as accurately as possible. Because items are assembled by hand, minor variations in packaging, ribbon color, or accessory styling may occur. Prices and availability are subject to change without prior notice.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">3. Order Inquiry & Confirmation</h2>
              <p>
                Submitting an order via WhatsApp constitutes an inquiry and does not guarantee immediate stock reservation. An order is deemed confirmed only after {siteConfig.businessName} verifies availability, agrees on delivery timelines, and receives confirmed payment from the customer.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">4. Personal Greeting Card Content</h2>
              <p>
                Customers are responsible for the content submitted for greeting card personalization. We reserve the right to decline printing text that is abusive, defamatory, or unlawful.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">5. Limitation of Liability</h2>
              <p>
                {siteConfig.businessName} partners with third-party logistics and courier services for deliveries across India. While we pack hampers securely, transit delays caused by courier logistics, severe weather, or recipient unavailability are outside our direct control.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">6. Inquiries & Support</h2>
              <p>
                For questions regarding these terms, contact us at{" "}
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
