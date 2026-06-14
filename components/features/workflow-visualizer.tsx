"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Play,
  CheckCircle,
} from "lucide-react";

const steps = [
  { id: "new", label: "New", description: "Issue created and triaged." },
  {
    id: "in-progress",
    label: "In Progress",
    description: "Assigned developer is actively working.",
  },
  {
    id: "qa",
    label: "QA Testing",
    description: "Deployed to staging for QA review.",
  },
  {
    id: "closed",
    label: "Closed",
    description: "Verified and deployed to production.",
  },
];

export function WorkflowVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  // Automatically cycle through steps
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <section className="py-24 bg-accent/30 border-y border-border/50">
      <div className="container px-4 md:px-8 max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            A lifecycle tailored to your workflow
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Transitions are enforced by strict rules, ensuring that no issue
            slips through the cracks. Observe the default flow below.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl rounded-3xl border border-border/60 bg-background/50 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
          {/* Progress bar line */}
          <div className="absolute left-8 right-8 top-1/2 hidden h-[2px] -translate-y-1/2 bg-border md:block sm:left-12 sm:right-12" />

          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:gap-4">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;

              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center text-center transition-all duration-500 md:w-1/4 ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                >
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 shadow-xl transition-colors duration-500 ${
                      isActive
                        ? "border-primary bg-background text-primary shadow-primary/20"
                        : isPast
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted bg-background text-muted-foreground"
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle2 className="h-8 w-8" />
                    ) : isActive ? (
                      <Play className="h-6 w-6 ml-1" />
                    ) : (
                      <Circle className="h-6 w-6" />
                    )}
                  </div>
                  <h3
                    className={`mb-2 font-semibold transition-colors duration-500 ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-[200px]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
