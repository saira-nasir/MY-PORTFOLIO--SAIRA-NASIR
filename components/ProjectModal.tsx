import React, { useEffect } from 'react';

export interface ProjectData {
  title: string;
  description: string;
  longDescription: string;
  link: string;
  tags: string[];
  images: string[];
}

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-cyber-black border border-gray-800 shadow-[0_0_50px_rgba(0,243,255,0.15)] flex flex-col animate-fade-in-up overflow-hidden rounded-sm group">
        
        {/* Cyberpunk Decorative Borders */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-blue to-transparent z-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent z-20"></div>
        
        {/* Header Bar */}
        <div className="bg-gray-900/80 border-b border-gray-800 p-4 flex justify-between items-center shrink-0 relative z-20 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-blue animate-pulse rounded-full"></div>
            <span className="text-neon-blue font-heading text-xs tracking-[0.2em] uppercase">
              Project_Details // {project.title.replace(/\s+/g, '_').toUpperCase()}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto custom-scrollbar">
          {/* Hero Image */}
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent z-10"></div>
            <img 
              src={project.images[0]} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Scanlines overlay */}
            <div className="absolute inset-0 bg-[url('https://media.istockphoto.com/id/175431696/photo/scanlines-overlay.jpg?s=612x612&w=0&k=20&c=I3R4lXlVwLgQeZtT7oKkFkFkFkFkFkFkFkFkFkFkFk=')] opacity-10 mix-blend-overlay pointer-events-none z-0"></div>
            
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 text-shadow-glow">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="p-8 space-y-8 bg-cyber-black relative z-10">
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-xs font-heading tracking-wider uppercase">
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-lg font-heading text-white uppercase tracking-wider border-l-2 border-purple-500 pl-3">Mission Brief</h3>
                <p className="text-gray-300 font-sans text-lg leading-relaxed">
                  {project.longDescription}
                </p>
                <div className="pt-4 space-y-2">
                   <div className="text-sm text-gray-500 font-mono">STATUS: <span className="text-green-400">DEPLOYED</span></div>
                   <div className="text-sm text-gray-500 font-mono">ACCESS LEVEL: <span className="text-neon-blue">PUBLIC</span></div>
                </div>
              </div>
              
              {/* Sidebar / Actions */}
              <div className="md:col-span-1 space-y-6">
                 <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-sm">
                    <h3 className="text-sm font-heading text-gray-400 uppercase mb-4">Actions</h3>
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-neon-blue text-cyber-black font-heading font-bold uppercase py-3 hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(0,243,255,0.3)]"
                    >
                      Initialize Project
                    </a>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
