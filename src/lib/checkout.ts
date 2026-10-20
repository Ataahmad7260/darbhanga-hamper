import { CheckoutFormData, CheckoutValidationErrors } from "@/types";

/**
 * Validates the checkout form fields for a standard Indian shipping address.
 */
export function validateCheckoutForm(data: CheckoutFormData): {
  isValid: boolean;
  errors: CheckoutValidationErrors;
} {
  const errors: CheckoutValidationErrors = {};

  // Customer Name
  if (!data.customerName || data.customerName.trim().length < 2) {
    errors.customerName = "Please enter your full name (minimum 2 characters).";
  }

  // Phone Number (Indian 10-digit or standard international mobile)
  const cleanPhone = (data.phoneNumber || "").replace(/[\s\-+()]/g, "");
  if (!cleanPhone) {
    errors.phoneNumber = "Mobile number is required for order verification.";
  } else if (!/^[6-9]\d{9}$/.test(cleanPhone) && !/^\d{10,14}$/.test(cleanPhone)) {
    errors.phoneNumber = "Please enter a valid 10-digit mobile number.";
  }

  // Street Address
  if (!data.deliveryAddress || data.deliveryAddress.trim().length < 8) {
    errors.deliveryAddress = "Please provide complete street/house address (minimum 8 characters).";
  }

  // City
  if (!data.city || data.city.trim().length < 2) {
    errors.city = "City is required.";
  }

  // State
  if (!data.state || data.state.trim().length < 2) {
    errors.state = "State is required.";
  }

  // PIN Code (6 digits for India)
  const cleanPin = (data.pinCode || "").trim();
  if (!cleanPin) {
    errors.pinCode = "PIN code is required to verify delivery.";
  } else if (!/^\d{6}$/.test(cleanPin)) {
    errors.pinCode = "Please enter a valid 6-digit Indian PIN code.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
