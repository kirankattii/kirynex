"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Menu,
  X,
  Search,
  Zap,
  Clock,
  Calendar,
  ChevronRight,
  User,
  Tag,
  ArrowUpRight,
  Share2,
  Bookmark,
  XCircle
} from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagnaticButton';

// --- Utility Components ---

const FadeIn = ({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
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

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// --- Data ---
const categories = ["All", "Engineering", "AI & ML", "Design", "Tech News"];

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  content: React.ReactNode;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of AI Agents: Beyond Chatbots",
    excerpt: "Why 2025 is the year of autonomous agents. We explore how Large Action Models (LAMs) are shifting the paradigm from 'chatting' to 'doing'.",
    category: "AI & ML",
    author: "Alex Sterling",
    role: "CTO",
    date: "Oct 24, 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=2000",
    tags: ["Artificial Intelligence", "Automation", "Future Tech"],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p className="text-xl font-light text-slate-800">
          The era of static chatbots is ending. We are witnessing the birth of "Agentic AI"—systems capable of reasoning, planning, and executing complex tasks across multiple applications without human intervention.
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mt-8">From LLMs to LAMs</h3>
        <p>
          While Large Language Models (LLMs) like GPT-4 mastered text generation, Large Action Models (LAMs) are designed to interact with interfaces. They understand UI structures, API calls, and authentication flows. This allows an AI agent to not just tell you how to book a flight, but to actually log in, select the seat, and process the payment.
        </p>
        <blockquote className="border-l-4 border-[#facc15] pl-6 italic my-8 text-slate-800 bg-slate-50 py-4 pr-4 rounded-r-xl">
          "The friction between intent and action is about to disappear. The interface of the future is intent itself."
        </blockquote>
        <h3 className="text-2xl font-bold text-slate-900">The Enterprise Impact</h3>
        <p>
          For software development, this means building APIs that are "agent-friendly." We are moving away from GUI-first development towards API-first ecosystems where the primary consumer might be a neural network, not a human using a mouse. At Kirynex, we are already re-architecting our internal tools to support this shift.
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: "Next.js 15: The End of Memoization Headaches?",
    excerpt: "A deep dive into the new caching semantics, the React Compiler, and how the new partial prerendering model changes the game for dynamic apps.",
    category: "Engineering",
    author: "David K.",
    role: "Lead Engineer",
    date: "Oct 20, 2024",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2000",
    tags: ["React", "Next.js", "Web Performance"],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          The release of Next.js 15 Release Candidate has sparked a massive debate in the frontend community. The biggest change? The caching defaults.
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mt-8">Fetch is no longer cached by default</h3>
        <p>
          In Next.js 14, `fetch` requests were cached by default. While performant, this led to confusion. Version 15 flips this: fetch requests are now `no-store` by default. This aligns better with standard web expectations—if you want cache, you must explicitly opt-in.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">React Compiler Support</h3>
        <p>
          Perhaps the most exciting addition is official support for the React Compiler. No more `useMemo` or `useCallback` spam. The compiler automatically memoizes values and functions, reducing re-renders without manual overhead. We tested this on our dashboard component and saw a 40% reduction in code volume.
        </p>
      </div>
    )
  },
  {
    id: 3,
    title: "Rust for Web: Is it finally time to switch?",
    excerpt: "We rewrote our core image processing microservice in Rust. Here are the benchmarks, the pain points, and why we aren't going back to Node.js for heavy compute.",
    category: "Engineering",
    author: "Sarah M.",
    role: "Backend Architect",
    date: "Oct 15, 2024",
    readTime: "15 min",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=2000",
    tags: ["Rust", "Backend", "Performance"],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          Node.js is fantastic for I/O bound tasks, but when it comes to CPU-intensive operations like image manipulation or complex data transformation, the V8 engine hits a ceiling.
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mt-8">The Benchmark</h3>
        <p>
          We took a service that resizes and compresses user uploads. In Node.js (using Sharp), processing 100 images took ~4.2 seconds. In Rust, using the `image` crate, the same task took 0.8 seconds. That is a 5x improvement.
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-[#2563eb]">
            <li><strong>Memory Safety:</strong> Zero runtime crashes due to null pointers.</li>
            <li><strong>Binary Size:</strong> Our docker container shrank from 400MB to 25MB.</li>
            <li><strong>Developer Experience:</strong> The borrow checker is tough, but it forces you to write better code.</li>
        </ul>
      </div>
    )
  },
  {
    id: 4,
    title: "The Psychology of 'Skeleton' Loading Screens",
    excerpt: "Perceived performance is just as important as actual performance. Why skeletons beat spinners, and how to design them correctly.",
    category: "Design",
    author: "Elena R.",
    role: "Head of Design",
    date: "Oct 08, 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000",
    tags: ["UX", "Psychology", "Frontend"],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          When a user clicks a button, they expect immediate feedback. If the data takes 2 seconds to load, how you fill that 2-second gap determines if the app feels "fast" or "broken".
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mt-8">Spinners vs. Skeletons</h3>
        <p>
          Spinners draw attention to the wait time. They say "I am working, please wait." Skeleton screens, however, mimic the layout of the content that is about to appear. They say "Here is the structure, the details are filling in." Studies show this reduces perceived wait time by up to 20%.
        </p>
      </div>
    )
  },
  {
    id: 5,
    title: "Apple Vision Pro: 6 Months Later",
    excerpt: "Is spatial computing the future of dev work? Our honest review of coding in AR, and why the keyboard isn't going away anytime soon.",
    category: "Tech News",
    author: "Alex Sterling",
    role: "Founder",
    date: "Sep 28, 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1621418726588-466034f5979b?auto=format&fit=crop&q=80&w=2000",
    tags: ["AR/VR", "Hardware", "Productivity"],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          We bought three Vision Pros for the team to test "Spatial Computing" workflows. The screen fidelity is incredible—text is crisp enough to code on for hours.
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mt-8">The Verdict</h3>
        <p>
          It's great for deep work. Having a 100-inch virtual monitor for your terminal, another for documentation, and a third for previewing is powerful. However, the weight is still an issue. After 2 hours, you feel it.
        </p>
      </div>
    )
  },
  {
    id: 6,
    title: "Why we killed the daily standup",
    excerpt: "Asynchronous communication is the future of remote work. Here is the framework that replaced our meetings and boosted productivity by 30%.",
    category: "Culture",
    author: "Sarah M.",
    role: "VP of Product",
    date: "Sep 15, 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000",
    tags: ["Remote Work", "Productivity", "Management"],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          The daily standup was designed for collocated teams in the 90s. For a distributed global team, it's a productivity killer. It breaks flow state and often devolves into status reporting rather than problem-solving.
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mt-8">The Async Check-in</h3>
        <p>
          We replaced the 15-minute Zoom call with a Slack workflow. At 9 AM local time, a bot asks three questions: What did you ship? What are you shipping today? Are you blocked?
        </p>
        <p>
          This allows engineers to update us when they are ready, providing a written record of progress without interrupting their deep work cycles.
        </p>
      </div>
    )
  }
];

