const Footer = () => {
  return (
    <footer className="border-t border-border/20 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold glow-text mb-2">Abelion Lavv</div>
            <p className="text-muted-foreground">Building the future, one line of code at a time.</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Abelion Lavv. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Designed with passion and precision.
            </p>
          </div>
        </div>
        
        {/* Decorative line */}
        <div className="mt-8 pt-8 border-t border-border/10 text-center">
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full opacity-50"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;