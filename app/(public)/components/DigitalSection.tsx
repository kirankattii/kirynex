"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Layers,
  Zap,
  CheckCircle2,
  Code,
  AlertTriangle,
  BarChart3,
  Users,
  Activity,
  Settings,
  Bell,
  Search,
  Menu
} from 'lucide-react';

// --- Utility Components ---

const FadeIn = ({
  children,
  delay = 0,
  direction = 'up',
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'none';
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      if (direction === 'up') return 'translateY(40px)';
      if (direction === 'down') return 'translateY(-40px)';
      return 'none';
    }
    return 'translateY(0)';
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// --- Dashboard UI Components ---

const LegacyDashboard = () => (
  <div className="w-full h-full bg-[#e2e8f0] font-mono text-[8px] sm:text-[9px] md:text-xs text-slate-600 overflow-hidden relative select-none flex flex-col">
    {/* Cluttered Header */}
    <div className="bg-[#475569] text-white p-1.5 sm:p-2 flex justify-between items-center border-b-2 sm:border-b-4 border-slate-500 shadow-sm shrink-0 h-9 sm:h-10">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-slate-300 border border-slate-600"></div>
        <span className="truncate text-[8px] sm:text-[9px]">SYS_V2.1</span>
      </div>
      <div className="flex gap-1.5 sm:gap-2 md:gap-4">
        <span className="underline cursor-pointer hidden sm:inline text-[8px] sm:text-[9px]">Help</span>
        <span className="underline cursor-pointer text-[8px] sm:text-[9px]">Logout</span>
      </div>
    </div>

    <div className="flex flex-1 overflow-hidden">
      {/* Old Sidebar */}
      <div className="w-16 sm:w-20 md:w-32 bg-[#cbd5e1] border-r-2 border-slate-400 p-1 sm:p-2 flex flex-col gap-0.5 sm:gap-1 shadow-inner shrink-0">
        <div className="bg-slate-300 border border-slate-500 p-0.5 sm:p-1 text-center font-bold mb-0.5 sm:mb-1 md:mb-2 text-[7px] sm:text-[8px]">MENU</div>
        {['Overview', 'Reports', 'Entry', 'Logs', 'Users', 'Config'].map(i => (
          <div key={i} className="bg-[#e2e8f0] border border-slate-500 p-0.5 sm:p-1 cursor-pointer hover:bg-white truncate text-[7px] sm:text-[8px]">
            {i}
          </div>
        ))}
        <div className="mt-auto bg-amber-100 border border-amber-400 p-0.5 sm:p-1 text-[7px] sm:text-[8px] md:text-[9px] leading-tight">
          <AlertTriangle size={8} className="inline mr-0.5 sm:mr-1 text-amber-600 sm:w-[10px] sm:h-[10px]" />
          Update Req.
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white p-1.5 sm:p-2 md:p-4 relative overflow-y-auto">
        <div className="border border-slate-400 bg-slate-100 p-0.5 sm:p-1 mb-1.5 sm:mb-2 md:mb-4 flex justify-between items-center">
          <span className="font-bold truncate mr-1 sm:mr-2 text-[8px] sm:text-[9px]">DATA_VIEW</span>
          <button className="bg-slate-300 border border-slate-500 px-1 sm:px-2 text-[7px] sm:text-[8px] md:text-[9px] active:bg-slate-400 whitespace-nowrap cursor-pointer">EXPORT</button>
        </div>

        {/* Ugly Table */}
        <div className="border border-slate-400 mb-1.5 sm:mb-2 md:mb-4 w-full">
          <div className="grid grid-cols-4 bg-slate-300 border-b border-slate-400 font-bold text-center">
            <div className="border-r border-slate-400 p-0.5 sm:p-1 text-[7px] sm:text-[8px]">ID</div>
            <div className="border-r border-slate-400 p-0.5 sm:p-1 text-[7px] sm:text-[8px]">USR</div>
            <div className="border-r border-slate-400 p-0.5 sm:p-1 text-[7px] sm:text-[8px]">STAT</div>
            <div className="p-0.5 sm:p-1 text-[7px] sm:text-[8px]">ACT</div>
          </div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`grid grid-cols-4 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b border-slate-200 text-center`}>
              <div className="border-r border-slate-300 p-0.5 sm:p-1 truncate text-[7px] sm:text-[8px]">#{2400 + i}</div>
              <div className="border-r border-slate-300 p-0.5 sm:p-1 truncate text-[7px] sm:text-[8px]">u_{i}</div>
              <div className="border-r border-slate-300 p-0.5 sm:p-1 text-[7px] sm:text-[8px]">{i % 3 === 0 ? 'ERR' : 'OK'}</div>
              <div className="p-0.5 sm:p-1 text-blue-800 underline text-[7px] sm:text-[8px]">Edit</div>
            </div>
          ))}
        </div>

        <div className="bg-red-50 border border-red-200 text-red-800 p-0.5 sm:p-1 md:p-2 text-center text-[7px] sm:text-[8px] md:text-[10px] animate-pulse">
          ⚠ CRITICAL: Server load at 98%
        </div>
      </div>
    </div>
  </div>
);

