import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="relative isolate overflow-hidden bg-primary/5 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16 border border-primary/20">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to eliminate software bugs?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Join thousands of developers and QA engineers who are shipping
              better software faster with BugTrackerX.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-12 px-8 rounded-full shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all"
              >
                <Link href="/signup">Get Started for Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 px-8 rounded-full border-border/50 bg-background/50 backdrop-blur-sm"
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
