import React from 'react';
import DecryptText from './DecryptText';

interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
  animatedBackground?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children, animatedBackground = false }) => {
  return (
    <section id={id} className="py-24 md:py-32 bg-cyber-black relative overflow-hidden group">
      {/* Background Hover Animation */}
      {animatedBackground && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Grid Fade In */}
          <div className="absolute inset-0 bg-cyber-grid opacity-0 group-hover:opacity-10 transition-opacity duration-1000 ease-in-out"></div>
          {/* Scanning Line Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent h-[100%] opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity duration-500"></div>
        </div>
      )}

      {/* Decorative vertical line */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gray-800 to-transparent z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-white uppercase tracking-wider mb-2">
            <DecryptText text={title} />
          </h2>
          <div className="w-24 h-1 bg-neon-blue shadow-[0_0_10px_#00f3ff]"></div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;