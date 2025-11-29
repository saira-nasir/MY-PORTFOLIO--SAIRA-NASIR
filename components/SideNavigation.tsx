import React, { useState, useEffect } from 'react';

const SideNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Exp' },
    { id: 'education', label: 'Edu' },
    { id: 'projects', label: 'Work' },
    { id: 'contact', label: 'Link' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-6 items-end">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group flex items-center gap-4 focus:outline-none"
          aria-label={`Scroll to ${section.label}`}
        >
          {/* Label (Hidden by default, slides out on hover/active) */}
          <span 
            className={`
              text-[10px] font-heading font-bold uppercase tracking-widest transition-all duration-300
              ${activeSection === section.id 
                ? 'text-neon-blue opacity-100 translate-x-0' 
                : 'text-gray-500 opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100'}
            `}
          >
            {section.label}
          </span>

          {/* Dot Indicator */}
          <div className="relative flex items-center justify-center w-3 h-3">
            {/* Active Glow Ring */}
            <div 
              className={`
                absolute inset-0 rounded-full bg-neon-blue/30 blur-sm transition-all duration-500
                ${activeSection === section.id ? 'opacity-100 scale-150' : 'opacity-0 scale-0'}
              `}
            ></div>
            
            {/* The Dot */}
            <div 
              className={`
                w-1.5 h-1.5 rounded-full transition-all duration-300 border
                ${activeSection === section.id 
                  ? 'bg-neon-blue border-neon-blue scale-125' 
                  : 'bg-transparent border-gray-600 group-hover:border-white group-hover:bg-white'}
              `}
            ></div>
          </div>
        </button>
      ))}

      {/* Decorative vertical line connecting dots */}
      <div className="absolute right-[5px] top-0 bottom-0 w-[1px] bg-gray-800 -z-10 pointer-events-none"></div>
    </nav>
  );
};

export default SideNavigation;