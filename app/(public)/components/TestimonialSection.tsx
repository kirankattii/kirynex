"use client";
import React from 'react';
import { Cpu } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

export  const TestimonialSection = () => {
  return (
    <section className="py-24 md:py-40 bg-white relative overflow-hidden">
       {/* Decorative Background Blob */}
       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />

       <div className="max-w-5xl mx-auto px-6 relative z-10">
         <FadeIn>
           <div className="mb-12">
              <Cpu className="w-12 h-12 text-blue-600 mb-6" />
              <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
                "We approached NexGen for code. We received a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-400">digital masterpiece</span>."
              </h2>
           </div>
           <div className="flex items-center gap-4">
             {/* Placeholder Avatar */}
             <div className="w-12 h-12 bg-slate-900 rounded-full overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=11" alt="CEO" className="w-full h-full object-cover" />
             </div>
             <div>
               <p className="font-bold text-lg text-slate-900">Karthik</p>
               <p className="text-slate-500">CEO, Kirynex</p>
             </div>
           </div>
         </FadeIn>
       </div>
     </section>
  );
};
