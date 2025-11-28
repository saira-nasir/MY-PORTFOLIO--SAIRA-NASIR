import React, { useEffect, useRef } from 'react';

const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<{x: number, y: number}[]>([]);
  const mouseRef = useRef<{x: number, y: number} | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Only process if mouse has moved at least once
      if (mouseRef.current) {
        // Add current mouse position to trail
        trailRef.current.push({ ...mouseRef.current });
        
        // Limit trail length (adjust for longer/shorter trail)
        if (trailRef.current.length > 25) {
          trailRef.current.shift();
        }

        // Draw trail
        if (trailRef.current.length > 1) {
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          
          // Draw segments with increasing opacity/width
          for (let i = 1; i < trailRef.current.length; i++) {
            const point = trailRef.current[i];
            const prevPoint = trailRef.current[i - 1];
            
            // Calculate ratio (0 to 1) along the trail
            const ratio = i / trailRef.current.length;
            
            ctx.beginPath();
            ctx.moveTo(prevPoint.x, prevPoint.y);
            ctx.lineTo(point.x, point.y);
            
            // Tapering width and fading opacity
            ctx.lineWidth = ratio * 8; // Max width
            ctx.strokeStyle = `rgba(0, 243, 255, ${ratio})`; // Neon blue with fade
            
            // Add Glow
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00f3ff';
            
            ctx.stroke();
          }
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[9999] mix-blend-screen"
    />
  );
};

export default CursorTrail;