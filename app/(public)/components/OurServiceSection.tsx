"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Fingerprint, Globe, Smartphone, Layers, Sparkles } from "lucide-react";

// --- Visual Components for "Video-like" Interactivity ---

const WebAnimation = () => (
  <div className="absolute inset-0 bg-slate-900 flex flex-col p-4 overflow-hidden">
    {/* Browser Header */}
    <div className="flex gap-1.5 mb-3 opacity-50">
      <div className="w-2 h-2 rounded-full bg-red-500" />
      <div className="w-2 h-2 rounded-full bg-yellow-500" />
      <div className="w-2 h-2 rounded-full bg-green-500" />
    </div>
    {/* Animated Code Lines */}
    <div className="space-y-2">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: i * 0.1, 
            repeat: Infinity, 
            repeatDelay: 3,
            repeatType: "reverse"
          }}
          className="h-2 rounded-full bg-slate-800"
          style={{ width: `${Math.random() * 60 + 30}%` }}
        />
      ))}
    </div>
    {/* Floating Window */}
    <motion.div
      animate={{ y: [20, 0, 20] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-4 bottom-4 w-32 h-24 bg-[#2563eb] rounded-lg shadow-2xl border border-white/10 opacity-80"
    />
  </div>
);

const MobileAnimation = () => (
  <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
    {/* Grid Background */}
    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]"></div>
    
    {/* Phone Mockup */}
    <motion.div
      whileHover={{ scale: 1.05, rotate: -5 }}
      animate={{ rotate: [0, -2, 0] }} // Subtle float for mobile
      transition={{ 
        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 300 }
      }}
      className="relative w-32 h-56 bg-zinc-900 rounded-[2rem] border-[4px] border-zinc-800 shadow-2xl overflow-hidden"
    >
      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black rounded-full z-20" />
      
      {/* App Content Animation */}
      <motion.div 
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="w-full space-y-2 p-3 pt-6"
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full h-16 bg-zinc-800/50 rounded-xl border border-white/5 flex items-center gap-2 px-2">
             <div className="w-8 h-8 rounded-full bg-blue-500/20" />
             <div className="space-y-1 flex-1">
                <div className="w-3/4 h-2 bg-zinc-700 rounded-full" />
                <div className="w-1/2 h-2 bg-zinc-800 rounded-full" />
             </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
    
    {/* Floating Notifications */}
    <motion.div
       animate={{ x: [50, 0], opacity: [0, 1] }}
       transition={{ delay: 0.5, duration: 0.8 }}
       className="absolute top-10 right-4 w-12 h-12 bg-green-500 rounded-xl blur-lg opacity-40"
    />
  </div>
);

const AIAnimation = () => (
  <div className="absolute inset-0 bg-blue-600 overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-transparent opacity-80" />
    
    {/* Pulsing Core */}
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-24 h-24 bg-white/20 rounded-full blur-2xl"
    />
    
    {/* Orbiting Nodes */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-full h-full border border-white/10 rounded-full"
        style={{ width: 100 + i * 60, height: 100 + i * 60 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      >
        <div className="w-3 h-3 bg-white rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      </motion.div>
    ))}
    
    <div className="relative z-10 font-mono text-xs text-blue-200 bg-black/20 backdrop-blur px-2 py-1 rounded">
      AI_PROCESSING...
    </div>
  </div>
);

const BrandAnimation = () => (
  <div className="absolute inset-0 bg-gray-50 flex items-center justify-center overflow-hidden">
     {/* Floating Color Palettes */}
     {[
       { color: "#2563eb", x: -40, y: -20, delay: 0 },
       { color: "#facc15", x: 40, y: -40, delay: 0.2 },
       { color: "#10b981", x: -20, y: 40, delay: 0.4 },
       { color: "#f43f5e", x: 30, y: 30, delay: 0.6 },
     ].map((item, i) => (
       <motion.div
         key={i}
         initial={{ scale: 0, opacity: 0 }}
         whileInView={{ scale: 1, opacity: 1, x: item.x, y: item.y }}
         whileHover={{ scale: 1.1, zIndex: 10 }}
         animate={{ 
            y: [item.y, item.y - 10, item.y],
            rotate: [0, 5, 0]
         }}
         transition={{ 
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
            scale: { type: "spring", stiffness: 200, delay: item.delay }
         }}
         className="absolute w-20 h-20 rounded-2xl shadow-xl flex items-center justify-center border-4 border-white backdrop-blur-sm"
         style={{ backgroundColor: item.color }}
       >
         <Fingerprint className="text-white/50 w-8 h-8" />
       </motion.div>
     ))}
  </div>
);


