"use client";

import { useState } from "react";
import { Award, GitBranch, Shield, Skull, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { Bug } from "lucide-react";

const certifications = [
  {
    title: "Git & GitHub for Beginners",
    icon: GitBranch,
    issuer: "Professional Certification",
    color: "primary",
    certificateLink: "/certificates/Git&Github.pdf",
  },
  {
    title: "Network Security",
    icon: Shield,
    issuer: "Cisco",
    color: "secondary",
    certificateLink: "/certificates/Network-Security.pdf",
  },
  {
    title: "Kali Linux",
    icon: Skull,
    issuer: "Boord Infinity",
    color: "primary",
    certificateLink: "/certificates/Kali-Linux.pdf",
  },
  {
    title: "Ethical Hacking",
    icon: ShieldCheck,
    issuer: "IIT Bombay TechFest",
    color: "secondary",
    certificateLink: "/certificates/IIT-Bombay_Ethcal_Hacking.pdf",
}
];

const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm mb-2 block">
              // CERTIFICATIONS
            </span>
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
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-2xl mb-6 ${
                      cert.color === "primary"
                        ? "bg-primary/10 group-hover:bg-primary/20"
                        : "bg-secondary/10 group-hover:bg-secondary/20"
                    } transition-colors`}
                  >
                    <cert.icon
                      className={`w-10 h-10 ${
                        cert.color === "primary"
                          ? "text-primary"
                          : "text-secondary"
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {cert.issuer}
                  </p>

                  {/* Verified Button */}
                  <button
                    onClick={() => setSelectedCert(cert.certificateLink)}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full hover:bg-primary/10 transition-all duration-300"
                  >
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-xs font-mono text-muted-foreground">
                      Verify Credential
                    </span>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-2xl w-full max-w-4xl h-[80vh] relative shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* PDF Viewer */}
            <iframe
              src={selectedCert}
              className="w-full h-full rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationsSection;