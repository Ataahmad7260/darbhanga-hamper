"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Filter, SlidersHorizontal, RotateCcw } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Product } from "@/types";

export function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read filter values directly from URL search parameters (Single Source of Truth)
  const selectedCategory = searchParams.get("category") || "All";
  const urlQuery = searchParams.get("q") || "";
  const sortBy = searchParams.get("sort") || "featured";
  const priceTier = searchParams.get("price") || "all";

  // Local state for search input text while typing
  const [searchInput, setSearchInput] = useState(urlQuery);

  const updateQueryParams = (
    newCategory: string,
    newQuery: string,
    newSort: string,
    newPrice: string
  ) => {
    const params = new URLSearchParams();
    if (newCategory && newCategory !== "All") params.set("category", newCategory);
    if (newQuery.trim()) params.set("q", newQuery.trim());
    if (newSort && newSort !== "featured") params.set("sort", newSort);
    if (newPrice && newPrice !== "all") params.set("price", newPrice);

    const queryString = params.toString();
    router.replace(queryString ? `/shop?${queryString}` : "/shop", { scroll: false });
  };

  const handleCategoryChange = (cat: string) => {
    updateQueryParams(cat, searchInput, sortBy, priceTier);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateQueryParams(selectedCategory, searchInput, sortBy, priceTier);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    updateQueryParams(selectedCategory, searchInput, val, priceTier);
  };

  const handlePriceTierChange = (tier: string) => {
    updateQueryParams(selectedCategory, searchInput, sortBy, tier);
  };

  const handleReset = () => {
    setSearchInput("");
    router.replace("/shop", { scroll: false });
  };

  const categories = ["All", "Birthday Gifts", "Girls Accessories", "Anniversary Gifts"];

  const priceTiers = [
    { label: "All Prices", value: "all" },
    { label: "Under ₹350", value: "under-350" },
    { label: "₹350 – ₹500", value: "350-500" },
    { label: "Above ₹500", value: "above-500" },
  ];

  // Filtered and sorted products (pure function evaluated on state change)
  const activeQuery = urlQuery || searchInput;
  let list: Product[] = [...products];

  // Category filter
  if (selectedCategory !== "All") {
    list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
  }

  // Search query filter
  if (activeQuery.trim()) {
    const q = activeQuery.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.includedItems.some((item) => item.toLowerCase().includes(q)) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  // Price tier filter
  if (priceTier === "under-350") {
    list = list.filter((p) => p.price < 350);
  } else if (priceTier === "350-500") {
    list = list.filter((p) => p.price >= 350 && p.price <= 500);
  } else if (priceTier === "above-500") {
    list = list.filter((p) => p.price > 500);
  }

  // Sorting
  if (sortBy === "price-asc") {
    list.sort((a, b) => a.pricePaise - b.pricePaise);
  } else if (sortBy === "price-desc") {
    list.sort((a, b) => b.pricePaise - a.pricePaise);
  } else if (sortBy === "name-asc") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  const filteredProducts = list;

  const hasActiveFilters =
    selectedCategory !== "All" ||
    activeQuery.trim() !== "" ||
    sortBy !== "featured" ||
    priceTier !== "all";

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold font-sans">
            Curated Gift Collection
          </span>
          <h1 className="mt-1 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
            All Gift Hampers
          </h1>
          <p className="mt-2 text-sm sm:text-base text-charcoal/70 max-w-2xl">
            Browse our ready-to-gift boxes for birthdays, anniversaries, and celebratory moments. Includes complimentary greeting card personalization.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-cream-200/90 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search hampers, items, perfumes, accessories..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-20 py-2.5 text-sm bg-cream-50/70 border border-cream-200 rounded-xl focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy placeholder:text-charcoal/40"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-burgundy text-cream text-xs font-semibold rounded-lg hover:bg-burgundy-800 transition-colors"
              >
                Search
              </button>
            </form>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-charcoal/60 shrink-0" />
              <label htmlFor="sort-select" className="text-xs font-medium text-charcoal/70">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={handleSortChange}
                className="py-2 px-3 text-xs sm:text-sm bg-cream-50/70 border border-cream-200 rounded-xl focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy font-medium text-charcoal"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="pt-2 border-t border-cream-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-xs font-semibold text-charcoal/60 mr-1 hidden sm:inline">
                Occasion:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? "bg-burgundy text-cream shadow-xs"
                      : "bg-cream-100 hover:bg-cream-200/80 text-charcoal"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Price Tiers */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-charcoal/60 mr-1 hidden lg:inline">
                Price:
              </span>
              {priceTiers.map((tier) => (
                <button
                  key={tier.value}
                  type="button"
                  onClick={() => handlePriceTierChange(tier.value)}
                  className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                    priceTier === tier.value
                      ? "bg-gold text-charcoal font-semibold shadow-xs"
                      : "text-charcoal/70 hover:bg-cream-100"
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-burgundy font-semibold hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-charcoal/60 mb-6">
          <span>
            Showing {filteredProducts.length} of {products.length} hampers
          </span>
          {hasActiveFilters && (
            <span className="text-burgundy font-medium">Filtered results</span>
          )}
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-cream-200 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4 text-burgundy">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">
              No Hampers Found
            </h3>
            <p className="mt-2 text-sm text-charcoal/70">
              We couldn’t find any hampers matching your selected search or filter criteria.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-burgundy text-cream text-xs font-semibold rounded-xl hover:bg-burgundy-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
