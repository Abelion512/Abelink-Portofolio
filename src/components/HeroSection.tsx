import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const orbs = document.querySelectorAll('.floating-orb');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 50;
        
        if (orb instanceof HTMLElement) {
          orb.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/40"></div>

      {/* Floating Orbs */}
      <div className="floating-orb w-32 h-32 top-20 left-20"></div>
      <div className="floating-orb w-24 h-24 top-40 right-32" style={{ animationDelay: '2s' }}></div>
      <div className="floating-orb w-16 h-16 bottom-40 left-1/4" style={{ animationDelay: '4s' }}></div>
      <div className="floating-orb w-20 h-20 bottom-20 right-20" style={{ animationDelay: '1s' }}></div>

      {/* ID Badge */}
      <div className="absolute top-32 right-8 md:right-20 floating-badge">
        <div className="cyber-card p-4 min-w-[200px]">
          <div className="text-xs text-muted-foreground mb-1">INFORMATION SYSTEMS</div>
          <div className="text-sm font-medium text-primary">STUDENT ID</div>
          <div className="text-lg font-bold glow-text">IHSANUDDIN SALAV</div>
          <div className="text-xs text-muted-foreground mt-2">STUDENT</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              IHSANUDDIN SALAV
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-4">
            I build things that matter.
          </p>
          <p className="text-lg text-muted-foreground mb-12">
            Student at Universitas Siber Muhammadiyah.
          </p>
          
          <button 
            onClick={scrollToAbout}
            className="cyber-button text-primary-foreground font-medium"
          >
            Explore My Work
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="w-6 h-6 text-primary" />
      </button>
    </section>
  );
};

export default HeroSection;