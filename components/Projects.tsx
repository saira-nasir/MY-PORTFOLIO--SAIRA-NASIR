import React from 'react';
import SectionWrapper from './SectionWrapper';

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  tags: string[];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, link, tags, index }) => {
  return (
    <div className="group relative bg-cyber-gray/40 border border-gray-800 hover:border-neon-blue transition-all duration-500 overflow-hidden flex flex-col h-full rounded-sm hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]">
      
      {/* Background Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-blue/0 group-hover:border-neon-blue transition-all duration-300"></div>

      <div className="p-8 flex-grow flex flex-col relative z-10">
        <div className="text-neon-blue text-xs font-heading mb-3 tracking-widest">
          PROJECT_0{index + 1}
        </div>
        <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-neon-blue transition-colors duration-300 uppercase leading-none">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider border border-gray-700 px-2 py-1 text-gray-400 group-hover:border-neon-blue/50 group-hover:text-neon-blue/80 transition-colors">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-400 mb-6 flex-grow font-sans leading-relaxed text-sm border-l-2 border-gray-700 pl-4 group-hover:border-neon-blue transition-colors">
          {description}
        </p>
        <div className="mt-auto pt-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex items-center gap-3 px-6 py-2 bg-transparent border border-neon-blue/50 text-neon-blue font-heading text-xs font-bold uppercase tracking-widest hover:bg-neon-blue hover:text-black hover:border-neon-blue transition-all duration-300"
          >
            <span>View Project</span>
            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const projectData = [
    {
      title: "E-commerce PWA",
      description: "A high-performance Progressive Web App utilizing server-side rendering, built on Next.js, TypeScript, and Tailwind CSS for a seamless shopping experience.",
      link: "https://drive.google.com/drive/folders/1TIigM0uyzb62q6GSewtvsctl5LUo57Lq?usp=sharing",
      tags: ["Next.js", "TypeScript", "PWA"],
    },
    {
      title: "Django API Core",
      description: "A robust and secure back-end API built with Python/Django, managing data with PostgreSQL and deployed using containerization for scalability.",
      link: "https://drive.google.com/drive/folders/1TIigM0uyzb62q6GSewtvsctl5LUo57Lq?usp=sharing",
      tags: ["Django", "PostgreSQL", "Docker"],
    },
    {
      title: "Headless CMS Arch",
      description: "Demonstrates expertise in decoupling WordPress as a Headless CMS, serving dynamic content to a custom-built, modern React front-end application.",
      link: "https://drive.google.com/drive/folders/1TIigM0uyzb62q6GSewtvsctl5LUo57Lq?usp=sharing",
      tags: ["React", "WordPress", "GraphQL"],
    },
  ];

  return (
    <SectionWrapper id="projects" title="Deployed Units">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectData.map((project, index) => (
          <ProjectCard key={index} {...project} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Projects;