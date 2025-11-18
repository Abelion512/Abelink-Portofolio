import { useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import projectPreview from '@/assets/project-preview.jpg';

const ProjectsSection = () => {
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

  const projects = [
    {
      title: 'Project 01',
      description: '-',
      image: projectPreview,
      tags: ['-'],
      githubUrl: '#',
      liveUrl: '#'
    },
    {
      title: 'Project 02',
      description: '-',
      image: projectPreview,
      tags: ['-'],
      githubUrl: '#',
      liveUrl: '#'
    },
    {
      title: 'Project 03',
      description: '-',
      image: projectPreview,
      tags: ['-'],
      githubUrl: '#',
      liveUrl: '#'
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-6 bg-cyber-darker/50">
      <div className="container mx-auto max-w-6xl">
        <div className="section-fade text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
            Featured Projects
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Explore my latest work in artificial intelligence, automation, and innovative solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title} 
              className="section-fade project-card group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Action Buttons */}
                <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a 
                    href={project.githubUrl}
                    className="w-10 h-10 bg-background/90 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href={project.liveUrl}
                    className="w-10 h-10 bg-background/90 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;