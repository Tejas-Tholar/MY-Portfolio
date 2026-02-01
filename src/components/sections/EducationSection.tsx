import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EducationSection = () => {
  return (
    <section id="education" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm mb-2 block">// EDUCATION</span>
            <h2 className="section-title gradient-text">Academic Journey</h2>
          </div>

          {/* Education card */}
          <Card className="terminal-card border-border overflow-hidden">
            <CardContent className="p-0">
              {/* Card header with accent */}
              <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 border-b border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      Bachelor of Computer Applications (BCA)
                    </h3>
                    <p className="text-lg text-secondary font-medium">
                      Somaiya Vidyavihar University
                    </p>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>2024 – Present</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span>Mumbai, India</span>
                  </div>
                </div>

                {/* Focus areas */}
                <div className="space-y-3">
                  <p className="text-muted-foreground font-mono text-sm">
                    <span className="text-primary">$</span> ls focus_areas/
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Cybersecurity", "Network Security", "Database Management", "Programming", "Web Development"].map((area) => (
                      <span 
                        key={area}
                        className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-mono"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