const ModernDashboard = () => (
  <div className="w-full h-full bg-[#0b1121] text-slate-300 overflow-hidden relative select-none font-sans flex flex-col">
    {/* Background Gradients */}
    <div className="absolute top-0 right-0 w-[150px] sm:w-[200px] md:w-[300px] h-[150px] sm:h-[200px] md:h-[300px] bg-blue-500/10 rounded-full blur-[50px] sm:blur-[60px] md:blur-[80px] pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-[120px] sm:w-[150px] md:w-[200px] h-[120px] sm:h-[150px] md:h-[200px] bg-purple-500/10 rounded-full blur-[30px] sm:blur-[40px] md:blur-[60px] pointer-events-none"></div>

    {/* Modern Header */}
    <div className="relative z-10 flex justify-between items-center p-2 sm:p-3 md:p-6 border-b border-white/5 h-12 sm:h-14 md:h-20 shrink-0">
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Zap size={12} className="text-white fill-current sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
        </div>
        <span className="font-bold text-white tracking-wide text-[10px] sm:text-xs md:text-base">Kirynex<span className="text-blue-500 font-normal">OS</span></span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
        <div className="relative">
          <Bell size={14} className="text-slate-400 hover:text-white transition-colors sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
          <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full border border-[#0b1121]"></span>
        </div>
        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <div className="flex flex-1 overflow-hidden">
      {/* Modern Sidebar (Responsive visibility) */}
      <div className="hidden md:flex w-16 lg:w-48 flex-col gap-2 p-4 border-r border-white/5 z-10 shrink-0">
        {[
          { icon: <BarChart3 size={20} />, label: 'Dashboard', active: true },
          { icon: <Users size={20} />, label: 'Customers', active: false },
          { icon: <Activity size={20} />, label: 'Analytics', active: false },
          { icon: <Settings size={20} />, label: 'Settings', active: false }
        ].map((item, i) => (
          <div key={i} className={`p-3 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${item.active ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'hover:bg-white/5 text-slate-500 hover:text-slate-300'}`}>
            {item.icon}
            <span className="hidden lg:block text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2 sm:p-3 md:p-6 overflow-y-auto overflow-x-hidden flex flex-col gap-2.5 sm:gap-4 md:gap-6 relative z-10 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {[
            { label: 'Revenue', val: '$124k', trend: '+12%', color: 'from-blue-500/20 to-purple-500/20', border: 'border-blue-500/20' },
            { label: 'Users', val: '14.2k', trend: '+5%', color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/20' },
            { label: 'Load', val: '24%', trend: 'Optimal', color: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/20' }
          ].map((stat, i) => (
            <div key={i} className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br ${stat.color} border ${stat.border} backdrop-blur-sm`}>
              <div className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider opacity-60 mb-0.5 sm:mb-0.5 md:mb-1">{stat.label}</div>
              <div className="text-sm sm:text-lg md:text-2xl font-bold text-white">{stat.val}</div>
            </div>
          ))}
        </div>

        {/* Modern Chart Section */}
        <div className="flex-1 min-h-[120px] sm:min-h-[160px] bg-slate-900/50 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/5 p-2.5 sm:p-4 md:p-6 relative overflow-hidden group flex flex-col">
          <div className="flex justify-between items-center mb-2 sm:mb-4 md:mb-6 shrink-0">
            <h4 className="text-[10px] sm:text-xs md:text-sm font-bold text-white">Live Traffic</h4>
            <div className="flex gap-1 sm:gap-1.5 md:gap-2 items-center">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[8px] sm:text-[10px] md:text-xs text-blue-400">Updating</span>
            </div>
          </div>

          {/* CSS Bar Chart (Responsive height) */}
          <div className="flex-1 flex justify-between items-end gap-0.5 sm:gap-1 md:gap-2 px-0.5 sm:px-1 pb-0.5 sm:pb-1">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50, 65, 85].map((h, i) => (
              <div key={i} className="w-full h-full max-h-[80px] sm:max-h-[100px] md:max-h-[150px] bg-slate-800/50 rounded-t-sm relative group-hover:bg-slate-800 transition-colors duration-500 overflow-hidden flex flex-col justify-end">
                <div
                  className="w-full bg-blue-500 rounded-t-sm transition-all duration-1000 ease-out group-hover:bg-blue-400"
                  style={{ height: `${h}%`, opacity: 0.8 }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);


// Custom Comparison Slider Component
const DashboardComparison = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setSliderPosition(percent);
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      // Adaptive aspect ratio: Taller on mobile to prevent content cutoff, standard 16/9 on desktop
      className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/9] rounded-xl sm:rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden cursor-ew-resize select-none shadow-2xl border-[3px] sm:border-[4px] md:border-[6px] border-[#0f172a] group bg-[#0f172a]"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={onMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={onTouchMove}
    >
      {/* Base Layer: Legacy Dashboard */}
      <div className="absolute inset-0 w-full h-full">
        <LegacyDashboard />
        {/* Overlay Label */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-6 bg-slate-200/90 text-slate-800 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-md text-[8px] sm:text-[10px] md:text-sm font-bold border border-slate-300 shadow-sm z-10 pointer-events-none whitespace-nowrap">
          LEGACY SYSTEM
        </div>
      </div>

      {/* Clipped Layer: Modern Dashboard */}
      <div
        className="absolute inset-0 overflow-hidden border-r-2 border-white/50"
        style={{ width: `${sliderPosition}%` }}
      >
        {/* Inner container must be full width of parent to prevent layout shift */}
        <div
          className="absolute top-0 left-0 h-full"
          style={{ width: containerWidth ? `${containerWidth}px` : '100vw' }}
        >
          <ModernDashboard />
        </div>

        {/* Overlay Label */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 bg-[#2563eb] text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-md text-[8px] sm:text-[10px] md:text-sm font-bold shadow-lg border border-white/20 z-10 pointer-events-none whitespace-nowrap">
          KIRYNEX UPGRADE
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)] sm:shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-xl text-[#0f172a] transform transition-transform group-hover:scale-110 active:scale-95">
          <Code size={14} className="sm:w-[18px] sm:h-[18px] md:w-6 md:h-6" />
        </div>
      </div>
    </div>
  );
};


// --- Main Profile Section ---
const KirynexDigitalSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-32 px-4 sm:px-6 md:px-8 bg-[#0f172a] text-white rounded-t-[2rem] sm:rounded-t-[2.5rem] md:rounded-t-[4rem] relative overflow-hidden">
      {/* Background Elements for Depth */}
      <div className="absolute top-0 right-0 w-[200px] sm:w-[300px] md:w-[500px] h-[200px] sm:h-[300px] md:h-[500px] bg-[#2563eb] rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px] opacity-10 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] md:w-[600px] h-[250px] sm:h-[400px] md:h-[600px] bg-[#facc15] rounded-full blur-[70px] sm:blur-[100px] md:blur-[140px] opacity-5 pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="w-full md:w-auto">
              <div className="inline-block px-3 py-1 sm:px-3.5 sm:py-1.5 md:px-4 md:py-1.5 rounded-full border border-[#facc15]/30 bg-[#facc15]/10 text-[#facc15] text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 md:mb-6 backdrop-blur-sm">
                Agency Profile
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-[0.95] sm:leading-[0.9] tracking-tight">
                KIRYNEX <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#facc15]">DIGITAL</span>
              </h2>
            </div>
            <div className="md:max-w-xs text-left md:text-right opacity-50 mt-2 md:mt-0">
              <p className="text-xs sm:text-sm font-mono">EST. 2024</p>
              <p className="text-xs sm:text-sm font-mono">GLOBAL OPERATIONS</p>
            </div>
          </div>
        </FadeIn>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-16 mb-12 sm:mb-16 md:mb-24 border-t border-white/10 pt-8 sm:pt-12 md:pt-16">
          {/* Mission Column */}
          <FadeIn delay={100} className="space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-[#facc15]/10 flex items-center justify-center text-[#facc15] mb-1 sm:mb-2">
              <Globe size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">Our Mission</h3>
            <p className="text-white/60 leading-relaxed text-sm sm:text-base md:text-lg">
              To bridge the gap between complex problems and elegant digital solutions. We prioritize innovation, transparency, and a client-first mindset to build future-ready platforms.
            </p>
          </FadeIn>

          {/* Services Column */}
          <FadeIn delay={200} className="space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-[#2563eb]/20 flex items-center justify-center text-[#2563eb] mb-1 sm:mb-2">
              <Layers size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">What We Do</h3>
            <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 text-white/60 text-sm sm:text-base md:text-lg">
              {[
                "Full-Stack Web Applications",
                "AI Integrations & Automation",
                "Mobile Development (iOS/Android)",
                "UI/UX & Brand Strategy"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 size={14} className="text-[#2563eb] mt-0.5 sm:mt-1 shrink-0 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Why Us Column */}
          <FadeIn delay={300} className="space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center text-white mb-1 sm:mb-2">
              <Zap size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">Why Kirynex?</h3>
            <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
              <div>
                <span className="block text-white font-bold text-sm sm:text-base md:text-lg">Modern Tech Stack</span>
                <span className="text-white/50 text-xs sm:text-sm">React, Tailwind, & Cloud Native.</span>
              </div>
              <div>
                <span className="block text-white font-bold text-sm sm:text-base md:text-lg">Scalable Quality</span>
                <span className="text-white/50 text-xs sm:text-sm">Code that grows with your business.</span>
              </div>
              <div>
                <span className="block text-white font-bold text-sm sm:text-base md:text-lg">Reliable Partners</span>
                <span className="text-white/50 text-xs sm:text-sm">Committed to deadlines & 24/7 support.</span>
              </div>
            </div>
          </FadeIn>
        </div>


        <div className="relative">
          <FadeIn className="w-full">
            <div className="flex flex-col items-center mb-4 sm:mb-6 md:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center px-2">Transforming Vision into Reality</h3>
              <div className="h-0.5 sm:h-1 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-[#2563eb] to-[#facc15] rounded-full mt-2 sm:mt-3 md:mt-4"></div>
            </div>
            <DashboardComparison />
          </FadeIn>
          <p className="text-center text-[9px] sm:text-[10px] md:text-sm text-white/40 mt-4 sm:mt-6 md:mt-8 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium animate-pulse px-2">
            <span className="hidden sm:inline">&larr; Drag slider to see the difference &rarr;</span>
            <span className="sm:hidden">Swipe to compare</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default function DigitalSection() {
  return (
    <div className="min-h-screen bg-white">
      {/* Wrapper to simulate the positioning in the original portfolio and show the rounded top effect */}
      <div className="pt-4 sm:pt-6 md:pt-8 lg:pt-12">
        <KirynexDigitalSection />
      </div>
    </div>
  );
}