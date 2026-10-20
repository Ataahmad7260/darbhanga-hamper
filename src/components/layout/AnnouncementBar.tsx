"use client";

import React, { useState } from "react";
import { Sparkles, X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Store announcement"
      className="bg-burgundy text-cream text-[11px] sm:text-xs py-2 px-3 sm:px-4 transition-all duration-300 relative border-b border-burgundy-800"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex-1 text-center flex items-center justify-center gap-1.5 font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 animate-pulse" aria-hidden="true" />
          <span className="hidden sm:inline">
            Handcrafted Gift Hampers with Personalized Greeting Cards • Order via WhatsApp Across India
          </span>
          <span className="sm:hidden font-medium truncate">
            Handmade Hampers • WhatsApp Orders Across India
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement banner"
          className="p-1 -mr-1 text-cream/70 hover:text-cream rounded transition-colors focus-visible:outline-white shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
