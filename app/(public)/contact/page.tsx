"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
 ArrowRight, Zap, Menu, X, Cpu, ArrowUpRight,
 Mail, MapPin, Send, MessageSquare, ChevronDown, Sparkles
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/Badge';
import { BackgroundBlob } from '@/components/ui/BackgroundBlob';
import { useOnScreen } from '@/hooks/useOnScreen';

/* --- UTILS & HOOKS --- */


/* Mouse Follower Hook for Spotlight Effect */
const useMousePosition = () => {
 const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });


 useEffect(() => {
   const updateMousePosition = (ev: MouseEvent) => {
     setMousePosition({ x: ev.clientX, y: ev.clientY });
   };
   window.addEventListener('mousemove', updateMousePosition);
   return () => window.removeEventListener('mousemove', updateMousePosition);
 }, []);


 return mousePosition;
};


/* --- COMPONENTS --- */


/* Magnetic Button Component */
const MagneticButton = ({ 
 children, 
 className = "", 
 onClick 
}: {
 children: React.ReactNode;
 className?: string;
 onClick?: () => void;
}) => {
 const buttonRef = useRef<HTMLButtonElement>(null);
 const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });


 const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
   if (!buttonRef.current) return;
   const { clientX, clientY } = e;
   const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
   const x = (clientX - (left + width / 2)) * 0.35; // Magnetic pull strength
   const y = (clientY - (top + height / 2)) * 0.35;
   setPosition({ x, y });
 };


 const handleMouseLeave = () => {
   setPosition({ x: 0, y: 0 });
 };


 return (
   <button
     ref={buttonRef}
     onMouseMove={handleMouseMove}
     onMouseLeave={handleMouseLeave}
     onClick={onClick}
     style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
     className={`relative overflow-hidden transition-transform duration-200 ease-out ${className}`}
   >
     {children}
   </button>
 );
};


const InputField = ({ 
 label, 
 type = "text", 
 placeholder, 
 isTextArea = false 
}: {
 label: string;
 type?: string;
 placeholder?: string;
 isTextArea?: boolean;
}) => (
 <div className="group relative">
   <label className="absolute -top-2.5 left-3 md:-top-3 md:left-4 bg-brand-dark px-1 md:px-2 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-brand-blue transition-colors z-10">
     {label}
   </label>
   {isTextArea ? (
     <textarea
       rows={2} // Reduced rows for mobile
       placeholder={placeholder}
       className="w-full bg-glass-white-5 border border-glass-white-10 rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-5 text-sm md:text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-blue focus:bg-glass-white-10 focus:ring-1 focus:ring-brand-blue transition-all resize-none backdrop-blur-sm min-h-[80px] md:min-h-[120px]"
     />
   ) : (
     <input
       type={type}
       placeholder={placeholder}
       className="w-full bg-glass-white-5 border border-glass-white-10 rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-5 text-sm md:text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-blue focus:bg-glass-white-10 focus:ring-1 focus:ring-brand-blue transition-all backdrop-blur-sm"
     />
   )}
 </div>
);


const ContactCard = ({ 
 icon: Icon, 
 title, 
 value, 
 subtext 
}: {
 icon: React.ComponentType<{ size?: number }>;
 title: string;
 value: string;
 subtext: string;
}) => (
   <div className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
       <div className="relative z-10 flex items-start gap-4">
           <div className="w-12 h-12 rounded-2xl bg-glass-white-10 flex items-center justify-center text-brand-yellow group-hover:scale-110 transition-transform duration-500">
               <Icon size={24} />
           </div>
           <div>
               <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
               <p className="text-lg font-semibold text-white mb-1 group-hover:text-brand-blue transition-colors">{value}</p>
               <p className="text-xs text-slate-500">{subtext}</p>
           </div>
       </div>
   </div>
);


/* --- MAIN COMPONENT --- */


