import { useEffect, useRef } from 'react';
import { Eye, Zap, Shield } from 'lucide-react';
import avatarImage from '@/assets/avatar.jpg';

const AboutSection = () => {
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

  const values = [
    {
      icon: Eye,
      title: 'Vision',
      description: 'I see technology as a tool to solve real-world problems and create meaningful impact.'
    },
    {
      icon: Zap,
      title: 'Skill',
      description: 'Constantly learning and adapting to new technologies while mastering the fundamentals.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Building secure, ethical solutions with a focus on privacy and user protection.'
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Avatar and Intro */}
          <div className="section-fade text-center lg:text-left">
            <div className="relative inline-block mb-8">
              <div className="w-64 h-64 mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl relative">
                <img 
                  src="https://ik.imagekit.io/focustimerin/preview%20image1?updatedAt=1757343104763" 
                  alt="Abelion Lavv" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 rounded-full"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-glow"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              About Me
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              I am a student majoring in Information Systems at Muhammadiyah Cyber ​​University. 
              I am passionate about AI, automation, and the latest technologies.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Outside of my work as a student, you'll find me exploring new technologies, 
              contributing to open source projects, or researching the latest trends in Artificial Intelligence.
            </p>
          </div>

          {/* Values */}
          <div className="section-fade">
            <div className="space-y-8">
              {values.map((value, index) => (
                <div key={value.title} className="cyber-card group hover:scale-105 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;