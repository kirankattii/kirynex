"use client";
import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, Zap, Globe, Smartphone, Layout, Check, Menu, X, Linkedin, Twitter, Shield, Cpu, Users, ArrowUpRight, Play, ShieldCheck, Terminal, Lock, Activity, Code2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { MagneticButton, MagneticButton as MagneticButtonUI } from '@/components/ui/MagnaticButton';
import { FadeIn } from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/Badge';
import { PulseIndicator } from '@/components/ui/PulseIndicator';
import { BackgroundBlob } from '@/components/ui/BackgroundBlob';
import { useProjectModal } from '@/hooks/useProjectModal';


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
           ? "bg-brand-dark text-white border border-slate-800"
           : "bg-white text-slate-900 border border-slate-100 shadow-xl shadow-slate-200/50"
       }`}>
           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-xl font-bold ${
               dark ? "bg-white/10 text-brand-yellow" : "bg-blue-50 text-brand-blue"
           }`}>
               <Icon size={28} />
           </div>
           <h3 className="text-2xl font-bold mb-3 tracking-tight">{title}</h3>
           <p className={`leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>{desc}</p>
          
           {/* Decor */}
           <div className={`absolute -bottom-4 -right-4 w-32 h-32 rounded-full blur-[60px] opacity-40 ${
               dark ? "bg-brand-blue" : "bg-brand-yellow"
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
                           <span className="text-brand-blue font-bold uppercase tracking-wider text-xs">Service</span>
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
                                   <div className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0">
                                       <Check size={12} strokeWidth={3} />
                                   </div>
                                   <span className="text-sm">{feature}</span>
                               </div>
                           ))}
                       </div>


                       <MagneticButtonUI className="group flex items-center gap-3 bg-brand-dark text-white px-8 py-4 rounded-full font-bold hover:bg-brand-blue transition-all duration-300">
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
                       <div className="relative aspect-[3/4] md:aspect-[4/3] rounded-[3.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 group border-4 border-white">
                           <div className="absolute inset-0 bg-slate-100">
                                <div
                                   className="w-full h-full bg-cover bg-center transition-transform duration-[1.5s] ease-out md:group-hover:scale-105"
                                   style={{backgroundImage: `url('${image}')`}}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/20 to-transparent"></div>
                           </div>
                          
                           {/* Animated Abstract UI Element */}
                           <div className="absolute bottom-8 right-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-white transform translate-y-0 opacity-100 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-out">
                               <div className="flex items-center justify-between mb-4">
                                   <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 rounded-xl bg-brand-yellow flex items-center justify-center text-black">
                                           <Icon size={20} />
                                       </div>
                                       <div>
                                           <p className="font-bold text-sm">Deployment Ready</p>
                                           <p className="text-xs text-white/70">Verified by Kirynex</p>
                                       </div>
                                   </div>
                                   <div className="h-8 w-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-300 text-xs font-bold border border-green-500/30">
                                       99.9%
                                   </div>
                               </div>
                               <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                   <div className="h-full w-[90%] bg-brand-blue rounded-full animate-pulse"></div>
                               </div>
                           </div>
                       </div>
                   </FadeIn>
               </div>
           </div>
       </div>
   </div>
);


// --- Internal Animations for Cards ---

// 1. Engineering Excellence: Scrolling Code Terminal
const TerminalAnimation = () => {
  // Deterministic values to prevent hydration glitches
  const barWidths = ["60%", "40%", "75%", "35%", "80%", "50%"];
  
  return (
    <div className="absolute inset-0 bg-slate-950/50 flex flex-col p-6 font-mono text-[10px] md:text-xs opacity-70 overflow-hidden select-none pointer-events-none">
      <div className="flex gap-1.5 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
      </div>
      <div className="space-y-2 text-slate-500">
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }} 
          transition={{ duration: 2, repeat: Infinity }}
        >
          &gt; npm install @kirynex/core
        </motion.div>
        <div className="text-green-500/80">
          ✔ Core loaded <br/>
          ✔ Optimized <br/>
          ✔ 0 vulns
        </div>
        <motion.div 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 1, duration: 0.5 }}
           className="text-blue-400"
        >
          <span className="text-purple-400">const</span> velocity = <span className="text-yellow-400">new</span> Accel();
        </motion.div>
        <div className="space-y-1 mt-2">
           {barWidths.map((width, i) => (
              <motion.div 
                 key={i}
                 className="h-1.5 bg-slate-800 rounded-full"
                 style={{ width }}
                 animate={{ opacity: [0.3, 0.6, 0.3] }}
                 transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
              />
           ))}
        </div>
      </div>
    </div>
  );
};

