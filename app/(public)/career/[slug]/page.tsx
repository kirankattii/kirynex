"use client";

import React, { useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
 Check, ArrowLeft, Upload, FileText, Send
} from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagnaticButton';
import { getJobBySlug } from '@/lib/jobs';

const JobDetailView = ({ job }: { job: NonNullable<ReturnType<typeof getJobBySlug>> }) => {
    const router = useRouter();
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        portfolio: '',
        coverLetter: '',
        resume: null as File | null,
        resumeBase64: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                return;
            }
            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormState(prev => ({ 
                    ...prev, 
                    resume: file,
                    resumeBase64: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        // Validate required fields
        if (!formState.name.trim() || !formState.email.trim() || !formState.phone.trim()) {
            setError('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = {
                name: formState.name.trim(),
                email: formState.email.trim(),
                phone: formState.phone.trim(),
                portfolio: formState.portfolio.trim(),
                coverLetter: formState.coverLetter.trim(),
                jobTitle: job.title,
                department: job.department,
                resumeFileName: formState.resume?.name || '',
                resumeFile: formState.resumeBase64
            };

            const response = await fetch('/api/send-career-application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit application');
            }

            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-center px-6 animate-in fade-in duration-500 pt-24 pb-0">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6">
                    <Check size={40} />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Application Sent!</h2>
                <p className="text-slate-400 text-lg max-w-md mb-8">
                    Thanks for applying to be a {job.title}. We've received your details and will be in touch soon.
                </p>
                <MagneticButton 
                    onClick={() => router.push('/career')}
                    className="bg-[#2563eb] text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#050912]"
                >
                    Back to Jobs
                </MagneticButton>
            </div>
        );
    }

    return (
        <div className="pt-24 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
            {/* Header */}
            <div className="mb-8 md:mb-12">
                <button 
                    onClick={() => router.push('/career')}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 md:mb-8 text-sm font-bold uppercase tracking-wider cursor-pointer"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Openings
                </button>

                <div className="flex flex-wrap gap-3 md:gap-4 mb-4 md:mb-6">
                    <span className="px-3 py-1.5 rounded-full bg-[#2563eb]/20 border border-[#2563eb]/30 text-[#60a5fa] text-xs font-bold uppercase tracking-wider">
                        {job.department}
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider">
                        {job.type}
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider">
                        {job.location}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">{job.title}</h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed">{job.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                {/* Left Column: Details */}
                <div className="space-y-8 md:space-y-12">
                    <div className="space-y-4 md:space-y-6">
                        <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                            <Check className="text-[#2563eb]" size={24} />
                            Requirements
                        </h3>
                        <ul className="space-y-3 md:space-y-4">
                            {job.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-3 md:gap-4 text-slate-300 leading-relaxed text-sm md:text-base">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] mt-2.5 flex-shrink-0"></span>
                                    <span>{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-[#2563eb]/5 border border-[#2563eb]/20">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">Salary Range</h3>
                        <p className="text-2xl md:text-3xl font-bold text-[#60a5fa]">{job.salary}</p>
                        <p className="text-slate-400 text-sm mt-2">Plus equity and benefits.</p>
                    </div>
                </div>

                {/* Right Column: Application Form - 50% width on desktop */}
                <div>
                    <div className="lg:sticky lg:top-32 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-[#0b0f19] border border-white/10 shadow-2xl">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">Apply Now</h3>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Full Name */}
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-400 mb-2.5">
                                    Full Name <span className="text-red-400">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    value={formState.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-sm md:text-base"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-400 mb-2.5">
                                    Email Address <span className="text-red-400">*</span>
                                </label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    value={formState.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-sm md:text-base"
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-400 mb-2.5">
                                    Phone Number <span className="text-red-400">*</span>
                                </label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    required
                                    value={formState.phone}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-sm md:text-base"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            {/* Portfolio */}
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-400 mb-2.5">
                                    LinkedIn / Portfolio
                                </label>
                                <input 
                                    type="url" 
                                    name="portfolio"
                                    value={formState.portfolio}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-sm md:text-base"
                                    placeholder="https://linkedin.com/in/johndoe"
                                />
                            </div>

                            {/* Resume Upload */}
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-400 mb-2.5">
                                    Resume / CV
                                </label>
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full border-2 border-dashed border-white/10 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#2563eb]/50 hover:bg-[#2563eb]/5 transition-all group min-h-[120px]"
                                >
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                    {formState.resume ? (
                                        <div className="flex flex-col items-center gap-2 text-[#2563eb]">
                                            <FileText size={24} />
                                            <span className="text-sm font-medium text-center break-all px-2">{formState.resume.name}</span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFormState(prev => ({ ...prev, resume: null, resumeBase64: '' }));
                                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                                }}
                                                className="text-xs text-red-400 hover:text-red-300 mt-1 cursor-pointer"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload size={28} className="text-slate-500 group-hover:text-[#2563eb] mb-3 transition-colors" />
                                            <span className="text-xs md:text-sm text-slate-500 font-medium text-center">Click to upload</span>
                                            <span className="text-xs text-slate-600 mt-1">PDF, DOC, DOCX (Max 5MB)</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Cover Letter */}
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-400 mb-2.5">
                                    Cover Letter
                                </label>
                                <textarea 
                                    name="coverLetter"
                                    rows={5}
                                    value={formState.coverLetter}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all resize-none text-sm md:text-base"
                                    placeholder="Tell us why you're a great fit for this role..."
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#2563eb] text-white py-4 md:py-4.5 rounded-xl font-bold hover:bg-[#1d4ed8] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm md:text-base shadow-lg shadow-[#2563eb]/20"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        Submit Application <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CareerJobPage() {
    const params = useParams();
    const slug = params.slug as string;
    const job = getJobBySlug(slug);

    if (!job) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Job Not Found</h2>
                <p className="text-slate-400 text-lg max-w-md mb-8">
                    The job you're looking for doesn't exist or has been removed.
                </p>
                <MagneticButton 
                    onClick={() => window.location.href = '/career'}
                    className="bg-[#2563eb] text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#050912]"
                >
                    Back to Jobs
                </MagneticButton>
            </div>
        );
    }

    return <JobDetailView job={job} />;
}

