import React, { useRef, useState } from 'react';
import SectionWrapper from './SectionWrapper';

interface SkillBadgeProps {
  name: string;
  icon: React.ReactNode;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name, icon }) => (
  <div className="flex items-center space-x-3 bg-black/40 border border-gray-800 p-3 rounded hover:border-neon-blue hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all duration-300 group relative z-10">
    <div className="text-gray-400 group-hover:text-neon-blue transition-colors duration-300 w-6 h-6">{icon}</div>
    <span className="text-gray-300 font-heading tracking-wide text-sm">{name}</span>
  </div>
);

interface SkillCategoryProps {
  title: string;
  skills: { name: string; icon: React.ReactNode }[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    setIsHovering(true);
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate 3D rotation based on mouse position
    // X rotation controls up/down tilt (inverted Y pos)
    // Y rotation controls left/right tilt (X pos)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 8; // Max 8 degrees tilt
    const rotateX = ((centerY - y) / centerY) * 8;
    
    setRotation({ x: rotateX, y: rotateY });
    setBgPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
    setBgPos({ x: 50, y: 50 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-cyber-gray/50 backdrop-blur-sm p-6 border-t-2 border-gray-700 hover:border-neon-blue relative group rounded-sm"
      style={{ 
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovering ? 1.02 : 1}, ${isHovering ? 1.02 : 1}, 1)`,
        transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {/* Holographic Sheen Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 rounded-sm"
        style={{
          background: `radial-gradient(circle at ${bgPos.x}% ${bgPos.y}%, rgba(0, 243, 255, 0.1), transparent 60%)`,
          opacity: isHovering ? 1 : 0,
          mixBlendMode: 'screen'
        }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-sm"></div>

      <div className="absolute -top-3 left-4 bg-cyber-black px-2 text-neon-blue font-heading text-xs tracking-widest uppercase border border-gray-800 group-hover:border-neon-blue transition-colors z-20">
        {title}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 relative z-10 transform-style-3d">
        {skills.map((skill) => (
          <SkillBadge key={skill.name} name={skill.name} icon={skill.icon} />
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const skillsData = {
    frontend: [
      { name: 'React', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M368.5 240.2c-1.3-3.4-2.8-6.7-4.2-10.2-8.3-20-13.2-41.2-13.2-63.3 0-63.5 40.1-118.5 96.7-142.7-6.2-2.1-12.5-3.9-19-5.4C345.2-4.4 256 31.5 256 123.3c0 15.1 2.2 29.8 6.3 43.8 2.6 8.9 5.7 17.6 9.4 25.9-3.8 1.9-7.7 3.8-11.5 5.9-52.9 28.5-88.3 84.1-88.3 149.3 0 9.8 1 19.5 2.8 28.9-8.6-2.4-17.5-3.8-26.6-3.8-63.5 0-118.5 40.1-142.7 96.7 2.1 6.2 3.9 12.5 5.4 19C74.8 488.4 164 452.5 164 360.7c0-15.1-2.2-29.8-6.3-43.8-2.6-8.9-5.7-17.6-9.4-25.9 3.8-1.9 7.7-3.8 11.5-5.9 52.9-28.5 88.3-84.1 88.3-149.3 0-9.8-1-19.5-2.8-28.9 8.6 2.4 17.5 3.8 26.6 3.8 63.5 0 118.5-40.1 142.7-96.7zM256 295.2c-20.1 0-38.1-8.9-50.1-23.2-1.9-2.2-3.7-4.5-5.4-6.9-28.2-39.6-18.9-94.8 20.7-123s94.8-18.9 123 20.7c1.9 2.2 3.7 4.5 5.4 6.9 28.2 39.6 18.9 94.8-20.7 123-14.8 17.5-36.2 28.2-58.5 28.2-1.6 0-3.2 0-4.8-.1z"/></svg> },
      { name: 'Next.js', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M256 64C150 64 64 150 64 256s86 192 192 192c9.4 0 17.7-3.8 23.8-10.2l128-128c6.4-6.4 10.2-15.4 10.2-25.8V192c0-17.7-14.3-32-32-32s-32 14.3-32 32v29.4l-90.4 90.4-32-32 108.8-108.8c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 256l-32 32 90.4 90.4L160 468.8V64h96z"/></svg> },
      { name: 'TypeScript', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M32 32C14.3 32 0 46.3 0 64v384c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H32zM214.3 259.7c-3.4 9.1-8.2 16.3-14.5 21.9s-14.2 8.4-23.5 8.4c-11.8 0-21.7-4.2-29.6-12.7s-11.8-20.2-11.8-35.1V169.2h28.1v73.2c0 10.2 2.3 17.7 6.9 22.4s11.1 7.1 19.4 7.1c8.5 0 15.1-2.6 20-7.8s7.9-12.4 8.8-21.6l4.1-33.3h27.3L214.3 259.7zM348.1 292c-12.6 11.2-28.5 16.8-47.7 16.8-25.4 0-46-8.8-61.9-26.3s-23.8-40-23.8-67.2c0-28.2 8.2-51.2 24.6-69s37.9-26.6 64.4-26.6c17.5 0 32.5 4.5 44.9 13.4s20.6 21.3 24.4 37.1h-28.4c-2.4-8.8-6.8-15.7-13.4-20.7s-14.7-7.5-24.4-7.5c-14.4 0-26.3 5.4-35.7 16.1s-14.1 25.5-14.1 44.3c0 19.3 4.7 34.5 14.2 45.6s21.5 16.6 36.1 16.6c10.2 0 19-2.3 26.5-7s12.5-11.2 15.2-19.8h28.3c-4.4 16.8-13.2 30.5-26.4 41.2z"/></svg> },
      { name: 'Tailwind CSS', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor"><path d="M320 320c-52.5 0-95.1-42.9-95.1-96s42.5-96 95.1-96c28.2 0 54.5 12.5 72.8 33.4c-13.8 11.6-25.5 25.5-34.9 41.2c-2.4 4-4.7 8.1-7 12.4c-25.3 47.9-74.9 69-122.5 49.3c-2.3-1-4.6-2-6.9-3.1c-16.3-7.5-28.5-23.9-28.5-42.3s12.2-34.8 28.5-42.3c3.1-1.4 6.3-2.7 9.5-3.9c.7-.2 1.5-.5 2.2-.7c24.2-7.5 50.9-2.2 68.8 15.8c11.6-13.8 25.5-25.5 41.2-34.9c4-2.4 8.1-4.7 12.4-7c47.9-25.3 69-74.9 49.3-122.5c-1-2.3-2-4.6-3.1-6.9C433.1 55.4 379.2 32 320 32c-52.5 0-95.1 42.9-95.1 96s42.5 96 95.1 96c28.2 0 54.5-12.5 72.8-33.4c-13.8-11.6-25.5-25.5-34.9-41.2c-2.4-4-4.7-8.1-7-12.4c-25.3-47.9-74.9-69-122.5-49.3c-2.3 1-4.6 2-6.9 3.1c-16.3 7.5-28.5 23.9-28.5 42.3s12.2 34.8 28.5 42.3c3.1 1.4 6.3 2.7 9.5 3.9c.7 .2 1.5 .5 2.2 .7c24.2 7.5 50.9 2.2 68.8-15.8c11.6 13.8 25.5 25.5 41.2 34.9c4 2.4 8.1 4.7 12.4 7c47.9 25.3 69 74.9 49.3 122.5c-1 2.3-2 4.6-3.1 6.9c-17.6 37.5-54 62.1-95.4 62.1zm0 64c-87.5 0-159.1-71.3-159.1-160S232.5 64 320 64s159.1 71.3 159.1 160s-71.6 160-159.1 160z"/></svg> },
      { name: 'HTML', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor"><path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.3H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.4z"/></svg> },
      { name: 'CSS', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor"><path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm308.2 127.3l-2.8 34.9H105.9l4.1 49.4h193l-4.1 49.4H114.1l4.1 49.4h183.9l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7l3 35.6 53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.4z"/></svg> },
      { name: 'JavaScript', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-62.9-38.6l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43.l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-12.6-19.5-33.7-28.3-21-8.7-49-17-49-51.5 0-27.4 22.3-48.6 58.9-48.6 29.2 0 48.2 11.4 61.1 35.4l-34.3 20.1c-7.2-12-15-18-27.1-18-12.3 0-20.1 6.3-20.1 18 0 12.6 7.8 17.7 29.5 26.2 28 11.4 53.2 23.5 53.2 55.4 0 31.8-24.2 51.2-66.7 51.2z"/></svg> },
    ],
    backend: [
      { name: 'Django', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 381.1 512" fill="currentColor"><path d="M372.4 203.4C378.8 197 381.1 189 381.1 180.2c0-12.3-3.9-22.6-11.7-30.7 -7.8-8.2-17.8-12.2-30.1-12.2 -11.1 0-21.2 3.3-30.1 10.1l-34.3 25.9c-2.3 1.6-4.2 3.3-5.7 5.1 -1.5 1.8-2.8 3.5-3.8 5.1 -6.8 10.8-10.2 22.9-10.2 36.3 0 13.7 3.4 25.9 10.2 36.6 1.1 1.6 2.5 3.3 4.2 5.1 1.7 1.8 3.5 3.5 5.7 5.1l34.3 25.9c8.9 6.8 19 10.2 30.1 10.2 12.3 0 22.3-4.1 30.1-12.2 7.8-8.2 11.7-18.4 11.7-30.7 0-8.8-2.3-16.8-8.7-23.2zM245.5 289.3c-28.3 0-51.5-9.3-69.6-28 -18.1-18.7-27.2-43.1-27.2-73.3 0-30.2 9.1-54.6 27.2-73.3 18.1-18.7 41.3-28 69.6-28 10.1 0 19.8 1.4 29.2 4.2V0H0v512h274.7v-87.1c-9.4 2.8-19.1 4.2-29.2 4.2z"/></svg> },
      { name: 'PostgreSQL', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M256 32v160c0 13.3-10.7 24-24 24s-24-10.7-24-24V32h-32v160c0 30.9 25.1 56 56 56s56-25.1 56-56V32h-32zm64 248c0-54.6-35.3-101-83.2-114.9-3.7-1.1-7.5 1.2-8.6 4.9s1.2 7.5 4.9 8.6C275.4 186.2 304 227.6 304 272c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-48.5 39.5-88 88-88h8v-32h-8c-66.3 0-120 53.7-120 120s53.7 120 120 120 120-53.7 120-120zm128-48c0 66.3-53.7 120-120 120s-120-53.7-120-120 53.7-120 120-120 120 53.7 120 120zm-32 0c0-48.5-39.5-88-88-88s-88 39.5-88 88 39.5 88 88 88 88-39.5 88-88zM48 32v160c0 13.3-10.7 24-24 24S0 205.3 0 192V32h48z"/></svg> },
      { name: 'MySQL', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M224 320c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm0-160c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm0-160C100.3 0 0 100.3 0 224s100.3 224 224 224 224-100.3 224-224S347.7 0 224 0zm0 416c-106.1 0-192-85.9-192-192S117.9 32 224 32s192 85.9 192 192-85.9 192-192 192z"/></svg> },
      { name: 'PGAdmin4', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm0 416c-106.1 0-192-85.9-192-192S149.9 64 256 64s192 85.9 192 192-85.9 192-192 192zm-64-288v192h-32V160h32zm96 0v192h-32V160h32z"/></svg> },
    ],
    cms: [
      { name: 'WordPress', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zM112 256c0-79.5 64.5-144 144-144s144 64.5 144 144-64.5 144-144 144-144-64.5-144-144z"/></svg> },
    ]
  };

  return (
    <SectionWrapper id="skills" title="System Capabilities">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SkillCategory title="Frontend / Modern Stack" skills={skillsData.frontend} />
        <SkillCategory title="Backend / Database" skills={skillsData.backend} />
        <SkillCategory title="CMS / Specialty" skills={skillsData.cms} />
      </div>
    </SectionWrapper>
  );
};

export default Skills;