// 2. Security: Radar Scan
const SecurityAnimation = () => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
     {/* Grid */}
     <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
     
     {/* Radar Circle */}
     <div className="relative w-40 h-40 border border-green-500/20 rounded-full flex items-center justify-center">
        <div className="absolute w-full h-full border border-green-500/10 rounded-full animate-ping" />
        
        {/* Scanning Line */}
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
           className="absolute w-full h-full rounded-full bg-gradient-to-t from-green-500/20 to-transparent"
           style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 0, 0 0)' }}
        />
        
        <Lock className="text-green-500 relative z-10 w-6 h-6" />
     </div>
  </div>
);

// 3. User Obsessed: Floating Feedback
const UserAnimation = () => (
  <div className="absolute inset-0 overflow-hidden">
     {/* Background Blobs */}
     <motion.div 
       animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
       transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
       className="absolute top-10 right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"
     />
     
     {/* Floating Chat Bubble */}
     <motion.div 
       initial={{ y: 20, opacity: 0 }}
       whileInView={{ y: 0, opacity: 1 }}
       transition={{ delay: 0.2 }}
       className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl"
     >
        <div className="flex items-center gap-3 mb-2">
           <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
           <div className="w-16 h-2 bg-slate-700 rounded-full" />
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full mb-1" />
        <div className="w-2/3 h-1.5 bg-slate-800 rounded-full" />
        
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black border-2 border-slate-900">
           4.9
        </div>
     </motion.div>
  </div>
);

