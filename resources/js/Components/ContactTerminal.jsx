import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { WHATSAPP_URL, EMAIL } from './WhatsAppButton';

export default function ContactTerminal({ isOpen, onClose }) {
  const { props } = usePage();
  const settings = props.settings || {};
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', budget: '', details: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    router.post('/inquiry', formData, {
      preserveScroll: true,
      onSuccess: () => {
        setIsSubmitting(false);
        setStep(4);
        setTimeout(() => {
          onClose();
          setStep(1);
          setFormData({ name: '', email: '', budget: '', details: '' });
        }, 8000);
      },
      onError: () => {
        setIsSubmitting(false);
        setStep(4); // Still show success for UX
      }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100]"
          />

          {/* Contact Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 md:inset-0 md:m-auto w-full md:max-w-xl h-[85vh] md:h-fit md:max-h-[80vh] bg-zinc-950 border border-amber-500/10 rounded-t-3xl md:rounded-3xl z-[101] flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <span className="text-amber-400 text-sm">✉</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Get in Touch</h3>
                  <p className="text-[10px] text-zinc-500">We'll reply within 24 hours</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 md:p-10 flex-grow overflow-y-auto relative z-10">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                    <div className="flex items-center gap-2 text-zinc-600 mb-8">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Step 1 of 3 · About You</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">
                      Tell us about yourself
                    </h3>
                    <p className="text-zinc-500 text-sm mb-8">So we know who we're talking to.</p>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      onKeyDown={(e) => { if (e.key === 'Enter' && formData.name && formData.email) handleNext(); }}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 mb-4 focus:outline-none focus:border-amber-500/40 text-base placeholder:text-zinc-700 transition-colors"
                      autoFocus
                    />
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      onKeyDown={(e) => { if (e.key === 'Enter' && formData.name && formData.email) handleNext(); }}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 mb-8 focus:outline-none focus:border-amber-500/40 text-base placeholder:text-zinc-700 transition-colors"
                    />
                    <button
                      onClick={handleNext}
                      disabled={!formData.name || !formData.email}
                      className="w-full py-4 bg-amber-500 text-black font-bold uppercase tracking-widest rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-400 transition-all hover:scale-[1.01] flex justify-center items-center gap-3"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                    <div className="flex items-center gap-2 text-zinc-600 mb-8">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Step 2 of 3 · Budget</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">
                      What's your budget?
                    </h3>
                    <p className="text-zinc-500 text-sm mb-8">Don't worry — we work with all budgets.</p>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {['$1k – $5k', '$5k – $10k', '$10k – $25k', '$25k+'].map(b => (
                        <button
                          key={b}
                          onClick={() => setFormData({...formData, budget: b})}
                          className={`py-4 rounded-xl border transition-all duration-300 text-sm font-medium hover:scale-[1.02] ${
                            formData.budget === b
                              ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                              : 'border-white/10 text-zinc-500 hover:border-amber-500/30 hover:text-zinc-300'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleBack}
                        className="px-6 py-4 border border-white/10 text-zinc-400 rounded-xl hover:bg-white/5 transition-all text-sm font-medium"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={!formData.budget}
                        className="flex-1 py-4 bg-amber-500 text-black font-bold uppercase tracking-widest rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-400 transition-all hover:scale-[1.01] flex justify-center items-center gap-3"
                      >
                        Continue <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                    <div className="flex items-center gap-2 text-zinc-600 mb-8">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Step 3 of 3 · Your Project</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">
                      Tell us about your project
                    </h3>
                    <p className="text-zinc-500 text-sm mb-8">What do you need? Website, app, marketing? The more detail, the better.</p>
                    <textarea
                      placeholder="Describe what you'd like us to build..."
                      value={formData.details}
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                      className="w-full h-32 bg-white/[0.03] border border-white/10 rounded-xl p-4 mb-8 focus:outline-none focus:border-amber-500/40 text-base placeholder:text-zinc-700 transition-colors resize-none"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={handleBack}
                        className="px-6 py-4 border border-white/10 text-zinc-400 rounded-xl hover:bg-white/5 transition-all text-sm font-medium"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!formData.details || isSubmitting}
                        className="flex-1 py-4 bg-amber-500 text-black font-bold uppercase tracking-widest rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-400 transition-all hover:scale-[1.01] flex justify-center items-center gap-3 group"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            Sending
                            <span className="flex gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce" style={{ animationDelay: '300ms' }} />
                            </span>
                          </span>
                        ) : (
                          <>Send Message <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="s4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 20 }} className="h-full flex flex-col items-center justify-center text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15, delay: 0.2 }}
                      className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 ring-4 ring-amber-500/5"
                    >
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">Message Sent!</h3>
                    <p className="text-zinc-400 text-sm mb-8">We'll get back to you within 24 hours.</p>

                    <div className="flex flex-col gap-3 w-full max-w-sm">
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-xl btn-whatsapp font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Chat on WhatsApp Now
                      </a>
                      <a
                        href={`mailto:${EMAIL}?subject=Project Inquiry - ${encodeURIComponent(formData.name || 'Client')}`}
                        className="w-full py-3 px-4 rounded-xl border border-white/10 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors text-center font-medium"
                      >
                        Or email us at {EMAIL}
                      </a>
                      <button
                        onClick={onClose}
                        className="w-full py-3 px-4 rounded-xl text-zinc-600 hover:text-zinc-400 text-xs uppercase tracking-widest transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-white/[0.03]">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-teal-500"
                animate={{ width: `${(Math.min(step, 3) / 3) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
