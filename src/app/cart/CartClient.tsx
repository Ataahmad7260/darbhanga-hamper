"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
  Heart,
  Edit2,
  ArrowLeft,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/data/products";

export function CartClient() {
  const {
    items,
    totals,
    isHydrated,
    updateQuantity,
    removeItem,
    updateGreetingMessage,
    clearCart,
  } = useCart();

  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [tempGreetingMessage, setTempGreetingMessage] = useState("");

  if (!isHydrated) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 text-center">
        <div className="w-8 h-8 border-3 border-burgundy border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-serif text-lg text-charcoal/70">Loading your shopping cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-16 sm:py-24 max-w-xl mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6 text-burgundy border border-cream-300">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-charcoal">
          Your Cart is Empty
        </h1>
        <p className="mt-3 text-sm sm:text-base text-charcoal/70 leading-relaxed">
          Looks like you haven’t added any gift hampers yet. Explore our curated collections for birthdays, anniversaries, and personal surprises.
        </p>
        <div className="mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-burgundy hover:bg-burgundy-800 text-cream font-semibold text-sm rounded-xl transition-all shadow-xs focus-visible:outline-burgundy"
          >
            <span>Explore Gift Hampers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const handleStartEditMessage = (itemId: string, currentMessage?: string) => {
    setEditingCardId(itemId);
    setTempGreetingMessage(currentMessage || "");
  };

  const handleSaveMessage = (itemId: string) => {
    updateGreetingMessage(itemId, tempGreetingMessage);
    setEditingCardId(null);
  };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-cream-200">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
              Review your hampers and personalized greeting card messages before ordering.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-charcoal/60 font-medium">
              {totals.itemCount} {totals.itemCount === 1 ? "hamper" : "hampers"}
            </span>
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-charcoal/60 hover:text-burgundy underline transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => {
              const itemTotal = item.product.price * item.quantity;
              const isEditingThisCard = editingCardId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-cream-200 shadow-2xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    {/* Thumbnail */}
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-cream-50 shrink-0 border border-cream-200 block"
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </Link>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-semibold text-gold-700 bg-gold-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {item.product.category}
                          </span>
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="block font-serif text-base sm:text-lg font-bold text-charcoal hover:text-burgundy transition-colors mt-1"
                          >
                            {item.product.name}
                          </Link>
                          <span className="text-xs text-charcoal/60 block mt-0.5">
                            Unit Price: {formatINR(item.product.price)}
                          </span>
                        </div>

                        {/* Remove item */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.product.name} from cart`}
                          className="p-1.5 text-charcoal/40 hover:text-burgundy rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity & Item Subtotal Row */}
                      <div className="mt-4 pt-3 border-t border-cream-100 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-charcoal/70">Quantity:</span>
                          <div className="inline-flex items-center border border-cream-300 rounded-lg bg-cream-50/60">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="px-2.5 py-1 text-charcoal hover:text-burgundy font-bold text-sm"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-xs font-bold text-charcoal min-w-[28px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="px-2.5 py-1 text-charcoal hover:text-burgundy font-bold text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[11px] text-charcoal/50 block">Item Total</span>
                          <span className="font-serif text-base sm:text-lg font-bold text-burgundy">
                            {formatINR(itemTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Greeting Card Message Box */}
                  <div className="pt-3 border-t border-cream-100">
                    {isEditingThisCard ? (
                      <div className="space-y-2 bg-cream-50 p-3.5 rounded-xl border border-cream-300">
                        <div className="flex items-center justify-between text-xs font-semibold text-charcoal">
                          <span className="flex items-center gap-1.5 text-burgundy">
                            <Sparkles className="w-3.5 h-3.5 text-gold" />
                            Edit Greeting Card Message
                          </span>
                          <span className="text-[11px] text-charcoal/50">
                            {250 - tempGreetingMessage.length} left
                          </span>
                        </div>
                        <textarea
                          rows={2}
                          maxLength={250}
                          value={tempGreetingMessage}
                          onChange={(e) => setTempGreetingMessage(e.target.value)}
                          placeholder="Write your personal message…"
                          className="w-full p-2.5 text-xs bg-white border border-cream-300 rounded-lg focus:outline-none focus:border-burgundy"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingCardId(null)}
                            className="px-3 py-1 text-xs text-charcoal/70 hover:text-charcoal"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveMessage(item.id)}
                            className="px-3 py-1 text-xs font-semibold bg-burgundy text-cream rounded-lg hover:bg-burgundy-800"
                          >
                            Save Message
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#FFFDF9] p-3 rounded-xl border border-gold/30 flex items-start justify-between gap-3 text-xs">
                        <div className="flex items-start gap-2">
                          <Heart className="w-3.5 h-3.5 text-burgundy shrink-0 mt-0.5 fill-burgundy/20" />
                          <div>
                            <span className="font-semibold text-burgundy block">
                              Printed Greeting Card:
                            </span>
                            {item.greetingMessage ? (
                              <p className="font-serif italic text-charcoal/90 mt-0.5">
                                “{item.greetingMessage}”
                              </p>
                            ) : (
                              <p className="text-charcoal/50 italic mt-0.5">
                                No custom message added yet (complimentary card included blank).
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleStartEditMessage(item.id, item.greetingMessage)}
                          className="text-[11px] text-burgundy hover:text-burgundy-800 font-medium flex items-center gap-1 shrink-0"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>{item.greetingMessage ? "Edit" : "Add Note"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-burgundy hover:text-burgundy-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm space-y-6 sticky top-28">
              <h2 className="font-serif text-xl font-bold text-charcoal pb-4 border-b border-cream-200">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-charcoal/80">
                  <span>Subtotal ({totals.itemCount} items)</span>
                  <span className="font-semibold text-charcoal">
                    {formatINR(totals.subtotalRupees)}
                  </span>
                </div>

                <div className="flex justify-between items-start text-charcoal/80">
                  <div className="pr-2">
                    <span className="block">Delivery Charges</span>
                    <span className="text-[11px] text-charcoal/50">
                      Confirmed via WhatsApp based on destination PIN code
                    </span>
                  </div>
                  <span className="text-xs font-medium text-gold-700 whitespace-nowrap">
                    To be confirmed
                  </span>
                </div>

                <div className="pt-3 border-t border-cream-200 flex justify-between items-baseline">
                  <div>
                    <span className="font-serif text-lg font-bold text-charcoal block">
                      Estimated Subtotal
                    </span>
                    <span className="text-[11px] text-charcoal/50">
                      Excludes final courier charge
                    </span>
                  </div>
                  <span className="font-serif text-2xl font-bold text-burgundy">
                    {formatINR(totals.subtotalRupees)}
                  </span>
                </div>
              </div>

              <div className="bg-cream-50 p-3.5 rounded-xl border border-cream-200 text-xs text-charcoal/70 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-burgundy">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Transparent WhatsApp Ordering</span>
                </div>
                <p>
                  On the next step, review your details and send your inquiry directly via WhatsApp. Availability and exact delivery fees are verified before payment.
                </p>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-burgundy hover:bg-burgundy-800 text-cream rounded-xl font-semibold text-sm sm:text-base transition-all shadow-xs focus-visible:outline-burgundy active:scale-95"
              >
                <span>Proceed to Order</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
