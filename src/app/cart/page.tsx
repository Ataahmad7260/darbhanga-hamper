import React from "react";
import type { Metadata } from "next";
import { CartClient } from "./CartClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: `Review your gift hampers and personalized greeting card messages before ordering from ${siteConfig.businessName}.`,
};

export default function CartPage() {
  return <CartClient />;
}
