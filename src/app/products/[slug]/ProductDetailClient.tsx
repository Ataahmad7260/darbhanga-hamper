"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  MessageCircle,
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  Sparkles,
  Share2,
  Check,
} from "lucide-react";
import { Product } from "@/types";
import { formatINR } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { GreetingMessageEditor } from "@/components/product/GreetingMessageEditor";
import { buildDirectBuyWhatsAppLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import { ProductCard } from "@/components/shop/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addItem } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [greetingMessage, setGreetingMessage] = useState("");
  const [addedNotice, setAddedNotice] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Direct WhatsApp instant buy link for 7260062279
  const directWhatsAppBuyLink = buildDirectBuyWhatsAppLink(
    product,
    quantity,
    greetingMessage
  );


  const handleAddToCart = () => {
    addItem(product, quantity, greetingMessage);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleDirectBuyWhatsApp = () => {
    // Directly visits company WhatsApp 7260062279 with complete order inquiry
    window.open(directWhatsAppBuyLink, "_blank", "noopener,noreferrer");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator
          .share({
            title: `${product.name} — ${siteConfig.businessName}`,
            text: product.shortDescription,
            url: window.location.href,
          })
          .catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    }
  };

  return (
    <div className="py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs sm:text-sm text-charcoal/60">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-burgundy transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-gold">/</li>
            <li>
              <Link href="/shop" className="hover:text-burgundy transition-colors">
                Hampers
              </Link>
            </li>
            <li aria-hidden="true" className="text-gold">/</li>
            <li>
              <Link
                href={`/shop?category=${encodeURIComponent(product.category)}`}
                className="hover:text-burgundy transition-colors"
              >
                {product.category}
              </Link>
            </li>
            <li aria-hidden="true" className="text-gold">/</li>
            <li className="text-burgundy font-semibold truncate max-w-[180px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Multi-Image Gallery */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-28">
            {/* Primary Large Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border-2 border-gold/30 shadow-md">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.name} - View ${activeImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-all duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#FFFDF9]/95 backdrop-blur-xs text-burgundy text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-gold/40 shadow-xs">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Thumbnail Selectors (Hamper + Items Close-ups) */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={imgUrl}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View image ${idx + 1}`}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                      activeImageIndex === idx
                        ? "border-burgundy ring-2 ring-gold/50 scale-105 shadow-sm"
                        : "border-cream-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-charcoal/70 px-2 pt-1">
              <span className="flex items-center gap-1.5 text-gold-700 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                Handcrafted & Hand-Tied Ribbon
              </span>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1 text-charcoal hover:text-burgundy transition-colors font-medium"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Link Copied!" : "Share Hamper"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Product Details & WhatsApp Ordering */}
          <div className="lg:col-span-6 space-y-7">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-gold-700 font-sans mb-1">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>{siteConfig.businessName} Signature Edit</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
                {product.name}
              </h1>

              {/* Price & Value */}
              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
                  {formatINR(product.price)}
                </span>
                <span className="text-xs sm:text-sm text-charcoal/60 font-medium">
                  (Inclusive of luxury box, ribbons & custom printed greeting card)
                </span>
              </div>

              <p className="mt-4 text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
                {product.description}
              </p>
            </div>

            {/* Quick WhatsApp Notice */}
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-emerald-900 text-xs sm:text-sm font-semibold">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct WhatsApp Ordering Available: <strong>{siteConfig.displayPhone}</strong></span>
              </div>
            </div>

            {/* Greeting Card Personalization Section */}
            <div className="bg-[#FFFDF9] p-5 sm:p-6 rounded-2xl border border-gold/40 shadow-xs">
              <GreetingMessageEditor
                value={greetingMessage}
                onChange={setGreetingMessage}
              />
            </div>

            {/* Quantity Selector & Dual Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-charcoal">Quantity:</span>
                <div className="inline-flex items-center border border-cream-300 rounded-xl bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="px-3.5 py-2 text-charcoal hover:text-burgundy disabled:opacity-30 transition-colors font-medium text-lg"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold text-charcoal min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                    disabled={quantity >= 99}
                    aria-label="Increase quantity"
                    className="px-3.5 py-2 text-charcoal hover:text-burgundy disabled:opacity-30 transition-colors font-medium text-lg"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-charcoal/50">
                  Total: <strong className="text-burgundy">{formatINR(product.price * quantity)}</strong>
                </span>
              </div>

              {/* PRIMARY ACTION: Direct WhatsApp Order (Immediate redirect to 7260062279) */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleDirectBuyWhatsApp}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-base transition-all shadow-md hover:shadow-lg focus-visible:outline-emerald-700 active:scale-98"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Buy Now on WhatsApp ({siteConfig.displayPhone})</span>
                </button>

                {/* Secondary: Add to Cart for multi-item orders */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-semibold text-sm sm:text-base transition-all shadow-xs focus-visible:outline-burgundy active:scale-95 ${
                    addedNotice
                      ? "bg-burgundy text-cream"
                      : "bg-white hover:bg-cream-100 text-burgundy border-2 border-burgundy"
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Shopping Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag & Keep Shopping</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Delivery & Assurance Notes */}
            <div className="pt-4 border-t border-cream-200 space-y-3 text-xs text-charcoal/75">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                <span>
                  <strong>Courier Delivery Across India:</strong> We calculate exact courier charges to your PIN code and confirm dispatch timelines on WhatsApp before payment.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                <span>
                  <strong>Artisan Packaging:</strong> Hand-arranged with crinkle paper, satin ribbon bow, and enclosed in an external protective corrugated shipping carton.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* NEW DEDICATED SECTION: "EVERY ITEM INSIDE THIS HAMPER" */}
        {/* With close-up photos & descriptions of every single item! */}
        {/* ======================================================== */}
        <div className="mt-20 pt-14 border-t-2 border-gold/30">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-gold-700 font-sans">
              <Package className="w-4 h-4 text-gold" />
              <span>Full Component Breakdown</span>
            </div>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Every Item Inside This Hamper
            </h2>
            <p className="mt-2 text-sm sm:text-base text-charcoal/70">
              We believe in 100% transparency. Explore the exact handcrafted components, fragrances, and accessories included inside your {product.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.itemDetails && product.itemDetails.length > 0 ? (
              product.itemDetails.map((item, index) => (
                <div
                  key={item.name}
                  className="bg-white rounded-2xl overflow-hidden border border-gold/30 shadow-xs hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="relative aspect-4/3 w-full bg-cream-50 overflow-hidden">
                    <Image
                      src={item.image || product.images[0]}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-burgundy/90 text-cream text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs">
                      Item #{index + 1}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-charcoal group-hover:text-burgundy transition-colors">
                        {item.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-charcoal/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-cream-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Included in Box</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              product.includedItems.map((itemName, index) => (
                <div
                  key={itemName}
                  className="bg-white p-5 rounded-2xl border border-cream-200 shadow-2xs flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-charcoal">{itemName}</h3>
                    <span className="text-[11px] text-emerald-700 font-medium">Included in Hamper</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-cream-200">
            <div className="text-center sm:text-left mb-8">
              <span className="text-xs uppercase tracking-widest font-semibold text-gold-700 font-sans">
                You May Also Like
              </span>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                Explore More Curated Hampers
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
