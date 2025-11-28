import React from 'react';
import SectionWrapper from './SectionWrapper';

const Education: React.FC = () => {
  const certifications = [
    "Adobe Certified Associate in Graphic Design & Illustration Using Adobe Illustrator",
    "Advanced Social Media Strategy Training and Certification",
    "FREELANCING",
    "WordPress Web Developer"
  ];

  return (
    <SectionWrapper id="education" title="Academic & Certs">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        {/* Education Column */}
        <div className="space-y-6">
           <div className="flex items-center space-x-3 mb-6">
             <div className="w-1 h-8 bg-neon-blue"></div>
             <h3 className="font-heading text-2xl text-white uppercase tracking-wider">Education</h3>
           </div>
           
           <div className="bg-cyber-gray/40 border border-white/10 p-8 rounded-lg relative overflow-hidden group hover:border-neon-blue transition-colors duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <svg className="w-24 h-24 text-neon-blue" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>
              </div>
              
              <div className="relative z-10">
                <div className="text-neon-blue font-bold font-heading mb-2">2024 - 2026 (Expected)</div>
                <h4 className="text-2xl text-white font-bold mb-1">Bachelor's Degree</h4>
                <div className="text-xl text-gray-300 mb-4">Computer Science</div>
                <div className="text-gray-400 font-sans border-t border-gray-700 pt-4">
                  COMSATS Institute of Information and Technology
                </div>
              </div>
           </div>
        </div>

        {/* Certifications Column */}
        <div className="space-y-6">
           <div className="flex items-center space-x-3 mb-6">
             <div className="w-1 h-8 bg-purple-500"></div>
             <h3 className="font-heading text-2xl text-white uppercase tracking-wider">Certifications</h3>
           </div>

           <div className="grid gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start p-4 bg-cyber-gray/20 border-l-2 border-purple-500/50 hover:border-neon-blue hover:bg-cyber-gray/40 transition-all duration-300">
                  <div className="mr-4 mt-1 text-neon-blue">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  </div>
                  <span className="text-gray-300 font-sans text-sm">{cert}</span>
                </div>
              ))}
           </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default Education;