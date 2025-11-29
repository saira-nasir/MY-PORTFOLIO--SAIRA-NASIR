import React, { useState, useEffect, useRef } from 'react';

interface DecryptTextProps {
  text: string;
  className?: string;
  revealSpeed?: number;
  intervalSpeed?: number;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+~`|}{[]:;?><,./-=';

const DecryptText: React.FC<DecryptTextProps> = ({ 
  text, 
  className = '', 
  revealSpeed = 0.3, // Lower is slower reveal
  intervalSpeed = 30 // ms between updates
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += revealSpeed;
    }, intervalSpeed);

    return () => clearInterval(interval);
  }, [hasStarted, text, revealSpeed, intervalSpeed]);

  return (
    <span ref={elementRef} className={`${className} inline-block`}>
      {displayText}
    </span>
  );
};

export default DecryptText;