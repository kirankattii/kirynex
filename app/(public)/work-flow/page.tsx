"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
 ArrowRight,
 Menu,
 X,
 Search,
 PenTool,
 Code2,
 TestTube2,
 Rocket,
 Infinity,
 CheckCircle2,
 ChevronDown,
 ArrowUpRight,
 Zap,
 Box
} from 'lucide-react';
import { MagneticButton, MagneticButton as MagneticButtonUI } from '@/components/ui/MagnaticButton';
import { FadeIn } from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/Badge';
import { PulseIndicator } from '@/components/ui/PulseIndicator';
import { BackgroundBlob } from '@/components/ui/BackgroundBlob';


// --- Process Step Component (Sticky Card) ---
const ProcessCard = ({
 step,
 index,
 total
}: {
 step: any,
 index: number,
 total: number
}) => {
 // Calculate top offset for stacking effect
 // Each card sticks 4rem (approx 64px) lower than the previous
 const topOffset = 120 + (index * 20);


 return (
   <div
     className="sticky mb-12"
     style={{ top: `${topOffset}px` }}
   >
     <div className="relative group">
       {/* Glow Effect behind card */}
       <div className={`absolute -inset-1 rounded-[2.5rem] opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl ${index % 2 === 0 ? 'bg-brand-blue' : 'bg-brand-yellow'}`}></div>
      
       {/* Main Card Body */}
       <div className="relative bg-brand-dark border border-glass-white-10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center min-h-[400px]">
        
         {/* Background Gradient Mesh */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-white/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>


         {/* Number Column */}
         <div className="flex-shrink-0">
            <span className="text-[8rem] md:text-[12rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none font-mono">
              0{index + 1}
            </span>
         </div>


         {/* Content Column */}
         <div className="relative z-10 flex-grow">
           <Badge variant={index % 2 === 0 ? 'blue' : 'yellow'} className="mb-6" icon={step.icon}>
             {step.label}
           </Badge>
          
           <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
             {step.title}
           </h3>
          
           <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
             {step.desc}
           </p>


           {/* Micro-interaction tags */}
           <div className="flex flex-wrap gap-3 mt-8">
             {step.tags.map((tag: string, i: number) => (
               <span key={i} className="text-xs font-mono text-white/30 px-2 py-1 border border-white/10 rounded">
                 {tag}
               </span>
             ))}
           </div>
         </div>


         {/* Decorative Icon Visual */}
         <div className="hidden lg:flex items-center justify-center w-32 h-32 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
            <ArrowUpRight className={`w-12 h-12 ${index % 2 === 0 ? 'text-brand-blue' : 'text-brand-yellow'}`} />
         </div>


       </div>
     </div>
   </div>
 );
};


// --- Main Application Component ---


export default function WorkflowPageOne() {
 const [scrolled, setScrolled] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);


 useEffect(() => {
   const onScroll = () => setScrolled(window.scrollY > 20);
   window.addEventListener('scroll', onScroll);
   return () => window.removeEventListener('scroll', onScroll);
 }, []);


 const processSteps = [
   {
     label: "Phase I",
     title: "Radical Discovery",
     desc: "We don't just ask what you want; we uncover what you need. We tear down assumptions and map the entire ecosystem before writing a single line of code.",
     icon: <Search size={16} />,
     tags: ["User Journey", "Competitor Audit", "Tech Feasibility"]
   },
   {
     label: "Phase II",
     title: "Atomic Design",
     desc: "Pixel-perfect is the baseline. We build modular design systems that scale. Every component is crafted for aesthetic purity and functional utility.",
     icon: <PenTool size={16} />,
     tags: ["Figma", "Design Systems", "Prototyping"]
   },
   {
     label: "Phase III",
     title: "Engineering",
     desc: "The engine room. We build robust, scalable architectures using the latest tech stack. Security, performance, and scalability are baked in from day zero.",
     icon: <Code2 size={16} />,
     tags: ["React/Next.js", "TypeScript", "Node.js"]
   },
   {
     label: "Phase IV",
     title: "Stress Testing",
     desc: "We try to break it so your users can't. Rigorous automated testing, security audits, and performance tuning to ensure 99.99% reliability.",
     icon: <TestTube2 size={16} />,
     tags: ["Jest", "Cypress", "Pentesting"]
   },
   {
     label: "Phase V",
     title: "Ignition",
     desc: "A zero-downtime launch. We handle the dev-ops, the DNS, and the rollout strategy to ensure your product enters the market with a bang.",
     icon: <Rocket size={16} />,
     tags: ["CI/CD", "AWS/Vercel", "Monitoring"]
   },
   {
     label: "Phase VI",
     title: "Evolution",
     desc: "Launch is just Day 1. We provide real-time monitoring, iterative updates, and feature expansions based on real user data.",
     icon: <Infinity size={16} />,
     tags: ["Analytics", "Iterative Dev", "Support"]
   },
 ];


 return (
   <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-yellow selection:text-brand-dark overflow-x-hidden">
    
     {/* Background Ambience */}
     <div className="fixed inset-0 pointer-events-none z-0">
       <BackgroundBlob color="blue" position="top-right" size="xl" opacity={0.1} animate />
       <BackgroundBlob color="yellow" position="bottom-left" size="lg" opacity={0.05} />
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
     </div>

     {/* --- Hero Section --- */}
     <section className="relative pt-48 pb-32 px-6">
       <div className="max-w-7xl mx-auto text-center relative z-10">
         <FadeIn>
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
             <PulseIndicator />
             <span className="text-xs font-bold uppercase tracking-widest text-white/60">Our Methodology</span>
           </div>
           <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter mb-8 leading-[0.9]">
             THE <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
               BLUEPRINT.
             </span>
           </h1>
         </FadeIn>
        
         <FadeIn delay={200}>
           <p className="text-xl md:text-2xl font-light text-white/60 max-w-2xl mx-auto leading-relaxed mb-12">
             We don't rely on luck. We rely on a battle-tested engineering process designed to turn chaos into clarity.
           </p>
         </FadeIn>


         <FadeIn delay={400} className="flex justify-center">
            <div className="w-px h-24 bg-gradient-to-b from-brand-blue to-transparent"></div>
         </FadeIn>
       </div>
     </section>


     {/* --- Sticky Process Steps --- */}
     <section className="pb-30 md:pb-48 px-6 relative z-10">
       <div className="max-w-5xl mx-auto">
          {processSteps.map((step, index) => (
            <ProcessCard
              key={index}
              step={step}
              index={index}
              total={processSteps.length}
            />
          ))}
       </div>
     </section>


     {/* --- Outcome Stats (Bento Grid) --- */}
     <section className="py-32 px-6 bg-white text-brand-dark">
       <div className="max-w-7xl mx-auto">
         <FadeIn className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              THE <span className="text-brand-blue">OUTCOME</span>
            </h2>
            <p className="text-xl text-brand-dark/60 max-w-2xl">
              Process is nothing without results. Here is what happens when you trust the blueprint.
            </p>
         </FadeIn>
        
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={100} className="p-10 bg-slate-100 rounded-[2.5rem] flex flex-col justify-between min-h-[300px] group hover:bg-brand-blue hover:text-white transition-colors duration-500">
               <Box size={40} className="text-brand-blue group-hover:text-white transition-colors" />
               <div>
                  <span className="block text-6xl font-black mb-2">2x</span>
                  <span className="font-bold uppercase tracking-widest opacity-60">Development Speed</span>
               </div>
            </FadeIn>
           
            <FadeIn delay={200} className="p-10 bg-brand-dark text-white rounded-[2.5rem] flex flex-col justify-between min-h-[300px] md:col-span-2 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
               <div className="relative z-10 flex justify-between items-start">
                  <CheckCircle2 size={40} className="text-brand-yellow" />
                  <ArrowUpRight size={40} className="opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
               <div className="relative z-10">
                  <span className="block text-6xl font-black mb-2">99.9%</span>
                  <span className="font-bold uppercase tracking-widest text-brand-yellow">Uptime Guarantee</span>
                  <p className="mt-4 text-white/50 max-w-md">Our architecture is built for redundancy and scale from the very first commit.</p>
               </div>
            </FadeIn>
         </div>
       </div>
     </section>
   </div>
 );
}

