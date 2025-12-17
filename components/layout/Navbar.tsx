"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Zap, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectModal } from "@/hooks/useProjectModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { openModal } = useProjectModal();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!mobileMenuOpen) return;

      const target = event.target as HTMLElement;
      
      // Check if click is outside both the menu and the menu button
      const isClickOutsideMenu = menuRef.current && !menuRef.current.contains(target);
      const isClickOnButton = menuButtonRef.current && menuButtonRef.current.contains(target);
      
      if (isClickOutsideMenu && !isClickOnButton) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Technology", path: "/technology" },
    { name: "Blogs", path: "/blogs" },
  ];

  // Animation Variants
  const menuVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: -20,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10, 
      filter: "blur(10px)",
      transition: { duration: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <nav
      className={`fixed top-3 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%] max-w-5xl transition-all duration-500 ease-[0.16,1,0.3,1]`}
    >
      <div
        className={`px-4 md:px-6 py-3 md:py-4 rounded-full flex items-center justify-between transition-all duration-500 border ${
          isScrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-lg border-white/20"
            : "bg-[#0B1120]/80 backdrop-blur-xl shadow-2xl border-white/10"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 cursor-pointer group z-50">
          <div
            className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-colors shadow-inner ${
              isScrolled ? "bg-blue-600 text-white" : "bg-white text-[#0B1120]"
            }`}
          >
            <Zap size={16} className="fill-current" />
          </div>

          <span
            className={`font-bold tracking-tight text-lg ${
              isScrolled ? "text-slate-900" : "text-white"
            }`}
          >
            Kirynex
          </span>
        </Link>

        {/* Desktop Links */}
        <div
          className={`hidden md:flex items-center gap-8 text-sm font-medium ${
            isScrolled ? "text-slate-600" : "text-white/80"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`transition-all hover:-translate-y-0.5 inline-block relative group ${
                pathname === link.path
                  ? isScrolled ? "text-blue-600 font-semibold" : "text-yellow-400 font-semibold"
                  : "hover:text-blue-500"
              }`}
            >
              {link.name}
              {pathname === link.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-current rounded-full" />
              )}
            </Link>
          ))}
          
          <Link
            href="/contact"
            className={`transition-colors hover:scale-105 transform inline-block ${
              pathname === "/contact"
                ? isScrolled ? "text-blue-600 font-semibold" : "text-yellow-400 font-semibold"
                : "hover:text-blue-500"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const phoneNumber = "919108724443";
              const message = encodeURIComponent("Hi! I'd like to discuss your services.");
              window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
            }}
            className={`hidden md:flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-md ${
              isScrolled
                ? "bg-[#0B1120] text-white hover:bg-blue-600"
                : "bg-yellow-400 text-[#0B1120] hover:bg-white"
            }`}
          >
            Let's Talk <ArrowRight size={14} />
          </button>

          {/* Mobile Button */}
          <button
            ref={menuButtonRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-all active:scale-95 ${
              isScrolled 
                ? "bg-slate-100 text-slate-900 hover:bg-slate-200" 
                : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
            }`}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Modern Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 right-0 mt-2 p-3 md:hidden"
          >
            <div className="bg-[#0f172a]/98 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden ring-1 ring-black/5">
              
              {/* Main Links */}
              <div className="p-3 space-y-2">
                {navLinks.map((link) => (
                  <motion.div key={link.path} variants={itemVariants}>
                    <Link
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3 py-2 rounded-2xl transition-all group ${
                        pathname === link.path
                          ? "bg-white/10 text-yellow-400"
                          : "hover:bg-white/5 text-slate-300 hover:text-white"
                      }`}
                    >
                      <span className="font-semibold text-lg tracking-tight">{link.name}</span>
                      <ChevronRight 
                        size={18} 
                        className={`transition-transform duration-300 ${
                          pathname === link.path ? "text-yellow-400 translate-x-0" : "text-slate-500 -translate-x-2 group-hover:translate-x-0"
                        }`} 
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Secondary Actions Grid */}
              <motion.div 
                variants={itemVariants} 
                className="grid grid-cols-2 gap-2 p-4 pt-0"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    // If we're on the home page, just scroll
                    if (pathname === '/') {
                      const element = document.getElementById('aisolutions');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    } else {
                      // If we're on another page, navigate to home then scroll
                      router.push('/');
                      setTimeout(() => {
                        const element = document.getElementById('aisolutions');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 300);
                    }
                  }}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/5 hover:border-white/20 transition-all text-center group"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Zap size={16} />
                  </div>
                  <span className="text-xs font-bold text-blue-200">AI Assistant</span>
                </button>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-center group"
                >
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                    <ArrowRight size={16} />
                  </div>
                  <span className="text-xs font-bold text-yellow-200">Contact Us</span>
                </Link>
              </motion.div>

              {/* Footer Note */}
              <motion.div 
                variants={itemVariants}
                className="px-6 pb-6 text-center"
              >
                <button onClick={openModal} className="w-full py-4 bg-white text-[#0B1120] rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg shadow-white/5">
                  Start a Project
                </button>
                <p className="mt-4 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                  Designed in Bengaluru
                </p>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}