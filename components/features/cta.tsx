import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-32 bg-background">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />

      <div className="container px-4 md:px-8 max-w-screen-xl mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-card/30 backdrop-blur-3xl px-8 py-20 sm:px-16 sm:py-24 shadow-2xl">
          {/* Inner Glow */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[100px]" />

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-6">
              Ready to redefine your workflow?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Join thousands of developers and product managers who are shipping
              better software, faster, with BugTrackerX.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/register"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-primary/20 bg-background/50 backdrop-blur-sm px-8 text-base font-semibold text-foreground transition-all hover:bg-accent hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                View Pricing
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground/80">
              No credit card required. 14-day free trial on Pro plans.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
