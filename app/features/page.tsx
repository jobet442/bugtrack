import type { Metadata } from "next";
import { Hero } from "@/components/features/hero";
import { BentoGrid } from "@/components/features/bento-grid";
import { WorkflowVisualizer } from "@/components/features/workflow-visualizer";
import { CTA } from "@/components/features/cta";

export const metadata: Metadata = {
  title: "Features - BugTrackerX",
  description:
    "Explore the powerful features of BugTrackerX. From advanced issue tracking to strict RBAC and custom workflows.",
};

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <BentoGrid />
      <WorkflowVisualizer />
      <CTA />
    </div>
  );
}
