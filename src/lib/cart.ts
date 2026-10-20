import { CartItem, CartTotals } from "@/types";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";

export const LOCAL_STORAGE_CART_KEY = "darbhanga_hamper_cart_v1";

/**
 * Generate a deterministic unique key for a cart line item.
 * Items with the exact same product and identical greeting message share the same key
 * so their quantities merge. Different greeting messages generate different keys.
 */
export function generateCartItemId(productSlug: string, greetingMessage?: string): string {
  const normalizedMessage = (greetingMessage || "").trim();
  return `${productSlug}__${normalizedMessage}`;
}

/**
 * Calculate totals for a given array of cart items.
 * Uses paise internally to prevent floating point inaccuracy.
 */
export function calculateCartTotals(items: CartItem[]): CartTotals {
  let subtotalPaise = 0;
  let itemCount = 0;

  for (const item of items) {
    const qty = Math.max(1, Math.floor(item.quantity || 1));
    itemCount += qty;
    // Always use authoritative product price from catalog if available, or item.product.pricePaise
    const productPricePaise = item.product.pricePaise || item.product.price * 100;
    subtotalPaise += productPricePaise * qty;
  }

  const subtotalRupees = Math.round(subtotalPaise / 100);
  const deliveryChargeRupees = siteConfig.defaultDeliveryCharge;

  const estimatedTotalRupees =
    subtotalRupees + (deliveryChargeRupees !== null ? deliveryChargeRupees : 0);

  return {
    itemCount,
    subtotalPaise,
    subtotalRupees,
    deliveryChargeRupees,
    estimatedTotalRupees,
  };
}

/**
 * Validates and sanitizes raw cart data (e.g. from localStorage).
 * Discards malformed items or items referencing non-existent products.
 */
export function sanitizeStoredCart(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];

  const validItems: CartItem[] = [];

  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;

    const rawItem = entry as Partial<CartItem>;
    const slug = rawItem.product?.slug;
    if (!slug) continue;

    // Verify against official product catalogue
    const verifiedProduct = products.find((p) => p.slug === slug);
    if (!verifiedProduct) continue;

    const qty = Number(rawItem.quantity);
    if (isNaN(qty) || qty < 1) continue;

    const greetingMessage =
      typeof rawItem.greetingMessage === "string" ? rawItem.greetingMessage.slice(0, 300) : "";

    validItems.push({
      id: rawItem.id || generateCartItemId(verifiedProduct.slug, greetingMessage),
      product: verifiedProduct,
      quantity: Math.min(Math.floor(qty), 99), // Sensible max
      greetingMessage: greetingMessage || undefined,
      addedAt: typeof rawItem.addedAt === "number" ? rawItem.addedAt : Date.now(),
    });
  }

  return validItems;
}
