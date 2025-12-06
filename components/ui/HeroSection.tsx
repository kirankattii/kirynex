"use client";

import React, { ReactNode } from 'react';
import { BackgroundBlob } from './BackgroundBlob';

interface HeroSectionProps {
  children: ReactNode;
  className?: string;
  background?: 'dark' | 'light' | 'gradient';
  blobs?: Array<{
    color?: 'blue' | 'yellow' | 'blue-yellow';
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    opacity?: number;
    animate?: boolean;
  }>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  children,
  className = '',
  background = 'dark',
  blobs = [],
}) => {
  const backgrounds = {
    dark: 'bg-brand-dark text-white',
    light: 'bg-white text-brand-dark',
    gradient: 'bg-gradient-to-br from-brand-dark to-brand-blue text-white',
  };

  const defaultBlobs = blobs.length > 0 ? blobs : [
    { color: 'blue' as const, position: 'top-right' as const, size: 'lg' as const, opacity: 0.2, animate: true },
    { color: 'yellow' as const, position: 'bottom-left' as const, size: 'md' as const, opacity: 0.1 },
  ];

  return (
    <section className={`relative min-h-screen flex items-center justify-center pt-20 overflow-hidden ${backgrounds[background]} ${className}`}>
      {/* Background Blobs */}
      {defaultBlobs.map((blob, index) => (
        <BackgroundBlob
          key={index}
          color={blob.color}
          position={blob.position}
          size={blob.size}
          opacity={blob.opacity}
          animate={blob.animate}
        />
      ))}
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {children}
      </div>
    </section>
  );
};

