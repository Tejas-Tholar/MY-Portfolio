import { Terminal, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-mono">Tejas Tholar</span>
          </div>

        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
