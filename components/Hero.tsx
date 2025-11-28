import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        if (!canvas) {
            this.x = 0;
            this.y = 0;
        } else {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
        this.size = Math.random() * 1.5 + 0.5; // Small, digital squares
        this.speedX = (Math.random() - 0.5) * 0.3; // Very slow drift
        this.speedY = (Math.random() - 0.5) * 0.3;
        
        // Cyberpunk palette: mostly cyan/blue with varying alpha
        const colors = [
            'rgba(0, 243, 255, 0.4)', 
            'rgba(0, 243, 255, 0.2)', 
            'rgba(188, 19, 254, 0.3)', // Occasional purple
            'rgba(255, 255, 255, 0.1)'
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (!canvas) return;
        this.x += this.speedX;
        this.y += this.speedY;

        // Subtle Mouse Interaction (Repulsion)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200; // Increased radius from 150

        if (distance < maxDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (maxDistance - distance) / maxDistance;
            
            // Stronger reaction force
            const directionX = forceDirectionX * force * 3; // Increased force from 0.5
            const directionY = forceDirectionY * force * 3;

            this.x -= directionX;
            this.y -= directionY;
        }

        // Wrap around screen edges
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        // Draw squares for digital look
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    const initParticles = () => {
      particles = [];
      if (!canvas) return;
      // Adjust density based on screen size
      const numberOfParticles = Math.min((canvas.width * canvas.height) / 12000, 100); 
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
        if (!ctx) return;
        const maxDistance = 120;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.beginPath();
                    // Alpha fades with distance
                    const opacity = 1 - (distance / maxDistance);
                    // Very subtle connection lines
                    ctx.strokeStyle = `rgba(0, 243, 255, ${opacity * 0.1})`; 
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    // Initialize
    resize();
    animate();

    // Event Listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex items-center bg-cyber-black pt-20 pb-10 md:py-0">
      
      {/* Background Canvas Effect */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0 opacity-50 pointer-events-none"
      />

      {/* Background Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none z-0"></div>
      
      {/* Central Light Beam */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-16 md:w-32 h-full bg-gradient-to-b from-neon-blue/40 via-neon-blue/5 to-transparent blur-xl animate-beam z-0 pointer-events-none"></div>
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-2 h-full bg-white/20 z-0 pointer-events-none"></div>

      {/* Floating Particles/Debris */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 border border-neon-blue/30 rotate-45 animate-float delay-100 z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-8 h-8 border border-white/10 rotate-12 animate-float delay-700 z-10 pointer-events-none"></div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 relative z-30 grid grid-cols-1 md:grid-cols-12 h-full items-center gap-10 md:gap-0">
        
        {/* Left Text Content */}
        <div className="md:col-span-6 flex flex-col justify-center order-2 md:order-1 relative z-40">
          <div className="animate-fade-in-down">
             <div className="inline-block bg-neon-blue/10 border border-neon-blue/50 px-3 py-1 mb-4 rounded-sm">
                <span className="text-neon-blue font-sans font-bold tracking-[0.2em] text-sm uppercase">Portfolio v2.0</span>
             </div>
          </div>

          <h1 className="font-heading font-black text-6xl sm:text-7xl lg:text-9xl leading-[0.85] tracking-tighter text-white uppercase mix-blend-screen mb-4">
            <div className="block animate-fade-in-up animate-glitch-subtle" style={{animationDelay: '0.1s'}}>Saira</div>
            <div className="block text-transparent stroke-text animate-fade-in-up animate-neon-pulse" style={{ WebkitTextStroke: '2px #00f3ff', animationDelay: '0.2s', color: 'transparent' }}>Nasir</div>
          </h1>

          <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
             <div className="flex items-center space-x-4 mb-8">
                <div className="h-[2px] w-12 bg-neon-purple shadow-[0_0_10px_#bc13fe]"></div>
                <h2 className="font-heading text-xl md:text-2xl text-gray-300 tracking-[0.3em] uppercase">
                  Full Stack Developer
                </h2>
             </div>
             
             {/* Contact / Social Buttons */}
             <div className="flex flex-wrap gap-4 relative z-50">
               <a href="https://www.linkedin.com/in/sairanasir10" target="_blank" rel="noreferrer" className="group cursor-pointer relative bg-cyber-black/50 backdrop-blur-sm border border-white/20 px-6 py-3 overflow-hidden hover:border-neon-blue transition-all duration-300">
                  <div className="absolute inset-0 bg-neon-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <div className="flex items-center gap-3 relative z-10">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-neon-blue transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    <span className="text-sm font-heading font-bold uppercase tracking-wider text-white group-hover:text-neon-blue">LinkedIn</span>
                  </div>
               </a>
               
               <a href="https://github.com/saira-nasir" target="_blank" rel="noreferrer" className="group cursor-pointer relative bg-cyber-black/50 backdrop-blur-sm border border-white/20 px-6 py-3 overflow-hidden hover:border-neon-blue transition-all duration-300">
                  <div className="absolute inset-0 bg-neon-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <div className="flex items-center gap-3 relative z-10">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-neon-blue transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    <span className="text-sm font-heading font-bold uppercase tracking-wider text-white group-hover:text-neon-blue">GitHub</span>
                  </div>
               </a>

               <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sairanasir10014@gmail.com" target="_blank" rel="noopener noreferrer" className="group cursor-pointer relative bg-cyber-black/50 backdrop-blur-sm border border-white/20 px-6 py-3 overflow-hidden hover:border-neon-blue transition-all duration-300">
                  <div className="absolute inset-0 bg-neon-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <div className="flex items-center gap-3 relative z-10">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-neon-blue transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-11.179l4.623 5.467zm-4.488-6.353h19.728l-9.864 11.666-9.864-11.666zm5.176 6.115l5.689 6.728 5.689-6.728 4.393 5.308h-20.165l4.394-5.308zm11.066 1.813l4.623-5.467v11.179l-4.623-5.712z"/></svg>
                    <span className="text-sm font-heading font-bold uppercase tracking-wider text-white group-hover:text-neon-blue">Email</span>
                  </div>
               </a>

               <a href="tel:+923215914252" className="group cursor-pointer relative bg-cyber-black/50 backdrop-blur-sm border border-white/20 px-6 py-3 overflow-hidden hover:border-neon-blue transition-all duration-300">
                  <div className="absolute inset-0 bg-neon-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <div className="flex items-center gap-3 relative z-10">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-neon-blue transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.033 2.11-1.033z"/></svg>
                    <span className="text-sm font-heading font-bold uppercase tracking-wider text-white group-hover:text-neon-blue">Call</span>
                  </div>
               </a>
             </div>
          </div>
        </div>

        {/* Center/Right Image & Halo */}
        <div className="md:col-span-6 relative flex justify-center items-center order-1 md:order-2">
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] flex items-center justify-center">
            {/* Glowing Halo Rings */}
            <div className="absolute inset-0 rounded-full border-2 border-neon-blue/30 shadow-[0_0_50px_rgba(0,243,255,0.2)] animate-pulse-glow z-0"></div>
            <div className="absolute inset-4 rounded-full border border-white/10 animate-spin-slow z-0 dashed-border"></div>
            <div className="absolute inset-10 rounded-full border border-neon-purple/20 animate-spin-slow z-0" style={{animationDirection: 'reverse'}}></div>

            {/* Character Image */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1633511090164-b43840ea1607?q=80&w=1000&auto=format&fit=crop" 
                alt="Cyberpunk Avatar" 
                className="w-[85%] h-[85%] object-contain drop-shadow-[0_0_30px_rgba(0,243,255,0.5)] mask-image-gradient"
                style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
              />
              
              {/* Overlay Glitch/Tech Elements - Updated for Visibility */}
              <div className="absolute bottom-4 -right-4 md:bottom-10 md:right-0 bg-cyber-black/90 border border-neon-blue p-4 max-w-[200px] shadow-[0_0_20px_rgba(0,243,255,0.15)] animate-fade-in-up delay-700 hidden sm:block">
                 <div className="flex items-center gap-2 mb-2">
                   <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full"></div>
                   <span className="text-[10px] text-green-400 font-mono tracking-wider">AVAILABLE FOR HIRE</span>
                 </div>
                 <div className="h-[1px] w-full bg-gray-700 mb-2"></div>
                 <div className="font-heading text-white text-xs uppercase mb-1 tracking-wider">Status: Online</div>
                 <div className="font-mono text-neon-blue text-[10px]">LOC: Lahore, PK</div>
                 
                 {/* Decorative Corner */}
                 <div className="absolute -top-1 -right-1 w-2 h-2 bg-neon-blue"></div>
                 <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-neon-blue"></div>
              </div>
           </div>
          </div>
        </div>
      </div>

      {/* Decorative Text Bottom Right */}
      <div className="absolute bottom-4 right-6 hidden md:block z-20 pointer-events-none">
        <p className="text-gray-600 text-[10px] font-mono tracking-[0.5em] uppercase opacity-50">
          System.Init(v2.0) // Saira_Nasir
        </p>
      </div>

    </section>
  );
};

export default Hero;