import React from 'react';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-cyber-black py-20 border-t border-gray-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-1 bg-neon-blue shadow-[0_0_50px_rgba(0,243,255,0.4)]"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8 tracking-wider uppercase">
          Establish <span className="text-neon-blue">Uplink</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-12 font-sans text-lg">
          Currently scanning for new opportunities and collaborations. Initialize contact protocol to connect.
        </p>
        
        <a 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=sairanasir10014@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block group"
          aria-label="Email Saira Nasir"
        >
          <div className="absolute inset-0 bg-neon-blue blur opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300"></div>
          <div className="relative bg-black border border-neon-blue text-neon-blue px-10 py-4 font-heading font-bold tracking-widest uppercase hover:bg-neon-blue hover:text-black transition-all duration-300">
            sairanasir10014@gmail.com
          </div>
        </a>

        <div className="flex justify-center space-x-8 mt-16 mb-12">
          <a 
            href="https://www.linkedin.com/in/sairanasir10" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-neon-blue transition-colors duration-300 transform hover:scale-110"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.29 20h2.42V10.7H8.29V20zM9.5 9.18c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM20 20h-2.42v-4.6c0-1.1-.02-2.52-1.53-2.52-1.54 0-1.78 1.2-1.78 2.44V20h-2.42V10.7h2.3v1.06h.03c.32-.6 1.1-1.22 2.27-1.22 2.43 0 2.87 1.6 2.87 3.68V20z" clipRule="evenodd" />
            </svg>
            <span className="sr-only">LinkedIn</span>
          </a>

          <a 
            href="https://github.com/saira-nasir" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-neon-blue transition-colors duration-300 transform hover:scale-110"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="sr-only">GitHub</span>
          </a>
        </div>
        
        <div className="text-gray-600 text-xs font-heading tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Saira Nasir // System Operational
        </div>
      </div>
    </footer>
  );
};

export default Contact;