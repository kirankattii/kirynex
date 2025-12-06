"use client";
import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import {
 Zap, Globe, Layout, Cloud,
 Menu, X, Cpu,
 Code2, Database, Server, Terminal, Layers,
 Box, HardDrive, Settings, Hash, Braces,
 GitBranch, Workflow, Lock
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { MagneticButton, MagneticButton as MagneticButtonUI } from '@/components/ui/MagnaticButton';
import { FadeIn } from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/Badge';
import { BackgroundBlob } from '@/components/ui/BackgroundBlob';
import { useOnScreen } from '@/hooks/useOnScreen';


/* --- TYPES & INTERFACES --- */

interface MousePosition {
  x: number;
  y: number;
}

interface IntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

// Using shared FadeIn component - interface removed

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

interface TechCardProps {
  icon: LucideIcon;
  name: string;
  category: string;
  description: string;
  delay?: number;
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

interface TechItem {
  name: string;
  category: string;
  icon: LucideIcon;
  desc: string;
}


/* --- UTILS & HOOKS --- */


/* Mouse Follower Hook */
const useMousePosition = (): MousePosition => {
 const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
 useEffect(() => {
   const updateMousePosition = (ev: MouseEvent) => setMousePosition({ x: ev.clientX, y: ev.clientY });
   window.addEventListener('mousemove', updateMousePosition);
   return () => window.removeEventListener('mousemove', updateMousePosition);
 }, []);
 return mousePosition;
};


/* Using shared useOnScreen hook and FadeIn component */





/* Spotlight Card Effect */
const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "", delay = 0 }) => {
 const divRef = useRef<HTMLDivElement>(null);
 const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
 const [opacity, setOpacity] = useState<number>(0);


 const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
   if (!divRef.current) return;
   const div = divRef.current;
   const rect = div.getBoundingClientRect();
   setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
 };


 const handleFocus = () => setOpacity(1);
 const handleBlur = () => setOpacity(0);


 return (
   <FadeIn delay={delay} className="h-full">
       <div
       ref={divRef}
       onMouseMove={handleMouseMove}
       onMouseEnter={handleFocus}
       onMouseLeave={handleBlur}
       className={`relative h-full overflow-hidden rounded-[2rem] bg-brand-dark border border-glass-white-10 ${className}`}
       >
       {/* Spotlight Gradient */}
       <div
           className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-30"
           style={{
           opacity,
           background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, var(--gradient-blue-start), transparent 40%)`,
           }}
       />
       {/* Border Glow via Spotlight */}
       <div
           className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
           style={{
               opacity,
               background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, var(--gradient-yellow-start), transparent 40%)`,
               maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
               maskClip: 'content-box, border-box',
               maskComposite: 'exclude',
               padding: '1px',
               borderRadius: '2rem'
           }}
       />
       <div className="relative z-20 h-full">
           {children}
       </div>
       </div>
   </FadeIn>
 );
};


const TechCard: React.FC<TechCardProps> = ({ icon: Icon, name, category, description, delay }) => (
 <SpotlightCard delay={delay} className="hover:bg-white/5 transition-colors duration-500 group">
     <div className="p-8 h-full flex flex-col items-start relative overflow-hidden">
       {/* Subtle Background Mesh */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>


       <div className="w-14 h-14 rounded-2xl bg-glass-white-5 border border-glass-white-10 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-brand-blue group-hover:border-brand-blue transition-all duration-500 shadow-lg shadow-black/50">
         <Icon size={28} strokeWidth={1.5} />
       </div>
      
       <div className="mb-4">
           <span className="inline-block px-3 py-1 rounded-full bg-glass-white-5 border border-glass-white-5 text-brand-yellow text-[10px] font-bold uppercase tracking-widest mb-2">
               {category}
           </span>
           <h3 className="text-2xl font-bold text-white group-hover:text-brand-blue transition-colors">{name}</h3>
       </div>
      
       <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors mt-auto">
           {description}
       </p>
     </div>
 </SpotlightCard>
);


const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
   <div className="mb-12 relative pl-6 border-l-2 border-brand-blue">
       <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
       <p className="text-slate-400 max-w-xl">{subtitle}</p>
   </div>
);


/* --- MAIN COMPONENT --- */


