import { describe, it, expect } from "vitest";
import { buildWhatsAppOrderLink, buildProductInquiryLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";
import { CartItem, CartTotals, CheckoutFormData } from "@/types";

describe("WhatsApp Order & Inquiry Generator", () => {
  const sampleItems: CartItem[] = [
    {
      id: "prod-1",
      product: products[0],
      quantity: 1,
      greetingMessage: "Happy Birthday Sis!",
      addedAt: Date.now(),
    },
  ];

  const sampleTotals: CartTotals = {
    itemCount: 1,
    subtotalPaise: 29900,
    subtotalRupees: 299,
    deliveryChargeRupees: null,
    estimatedTotalRupees: 299,
  };

  const sampleForm: CheckoutFormData = {
    customerName: "Priya Sharma",
    phoneNumber: "9876543210",
    deliveryAddress: "Flat 101, Sunshine Apts, Station Road",
    city: "Darbhanga",
    state: "Bihar",
    pinCode: "846004",
    preferredDeliveryDate: "2026-11-01",
    orderNotes: "Leave at door if not home",
  };

  it("builds a complete structured order inquiry message containing all key details", () => {
    const result = buildWhatsAppOrderLink(sampleItems, sampleTotals, sampleForm);

    expect(result.rawMessage).toContain("NEW ORDER INQUIRY — DARBHANGA HAMPER");
    expect(result.rawMessage).toContain("Priya Sharma");
    expect(result.rawMessage).toContain("9876543210");
    expect(result.rawMessage).toContain("846004");
    expect(result.rawMessage).toContain("Girls Accessories Hamper");
    expect(result.rawMessage).toContain("Happy Birthday Sis!");
    expect(result.rawMessage).toContain("2026-11-01");
    expect(result.rawMessage).toContain("Leave at door if not home");
  });

  it("encodes the WhatsApp URL correctly with encodeURIComponent", () => {
    const result = buildWhatsAppOrderLink(sampleItems, sampleTotals, sampleForm);
    expect(result.encodedMessage).toBe(encodeURIComponent(result.rawMessage));
    expect(result.encodedMessage).not.toContain(" "); // spaces must be encoded
  });

  it("handles missing WhatsApp configuration gracefully without breaking", () => {
    // When no WhatsApp phone number is configured, isConfigured should be false and url empty
    const originalNumber = siteConfig.whatsappNumber;
    try {
      siteConfig.whatsappNumber = "";
      const result = buildWhatsAppOrderLink(sampleItems, sampleTotals, sampleForm);
      expect(result.isConfigured).toBe(false);
      expect(result.url).toBe("");
      expect(result.rawMessage).toBeTruthy(); // message is still generated so customer can copy it
    } finally {
      siteConfig.whatsappNumber = originalNumber;
    }
  });

  it("creates valid product inquiry link when configured", () => {
    const originalNumber = siteConfig.whatsappNumber;
    try {
      siteConfig.whatsappNumber = "919876543210";
      const inquiry = buildProductInquiryLink(products[0]);
      expect(inquiry.isConfigured).toBe(true);
      expect(inquiry.url).toContain("https://wa.me/919876543210");
      expect(inquiry.url).toContain(encodeURIComponent(products[0].name));
    } finally {
      siteConfig.whatsappNumber = originalNumber;
    }
  });
});
