

"use client"
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Cpu, Clock, 
  Layers, Zap, Shield, ArrowRight, 
  CheckCircle2, Box, Download, Loader2, AlertCircle
} from 'lucide-react';

/**
 * INTERFACES: Defining the shape of our data
 */
interface Phase {
  title: string;
  weeks: string;
  status: string;
}

interface Complexity {
  score: number;
  level: 'Low' | 'Medium' | 'High' | 'Enterprise';
  description: string;
}

interface Timeline {
  weeks: number;
  phases: Phase[];
}

interface AIAnalysis {
  techStack: string[];
  complexity: Complexity;
  features: string[];
  timeline: Timeline;
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * UTILITY: Simple FadeIn implementation
 */
const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}>
      {children}
    </div>
  );
};

// --- Gemini Config ---
/**
 * API KEY HANDLING:
 * Client-side environment variables in Next.js must be prefixed with NEXT_PUBLIC_
 */
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API; 
 


export default function AIInteractiveSection() {
  const [prompt, setPrompt] = useState<string>("");
  const [step, setStep] = useState<number>(0); // 0: input, 1: loading, 2: result, 3: error
  const [loadingText, setLoadingText] = useState<string>("Initializing Neural Network...");
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [analysisData, setAnalysisData] = useState<AIAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Loading text sequence for visual feedback
  useEffect(() => {
    if (step !== 1) return;
    const texts = [
      "Parsing Requirements...", 
      "Matching Tech Stack...", 
      "Calculating Complexity...", 
      "Generating Architecture...",
      "Estimating Timeline...",
      "Finalizing Blueprint..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLoadingText(texts[i % texts.length]);
      i++;
    }, 1200);
    return () => clearInterval(interval);
  }, [step]);

  /**
   * API CALL LOGIC
   */
  const callGeminiAI = async (userPrompt: string): Promise<AIAnalysis> => {
    if (!apiKey) {
      throw new Error('GEMINI_API key is not configured. Please set NEXT_PUBLIC_GEMINI_API in your environment variables.');
    }
    
    const systemPrompt = `You are an expert Software Architect. Analyze the project concept provided and return a structured JSON technical analysis.
    The response MUST be valid JSON with this exact structure:
    {
      "techStack": ["string"],
      "complexity": { "score": number (0-10), "level": "Low"|"Medium"|"High"|"Enterprise", "description": "string" },
      "features": ["string"],
      "timeline": {
        "weeks": number,
        "phases": [ { "title": "string", "weeks": "string (e.g. Wk 1-2)", "status": "string" } ]
      }
    }
    Be specific and realistic. Provide 4 tech stack items, 4 core features, and 4 roadmap phases.`;

    const payload = {
      contents: [{ 
        parts: [{ text: `Analyze this project concept: ${userPrompt}` }] 
      }],
      systemInstruction: { 
        parts: [{ text: systemPrompt }] 
      },
      generationConfig: {
        responseMimeType: "application/json",
      }
    };

    const fetchWithRetry = async (retries: number = 5, delay: number = 1000): Promise<AIAnalysis> => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.error?.message || 'API request failed');
        }
        
        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error("Could not parse AI response");
        return JSON.parse(text) as AIAnalysis;
      } catch (err) {
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchWithRetry(retries - 1, delay * 2);
        }
        throw err as Error;
      }
    };

    return await fetchWithRetry();
  };

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setStep(1);
    setError(null);

    try {
      const data = await callGeminiAI(prompt.trim());
      setAnalysisData(data);
      setStep(2);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Connection failed.";
      setError(errorMessage);
      setStep(3);
    }
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      const content = `Project Blueprint: ${prompt}\n\n` +
        `Tech Stack: ${analysisData?.techStack.join(', ')}\n` +
        `Complexity: ${analysisData?.complexity.level} (${analysisData?.complexity.score}/10)\n` +
        `Summary: ${analysisData?.complexity.description}\n\n` +
        `Features:\n${analysisData?.features.map(f => `- ${f}`).join('\n')}\n\n` +
        `Roadmap Total: ${analysisData?.timeline.weeks} weeks`;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `blueprint-${prompt.toLowerCase().replace(/\s+/g, '-')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900  selection:bg-blue-100">
      <section className="py-12 md:py-20 relative overflow-hidden">
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-100 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            
            <div className="lg:col-span-4 text-center lg:text-left">
              <FadeIn>
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                  <span className="text-[10px] md:text-xs font-bold tracking-wide text-slate-600 uppercase">AI Strategy Engine v2.5 (TS)</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900 leading-tight">
                  Visualize your <br className="hidden md:block"/> 
                  <span className="text-blue-600">next big idea.</span>
                </h2>
                <p className="text-slate-500 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Instantly map out technical roadmaps, architecture stacks, and complexity scores for any software concept.
                </p>
                
                <div className="flex flex-col gap-4 items-center lg:items-start">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><Zap size={20} /></div>
                    <span className="font-medium">Architecture Analysis</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0"><Clock size={20} /></div>
                    <span className="font-medium">Timeline Estimation</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-8 w-full">
              <FadeIn delay={200}>
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-200 overflow-hidden relative min-h-[550px] flex flex-col transition-all">
                  
                  {step === 0 && (
                    <div className="flex flex-col items-center justify-center h-full flex-grow p-6 md:p-12">
                      <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mb-8 shadow-xl transform rotate-3">
                        <Sparkles className="text-yellow-500 w-8 h-8 fill-yellow-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center">Describe your Software Concept</h3>
                      <p className="text-slate-500 mb-8 text-center max-w-md">Our AI will generate a professional blueprint for you.</p>
                      
                      <form onSubmit={handleAskAI} className="w-full max-w-xl relative">
                        <div className="relative flex items-center bg-slate-50 rounded-2xl border border-slate-200 p-2 transition-all focus-within:ring-2 focus-within:ring-blue-200 focus-within:bg-white">
                          <input 
                            type="text" 
                            value={prompt}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
                            placeholder="e.g. A marketplace for vintage watches..."
                            className="w-full bg-transparent text-slate-800 text-lg py-4 pl-4 pr-32 focus:outline-none"
                          />
                          <button 
                            type="submit" 
                            className="absolute right-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                            disabled={!prompt.trim()}
                          >
                            Analyze <ArrowRight size={18} className="text-yellow-400" />
                          </button>
                        </div>
                      </form>

                      <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
                        <span className="text-slate-400 py-1">Try:</span>
                        {[
                          { label: "Uber for X", val: "A ride-sharing app for local grocery delivery" },
                          { label: "SaaS CRM", val: "A lightweight CRM for independent realtors" },
                          { label: "NFT Hub", val: "A social platform for digital artists with wallet integration" }
                        ].map((ex) => (
                          <button 
                            key={ex.label}
                            onClick={() => setPrompt(ex.val)} 
                            className="bg-white border border-slate-200 px-4 py-1.5 rounded-full text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all active:scale-95"
                          >
                            {ex.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="flex flex-col items-center justify-center h-full flex-grow bg-slate-900 text-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b,transparent)] opacity-50"></div>
                      <div className="relative z-10 text-center">
                        <div className="relative w-20 h-20 mx-auto mb-8">
                           <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                           <div className="absolute inset-0 border-4 border-t-yellow-400 rounded-full animate-spin"></div>
                           <Cpu className="absolute inset-0 m-auto text-yellow-400 w-8 h-8 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Analyzing Blueprint</h3>
                        <p className="text-slate-400 font-mono text-sm tracking-wider uppercase">{loadingText}</p>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="flex flex-col items-center justify-center h-full flex-grow p-12 bg-white">
                      <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mb-8">
                        <AlertCircle className="text-red-500 w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Analysis Failed</h3>
                      <p className="text-slate-500 mb-8 text-center max-w-md">{error}</p>
                      <button 
                        onClick={() => setStep(0)} 
                        className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold transition-all"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="flex flex-col h-full bg-slate-50 flex-grow overflow-hidden animate-in fade-in duration-500">
                      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-sm">
                            <CheckCircle2 size={20} />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="font-bold text-slate-900">Blueprint Ready</h4>
                            <p className="text-slate-500 text-xs truncate max-w-[250px]">{prompt}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => { setStep(0); setPrompt(""); }} 
                            className="text-sm font-medium text-slate-500 hover:text-slate-900 px-4 py-2"
                          >
                            Reset
                          </button>
                          <button 
                            onClick={handleDownloadPDF}
                            disabled={isDownloading}
                            className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-75"
                          >
                            {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                            {isDownloading ? 'Exporting...' : 'Export Spec'}
                          </button>
                        </div>
                      </div>

                      <div className="p-6 overflow-y-auto flex-grow custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                          
                          {/* Tech Stack Card */}
                          <div className="col-span-1 md:col-span-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-50">
                              <Box size={16} className="text-blue-600" />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tech Stack</span>
                            </div>
                            <div className="space-y-2">
                              {analysisData?.techStack.map((tech, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg group hover:bg-white hover:ring-1 hover:ring-blue-100 transition-all">
                                  <span className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                    0{i+1}
                                  </span>
                                  <span className="font-medium text-slate-700 text-sm">{tech}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Engineering Score Card */}
                          <div className="col-span-1 md:col-span-4 bg-slate-900 text-white p-5 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between">
                             <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <Layers size={16} className="text-yellow-400" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Engineering Score</span>
                                  </div>
                                  <span className="px-2 py-0.5 rounded bg-yellow-400 text-black text-[10px] font-bold uppercase">
                                    {analysisData?.complexity.level}
                                  </span>
                                </div>
                                <div className="flex items-end gap-2">
                                  <span className="text-4xl font-bold">{analysisData?.complexity.score}</span>
                                  <span className="text-slate-500 mb-1 text-sm font-mono">/10</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                                  {analysisData?.complexity.description}
                                </p>
                             </div>
                             <div className="mt-6">
                                <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1 uppercase">
                                  <span>Dev Velocity</span>
                                  <span>{analysisData?.timeline.weeks} Weeks</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                  <div 
                                    className="bg-yellow-400 h-full transition-all duration-1000" 
                                    style={{ width: `${(analysisData?.complexity.score || 0) * 10}%` }}
                                  ></div>
                                </div>
                             </div>
                          </div>

                          {/* Core Features Card */}
                          <div className="col-span-1 md:col-span-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                             <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-50">
                              <Shield size={16} className="text-blue-600" />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Core Features</span>
                            </div>
                            <ul className="space-y-3">
                              {analysisData?.features.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 group">
                                  <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Roadmap Timeline */}
                          <div className="col-span-1 md:col-span-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-2 mb-6">
                              <Clock size={16} className="text-blue-600" />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Implementation Roadmap</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                               {analysisData?.timeline.phases.map((phase, idx) => (
                                 <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-yellow-300 transition-colors cursor-default">
                                    <div className="flex justify-between items-start mb-3">
                                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{phase.weeks}</span>
                                      <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-yellow-400 animate-pulse' : 'bg-slate-300'}`}></div>
                                    </div>
                                    <h5 className="font-bold text-slate-900 text-sm mb-1">{phase.title}</h5>
                                    <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">{phase.status}</p>
                                 </div>
                               ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
}