import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { SocialProof } from "@/components/landing/social-proof";
import { PricingSection } from "@/components/landing/pricing-section";
import { CTASection } from "@/components/landing/cta-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <HeroSection />
      <FeaturesSection />
      <SocialProof />
      <PricingSection />
      <CTASection />
    </main>
  );
}