export const ContactPage = () => {
 const [isScrolled, setIsScrolled] = useState<boolean>(false);
 const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
 const { x, y } = useMousePosition();


 useEffect(() => {
   const handleScroll = () => setIsScrolled(window.scrollY > 20);
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);


 return (
   <div className="font-sans antialiased text-white bg-brand-dark min-h-screen overflow-x-hidden selection:bg-brand-blue selection:text-white">
    
     {/* --- Dynamic Spotlight Effect --- */}
     <div
       className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
       style={{
         background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.06), transparent 80%)`
       }}
     />
    
     {/* Background Mesh Grid */}
     <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
       style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
     </div>


     {/* --- Hero Section --- */}
     <section className="relative pt-32 md:pt-48 pb-12 md:pb-20 px-6">
       <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
           <div className="relative z-10">
               <FadeIn>
                   <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                       <span className="relative flex h-2 w-2">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                       </span>
                       <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Available for new projects</span>
                   </div>
               </FadeIn>
              
               <FadeIn delay={200}>
                   <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] text-white">
                       Start <br/>
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-blue-light to-white animate-gradient-x">Something</span> <br/>
                       <span className="italic font-serif font-light text-slate-400">Epic.</span>
                   </h1>
               </FadeIn>


               <FadeIn delay={400}>
                   <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mb-12 border-l-2 border-brand-blue pl-6">
                       You have the vision. We have the engineering firepower. Let's merge them to build software that defines the future.
                   </p>
               </FadeIn>


               <FadeIn delay={600}>
                   <div className="flex gap-8">
                       <div>
                           <p className="text-3xl font-bold text-white">2h</p>
                           <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Avg Response</p>
                       </div>
                       <div>
                           <p className="text-3xl font-bold text-white">100%</p>
                           <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Confidentiality</p>
                       </div>
                   </div>
               </FadeIn>
           </div>


           {/* Interactive 3D Card / Map Area */}
           <div className="relative h-[400px] md:h-[600px] w-full hidden lg:block">
               <FadeIn delay={400} className="w-full h-full">
                   <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-yellow/10 rounded-[3rem] blur-3xl opacity-30 animate-pulse-slow"></div>
                   <div className="relative w-full h-full bg-brand-dark/80 backdrop-blur-2xl border border-glass-white-10 rounded-[3rem] overflow-hidden shadow-2xl group">
                       {/* Map Overlay */}
                       <div className="absolute inset-0 opacity-40 mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-700 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
                      
                       {/* Floating Cards */}
                       <div className="absolute bottom-10 left-10 right-10 flex gap-4">
                           <div className="flex-1 bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-black/80 transition-colors">
                               <MapPin className="text-brand-blue mb-4" size={24} />
                               <h3 className="font-bold text-lg text-white">Bengaluru, India</h3>
                               <p className="text-sm text-slate-400">Global HQ</p>
                           </div>
                       </div>


                       {/* Animated Grid Lines */}
                       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                   </div>
               </FadeIn>
           </div>
       </div>
     </section>


     {/* --- Main Interactive Section --- */}
     <section className="relative py-12 md:py-20 px-4 md:px-6">
       <div className="max-w-[85rem] mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
               {/* Left: Contact Grid */}
               <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6 order-2 lg:order-1">
                   <FadeIn delay={200}>
                       <ContactCard
                           icon={Mail}
                           title="Direct Line"
                           value="hello@kirynex.agency"
                           subtext="For general inquiries & partnerships"
                       />
                   </FadeIn>
                   <FadeIn delay={300}>
                        <ContactCard
                           icon={MessageSquare}
                           title="Support"
                           value="Start Live Chat"
                           subtext="Average wait time: 3 mins"
                       />
                   </FadeIn>
                   <FadeIn delay={400}>
                       <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-[50px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                           <Sparkles className="mb-6 text-brand-yellow" size={32} />
                           <h3 className="text-2xl font-bold mb-2">Join the Team</h3>
                           <p className="text-blue-100 text-sm mb-6">We are looking for obsessive engineers and designers.</p>
                           <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:gap-3 transition-all">
                               View Openings <ArrowRight size={16} />
                           </button>
                       </div>
                   </FadeIn>
               </div>


               {/* Right: The "Cockpit" Form - Optimized for Mobile */}
               <div className="lg:col-span-8 order-1 lg:order-2">
                   <FadeIn delay={400} className="h-full">
                       <div className="h-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] md:rounded-[3rem] p-5 md:p-12 relative overflow-hidden flex flex-col justify-center">
                           {/* Decorative Elements */}
                           <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
                               <Cpu size={64} className="text-white animate-spin-slow" />
                           </div>


                           <div className="relative z-10 mb-6 md:mb-10">
                               <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">Initialize Project</h2>
                               <p className="text-sm md:text-base text-slate-400">Tell us about your goals. We'll handle the engineering.</p>
                           </div>


                           <form className="space-y-3 md:space-y-8 relative z-10">
                               <div className="grid grid-cols-2 gap-3 md:gap-8">
                                   <InputField label="Identity" placeholder="John Doe" />
                                   <InputField label="Organization" placeholder="Acme Inc." />
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
                                   <InputField label="Contact" type="email" placeholder="john@acme.com" />
                                   <div className="group relative">
                                       <label className="absolute -top-2.5 left-3 md:-top-3 md:left-4 bg-brand-dark px-1 md:px-2 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-brand-blue transition-colors z-10">
                                           Interest
                                       </label>
                                       <div className="relative">
                                           <select className="w-full bg-glass-white-5 border border-glass-white-10 rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-5 text-sm md:text-base text-white appearance-none cursor-pointer focus:outline-none focus:border-brand-blue focus:bg-glass-white-10 focus:ring-1 focus:ring-brand-blue transition-all backdrop-blur-sm">
                                               <option className="bg-brand-dark">Web Development</option>
                                               <option className="bg-brand-dark">Mobile Application</option>
                                               <option className="bg-brand-dark">AI Integration</option>
                                               <option className="bg-brand-dark">Product Design</option>
                                           </select>
                                           <ChevronDown className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none w-4 h-4 md:w-5 md:h-5" />
                                       </div>
                                   </div>
                               </div>
                              
                               <InputField label="Brief" isTextArea={true} placeholder="Describe your vision..." />


                               <div className="flex justify-end pt-4">
                                   <MagneticButton className="group bg-white text-black px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-brand-blue hover:text-white hover:shadow-blue flex items-center gap-3 w-full md:w-auto justify-center">
                                       <span className="relative z-10">Launch Request</span>
                                       <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                       <div className="absolute inset-0 bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                                   </MagneticButton>
                               </div>
                           </form>
                       </div>
                   </FadeIn>
               </div>
           </div>
       </div>
     </section>


   </div>
 );
};


export default ContactPage;