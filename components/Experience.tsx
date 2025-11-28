import React, { useState, useEffect, useRef } from 'react';
import SectionWrapper from './SectionWrapper';

interface JobProps {
  role: string;
  company: string;
  duration: string;
  location: string;
  description?: string;
  isLast?: boolean;
}

const JobNode: React.FC<JobProps> = ({ role, company, duration, location, description, isLast }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div 
      ref={domRef}
      className={`relative pl-8 md:pl-0 group transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Center Line (Desktop) / Left Line (Mobile) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-800 -translate-x-1/2 group-last:bottom-auto group-last:h-full"></div>
      <div className="md:hidden absolute left-[11px] top-0 bottom-0 w-px bg-gray-800"></div>

      {/* Glowing Node */}
      <div className="absolute left-[2px] md:left-1/2 w-5 h-5 bg-cyber-black border border-neon-blue rounded-full -translate-x-1/2 md:-translate-x-1/2 mt-6 shadow-[0_0_10px_rgba(0,243,255,0.5)] z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
        <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
      </div>

      <div className={`flex flex-col md:flex-row items-center justify-between gap-8 mb-12 ${isLast ? 'mb-0' : ''}`}>
        {/* Date & Location (Alternating sides for desktop) */}
        <div className="w-full md:w-5/12 text-left md:text-right order-2 md:order-1">
          <div className="inline-block bg-cyber-gray/50 border border-neon-blue/30 px-4 py-1 rounded-sm text-sm text-neon-blue font-heading tracking-widest mb-2 shadow-[0_0_10px_rgba(0,243,255,0.1)]">
            {duration}
          </div>
          <div className="text-gray-500 font-sans text-xs uppercase tracking-[0.2em]">{location}</div>
        </div>

        {/* Spacer for center line */}
        <div className="hidden md:block md:w-2/12 order-2"></div>

        {/* Content Card */}
        <div className="w-full md:w-5/12 text-left order-1 md:order-3">
          <div className="bg-cyber-gray/20 border border-white/10 p-6 rounded-sm hover:border-neon-blue transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.1)] hover:bg-cyber-gray/40 relative overflow-hidden backdrop-blur-sm">
            
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-neon-blue/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <h3 className="text-xl font-heading font-bold text-white mb-1 group-hover:text-neon-blue transition-colors">{role}</h3>
            <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">{company}</h4>
            {description && (
              <p className="text-gray-400 font-sans text-sm leading-relaxed border-l border-gray-700 pl-3 group-hover:border-neon-blue/50 transition-colors">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  const jobs = [
    {
      role: 'UI/UX Designer',
      company: 'Cybernetics Innovations',
      duration: 'Jan 2025 - Present',
      location: 'Remote',
      description: 'Designing intuitive and futuristic user interfaces for cutting-edge tech projects.'
    },
    {
      role: 'Web Designer & Developer',
      company: 'Tredential Marketing',
      duration: 'Aug 2024 - Dec 2024',
      location: 'Shekhūpura, Pakistan',
      description: 'Worked on web design and development projects, delivering high-quality solutions in a short timeframe. Implemented responsive designs and optimized site performance.'
    },
    {
      role: 'Wordpress Designer & Developer',
      company: 'LWE',
      duration: 'Mar 2024 - Apr 2024',
      location: 'Pakistan',
      description: 'Worked as an Intern with this esteemed EduCommerce institution, focusing on WordPress custom themes and plugin integration.'
    }
  ];

  return (
    <SectionWrapper id="experience" title="Experience Log" animatedBackground={true}>
      <div className="max-w-5xl mx-auto py-10 relative">
        {/* Timeline Line Gradient Overlay */}
        <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-neon-blue/50 to-transparent -translate-x-[0.5px] pointer-events-none opacity-50"></div>
        
        {jobs.map((job, index) => (
          <JobNode 
            key={index} 
            {...job} 
            isLast={index === jobs.length - 1} 
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Experience;