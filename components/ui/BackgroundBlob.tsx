"use client";

import React from 'react';

interface BackgroundBlobProps {
  color?: 'blue' | 'yellow' | 'blue-yellow';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  blur?: number;
  animate?: boolean;
  className?: string;
}

export const BackgroundBlob: React.FC<BackgroundBlobProps> = ({
  color = 'blue',
  position = 'top-right',
  size = 'lg',
  opacity = 0.2,
  blur,
  animate = false,
  className = '',
}) => {
  const sizes = {
    sm: 'w-[300px] h-[300px]',
    md: 'w-[500px] h-[500px]',
    lg: 'w-[800px] h-[800px]',
    xl: 'w-[1000px] h-[1000px]',
  };

  const positions = {
    'top-left': 'top-[-10%] left-[-10%]',
    'top-right': 'top-[-10%] right-[-10%]',
    'bottom-left': 'bottom-[-10%] left-[-10%]',
    'bottom-right': 'bottom-[-10%] right-[-10%]',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const blurValues = {
    sm: blur || 100,
    md: blur || 120,
    lg: blur || 150,
    xl: blur || 200,
  };

  const colors = {
    blue: 'bg-brand-blue',
    yellow: 'bg-brand-yellow',
    'blue-yellow': 'bg-gradient-to-br from-brand-blue to-brand-yellow',
  };

  return (
    <div
      className={`absolute ${positions[position]} ${sizes[size]} ${colors[color]} rounded-full pointer-events-none ${animate ? 'animate-pulse-slow' : ''} ${className}`}
      style={{ 
        opacity,
        filter: `blur(${blurValues[size]}px)`
      }}
    />
  );
};

