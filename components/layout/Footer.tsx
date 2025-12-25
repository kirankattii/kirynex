"use client";
import React, { useState } from 'react';
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram,
  Copy,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Utility: Copy Email Component (Compact Version) ---
const CopyEmail = () => {
  const [copied, setCopied] = useState(false);
  const email = "kirynex1@gmail.com";

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a 
      href={`mailto:${email}`}
      className="group flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-[#2563eb]/10 border border-white/10 hover:border-[#2563eb]/30 rounded-full transition-all duration-300"
    >
      <button
        onClick={handleCopy}
        className="relative w-3.5 h-3.5 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
        aria-label="Copy email"
      >
        <AnimatePresence mode='wait'>
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Check size={12} className="text-green-400" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Copy size={12} className="text-slate-400 group-hover:text-[#2563eb] transition-colors" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <span className="font-mono text-[10px] md:text-xs text-slate-300 group-hover:text-white transition-colors">{copied ? "Copied!" : email}</span>
    </a>
  );
};

// --- Utility: Social Icon (Compact) ---
const SocialIcon = ({ icon: Icon, href }: { icon: any, href: string }) => (
  <a 
    href={href}
    className="text-slate-500 hover:text-white transition-colors p-1"
  >
    <Icon size={16} />
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-[#050912] text-white relative overflow-hidden font-sans selection:bg-[#2563eb] selection:text-white border-t border-white/5">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[100px] bg-[#2563eb] blur-[120px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* LEFT: Brand & Status */}
            <div className="flex items-center gap-4 md:gap-6">
                <h2 className="text-lg font-bold tracking-tight">KIRYNEX</h2>
                <div className="h-4 w-px bg-white/10 hidden md:block"></div>
                <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-green-500/5 border border-green-500/10">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest leading-none">Systems Online</span>
                </div>
            </div>

            {/* CENTER: Compact Nav */}
            <nav className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs md:text-sm font-medium text-slate-400">
                {[
                    { label: 'Services', href: '/services' },
                    { label: 'Work Flow', href: '/work-flow' },
                    { label: 'Technology', href: '/technology' },
                    { label: 'Portfolio', href: '/portfolio' },
                    { label: 'Career', href: '/career' }
                ].map((item) => (
                    <a key={item.label} href={item.href} className="hover:text-white hover:underline decoration-[#2563eb] underline-offset-4 transition-all">
                        {item.label}
                    </a>
                ))}
            </nav>

            {/* RIGHT: Actions */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <CopyEmail />
                <div className="flex gap-3 border-l border-white/10 pl-0 md:pl-6">
                    <SocialIcon icon={Linkedin} href="https://www.linkedin.com/company/kirynex/" />
                    <SocialIcon icon={Twitter} href="https://x.com/kirynex_in" />
                    <SocialIcon icon={Instagram} href="https://www.instagram.com/kirynex/" />
                </div>
            </div>
        </div>

        {/* BOTTOM: Minimal Legal Line */}
        <div className="mt-8 md:mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-mono uppercase tracking-wide">
            <p>© 2025 Kirynex Inc. Bengaluru, India.</p>
            <div className="flex gap-4">
                <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-slate-400 transition-colors">Sitemap</a>
            </div>
        </div>

      </div>
    </footer>
  );
}