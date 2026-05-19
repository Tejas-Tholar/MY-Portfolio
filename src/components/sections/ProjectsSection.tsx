import { Card, CardContent } from "@/components/ui/card";
import { FolderGit2, ArrowRight, BrainCircuit } from "lucide-react";
import { FaTrafficLight } from "react-icons/fa";

const projects = [
  {
    title: "Skillora",
    subtitle: "AI Powered Learning Platform",
    description:
      "Skillora is an AI-powered educational platform that generates personalized courses, tracks student progress, and creates adaptive learning paths based on student goals and performance.",
    icon: BrainCircuit,
    status: "Live",
    link: "https://skillorai.in"
  },
  {
    title: "ASP.Net Project",
    subtitle: "Traffic Violation System",
    description:
      "Traffic Violation Detection System is a web-based platform that enables citizens to report traffic violations with evidence while allowing authorities to verify reports and manage actions efficiently.",
    icon: FaTrafficLight,
    status: "In Production",
    link: "https://trafficviolation.bsite.net/Citizen/home.aspx"
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm mb-2 block">
              // PROJECTS
            </span>

            <h2 className="section-title gradient-text">My Work</h2>

            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Building AI products, security tools, and real-world applications through hands-on development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="terminal-card border-border hover:border-secondary/50 transition-all duration-300 group overflow-hidden"
              >
                <CardContent className="p-0">

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

                    <p className="text-primary font-mono text-sm">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-6">
                      {project.description}
                    </p>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all"
                    >
                      <FolderGit2 className="w-4 h-4" />
                      <span>See It</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
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
