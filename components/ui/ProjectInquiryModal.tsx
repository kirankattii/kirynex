"use client";

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Zap, 
  Briefcase, 
  Globe, 
  Smartphone, 
  Cpu, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Calendar,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceOptions = [
  { id: 'web', label: 'Web Development', icon: Globe, desc: 'React, Next.js, Full-stack' },
  { id: 'mobile', label: 'Mobile App', icon: Smartphone, desc: 'iOS, Android, React Native' },
  { id: 'ai', label: 'AI Integration', icon: Cpu, desc: 'LLMs, Chatbots, Automation' },
  { id: 'design', label: 'Product Design', icon: Briefcase, desc: 'UI/UX, Branding, Systems' },
  { id: 'consulting', label: 'Tech Consulting', icon: Zap, desc: 'Architecture, Strategy' },
  { id: 'other', label: 'Other', icon: Sparkles, desc: 'Custom solutions' },
];

const timelineOptions = [
  { id: 'asap', label: 'ASAP' },
  { id: '1-3m', label: '1-3 Months' },
  { id: '3-6m', label: '3-6 Months' },
  { id: 'flexible', label: 'Flexible' },
];

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: [] as string[],
    timeline: '',
    message: '',
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Reset state when opening/closing
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setIsSubmitted(false);
      setSubmitError(null);
      setFormData({
        service: [],
        timeline: '',
        message: '',
        name: '',
        email: '',
        phone: '',
        company: '',
      });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => {
      const currentServices = prev.service;
      if (currentServices.includes(serviceId)) {
        // Remove service if already selected
        return { ...prev, service: currentServices.filter(id => id !== serviceId) };
      } else {
        // Add service if not selected
        return { ...prev, service: [...currentServices, serviceId] };
      }
    });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim()) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/send-project-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: formData.service, // Now an array
          timeline: formData.timeline,
          message: formData.message,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Close after showing success message for a few seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    }
  };

  // Variants for step transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const StepIndicator = ({ current }: { current: number }) => (
    <div className="flex gap-2 mb-8">
      {[1, 2, 3].map((num) => (
        <div 
          key={num} 
          className={`h-1.5 rounded-full transition-all duration-300 ${
            num <= current ? 'w-8 bg-brand-blue' : 'w-4 bg-slate-200'
          }`} 
        />
      ))}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 md:p-8 pb-0">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {isSubmitted ? "Success!" : "Let's Build It"}
                </h2>
                {!isSubmitted && (
                  <p className="text-slate-500 text-sm mt-1">
                    Tell us about your vision. Step {step} of 3.
                  </p>
                )}
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 size={48} className="text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                  <p className="text-slate-500 max-w-sm">
                    Our team is reviewing your project details. Expect a reply at <span className="font-semibold text-slate-900">{formData.email}</span> within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                  <StepIndicator current={step} />
                  
                  {/* Error Alert */}
                  {submitError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      ✗ {submitError}
                    </div>
                  )}

                  <AnimatePresence mode='wait' custom={step}>
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={1}
                        className="space-y-6"
                      >
                        <h3 className="text-lg font-semibold text-slate-900">What do you need help with?</h3>
                        <p className="text-sm text-slate-500 mb-4">Select all that apply</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {serviceOptions.map((item) => {
                            const Icon = item.icon;
                            const isSelected = formData.service.includes(item.id);
                            return (
                              <div
                                key={item.id}
                                onClick={() => handleServiceToggle(item.id)}
                                className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 hover:shadow-md ${
                                  isSelected
                                    ? 'border-brand-blue bg-blue-50/50 ring-1 ring-brand-blue'
                                    : 'border-slate-100 hover:border-brand-blue/30 bg-white'
                                }`}
                              >
                                <div className={`p-2 rounded-lg ${isSelected ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-500'}`}>
                                  <Icon size={20} />
                                </div>
                                <div className="flex-1">
                                  <div className={`font-semibold ${isSelected ? 'text-brand-blue' : 'text-slate-700'}`}>
                                    {item.label}
                                  </div>
                                  <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                                </div>
                                {isSelected && (
                                  <div className="flex-shrink-0">
                                    <div className="w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center">
                                      <span className="text-white text-xs font-bold">✓</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={1}
                        className="space-y-8"
                      >
                        {/* Timeline */}
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Calendar size={16} className="text-brand-blue" /> Timeline
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {timelineOptions.map((opt) => (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => handleChange('timeline', opt.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                                  formData.timeline === opt.id
                                    ? 'bg-brand-dark text-white border-brand-dark'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-brand-dark'
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-slate-900">Project Details</label>
                          <textarea
                            value={formData.message}
                            onChange={(e) => handleChange('message', e.target.value)}
                            placeholder="Tell us about the core problem you're solving..."
                            rows={6}
                            className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none text-slate-700 placeholder:text-slate-400"
                          />
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={1}
                        className="space-y-6"
                      >
                        <h3 className="text-lg font-semibold text-slate-900">Final Step: Your Details</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleChange('name', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Work Email</label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                              placeholder="john@company.com"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company (Optional)</label>
                            <input
                              type="text"
                              value={formData.company}
                              onChange={(e) => handleChange('company', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                              placeholder="Acme Inc."
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors font-medium"
                      >
                        <ArrowLeft size={18} /> Back
                      </button>
                    ) : (
                      <div /> /* Spacer */
                    )}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={step === 1 && formData.service.length === 0}
                        className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-dark text-white font-bold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-dark/20"
                      >
                        Next Step <ArrowRight size={18} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.name || !formData.email}
                        className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-blue text-white font-bold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-blue/30"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Submit Request <Send size={18} />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};