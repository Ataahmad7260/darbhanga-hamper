"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { siteConfig, isWhatsAppConfigured } from "@/config/site";

export function ContactClient() {
  const whatsAppReady = isWhatsAppConfigured();

  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [subject, setSubject] = useState("General Hamper Inquiry");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "ready_to_send">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !emailOrPhone.trim() || !message.trim()) {
      setError("Please fill in your name, contact details, and message.");
      return;
    }
    setError(null);
    setStatus("ready_to_send");
  };

  const handleSendViaWhatsApp = () => {
    const raw = [
      `*💬 NEW MESSAGE — ${siteConfig.businessName.toUpperCase()}*`,
      `• From: ${name.trim()}`,
      `• Contact: ${emailOrPhone.trim()}`,
      `• Subject: ${subject}`,
      "",
      `*Message:*`,
      message.trim(),
    ].join("\n");

    const url = whatsAppReady
      ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(raw)}`
      : "";

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const mailtoLink = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    `[${siteConfig.businessName}] ${subject}`
  )}&body=${encodeURIComponent(
    `Hello ${siteConfig.businessName} Team,\n\nName: ${name}\nContact: ${emailOrPhone}\n\nMessage:\n${message}\n`
  )}`;

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold font-sans">
            We’d Love to Hear From You
          </span>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
            Get in Touch
          </h1>
          <p className="mt-3 text-sm sm:text-base text-charcoal/70">
            Have questions about custom hamper combinations, corporate bulk orders, or delivery to your location? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-cream-200 shadow-2xs space-y-6">
              <h2 className="font-serif text-xl font-bold text-charcoal pb-3 border-b border-cream-200">
                Contact Channels
              </h2>

              <div className="space-y-4 text-sm">
                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block">WhatsApp Chat</span>
                    {whatsAppReady ? (
                      <a
                        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                          `Hello ${siteConfig.businessName}, I would like to inquire about your gift hampers.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-700 hover:underline font-medium mt-0.5 block"
                      >
                        Click to message us on WhatsApp
                      </a>
                    ) : (
                      <p className="text-xs text-charcoal/60 mt-0.5">
                        WhatsApp ordering available at checkout
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-burgundy-50 text-burgundy flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block">Email Support</span>
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="text-xs text-burgundy hover:underline font-medium mt-0.5 block"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </div>
                </div>

                {/* Service Region */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block">Gifting Region</span>
                    <p className="text-xs text-charcoal/70 mt-0.5">
                      Shipping to destinations across India. Specific transit times confirmed upon address inquiry.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-cream-50 p-4 rounded-xl border border-cream-200 text-xs text-charcoal/70 space-y-1">
                <span className="font-semibold text-charcoal block">Response Expectations:</span>
                <p>
                  We are an artisanal small business. We review messages as quickly as possible during regular business hours to confirm your gifting requests.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-cream-200 shadow-2xs">
              <h2 className="font-serif text-xl font-bold text-charcoal mb-1">
                Send an Inquiry
              </h2>
              <p className="text-xs text-charcoal/60 mb-6">
                Prepare your message below to send via WhatsApp or Email.
              </p>

              {error && (
                <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {status === "ready_to_send" ? (
                <div className="bg-cream-50 p-6 rounded-2xl border border-cream-300 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Inquiry Prepared!</span>
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal/80">
                    Your inquiry has been formulated. Choose your preferred channel to send it directly to our team:
                  </p>

                  <div className="space-y-3 pt-2">
                    {whatsAppReady ? (
                      <button
                        type="button"
                        onClick={handleSendViaWhatsApp}
                        className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send via WhatsApp</span>
                      </button>
                    ) : null}

                    <a
                      href={mailtoLink}
                      className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-burgundy hover:bg-burgundy-800 text-cream rounded-xl text-sm font-semibold transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Email Client</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="w-full text-center text-xs text-charcoal/60 hover:text-charcoal py-1"
                    >
                      Edit Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-charcoal mb-1">
                      Your Name <span className="text-burgundy">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Verma"
                      className="w-full p-3 text-sm bg-cream-50/50 border border-cream-300 rounded-xl focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email-phone" className="block text-xs font-semibold text-charcoal mb-1">
                      Email or Phone Number <span className="text-burgundy">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-email-phone"
                      required
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      placeholder="e.g. rahul@example.com or 9876543210"
                      className="w-full p-3 text-sm bg-cream-50/50 border border-cream-300 rounded-xl focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-charcoal mb-1">
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-3 text-sm bg-cream-50/50 border border-cream-300 rounded-xl focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                    >
                      <option value="General Hamper Inquiry">General Hamper Inquiry</option>
                      <option value="Custom Hamper Request">Custom Hamper Request</option>
                      <option value="Bulk / Corporate Gifting">Bulk / Corporate Gifting</option>
                      <option value="Delivery PIN Code Inquiry">Delivery PIN Code Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-charcoal mb-1">
                      Your Message <span className="text-burgundy">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you’re looking for or ask any questions about our hampers…"
                      className="w-full p-3 text-sm bg-cream-50/50 border border-cream-300 rounded-xl focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-burgundy hover:bg-burgundy-800 text-cream rounded-xl text-sm font-semibold transition-all shadow-xs focus-visible:outline-burgundy active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Proceed to Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
