"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl 
        transition-all duration-500 ease-[0.16,1,0.3,1]`}
    >
      <div
        className={`px-6 py-4 rounded-full flex items-center justify-between transition-all duration-500 border ${
          isScrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-lg border-white/20"
            : "bg-brand-dark/90 backdrop-blur-xl shadow-2xl border-white/10"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isScrolled ? "bg-brand-blue text-white" : "bg-white text-brand-dark"
            }`}
          >
            <Zap size={16} />
          </div>

          <span
            className={`font-bold tracking-tight text-lg ${
              isScrolled ? "text-slate-900" : "text-white"
            }`}
          >
            Lumina
          </span>
        </div>

        {/* Desktop Links */}
        <div
          className={`hidden md:flex items-center gap-8 text-sm font-medium ${
            isScrolled ? "text-slate-500" : "text-white/80"
          }`}
        >
          {["Work", "Services", "Process", "About"].map((item) => (
            <Link
              key={item}
              href="#"
              className="hover:text-brand-blue transition-colors hover:scale-105 transform inline-block"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button
            className={`hidden md:block px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 ${
              isScrolled
                ? "bg-brand-dark text-white hover:bg-brand-blue"
                : "bg-brand-yellow text-brand-dark hover:bg-white"
            }`}
          >
            Let's Talk
          </button>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${isScrolled ? "text-slate-900" : "text-white"} md:hidden`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 bg-brand-dark text-white rounded-2xl p-6 shadow-xl backdrop-blur-xl border border-white/10">
          <ul className="flex flex-col gap-4 text-center text-lg">
            {["Work", "Services", "Process", "About"].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-brand-yellow transition">
                  {item}
                </Link>
              </li>
            ))}

            <button className="mt-4 w-full bg-brand-blue py-3 rounded-full font-bold hover:bg-brand-blue-dark transition">
              Let's Talk
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
}
