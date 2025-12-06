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
            if (direction === 'up') return 'translateY(20px) md:translateY(40px)';
            if (direction === 'down') return 'translateY(-20px) md:translateY(-40px)';
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


const Marquee = () => (
    <div className="relative flex overflow-x-hidden bg-[#facc15] py-4 md:py-6 text-[#0f172a] font-bold tracking-tighter uppercase border-y-2 border-[#0f172a] z-20 rotate-1 transform scale-105 my-8 md:my-12">
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
        <div className="min-h-screen bg-white text-[#0f172a] font-sans selection:bg-[#facc15] selection:text-black overflow-x-hidden relative">

            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-50 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>



            {/* --- Hero Section --- */}
            <section className="relative pt-32 md:pt-48 pb-16 md:pb-20 px-4 md:px-6 min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center">
                <div className="max-w-[90rem] mx-auto text-center relative z-10">
                    <FadeIn delay={100}>
                        <div className="inline-block mb-4 md:mb-6 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-[#2563eb]/20 bg-[#2563eb]/5 text-[#2563eb] font-bold uppercase tracking-widest text-[10px] md:text-xs">
                            Est. 2018 • San Francisco
                        </div>
                        <h1 className="text-[13vw] md:text-[12vw] leading-[0.9] md:leading-[0.85] font-black tracking-tighter text-[#0f172a] mb-6 md:mb-8">
                            WE ARE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#2563eb]">
                                KIRYNEX
                            </span>
                            <span className="text-[#facc15] text-[13vw] md:text-[12vw]">.</span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={300} className="flex justify-center mb-8 md:mb-12">
                        <p className="text-lg md:text-2xl text-[#0f172a]/60 max-w-2xl leading-relaxed font-medium px-4">
                            Architecting the digital future with precision, passion, and a relentless pursuit of perfection.
                        </p>
                    </FadeIn>


                    <FadeIn delay={500} className="flex justify-center">
                        <div className="animate-bounce p-3 md:p-4 rounded-full border border-[#0f172a]/10 text-[#0f172a]">
                            <MoveDown size={20} className="md:w-6 md:h-6" />
                        </div>
                    </FadeIn>

                    <FadeIn delay={400} className="mt-12 md:mt-20 relative w-full aspect-[4/3] md:aspect-[21/9] rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl border-2 md:border-4 border-[#0f172a]">
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
            <section className="py-20 md:py-32 px-4 md:px-6 bg-[#0f172a] text-white relative overflow-hidden">
                {/* Abstract Shapes */}
                <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#2563eb] rounded-full blur-[100px] md:blur-[150px] opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#facc15] rounded-full blur-[100px] md:blur-[150px] opacity-10 pointer-events-none"></div>


                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
                    <FadeIn direction="none" className="relative group order-2 md:order-1">
                        {/* Yellow Accent Card Behind */}
                        <div className="absolute inset-0 bg-[#facc15] rounded-[2rem] md:rounded-[2.5rem] transform translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 group-hover:translate-x-1 group-hover:translate-y-1 md:group-hover:translate-x-2 md:group-hover:translate-y-2 transition-transform duration-300"></div>

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
                            <div className="w-12 md:w-16 h-1 bg-[#2563eb] mb-6"></div>
                            <h2 className="text-4xl md:text-7xl font-bold mt-2 mb-4 md:mb-6 leading-none">
                                Garage to <br /><span className="text-[#facc15]">Global.</span>
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
                                    <span className="block text-3xl md:text-4xl font-bold text-[#facc15]">500+</span>
                                    <span className="text-xs md:text-sm uppercase tracking-widest text-white/60">Projects</span>
                                </div>
                                <div>
                                    <span className="block text-3xl md:text-4xl font-bold text-[#2563eb]">40+</span>
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
                    <FadeIn className="bg-[#facc15] p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 md:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Target size={80} className="md:w-[120px] md:h-[120px] text-[#0f172a]" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-[#0f172a]">Our Mission</h3>
                        <p className="text-[#0f172a] text-lg md:text-xl leading-relaxed font-medium max-w-md">
                            To democratize access to world-class technology by building digital tools that are intuitive, powerful, and accessible.
                        </p>
                        <div className="mt-6 md:mt-8 inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0f172a] text-white">
                            <ArrowRight size={18} className="md:w-5 md:h-5" />
                        </div>
                    </FadeIn>

                    <FadeIn delay={200} className="bg-[#2563eb] p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 md:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Eye size={80} className="md:w-[120px] md:h-[120px] text-white" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white">Our Vision</h3>
                        <p className="text-white text-lg md:text-xl leading-relaxed font-medium max-w-md">
                            A world where technology dissolves into the background, empowering human creativity without friction or boundaries.
                        </p>
                        <div className="mt-6 md:mt-8 inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-[#2563eb]">
                            <ArrowRight size={18} className="md:w-5 md:h-5" />
                        </div>
                    </FadeIn>
                </div>
            </section>


            {/* --- Timeline --- */}
            <section className="py-20 md:py-32 px-4 md:px-6 bg-[#fafafa]">
                <div className="max-w-4xl mx-auto">
                    <FadeIn className="text-center mb-12 md:mb-20">
                        <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] uppercase tracking-tighter">The Evolution</h2>
                    </FadeIn>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-1 bg-[#0f172a]/5"></div>

                        {timeline.map((item, i) => (
                            <FadeIn key={i} delay={i * 100} className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-12 md:mb-20 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                <div className="hidden md:block w-5/12"></div>

                                {/* Dot */}
                                <div className="absolute left-3 md:left-1/2 transform -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-[#facc15] border-2 md:border-4 border-white rounded-full z-10 shadow-lg mt-1 md:mt-0"></div>

                                <div className={`w-full pl-10 md:pl-0 ${i % 2 === 0 ? 'md:w-5/12 md:text-right md:pr-12' : 'md:w-5/12 md:text-left md:pl-12'}`}>
                                    <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-[#2563eb] text-white text-[10px] md:text-xs font-bold rounded-full mb-2 md:mb-3">{item.year}</span>
                                    <h3 className="text-xl md:text-2xl font-bold text-[#0f172a] mb-1 md:mb-2">{item.title}</h3>
                                    <p className="text-[#0f172a]/60 font-medium text-sm md:text-base">{item.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

             {/* --- Values Section (Black) --- */}
            <section className="py-32 px-6 bg-[#0f172a] text-white overflow-hidden relative">
                {/* Ambient Background Glow */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>


                <div className="max-w-7xl mx-auto relative z-10">
                    <FadeIn>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-20">
                            Our Core <span className="text-[#facc15]">Values.</span>
                        </h2>
                    </FadeIn>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-800 pt-16">
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
            <section className="py-32 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <FadeIn className="text-center mb-20">
                        <h2 className="text-4xl font-bold tracking-tight mb-6 text-[#0f172a]">Our Methodology</h2>
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
                                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#0f172a] text-white flex items-center justify-center shadow-lg shadow-slate-900/20">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-bold text-[#2563eb] uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Step 0{i + 1}</span>
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


            {/* --- Footer --- */}
            <footer className="bg-[#0f172a] text-white pt-24 md:pt-32 pb-8 md:pb-10 rounded-t-[2rem] md:rounded-t-[3rem] mt-8 md:mt-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col items-center text-center mb-16 md:mb-24">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#2563eb] rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-8 rotate-12 hover:rotate-0 transition-transform duration-500">
                            <span className="font-bold text-2xl md:text-3xl">kx.</span>
                        </div>
                        <h2 className="text-4xl md:text-8xl font-black tracking-tighter mb-6 md:mb-8">
                            LET'S BUILD <br /> THE <span className="text-[#facc15]">FUTURE</span>
                        </h2>
                        <button className="bg-white text-[#0f172a] px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-[#facc15] transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(250,204,21,0.4)] w-full sm:w-auto">
                            Start a Project
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs md:text-sm text-white/40 gap-4 md:gap-0">
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-white">Kirynex Inc.</span>
                            <span>&copy; 2024</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}