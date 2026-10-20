"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  ShieldCheck,
  Truck,
  ArrowLeft,
  AlertCircle,
  Copy,
  Check,
  Heart,
  Calendar,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CheckoutFormData, CheckoutValidationErrors } from "@/types";
import { validateCheckoutForm } from "@/lib/checkout";
import { buildWhatsAppOrderLink, WhatsAppOrderResult } from "@/lib/whatsapp";
import { formatINR } from "@/data/products";
import { siteConfig } from "@/config/site";

export function CheckoutClient() {
  const { items, totals, isHydrated } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: "",
    phoneNumber: "",
    deliveryAddress: "",
    city: "",
    state: "",
    pinCode: "",
    preferredDeliveryDate: "",
    orderNotes: "",
  });

  const [errors, setErrors] = useState<CheckoutValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderResult, setOrderResult] = useState<WhatsAppOrderResult | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);

  if (!isHydrated) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 text-center">
        <div className="w-8 h-8 border-3 border-burgundy border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-serif text-lg text-charcoal/70">Preparing order review...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-16 sm:py-24 max-w-lg mx-auto px-4 text-center">
        <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-5 text-burgundy">
          <Truck className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
          Your Cart is Empty
        </h1>
        <p className="mt-2 text-sm text-charcoal/70">
          Please add a hamper to your cart before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-burgundy text-cream text-sm font-semibold rounded-xl hover:bg-burgundy-800 transition-colors"
        >
          <span>Explore Hampers</span>
        </Link>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on change
    if (errors[name as keyof CheckoutValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCheckoutForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      // Scroll to the first error
      const firstErrorField = Object.keys(validation.errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const result = buildWhatsAppOrderLink(items, totals, formData);
    setOrderResult(result);
    setShowConfirmModal(true);
  };

  const handleOpenWhatsApp = () => {
    if (orderResult && orderResult.url) {
      setIsSubmitting(true);
      window.open(orderResult.url, "_blank", "noopener,noreferrer");
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

  const handleCopyMessage = () => {
    if (orderResult) {
      navigator.clipboard.writeText(orderResult.rawMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    }
  };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Back Link */}
        <div className="mb-8 pb-4 border-b border-cream-200">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal/70 hover:text-burgundy transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shopping Cart</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Review Your Order
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Provide delivery details for your WhatsApp order inquiry. No advance payment required right now.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Delivery Details Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-cream-200 shadow-2xs space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-charcoal">
                  1. Delivery Information
                </h2>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  Where should we send your handcrafted hamper?
                </p>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-xs font-semibold text-charcoal mb-1"
                  >
                    Full Name <span className="text-burgundy">*</span>
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="e.g. Aditi Sharma"
                    className={`w-full p-3 text-sm bg-cream-50/50 border rounded-xl focus:outline-none focus:ring-1 ${
                      errors.customerName
                        ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                        : "border-cream-300 focus:border-burgundy focus:ring-burgundy"
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-xs font-semibold text-charcoal mb-1"
                  >
                    Mobile / WhatsApp Number <span className="text-burgundy">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className={`w-full p-3 text-sm bg-cream-50/50 border rounded-xl focus:outline-none focus:ring-1 ${
                      errors.phoneNumber
                        ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                        : "border-cream-300 focus:border-burgundy focus:ring-burgundy"
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="deliveryAddress"
                  className="block text-xs font-semibold text-charcoal mb-1"
                >
                  House / Flat No., Street, Landmark <span className="text-burgundy">*</span>
                </label>
                <textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  rows={2}
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  placeholder="e.g. Flat 302, Rosewood Heights, MG Road, near Metro station"
                  className={`w-full p-3 text-sm bg-cream-50/50 border rounded-xl focus:outline-none focus:ring-1 ${
                    errors.deliveryAddress
                      ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                      : "border-cream-300 focus:border-burgundy focus:ring-burgundy"
                  }`}
                />
                {errors.deliveryAddress && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.deliveryAddress}
                  </p>
                )}
              </div>

              {/* City, State, PIN */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-xs font-semibold text-charcoal mb-1"
                  >
                    City <span className="text-burgundy">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Darbhanga"
                    className={`w-full p-3 text-sm bg-cream-50/50 border rounded-xl focus:outline-none focus:ring-1 ${
                      errors.city
                        ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                        : "border-cream-300 focus:border-burgundy focus:ring-burgundy"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-xs font-semibold text-charcoal mb-1"
                  >
                    State <span className="text-burgundy">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g. Bihar"
                    className={`w-full p-3 text-sm bg-cream-50/50 border rounded-xl focus:outline-none focus:ring-1 ${
                      errors.state
                        ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                        : "border-cream-300 focus:border-burgundy focus:ring-burgundy"
                    }`}
                  />
                  {errors.state && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.state}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="pinCode"
                    className="block text-xs font-semibold text-charcoal mb-1"
                  >
                    PIN Code <span className="text-burgundy">*</span>
                  </label>
                  <input
                    type="text"
                    id="pinCode"
                    name="pinCode"
                    maxLength={6}
                    value={formData.pinCode}
                    onChange={handleChange}
                    placeholder="e.g. 846004"
                    className={`w-full p-3 text-sm bg-cream-50/50 border rounded-xl focus:outline-none focus:ring-1 ${
                      errors.pinCode
                        ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                        : "border-cream-300 focus:border-burgundy focus:ring-burgundy"
                    }`}
                  />
                  {errors.pinCode && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.pinCode}
                    </p>
                  )}
                </div>
              </div>

              {/* Optional Fields: Preferred Date & Notes */}
              <div className="pt-4 border-t border-cream-100 space-y-4">
                <div>
                  <h3 className="font-serif text-base font-semibold text-charcoal flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gold-700" />
                    <span>Special Instructions & Preferred Date (Optional)</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="preferredDeliveryDate"
                      className="block text-xs font-semibold text-charcoal mb-1"
                    >
                      Preferred Delivery Date (Optional)
                    </label>
                    <input
                      type="date"
                      id="preferredDeliveryDate"
                      name="preferredDeliveryDate"
                      value={formData.preferredDeliveryDate}
                      onChange={handleChange}
                      className="w-full p-3 text-sm bg-cream-50/50 border border-cream-300 rounded-xl focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                    />
                    <p className="text-[11px] text-charcoal/50 mt-1">
                      Feasibility verified via WhatsApp based on your courier zone.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="orderNotes"
                      className="block text-xs font-semibold text-charcoal mb-1"
                    >
                      Order Notes / Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      id="orderNotes"
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleChange}
                      placeholder="e.g. Please deliver after 5 PM if possible"
                      className="w-full p-3 text-sm bg-cream-50/50 border border-cream-300 rounded-xl focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="pt-2 text-xs text-charcoal/60 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Your contact details are used exclusively to process your hamper order inquiry. We never share customer data or send unsolicited spam.
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-base transition-all shadow-sm focus-visible:outline-emerald-700 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Review & Send WhatsApp Order Inquiry</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Review & Item List */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-2xs space-y-5">
              <h2 className="font-serif text-xl font-bold text-charcoal pb-3 border-b border-cream-200">
                2. Order Summary ({totals.itemCount} Items)
              </h2>

              {/* Items List */}
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 pb-3 border-b border-cream-100 last:border-b-0"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-cream-50 shrink-0 border border-cream-200">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-bold text-charcoal truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-charcoal/60">
                        Qty: {item.quantity} × {formatINR(item.product.price)}
                      </p>
                      {item.greetingMessage && (
                        <div className="mt-1 bg-[#FFFDF9] p-1.5 rounded border border-gold/30 text-[11px] text-charcoal/80 flex items-start gap-1">
                          <Heart className="w-3 h-3 text-burgundy shrink-0 mt-0.5 fill-burgundy/20" />
                          <span className="italic truncate">&ldquo;{item.greetingMessage}&rdquo;</span>
                        </div>
                      )}
                    </div>
                    <span className="font-serif text-sm font-bold text-burgundy shrink-0">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="pt-3 border-t border-cream-200 space-y-2 text-sm">
                <div className="flex justify-between text-charcoal/80">
                  <span>Hamper Subtotal</span>
                  <span className="font-semibold text-charcoal">
                    {formatINR(totals.subtotalRupees)}
                  </span>
                </div>

                <div className="flex justify-between text-charcoal/80">
                  <div>
                    <span>Delivery Charge</span>
                    <span className="block text-[11px] text-charcoal/50">
                      Verified based on destination PIN code
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-gold-700">
                    To be confirmed
                  </span>
                </div>

                <div className="pt-3 border-t border-cream-200 flex justify-between items-baseline">
                  <div>
                    <span className="font-serif text-lg font-bold text-charcoal block">
                      Estimated Total
                    </span>
                    <span className="text-[11px] text-charcoal/50">
                      (Excluding final delivery fee)
                    </span>
                  </div>
                  <span className="font-serif text-2xl font-bold text-burgundy">
                    {formatINR(totals.subtotalRupees)}
                  </span>
                </div>
              </div>

              {/* Ordering Workflow Explanation */}
              <div className="bg-cream-50 p-4 rounded-xl border border-cream-200 text-xs text-charcoal/70 space-y-2">
                <span className="font-semibold text-burgundy block">
                  How Payment & Delivery Work:
                </span>
                <p>
                  1. Your order inquiry opens directly in WhatsApp with all hamper and message details pre-formatted.
                </p>
                <p>
                  2. Our team confirms box availability, calculates courier charges to your PIN code, and shares direct digital payment details.
                </p>
                <p>
                  3. Once payment is confirmed, your hamper is hand-assembled, personalized, and dispatched.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation & WhatsApp Preview Modal */}
      {showConfirmModal && orderResult && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-cream-300 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <div className="flex items-center gap-2 text-emerald-800">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <h3 id="confirm-modal-title" className="font-serif text-lg font-bold">
                  Confirm WhatsApp Order Inquiry
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="text-charcoal/50 hover:text-charcoal text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-charcoal/75">
              Review your pre-formatted order message below. Clicking <strong>Send on WhatsApp</strong> will open your WhatsApp chat with our team.
            </p>

            {/* Formatted message preview */}
            <div className="bg-cream-50 p-4 rounded-xl border border-cream-200 text-xs font-mono text-charcoal/80 whitespace-pre-wrap max-h-56 overflow-y-auto">
              {orderResult.rawMessage}
            </div>

            {/* Store Configuration Notice if WhatsApp number is unconfigured */}
            {!orderResult.isConfigured && (
              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-800">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Store Owner Notice: WhatsApp Number Pending</span>
                </div>
                <p>
                  The business owner hasn’t set their production WhatsApp number in configuration yet. You can copy the complete order message above to send manually or reach out at{" "}
                  <strong>{siteConfig.contactEmail}</strong>.
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="space-y-3 pt-2">
              {orderResult.isConfigured ? (
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm transition-all shadow-sm focus-visible:outline-emerald-700"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send on WhatsApp</span>
                </button>
              ) : null}

              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-cream-100 text-charcoal border border-cream-300 rounded-xl text-xs sm:text-sm font-medium transition-colors"
              >
                {copiedMessage ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedMessage ? "Order Message Copied!" : "Copy Order Details"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="w-full text-center text-xs text-charcoal/60 hover:text-charcoal py-1"
              >
                Cancel / Edit Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
