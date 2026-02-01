import { Award, GitBranch, Shield, Skull } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const certifications = [
  {
    title: "Git & GitHub for Beginners",
    icon: GitBranch,
    issuer: "Professional Certification",
    color: "primary"
  },
  {
    title: "Network Security",
    icon: Shield,
    issuer: "Professional Certification",
    color: "secondary"
  },
  {
    title: "Kali Linux",
    icon: Skull,
    issuer: "Professional Certification",
    color: "primary"
  }
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm mb-2 block">// CERTIFICATIONS</span>
            <h2 className="section-title gradient-text">Credentials</h2>
          </div>

          {/* Certifications grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card 
                key={index} 
                className="terminal-card border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <CardContent className="p-8 text-center">
                  {/* Icon badge */}
                  <div className={`inline-flex p-4 rounded-2xl mb-6 ${
                    cert.color === "primary" 
                      ? "bg-primary/10 group-hover:bg-primary/20" 
                      : "bg-secondary/10 group-hover:bg-secondary/20"
                  } transition-colors`}>
                    <cert.icon className={`w-10 h-10 ${
                      cert.color === "primary" ? "text-primary" : "text-secondary"
                    }`} />
                  </div>

                  {/* Certification title */}
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {cert.issuer}
                  </p>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-xs font-mono text-muted-foreground">Verified</span>
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

export default CertificationsSection;
