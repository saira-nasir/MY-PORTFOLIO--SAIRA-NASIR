import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ResumeModal from './components/ResumeModal';
import SideNavigation from './components/SideNavigation';
import { SoundProvider } from './contexts/SoundContext';

const App: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <SoundProvider>
      <div className="bg-cyber-black text-white font-sans antialiased min-h-screen selection:bg-neon-blue selection:text-black relative">
        <Header />
        <SideNavigation />
        <main>
          <Hero />
          <About onOpenResume={() => setIsResumeOpen(true)} />
          <Skills />
          <Experience />
          <Education />
          <Projects />
        </main>
        <Contact />
        
        {/* Modal Overlay */}
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </div>
    </SoundProvider>
  );
};

export default App;