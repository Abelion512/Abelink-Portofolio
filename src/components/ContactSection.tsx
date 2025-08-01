import { useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.section-fade');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:abelion@example.com',
      color: 'hover:text-red-400'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/abelion',
      color: 'hover:text-foreground'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/abelion',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/abelion',
      color: 'hover:text-blue-300'
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="floating-orb w-64 h-64 top-10 -left-32" style={{ animationDelay: '0s' }}></div>
        <div className="floating-orb w-48 h-48 bottom-10 -right-24" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="section-fade text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
            Let's Connect
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Ready to collaborate on your next project? I'm always open to discussing new opportunities and innovative ideas.
          </p>
        </div>

        <div className="section-fade">
          <div className="cyber-card max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Get In Touch
              </h3>
              <p className="text-foreground/70">
                Whether you have a project in mind, want to discuss cybersecurity, 
                or just want to say hello, I'd love to hear from you.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-8">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-primary/20 ${link.color}`}
                  aria-label={link.name}
                >
                  <link.icon className="w-6 h-6" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => window.open('mailto:abelion@example.com', '_blank')}
              className="cyber-button text-primary-foreground font-medium"
            >
              Send Me a Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;