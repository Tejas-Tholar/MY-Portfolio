import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Mail } from "lucide-react";

const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Cybersecurity & Network Security Enthusiast";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Terminal header */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full mb-8 font-mono text-sm text-muted-foreground">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>~/portfolio</span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono mb-6">
            <span className="text-foreground">Tejas </span>
            <span className="gradient-text glow-primary">Tholar</span>
          </h1>

          {/* Typing title */}
          <div className="h-12 md:h-16 flex items-center justify-center mb-6">
            <p className="text-xl md:text-2xl font-mono text-secondary">
              {displayText}
              <span className="inline-block w-0.5 h-6 bg-secondary ml-1 animate-pulse" />
            </p>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-4 font-mono">
            &gt; "Learning to Secure the Digital World."
          </p>

          {/* Intro */}
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            BCA student passionate about cybersecurity, network security, and digital defense. 
            Dedicated to mastering the tools and techniques that protect our connected world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => scrollToSection("#skills")}
              className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
            >
              <ArrowDown className="w-4 h-4 mr-2" />
              View Skills
            </Button>
            <Button
              onClick={() => scrollToSection("#resume")}
              variant="outline"
              className="btn-glow-secondary border-secondary text-secondary hover:bg-secondary/10 font-mono"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
            <Button
              onClick={() => scrollToSection("#contact")}
              variant="ghost"
              className="text-muted-foreground hover:text-foreground font-mono"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
