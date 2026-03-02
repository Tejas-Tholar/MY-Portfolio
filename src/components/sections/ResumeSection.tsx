"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResumeSection = () => {
  const [showResume, setShowResume] = useState(false);

  return (
    <section id="resume" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Terminal Card */}
          <div className="terminal-card p-8 md:p-12 text-center">

            {/* Terminal header */}
            <div className="flex items-center justify-center gap-2 mb-8 pb-4 border-b border-border">
              <span className="w-3 h-3 rounded-full bg-destructive/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-primary/80" />
              <span className="ml-4 text-muted-foreground font-mono text-sm">
                resume.pdf
              </span>
            </div>

            {/* Icon */}
            <div className="inline-flex p-6 bg-primary/10 rounded-2xl mb-6">
              <FileText className="w-12 h-12 text-primary" />
            </div>

            {/* Content */}
            <h2 className="text-2xl md:text-3xl font-bold font-mono text-foreground mb-4">
              Want to know more?
            </h2>

            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Preview or download my resume to explore my skills and experience.
            </p>

            {/* Open Terminal Button */}
            <Button
              onClick={() => setShowResume(true)}
              size="lg"
              className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-lg px-8"
            >
              <Download className="w-5 h-5 mr-2" />
              Open Resume
            </Button>

            {/* Terminal footer */}
            <p className="mt-8 text-muted-foreground font-mono text-sm">
              <span className="text-primary">$</span> cat resume.pdf | less{" "}
              <span className="animate-pulse">_</span>
            </p>
          </div>
        </div>
      </div>

      {/* Terminal Modal */}
      {showResume && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          
          <div className="w-full max-w-5xl h-[85vh] bg-[#0d1117] rounded-xl shadow-2xl border border-primary/30 flex flex-col overflow-hidden">

            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-primary/20">
              
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>

              <div className="text-xs font-mono text-green-400">
                tejas@portfolio:~/resume$
              </div>

              <div className="flex items-center gap-4 text-sm font-mono">
                
                {/* Download */}
                <a
                  href="/Tejas Tholar Resume.pdf"
                  download
                  className="text-primary hover:text-green-400 transition"
                >
                  download
                </a>

                {/* Exit */}
                <button
                  onClick={() => setShowResume(false)}
                  className="text-gray-400 hover:text-red-400 transition"
                >
                  /exit
                </button>

              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-black">
              <iframe
                src="/Tejas Tholar Resume.pdf"
                className="w-full h-full"
              />
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default ResumeSection;