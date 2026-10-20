import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getAllProducts } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

export function FeaturedProducts() {
  const products = getAllProducts();

  return (
    <section className="py-16 sm:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-burgundy font-sans">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Signature Launch Collection</span>
            </div>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Featured Gift Hampers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-charcoal/70 max-w-xl">
              Each hamper is hand-assembled with high-quality items, tissue wrap, satin ribbon, and your personalized greeting card.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:text-burgundy-800 transition-colors group"
          >
            <span>View All Hampers</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-column responsive product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
