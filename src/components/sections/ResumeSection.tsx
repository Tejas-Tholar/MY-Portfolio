import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResumeSection = () => {
 const handleDownload = () => {
  const link = document.createElement("a");
  link.href = "/Tejas Tholar Resume.pdf"; // file in public folder
  link.download = "Tejas Tholar Resume.pdf"; // download file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <section id="resume" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Terminal-style card */}
          <div className="terminal-card p-8 md:p-12 text-center">
            {/* Terminal header */}
            <div className="flex items-center justify-center gap-2 mb-8 pb-4 border-b border-border">
              <span className="w-3 h-3 rounded-full bg-destructive/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-primary/80" />
              <span className="ml-4 text-muted-foreground font-mono text-sm">resume.pdf</span>
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
              Download my resume to get a complete overview of my skills, experience, and qualifications.
            </p>

            {/* Download button */}
            <Button 
              onClick={handleDownload}
              size="lg"
              className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-lg px-8"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>

            {/* Terminal footer */}
            <p className="mt-8 text-muted-foreground font-mono text-sm">
              <span className="text-primary">$</span> cat resume.pdf | less <span className="animate-pulse">_</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
