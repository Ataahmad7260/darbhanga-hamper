import { Product } from "@/types";

/**
 * DARBHANGA HAMPER — Centralized Product Catalogue
 */
export const products: Product[] = [
  {
    id: "prod-girls-accessories",
    slug: "girls-accessories-hamper",
    name: "Girls Accessories Hamper",
    price: 299,
    pricePaise: 29900,
    category: "Girls Accessories",
    shortDescription: "A cute little hamper filled with charming accessories and sweet surprises.",
    description:
      "A delightful gift hamper designed to bring joy and charm. Filled with everyday style staples including soft scrunchies, elegant earrings, a trendy claw clip, dainty rings, delicious mini chocolates, and a customizable personal greeting card. Beautifully presented in a signature gift box with matching ribbon and protective filler.",
    includedItems: [
      "Scrunchies",
      "Earrings",
      "Hair claw clip",
      "Rings",
      "Mini chocolates",
      "Greeting card",
      "Gift box, ribbon, and filler",
    ],
    itemDetails: [
      {
        name: "Pastel Silk Scrunchies",
        description: "Soft, premium silk scrunchies that protect hair with gentle hold without creasing.",
        image: "/images/items/girls-accessories/accessories-close-up.jpg",
      },
      {
        name: "Pearl & Crystal Drop Earrings",
        description: "Dainty handcrafted earrings suitable for daily wear, college, and festive celebrations.",
        image: "/images/items/girls-accessories/accessories-close-up.jpg",
      },
      {
        name: "Acetate Hair Claw Clip",
        description: "Trendy, durable hair claw clip in a chic marble finish for effortless styling.",
        image: "/images/items/girls-accessories/accessories-close-up.jpg",
      },
      {
        name: "Minimalist Gold Rings Set",
        description: "Elegant, lightweight stackable rings designed for versatile styling.",
        image: "/images/items/girls-accessories/accessories-close-up.jpg",
      },
      {
        name: "Foil-Wrapped Artisan Chocolates",
        description: "Rich, melt-in-the-mouth chocolates wrapped in gold and burgundy foil.",
        image: "/images/items/girls-accessories/chocolates-and-card.jpg",
      },
      {
        name: "Handwritten Greeting Card",
        description: "Complimentary custom card printed with your personalized heartfelt message.",
        image: "/images/items/girls-accessories/chocolates-and-card.jpg",
      },
      {
        name: "Signature Keepsake Box & Ribbon",
        description: "Sturdy gift box with protective crinkle filler and tied with a satin ribbon.",
        image: "/images/products/girls-accessories-hamper.jpg",
      },
    ],
    images: [
      "/images/products/girls-accessories-hamper.jpg",
      "/images/items/girls-accessories/accessories-close-up.jpg",
      "/images/items/girls-accessories/chocolates-and-card.jpg",
    ],
    available: true,
    featured: true,
    tags: ["Accessories", "Girls Gifts", "Budget Friendly", "Trending"],
  },
  {
    id: "prod-birthday-him",
    slug: "birthday-hamper-for-him",
    name: "Birthday Hamper for Him",
    price: 599,
    pricePaise: 59900,
    category: "Birthday Gifts",
    shortDescription: "A thoughtful birthday surprise with everyday essentials and a special presentation.",
    description:
      "Celebrate him with a curated selection of essentials presented in a sophisticated gift box. Includes a sleek wristwatch, classic wallet, refreshing men's face wash, pocket-sized mini cologne, and a heartfelt birthday greeting card with satin ribbon presentation.",
    includedItems: [
      "Mini perfume",
      "Men's face wash",
      "Watch",
      "Wallet",
      "Greeting card",
      "Gift box and ribbon",
    ],
    itemDetails: [
      {
        name: "Classic Leather Strap Watch",
        description: "Minimalist analog timepiece with genuine textured leather strap and sleek dial.",
        image: "/images/items/birthday-him/watch-wallet-cologne.jpg",
      },
      {
        name: "Brown Leather Bi-fold Wallet",
        description: "Compact, durable wallet with multiple card slots and currency compartments.",
        image: "/images/items/birthday-him/watch-wallet-cologne.jpg",
      },
      {
        name: "Mini Amber Eau De Cologne",
        description: "Long-lasting, refreshing gentleman's pocket fragrance with warm woody notes.",
        image: "/images/items/birthday-him/watch-wallet-cologne.jpg",
      },
      {
        name: "Energizing Men's Face Wash",
        description: "Deep-cleansing daily face wash for an instant burst of clear freshness.",
        image: "/images/items/birthday-him/watch-wallet-cologne.jpg",
      },
      {
        name: "Embossed Birthday Greeting Card",
        description: "Elegant stationery card featuring your personal birthday greeting.",
        image: "/images/products/birthday-hamper-for-him.jpg",
      },
      {
        name: "Luxury Keepsake Gift Box & Ribbon",
        description: "Deep burgundy presentation box tied with a hand-tied satin ribbon bow.",
        image: "/images/products/birthday-hamper-for-him.jpg",
      },
    ],
    images: [
      "/images/products/birthday-hamper-for-him.jpg",
      "/images/items/birthday-him/watch-wallet-cologne.jpg",
    ],
    available: true,
    featured: true,
    tags: ["Birthday", "For Him", "Men Essentials", "Special Gift"],
  },
  {
    id: "prod-birthday-her",
    slug: "birthday-hamper-for-her",
    name: "Birthday Hamper for Her",
    price: 399,
    pricePaise: 39900,
    category: "Birthday Gifts",
    shortDescription: "A sweet birthday hamper with charming little gifts and a personal touch.",
    description:
      "Make her birthday memorable with this sweet and cheerful hamper. Features a cute mini plush teddy bear, pocket perfume, delicious chocolates, aesthetic stickers, a stylish hair clip, and a personalized birthday card nestled inside our premium ribboned box.",
    includedItems: [
      "Mini perfume",
      "Small teddy bear",
      "Chocolates",
      "Stickers",
      "Hair clip",
      "Greeting card",
      "Gift box and ribbon",
    ],
    itemDetails: [
      {
        name: "Mini Plush Teddy Bear",
        description: "Soft plush cream teddy bear wearing an elegant tiny burgundy bow.",
        image: "/images/items/birthday-her/teddy-perfume-chocolates.jpg",
      },
      {
        name: "Blossom Glass Perfume",
        description: "Delicate floral fragrance with an elegant tassel accent for daily wear.",
        image: "/images/items/birthday-her/teddy-perfume-chocolates.jpg",
      },
      {
        name: "Gourmet Golden Chocolates",
        description: "Premium assorted milk chocolates wrapped in luxury golden foil.",
        image: "/images/items/birthday-her/teddy-perfume-chocolates.jpg",
      },
      {
        name: "Aesthetic Sticker Sheet",
        description: "Cute decorative floral stickers for journals, notebooks, and mobile cases.",
        image: "/images/items/birthday-her/teddy-perfume-chocolates.jpg",
      },
      {
        name: "Pastel Marble Hair Clip",
        description: "Strong-grip, pink marble-finish styling claw clip.",
        image: "/images/items/birthday-her/teddy-perfume-chocolates.jpg",
      },
      {
        name: "Personalized Birthday Card",
        description: "Handcrafted stationery card with your custom printed words of love.",
        image: "/images/products/birthday-hamper-for-her.jpg",
      },
      {
        name: "Luxury Keepsake Gift Box",
        description: "Signature cream and gold keepsake box with satin ribbon bow.",
        image: "/images/products/birthday-hamper-for-her.jpg",
      },
    ],
    images: [
      "/images/products/birthday-hamper-for-her.jpg",
      "/images/items/birthday-her/teddy-perfume-chocolates.jpg",
    ],
    available: true,
    featured: true,
    tags: ["Birthday", "For Her", "Sweet Surprises", "Popular"],
  },
  {
    id: "prod-anniversary-couple",
    slug: "anniversary-couple-hamper",
    name: "Anniversary Couple Hamper",
    price: 499,
    pricePaise: 49900,
    category: "Anniversary Gifts",
    shortDescription: "A romantic gifting set created to celebrate shared memories and special moments.",
    description:
      "Crafted specially for celebrating love and anniversaries. Contains complementary his & hers mini perfumes, gourmet chocolates, a mini photo frame to hold your favorite picture, a timeless artificial rose keepsake, and a personalized greeting card enclosed in an elegant keepsake box.",
    includedItems: [
      "Mini perfume for him",
      "Mini perfume for her",
      "Chocolates",
      "Photo frame with photo",
      "Greeting card",
      "Artificial rose",
      "Gift box and ribbon",
    ],
    itemDetails: [
      {
        name: "Mini Cologne for Him",
        description: "Refined masculine woody fragrance created for romantic evenings.",
        image: "/images/items/anniversary/couple-perfumes-rose-frame.jpg",
      },
      {
        name: "Mini Blossom Perfume for Her",
        description: "Romantic, uplifting floral bouquet fragrance in an elegant spray flacon.",
        image: "/images/items/anniversary/couple-perfumes-rose-frame.jpg",
      },
      {
        name: "Golden Heart Truffles Box",
        description: "Decadent artisan chocolates in a rich velvet keepsake box.",
        image: "/images/items/anniversary/couple-perfumes-rose-frame.jpg",
      },
      {
        name: "Ornate Gold Photo Frame",
        description: "Vintage carved gold frame to hold your favorite couple photograph.",
        image: "/images/items/anniversary/couple-perfumes-rose-frame.jpg",
      },
      {
        name: "Preserved Crimson Velvet Rose",
        description: "Everlasting velvet red rose symbol of timeless love and devotion.",
        image: "/images/items/anniversary/couple-perfumes-rose-frame.jpg",
      },
      {
        name: "Calligraphy Couple Card",
        description: "Gold-embossed anniversary greeting card printed with your message.",
        image: "/images/products/anniversary-couple-hamper.jpg",
      },
      {
        name: "Luxury Keepsake Gift Box",
        description: "Trunk-style keepsake gift box with burgundy ribbon and satin liner.",
        image: "/images/products/anniversary-couple-hamper.jpg",
      },
    ],
    images: [
      "/images/products/anniversary-couple-hamper.jpg",
      "/images/items/anniversary/couple-perfumes-rose-frame.jpg",
    ],
    available: true,
    featured: true,
    tags: ["Anniversary", "Couple Gifts", "Romantic", "Keepsake"],
  },
];

