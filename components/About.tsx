import React from 'react';
import SectionWrapper from './SectionWrapper';

interface AboutProps {
  onOpenResume: () => void;
}

const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  return (
    <SectionWrapper id="about" title="About Protocol" animatedBackground={true}>
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-neon-blue to-purple-600 rounded-lg opacity-20 blur-lg"></div>
        <div className="relative bg-cyber-gray border border-gray-800 p-8 md:p-12 rounded-lg backdrop-blur-sm">
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
               <div className="aspect-square relative overflow-hidden rounded-lg border-2 border-gray-700 group">
                 <img 
                   src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" 
                   alt="Saira Nasir" 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                 />
                 <div className="absolute inset-0 bg-neon-blue/10 mix-blend-overlay"></div>
               </div>
            </div>
            
            <div className="w-full md:w-2/3 space-y-6">
              <div className="text-gray-300 font-sans text-lg leading-relaxed space-y-6">
                <p>
                  <span className="text-neon-blue font-bold">SUMMARY //</span> A detail-oriented Computer Science student with hands-on experience in web development, UI/UX design, and WordPress development. Adept at delivering user-friendly solutions and eager to apply technical skills in a dynamic work environment.
                </p>
                <p>
                  Passionate about learning and staying up-to-date with the latest technologies. I specialize in <span className="text-white">UI & UX Designing</span> to create visually appealing designs and <span className="text-white">WordPress Development</span> to build functional, eye-catching websites.
                </p>
              </div>

              <div className="pt-4">
                 <button 
                   onClick={onOpenResume}
                   className="relative inline-block group cursor-pointer"
                 >
                   <span className="absolute inset-0 bg-neon-blue/20 blur-md group-hover:bg-neon-blue/40 transition-all duration-300"></span>
                   <span className="relative z-10 block px-8 py-3 bg-cyber-black border border-neon-blue text-neon-blue font-heading font-bold tracking-widest uppercase text-sm group-hover:bg-neon-blue group-hover:text-black transition-all duration-300">
                     View Resume
                   </span>
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