// 4. Velocity: Live Graph
const VelocityAnimation = () => (
  <div className="absolute inset-0 flex items-end px-8 pb-0 overflow-hidden">
     <div className="flex justify-between items-end w-full gap-2 h-24 md:h-32">
        {[40, 65, 45, 80, 55, 90, 75, 95, 60, 100].map((h, i) => (
           <motion.div
             key={i}
             initial={{ height: "10%" }}
             whileInView={{ height: `${h}%` }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: i * 0.05, type: "spring" }}
             className="w-full bg-blue-600/20 rounded-t-sm relative overflow-hidden group"
           >
              <motion.div 
                animate={{ height: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="absolute bottom-0 left-0 w-full bg-blue-500 opacity-40"
              />
              {/* Highlight top */}
              <div className="absolute top-0 w-full h-0.5 bg-blue-400 opacity-50" />
           </motion.div>
        ))}
     </div>
     
     {/* Overlay Line */}
     <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <motion.path
           d="M0 100 Q 50 100 100 80 T 200 50 T 300 90 T 400 30"
           fill="none"
           stroke="#2563eb"
           strokeWidth="2"
           initial={{ pathLength: 0 }}
           whileInView={{ pathLength: 1 }}
           transition={{ duration: 2, ease: "easeInOut" }}
        />
     </svg>
  </div>
);

// --- Main Components ---

const BentoCard = ({ 
  title, 
  desc, 
  icon: Icon, 
  children, 
  className = "",
  delay = 0 
}: { 
  title: string, 
  desc: string, 
  icon: any, 
  children?: React.ReactNode, 
  className?: string,
  delay?: number
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden bg-slate-950 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] group ${className}`}
    >
      {/* Dynamic Background Content - Always Visible */}
      <div className="absolute inset-0 z-0 opacity-80 md:opacity-100">
        {children}
      </div>

      {/* Gradient Overlay - Lighter on mobile for visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end p-6 md:p-8">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <Icon size={20} className="md:w-6 md:h-6" />
        </div>
        
        <h3 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3 tracking-tight">
          {title}
        </h3>
        
        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm group-hover:text-slate-300 transition-colors">
          {desc}
        </p>
      </div>
      
      {/* Decorative Border Glow on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-[1.5rem] md:rounded-[2rem] transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-slate-900 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900 pointer-events-none" />
      
      <div className="max-w-[85rem] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-6">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs font-mono mb-4 md:mb-6 uppercase tracking-wider">
                    <Zap size={12} />
                    <span>The Kirynex Advantage</span>
                </div>
                <h2 className="text-3xl md:text-6xl font-bold tracking-tighter text-white">
                    Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Partner</span> With Us?
                </h2>
            </motion.div>
            
            <motion.p 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-base md:text-xl text-slate-400 max-w-lg leading-relaxed md:text-right"
            >
                We replace agency bloat with engineering velocity. 
                Built by founders, for founders.
            </motion.p>
        </div>

        {/* Bento Grid - Optimized Heights */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            
            {/* 1. Engineering Excellence (Large - 2x2) */}
            <BentoCard
                title="Engineering Excellence"
                desc="Former founders & senior engineers. We write code that scales from Day 1."
                icon={Code2}
                className="md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-[400px]"
            >
                <TerminalAnimation />
            </BentoCard>

            {/* 2. User Obsessed (Medium - 1x1) */}
            <BentoCard
                title="User Obsessed"
                desc="Validated by data. We build what users actually want."
                icon={Users}
                className="md:col-span-1 md:row-span-1 min-h-[240px]"
                delay={0.1}
            >
                <UserAnimation />
            </BentoCard>

            {/* 3. Security First (Medium - 1x1) */}
            <BentoCard
                title="Security First"
                desc="SOC2 compliant architectures standard."
                icon={ShieldCheck}
                className="md:col-span-1 md:row-span-1 min-h-[240px]"
                delay={0.2}
            >
                <SecurityAnimation />
            </BentoCard>

            {/* 4. Transparent Velocity (Wide - 2x1) */}
            <BentoCard
                title="Transparent Velocity"
                desc="Real-time dashboards. No hidden fees. We ship weekly updates."
                icon={Activity}
                className="md:col-span-2 md:row-span-1 min-h-[240px]"
                delay={0.3}
            >
                <VelocityAnimation />
            </BentoCard>

        </div>
      </div>
    </section>
  );
};


/* Main Application Component */
const ServicesPageOne: React.FC = () => {
  const { openModal } = useProjectModal();
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
   <div className="font-sans antialiased text-slate-900 bg-white selection:bg-brand-yellow selection:text-brand-dark overflow-x-hidden">
  
     {/* Mobile Menu Overlay */}
     <div className={`fixed inset-0 bg-brand-dark z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
       {['Services', 'Work', 'Process', 'About'].map((item) => (
           <a key={item} href="#" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-bold text-white hover:text-brand-yellow transition-colors">{item}</a>
       ))}
       <button onClick={() => { openModal(); setMobileMenuOpen(false); }} className="mt-8 px-8 py-4 bg-brand-blue text-white rounded-full font-bold text-lg cursor-pointer">Start Project</button>
     </div>


     {/* --- Ultra-Modern Hero Section --- */}
     <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-brand-dark text-white">
       {/* Dynamic Background */}
       <div className="absolute inset-0 z-0">
           <BackgroundBlob color="blue" position="top-left" size="lg" opacity={0.2} animate />
           <BackgroundBlob color="yellow" position="bottom-right" size="md" opacity={0.1} />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
       </div>


       <div className="max-w-7xl mx-auto text-center z-10 px-6 relative">
           <FadeIn delay={100}>
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                   <PulseIndicator />
                   <span className="text-xs font-bold uppercase tracking-widest text-white/80">Available for 2025</span>
               </div>
           </FadeIn>


           <FadeIn delay={200}>
               <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-8 leading-[0.9]">
                   Beyond <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-blue-light to-brand-yellow">
                       Boundaries.
                   </span>
               </h1>
           </FadeIn>
          
           <FadeIn delay={300}>
               <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                   We architect digital ecosystems where <span className="text-white font-medium">engineering precision</span> meets <span className="text-white font-medium">artistic intuition</span>.
               </p>
           </FadeIn>
       </div>
     </section>


     {/* --- Services Section (Sticky Layout) --- */}
     <section id="services" className="relative z-20 -mt-12 pb-6 md:pb-32">
        
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
     <WhyChooseUs />


     {/* --- Comparison / Trust --- */}
     <section className="py-16 md:py-32 px-3 md:px-6 bg-white">
         <div className="max-w-6xl mx-auto">
           <div className="bg-brand-dark rounded-[3rem] p-8 md:p-20 text-white relative overflow-hidden shadow-2xl">
               {/* Background Glow */}
               <BackgroundBlob color="blue" position="top-right" size="md" opacity={0.3} />
              
               <div className="relative z-10 text-center">
                   <h2 className="text-3xl md:text-5xl font-bold mb-12">The Standard We Set</h2>
                  
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="p-6 rounded-2xl bg-glass-white-5 border border-glass-white-10 backdrop-blur-sm">
                           <div className="text-4xl font-bold text-brand-yellow mb-2">3x</div>
                           <p className="text-sm text-slate-300 font-medium uppercase tracking-wider">Faster Deployment</p>
                       </div>
                       <div className="p-6 rounded-2xl bg-glass-white-5 border border-glass-white-10 backdrop-blur-sm">
                           <div className="text-4xl font-bold text-brand-blue mb-2">99.99%</div>
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

