import React from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-4xl h-[90vh] bg-white text-black shadow-2xl rounded-sm overflow-hidden flex flex-col animate-fade-in-up">
        {/* Header / Toolbar */}
        <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center shadow-md shrink-0">
          <div className="font-heading tracking-wider flex items-center gap-2">
            <svg className="w-5 h-5 text-neon-blue" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
            <span>SAIRA_NASIR_RESUME.pdf</span>
          </div>
          <button 
            onClick={onClose} 
            className="hover:bg-red-500/20 hover:text-red-500 p-2 rounded transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-grow overflow-y-auto p-8 sm:p-12 bg-white selection:bg-neon-blue selection:text-white">
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Header Section */}
            <div className="border-b-2 border-gray-800 pb-8 flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <h1 className="text-4xl font-bold uppercase tracking-tight text-gray-900 mb-2">Saira Nasir</h1>
                <p className="text-lg text-gray-600 font-medium">Certified WordPress Web Designer and Developer | FullStack Developer</p>
                <p className="text-gray-500 mt-1">BS Computer Science Student</p>
              </div>
              <div className="text-sm text-gray-600 space-y-1 md:text-right">
                <p>Lahore, Punjab, Pakistan</p>
                <p>+92 321 5914252</p>
                <p>sairanasir10014@gmail.com</p>
                <p>linkedin.com/in/sairanasir10</p>
              </div>
            </div>

            {/* Summary */}
            <section>
              <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Summary</h2>
              <p className="text-gray-700 leading-relaxed">
                A detail-oriented Computer Science student with hands-on experience in web development, UI/UX design, and WordPress development. Adept at delivering user-friendly solutions and eager to apply technical skills in a dynamic work environment. Passionate about learning and staying up-to-date with the latest technologies.
              </p>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Experience</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg">UI/UX Designer</h3>
                    <span className="text-sm text-gray-500">Jan 2025 - Present</span>
                  </div>
                  <div className="text-gray-700 font-medium">Cybernetics Innovations | Remote</div>
                  <p className="text-gray-600 mt-2 text-sm">Designing intuitive and futuristic user interfaces for cutting-edge tech projects.</p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg">Web Designer & Developer</h3>
                    <span className="text-sm text-gray-500">Aug 2024 - Sep 2024</span>
                  </div>
                  <div className="text-gray-700 font-medium">Tredential Marketing | Shekhūpura, Pakistan</div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg">WordPress Designer & Developer</h3>
                    <span className="text-sm text-gray-500">Mar 2024 - Apr 2024</span>
                  </div>
                  <div className="text-gray-700 font-medium">LWE | Pakistan</div>
                  <p className="text-gray-600 mt-2 text-sm">Worked as Intern with this esteemed EduCommerce institution.</p>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Projects</h2>
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-lg mb-1">E-commerce PWA</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">A high-performance Progressive Web App utilizing server-side rendering, built on Next.js, TypeScript, and Tailwind CSS for a seamless shopping experience.</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Django API Core</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">A robust and secure back-end API built with Python/Django, managing data with PostgreSQL and deployed using containerization for scalability.</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Headless CMS Arch</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">Demonstrates expertise in decoupling WordPress as a Headless CMS, serving dynamic content to a custom-built, modern React front-end application.</p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Education</h2>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg">Bachelor's Degree, Computer Science</h3>
                  <span className="text-sm text-gray-500">Feb 2024 - Feb 2026</span>
                </div>
                <div className="text-gray-700">COMSATS Institute of Information and Technology</div>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Skills</h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <span className="font-bold block mb-1">Web Development:</span>
                  HTML, CSS, JavaScript, React, WordPress
                </div>
                <div>
                  <span className="font-bold block mb-1">Programming:</span>
                  C++, Python
                </div>
                <div>
                  <span className="font-bold block mb-1">Design:</span>
                  Figma (UI/UX), Adobe Illustrator
                </div>
                <div>
                  <span className="font-bold block mb-1">General:</span>
                  Git, Microsoft Office, Freelancing
                </div>
              </div>
            </section>

             {/* Certifications */}
             <section>
              <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Certifications</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Adobe Certified Associate in Graphic Design & Illustration Using Adobe Illustrator</li>
                <li>Advanced Social Media Strategy Training and Certification</li>
                <li>WordPress Web Developer</li>
              </ul>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;