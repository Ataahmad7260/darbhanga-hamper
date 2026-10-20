import { describe, it, expect } from "vitest";
import {
  calculateCartTotals,
  generateCartItemId,
  sanitizeStoredCart,
} from "@/lib/cart";
import { products } from "@/data/products";
import { CartItem } from "@/types";

describe("Cart Calculations & Sanitization", () => {
  const hamper1 = products[0]; // ₹299
  const hamper2 = products[1]; // ₹599

  it("generates deterministic cart item keys based on slug and message", () => {
    const key1 = generateCartItemId(hamper1.slug, "Happy Birthday!");
    const key2 = generateCartItemId(hamper1.slug, "Happy Birthday!");
    const keyDiff = generateCartItemId(hamper1.slug, "Different Note");
    const keyNoMsg = generateCartItemId(hamper1.slug);

    expect(key1).toBe(key2);
    expect(key1).not.toBe(keyDiff);
    expect(key1).not.toBe(keyNoMsg);
  });

  it("calculates cart subtotal accurately using integer arithmetic", () => {
    const items: CartItem[] = [
      {
        id: generateCartItemId(hamper1.slug),
        product: hamper1,
        quantity: 2, // 2 * 299 = 598
        addedAt: Date.now(),
      },
      {
        id: generateCartItemId(hamper2.slug),
        product: hamper2,
        quantity: 1, // 1 * 599 = 599
        addedAt: Date.now(),
      },
    ];

    const totals = calculateCartTotals(items);
    expect(totals.itemCount).toBe(3);
    expect(totals.subtotalRupees).toBe(1197);
    expect(totals.subtotalPaise).toBe(119700);
  });

  it("returns zero totals for an empty cart", () => {
    const totals = calculateCartTotals([]);
    expect(totals.itemCount).toBe(0);
    expect(totals.subtotalRupees).toBe(0);
    expect(totals.subtotalPaise).toBe(0);
  });

  it("sanitizes stored cart and discards corrupted or unknown products", () => {
    const malformed = [
      null,
      undefined,
      "random string",
      { id: "fake", product: { slug: "non-existent-hamper" }, quantity: 1 },
      { id: "invalid-qty", product: { slug: hamper1.slug }, quantity: -5 },
      { id: "valid", product: { slug: hamper1.slug }, quantity: 2, greetingMessage: "Hello!" },
    ];

    const sanitized = sanitizeStoredCart(malformed);
    expect(sanitized).toHaveLength(1);
    expect(sanitized[0].product.slug).toBe(hamper1.slug);
    expect(sanitized[0].quantity).toBe(2);
    expect(sanitized[0].greetingMessage).toBe("Hello!");
  });

  it("safely handles non-array stored data", () => {
    expect(sanitizeStoredCart(null)).toEqual([]);
    expect(sanitizeStoredCart({})).toEqual([]);
    expect(sanitizeStoredCart("string")).toEqual([]);
  });
});
