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

  // Helper to get raw GitHub URL with cache buster
  const getImg = (name: string) => `https://raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Screenshots/${name}?v=${new Date().getTime()}`;

  const projectData: ProjectData[] = [
    {
      title: "Employee Mgmt System",
      description: "A comprehensive Windows Forms application for managing employee data, salaries, and user authentication with SQL Server.",
      link: "https://github.com/saira-nasir/EmployeeManagementSystem",
      tags: ["C#", ".NET", "SQL Server", "WinForms"],
      // Pointing to Dashboard image in Screenshots folder
      images: [getImg("Dashboard.png")],
      readmeContent: (
        <div className="space-y-8 font-sans">
          {/* About Section */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">System Overview</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The <strong>Employee Management System</strong> is a full-featured desktop application engineered to streamline HR operations. It acts as a centralized hub for managing employee lifecycles—from onboarding and data management to payroll calculation and secure access control.
            </p>
          </section>

          {/* Tech Stack */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neon-blue">🛠</span> Tech Stack
            </h3>
            <div className="overflow-hidden rounded-lg border border-gray-700">
              <table className="w-full text-left border-collapse bg-gray-900/50">
                <thead>
                  <tr className="bg-gray-800 text-gray-200">
                    <th className="p-4 border-b border-gray-700 font-mono text-sm uppercase tracking-wider">Layer</th>
                    <th className="p-4 border-b border-gray-700 font-mono text-sm uppercase tracking-wider">Technology</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400 text-sm">
                  <tr><td className="p-4 border-b border-gray-800">Frontend</td><td className="p-4 border-b border-gray-800">Windows Forms (.NET Framework)</td></tr>
                  <tr><td className="p-4 border-b border-gray-800">Backend</td><td className="p-4 border-b border-gray-800">SQL Server (T-SQL)</td></tr>
                  <tr><td className="p-4 border-b border-gray-800">IDE</td><td className="p-4 border-b border-gray-800">Visual Studio 2022</td></tr>
                  <tr><td className="p-4 border-b border-gray-800">Language</td><td className="p-4 border-b border-gray-800">C#</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* User Journey / Screenshots Gallery */}
          <section>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-neon-blue">📸</span> User Journey Walkthrough
            </h3>
            
            <div className="space-y-12">
              {/* 1. Authentication */}
              <div>
                 <h4 className="text-sm font-bold text-neon-blue uppercase tracking-widest mb-4 border-l-4 border-neon-blue pl-3">
                   01. Authentication & Security
                 </h4>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg group">
                       <div className="overflow-hidden rounded bg-black relative">
                         <img 
                           src={getImg("Login.png")}
                           alt="Login Screen" 
                           className="w-full h-auto hover:scale-105 transition-transform duration-500" 
                           onError={(e) => {
                             // Fallback to checking root if Screenshots folder fails
                             const target = e.currentTarget;
                             if (!target.src.includes('raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Login.png')) {
                                target.src = 'https://raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Login.png';
                             }
                           }}
                         />
                       </div>
                       <p className="text-xs text-center mt-3 text-gray-400 font-mono">Secure Admin Login</p>
                    </div>
                    <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg group">
                       <div className="overflow-hidden rounded bg-black relative">
                         <img 
                           src={getImg("Signup.png")}
                           alt="Register Screen" 
                           className="w-full h-auto hover:scale-105 transition-transform duration-500" 
                           onError={(e) => {
                             const target = e.currentTarget;
                             if (!target.src.includes('raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Signup.png')) {
                                target.src = 'https://raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Signup.png';
                             }
                           }}
                         />
                       </div>
                       <p className="text-xs text-center mt-3 text-gray-400 font-mono">Admin Registration</p>
                    </div>
                 </div>
              </div>

              {/* 2. Dashboard */}
              <div>
                <h4 className="text-sm font-bold text-neon-blue uppercase tracking-widest mb-4 border-l-4 border-neon-blue pl-3">
                   02. Analytics Dashboard
                </h4>
                <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
                  <img 
                    src={getImg("Dashboard.png")}
                    alt="Main Dashboard" 
                    className="w-full rounded" 
                    onError={(e) => {
                       const target = e.currentTarget;
                       if (!target.src.includes('raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Dashboard.png')) {
                          target.src = 'https://raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Dashboard.png';
                       }
                    }}
                  />
                  <p className="text-xs text-center mt-3 text-gray-400 font-mono">Real-time status overview of the organization</p>
                </div>
              </div>

               {/* 3. Employee Management */}
               <div>
                <h4 className="text-sm font-bold text-neon-blue uppercase tracking-widest mb-4 border-l-4 border-neon-blue pl-3">
                   03. Employee Management
                </h4>
                <div className="grid gap-6">
                   <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
                      <img 
                        src={getImg("EmployeeData.png")}
                        alt="Employee Data Grid" 
                        className="w-full rounded" 
                         onError={(e) => {
                           const target = e.currentTarget;
                           if (!target.src.includes('raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/EmployeeData.png')) {
                              target.src = 'https://raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/EmployeeData.png';
                           }
                        }}
                      />
                      <p className="text-xs text-center mt-3 text-gray-400 font-mono">Centralized Employee Database Grid</p>
                   </div>
                   <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
                      <img 
                        src={getImg("AddEmployee.png")}
                        alt="Add Employee Form" 
                        className="w-full rounded" 
                         onError={(e) => {
                           const target = e.currentTarget;
                           if (!target.src.includes('raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/AddEmployee.png')) {
                              target.src = 'https://raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/AddEmployee.png';
                           }
                        }}
                      />
                      <p className="text-xs text-center mt-3 text-gray-400 font-mono">Detailed Entry Form with Image Upload</p>
                   </div>
                   <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
                      <img 
                        src={getImg("Salary.png")}
                        alt="Salary Panel" 
                        className="w-full rounded" 
                         onError={(e) => {
                           const target = e.currentTarget;
                           if (!target.src.includes('raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Salary.png')) {
                              target.src = 'https://raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Salary.png';
                           }
                        }}
                      />
                      <p className="text-xs text-center mt-3 text-gray-400 font-mono">Payroll & Salary Management</p>
                   </div>
                </div>
              </div>

              {/* 4. Feedback & Dialogs */}
              <div>
                <h4 className="text-sm font-bold text-neon-blue uppercase tracking-widest mb-4 border-l-4 border-neon-blue pl-3">
                   04. System Feedback & Dialogs
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
                      <img 
                        src={getImg("Success.png")}
                        alt="Success Dialog" 
                        className="w-full rounded" 
                         onError={(e) => {
                           const target = e.currentTarget;
                           if (!target.src.includes('raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Success.png')) {
                              target.src = 'https://raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Success.png';
                           }
                        }}
                      />
                      <p className="text-xs text-center mt-3 text-green-400 font-mono">Operation Success Confirmation</p>
                   </div>
                   <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
                      <img 
                        src={getImg("Delete.png")}
                        alt="Delete Dialog" 
                        className="w-full rounded" 
                         onError={(e) => {
                           const target = e.currentTarget;
                           if (!target.src.includes('raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Delete.png')) {
                              target.src = 'https://raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Delete.png';
                           }
                        }}
                      />
                      <p className="text-xs text-center mt-3 text-red-400 font-mono">Secure Deletion Protocol</p>
                   </div>
                   <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg md:col-span-2">
                      <img 
                        src={getImg("Logout.png")}
                        alt="Logout Dialog" 
                        className="w-full rounded" 
                         onError={(e) => {
                           const target = e.currentTarget;
                           if (!target.src.includes('raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Logout.png')) {
                              target.src = 'https://raw.githubusercontent.com/saira-nasir/EmployeeManagementSystem/main/Logout.png';
                           }
                        }}
                      />
                      <p className="text-xs text-center mt-3 text-blue-400 font-mono">Session Termination</p>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* Project Structure */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neon-blue">📂</span> Architecture
            </h3>
            <div className="bg-[#0d1117] p-5 rounded-lg border border-gray-700 font-mono text-sm overflow-x-auto shadow-inner">
              <pre className="text-green-400 leading-relaxed">{`EmployeeManagementSystem/
├── Forms/
│   ├── Login.cs          # Secure User Authentication
│   ├── Signup.cs         # New Admin Registration
│   ├── Dashboard.cs      # Main Analytics View
│   └── Salary.cs         # Payroll Calculation Logic
├── Assets/               # Icons and UI Resources
├── Database/
│   └── Schema.sql        # Database initialization scripts
├── Screenshots/          # Project Images
└── EmployeeSystem.sln    # Visual Studio Solution`}</pre>
            </div>
          </section>

        </div>
      )
    },
    {
      title: "E-commerce PWA",
      description: "A high-performance Progressive Web App utilizing server-side rendering, built on Next.js, TypeScript, and Tailwind CSS.",
      link: "https://drive.google.com/drive/folders/1TIigM0uyzb62q6GSewtvsctl5LUo57Lq?usp=sharing",
      tags: ["Next.js", "TypeScript", "PWA", "Tailwind"],
      images: ["https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop"],
      readmeContent: (
        <div className="space-y-6 text-gray-300">
           <h3 className="text-xl font-bold text-white">Project Overview</h3>
           <p>A fully featured Progressive Web App (PWA) designed for modern e-commerce. It features server-side rendering for optimal SEO and performance, a custom cart and checkout flow, and offline capabilities.</p>
           <h3 className="text-xl font-bold text-white mt-6">Key Features</h3>
           <ul className="list-disc list-inside space-y-2">
             <li>Server Side Rendering (SSR) for fast page loads.</li>
             <li>Offline support with Service Workers.</li>
             <li>Responsive Design using Tailwind CSS.</li>
           </ul>
        </div>
      )
    },
    {
      title: "Django API Core",
      description: "A robust and secure back-end API built with Python/Django, managing data with PostgreSQL.",
      link: "https://drive.google.com/drive/folders/1TIigM0uyzb62q6GSewtvsctl5LUo57Lq?usp=sharing",
      tags: ["Django", "PostgreSQL", "Docker", "Python"],
      images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"],
      readmeContent: (
        <div className="space-y-6 text-gray-300">
           <h3 className="text-xl font-bold text-white">System Architecture</h3>
           <p>A high-security, scalable backend architecture designed to support multiple client applications. This core API handles user authentication (JWT), complex data relationships using PostgreSQL, and is fully containerized with Docker for consistent deployment environments.</p>
           <h3 className="text-xl font-bold text-white mt-6">Technologies</h3>
           <ul className="list-disc list-inside space-y-2">
             <li>Django REST Framework</li>
             <li>PostgreSQL Database</li>
             <li>Docker & Docker Compose</li>
           </ul>
        </div>
      )
    },
    {
      title: "Headless CMS Arch",
      description: "Demonstrates expertise in decoupling WordPress as a Headless CMS, serving dynamic content to a React front-end.",
      link: "https://drive.google.com/drive/folders/1TIigM0uyzb62q6GSewtvsctl5LUo57Lq?usp=sharing",
      tags: ["React", "WordPress", "GraphQL", "Headless"],
      images: ["https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop"],
      readmeContent: (
        <div className="space-y-6 text-gray-300">
           <h3 className="text-xl font-bold text-white">Architecture</h3>
           <p>This project decouples the traditional WordPress monolith, using it purely as a content management API. The frontend is a custom-built, lightning-fast React application that queries content via GraphQL.</p>
           <p>This approach provides the content editing team with the familiar WordPress interface while delivering a modern, secure, and performant user experience.</p>
        </div>
      )
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