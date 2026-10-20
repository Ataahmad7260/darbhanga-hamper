"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { formatINR } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { buildDirectBuyWhatsAppLink } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleQuickWhatsAppBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = buildDirectBuyWhatsAppLink(product, 1);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gold/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-gold">
      {/* Product Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-cream-50 focus-visible:outline-burgundy"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          priority={false}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          <span className="inline-block bg-[#FFFDF9]/95 backdrop-blur-xs text-burgundy text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-gold/40 shadow-2xs">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Product Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${product.slug}`}
            className="block font-serif text-lg sm:text-xl font-bold text-charcoal hover:text-burgundy transition-colors focus-visible:outline-burgundy line-clamp-1"
          >
            {product.name}
          </Link>
          <p className="mt-1.5 text-xs sm:text-sm text-charcoal/70 line-clamp-2 leading-relaxed font-sans">
            {product.shortDescription}
          </p>

          {/* Included items count badge */}
          <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5 text-[11px] sm:text-xs text-gold-700 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="truncate">{product.includedItems.length} curated items + custom card</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-cream-200">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-charcoal/60 block font-semibold">
                Price
              </span>
              <span className="text-xl sm:text-2xl font-bold text-burgundy font-serif">
                {formatINR(product.price)}
              </span>
            </div>

            <Link
              href={`/products/${product.slug}`}
              className="text-xs font-semibold text-charcoal/80 hover:text-burgundy flex items-center gap-1 transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Direct Buy on WhatsApp + Add to Cart buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleQuickWhatsAppBuy}
              title="Order directly on WhatsApp"
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 sm:px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Buy Now</span>
            </button>

            <button
              type="button"
              onClick={handleQuickAdd}
              aria-label={`Add ${product.name} to cart`}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 sm:px-3 text-xs font-semibold rounded-xl transition-all shadow-xs active:scale-95 ${
                justAdded
                  ? "bg-burgundy text-cream"
                  : "bg-cream-100 hover:bg-cream-200/90 text-charcoal border border-cream-300"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
