import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    body: "BugTrackerX completely transformed how our QA team interacts with developers. The traceability features save us hours every week.",
    author: {
      name: "Sarah Jenkins",
      role: "Lead QA Engineer",
      company: "TechFlow Inc.",
      initials: "SJ",
    },
  },
  {
    body: "The role-based access control is exactly what we needed for our enterprise clients. It's secure, fast, and incredibly intuitive.",
    author: {
      name: "David Chen",
      role: "CTO",
      company: "Nexus Systems",
      initials: "DC",
    },
  },
  {
    body: "Finally, a bug tracking tool that doesn't feel like it was built in 2005. The modern UI makes it a joy for our PMs to use.",
    author: {
      name: "Elena Rodriguez",
      role: "Product Manager",
      company: "Altius Cloud",
      initials: "ER",
    },
  },
];

export function SocialProof() {
  return (
    <section className="bg-secondary/20 py-24 sm:py-32 border-y border-border/40">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by innovative engineering teams
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl bg-background p-8 shadow-sm border border-border/50"
            >
              <p className="text-muted-foreground text-lg italic leading-relaxed mb-8">
                "{testimonial.body}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <Avatar className="h-12 w-12 border">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {testimonial.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.author.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.author.role}, {testimonial.author.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