export default function AnimationPageFour() {
    return (
      <div className="bg-white min-h-screen">
      <section id="services" className="pt-12 md:pt-24 pb-24 md:pb-32 px-6 text-slate-900 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-auto"
            >
              <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                Capabilities
              </div>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
                Our <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Domain.</span>
              </h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl max-w-sm text-slate-500 mb-2 font-light mt-6 md:mt-0"
            >
              We don't try to do everything. We specialize in building the digital future perfectly.
            </motion.p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[auto] md:auto-rows-[350px]">
            
            {/* Card 1: Web Platforms */}
            <motion.div 
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="md:col-span-2 bg-slate-950 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group cursor-pointer text-white flex flex-col justify-between min-h-[350px]"
            >
              {/* Animation: Always visible (100% opacity) */}
              <div className="absolute top-0 right-0 w-full md:w-[60%] h-full opacity-100 transition-opacity duration-700 ease-in-out">
                 <div className="w-full h-full [mask-image:linear-gradient(to_left,black,transparent)] md:[mask-image:linear-gradient(to_left,black,transparent)]">
                    <WebAnimation />
                 </div>
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                   <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Web Platforms</h3>
                <p className="text-slate-400 text-base md:text-lg max-w-md">
                    High-performance Next.js applications that feel instant. 
                    We obsess over Core Web Vitals, SEO, and fluid interactions.
                </p>
              </div>

              <motion.div 
                className="absolute top-6 right-6 bg-white/10 p-3 rounded-full opacity-100 transition-opacity backdrop-blur-md"
                whileHover={{ rotate: 45 }}
              >
                <ArrowUpRight size={20} />
              </motion.div>
            </motion.div>
  
            {/* Card 2: Mobile Native */}
            <motion.div 
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-zinc-100 rounded-[2.5rem] p-8 relative overflow-hidden group cursor-pointer flex flex-col justify-between min-h-[350px]"
            >
              {/* Animation: Always visible (100% opacity) */}
              <div className="absolute inset-0 opacity-100 transition-opacity duration-500">
                <MobileAnimation />
              </div>

              <div className="relative z-10 pointer-events-none">
                <div className="w-12 h-12 bg-white/20 rounded-2xl shadow-sm flex items-center justify-center mb-6 backdrop-blur-sm">
                    <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Mobile Native</h3>
              </div>
              <p className="text-white/90 relative z-10 pointer-events-none text-base md:text-lg">
                 iOS & Android apps with 60fps animations and offline-first capabilities.
              </p>
              
              {/* Gradient Overlay for text readability - visible by default */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 pointer-events-none" />
            </motion.div>
  
            {/* Card 3: AI Systems */}
            <motion.div 
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 rounded-[2.5rem] p-8 relative overflow-hidden group cursor-pointer flex flex-col justify-between text-white min-h-[350px]"
            >
               {/* Animation: Always visible (100% opacity) */}
               <div className="absolute inset-0 opacity-100 transition-opacity duration-700">
                 <AIAnimation />
               </div>

               <div className="relative z-10 pointer-events-none">
                 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                    <Cpu className="w-6 h-6 text-white" />
                 </div>
                 <h3 className="text-3xl font-bold">AI Systems</h3>
               </div>
               <p className="text-blue-100 relative z-10 pointer-events-none text-base md:text-lg">
                  Custom LLM integration, chatbots, and predictive analytics dashboards.
               </p>
            </motion.div>
  
            {/* Card 4: Brand & UI/UX */}
            <motion.div 
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="md:col-span-2 bg-slate-50 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group cursor-pointer flex flex-col md:flex-row items-center justify-between min-h-[350px]"
            >
              {/* Animation: Always visible (100% opacity) */}
              <div className="absolute inset-0 opacity-100 transition-opacity duration-500">
                  <BrandAnimation />
              </div>
              
              <div className="relative z-10 max-w-md pointer-events-none">
                <div className="w-12 h-12 bg-white/95 shadow-lg rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                    <Layers className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-4xl font-bold mb-4 text-slate-900 drop-shadow-sm">Brand & UI/UX</h3>
                <p className="text-slate-700 text-base md:text-lg font-medium drop-shadow-sm">
                    Identity design that cuts through the noise. We build comprehensive design systems, 
                    not just static pages.
                </p>
              </div>
              
              {/* Dark overlay for better text contrast */}
              <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-[2.5rem]" />

              {/* Decorative Pill */}
              <div className="hidden sm:flex relative z-10 bg-white px-6 py-3 rounded-full shadow-lg items-center gap-3 border border-slate-100 group-hover:scale-105 transition-transform mt-6 md:mt-0">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-slate-900">Pixel Perfect</span>
              </div>
            </motion.div>
          </div>
      </section>
      </div>
    );
}