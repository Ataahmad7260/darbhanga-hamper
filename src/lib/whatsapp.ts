import { CartItem, CartTotals, CheckoutFormData, Product } from "@/types";
import { siteConfig, isWhatsAppConfigured } from "@/config/site";
import { formatINR } from "@/data/products";

export interface WhatsAppOrderResult {
  url: string;
  encodedMessage: string;
  rawMessage: string;
  isConfigured: boolean;
}

/**
 * Builds a structured, beautifully formatted WhatsApp order inquiry message
 * and generates the official wa.me URL for the full checkout review.
 */
export function buildWhatsAppOrderLink(
  items: CartItem[],
  totals: CartTotals,
  formData: CheckoutFormData
): WhatsAppOrderResult {
  const isConfigured = isWhatsAppConfigured();
  const phoneTarget = isConfigured ? siteConfig.whatsappNumber : "917260062279";

  const lines: string[] = [];

  lines.push(`*🛍️ NEW ORDER INQUIRY — ${siteConfig.businessName.toUpperCase()}*`);
  lines.push(`_${siteConfig.primaryTagline}_`);
  lines.push("");
  lines.push("*👤 Customer Details:*");
  lines.push(`• Name: ${formData.customerName.trim()}`);
  lines.push(`• Phone: ${formData.phoneNumber.trim()}`);
  lines.push(
    `• Delivery Address: ${formData.deliveryAddress.trim()}, ${formData.city.trim()}, ${formData.state.trim()} - ${formData.pinCode.trim()}`
  );

  if (formData.preferredDeliveryDate?.trim()) {
    lines.push(`• Preferred Delivery Date: ${formData.preferredDeliveryDate.trim()}`);
  }

  if (formData.orderNotes?.trim()) {
    lines.push(`• Order Notes: ${formData.orderNotes.trim()}`);
  }

  lines.push("");
  lines.push("*📦 Order Items:*");

  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    lines.push(`${index + 1}. *${item.product.name}*`);
    lines.push(
      `   • Qty: ${item.quantity} × ${formatINR(item.product.price)} = ${formatINR(itemTotal)}`
    );

    if (item.greetingMessage && item.greetingMessage.trim()) {
      lines.push(`   • 💌 *Greeting Card Message:* "${item.greetingMessage.trim()}"`);
    }
  });

  lines.push("");
  lines.push("*💰 Payment & Cost Summary:*");
  lines.push(`• Subtotal: ${formatINR(totals.subtotalRupees)}`);

  if (totals.deliveryChargeRupees !== null && totals.deliveryChargeRupees > 0) {
    lines.push(`• Delivery Charge: ${formatINR(totals.deliveryChargeRupees)}`);
    lines.push(`• *Estimated Total: ${formatINR(totals.estimatedTotalRupees)}*`);
  } else {
    lines.push(`• Delivery Charge: To be confirmed for PIN ${formData.pinCode.trim()}`);
    lines.push(`• *Estimated Subtotal: ${formatINR(totals.subtotalRupees)} (Delivery Extra)*`);
  }

  lines.push("");
  lines.push("---");
  lines.push(
    `_Note: This is an order inquiry. Product availability, shipping timelines, and payment instructions will be verified directly by the ${siteConfig.businessName} team._`
  );

  const rawMessage = lines.join("\n");
  const encodedMessage = encodeURIComponent(rawMessage);
  const url = isConfigured ? `https://wa.me/${phoneTarget}?text=${encodedMessage}` : "";

  return {
    url,
    encodedMessage,
    rawMessage,
    isConfigured,
  };
}

/**
 * Builds an instant direct-buy WhatsApp link for a single product with custom message
 * Directly opens WhatsApp to 917260062279!
 */
export function buildDirectBuyWhatsAppLink(
  product: Product,
  quantity: number = 1,
  greetingMessage?: string
): string {
  const phone = siteConfig.whatsappNumber || "917260062279";
  const itemTotal = product.price * quantity;

  const lines: string[] = [
    `*🎁 NEW ORDER — ${siteConfig.businessName.toUpperCase()}*`,
    `_${siteConfig.primaryTagline}_`,
    "",
    `Hello ${siteConfig.businessName}! 👋`,
    `I want to place an order for:`,
    "",
    `• *Hamper:* ${product.name}`,
    `• *Quantity:* ${quantity} × ${formatINR(product.price)} = ${formatINR(itemTotal)}`,
    `• *Category:* ${product.category}`,
  ];

  if (greetingMessage && greetingMessage.trim()) {
    lines.push(`• 💌 *Greeting Card Message:* "${greetingMessage.trim()}"`);
  } else {
    lines.push(`• 💌 *Greeting Card Message:* (Please provide complimentary blank card)`);
  }

  lines.push("");
  lines.push("Please share delivery charge to my location and payment details to confirm!");

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * Builds a general inquiry WhatsApp link for a specific product
 */
export function buildProductInquiryLink(product: Product): { url: string; isConfigured: boolean } {
  const phone = siteConfig.whatsappNumber || "917260062279";

  const message = [
    `Hello ${siteConfig.businessName}! 👋`,
    "",
    `I am interested in ordering the *${product.name}* (${formatINR(product.price)}).`,
    `Could you please share availability and delivery details for my PIN code?`,
  ].join("\n");

  return {
    url: `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    isConfigured: true,
  };
}