// --- Main Application Component ---

export default function BlogPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Handle Scroll for navbar styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handle Body Lock when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedPost]);

  const filteredPosts = activeCategory === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  return (
    <div className="bg-slate-50 text-[#0f172a] selection:bg-[#facc15] selection:text-[#0f172a] overflow-x-hidden">

      {/* --- Article Modal --- */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedPost(null)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full md:w-[90%] lg:w-[1000px] h-[95vh] md:h-[90vh] bg-white md:rounded-[2rem] rounded-t-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-300">
            
            {/* Modal Header Actions */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20 pointer-events-none">
              <span className="pointer-events-auto bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                {selectedPost.category}
              </span>
              <button 
                onClick={() => setSelectedPost(null)}
                className="pointer-events-auto bg-white/90 backdrop-blur p-2 rounded-full hover:bg-slate-100 transition-colors shadow-sm text-slate-900"
              >
                <XCircle size={28} />
              </button>
            </div>

            {/* Scrollable Area */}
            <div className="overflow-y-auto h-full custom-scrollbar">
              {/* Cover Image */}
              <div className="h-[40vh] md:h-[50vh] w-full relative">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              </div>

              {/* Content Body */}
              <div className="px-6 md:px-12 lg:px-20 pb-20 -mt-20 relative z-10">
                <div className="max-w-3xl mx-auto">
                  <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100 mb-8">
                     <div className="flex items-center gap-4 text-xs font-bold text-[#2563eb] uppercase tracking-widest mb-6">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {selectedPost.date}</span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {selectedPost.readTime}</span>
                     </div>
                     <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                       {selectedPost.title}
                     </h1>
                     <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-lg">
                             {selectedPost.author.charAt(0)}
                           </div>
                           <div>
                             <p className="font-bold text-slate-900">{selectedPost.author}</p>
                             <p className="text-xs text-slate-500 uppercase tracking-wide">{selectedPost.role}</p>
                           </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-slate-400 hover:text-[#2563eb] transition-colors"><Share2 size={20} /></button>
                          <button className="p-2 text-slate-400 hover:text-[#2563eb] transition-colors"><Bookmark size={20} /></button>
                        </div>
                     </div>
                  </div>

                  {/* The Actual Text Content */}
                  <div className="prose prose-lg prose-slate max-w-none">
                    {selectedPost.content}
                  </div>

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-slate-200">
                    <h4 className="text-sm font-bold uppercase text-slate-400 mb-4">Related Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-[#2563eb] hover:text-white transition-colors cursor-pointer">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    

      {/* --- Hero Section --- */}
      <section className="relative pt-48 pb-20 px-6 overflow-hidden">
        {/* Decorative BG Elements */}
        <div className="absolute top-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-transparent pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-yellow-100/40 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2563eb] text-xs font-bold uppercase tracking-widest mb-8">
              <Zap size={14} className="fill-current" />
              <span>Tech Intelligence</span>
            </div>
            <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter mb-8 leading-[0.9] text-[#0f172a]">
              THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#facc15]">
                SIGNAL.
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={200}>
             <div className="flex flex-col md:flex-row justify-between items-end border-b border-[#0f172a]/10 pb-12">
               <p className="text-xl md:text-2xl font-light text-slate-500 max-w-2xl leading-relaxed">
                 Deep dives into software architecture, AI agents, and the future of digital product design.
               </p>
               <div className="mt-8 md:mt-0 relative w-full md:w-auto group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563eb] transition-colors" size={20} />
                 <input
                   type="text"
                   placeholder="Search articles..."
                   className="w-full md:w-80 bg-white border border-slate-200 rounded-full pl-12 pr-6 py-4 focus:outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
                 />
               </div>
             </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Featured Post (Using First Item in Data) --- */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={300}>
            <div 
              onClick={() => setSelectedPost(BLOG_POSTS[0])}
              className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/3] md:aspect-[21/9] shadow-2xl cursor-pointer ring-1 ring-slate-900/5"
            >
               <img
                 src={BLOG_POSTS[0].image}
                 alt="Featured"
                 className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent"></div>
              
               <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-3/4">
                 <div className="flex items-center gap-4 mb-6">
                   <span className="bg-[#facc15] text-[#0f172a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-yellow-500/20">
                     Featured
                   </span>
                   <span className="text-white/80 text-sm font-medium flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">
                     <Clock size={14} /> {BLOG_POSTS[0].readTime}
                   </span>
                 </div>
                
                 <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 leading-tight group-hover:underline decoration-[#facc15] underline-offset-8 transition-all">
                   {BLOG_POSTS[0].title}
                 </h2>
                
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold text-[#0f172a] text-lg">
                      {BLOG_POSTS[0].author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">{BLOG_POSTS[0].author}</p>
                      <p className="text-white/60 text-sm">{BLOG_POSTS[0].role}</p>
                    </div>
                 </div>
               </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Filter & Grid --- */}
      <section className="pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Filters */}
          <FadeIn className="mb-12 overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
                    activeCategory === cat
                      ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-lg shadow-slate-900/20'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-[#2563eb] hover:text-[#2563eb]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post, i) => ( // Skip first post as it's featured
              <FadeIn key={post.id} delay={i * 100}>
                <article 
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer flex flex-col h-full bg-white rounded-[2rem] p-4 border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                >
                  <div className="relative overflow-hidden rounded-[1.5rem] aspect-[16/10] mb-6 shadow-sm">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                       <span className="bg-white/90 backdrop-blur-md text-[#0f172a] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                         {post.category}
                       </span>
                    </div>
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg text-[#2563eb]">
                       <ArrowUpRight size={20} />
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col px-2 pb-2">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-[#2563eb] transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                       <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                          {post.author.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-xs font-bold text-slate-900">{post.author}</span>
                           <span className="text-[10px] text-slate-400 uppercase">{post.role}</span>
                        </div>
                       </div>
                       <div className="text-[#2563eb] opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 duration-300">
                          <ArrowRight size={18} />
                       </div>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <button className="px-10 py-4 rounded-full border border-slate-200 font-bold text-slate-600 hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a] transition-all flex items-center gap-2 mx-auto">
              Load More Articles <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* Newsletter CTA */}
      <FadeIn delay={400}>
                 <div className="m-10 bg-[#0f172a] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2563eb] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
                     <div className="relative z-10 max-w-2xl mx-auto">
                         <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Stay ahead of the curve.</h2>
                         <p className="text-lg text-white/60 mb-10">
                             Join 10,000+ founders and engineers receiving our bi-weekly deep dives into software excellence.
                         </p>
                         <div className="flex flex-col sm:flex-row gap-4">
                             <input
                               type="email"
                               placeholder="Enter your email"
                               className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#2563eb] focus:bg-white/20 transition-all"
                             />
                             <MagneticButton className="bg-[#facc15] text-[#0f172a] px-8 py-4 rounded-full font-bold hover:bg-white transition-colors">
                                 Subscribe
                             </MagneticButton>
                         </div>
                         <p className="text-xs text-white/30 mt-6">No spam. Unsubscribe anytime.</p>
                     </div>
                 </div>
             </FadeIn>

    </div>
  );
}