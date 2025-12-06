"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useProjectModal } from '@/hooks/useProjectModal';

export const HeroSection: React.FC = () => {
  const { openModal } = useProjectModal();
  const router = useRouter();

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[10s] hover:scale-100"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full glass-dark border border-white/20">
          <span className="text-brand-yellow text-xs font-bold tracking-widest uppercase">
            Award Winning Agency
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 drop-shadow-lg">
          We Build the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-400">
            Future of Tech
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-200 mb-10 font-light leading-relaxed">
          KIRYNEX combines world-class engineering with Apple-level design aesthetics. 
          We craft digital experiences that define brands.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" onClick={openModal}>Start Your Project</Button>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900" onClick={() => router.push('/work-flow')}>
            View Our Work Flow
          </Button>
        </div>
      </div>

      {/* Floating Elements / Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
};