import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { OccasionSection } from "@/components/home/OccasionSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { PersonalizationSection } from "@/components/home/PersonalizationSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { BrandStorySection } from "@/components/home/BrandStorySection";
import { FAQSection } from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OccasionSection />
      <FeaturedProducts />
      <WhyChooseSection />
      <PersonalizationSection />
      <HowItWorksSection />
      <BrandStorySection />
      <FAQSection />
    </>
  );
}
