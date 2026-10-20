"use client";

import React from "react";
import { Sparkles, RotateCcw, Heart } from "lucide-react";

interface GreetingMessageEditorProps {
  value: string;
  onChange: (message: string) => void;
  maxLength?: number;
}

export function GreetingMessageEditor({
  value,
  onChange,
  maxLength = 250,
}: GreetingMessageEditorProps) {
  const charCount = value.length;
  const remaining = maxLength - charCount;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label
          htmlFor="greeting-message-input"
          className="flex items-center gap-2 font-serif text-base sm:text-lg font-semibold text-charcoal"
        >
          <Sparkles className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
          <span>Personal Greeting Card Message (Optional)</span>
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-charcoal/60 hover:text-burgundy flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <p className="text-xs text-charcoal/70">
        Every hamper includes a complimentary printed greeting card. Write your custom message below and we will hand-place it inside your gift box!
      </p>

      {/* Textarea Input */}
      <div className="relative">
        <textarea
          id="greeting-message-input"
          rows={3}
          maxLength={maxLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a special message for someone special…"
          className="w-full p-3.5 bg-white border border-cream-300 rounded-xl text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all"
        />
        <div className="flex justify-between items-center text-[11px] text-charcoal/50 mt-1 px-1">
          <span>Max {maxLength} characters</span>
          <span className={remaining < 20 ? "text-burgundy font-semibold" : ""}>
            {remaining} characters left
          </span>
        </div>
      </div>

      {/* Live Greeting Card Visual Preview */}
      <div className="relative bg-[#FFFDF9] rounded-2xl p-5 border-2 border-gold/40 shadow-xs overflow-hidden">
        {/* Subtle decorative gold inner border */}
        <div className="absolute inset-1.5 border border-gold/20 rounded-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between pb-2 border-b border-gold/20">
            <span className="font-serif text-xs font-semibold text-burgundy tracking-widest uppercase">
              Darbhanga Hamper Stationery
            </span>
            <Heart className="w-3.5 h-3.5 text-burgundy/60 fill-burgundy/20" />
          </div>

          <div className="py-3">
            {value.trim() ? (
              <p className="font-serif text-sm sm:text-base text-charcoal/90 italic whitespace-pre-line leading-relaxed">
                “{value.trim()}”
              </p>
            ) : (
              <p className="font-serif text-xs sm:text-sm text-charcoal/40 italic">
                (Card preview will appear here as you type your personal message)
              </p>
            )}
          </div>

          <div className="pt-2 border-t border-gold/20 flex items-center justify-between text-[11px] text-gold-700">
            <span>✨ Included with your hamper</span>
            <span>Hand-packaged with love</span>
          </div>
        </div>
      </div>
    </div>
  );
}
