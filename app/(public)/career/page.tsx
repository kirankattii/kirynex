"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
 ArrowRight, Globe, Check, Sparkles,
 Heart, Coffee, Sun, Briefcase, Award, GraduationCap, Users
} from 'lucide-react';
import { useOnScreen } from '@/hooks/useOnScreen';
import { MagneticButton } from '@/components/ui/MagnaticButton';
import { JOBS } from '@/lib/jobs';
import { SITE_URL } from '@/lib/constants';

/* --- UTILS & HOOKS --- */

/* Mouse Follower Hook for Spotlight Effect */
const useMousePosition = () => {
 const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

 useEffect(() => {
   const updateMousePosition = (ev: MouseEvent) => {
     setMousePosition({ x: ev.clientX, y: ev.clientY });
   };
   window.addEventListener('mousemove', updateMousePosition);
   return () => window.removeEventListener('mousemove', updateMousePosition);
 }, []);

 return mousePosition;
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
 const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
 return (
   <div
     ref={ref as React.RefObject<HTMLDivElement>}
     style={{ transitionDelay: `${delay}ms` }}
     className={`transition-all duration-1000 ease-[0.19,1,0.22,1] transform ${
       isVisible ? "opacity-100 translate-y-0 filter-none" : "opacity-0 translate-y-12 blur-lg"
     } ${className}`}
   >
     {children}
   </div>
 );
};

/* --- COMPONENTS --- */

const BenefitCard = ({ icon: Icon, title, desc, delay }: { icon: React.ElementType; title: string; desc: string; delay: number }) => (
 <FadeIn delay={delay}>
   <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 h-full">
     <div className="w-12 h-12 rounded-2xl bg-[#2563eb]/20 flex items-center justify-center text-[#2563eb] mb-6 group-hover:scale-110 transition-transform">
       <Icon size={24} />
     </div>
     <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
     <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
   </div>
 </FadeIn>
);

