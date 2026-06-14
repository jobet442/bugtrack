import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

      <div className="container px-4 md:px-8 max-w-screen-xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary mb-8 transition-all hover:bg-primary/10">
          <Sparkles className="mr-2 h-4 w-4" />
          <span>Discover the power of BugTrackerX</span>
        </div>

        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Tracking beyond limits.
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Empower your team with a platform that scales with your ambition. From
          granular RBAC to seamless QA workflows, we've got you covered.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Start Building Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="#features-grid"
            className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Explore Features
          </Link>
        </div>
      </div>
    </section>
  );
}
