import {
  ShieldCheck,
  Activity,
  Users,
  Zap,
  Search,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    name: "Role-Based Access Control",
    description:
      "Granular permissions for Developers, QA, PMs, and Stakeholders. Keep your workflows secure and compliant.",
    icon: ShieldCheck,
  },
  {
    name: "Real-time Traceability",
    description:
      "Track every bug from discovery to deployment. Link issues directly to commits and test runs seamlessly.",
    icon: Activity,
  },
  {
    name: "Multi-tenant Organizations",
    description:
      "Manage multiple teams, projects, and clients from a single unified workspace with complete data isolation.",
    icon: Users,
  },
  {
    name: "Lightning Fast API",
    description:
      "Built on Next.js and Drizzle ORM, our endpoints respond in milliseconds. Say goodbye to loading spinners.",
    icon: Zap,
  },
  {
    name: "Advanced Filtering",
    description:
      "Find exactly what you need with powerful search, custom filters, and saveable views for your team.",
    icon: Search,
  },
  {
    name: "Custom Dashboards",
    description:
      "Visualize your project health with customizable widgets, charts, and automated sprint reporting.",
    icon: LayoutDashboard,
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Powerful Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to ship faster
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            BugTrackerX provides enterprise-grade tools designed specifically
            for modern engineering teams who care about quality.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative group rounded-2xl border border-border/50 bg-card p-8 transition-all hover:shadow-md hover:border-primary/20"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                {feature.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
