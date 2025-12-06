"use client";
import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, Zap, Globe, Smartphone, Layout, Check, Menu, X, Linkedin, Twitter, Shield, Cpu, Users, ArrowUpRight, Play } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { MagneticButton, MagneticButton as MagneticButtonUI } from '@/components/ui/MagnaticButton';

/* --- UTILS & HOOKS --- */


/* Intersection Observer for scroll animations */
const useOnScreen = (options?: IntersectionObserverInit): [React.RefObject<HTMLDivElement | null>, boolean] => {
 const ref = useRef<HTMLDivElement | null>(null);
 const [isVisible, setIsVisible] = useState<boolean>(false);


 useEffect(() => {
   const observer = new IntersectionObserver(([entry]) => {
     if (entry.isIntersecting) {
       setIsVisible(true);
       observer.unobserve(entry.target);
     }
   }, options);


   if (ref.current) {
     observer.observe(ref.current);
   }


   return () => {
     if (ref.current) observer.unobserve(ref.current);
   };
 }, [ref, options]);


 return [ref, isVisible];
};


interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/* FadeIn Wrapper Component */
const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => {
 const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  return (
   <div
     ref={ref}
     style={{ transitionDelay: `${delay}ms` }}
     className={`transition-all duration-1000 ease-out transform ${
       isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
     } ${className}`}
   >
     {children}
   </div>
 );
};


/* --- TYPES --- */

interface BentoItemProps {
  title: string;
  desc: string;
  icon: LucideIcon;
  span?: string;
  delay?: number;
  dark?: boolean;
}

/* --- COMPONENTS --- */


/* Modern Bento Grid Item */
const BentoItem: React.FC<BentoItemProps> = ({ title, desc, icon: Icon, span = "", delay = 0, dark = false }) => (
   <FadeIn delay={delay} className={`${span} h-full`}>
       <div className={`h-full relative overflow-hidden rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:scale-[1.02] ${
           dark
           ? "bg-[#0f172a] text-white border border-slate-800"
           : "bg-white text-slate-900 border border-slate-100 shadow-xl shadow-slate-200/50"
       }`}>
           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-xl font-bold ${
               dark ? "bg-white/10 text-[#facc15]" : "bg-blue-50 text-[#2563eb]"
           }`}>
               <Icon size={28} />
           </div>
           <h3 className="text-2xl font-bold mb-3 tracking-tight">{title}</h3>
           <p className={`leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>{desc}</p>
          
           {/* Decor */}
           <div className={`absolute -bottom-4 -right-4 w-32 h-32 rounded-full blur-[60px] opacity-40 ${
               dark ? "bg-[#2563eb]" : "bg-[#facc15]"
           }`}></div>
       </div>
   </FadeIn>
);


interface ServiceBlockProps {
  title: string;
  desc: string;
  icon: LucideIcon;
  image: string;
  features: string[];
  align?: "left" | "right";
  index: number;
}

