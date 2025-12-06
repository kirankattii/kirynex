"use client";
import { useState, useEffect, useRef, ReactNode } from 'react';
import {
    ArrowRight,
    Menu,
    X,
    Code,
    Globe,
    Zap,
    Target,
    Eye,
    Award,
    CheckCircle2,
    Asterisk,
    MoveDown,
    Layers,
    Cpu,
    Rocket,
    Users
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/Badge';
import { BackgroundBlob } from '@/components/ui/BackgroundBlob';


// --- Utility Components ---
// Using shared FadeIn component from @/components/animations/FadeIn


const Marquee = () => (
    <div className="relative flex overflow-x-hidden bg-brand-yellow py-4 md:py-6 text-brand-dark font-bold tracking-tighter uppercase border-y-2 border-brand-dark z-20 rotate-1 transform scale-105 my-8 md:my-12">
        <div className="animate-marquee whitespace-nowrap flex space-x-8 md:space-x-12">
            {[...Array(10)].map((_, i) => (
                <span key={i} className="flex items-center text-xl md:text-3xl mx-4">
                    <Asterisk className="w-6 h-6 md:w-8 md:h-8 mr-4 animate-spin-slow" />
                    Define <span className="mx-4 opacity-40">•</span>
                    Design <span className="mx-4 opacity-40">•</span>
                    Deploy <span className="mx-4 opacity-40">•</span>
                    Dominate
                </span>
            ))}
        </div>
    </div>
);

// Types
interface MethodologyStep {
    title: string;
    desc: string;
    icon: React.ReactNode;
}

// --- Main Application Component ---


export default function AboutPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const timeline = [
        { year: "2018", title: "The Inception", desc: "Founded in a small garage in San Francisco with a single laptop and a vision." },
        { year: "2020", title: "Global Expansion", desc: "Opened offices in London and Tokyo. Team grew to 50+ creative minds." },
        { year: "2022", title: "AI Integration", desc: "Pivoted to AI-first development, setting new industry standards." },
        { year: "2024", title: "The Next Era", desc: "Launching proprietary neural engines for enterprise scale." },
    ];


    return (
        <div className="min-h-screen bg-white text-brand-dark font-sans selection:bg-brand-yellow selection:text-black overflow-x-hidden relative">

            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-50 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>



            {/* --- Hero Section --- */}
            <section className="relative pt-32 md:pt-48 pb-16 md:pb-20 px-4 md:px-6 min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center">
                <div className="max-w-[90rem] mx-auto text-center relative z-10">
                    <FadeIn delay={100}>
                        <div className="inline-block mb-4 md:mb-6 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-brand-blue/20 bg-brand-blue/5 text-brand-blue font-bold uppercase tracking-widest text-[10px] md:text-xs">
                            Est. 2025 • Bengaluru
                        </div>
                        <h1 className="text-[13vw] md:text-[12vw] leading-[0.9] md:leading-[0.85] font-black tracking-tighter text-brand-dark mb-6 md:mb-8">
                            WE ARE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-blue">
                                KIRYNEX
                            </span>
                            <span className="text-brand-yellow text-[13vw] md:text-[12vw]">.</span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={300} className="flex justify-center mb-8 md:mb-12">
                        <p className="text-lg md:text-2xl text-brand-dark/60 max-w-2xl leading-relaxed font-medium px-4">
                            Architecting the digital future with precision, passion, and a relentless pursuit of perfection.
                        </p>
                    </FadeIn>


                    <FadeIn delay={500} className="flex justify-center">
                        <div className="animate-bounce p-3 md:p-4 rounded-full border border-brand-dark/10 text-brand-dark">
                            <MoveDown size={20} className="md:w-6 md:h-6" />
                        </div>
                    </FadeIn>

                    <FadeIn delay={400} className="mt-12 md:mt-20 relative w-full aspect-[4/3] md:aspect-[21/9] rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl border-2 md:border-4 border-brand-dark">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
                            alt="Modern Workspace"
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s] ease-in-out filter grayscale hover:grayscale-0"
                        />
                    </FadeIn>
                </div>
            </section>


            {/* --- Marquee Separator --- */}
            <Marquee />


            {/* --- Our Story (High Contrast) --- */}
            <section className="py-20 md:py-32 px-4 md:px-6 bg-brand-dark text-white relative overflow-hidden">
                {/* Abstract Shapes */}
                <BackgroundBlob color="blue" position="top-right" size="md" opacity={0.2} />
                <BackgroundBlob color="yellow" position="bottom-left" size="md" opacity={0.1} />


                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
                    <FadeIn direction="none" className="relative group order-2 md:order-1">
                        {/* Yellow Accent Card Behind */}
                        <div className="absolute inset-0 bg-brand-yellow rounded-[2rem] md:rounded-[2.5rem] transform translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 group-hover:translate-x-1 group-hover:translate-y-1 md:group-hover:translate-x-2 md:group-hover:translate-y-2 transition-transform duration-300"></div>

                        <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-2 border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700 aspect-square md:aspect-auto h-[400px] md:h-[600px]">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                                alt="Collaboration"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </FadeIn>

                    <div className="space-y-8 md:space-y-10 order-1 md:order-2">
                        <FadeIn>
                            <div className="w-12 md:w-16 h-1 bg-brand-blue mb-6"></div>
                            <h2 className="text-4xl md:text-7xl font-bold mt-2 mb-4 md:mb-6 leading-none">
                                Garage to <br /><span className="text-brand-yellow">Global.</span>
                            </h2>
                        </FadeIn>
                        <FadeIn delay={200}>
                            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                                It started with a simple observation: software was becoming functional, but it was losing its soul. We set out to change that.
                                We believed that code could be poetry, and interfaces could be art.
                            </p>
                        </FadeIn>
                        <FadeIn delay={300}>
                            <div className="grid grid-cols-2 gap-4 md:gap-8 border-t border-white/10 pt-8">
                                <div>
                                    <span className="block text-3xl md:text-4xl font-bold text-brand-yellow">500+</span>
                                    <span className="text-xs md:text-sm uppercase tracking-widest text-white/60">Projects</span>
                                </div>
                                <div>
                                    <span className="block text-3xl md:text-4xl font-bold text-brand-blue">40+</span>
                                    <span className="text-xs md:text-sm uppercase tracking-widest text-white/60">Awards</span>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>


            {/* --- Mission & Vision (Cards) --- */}
            <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 -mt-10 md:-mt-20 relative z-20">
                    <FadeIn className="bg-brand-yellow p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 md:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Target size={80} className="md:w-[120px] md:h-[120px] text-brand-dark" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-brand-dark">Our Mission</h3>
                        <p className="text-brand-dark text-lg md:text-xl leading-relaxed font-medium max-w-md">
                            To democratize access to world-class technology by building digital tools that are intuitive, powerful, and accessible.
                        </p>
                        <div className="mt-6 md:mt-8 inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-dark text-white">
                            <ArrowRight size={18} className="md:w-5 md:h-5" />
                        </div>
                    </FadeIn>

                    <FadeIn delay={200} className="bg-brand-blue p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 md:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Eye size={80} className="md:w-[120px] md:h-[120px] text-white" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white">Our Vision</h3>
                        <p className="text-white text-lg md:text-xl leading-relaxed font-medium max-w-md">
                            A world where technology dissolves into the background, empowering human creativity without friction or boundaries.
                        </p>
                        <div className="mt-6 md:mt-8 inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-brand-blue">
                            <ArrowRight size={18} className="md:w-5 md:h-5" />
                        </div>
                    </FadeIn>
                </div>
            </section>


         
             {/* --- Values Section (Black) --- */}
            <section className="py-16 md:py-32 px-6 bg-brand-dark text-white overflow-hidden relative">
                {/* Ambient Background Glow */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>


                <div className="max-w-7xl mx-auto relative z-10">
                    <FadeIn>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 md:mb-20">
                            Our Core <span className="text-brand-yellow">Values.</span>
                        </h2>
                    </FadeIn>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-800 pt-8 md:pt-16">
                        <FadeIn delay={100}>
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold">Innovation First</h3>
                                <p className="text-slate-400 leading-relaxed font-light">
                                    We don't follow trends; we set them. If a solution doesn't exist, we invent it. Complacency is our only enemy.
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn delay={200}>
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold">Radical Transparency</h3>
                                <p className="text-slate-400 leading-relaxed font-light">
                                    No hidden fees. No technical jargon designed to confuse. We believe in clear, honest communication at every step.
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn delay={300}>
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold">Obsessive Quality</h3>
                                <p className="text-slate-400 leading-relaxed font-light">
                                    "Good enough" is not in our vocabulary. We sweat the small stuff because we know it all adds up to the user experience.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* --- How We Work (Timeline) --- */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <FadeIn className="text-center mb-10">
                        <h2 className="text-4xl font-bold tracking-tight mb-6 text-brand-dark">Our Methodology</h2>
                        <p className="text-slate-500">A rigorous process designed to eliminate ambiguity.</p>
                    </FadeIn>


                    <div className="space-y-8">
                        {([
                            { title: "Discovery & Strategy", desc: "We dig deep into the 'why'. We challenge assumptions and define the core problem before writing a single line of code.", icon: <Globe size={24} /> },
                            { title: "Design & Prototype", desc: "High-fidelity visualization. We build clickable prototypes that look and feel like the final product to validate flows early.", icon: <Users size={24} /> },
                            { title: "Engineering", desc: "Agile development sprints. Clean, documented, and scalable code built on modern architectures like React and Next.js.", icon: <Code size={24} /> },
                            { title: "Launch & Iterate", desc: "Seamless deployment followed by data-driven optimization. We don't just launch; we nurture.", icon: <Award size={24} /> }
                        ] as MethodologyStep[]).map((step, i) => (
                            <FadeIn key={i} delay={i * 100}>
                                <div className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
                                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-brand-dark text-white flex items-center justify-center shadow-lg shadow-slate-900/20">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Step 0{i + 1}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                        <p className="text-slate-500 leading-relaxed max-w-2xl">{step.desc}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}