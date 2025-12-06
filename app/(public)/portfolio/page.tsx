"use client";
import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import {
 ArrowRight, Zap, Globe, ChevronRight,
 Menu, X, Users,
 Code2
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { MagneticButton, MagneticButton as MagneticButtonUI } from '@/components/ui/MagnaticButton';
import { FadeIn } from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/Badge';
import { PulseIndicator } from '@/components/ui/PulseIndicator';
import { useOnScreen } from '@/hooks/useOnScreen';


const useScrollProgress = (): number => {
 const [scrollProgress, setScrollProgress] = useState<number>(0);


 useEffect(() => {
   const handleScroll = () => {
     const totalScroll = document.documentElement.scrollTop;
     const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
     const scroll = `${totalScroll / windowHeight}`;
     setScrollProgress(Number(scroll));
   };


   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);


 return scrollProgress;
};


/* --- ANIMATION COMPONENTS --- */


/* Apple-style Scroll Reveal Text */
interface ScrollRevealTextProps {
  children: ReactNode;
}

const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({ children }) => {
 const elementRef = useRef<HTMLHeadingElement>(null);
 const [percentage, setPercentage] = useState<number>(0);


 useEffect(() => {
   const handleScroll = () => {
     if (!elementRef.current) return;
     const { top, height } = elementRef.current.getBoundingClientRect();
     const windowHeight = window.innerHeight;
    
     // Calculate how far the element is through the viewport (0 to 1)
     const visiblePercent = Math.max(0, Math.min(1, (windowHeight - top) / (windowHeight + height)));
     setPercentage(visiblePercent);
   };


   window.addEventListener('scroll', handleScroll);
   handleScroll(); // Initial check
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);


 // Split text into words for gradient effect could be complex,
 // keeping it simple with opacity shift based on scroll
 const opacity = Math.min(1, Math.max(0.2, (percentage - 0.2) * 2)); // Starts fading in at 20% viewport, full at 70%
 const translateY = (1 - percentage) * 50;


 return (
   <h2
     ref={elementRef}
     style={{
       opacity: opacity,
       transform: `translateY(${translateY}px)`
     }}
     className="text-4xl md:text-7xl font-bold tracking-tight text-brand-dark transition-all duration-100 ease-out leading-tight"
   >
     {children}
   </h2>
 );
};


/* Parallax Image Card */
interface ParallaxCardProps {
  image: string;
  title: string;
  category: string;
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({ image, title, category }) => {
 const ref = useRef<HTMLDivElement>(null);
 const [offset, setOffset] = useState<number>(0);


 useEffect(() => {
   const handleScroll = () => {
     if (!ref.current) return;
     const { top } = ref.current.getBoundingClientRect();
     const windowHeight = window.innerHeight;
     if (top < windowHeight && top > -500) {
       setOffset((top - windowHeight / 2) * 0.1);
     }
   };
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);


 return (
   <div ref={ref} className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl">
     <div
       className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-linear scale-125"
       style={{
         backgroundImage: `url('${image}')`,
         transform: `translateY(${offset}px) scale(1.25)`
       }}
     ></div>
     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
     <div className="absolute bottom-0 left-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
       <p className="text-xs font-bold uppercase tracking-widest mb-2 text-brand-yellow">{category}</p>
       <h3 className="text-3xl font-bold">{title}</h3>
     </div>
   </div>
 );
};


/* Bento Box Item */
interface BentoItemProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  colSpan?: string;
  dark?: boolean;
}

const BentoItem: React.FC<BentoItemProps> = ({ icon: Icon, title, desc, colSpan = "col-span-1", dark = false }) => (
 <div className={`${colSpan} rounded-[2rem] p-8 md:p-10 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 ease-[0.16,1,0.3,1] ${dark ? 'bg-brand-dark text-white' : 'bg-white text-slate-900 shadow-xl shadow-slate-200/50'}`}>
   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-xl ${dark ? 'bg-white/10 text-brand-yellow' : 'bg-blue-50 text-brand-blue'}`}>
     <Icon size={24} />
   </div>
   <h3 className="text-2xl font-bold mb-3">{title}</h3>
   <p className={`text-lg leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
  
   {/* Interactive Hover Glow */}
   <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 ${dark ? 'bg-brand-blue' : 'bg-brand-yellow'}`}></div>
 </div>
);


/* Sticky Scroll Section Component */
interface StickyFeatureProps {
  title: string;
  desc: string;
  image: string;
  index: number;
}

const StickyFeature: React.FC<StickyFeatureProps> = ({ title, desc, image, index }) => (
 <div className="sticky top-0 h-screen flex items-center justify-center bg-white overflow-hidden">
   <div className="max-w-[90rem] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
     <div className="order-2 lg:order-1">
       <FadeIn>
           <Badge variant="blue" className="mb-6">
               <PulseIndicator color="blue" />
               Feature 0{index}
           </Badge>
           <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 text-brand-dark">{title}</h2>
           <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-light">{desc}</p>
       </FadeIn>
     </div>
     <div className="order-1 lg:order-2 relative aspect-square lg:h-[80vh] w-full rounded-[3rem] overflow-hidden shadow-2xl">
         <img src={image} alt={title} className="w-full h-full object-cover" />
     </div>
   </div>
 </div>
);


/* --- MAIN COMPONENT --- */


const PortfolioPageTwo: React.FC = () => {
 const [isScrolled, setIsScrolled] = useState<boolean>(false);
 const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
 const scrollProgress = useScrollProgress();


 useEffect(() => {
   const handleScroll = () => {
     setIsScrolled(window.scrollY > 20);
   };
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);


 return (
   <div className="font-sans antialiased text-slate-900 bg-white selection:bg-brand-yellow selection:text-brand-dark overflow-x-hidden">

     {/* --- Immersive Hero Section --- */}
     <section className="relative pb-30 flex items-center justify-center pt-30 overflow-hidden bg-brand-dark text-white">
       {/* Dynamic Background Gradient Blob */}
       <div
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-30 pointer-events-none"
         style={{
           background: `radial-gradient(circle, var(--color-brand-blue) 0%, var(--color-brand-dark) 70%)`,
           transform: `translate(-50%, -50%) scale(${1 + scrollProgress})`
         }}
       ></div>


       <div className="max-w-[90rem] mx-auto px-6 relative z-10 text-center">
           <FadeIn>
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default">
                   <PulseIndicator />
                   <span className="text-xs font-bold uppercase tracking-widest text-white/90">Agency of the Year 2025</span>
               </div>
           </FadeIn>
          
           <FadeIn delay={200}>
               <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                   Think. <br/>
                   Build. <br/>
                   <span className="text-brand-blue">Beyond.</span>
               </h1>
           </FadeIn>


           <FadeIn delay={400}>
               <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                   We architect digital experiences that feel like magic. <br className="hidden md:block"/>
                   Precision engineering meets boundless creativity.
               </p>
           </FadeIn>


         
       </div>
      
       {/* Scroll Indicator */}
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
           <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
           <ChevronRight size={20} className="rotate-90" />
       </div>
     </section>


     {/* --- Scroll Reveal Text Section --- */}
     <section className="py-20 px-6 bg-white min-h-[80vh] flex items-center justify-center">
         <div className="max-w-5xl mx-auto text-center space-y-12">
            <ScrollRevealText>
                We believe software shouldn't just function.
            </ScrollRevealText>
            <ScrollRevealText>
                It should <span className="text-brand-blue">inspire</span>.
            </ScrollRevealText>
            <ScrollRevealText>
                Every pixel we place is deliberate.
            </ScrollRevealText>
            <ScrollRevealText>
                Every line of code is optimized.
            </ScrollRevealText>
         </div>
     </section>


     {/* --- Sticky Scroll Features (Apple Style) --- */}
     <div className="relative">
         <StickyFeature
           index={1}
           title="Fluid Interfaces"
           desc="We design interfaces that respond naturally to human touch. Using advanced physics-based animation libraries, we ensure every interaction feels organic, heavy, and real."
           image="https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=1200"
         />
         <StickyFeature
           index={2}
           title="Global Scale"
           desc="Our architectures are built on serverless edge networks, ensuring your application loads instantly in Tokyo, New York, and London simultaneously."
           image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
         />
         <StickyFeature
           index={3}
           title="Adaptive Design"
           desc="We don't just shrink desktop sites. We build bespoke mobile experiences that leverage native hardware capabilities like haptics and biometrics."
           image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
         />
     </div>


     {/* --- Parallax Work Grid --- */}
     <section className="py-20 md:py-40 px-6 bg-brand-light">
         <div className="max-w-[90rem] mx-auto">
             <FadeIn className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
                 <div>
                   <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-brand-dark mb-6">Recent Work.</h2>
                   <p className="text-xl text-slate-500 max-w-xl">A curated selection of projects that define our standard of excellence.</p>
                 </div>
             
             </FadeIn>


             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                 <div className="md:mt-0"><ParallaxCard title="Nova Fintech" category="Mobile App" image="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=1200" /></div>
                 <div className="md:mt-24"><ParallaxCard title="Vital Health" category="AI Platform" image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200" /></div>
                 <div className="md:mt-12"><ParallaxCard title="HyperDrive" category="Automotive" image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200" /></div>
             </div>
         </div>
     </section>


     {/* --- Bento Grid "Why Us" --- */}
     <section className="py-24 md:py-40 px-6 bg-white">
         <div className="max-w-[90rem] mx-auto">
             <FadeIn className="pb-10 md:mb-0 text-center">
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">The Kirynex Difference.</h2>
                 <p className="text-xl text-slate-500">We replace agency bloat with engineering velocity.</p>
             </FadeIn>


             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                 <BentoItem
                   title="Engineering First"
                   desc="We are founded by engineers. We write clean, testable code that scales."
                   icon={Code2}
                   colSpan="md:col-span-2"
                   dark={true}
                 />
                 <BentoItem
                   title="Rapid Prototyping"
                   desc="From idea to clickable MVP in 2 weeks."
                   icon={Zap}
                 />
                 <BentoItem
                   title="User Centric"
                   desc="Data-driven design decisions."
                   icon={Users}
                 />
                 <BentoItem
                   title="Global Infrastructure"
                   desc="Deployed on edge networks for instant global access."
                   icon={Globe}
                   colSpan="md:col-span-2"
                 />
             </div>
         </div>
     </section>


     {/* --- Marquee --- */}
     <div className="py-12 bg-brand-blue overflow-hidden whitespace-nowrap">
         <div className="inline-block animate-marquee">
             <span className="text-4xl md:text-7xl font-bold text-white mx-8">INNOVATION</span>
             <span className="text-4xl md:text-7xl font-bold text-white/30 mx-8">•</span>
             <span className="text-4xl md:text-7xl font-bold text-white mx-8">PRECISION</span>
             <span className="text-4xl md:text-7xl font-bold text-white/30 mx-8">•</span>
             <span className="text-4xl md:text-7xl font-bold text-white mx-8">VELOCITY</span>
             <span className="text-4xl md:text-7xl font-bold text-white/30 mx-8">•</span>
             <span className="text-4xl md:text-7xl font-bold text-white mx-8">SCALE</span>
             <span className="text-4xl md:text-7xl font-bold text-white/30 mx-8">•</span>
              <span className="text-4xl md:text-7xl font-bold text-white mx-8">INNOVATION</span>
             <span className="text-4xl md:text-7xl font-bold text-white/30 mx-8">•</span>
             <span className="text-4xl md:text-7xl font-bold text-white mx-8">PRECISION</span>
             <span className="text-4xl md:text-7xl font-bold text-white/30 mx-8">•</span>
         </div>
     </div>

     <style>{`
       @keyframes marquee {
         0% { transform: translateX(0); }
         100% { transform: translateX(-50%); }
       }
       .animate-marquee {
         animation: marquee 20s linear infinite;
       }
     `}</style>
   </div>
 );
};


export default PortfolioPageTwo;

