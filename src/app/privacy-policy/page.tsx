import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.businessName}. Learn how we handle customer data for gift hamper inquiries and delivery.`,
};

export default function PrivacyPolicyPage() {
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
              <Shield className="w-3.5 h-3.5" />
              <span>Customer Trust & Data Protection</span>
            </div>
            <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs text-charcoal/50">
              Last updated: October 2026 • Starter template for {siteConfig.businessName}
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
            <strong>Owner Notice:</strong> This privacy document serves as an initial template for Darbhanga Hamper. Please review and tailor with your legal advisor to match your exact legal entity, GST registration, and customer data workflows.
          </div>

          <div className="space-y-6 text-sm text-charcoal/80 leading-relaxed font-sans">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">1. Information We Collect</h2>
              <p>
                When you place an order inquiry or contact {siteConfig.businessName}, we collect only the personal details necessary to fulfill your gift hamper order:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your name and contact phone / WhatsApp number</li>
                <li>Delivery address, city, state, and destination PIN code</li>
                <li>Optional greeting card messages for hamper customization</li>
                <li>Any special delivery notes or instructions you provide</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">2. How We Use Your Information</h2>
              <p>We use your information strictly for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Processing and assembling your gift hamper order inquiry</li>
                <li>Printing your personal greeting card text</li>
                <li>Coordinating shipping and dispatch with Indian courier partners</li>
                <li>Communicating with you via WhatsApp or phone regarding order status and payment</li>
              </ul>
              <p>We do not sell, rent, trade, or share your contact information with third-party advertisers.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">3. Payment Information Security</h2>
              <p>
                {siteConfig.businessName} does not collect or store credit card details, debit card numbers, or banking passwords on this website. All payments are completed through verified digital channels (UPI, Google Pay, PhonePe, or bank transfers) directly between the customer and the business.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">4. Data Storage and Local Cart</h2>
              <p>
                Our website utilizes your browser’s local storage to preserve your cart items and custom card messages while you shop. This data stays on your local device and is never uploaded until you initiate an order inquiry.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-charcoal">5. Contact Us</h2>
              <p>
                If you have questions about our privacy practices, please contact us at{" "}
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
