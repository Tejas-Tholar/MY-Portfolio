import { Briefcase, Calendar, Shield, Users, Network } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const responsibilities = [
  {
    icon: Shield,
    text: "Gained hands-on exposure to firewall management and network security protocols"
  },
  {
    icon: Network,
    text: "Assisted in monitoring and maintaining network infrastructure security"
  },
  {
    icon: Users,
    text: "Collaborated with IT security team on various security-related tasks"
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm mb-2 block">// EXPERIENCE</span>
            <h2 className="section-title gradient-text">Work Experience</h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20" />

            {/* Experience card */}
            <div className="relative pl-8 md:pl-0 md:w-1/2 md:ml-auto md:pr-8">
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-auto md:-right-[calc(50%+0.5rem)] top-0 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-[0_0_10px_hsl(var(--primary))]" />

              <Card className="terminal-card border-border hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  {/* Company badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span className="text-sm font-mono text-primary">Internship</span>
                  </div>

                  {/* Title and company */}
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Network Security Intern
                  </h3>
                  <p className="text-lg text-secondary font-medium mb-3">
                    Indian Oil Corporation Ltd.
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-muted-foreground mb-6">
                    <Calendar className="w-4 h-4" />
                    <span>May 2025 – July 2025</span>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-4">
                    {responsibilities.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded-lg shrink-0">
                          <item.icon className="w-4 h-4 text-secondary" />
                        </div>
                        <p className="text-muted-foreground text-sm">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
