import React, { useEffect } from 'react';

export interface ProjectData {
  title: string;
  description: string;
  link: string;
  tags: string[];
  images: string[];
  readmeContent?: React.ReactNode; // Optional rich content for the modal
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
      
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-cyber-black border border-gray-800 shadow-[0_0_50px_rgba(0,243,255,0.15)] flex flex-col animate-fade-in-up overflow-hidden rounded-sm group">
        
        {/* Cyberpunk Decorative Borders */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-blue to-transparent z-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent z-20"></div>
        
        {/* Header Bar */}
        <div className="bg-gray-900/95 border-b border-gray-800 p-4 flex justify-between items-center shrink-0 relative z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-neon-blue animate-pulse rounded-full"></div>
            <span className="text-neon-blue font-heading text-xs tracking-[0.2em] uppercase">
              Project_Details // {project.title.replace(/\s+/g, '_').toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-neon-blue transition-colors"
            >
              <span>View Source</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto custom-scrollbar bg-[#0d1117]"> {/* GitHub Dark Mode bg color approx */}
          {/* Hero Image */}
          <div className="relative h-64 md:h-80 w-full overflow-hidden border-b border-gray-800">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent z-10"></div>
            <img 
              src={project.images[0]} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-90"
            />
            {/* Scanlines overlay */}
            <div className="absolute inset-0 bg-[url('https://media.istockphoto.com/id/175431696/photo/scanlines-overlay.jpg?s=612x612&w=0&k=20&c=I3R4lXlVwLgQeZtT7oKkFkFkFkFkFkFkFkFkFkFkFk=')] opacity-10 mix-blend-overlay pointer-events-none z-0"></div>
            
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2 text-shadow-glow">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-10 relative z-10">
            {/* Tech Stack Tags (Header) */}
            <div className="flex flex-wrap gap-2 pb-6 border-b border-gray-800">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="grid md:grid-cols-4 gap-10">
               {/* Readme Content */}
               <div className="md:col-span-3">
                  {project.readmeContent ? (
                    <div className="markdown-body text-gray-300">
                      {project.readmeContent}
                    </div>
                  ) : (
                    <p className="text-gray-300 font-sans text-lg leading-relaxed">
                      {project.description}
                    </p>
                  )}
               </div>

               {/* Sidebar Actions */}
               <div className="md:col-span-1 space-y-6">
                 <div className="sticky top-6">
                   <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
                      <h3 className="text-xs font-heading text-gray-400 uppercase mb-4 tracking-wider">Deployment</h3>
                      <div className="space-y-3">
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-green-600 text-white font-bold text-sm py-2 rounded hover:bg-green-500 transition-all shadow-lg shadow-green-900/20"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                          View Code
                        </a>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                         <div className="flex justify-between text-xs">
                           <span className="text-gray-500">License</span>
                           <span className="text-gray-300">MIT</span>
                         </div>
                         <div className="flex justify-between text-xs">
                           <span className="text-gray-500">Version</span>
                           <span className="text-gray-300">1.0.0</span>
                         </div>
                      </div>
                   </div>
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