"use client";

import React from 'react';

interface PulseIndicatorProps {
  color?: 'yellow' | 'blue' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PulseIndicator: React.FC<PulseIndicatorProps> = ({
  color = 'yellow',
  size = 'md',
  className = '',
}) => {
  const colors = {
    yellow: 'bg-brand-yellow',
    blue: 'bg-brand-blue',
    white: 'bg-white',
  };

  const sizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <span
      className={`${sizes[size]} ${colors[color]} rounded-full animate-pulse ${className}`}
    />
  );
};

