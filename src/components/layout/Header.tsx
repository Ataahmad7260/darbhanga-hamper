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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24 gap-2 sm:gap-4">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileMenuOpen}
                className="w-10 h-10 flex items-center justify-center text-charcoal hover:text-burgundy rounded-xl bg-cream-100/70 hover:bg-cream-200 transition-all border border-gold/30 active:scale-95 focus-visible:outline-burgundy"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Brand Wordmark / Logo */}
            <div className="flex-1 lg:flex-none text-center lg:text-left px-1">
              <Link href="/" className="inline-block group focus-visible:outline-burgundy rounded-sm">
                <span className="block font-serif text-xl sm:text-2xl lg:text-[30px] font-bold tracking-tight text-burgundy group-hover:text-burgundy-800 transition-colors">
                  Darbhanga Hamper
                </span>
                <span className="block text-[8px] sm:text-[10.5px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-semibold text-gold-700 font-sans -mt-0.5 truncate">
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
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search hampers"
                aria-expanded={searchOpen}
                className="w-10 h-10 flex items-center justify-center text-charcoal hover:text-burgundy rounded-xl hover:bg-cream-200/70 transition-all focus-visible:outline-burgundy border border-gold/30 bg-white/80 active:scale-95"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Cart Button */}
              <Link
                href="/cart"
                aria-label={`Shopping Cart, ${isHydrated ? totals.itemCount : 0} items`}
                className="relative w-10 h-10 flex items-center justify-center text-charcoal hover:text-burgundy rounded-xl hover:bg-cream-200/70 transition-all focus-visible:outline-burgundy border border-gold/30 bg-white shadow-2xs active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-burgundy" />
                {isHydrated && totals.itemCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-burgundy text-cream text-[9.5px] font-bold rounded-full flex items-center justify-center shadow-xs border border-white"
                  >
                    {totals.itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Quick Search Dropdown */}
          {searchOpen && (
            <div className="py-2.5 pb-3.5 border-t border-cream-200 animate-in fade-in slide-in-from-top-1">
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto flex items-center">
                <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search birthday, perfume, him, her..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-20 py-2 sm:py-2.5 text-xs sm:text-sm bg-white border border-gold/40 rounded-full focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 placeholder:text-charcoal/40 shadow-xs"
                />
                <button
                  type="submit"
                  className="absolute right-1 px-3.5 py-1 text-xs font-semibold bg-burgundy text-cream rounded-full hover:bg-burgundy-800 transition-colors"
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
          {/* Backdrop with smooth blur */}
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 left-0 max-w-[320px] w-[86vw] bg-[#FFFDF9] shadow-2xl z-50 flex flex-col justify-between overflow-y-auto border-r border-gold/40 animate-in slide-in-from-left duration-250">
            <div className="p-5">
              {/* Drawer Brand Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gold/20">
                <div>
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-xl font-bold text-burgundy block"
                  >
                    Darbhanga Hamper
                  </Link>
                  <span className="text-[9px] uppercase tracking-widest text-gold-700 font-semibold block">
                    Luxury Gifting Studio
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-charcoal/70 hover:text-burgundy hover:bg-cream-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instant WhatsApp Order Card */}
              <div className="mt-4">
                <a
                  href="https://wa.me/917260062279?text=Hello%20Darbhanga%20Hamper,%20I%20have%20an%20order%20inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-2xl transition-all shadow-2xs active:scale-98"
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <span className="text-base font-bold">💬</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      Direct WhatsApp Order
                    </div>
                    <div className="text-xs text-emerald-950 font-semibold truncate">
                      +91 7260062279
                    </div>
                  </div>
                </a>
              </div>

              {/* Navigation Links with Icons/Badges */}
              <nav className="mt-5 flex flex-col gap-1" aria-label="Mobile navigation links">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    pathname === "/"
                      ? "bg-burgundy text-cream font-bold shadow-xs"
                      : "text-charcoal hover:bg-cream-200/80 hover:text-burgundy"
                  }`}
                >
                  <span>Home</span>
                  <span className="text-xs opacity-60">🏠</span>
                </Link>

                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    pathname === "/shop"
                      ? "bg-burgundy text-cream font-bold shadow-xs"
                      : "text-charcoal hover:bg-cream-200/80 hover:text-burgundy"
                  }`}
                >
                  <span>Shop All Hampers</span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-gold/20 text-gold-800">
                    All
                  </span>
                </Link>

                <Link
                  href="/shop?category=Birthday+Gifts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-charcoal hover:bg-cream-200/80 hover:text-burgundy transition-all"
                >
                  <span>Birthday Gifts</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cream-200 text-burgundy">
                    Popular
                  </span>
                </Link>

                <Link
                  href="/shop?category=Girls+Accessories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-charcoal hover:bg-cream-200/80 hover:text-burgundy transition-all"
                >
                  <span>Girls Accessories</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                    Trending
                  </span>
                </Link>

                <Link
                  href="/shop?category=Anniversary+Gifts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-charcoal hover:bg-cream-200/80 hover:text-burgundy transition-all"
                >
                  <span>Anniversary Gifts</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                    Couples
                  </span>
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-charcoal hover:bg-cream-200/80 hover:text-burgundy transition-all"
                >
                  <span>Contact & Delivery</span>
                  <span className="text-xs opacity-60">📍</span>
                </Link>
              </nav>

              {/* Complimentary Cards highlight badge */}
              <div className="mt-6 pt-4 border-t border-cream-200">
                <div className="bg-cream-100/80 p-3.5 rounded-xl border border-gold/40">
                  <div className="flex items-center gap-1.5 text-burgundy font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>Free Custom Greeting Cards</span>
                  </div>
                  <p className="text-[11px] text-charcoal/70 mt-1 leading-relaxed">
                    Personalized message printed on premium stationery included with every gift box.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Drawer Action */}
            <div className="p-4 border-t border-cream-200 bg-cream-50/90">
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-burgundy text-cream text-xs sm:text-sm font-bold rounded-xl hover:bg-burgundy-800 transition-all shadow-xs active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Cart ({isHydrated ? totals.itemCount : 0} items)</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
