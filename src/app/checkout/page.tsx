import React from "react";
import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Order Checkout & Review",
  description: `Confirm your gift hampers and send your order inquiry via WhatsApp directly to ${siteConfig.businessName}.`,
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
