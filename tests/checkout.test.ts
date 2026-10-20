import { describe, it, expect } from "vitest";
import { validateCheckoutForm } from "@/lib/checkout";
import { CheckoutFormData } from "@/types";

describe("Checkout Form Validation", () => {
  const validData: CheckoutFormData = {
    customerName: "Aditi Roy",
    phoneNumber: "9876543210",
    deliveryAddress: "House 45, Green Park Avenue, Near City Mall",
    city: "Patna",
    state: "Bihar",
    pinCode: "800001",
  };

  it("passes validation with complete valid details", () => {
    const result = validateCheckoutForm(validData);
    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it("catches empty or short customer name", () => {
    const result = validateCheckoutForm({ ...validData, customerName: " " });
    expect(result.isValid).toBe(false);
    expect(result.errors.customerName).toBeDefined();
  });

  it("validates Indian mobile numbers correctly", () => {
    // Valid 10-digit formats starting with 6, 7, 8, or 9
    expect(validateCheckoutForm({ ...validData, phoneNumber: "9876543210" }).isValid).toBe(true);
    expect(validateCheckoutForm({ ...validData, phoneNumber: "+91 98765 43210" }).isValid).toBe(true);
    expect(validateCheckoutForm({ ...validData, phoneNumber: "7890123456" }).isValid).toBe(true);

    // Invalid numbers
    expect(validateCheckoutForm({ ...validData, phoneNumber: "12345" }).isValid).toBe(false);
    expect(validateCheckoutForm({ ...validData, phoneNumber: "abc" }).isValid).toBe(false);
  });

  it("catches incomplete delivery addresses", () => {
    const result = validateCheckoutForm({ ...validData, deliveryAddress: "Main St" });
    expect(result.isValid).toBe(false);
    expect(result.errors.deliveryAddress).toBeDefined();
  });

  it("validates 6-digit Indian PIN codes", () => {
    expect(validateCheckoutForm({ ...validData, pinCode: "846004" }).isValid).toBe(true);
    expect(validateCheckoutForm({ ...validData, pinCode: "12345" }).isValid).toBe(false);
    expect(validateCheckoutForm({ ...validData, pinCode: "abcdef" }).isValid).toBe(false);
    expect(validateCheckoutForm({ ...validData, pinCode: "8460041" }).isValid).toBe(false);
  });
});
