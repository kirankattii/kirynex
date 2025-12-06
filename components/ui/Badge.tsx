"use client";

import React, { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'blue' | 'yellow' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon,
}) => {
  const baseStyles = 'inline-flex items-center gap-2 rounded-full font-bold uppercase tracking-widest';
  
  const variants = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    blue: 'bg-brand-blue/10 text-brand-blue border border-brand-blue/30',
    yellow: 'bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30',
    dark: 'bg-brand-dark/10 text-white border border-white/10',
    outline: 'bg-transparent text-slate-700 border border-slate-300',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
    </div>
  );
};

