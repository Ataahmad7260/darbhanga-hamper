import { SiteConfig } from "@/types";

/**
 * DARBHANGA HAMPER — Business Configuration
 */

export const siteConfig: SiteConfig = {
  businessName: "Darbhanga Hamper",
  primaryTagline: "Thoughtful Gifts. Beautiful Memories.",
  alternativeTagline: "Every Gift Tells a Story.",
  currency: "INR",
  currencySymbol: "₹",
  // Official Company WhatsApp Number: 7260062279 (with India prefix 91)
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917260062279",
  displayPhone: process.env.NEXT_PUBLIC_DISPLAY_PHONE || "+91 72600 62279",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@darbhangahamper.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://darbhangahamper.com",
  
  // Delivery charge configuration:
  defaultDeliveryCharge: null,
  deliveryChargeNote: "Delivery charge is calculated based on destination PIN code and confirmed via WhatsApp.",
  
  businessAddress: "Darbhanga, Bihar, India",
  
  socials: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  },
};

/**
 * Helper to determine if WhatsApp order number has been configured.
 */
export function isWhatsAppConfigured(): boolean {
  const number = siteConfig.whatsappNumber?.trim();
  return Boolean(number && number !== "CONFIG_REQUIRED" && /^\d{10,15}$/.test(number));
}
