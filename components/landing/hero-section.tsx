import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, TerminalSquare } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-32 md:pt-32 md:pb-48">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

      <div className="container relative mx-auto max-w-screen-xl px-4 md:px-8 text-center">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-8 hover:bg-primary/10 transition-colors cursor-pointer">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          BugTrackerX 2.0 is now available
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
          Ship software with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
            absolute confidence.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-xl">
          The enterprise-grade bug tracking platform that unifies QA,
          development, and project management. Catch bugs before they reach your
          customers.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            asChild
            className="h-12 px-8 text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
          >
            <Link href="/signup">
              Start for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="h-12 px-8 text-base rounded-full border-border/50 hover:bg-secondary/50 transition-all"
          >
            <Link href="/demo">
              <TerminalSquare className="ml-2 h-4 mr-2" />
              Book a Demo
            </Link>
          </Button>
        </div>

        <div className="mt-16 sm:mt-24 w-full max-w-5xl mx-auto rounded-xl border border-border/50 bg-card/50 shadow-2xl backdrop-blur-sm overflow-hidden flex items-center justify-center p-4 md:p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none"></div>
          {/* Mockup Placeholder */}
          <div className="w-full aspect-[16/9] bg-muted/30 rounded-lg border border-border/50 flex flex-col items-center justify-center relative">
            <div className="flex gap-2 mb-4 absolute top-4 left-4 md:top-6 md:left-6">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <p className="text-muted-foreground font-mono text-sm">
              Dashboard Preview
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
