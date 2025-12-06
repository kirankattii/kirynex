"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from 'framer-motion';
import { ArrowUpRight, Zap, BarChart3, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

// --- Types ---

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  theme: string; // Hex color for accent
  description: string;
  icon: React.ElementType;
}

// --- Data (Limited to 3 for the layout) ---

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "NeoBank Prime",
    category: "Fintech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
    theme: "#2563eb", // Kirynex Blue
    description: "Reimagining personal banking with AI-driven insights.",
    icon: BarChart3
  },
  {
    id: 2,
    title: "LuxeMarket",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1470&auto=format&fit=crop",
    theme: "#facc15", // Kirynex Yellow
    description: "A premium shopping experience for curated luxury goods.",
    icon: ShoppingBag
  },
  {
    id: 3,
    title: "Vitality Health",
    category: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1470&auto=format&fit=crop",
    theme: "#10b981", // Emerald
    description: "Holistic health tracking connected to wearable devices.",
    icon: Zap
  }
];

// --- Components ---

/**
 * Realistic Mobile Device Frame Component
 * Accepts yOffset for parallax control
 */
const MobileMockup = ({ project, index, yOffset }: { project: Project; index: number; yOffset: MotionValue<number> }) => {
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        y: yOffset, // Apply the smooth parallax scroll here
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group w-full max-w-[360px] mx-auto perspective-1000"
    >
      {/* Device Chassis */}
      <div className="relative z-10 bg-gray-900 rounded-[3rem] p-3 shadow-2xl border border-gray-800 ring-1 ring-white/10 overflow-hidden transform transition-all duration-500 hover:shadow-blue-500/20">
        
        {/* Screen Bezel */}
        <div className="relative bg-black rounded-[2.5rem] overflow-hidden w-full aspect-[9/17] border-[6px] border-black">
          
          {/* Dynamic Island / Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30 flex items-center justify-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-800/80"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-900/50"></div>
          </div>

          {/* Screen Content */}
          <div className="w-full h-full relative bg-gray-50 overflow-hidden group-hover:scale-105 transition-transform duration-700">
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60" />
            
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />

            {/* In-Screen UI Elements */}
            <div className="absolute top-0 left-0 w-full p-6 pt-16 z-20">
               <div className="flex justify-between items-center mb-6">
                 <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                   <project.icon className="w-4 h-4 text-white" />
                 </div>
                 <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md"></div>
               </div>
               <div className="space-y-3">
                  <div className="w-2/3 h-8 bg-white/90 rounded-lg backdrop-blur-sm shadow-sm" />
                  <div className="w-1/2 h-4 bg-white/50 rounded-md backdrop-blur-sm" />
               </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 z-20 pb-10">
               <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl text-white"
               >
                 <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                 <p className="text-xs text-gray-200 line-clamp-2">{project.description}</p>
                 <div className="mt-3 flex items-center text-xs font-medium" style={{ color: project.theme }}>
                    View Case Study <ArrowUpRight className="w-3 h-3 ml-1" />
                 </div>
               </motion.div>
            </div>
          </div>
          
          {/* Glass Reflection Overlay */}
          <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />
        </div>
      </div>

      {/* Background Glows */}
      <div 
        className="absolute -z-10 top-1/4 -right-12 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"
        style={{ backgroundColor: project.theme }}
      />
      <div 
        className="absolute -z-10 bottom-1/4 -left-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"
        style={{ backgroundColor: '#2563eb' }}
      />
    </motion.div>
  );
};

const BackgroundGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
    <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-yellow-400 opacity-10 blur-[100px]"></div>
  </div>
);

export default function MobileAnimations() {
  const containerRef = useRef(null);
  
  // Track scroll progress relative to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth out the scroll progress for a buttery feel
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // Parallax Values
  // Slow: Moves slightly up relative to scroll (creating standard depth)
  const ySlow = useTransform(smoothProgress, [0, 1], [0, -50]);
  
  // Fast: Moves significantly up relative to scroll (creates a rushing effect)
  // Starts lower (100px) and ends higher (-200px)
  const yFast = useTransform(smoothProgress, [0, 1], [100, -200]);

  return (
    <div className="relative w-full bg-slate-950 text-slate-900 overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-50 z-0" />
      <BackgroundGrid />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-16" ref={containerRef}>
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-sm font-semibold text-blue-700 tracking-wide uppercase">Portfolio</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6"
          >
            Our Work Speaks <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              For Itself.
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed"
          >
            A glimpse of the world-class digital experiences we create. 
            Merging strategy, design, and technology to build brands that matter.
          </motion.p>
        </div>

        {/* Device Showcase Grid (3 Items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 items-start">
          {PROJECTS.map((project, index) => {
             // Logic: Index 1 (Middle) is Fast, Index 0 & 2 are Slow
             const isMiddle = index === 1;
             const parallaxValue = isMiddle ? yFast : ySlow;

             return (
               <MobileMockup 
                 key={project.id} 
                 project={project} 
                 index={index} 
                 yOffset={parallaxValue}
               />
             );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 md:mt-14 text-center"
        >
          <Link href="/portfolio" className="inline-group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-slate-900 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-800 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl">
            View All Projects
            <ArrowUpRight className="ml-2 w-5 h-5" />
            <div className="absolute -inset-3 rounded-xl bg-gradient-to-r from-blue-600 to-yellow-400 opacity-20 blur-lg transition-all duration-200 group-hover:opacity-40" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}