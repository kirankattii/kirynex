"use client";

import React, { ReactNode } from 'react';
import { useOnScreen } from '@/hooks/useOnScreen';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const getTransform = () => {
    switch (direction) {
      case 'down':
        return isVisible ? 'translateY(0)' : 'translateY(-12px)';
      case 'left':
        return isVisible ? 'translateX(0)' : 'translateX(-12px)';
      case 'right':
        return isVisible ? 'translateX(0)' : 'translateX(12px)';
      case 'none':
        return 'none';
      default:
        return isVisible ? 'translateY(0)' : 'translateY(12px)';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
      }}
      className={`transition-all duration-500 ease-[0.16,1,0.3,1] ${className}`}
    >
      {children}
    </div>
  );
};

