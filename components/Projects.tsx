import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import ProjectModal, { ProjectData } from './ProjectModal';

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-cyber-gray/40 border border-gray-800 hover:border-neon-blue transition-all duration-500 overflow-hidden flex flex-col h-full rounded-sm hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] cursor-pointer"
    >
      
      {/* Background Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-blue/0 group-hover:border-neon-blue transition-all duration-300"></div>

      <div className="p-8 flex-grow flex flex-col relative z-10">
        <div className="text-neon-blue text-xs font-heading mb-3 tracking-widest">
          PROJECT_0{index + 1}
        </div>
        <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-neon-blue transition-colors duration-300 uppercase leading-none">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider border border-gray-700 px-2 py-1 text-gray-400 group-hover:border-neon-blue/50 group-hover:text-neon-blue/80 transition-colors">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-400 mb-6 flex-grow font-sans leading-relaxed text-sm border-l-2 border-gray-700 pl-4 group-hover:border-neon-blue transition-colors">
          {project.description}
        </p>
        <div className="mt-auto pt-2">
          <button
            className="group/btn relative inline-flex items-center gap-3 px-6 py-2 bg-transparent border border-neon-blue/50 text-neon-blue font-heading text-xs font-bold uppercase tracking-widest hover:bg-neon-blue hover:text-black hover:border-neon-blue transition-all duration-300 pointer-events-none"
          >
            <span>View Details</span>
            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const projectData: ProjectData[] = [
    {
      title: "E-commerce PWA",
      description: "A high-performance Progressive Web App utilizing server-side rendering, built on Next.js, TypeScript, and Tailwind CSS.",
      longDescription: "A fully featured Progressive Web App (PWA) designed for modern e-commerce. It features server-side rendering for optimal SEO and performance, a custom cart and checkout flow, and offline capabilities. The architecture leverages Next.js for the frontend and a headless CMS for content management, ensuring scalability and ease of updates.",
      link: "https://drive.google.com/drive/folders/1TIigM0uyzb62q6GSewtvsctl5LUo57Lq?usp=sharing",
      tags: ["Next.js", "TypeScript", "PWA", "Tailwind"],
      images: ["https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop"]
    },
    {
      title: "Django API Core",
      description: "A robust and secure back-end API built with Python/Django, managing data with PostgreSQL.",
      longDescription: "A high-security, scalable backend architecture designed to support multiple client applications. This core API handles user authentication (JWT), complex data relationships using PostgreSQL, and is fully containerized with Docker for consistent deployment environments. It features automated testing pipelines and Swagger documentation.",
      link: "https://drive.google.com/drive/folders/1TIigM0uyzb62q6GSewtvsctl5LUo57Lq?usp=sharing",
      tags: ["Django", "PostgreSQL", "Docker", "Python"],
      images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"]
    },
    {
      title: "Headless CMS Arch",
      description: "Demonstrates expertise in decoupling WordPress as a Headless CMS, serving dynamic content to a React front-end.",
      longDescription: "This project decouples the traditional WordPress monolith, using it purely as a content management API. The frontend is a custom-built, lightning-fast React application that queries content via GraphQL. This approach provides the content editing team with the familiar WordPress interface while delivering a modern, secure, and performant user experience.",
      link: "https://drive.google.com/drive/folders/1TIigM0uyzb62q6GSewtvsctl5LUo57Lq?usp=sharing",
      tags: ["React", "WordPress", "GraphQL", "Headless"],
      images: ["https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop"]
    },
  ];

  return (
    <SectionWrapper id="projects" title="Deployed Units">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectData.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            index={index} 
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>
      
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </SectionWrapper>
  );
};

export default Projects;
