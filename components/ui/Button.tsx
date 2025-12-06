import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'white';
  onClick?: () => void;
  className?: string;
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  icon = true
}) => {
  const baseStyles = "group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 focus:ring-brand-blue",
    outline: "border border-slate-200 text-slate-900 hover:border-brand-blue hover:text-brand-blue bg-transparent",
    white: "bg-white text-slate-900 hover:bg-slate-50 shadow-sm",
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {icon && (
        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );
};