import { describe, it, expect } from "vitest";
import {
  getAllProducts,
  getProductBySlug,
  filterProducts,
  formatINR,
} from "@/data/products";

describe("Product Catalogue & Queries", () => {
  it("contains all 4 launch products with exact required launch prices", () => {
    const all = getAllProducts();
    expect(all).toHaveLength(4);

    const girls = getProductBySlug("girls-accessories-hamper");
    expect(girls).toBeDefined();
    expect(girls?.price).toBe(299);
    expect(girls?.category).toBe("Girls Accessories");

    const him = getProductBySlug("birthday-hamper-for-him");
    expect(him).toBeDefined();
    expect(him?.price).toBe(599);
    expect(him?.category).toBe("Birthday Gifts");

    const her = getProductBySlug("birthday-hamper-for-her");
    expect(her).toBeDefined();
    expect(her?.price).toBe(399);
    expect(her?.category).toBe("Birthday Gifts");

    const couple = getProductBySlug("anniversary-couple-hamper");
    expect(couple).toBeDefined();
    expect(couple?.price).toBe(499);
    expect(couple?.category).toBe("Anniversary Gifts");
  });

  it("handles product lookup with case-insensitivity and whitespace", () => {
    expect(getProductBySlug("  GIRLS-ACCESSORIES-HAMPER  ")).toBeDefined();
    expect(getProductBySlug("birthday-hamper-FOR-HIM")).toBeDefined();
  });

  it("returns undefined for unknown product slugs", () => {
    expect(getProductBySlug("unknown-hamper")).toBeUndefined();
    expect(getProductBySlug("")).toBeUndefined();
  });

  it("filters products by category correctly", () => {
    const birthdayHampers = filterProducts({ category: "Birthday Gifts" });
    expect(birthdayHampers.length).toBe(2);
    expect(birthdayHampers.every((p) => p.category === "Birthday Gifts")).toBe(true);

    const accessories = filterProducts({ category: "Girls Accessories" });
    expect(accessories.length).toBe(1);
    expect(accessories[0].slug).toBe("girls-accessories-hamper");

    const all = filterProducts({ category: "All" });
    expect(all.length).toBe(4);
  });

  it("searches products by name, item, or tags", () => {
    const searchPerfume = filterProducts({ query: "perfume" });
    expect(searchPerfume.length).toBeGreaterThan(0);

    const searchScrunchies = filterProducts({ query: "scrunchies" });
    expect(searchScrunchies).toHaveLength(1);
    expect(searchScrunchies[0].slug).toBe("girls-accessories-hamper");

    const nonExistent = filterProducts({ query: "xyz123nonexistent" });
    expect(nonExistent).toHaveLength(0);
  });

  it("sorts products by price ascending and descending correctly", () => {
    const asc = filterProducts({ sortBy: "price-asc" });
    expect(asc[0].price).toBe(299);
    expect(asc[asc.length - 1].price).toBe(599);

    const desc = filterProducts({ sortBy: "price-desc" });
    expect(desc[0].price).toBe(599);
    expect(desc[desc.length - 1].price).toBe(299);
  });

  it("formats INR currency accurately", () => {
    expect(formatINR(299)).toContain("299");
    expect(formatINR(0)).toContain("0");
    // @ts-expect-error test invalid inputs safely
    expect(formatINR(null)).toBe("₹0");
  });
});
