import { Shield, Lock, Code, Blocks } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const highlights = [
  {
    icon: Shield,
    title: "Cybersecurity Focus",
    description: "BCA student specializing in network and digital security"
  },
  {
    icon: Lock,
    title: "Penetration Testing",
    description: "Learning ethical hacking and vulnerability assessment"
  },
  {
    icon: Code,
    title: "AI Product Builder",
    description: "Building AI-powered platforms and personalized learning systems"
  },
  {
    icon: Blocks,
    title: "Skillora Founder",
    description: "Working on an AI platform for personalized education and student tracking"
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm mb-2 block">// ABOUT ME</span>
            <h2 className="section-title gradient-text">Who I Am</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="terminal-card p-8">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <span className="w-3 h-3 rounded-full bg-destructive/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-primary/80" />
                <span className="ml-4 text-muted-foreground font-mono text-sm">about.sh</span>
              </div>

              <div className="font-mono text-sm space-y-3">
                <p className="text-muted-foreground">
                  <span className="text-primary">$</span> cat about.txt
                </p>

                <div className="pl-4 text-foreground leading-relaxed">
                  <p className="mb-4">
                    Hello! I'm <span className="text-primary font-semibold">Tejas Tholar</span>,
                    a BCA student at Somaiya Vidyavihar University with a strong passion for
                    cybersecurity, AI products, and network security.
                  </p>

                  <p className="mb-4">
                    I am also the creator of <span className="text-primary font-semibold">Skillora</span>,
                    an AI-powered personalized learning platform designed to generate custom courses,
                    track student progress, and help learners stay consistent with adaptive learning paths.
                  </p>

                  <p className="mb-4">
                    Skillora focuses on making education smarter using AI-generated roadmaps,
                    personalized recommendations, analytics, and student performance tracking
                    to create a better learning experience.
                  </p>

                  <p>
                    When I'm not building projects like Skillora, I'm exploring cybersecurity,
                    blockchain technology, and modern software systems that solve real-world problems.
                  </p>
                </div>

                <p className="text-muted-foreground">
                  <span className="text-primary">$</span> <span className="animate-pulse">_</span>
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <Card
                  key={index}
                  className="terminal-card border-border hover:border-primary/50 transition-colors group"
                >
                  <CardContent className="p-6">
                    <item.icon className="w-10 h-10 text-secondary mb-4 group-hover:text-primary transition-colors" />
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
