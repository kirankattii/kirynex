"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Fingerprint, Globe, Smartphone } from "lucide-react";

export const OurServiceSection = () => {
    return (
      <section id="services" className="py-32 px-6 bg-white text-black rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">
              Our <br/> Domain
            </h2>
            <p className="text-xl max-w-sm text-gray-600 mb-2">
              We don't do everything. We do these things perfectly.
            </p>
          </div>
  
          <div className="grid md:grid-cols-3 gap-6 auto-rows-[350px]">
            {/* Card 1 */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-2 bg-gray-100 rounded-[2rem] p-10 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={20} />
              </div>
              <Globe className="w-12 h-12 mb-6" />
              <h3 className="text-4xl font-bold mb-4">Web Platforms</h3>
              <p className="text-gray-500 text-lg max-w-md relative z-10">High-performance React applications that rank high and load fast. We obsess over Core Web Vitals.</p>
              <img src="https://images.unsplash.com/photo-1481487484168-9b930d55208d?q=80&w=1000&auto=format&fit=crop" className="absolute bottom-0 right-0 w-1/2 opacity-20 group-hover:opacity-40 transition-opacity mix-blend-multiply" alt="web" />
            </motion.div>
  
            {/* Card 2 */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="bg-black text-white rounded-[2rem] p-10 flex flex-col justify-between relative overflow-hidden group"
            >
              <div>
                <Smartphone className="w-12 h-12 mb-6 text-blue-500" />
                <h3 className="text-3xl font-bold">Mobile Native</h3>
              </div>
              <p className="text-gray-400">iOS & Android apps with 60fps animations and offline-first capabilities.</p>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
  
            {/* Card 3 */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="bg-blue-600 text-white rounded-[2rem] p-10 flex flex-col justify-between group"
            >
               <div>
                 <Cpu className="w-12 h-12 mb-6 text-white" />
                 <h3 className="text-3xl font-bold">AI Systems</h3>
               </div>
               <p className="text-blue-100">Custom LLM integration, chatbots, and predictive analytics dashboards.</p>
            </motion.div>
  
            {/* Card 4 */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-2 bg-gray-100 rounded-[2rem] p-10 relative overflow-hidden group"
            >
              <div className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={20} />
              </div>
              <Fingerprint className="w-12 h-12 mb-6" />
              <h3 className="text-4xl font-bold mb-4">Brand & UI/UX</h3>
              <p className="text-gray-500 text-lg max-w-md">Identity design that cuts through the noise. We build design systems, not just pages.</p>
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" className="absolute top-0 right-0 h-full w-1/2 object-cover opacity-10 grayscale group-hover:grayscale-0 transition-all duration-700" alt="design" />
            </motion.div>
          </div>
        </div>
      </section>
    );
  };