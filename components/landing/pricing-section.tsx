import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    id: "tier-starter",
    href: "/signup",
    priceMonthly: "Free",
    description: "Perfect for small teams and independent developers.",
    features: [
      "Up to 3 projects",
      "Unlimited bug reports",
      "Basic role management",
      "Community support",
      "7-day issue history",
    ],
    featured: false,
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "/signup",
    priceMonthly: "₱1,499",
    description:
      "Ideal for growing engineering teams that need advanced workflows.",
    features: [
      "Unlimited projects",
      "Advanced RBAC",
      "Audit logging",
      "Priority email support",
      "Unlimited issue history",
      "Custom test runs",
    ],
    featured: true,
    cta: "Start 14-day Trial",
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "/contact",
    priceMonthly: "Custom",
    description:
      "Dedicated support and infrastructure for large organizations.",
    features: [
      "Dedicated account manager",
      "SSO / SAML integration",
      "Custom SLAs",
      "On-premise deployment options",
      "Advanced reporting & analytics",
      "24/7 phone support",
    ],
    featured: false,
    cta: "Contact Sales",
  },
];

export function PricingSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose the plan that best fits your team's needs. All plans include
            core bug tracking features.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-center">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 xl:p-10 ${
                tier.featured
                  ? "bg-foreground text-background ring-2 ring-primary relative shadow-xl scale-100 lg:scale-105 z-10"
                  : "bg-card border border-border/50 text-foreground"
              }`}
            >
              {tier.featured && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0">
                  <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-x-4">
                <h3
                  className={`text-xl font-semibold leading-8 ${tier.featured ? "text-background" : "text-foreground"}`}
                >
                  {tier.name}
                </h3>
              </div>

              <p
                className={`mt-4 text-sm leading-6 ${tier.featured ? "text-background/80" : "text-muted-foreground"}`}
              >
                {tier.description}
              </p>

              <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={`text-4xl font-bold tracking-tight ${tier.featured ? "text-background" : "text-foreground"}`}
                >
                  {tier.priceMonthly}
                </span>
                {tier.priceMonthly !== "Custom" &&
                  tier.priceMonthly !== "Free" && (
                    <span className="text-sm font-semibold leading-6 text-background/80">
                      /month
                    </span>
                  )}
              </p>

              <Button
                asChild
                variant={tier.featured ? "default" : "outline"}
                className={`mt-8 w-full rounded-full ${tier.featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-border/50"}`}
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>

              <ul
                className={`mt-8 space-y-3 text-sm leading-6 ${tier.featured ? "text-background/90" : "text-muted-foreground"}`}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check
                      className={`h-6 w-5 flex-none ${tier.featured ? "text-primary" : "text-primary"}`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
