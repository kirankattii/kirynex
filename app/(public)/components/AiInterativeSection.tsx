"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Sparkles, Cpu, Clock, 
  Layers, Zap, Shield, ArrowRight, 
  CheckCircle2, Box, BarChart3, Download, FileText, Loader2
} from 'lucide-react';

/**
 * UTILITY & HOOKS
 */

function useOnScreen(ref: React.RefObject<HTMLDivElement | null>, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIntersecting(true);
      },
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return isIntersecting;
}

const RevealOnScroll = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref, "-30px");
  console.log(isVisible);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: '1000ms' }}
      className={`transition-all cubic-bezier(0.16, 1, 0.3, 1) transform ${
        isVisible 
          ? "opacity-100 translate-y-0 blur-0" 
          : "opacity-0 translate-y-12 blur-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Main Component ---

export  const AIInteractiveSection = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [step, setStep] = useState<number>(0); // 0: input, 1: loading, 2: result
  const [loadingText, setLoadingText] = useState("Initializing Neural Network...");
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleAskAI = (e: React.FormEvent<HTMLFormElement>  ) => {
    e.preventDefault();
    if (!prompt) return;
    setStep(1 as const);

    // Simulate AI Latency sequence
    const texts = ["Parsing Requirements...", "Matching Tech Stack...", "Calculating Timeline...", "Generating Architecture..."];
    let i = 0;
    
    const interval = setInterval(() => {
      setLoadingText(texts[i]);
      i++;
      if (i >= texts.length) i = 0;
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      setStep(2 as const);
    }, 2800);
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true as const);
    // Simulate generation delay
    setTimeout(() => {
      setIsDownloading(false as const);
      // In a real app, this would trigger a file download
      alert("Proposal PDF downloaded successfully!");
    }, 1500);
  };

  return (
    <section id="aisolutions" className="py-12 md:py-20 bg-white relative overflow-hidden font-sans border-y border-slate-100">
      
      {/* Background Decor - Scaled for mobile to avoid overwhelming content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-50 rounded-full blur-[80px] md:blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-yellow-50 rounded-full blur-[60px] md:blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column: Text Context */}
          <div className="lg:col-span-4 text-center lg:text-left">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                 <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                 <span className="text-[10px] md:text-xs font-bold tracking-wide text-slate-600 uppercase">AI Strategy Engine</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight text-slate-900 leading-[1.1]">
                Visualize your <br className="hidden md:block"/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-800">next big idea.</span>
              </h2>
              <p className="text-slate-500 text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Not sure where to start? Our AI analyzes your concept and generates a preliminary technical roadmap, stack recommendations, and timeline estimation instantly.
              </p>
              
              <div className="flex flex-col gap-4 items-center lg:items-start">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><Zap size={20} /></div>
                  <span className="font-medium text-sm md:text-base">Instant Architecture Analysis</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 shrink-0"><Clock size={20} /></div>
                  <span className="font-medium text-sm md:text-base">Real-time Timeline Estimation</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Interactive Widget */}
          <div className="lg:col-span-8 w-full">
            <RevealOnScroll delay={200}>
              <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden relative min-h-[450px] md:min-h-[550px] transition-all duration-500 ring-1 ring-slate-100 flex flex-col">
                
                {/* STATE 0: Input */}
                {step === 0 && (
                  <div className="flex flex-col items-center justify-center h-full flex-grow p-6 md:p-12 bg-gradient-to-br from-slate-50 to-white">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-slate-100 transform rotate-3">
                      <Sparkles className="text-yellow-500 w-6 h-6 md:w-8 md:h-8 fill-yellow-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">Describe your Software Concept</h3>
                    <p className="text-sm md:text-base text-slate-500 mb-8 text-center max-w-md">We'll map out the engineering requirements for you.</p>
                    
                    <form onSubmit={handleAskAI} className="w-full max-w-xl relative group">
                      <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative flex items-center bg-white rounded-xl md:rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-200 p-1.5 md:p-2 transition-transform focus-within:scale-[1.01]">
                        <input 
                          type="text" 
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="e.g. A marketplace for vintage watches..."
                          className="w-full bg-transparent text-slate-800 text-base md:text-lg py-3 md:py-4 pl-4 md:pl-6 pr-32 md:pr-40 focus:outline-none placeholder:text-slate-400"
                        />
                        <button 
                          type="submit" 
                          className="absolute right-1.5 md:right-2 bg-slate-900 hover:bg-slate-800 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold transition-all flex items-center gap-2 group/btn text-sm md:text-base"
                        >
                          Analyze <ArrowRight size={16} className="text-yellow-400 group-hover/btn:translate-x-1 transition-transform hidden sm:block" />
                        </button>
                      </div>
                    </form>

                    <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3 text-xs md:text-sm">
                      <span className="text-slate-400 py-1 w-full text-center sm:w-auto">Examples:</span>
                      <button onClick={() => setPrompt("Uber for dog walking")} className="bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-600 hover:border-yellow-400 hover:text-slate-900 transition-all">Uber for X</button>
                      <button onClick={() => setPrompt("Corporate LMS Platform")} className="bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-600 hover:border-yellow-400 hover:text-slate-900 transition-all">LMS Platform</button>
                      <button onClick={() => setPrompt("DeFi Wallet App")} className="bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-600 hover:border-yellow-400 hover:text-slate-900 transition-all">DeFi Wallet</button>
                    </div>
                  </div>
                )}

                {/* STATE 1: Loading */}
                {step === 1 && (
                  <div className="flex flex-col items-center justify-center h-full flex-grow bg-slate-900 text-white relative overflow-hidden min-h-[450px]">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    {/* Animated grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
                    
                    <div className="relative z-10 text-center px-6">
                      <div className="relative w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 md:mb-8">
                         <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                         <div className="absolute inset-0 border-4 border-t-yellow-400 rounded-full animate-spin"></div>
                         <Cpu className="absolute inset-0 m-auto text-yellow-400 w-6 h-6 md:w-8 md:h-8 animate-pulse" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">Analyzing Requirements</h3>
                      <p className="text-slate-400 font-mono text-xs md:text-sm">{loadingText}</p>
                    </div>
                  </div>
                )}

                {/* STATE 2: Result */}
                {step === 2 && (
                  <div className="flex flex-col h-full bg-slate-50 animate-fade-in-up flex-grow">
                    {/* Result Header */}
                    <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-sm shrink-0">
                          <CheckCircle2 size={18} />
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-slate-900 text-sm md:text-base">Blueprint Generated</h4>
                          <p className="text-slate-500 text-xs md:text-sm truncate max-w-[200px] md:max-w-md">Project: {prompt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                         <button 
                          onClick={() => { setStep(0); setPrompt(""); }} 
                          className="flex-1 sm:flex-none text-xs md:text-sm font-medium text-slate-500 hover:text-slate-900 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors bg-slate-50 sm:bg-transparent"
                        >
                          Reset
                        </button>
                        <button 
                          onClick={handleDownloadPDF}
                          disabled={isDownloading}
                          className="flex-1 sm:flex-none bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-4 py-2 md:px-5 md:py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                          {isDownloading ? (
                            <>
                              <Loader2 size={14}  className="animate-spin" />
                              <span className="hidden sm:inline">Generating...</span>
                              <span className="sm:hidden">Wait...</span>
                            </>
                          ) : (
                            <>
                              <Download size={14}  />
                              <span className="hidden sm:inline">Download PDF</span>
                              <span className="sm:hidden">PDF</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-4 md:p-6 overflow-y-auto max-h-[50vh] md:max-h-[600px] custom-scrollbar">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                        
                        {/* 1. Tech Stack (Span 4) */}
                        <div className="col-span-1 md:col-span-4 bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200">
                          <div className="flex items-center gap-2 mb-3 md:mb-4 pb-2 border-b border-slate-50">
                            <Box size={16} className="text-blue-600" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Recommended Stack</span>
                          </div>
                          <div className="space-y-2 md:space-y-3">
                            {['React.js', 'Node.js', 'Python AI', 'PostgreSQL'].map((tech, i) => (
                              <div key={i} className="flex items-center justify-between group p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-default">
                                <div className="flex items-center gap-3">
                                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${i === 2 ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-50 text-blue-600'}`}>
                                    {tech.slice(0, 2)}
                                  </span>
                                  <span className="font-medium text-slate-700 text-sm">{tech}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 2. Scalability Score (Span 4) */}
                        <div className="col-span-1 md:col-span-4 bg-slate-900 text-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-800 flex flex-col justify-between relative overflow-hidden min-h-[160px]">
                           <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-yellow-400/20 rounded-full blur-[40px]"></div>
                           <div className="relative z-10">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                  <Layers size={16} className="text-yellow-400" />
                                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Complexity</span>
                                </div>
                                <span className="px-2 py-0.5 rounded bg-yellow-400 text-black text-[10px] font-bold uppercase">High</span>
                              </div>
                              <div className="flex items-end gap-2 mt-2">
                                <span className="text-3xl md:text-4xl font-bold">8.5</span>
                                <span className="text-slate-500 mb-1">/10</span>
                              </div>
                              <p className="text-xs text-slate-400 mt-2">Requires microservices architecture for scale.</p>
                           </div>
                           
                           <div className="mt-6 relative z-10">
                              <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 mb-1">
                                <span>Dev Effort</span>
                                <span>12 Weeks</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-1.5">
                                <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                              </div>
                           </div>
                        </div>

                        {/* 3. Features (Span 4) */}
                        <div className="col-span-1 md:col-span-4 bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200">
                           <div className="flex items-center gap-2 mb-3 md:mb-4 pb-2 border-b border-slate-50">
                            <Shield size={16} className="text-blue-600" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Security & Core</span>
                          </div>
                          <ul className="space-y-2">
                            {['Auth0 SSO Integration', 'Role-Based Access Control', 'AES-256 Data Encryption', 'Automated Backups'].map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-slate-600">
                                <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 4. Roadmap (Full Width) */}
                        <div className="col-span-1 md:col-span-12 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
                          <div className="flex items-center gap-2 mb-4 md:mb-6">
                            <Clock size={16} className="text-blue-600" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Project Roadmap</span>
                          </div>
                          
                          <div className="flex flex-col md:flex-row gap-3 md:gap-4 relative">
                             {/* Connector Line (Desktop Only) */}
                             <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>

                             {[
                               { title: "Discovery", weeks: "Wk 1-2", status: "Planning" },
                               { title: "MVP Dev", weeks: "Wk 3-8", status: "Development" },
                               { title: "QA & Testing", weeks: "Wk 9-10", status: "Refinement" },
                               { title: "Launch", weeks: "Wk 11-12", status: "Deployment" }
                             ].map((phase, idx) => (
                               <div key={idx} className="flex-1 relative z-10 bg-white p-3 md:p-4 border border-slate-100 rounded-xl shadow-sm hover:border-yellow-400 transition-colors group flex md:block items-center md:items-start gap-4 md:gap-0">
                                  <div className="flex justify-between items-start mb-0 md:mb-2 shrink-0 md:shrink md:w-full">
                                    <span className="text-[10px] md:text-xs font-bold text-slate-400 group-hover:text-yellow-500 transition-colors w-12 md:w-auto">{phase.weeks}</span>
                                    <span className="hidden md:block w-2 h-2 rounded-full bg-slate-200 group-hover:bg-yellow-400"></span>
                                  </div>
                                  <div>
                                    <h5 className="font-bold text-slate-900 text-sm">{phase.title}</h5>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5 md:mt-1">{phase.status}</p>
                                  </div>
                               </div>
                             ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};
