"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ShoppingBag, Menu, X, Search, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

function HeaderNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
    { label: "Birthday Gifts", href: "/shop?category=Birthday+Gifts" },
    { label: "Girls Accessories", href: "/shop?category=Girls+Accessories" },
    { label: "Anniversary Gifts", href: "/shop?category=Anniversary+Gifts" },
    { label: "Contact", href: "/contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/contact") {
      return pathname === "/contact";
    }
    if (href === "/shop") {
      return pathname === "/shop" && !currentCategory;
    }
    if (href.startsWith("/shop?category=")) {
      const targetCat = decodeURIComponent(href.split("category=")[1] || "").replace(/\+/g, " ");
      return pathname === "/shop" && currentCategory?.toLowerCase() === targetCat.toLowerCase();
    }
    return false;
  };

  return (
    <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
      {navLinks.map((link) => {
        const active = isLinkActive(link.href);
        return (
          <Link
            key={link.label}
            href={link.href}
            className={`text-sm tracking-wide transition-all duration-200 py-1.5 px-1 relative focus-visible:outline-burgundy ${
              active
                ? "text-burgundy font-bold"
                : "text-charcoal hover:text-burgundy font-medium"
            }`}
          >
            {link.label}
            {active && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-burgundy via-gold to-burgundy rounded-full shadow-xs animate-in fade-in" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { totals, isHydrated } = useCart();

  // Adjust state during render when pathname changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
    { label: "Birthday Gifts", href: "/shop?category=Birthday+Gifts" },
    { label: "Girls Accessories", href: "/shop?category=Girls+Accessories" },
    { label: "Anniversary Gifts", href: "/shop?category=Anniversary+Gifts" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md transition-all duration-300 border-b border-gold/20 ${
          isScrolled ? "shadow-md bg-white/95" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24 gap-4">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileMenuOpen}
                className="p-2 -ml-2 text-charcoal hover:text-burgundy rounded-lg transition-colors focus-visible:outline-burgundy"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Wordmark / Logo */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link href="/" className="inline-block group focus-visible:outline-burgundy rounded-sm">
                <span className="block font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-burgundy group-hover:text-burgundy-800 transition-colors">
                  Darbhanga Hamper
                </span>
                <span className="block text-[9px] sm:text-[11px] tracking-[0.25em] uppercase font-semibold text-gold-700 font-sans -mt-0.5">
                  Thoughtful Gifts • Beautiful Memories
                </span>
              </Link>
            </div>

            {/* Desktop Navigation with Suspense boundary for useSearchParams */}
            <Suspense
              fallback={
                <nav className="hidden lg:flex items-center gap-7">
                  <span className="text-sm font-medium text-charcoal">Loading...</span>
                </nav>
              }
            >
              <HeaderNav />
            </Suspense>

            {/* Actions: Search & Cart */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search hampers"
                aria-expanded={searchOpen}
                className="p-2.5 text-charcoal hover:text-burgundy rounded-full hover:bg-cream-200/60 transition-colors focus-visible:outline-burgundy border border-transparent hover:border-gold/30"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <Link
                href="/cart"
                aria-label={`Shopping Cart, ${isHydrated ? totals.itemCount : 0} items`}
                className="relative p-2.5 text-charcoal hover:text-burgundy rounded-full hover:bg-cream-200/60 transition-colors focus-visible:outline-burgundy border border-gold/30 flex items-center bg-white shadow-2xs"
              >
                <ShoppingBag className="w-5 h-5 text-burgundy" />
                {isHydrated && totals.itemCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-burgundy text-cream text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs border border-white"
                  >
                    {totals.itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Quick Search Dropdown */}
          {searchOpen && (
            <div className="py-3 pb-4 border-t border-cream-200 animate-in fade-in slide-in-from-top-1">
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto flex items-center">
                <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search birthday hampers, accessories, for him, for her..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-24 py-2.5 text-sm bg-white border border-gold/40 rounded-full focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 placeholder:text-charcoal/40 shadow-xs"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-1.5 text-xs font-semibold bg-burgundy text-cream rounded-full hover:bg-burgundy-800 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Menu">
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FFFDF9] shadow-2xl z-50 flex flex-col justify-between overflow-y-auto border-r border-gold/30">
            <div className="p-6">
              <div className="flex items-center justify-between pb-6 border-b border-gold/20">
                <div>
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-xl font-bold text-burgundy block"
                  >
                    Darbhanga Hamper
                  </Link>
                  <span className="text-[9px] uppercase tracking-widest text-gold-700 font-semibold block">
                    Gifting Studio
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 -mr-2 text-charcoal hover:text-burgundy rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1.5" aria-label="Mobile navigation links">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3.5 py-3 rounded-xl text-sm font-medium text-charcoal hover:bg-cream-200/80 hover:text-burgundy transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-cream-200">
                <div className="bg-cream-100/70 p-4 rounded-xl border border-gold/30">
                  <div className="flex items-center gap-2 text-burgundy font-semibold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-gold shrink-0" />
                    <span>Complimentary Cards</span>
                  </div>
                  <p className="text-xs text-charcoal/70 mt-1.5 leading-relaxed">
                    Personalized greeting card with custom message included inside every hamper.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-cream-200 bg-cream-50">
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-burgundy text-cream text-sm font-semibold rounded-xl hover:bg-burgundy-800 transition-colors shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Cart ({isHydrated ? totals.itemCount : 0})</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
