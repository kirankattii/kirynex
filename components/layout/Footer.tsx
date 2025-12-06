"use client";
import React, { useState, useEffect, useRef } from 'react';

// Animation Helper
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-32 pb-12 px-6 rounded-t-[3rem]  relative overflow-hidden">
       {/* Noise Texture & Glow */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/30 blur-[120px] rounded-full pointer-events-none" />

       <div className="max-w-7xl mx-auto relative z-10 text-center">
         <FadeIn>
           <h2 className="text-[12vw] md:text-[10vw] font-bold leading-none tracking-tighter mb-12 hover:text-yellow-400 transition-colors duration-500 cursor-default select-none">
             LET'S BUILD
           </h2>
           <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-24">
              <a 
                href="mailto:hello@kirynex.com" 
                className="text-xl md:text-2xl border-b border-white/30 pb-1 hover:border-white hover:text-yellow-400 transition-all"
              >
                hello@kirynex.com
              </a>
           </div>
         </FadeIn>

         <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-12 text-slate-400 text-sm">
           <div className="flex gap-8 mb-6 md:mb-0 w-full md:w-auto justify-center md:justify-start">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
           </div>
           <div className="flex flex-col md:items-end w-full md:w-auto items-center">
                <p>&copy; 2025 Kirynex Technology Inc.</p>
             <p>Designed with purpose.</p>
           </div>
         </div>
       </div>
     </footer>
  );
};

