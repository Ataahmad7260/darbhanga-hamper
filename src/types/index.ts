export interface HamperItemDetail {
  name: string;
  description: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number; // in INR (₹)
  pricePaise: number; // in Paise for safe integer arithmetic
  category: "Girls Accessories" | "Birthday Gifts" | "Anniversary Gifts" | string;
  shortDescription: string;
  description: string;
  includedItems: string[];
  itemDetails?: HamperItemDetail[];
  images: string[];
  available: boolean;
  featured: boolean;
  tags: string[];
}

export interface CartItem {
  id: string; // Unique line item key (combining product slug + custom message)
  product: Product;
  quantity: number;
  greetingMessage?: string;
  addedAt: number;
}

export interface CartTotals {
  itemCount: number;
  subtotalPaise: number;
  subtotalRupees: number;
  deliveryChargeRupees: number | null; // null represents "To be confirmed by business"
  estimatedTotalRupees: number;
}

export interface CheckoutFormData {
  customerName: string;
  phoneNumber: string;
  deliveryAddress: string;
  city: string;
  state: string;
  pinCode: string;
  preferredDeliveryDate?: string;
  orderNotes?: string;
}

export interface CheckoutValidationErrors {
  customerName?: string;
  phoneNumber?: string;
  deliveryAddress?: string;
  city?: string;
  state?: string;
  pinCode?: string;
}

export interface SiteConfig {
  businessName: string;
  primaryTagline: string;
  alternativeTagline: string;
  currency: string;
  currencySymbol: string;
  whatsappNumber: string; // E.164 format, e.g. "917260062279"
  displayPhone: string;
  contactEmail: string;
  siteUrl: string;
  defaultDeliveryCharge: number | null;
  deliveryChargeNote: string;
  businessAddress: string | null;
  socials: {
    instagram?: string;
    facebook?: string;
  };
}
