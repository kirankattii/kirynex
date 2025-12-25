"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, MoveRight } from 'lucide-react';

export const GallarySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const projects = [
    { 
      title: "FinTech Zenith", 
      category: "Finance Ecosystem", 
      year: "2024", 
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
      desc: "Reimagining banking infrastructure with blockchain integration."
    },
    { 
      title: "Orbit Health", 
      category: "Medical AI", 
      year: "2023", 
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600",
      desc: "Predictive diagnostics powered by neural networks."
    },
    { 
      title: "Neon Logistics", 
      category: "Supply Chain", 
      year: "2024", 
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600",
      desc: "Autonomous drone delivery tracking system."
    },
    { 
      title: "AeroSpace Labs", 
      category: "R&D Interface", 
      year: "2022", 
      image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=1600",
      desc: "Telemetry visualization for next-gen propulsion."
    },
    { 
      title: "Urban Pulse", 
      category: "Smart City", 
      year: "2023", 
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1600",
      desc: "Real-time traffic and energy optimization."
    },
  ];

  // --- Handlers ---

  const nextSlide = () => {
    if (currentSlide < projects.length - 1) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Touch & Mouse Drag Logic
  const touchStart = (_index: number) => (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(getPositionX(e));
    animationRef.current = requestAnimationFrame(animation);
    if(sliderRef.current) sliderRef.current.style.cursor = 'grabbing';
  };

  const touchMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const currentPosition = getPositionX(e);
      const diff = currentPosition - startX;
      // Provide some resistance if dragging beyond bounds
      if ((currentSlide === 0 && diff > 0) || (currentSlide === projects.length - 1 && diff < 0)) {
         setCurrentTranslate(prevTranslate + diff * 0.3);
      } else {
         setCurrentTranslate(prevTranslate + diff);
      }
    }
  };

  const touchEnd = () => {
    setIsDragging(false);
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    const movedBy = currentTranslate - prevTranslate;

    // Threshold to change slide
    if (movedBy < -100 && currentSlide < projects.length - 1) setCurrentSlide(prev => prev + 1);
    else if (movedBy > 100 && currentSlide > 0) setCurrentSlide(prev => prev - 1);
    
    // Reset to snapped position handled by useEffect below
    if (sliderRef.current) sliderRef.current.style.cursor = 'grab';
  };

  const getPositionX = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    return event.type.includes('mouse') ? (event as React.MouseEvent<HTMLDivElement>).pageX : (event as React.TouchEvent<HTMLDivElement>).touches[0].clientX;
  };

  const animation = () => {
    if (isDragging) requestAnimationFrame(animation);
  };

  // Update position when slide changes
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    // GAP must match CSS: gap-4 (16px) on mobile, gap-8 (32px) on desktop
    const gap = isMobile ? 16 : 32; 
    const cardSize = isMobile ? (window.innerWidth * 0.85) : 450;
    
    // Calculate offset
    const offset = -(currentSlide * (cardSize + gap));
    
    setPrevTranslate(offset);
    setCurrentTranslate(offset);
  }, [currentSlide]);

  return (
    <section className="py-24 md:py-32 bg-slate-950 text-white overflow-hidden relative select-none">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[90rem] mx-auto px-6 mb-12 md:mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <span className="w-12 h-[1px] bg-yellow-400"></span>
             <span className="text-yellow-400 uppercase tracking-widest text-xs font-bold">Selected Works</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-none">
            Digital <span className="font-serif italic text-slate-400">Chronicles</span>
          </h2>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 w-full md:w-auto">
          {/* Progress Bar */}
          <div className="flex items-center gap-3 text-sm font-mono text-slate-500 flex-1 md:flex-initial">
             <span className="text-white">0{currentSlide + 1}</span>
             <div className="flex-1 md:w-24 h-[1px] bg-slate-800 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-yellow-400 transition-all duration-500"
                  style={{ width: `${((currentSlide + 1) / projects.length) * 100}%` }}
                />
             </div>
             <span>0{projects.length}</span>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <button 
              onClick={prevSlide} 
              disabled={currentSlide === 0}
              className={`p-3 md:p-4 rounded-full border border-slate-800 transition-all duration-300 ${currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:text-black hover:border-white'}`}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide} 
              disabled={currentSlide === projects.length - 1}
              className={`p-3 md:p-4 rounded-full border border-slate-800 transition-all duration-300 ${currentSlide === projects.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:text-black hover:border-white'}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Cinematic Slider */}
      <div 
        className="relative w-full cursor-grab active:cursor-grabbing pl-[7.5vw] md:pl-[max(calc((100vw-1440px)/2),2rem)]"
        ref={sliderRef}
        onMouseDown={touchStart(currentSlide)}
        onMouseMove={touchMove}
        onMouseUp={touchEnd}
        onMouseLeave={() => isDragging && touchEnd()}
        onTouchStart={touchStart(currentSlide)}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
      >
        <div 
          className="flex gap-4 md:gap-8 transition-transform ease-out duration-500 will-change-transform"
          style={{ 
            transform: `translateX(${isDragging ? currentTranslate : prevTranslate}px)`,
            transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="relative flex-shrink-0 transition-all duration-500 w-[85vw] md:w-[450px]"
            >
              {/* Card Image */}
              <div className="group relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-xl bg-slate-900 mb-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  draggable="false"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 opacity-80" />
                
                {/* Hover Content (Desktop) / Always Visible (Mobile) */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                   <div className="transform md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-out">
                      <div className="flex items-center gap-2 mb-3 text-yellow-400 font-mono text-xs uppercase tracking-wider">
                        <span>{project.year}</span>
                        <span className="w-1 h-1 rounded-full bg-yellow-400"></span>
                        <span>{project.category}</span>
                      </div>
                      <p className="text-slate-300 text-sm mb-6 line-clamp-2 md:line-clamp-none">
                        {project.desc}
                      </p>
                      <button className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs group/btn cursor-pointer">
                        View Case Study <MoveRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                   </div>
                </div>
              </div>

              {/* Card Meta (Outside Image) */}
              <div className="flex justify-between items-start border-t border-slate-800 pt-4">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{project.title}</h3>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
    