import {
  Bug,
  ShieldCheck,
  Workflow,
  TerminalSquare,
  TestTube2,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "Advanced Issue Tracking",
    description:
      "Capture, prioritize, and track bugs with precision. Custom workflows adapt to your team's unique Agile or Kanban processes.",
    icon: Bug,
    className:
      "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-primary/10 to-transparent",
  },
  {
    title: "Strict RBAC",
    description:
      "Enterprise-grade role-based access control. Ensure users only see and interact with what they need.",
    icon: ShieldCheck,
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    title: "Test Case Management",
    description:
      "Seamlessly link test cases to issues. Ensure comprehensive QA coverage before every major release.",
    icon: TestTube2,
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    title: "Powerful APIs",
    description:
      "Built for developers. Automate workflows, integrate with CI/CD, and extend BugTrackerX with our REST APIs.",
    icon: TerminalSquare,
    className: "md:col-span-2 lg:col-span-1",
  },
  {
    title: "Real-time Analytics",
    description:
      "Customizable dashboards and reports that give you a bird's-eye view of project health and team velocity.",
    icon: BarChart3,
    className: "md:col-span-3 lg:col-span-1",
  },
];

export function BentoGrid() {
  return (
    <section id="features-grid" className="py-24 bg-background relative">
      <div className="container px-4 md:px-8 max-w-screen-xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to ship quality software.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A carefully curated set of tools designed to remove friction from
            your development lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 ${feature.className}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
