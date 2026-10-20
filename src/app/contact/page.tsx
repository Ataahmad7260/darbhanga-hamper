import React from "react";
import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.businessName} for custom gift hampers, delivery queries, and corporate orders across India.`,
};

export default function ContactPage() {
  return <ContactClient />;
}