const JobCard = ({ job, delay }: { job: typeof JOBS[0]; delay: number }) => (
 <FadeIn delay={delay}>
   <Link 
    href={`/career/${job.slug}`}
    className="group relative block p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-[#2563eb]/50 transition-all duration-300 cursor-pointer overflow-hidden"
   >
       <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
       <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div>
               <div className="flex items-center gap-3 mb-2">
                   <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-[#facc15]">{job.department}</span>
                   <span className="text-slate-500 text-xs font-medium">{job.type}</span>
               </div>
               <h3 className="text-2xl font-bold text-white group-hover:text-[#2563eb] transition-colors">{job.title}</h3>
               <p className="text-slate-400 text-sm mt-1">{job.location}</p>
           </div>
           <div className="flex items-center gap-2 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
               View Role <ArrowRight size={16} />
           </div>
       </div>
   </Link>
 </FadeIn>
);

/* --- MAIN COMPONENT --- */

const CareerPage = () => {
 const { x, y } = useMousePosition();

 // SEO: Set document title and meta tags
 useEffect(() => {
   document.title = "Careers at Kirynex - Join Our Team | IT Services Jobs";
   
   // Update or create meta tags
   const updateMetaTag = (name: string, content: string, isProperty = false) => {
     const attribute = isProperty ? 'property' : 'name';
     let meta = document.querySelector(`meta[${attribute}="${name}"]`);
     if (!meta) {
       meta = document.createElement('meta');
       meta.setAttribute(attribute, name);
       document.head.appendChild(meta);
     }
     meta.setAttribute('content', content);
   };

   // Description
   updateMetaTag('description', "Join Kirynex and build the future of tech. We're hiring Business Development Executives, IT Sales Executives, Digital Marketing Specialists, and more. Remote and Bengaluru positions available. Up to ₹25,000/month.");
   
   // Keywords
   updateMetaTag('keywords', "Kirynex careers, IT jobs Bengaluru, Business Development Executive, IT Sales Executive, Digital Marketing jobs, Software Development jobs, Remote IT jobs, Kirynex hiring");
   
   // Robots
   updateMetaTag('robots', 'index, follow');
   
   // Open Graph
   updateMetaTag('og:title', 'Careers at Kirynex - Join Our Team | IT Services Jobs', true);
   updateMetaTag('og:description', "Join Kirynex and build the future of tech. We're hiring Business Development Executives, IT Sales Executives, Digital Marketing Specialists, and more.", true);
   updateMetaTag('og:url', `${SITE_URL}/career`, true);
   updateMetaTag('og:type', 'website', true);
   updateMetaTag('og:image', `${SITE_URL}/og-image.jpg`, true);
   
   // Twitter Card
   updateMetaTag('twitter:card', 'summary_large_image');
   updateMetaTag('twitter:title', 'Careers at Kirynex - Join Our Team');
   updateMetaTag('twitter:description', "Join Kirynex and build the future of tech. We're hiring talented professionals for IT services, sales, and marketing roles.");
   updateMetaTag('twitter:image', `${SITE_URL}/og-image.jpg`);
   
   // Canonical link
   let canonical = document.querySelector('link[rel="canonical"]');
   if (!canonical) {
     canonical = document.createElement('link');
     canonical.setAttribute('rel', 'canonical');
     document.head.appendChild(canonical);
   }
   canonical.setAttribute('href', `${SITE_URL}/career`);
 }, []);

 // SEO Structured Data (JSON-LD)
 const organizationStructuredData = {
   "@context": "https://schema.org",
   "@type": "Organization",
   "name": "Kirynex",
   "url": SITE_URL,
   "logo": `${SITE_URL}/images/logo.png`,
   "description": "Kirynex combines world-class engineering with Apple-level design aesthetics. We craft digital experiences that define brands.",
   "address": {
     "@type": "PostalAddress",
     "addressLocality": "Bengaluru",
     "addressRegion": "Karnataka",
     "addressCountry": "IN"
   },
   "contactPoint": {
     "@type": "ContactPoint",
     "email": "kirynex1@gmail.com",
     "contactType": "Recruitment"
   },
   "sameAs": [
     "https://www.linkedin.com/company/kirynex/",
     "https://x.com/kirynex_in",
     "https://www.instagram.com/kirynex/"
   ]
 };

 const breadcrumbStructuredData = {
   "@context": "https://schema.org",
   "@type": "BreadcrumbList",
   "itemListElement": [
     {
       "@type": "ListItem",
       "position": 1,
       "name": "Home",
       "item": SITE_URL
     },
     {
       "@type": "ListItem",
       "position": 2,
       "name": "Careers",
       "item": `${SITE_URL}/career`
     }
   ]
 };

 return (
   <>
     {/* Structured Data (JSON-LD) */}
     <script
       type="application/ld+json"
       dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
     />
     <script
       type="application/ld+json"
       dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
     />
     {JOBS.map((job) => {
       const employmentTypeMap: Record<string, string> = {
         "Full Time": "FULL_TIME",
         "Part Time": "PART_TIME",
         "Freelance": "CONTRACTOR"
       };
       
       return (
         <script
           key={job.id}
           type="application/ld+json"
           dangerouslySetInnerHTML={{
             __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "JobPosting",
               "title": job.title,
               "description": job.description,
               "url": `${SITE_URL}/career/${job.slug}`,
               "identifier": {
                 "@type": "PropertyValue",
                 "name": "Kirynex",
                 "value": `KIRYNEX-${job.slug}`
               },
               "datePosted": new Date().toISOString(),
               "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
               "employmentType": employmentTypeMap[job.type] || "FULL_TIME",
               "hiringOrganization": {
                 "@type": "Organization",
                 "name": "Kirynex",
                 "sameAs": SITE_URL
               },
               "jobLocation": {
                 "@type": "Place",
                 "address": {
                   "@type": "PostalAddress",
                   "addressLocality": "Remote",
                   "addressCountry": "IN"
                 }
               },
               "baseSalary": {
                 "@type": "MonetaryAmount",
                 "currency": "INR",
                 "value": {
                   "@type": "QuantitativeValue",
                   "value": 25000,
                   "unitText": "MONTH"
                 }
               },
               "workHours": job.type,
               "qualifications": job.requirements.join(" "),
               "skills": job.requirements.join(", ")
             })
           }}
         />
       );
     })}

   <div className="font-sans antialiased text-white bg-[#050912] min-h-screen overflow-x-hidden selection:bg-[#2563eb] selection:text-white">
    
     {/* --- Dynamic Spotlight Effect --- */}
     <div
       className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
       style={{
         background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.06), transparent 80%)`
       }}
     />
    
     {/* Background Mesh Grid */}
     <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
       style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
     </div>

     {/* --- Content Area --- */}
     <>
            {/* --- Hero Section --- */}
            <section className="relative pt-48 pb-32 px-6">
            <div className="max-w-[90rem] mx-auto text-center relative z-10">
                <FadeIn>
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#facc15] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#facc15]"></span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-300">We are hiring</span>
                    </div>
                </FadeIn>
                
                <FadeIn delay={200}>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] text-white">
                        Do your life's <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-white animate-gradient-x">best work</span> here.
                    </h1>
                </FadeIn>

                <FadeIn delay={400}>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                        Join a collective of obsessively passionate engineers and designers building the software that defines tomorrow.
                    </p>
                </FadeIn>

                <FadeIn delay={600}>
                    <MagneticButton 
                        onClick={() => document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-[#2563eb] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-[#0f172a] shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all flex items-center gap-3 mx-auto"
                    >
                        View Open Roles <ArrowRight size={18} />
                    </MagneticButton>
                </FadeIn>
            </div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#2563eb]/20 to-transparent rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            </section>


            {/* --- Culture Section --- */}
            <section className="py-24 px-6 relative">
                <div className="max-w-[90rem] mx-auto">
                    <FadeIn>
                        <div className="w-full aspect-[21/9] rounded-[3rem] overflow-hidden relative shadow-2xl mb-24 group">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" style={{backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2400')"}}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050912] via-[#050912]/40 to-transparent opacity-90"></div>
                            <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-4xl">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">Not just a workplace.<br/>A movement.</h2>
                                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                                    We don't believe in bureaucracy or micromanagement. We believe in autonomy, mastery, and purpose. At Kirynex, you aren't a cog in a machine; you're the architect of it.
                                </p>
                            </div>
                        </div>
                    </FadeIn>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <FadeIn delay={200}>
                            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                                <span className="text-[#2563eb]">Obsession</span> is our <br/>standard setting.
                            </h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Good enough is the enemy of great. We sweat the details that others ignore. From the latency of an API call to the physics of a micro-interaction, we care deeply about the craft.
                            </p>
                            <div className="flex items-center gap-4 text-white font-bold">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                                    <Sparkles size={20} className="text-[#facc15]" />
                                </div>
                                <span>Pursuit of Perfection</span>
                            </div>
                        </FadeIn>
                        <FadeIn delay={400}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-square rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative group">
                                    <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800" alt="Team" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                                </div>
                                <div className="aspect-square rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative group translate-y-8">
                                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Meeting" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>


           
            {/* --- Open Roles --- */}
            <section id="open-roles" className="py-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <FadeIn className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold mb-4">Open Positions</h2>
                        <p className="text-slate-400 text-lg">Don't see your role? Email us anyway.</p>
                    </FadeIn>

                    <div className="space-y-4">
                        {JOBS.map((job, index) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                delay={100 * (index + 1)}
                            />
                        ))}
                    </div>
                </div>
            </section>
     </>
   </div>
   </>
 );
};

export default CareerPage;