const App: React.FC = () => {
 const [isScrolled, setIsScrolled] = useState<boolean>(false);
 const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
 const { x, y } = useMousePosition();


 useEffect(() => {
   const handleScroll = () => setIsScrolled(window.scrollY > 20);
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);


 const frontend: TechItem[] = [
     { name: "React", category: "Framework", icon: Code2, desc: "Building interactive UIs with component-based architecture." },
     { name: "Next.js", category: "Fullstack", icon: Layers, desc: "Server-side rendering and static generation for peak performance." },
     { name: "TypeScript", category: "Language", icon: Braces, desc: "Type-safe code that scales across large engineering teams." },
     { name: "Tailwind", category: "Styling", icon: Layout, desc: "Utility-first CSS for rapid, custom design implementation." },
 ];


 const backend: TechItem[] = [
     { name: "Node.js", category: "Runtime", icon: Server, desc: "Scalable network applications built on Chrome's V8 engine." },
     { name: "Python", category: "AI / Data", icon: Terminal, desc: "Powerful processing for data science and machine learning backends." },
     { name: "GraphQL", category: "API Spec", icon: Hash, desc: "Precise data fetching to reduce network overhead." },
     { name: "PostgreSQL", category: "Database", icon: Database, desc: "Robust, open-source relational database systems." },
 ];


 const infra: TechItem[] = [
     { name: "AWS", category: "Cloud", icon: Cloud, desc: "Enterprise-grade infrastructure with infinite scalability." },
     { name: "Docker", category: "DevOps", icon: Box, desc: "Containerization for consistent deployment environments." },
     { name: "Vercel", category: "Edge", icon: Globe, desc: "Edge network deployment for instant global availability." },
     { name: "Redis", category: "Cache", icon: HardDrive, desc: "In-memory data structure store for sub-millisecond latency." },
 ];


 return (
   <div className="font-sans antialiased text-white bg-brand-dark min-h-screen overflow-x-hidden selection:bg-brand-blue selection:text-white">
   

     {/* --- Immersive Hero Section --- */}
     <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-[85vh] flex flex-col justify-center">
       {/* Dynamic Background */}
       <div
           className="absolute top-0 left-0 right-0 h-full pointer-events-none opacity-40"
           style={{
           background: `radial-gradient(1000px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.1), transparent 70%)`
           }}
       />
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
       {/* Animated Orbs */}
       <BackgroundBlob color="blue" position="top-left" size="md" opacity={0.2} animate />
       <BackgroundBlob color="yellow" position="bottom-right" size="sm" opacity={0.1} animate />


       <div className="max-w-[90rem] mx-auto text-center relative z-10">
           <FadeIn>
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-glass-white-5 border border-glass-white-10 backdrop-blur-md mb-8 shadow-lg shadow-black/20 group hover:border-brand-blue/50 transition-colors">
                   <Settings size={14} className="text-brand-yellow animate-spin-slow" />
                   <span className="text-xs font-bold uppercase tracking-widest text-white/90">Our Arsenal</span>
               </div>
           </FadeIn>
          
           <FadeIn delay={200}>
               <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] text-white">
                   Built for <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-blue-light to-white animate-gradient-x">Scale.</span>
               </h1>
           </FadeIn>


           <FadeIn delay={400}>
               <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-16 font-light leading-relaxed">
                   We don't chase trends. We choose battle-tested technologies that deliver performance, security, and longevity.
               </p>
           </FadeIn>


           <FadeIn delay={600}>
               <div className="flex flex-col sm:flex-row justify-center gap-6">
                   <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                       <GitBranch size={20} className="text-brand-blue" />
                       <div className="text-left">
                           <p className="text-xs text-slate-400 uppercase tracking-wider">Version Control</p>
                           <p className="font-bold">Enterprise GitHub</p>
                       </div>
                   </div>
                   <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                       <Workflow size={20} className="text-brand-yellow" />
                       <div className="text-left">
                           <p className="text-xs text-slate-400 uppercase tracking-wider">CI/CD Pipeline</p>
                           <p className="font-bold">Automated Deploy</p>
                       </div>
                   </div>
                   <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                       <Lock size={20} className="text-white" />
                       <div className="text-left">
                           <p className="text-xs text-slate-400 uppercase tracking-wider">Security</p>
                           <p className="font-bold">SOC2 Compliant</p>
                       </div>
                   </div>
               </div>
           </FadeIn>
       </div>
     </section>


     {/* --- Tech Grid Section --- */}
     <section className="relative py-32 px-6">
         <div className="max-w-[90rem] mx-auto">
            
             {/* Frontend */}
             <FadeIn>
                 <SectionHeader title="Frontend Experience" subtitle="Pixel-perfect, accessible, and blindingly fast user interfaces." />
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                     {frontend.map((tech, i) => (
                         <TechCard key={i} icon={tech.icon} name={tech.name} category={tech.category} description={tech.desc} delay={i * 100} />
                     ))}
                 </div>
             </FadeIn>


             {/* Backend */}
             <FadeIn delay={200}>
                 <SectionHeader title="Backend Architecture" subtitle="Robust APIs and data processing pipelines that never sleep." />
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                     {backend.map((tech, i) => (
                         <TechCard key={i} icon={tech.icon} name={tech.name} category={tech.category} description={tech.desc} delay={i * 100} />
                     ))}
                 </div>
             </FadeIn>


             {/* Infra */}
             <FadeIn delay={400}>
                 <SectionHeader title="Global Infrastructure" subtitle="Edge-deployed and scalable to millions of concurrent users." />
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {infra.map((tech, i) => (
                         <TechCard key={i} icon={tech.icon} name={tech.name} category={tech.category} description={tech.desc} delay={i * 100} />
                     ))}
                 </div>
             </FadeIn>


             {/* Integration Banner */}
             <FadeIn delay={600}>
                 <div className="mt-32 relative rounded-[3rem] overflow-hidden bg-brand-dark border border-glass-white-10 text-white p-12 md:p-24 text-center group">
                     {/* Animated Background */}
                     <div className="absolute inset-0 opacity-20 bg-[radial-gradient(var(--color-brand-blue)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                    
                     <div className="relative z-10 max-w-3xl mx-auto">
                         <Cpu size={64} className="text-brand-yellow mx-auto mb-8 animate-pulse" />
                         <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Need custom architecture?</h2>
                         <p className="text-xl text-slate-400 mb-10 font-light leading-relaxed">
                             We specialize in integrating bespoke AI models, legacy systems, and proprietary hardware APIs. We build what off-the-shelf tools can't.
                         </p>
                         <MagneticButton className="bg-white text-brand-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-blue hover:text-white transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]">
                             Discuss Architecture
                         </MagneticButton>
                     </div>
                 </div>
             </FadeIn>


         </div>
     </section>

   </div>
 );
};


export default App;