/* Premium Service Block */
const ServiceBlock: React.FC<ServiceBlockProps> = ({ title, desc, icon: Icon, image, features, align = "left", index }) => (
   <div className="py-24 md:py-32 sticky top-0 bg-white rounded-[3rem] border-t border-slate-100 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.05)] mb-8 last:mb-0">
       <div className="max-w-[90rem] mx-auto px-6 md:px-12">
           <div className={`flex flex-col ${align === "right" ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16 lg:gap-24`}>
              
               {/* Content Side */}
               <div className="w-full lg:w-1/2">
                   <FadeIn>
                       <div className="flex items-center gap-3 mb-6">
                           <span className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 text-xs font-bold text-slate-400">0{index}</span>
                           <span className="text-[#2563eb] font-bold uppercase tracking-wider text-xs">Service</span>
                       </div>
                       <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">
                           {title.split(' ').map((word, i) => (
                               <span key={i} className={i === 0 ? "text-slate-900" : "text-slate-900"}>{word} </span>
                           ))}
                       </h2>
                       <p className="text-xl text-slate-500 leading-relaxed font-light mb-10 max-w-lg">
                           {desc}
                       </p>
                      
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                           {features.map((feature, i) => (
                               <div key={i} className="flex items-center gap-3 text-slate-700 font-medium p-3 rounded-xl bg-slate-50 border border-slate-100">
                                   <div className="w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0">
                                       <Check size={12} strokeWidth={3} />
                                   </div>
                                   <span className="text-sm">{feature}</span>
                               </div>
                           ))}
                       </div>


                       <MagneticButtonUI className="group flex items-center gap-3 bg-[#0f172a] text-white px-8 py-4 rounded-full font-bold hover:bg-[#2563eb] transition-all duration-300">
                           Explore Solution
                           <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                               <ArrowUpRight size={14} />
                           </div>
                       </MagneticButtonUI>
                   </FadeIn>
               </div>


               {/* Image Side */}
               <div className="w-full lg:w-1/2">
                   <FadeIn delay={200}>
                       <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 group border-4 border-white">
                           <div className="absolute inset-0 bg-slate-100">
                                <div
                                   className="w-full h-full bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                   style={{backgroundImage: `url('${image}')`}}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a]/20 to-transparent"></div>
                           </div>
                          
                           {/* Animated Abstract UI Element */}
                           <div className="absolute bottom-8 right-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                               <div className="flex items-center justify-between mb-4">
                                   <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 rounded-xl bg-[#facc15] flex items-center justify-center text-black">
                                           <Icon size={20} />
                                       </div>
                                       <div>
                                           <p className="font-bold text-sm">Deployment Ready</p>
                                           <p className="text-xs text-white/70">Verified by Lumina</p>
                                       </div>
                                   </div>
                                   <div className="h-8 w-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-300 text-xs font-bold border border-green-500/30">
                                       99.9%
                                   </div>
                               </div>
                               <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                   <div className="h-full w-[90%] bg-[#2563eb] rounded-full animate-pulse"></div>
                               </div>
                           </div>
                       </div>
                   </FadeIn>
               </div>
           </div>
       </div>
   </div>
);


/* Main Application Component */
const ServicesPageOne: React.FC = () => {
 const [isScrolled, setIsScrolled] = useState<boolean>(false);
 const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);


 useEffect(() => {
   const handleScroll = () => {
     setIsScrolled(window.scrollY > 20);
   };
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);


 return (
   <div className="font-sans antialiased text-slate-900 bg-white selection:bg-[#facc15] selection:text-[#0f172a] overflow-x-hidden">
  
     {/* Mobile Menu Overlay */}
     <div className={`fixed inset-0 bg-[#0f172a] z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
       {['Services', 'Work', 'Process', 'About'].map((item) => (
           <a key={item} href="#" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-bold text-white hover:text-[#facc15] transition-colors">{item}</a>
       ))}
       <button className="mt-8 px-8 py-4 bg-[#2563eb] text-white rounded-full font-bold text-lg">Start Project</button>
     </div>


     {/* --- Ultra-Modern Hero Section --- */}
     <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0f172a] text-white">
       {/* Dynamic Background */}
       <div className="absolute inset-0 z-0">
           <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#2563eb] rounded-full blur-[150px] opacity-20 animate-pulse-slow"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#facc15] rounded-full blur-[150px] opacity-10"></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
       </div>


       <div className="max-w-7xl mx-auto text-center z-10 px-6 relative">
           <FadeIn delay={100}>
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                   <span className="w-2 h-2 rounded-full bg-[#facc15] animate-pulse"></span>
                   <span className="text-xs font-bold uppercase tracking-widest text-white/80">Available for 2025</span>
               </div>
           </FadeIn>


           <FadeIn delay={200}>
               <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-8 leading-[0.9]">
                   Beyond <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#facc15]">
                       Boundaries.
                   </span>
               </h1>
           </FadeIn>
          
           <FadeIn delay={300}>
               <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                   We architect digital ecosystems where <span className="text-white font-medium">engineering precision</span> meets <span className="text-white font-medium">artistic intuition</span>.
               </p>
           </FadeIn>


           <FadeIn delay={400}>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                   <button className="bg-[#2563eb] text-white px-10 py-5 rounded-full font-bold text-sm hover:bg-white hover:text-[#0f172a] transition-all transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] flex items-center gap-3">
                       View Services
                       <ArrowRight size={18} />
                   </button>
                   <button className="group flex items-center gap-3 px-8 py-5 rounded-full border border-white/20 hover:bg-white/10 transition-all font-semibold text-white">
                       <div className="w-8 h-8 rounded-full bg-[#facc15] flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                           <Play size={12} fill="currentColor" />
                       </div>
                       Watch Showreel
                   </button>
               </div>
           </FadeIn>
       </div>
     </section>


     {/* --- Services Section (Sticky Layout) --- */}
     <section id="services" className="relative z-20 -mt-24 pb-32">
        
         <ServiceBlock
           index={1}
           title="Web Platforms"
           desc="We build ultra-fast, SEO-optimized web applications using Next.js. Headless architectures that scale instantly."
           icon={Globe}
           image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
           features={["Server-Side Rendering", "Headless CMS", "Global Edge Network", "PWA Ready"]}
           align="left"
         />


         <ServiceBlock
           index={2}
           title="Mobile Ecosystems"
           desc="Native performance with cross-platform efficiency. Fluid gestures and intuitive interfaces for iOS and Android."
           icon={Smartphone}
           image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
           features={["Swift & Kotlin", "React Native", "Haptic Feedback", "App Store Strategy"]}
           align="right"
         />


         <ServiceBlock
           index={3}
           title="Intelligent UI/UX"
           desc="Design systems that adapt. We combine behavioral psychology with motion design to create addictive experiences."
           icon={Layout}
           image="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200"
           features={["Design Systems", "Motion Design", "Accessibility First", "User Testing"]}
           align="left"
         />


         <ServiceBlock
           index={4}
           title="Cloud & AI"
           desc="Future-proof infrastructure. Serverless backends and custom LLM integrations to automate and scale your business."
           icon={Cpu}
           image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
           features={["AWS / GCP", "AI/ML Integration", "Serverless", "Bank-Grade Security"]}
           align="right"
         />


     </section>


     {/* --- Why Choose Us (Bento Grid) --- */}
     <section className="py-32 px-6 bg-[#f8fafc]">
         <div className="max-w-[90rem] mx-auto">
             <FadeIn className="mb-20 text-center md:text-left">
                 <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 text-[#0f172a]">
                     Why <span className="text-[#2563eb]">Partner</span> With Lumina?
                 </h2>
                 <p className="text-xl text-slate-500 max-w-2xl">We replace agency bloat with engineering velocity.</p>
             </FadeIn>


             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[800px]">
                
                 {/* Large Item */}
                 <div className="md:col-span-2 md:row-span-2">
                     <BentoItem
                       title="Engineering Excellence"
                       desc="We don't outsource. Our team consists of former founders and senior engineers from top tech companies. We write code that is clean, documented, and designed to scale from Day 1."
                       icon={Cpu}
                       dark={true}
                     />
                 </div>


                 {/* Medium Items */}
                 <div className="md:col-span-1 md:row-span-1">
                      <BentoItem
                       title="User Obsessed"
                       desc="Every pixel is validated by user data."
                       icon={Users}
                     />
                 </div>
                 <div className="md:col-span-1 md:row-span-1">
                      <BentoItem
                       title="Security First"
                       desc="SOC2 compliant architectures standard."
                       icon={Shield}
                     />
                 </div>


                 {/* Wide Item */}
                 <div className="md:col-span-2 md:row-span-1">
                      <BentoItem
                       title="Transparent Velocity"
                       desc="Real-time dashboards. No hidden fees. We ship weekly, not monthly."
                       icon={Zap}
                     />
                 </div>
             </div>
         </div>
     </section>


     {/* --- Comparison / Trust --- */}
     <section className="py-32 px-6 bg-white">
         <div className="max-w-6xl mx-auto">
           <div className="bg-[#0f172a] rounded-[3rem] p-8 md:p-20 text-white relative overflow-hidden shadow-2xl">
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563eb] rounded-full blur-[120px] opacity-30"></div>
              
               <div className="relative z-10 text-center">
                   <h2 className="text-3xl md:text-5xl font-bold mb-12">The Standard We Set</h2>
                  
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                           <div className="text-4xl font-bold text-[#facc15] mb-2">3x</div>
                           <p className="text-sm text-slate-300 font-medium uppercase tracking-wider">Faster Deployment</p>
                       </div>
                       <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                           <div className="text-4xl font-bold text-[#2563eb] mb-2">99.99%</div>
                           <p className="text-sm text-slate-300 font-medium uppercase tracking-wider">Uptime Guarantee</p>
                       </div>
                       <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                           <div className="text-4xl font-bold text-white mb-2">24/7</div>
                           <p className="text-sm text-slate-300 font-medium uppercase tracking-wider">Dedicated Support</p>
                       </div>
                   </div>


                   <div className="mt-16 pt-16 border-t border-white/10">
                       <p className="text-slate-400 mb-8 font-light">Trusted by next-gen innovators</p>
                       <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Mock Logos */}
                            <div className="text-xl font-bold">ACME Corp</div>
                            <div className="text-xl font-bold">Stark Ind</div>
                            <div className="text-xl font-bold">Wayne Ent</div>
                            <div className="text-xl font-bold">Cyberdyne</div>
                            <div className="text-xl font-bold">Massive Dynamic</div>
                       </div>
                   </div>
               </div>
           </div>
         </div>
     </section>

   </div>
 );
};


export default ServicesPageOne;