/**
 * Get all available products
 */
export function getAllProducts(): Product[] {
  return products;
}

/**
 * Lookup a single product by its unique slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  const cleanSlug = slug.trim().toLowerCase();
  return products.find((p) => p.slug.toLowerCase() === cleanSlug);
}

/**
 * Retrieve featured products for homepage spotlight
 */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  return Array.from(new Set(products.map((p) => p.category)));
}

/**
 * Filter, search, and sort products
 */
export interface ProductFilterOptions {
  category?: string;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price-asc" | "price-desc" | "name-asc" | "default";
}

export function filterProducts(options: ProductFilterOptions = {}): Product[] {
  let list = [...products];

  // Category filter
  if (options.category && options.category.toLowerCase() !== "all") {
    const targetCat = options.category.toLowerCase();
    list = list.filter((p) => p.category.toLowerCase() === targetCat);
  }

  // Text search
  if (options.query && options.query.trim()) {
    const q = options.query.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.includedItems.some((item) => item.toLowerCase().includes(q))
    );
  }

  // Price range filter
  if (typeof options.minPrice === "number" && !isNaN(options.minPrice)) {
    list = list.filter((p) => p.price >= options.minPrice!);
  }
  if (typeof options.maxPrice === "number" && !isNaN(options.maxPrice)) {
    list = list.filter((p) => p.price <= options.maxPrice!);
  }

  // Sorting
  if (options.sortBy === "price-asc") {
    list.sort((a, b) => a.pricePaise - b.pricePaise);
  } else if (options.sortBy === "price-desc") {
    list.sort((a, b) => b.pricePaise - a.pricePaise);
  } else if (options.sortBy === "name-asc") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}

/**
 * Safe INR currency formatter
 * Example: 299 -> "₹299"
 */
export function formatINR(rupees: number): string {
  if (typeof rupees !== "number" || isNaN(rupees)) {
    return "₹0";
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}
