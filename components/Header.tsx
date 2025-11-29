import React, { useState, useEffect } from 'react';
import { useSound } from '../contexts/SoundContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSoundEnabled, toggleSound, playClick } = useSound();
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleScrollTo = (id: string) => {
    const elem = document.getElementById(id);
    elem?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-cyber-black/80 backdrop-blur-sm border-b border-white/5 transition-all duration-300">
        <div className="px-6 py-4 flex justify-between items-center mix-blend-screen">
          {/* Logo / Home Button */}
          <button 
            onClick={() => {
              playClick();
              handleScrollTo('home');
            }} 
            className="group focus:outline-none"
            aria-label="Scroll to top"
          >
            <div className="w-10 h-10 border border-white group-hover:border-neon-blue transition-colors duration-300 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-neon-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <svg className="w-4 h-4 text-white relative z-10 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>

          {/* Right Nav Controls */}
          <div className="flex items-center space-x-8 font-heading text-sm tracking-widest uppercase text-white">
            <button 
              onClick={toggleSound}
              className="hidden md:flex items-center space-x-2 hover:text-neon-blue transition-colors duration-300"
              title={isSoundEnabled ? "Disable Sound" : "Enable Sound FX"}
            >
              <span>Sound</span>
              <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isSoundEnabled ? 'bg-neon-blue animate-pulse shadow-[0_0_8px_#00f3ff]' : 'bg-gray-600'}`}></div>
            </button>

            <button 
              onClick={toggleMenu}
              className="flex items-center space-x-2 group cursor-pointer"
            >
              <span className="group-hover:text-neon-blue transition-colors duration-300">Menu</span>
              <div className={`w-3 h-3 border border-white transform rotate-45 group-hover:bg-neon-blue group-hover:border-neon-blue transition-all duration-300 ${isMenuOpen ? 'bg-white' : ''}`}></div>
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-neon-blue shadow-[0_0_10px_#00f3ff] transition-all duration-100 ease-out z-50" style={{ width: `${scrollProgress * 100}%` }}></div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-cyber-black/95 backdrop-blur-xl transition-all duration-500 ease-in-out flex flex-col items-center justify-center ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <nav className="flex flex-col space-y-8 text-center">
          {['About', 'Skills', 'Experience', 'Education', 'Projects', 'Contact'].map((item, idx) => (
            <button
              key={item}
              onClick={() => handleScrollTo(item.toLowerCase())}
              className="text-3xl md:text-5xl font-heading font-bold text-transparent stroke-text hover:text-neon-blue transition-all duration-300 transform hover:scale-110"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}
            >
              {item}
            </button>
          ))}
        </nav>
        
        {/* Decorative elements in menu */}
        <div className="absolute bottom-10 text-gray-500 font-sans text-sm tracking-widest">
          SYSTEM.NAV.V2.0 // SAIRA_NASIR
        </div>
      </div>
    </>
  );
};

export default Header;