import { useState } from "react";
import { Mail, Phone, Send, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual only - no actual submission
    alert("Thank you for your message! This is a demo form.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm mb-2 block">// CONTACT</span>
            <h2 className="section-title gradient-text">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </div>

            <div className="flex justify-center">

           {/* Contact info */}
            <div className="space-y-6">
              {/* Direct contact */}
              <Card className="terminal-card border-border">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold font-mono text-foreground mb-6">
                    Direct Contact
                  </h3>
                  
                  <div className="space-y-4">
                    <a 
                      href="mailto:tejas.tholar@example.com" 
                      className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-foreground font-mono">tejastholar@outlook.com</p>
                      </div>
                    </a>

                    <a 
                      href="tel:+911234567890" 
                      className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                        <Phone className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="text-foreground font-mono">+91 96191 09062</p>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Social links */}
              <Card className="terminal-card border-border">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold font-mono text-foreground mb-6">
                    Connect Online
                  </h3>
                  
                  <div className="flex gap-4">
                    <a 
                      href="https://github.com/Tejas-Tholar" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <Github className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                      <span className="font-mono text-foreground group-hover:text-primary transition-colors">GitHub</span>
                    </a>

                    <a 
                      href="https://www.linkedin.com/in/tejas-tholar-36b016317/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <Linkedin className="w-6 h-6 text-foreground group-hover:text-secondary transition-colors" />
                      <span className="font-mono text-foreground group-hover:text-secondary transition-colors">LinkedIn</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Closing message */}
              <div className="text-center p-6 font-mono text-muted-foreground">
                <p className="text-primary">&lt;/&gt;</p>
                <p className="mt-2">Let's build something secure together.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
