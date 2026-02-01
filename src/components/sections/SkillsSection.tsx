import { Shield, Code, Database, GitBranch, Globe, Wrench, Blocks, Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const technicalSkills = [
  { name: "Network Security", icon: Shield, level: 75 },
  { name: "Cybersecurity Awareness", icon: Shield, level: 80 },
  { name: "Database Management", icon: Database, level: 70 },
  { name: "Blockchain (Learning)", icon: Blocks, level: 40 },
  { name: "Git & GitHub", icon: GitBranch, level: 75 },
  { name: "WordPress", icon: Globe, level: 65 },
  { name: "Technical Troubleshooting", icon: Wrench, level: 80 },
];

const programmingLanguages = [
  { name: "C", level: 75 },
  { name: "Java", level: 70 },
  { name: "Python", level: 65 },
  { name: "PLSQL", level: 60 },
  { name: "JavaScript", level: 65 },
  { name: "HTML & CSS", level: 85 },
  { name: "Solidity (Basic)", level: 30 },
  { name: "8085 Assembly", level: 45 },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm mb-2 block">// SKILLS</span>
            <h2 className="section-title gradient-text">Technical Arsenal</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Terminal className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold font-mono text-foreground">Technical Skills</h3>
              </div>
              
              <div className="space-y-4">
                {technicalSkills.map((skill, index) => (
                  <Card key={index} className="terminal-card border-border hover:border-primary/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <skill.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-foreground">{skill.name}</span>
                            <span className="text-sm text-muted-foreground font-mono">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Programming Languages */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Code className="w-6 h-6 text-secondary" />
                <h3 className="text-xl font-bold font-mono text-foreground">Programming Languages</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {programmingLanguages.map((lang, index) => (
                  <Card key={index} className="terminal-card border-border hover:border-secondary/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium text-foreground text-sm">{lang.name}</span>
                        <span className="text-xs text-muted-foreground font-mono">{lang.level}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-500"
                          style={{ width: `${lang.level}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
