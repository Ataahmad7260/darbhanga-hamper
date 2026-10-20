"use client";

import React, { createContext, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { CartItem, CartTotals, Product } from "@/types";
import {
  calculateCartTotals,
  generateCartItemId,
  LOCAL_STORAGE_CART_KEY,
  sanitizeStoredCart,
} from "@/lib/cart";

interface CartContextType {
  items: CartItem[];
  totals: CartTotals;
  isHydrated: boolean;
  addItem: (product: Product, quantity?: number, greetingMessage?: string) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateGreetingMessage: (cartItemId: string, greetingMessage: string) => void;
  clearCart: () => void;
  lastAddedItem: { product: Product; timestamp: number } | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// In-memory synced cart store
let cartMemoryStore: CartItem[] = [];
let hasInitializedStorage = false;
const listeners = new Set<() => void>();

function getCartSnapshot(): CartItem[] {
  if (typeof window === "undefined") return [];
  if (!hasInitializedStorage) {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (stored) {
        cartMemoryStore = sanitizeStoredCart(JSON.parse(stored));
      }
    } catch {
      cartMemoryStore = [];
    }
    hasInitializedStorage = true;
  }
  return cartMemoryStore;
}

const emptySnapshot: CartItem[] = [];
function getServerSnapshot(): CartItem[] {
  return emptySnapshot;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function updateStore(updater: (current: CartItem[]) => CartItem[]) {
  const next = updater(getCartSnapshot());
  cartMemoryStore = next;
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(next));
    }
  } catch {
    // Storage quota or privacy restriction
  }
  listeners.forEach((listener) => listener());
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getCartSnapshot, getServerSnapshot);
  const isHydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const [lastAddedItem, setLastAddedItem] = useState<{ product: Product; timestamp: number } | null>(
    null
  );

  const totals = useMemo(() => calculateCartTotals(items), [items]);

  const addItem = (product: Product, quantity: number = 1, greetingMessage?: string) => {
    const validQty = Math.max(1, Math.floor(quantity));
    const targetKey = generateCartItemId(product.slug, greetingMessage);

    updateStore((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === targetKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = Math.min(99, updated[existingIndex].quantity + validQty);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: targetKey,
          product,
          quantity: validQty,
          greetingMessage: greetingMessage?.trim() || undefined,
          addedAt: Date.now(),
        };
        return [...prev, newItem];
      }
    });

    setLastAddedItem({ product, timestamp: Date.now() });
  };

  const removeItem = (cartItemId: string) => {
    updateStore((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    const validQty = Math.floor(quantity);
    if (validQty <= 0) {
      removeItem(cartItemId);
      return;
    }
    updateStore((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: Math.min(99, validQty) } : item
      )
    );
  };

  const updateGreetingMessage = (cartItemId: string, newMessage: string) => {
    updateStore((prev) => {
      const itemToUpdate = prev.find((item) => item.id === cartItemId);
      if (!itemToUpdate) return prev;

      const newId = generateCartItemId(itemToUpdate.product.slug, newMessage);
      const existingMatch = prev.find((item) => item.id === newId && item.id !== cartItemId);

      if (existingMatch) {
        return prev
          .filter((item) => item.id !== cartItemId)
          .map((item) =>
            item.id === newId
              ? { ...item, quantity: Math.min(99, item.quantity + itemToUpdate.quantity) }
              : item
          );
      } else {
        return prev.map((item) =>
          item.id === cartItemId
            ? {
                ...item,
                id: newId,
                greetingMessage: newMessage.trim() || undefined,
              }
            : item
        );
      }
    });
  };

  const clearCart = () => {
    updateStore(() => []);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totals,
        isHydrated,
        addItem,
        removeItem,
        updateQuantity,
        updateGreetingMessage,
        clearCart,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
