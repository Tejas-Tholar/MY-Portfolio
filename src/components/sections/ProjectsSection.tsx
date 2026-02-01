import { FolderGit2, Lock, Network, Wrench, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    title: "Cybersecurity Projects",
    subtitle: "Coming Soon",
    description: "Security analysis tools, vulnerability scanners, and penetration testing utilities",
    icon: Lock,
    status: "In Development"
  },
  {
    title: "Network Security Labs",
    subtitle: "Coming Soon",
    description: "Hands-on network monitoring, firewall configurations, and intrusion detection systems",
    icon: Network,
    status: "Planning"
  },
  {
    title: "Security Tools",
    subtitle: "Coming Soon",
    description: "Custom scripts and utilities for security automation and threat analysis",
    icon: Wrench,
    status: "Upcoming"
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm mb-2 block">// PROJECTS</span>
            <h2 className="section-title gradient-text">My Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Building security tools and learning through hands-on projects. More coming soon!
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="terminal-card border-border hover:border-secondary/50 transition-all duration-300 group overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Card header */}
                  <div className="p-6 border-b border-border">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                        <project.icon className="w-6 h-6 text-secondary" />
                      </div>
                      <span className="px-2 py-1 bg-muted text-xs font-mono text-muted-foreground rounded">
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="text-primary font-mono text-sm">{project.subtitle}</p>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    
                    {/* Placeholder link */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-secondary transition-colors">
                      <FolderGit2 className="w-4 h-4" />
                      <span>View on GitHub</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
