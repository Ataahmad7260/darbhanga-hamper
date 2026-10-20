"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { MessageCircle, Mail, MapPin, Sparkles } from "lucide-react";
import { siteConfig, isWhatsAppConfigured } from "@/config/site";

export function Footer() {
  const currentYear = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => 2026
  );

  const whatsAppReady = isWhatsAppConfigured();

  return (
    <footer className="bg-charcoal text-cream-50 pt-16 pb-8 border-t-4 border-burgundy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-charcoal-700">
          {/* Brand Info */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold text-cream tracking-tight block">
                {siteConfig.businessName}
              </span>
              <span className="text-xs tracking-widest uppercase font-medium text-gold font-sans block mt-0.5">
                {siteConfig.primaryTagline}
              </span>
            </div>
            <p className="text-sm text-cream-300 leading-relaxed">
              Curating beautiful gift hampers with complimentary personalized greeting cards. We bring warmth and joy to birthdays, anniversaries, and celebratory moments across India.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-gold">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Thoughtfully packaged with love & care</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-cream">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-cream-300 hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-cream-300 hover:text-gold transition-colors">
                  Shop All Hampers
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Birthday+Gifts" className="text-cream-300 hover:text-gold transition-colors">
                  Birthday Gifts
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Girls+Accessories" className="text-cream-300 hover:text-gold transition-colors">
                  Girls Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Anniversary+Gifts" className="text-cream-300 hover:text-gold transition-colors">
                  Anniversary Gifts
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream-300 hover:text-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-cream">Customer Care</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/shipping-policy" className="text-cream-300 hover:text-gold transition-colors">
                  Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-cream-300 hover:text-gold transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-cream-300 hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-cream-300 hover:text-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & WhatsApp */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-cream">Get in Touch</h3>
            <p className="text-sm text-cream-300">
              Have a custom hamper inquiry or question about delivery to your PIN code? Reach out directly.
            </p>
            <div className="space-y-2.5 text-sm">
              {whatsAppReady ? (
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    "Hello Darbhanga Hamper, I have an inquiry about your gift hampers."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Chat on WhatsApp</span>
                </a>
              ) : (
                <div className="flex items-center gap-2.5 text-cream-300/80 text-xs">
                  <MessageCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>WhatsApp ordering available at checkout</span>
                </div>
              )}

              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="flex items-center gap-2.5 text-cream-300 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span className="truncate">{siteConfig.contactEmail}</span>
              </a>

              <div className="flex items-start gap-2.5 text-cream-300/80 text-xs pt-1">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gold" />
                <span>Delivering across India • Inquiries confirmed by team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-300/70">
          <p>
            © {currentYear} {siteConfig.businessName}. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Prices displayed in Indian Rupees ({siteConfig.currencySymbol}). Orders confirmed via WhatsApp inquiry.
          </p>
        </div>
      </div>
    </footer>
  );
}
