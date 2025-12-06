import { ReactNode, useRef, useState } from "react";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
  }
  

interface MousePosition {
    x: number;
    y: number;
  }
  
export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = "", onClick }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
   
   
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.35;
      const y = (clientY - (top + height / 2)) * 0.35;
      setPosition({ x, y });
    };
   
   
    const handleMouseLeave = () => setPosition({ x: 0, y: 0 });
   
   
    return (
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        className={`relative overflow-hidden transition-transform duration-200 ease-out ${className}`}
      >
        {children}
      </button>
    );
   };
   