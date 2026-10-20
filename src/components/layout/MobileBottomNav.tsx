"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gift, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { totals, isHydrated } = useCart();

  const isHome = pathname === "/";
  const isShop = pathname.startsWith("/shop") || pathname.startsWith("/products");
  const isCart = pathname === "/cart" || pathname.startsWith("/checkout");

  const whatsAppUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hello Darbhanga Hamper, I want to inquire about custom gift hampers."
  )}`;

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-gold/30 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] px-2 py-1.5 transition-all"
    >
      <div className="grid grid-cols-4 items-center max-w-md mx-auto">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            isHome
              ? "text-burgundy font-bold"
              : "text-charcoal/70 hover:text-burgundy font-medium"
          }`}
        >
          <div className="relative">
            <Home className="w-5 h-5" />
            {isHome && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-burgundy rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Home</span>
        </Link>

        {/* Shop Hampers */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            isShop
              ? "text-burgundy font-bold"
              : "text-charcoal/70 hover:text-burgundy font-medium"
          }`}
        >
          <div className="relative">
            <Gift className="w-5 h-5" />
            {isShop && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-burgundy rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Hampers</span>
        </Link>

        {/* WhatsApp Direct Order Action */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Order (+91 7260062279)"
          className="flex flex-col items-center justify-center py-1 px-2 text-emerald-700 hover:text-emerald-800 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs group-active:scale-90 transition-transform">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold tracking-tight text-emerald-800">
            WhatsApp
          </span>
        </a>

        {/* Cart */}
        <Link
          href="/cart"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
            isCart
              ? "text-burgundy font-bold"
              : "text-charcoal/70 hover:text-burgundy font-medium"
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {isHydrated && totals.itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 bg-burgundy text-cream text-[9px] font-bold rounded-full flex items-center justify-center border border-white shadow-2xs">
                {totals.itemCount}
              </span>
            )}
            {isCart && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-burgundy rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Cart</span>
        </Link>
      </div>
    </nav>
  );
}
