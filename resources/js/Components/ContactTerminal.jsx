import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ArrowRight, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { WHATSAPP_URL, EMAIL } from './WhatsAppButton';

// ─── Supported Currencies & Presets ───
const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', presets: ['1,500', '3,000', '5,000', '10,000+'] },
  NGN: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', presets: ['1,000,000', '2,500,000', '5,000,000', '10,000,000+'] },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', presets: ['1,200', '2,500', '4,500', '8,000+'] },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', presets: ['1,500', '3,000', '5,000', '10,000+'] },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', presets: ['2,000', '4,000', '7,500', '15,000+'] },
  AUD: { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar', presets: ['2,000', '4,500', '8,000', '15,000+'] },
  GHS: { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', presets: ['15,000', '30,000', '60,000', '120,000+'] },
  ZAR: { code: 'ZAR', symbol: 'R', name: 'South African Rand', presets: ['25,000', '50,000', '100,000', '200,000+'] },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', presets: ['5,000', '12,000', '25,000', '50,000+'] },
};

// ─── Fast Timezone-to-Currency Resolver ───
function detectLocalCurrency() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Lagos') || tz.includes('Nigeria') || tz.includes('Kano')) return 'NGN';
    if (tz.includes('London') || tz.includes('Edinburgh') || tz.includes('Belfast')) return 'GBP';
    if (
      tz.includes('Paris') || tz.includes('Berlin') || tz.includes('Amsterdam') ||
      tz.includes('Rome') || tz.includes('Madrid') || tz.includes('Brussels') ||
      tz.includes('Vienna') || tz.includes('Dublin') || tz.includes('Europe')
    ) return 'EUR';
    if (tz.includes('Toronto') || tz.includes('Vancouver') || tz.includes('Montreal') || tz.includes('Edmonton') || tz.includes('Winnipeg') || tz.includes('Calgary')) return 'CAD';
    if (tz.includes('Sydney') || tz.includes('Melbourne') || tz.includes('Brisbane') || tz.includes('Perth') || tz.includes('Adelaide') || tz.includes('Australia')) return 'AUD';
    if (tz.includes('Accra')) return 'GHS';
    if (tz.includes('Johannesburg') || tz.includes('Cape_Town')) return 'ZAR';
    if (tz.includes('Dubai') || tz.includes('Abu_Dhabi')) return 'AED';
  } catch (e) {}
  return 'USD';
}

// Email Validator
function validateEmail(email) {
  if (!email || !email.trim()) return false;
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const trimmed = email.trim();
  if (!re.test(trimmed)) return false;

  const parts = trimmed.split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1].toLowerCase();

  const fakeDomains = ['test.com', 'example.com', 'asdf.com', 'fake.com', 'tempmail.com', 'mailinator.com'];
  if (fakeDomains.includes(domain)) return false;

  return true;
}

export default function ContactTerminal({ isOpen, onClose }) {
  const { props } = usePage();
  const settings = props.settings || {};
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', budget: '', details: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Currency & Budget States (DEFAULT ALWAYS USD $)
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [recommendedCurrency, setRecommendedCurrency] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isFlexibleBudget, setIsFlexibleBudget] = useState(false);

  // Auto-detect local currency in background for recommendation only
  useEffect(() => {
    const local = detectLocalCurrency();
    if (local && local !== 'USD') {
      setRecommendedCurrency(local);
    }

    // Refine with IP lookup if available
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.currency && data.currency !== 'USD' && CURRENCIES[data.currency]) {
          setRecommendedCurrency(data.currency);
        } else if (data && data.country_code === 'NG') {
          setRecommendedCurrency('NGN');
        }
      })
      .catch(() => {});
  }, []);

  // Update formData.budget whenever currency or amount changes
  useEffect(() => {
    if (isFlexibleBudget) {
      setFormData(prev => ({ ...prev, budget: `Flexible Scope (${selectedCurrency})` }));
    } else if (customAmount.trim()) {
      const curr = CURRENCIES[selectedCurrency] || CURRENCIES.USD;
      setFormData(prev => ({ ...prev, budget: `${curr.symbol}${customAmount.trim()} ${selectedCurrency}` }));
    } else {
      setFormData(prev => ({ ...prev, budget: '' }));
    }
  }, [selectedCurrency, customAmount, isFlexibleBudget]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const isEmailValid = validateEmail(formData.email);
  const canProceedStep1 = formData.name.trim().length >= 2 && isEmailValid;

  const handleNext = () => {
    if (step === 1 && !canProceedStep1) {
      setEmailTouched(true);
      return;
    }
    setSubmitError(null);
    setStep(step + 1);
  };
  const handleBack = () => {
    setSubmitError(null);
    setStep(step - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.details.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      budget: formData.budget || 'Flexible Scope',
      details: formData.details.trim(),
    };

    router.post('/inquiry', payload, {
      preserveScroll: true,
      onSuccess: () => {
        setIsSubmitting(false);
        setStep(4);
        setTimeout(() => {
          onClose();
          setStep(1);
          setFormData({ name: '', email: '', budget: '', details: '' });
          setCustomAmount('');
          setIsFlexibleBudget(false);
          setEmailTouched(false);
          setSubmitError(null);
        }, 8000);
      },
      onError: (errors) => {
        setIsSubmitting(false);
        const firstError = Object.values(errors)[0] || 'Unable to submit your message. Please check all fields and try again.';
        setSubmitError(firstError);
      }
    });
  };

  const currObj = CURRENCIES[selectedCurrency] || CURRENCIES.USD;

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
            className="fixed inset-0 bg-black/85 backdrop-blur-xl z-[100]"
          />

          {/* Contact Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 md:inset-0 md:m-auto w-full md:max-w-2xl h-[92vh] md:h-fit md:max-h-[85vh] bg-zinc-950 border border-amber-500/20 rounded-t-3xl md:rounded-3xl z-[101] flex flex-col overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.95)]"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/[0.06] bg-zinc-950/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <span className="text-amber-400 text-sm">✉</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-heading">Start a Project Inquiry</h3>
                  <p className="text-[10px] text-zinc-400">Direct response within 24 hours</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-10 flex-grow overflow-y-auto relative z-10">
              <AnimatePresence mode="wait">
                
                {/* ════════ STEP 1: ABOUT YOU & EMAIL VERIFICATION ════════ */}
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }} transition={{ duration: 0.25 }}>
                    <div className="flex items-center gap-2 text-zinc-500 mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-amber-400">Step 1 of 3 · Your Information</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-white font-heading">
                      Let's start with an introduction
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm mb-6">
                      Tell us your name and your active email address so we can reply with your project proposal.
                    </p>

                    <div className="space-y-4 mb-8">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                          Your Full Name <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Olie Kings"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          onKeyDown={(e) => { if (e.key === 'Enter' && canProceedStep1) handleNext(); }}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-amber-500/60 focus:bg-white/[0.05] text-white text-sm placeholder:text-zinc-600 transition-all"
                          autoFocus
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                            Valid Email Address <span className="text-amber-400">*</span>
                          </label>
                          {formData.email && isEmailValid && (
                            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Valid email format
                            </span>
                          )}
                        </div>

                        <input
                          type="email"
                          placeholder="e.g. hello@yourdomain.com"
                          value={formData.email}
                          onBlur={() => setEmailTouched(true)}
                          onChange={(e) => {
                            setEmailTouched(true);
                            setFormData({...formData, email: e.target.value});
                          }}
                          onKeyDown={(e) => { if (e.key === 'Enter' && canProceedStep1) handleNext(); }}
                          className={`w-full bg-white/[0.03] border rounded-2xl px-4 py-3.5 focus:outline-none text-white text-sm placeholder:text-zinc-600 transition-all ${
                            emailTouched && formData.email && !isEmailValid
                              ? 'border-red-500/60 focus:border-red-500 bg-red-500/[0.02]'
                              : isEmailValid
                              ? 'border-emerald-500/40 focus:border-emerald-500 focus:bg-white/[0.05]'
                              : 'border-white/10 focus:border-amber-500/60 focus:bg-white/[0.05]'
                          }`}
                        />

                        {emailTouched && formData.email && !isEmailValid && (
                          <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" /> Please enter a valid deliverable email address (e.g. name@domain.com).
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={!canProceedStep1}
                      className="w-full py-4 bg-amber-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-400 transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] flex justify-center items-center gap-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* ════════ STEP 2: CUSTOM BUDGET (DEFAULT USD $) ════════ */}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }} transition={{ duration: 0.25 }}>
                    <div className="flex items-center gap-2 text-zinc-500 mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-amber-400">Step 2 of 3 · Budget & Currency</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-white font-heading">
                      What is your allocated budget?
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm mb-6">
                      Enter the amount you would like to work with in <strong>USD ($)</strong> or select another currency.
                    </p>

                    {/* Geolocation Recommended Currency Callout (If non-USD) */}
                    {recommendedCurrency && recommendedCurrency !== selectedCurrency && (
                      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-amber-300">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>Detected your local currency: <strong>{recommendedCurrency} ({CURRENCIES[recommendedCurrency]?.symbol})</strong></span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCurrency(recommendedCurrency);
                            setIsFlexibleBudget(false);
                          }}
                          className="px-3 py-1 bg-amber-500 text-black text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-amber-400 transition-colors"
                        >
                          Switch to {recommendedCurrency}
                        </button>
                      </div>
                    )}

                    {/* Currency Selector Pills */}
                    <div className="mb-6">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                        Currency (Default: USD $)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {Object.values(CURRENCIES).map((c) => {
                          const isSelected = selectedCurrency === c.code;

                          return (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => {
                                setSelectedCurrency(c.code);
                                setIsFlexibleBudget(false);
                              }}
                              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
                                isSelected
                                  ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-[1.02]'
                                  : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                              }`}
                            >
                              <span>{c.symbol}</span>
                              <span>{c.code}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom Amount Input */}
                    <div className="mb-6">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                        Enter Custom Amount ({currObj.name})
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 text-amber-400 font-extrabold text-lg pointer-events-none select-none">
                          {currObj.symbol}
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="e.g. 5,000"
                          value={customAmount}
                          disabled={isFlexibleBudget}
                          onChange={(e) => {
                            setIsFlexibleBudget(false);
                            setCustomAmount(e.target.value);
                          }}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-amber-500/60 focus:bg-white/[0.05] text-white text-lg font-bold placeholder:text-zinc-600 disabled:opacity-30 transition-all font-mono"
                        />
                        <span className="absolute right-4 text-xs font-bold uppercase tracking-wider text-zinc-500 pointer-events-none">
                          {selectedCurrency}
                        </span>
                      </div>
                    </div>

                    {/* Suggested Preset Buttons for Quick Choice */}
                    <div className="mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                        Or pick a quick suggested range:
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {currObj.presets.map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => {
                              setIsFlexibleBudget(false);
                              setCustomAmount(preset);
                            }}
                            className={`py-2.5 px-3 rounded-xl border text-xs font-semibold font-mono transition-all ${
                              customAmount === preset && !isFlexibleBudget
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)] font-bold'
                                : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:border-amber-500/30 hover:text-white'
                            }`}
                          >
                            {currObj.symbol}{preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Flexible Option Toggle */}
                    <div className="mb-8">
                      <button
                        type="button"
                        onClick={() => {
                          setIsFlexibleBudget(!isFlexibleBudget);
                          if (!isFlexibleBudget) setCustomAmount('');
                        }}
                        className={`w-full py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                          isFlexibleBudget
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/50'
                            : 'bg-white/[0.01] text-zinc-400 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isFlexibleBudget ? 'border-amber-400 bg-amber-400' : 'border-zinc-600'}`}>
                            {isFlexibleBudget && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                          </span>
                          <span>I'm flexible / Let's tailor the scope to my available budget</span>
                        </span>
                        <span className="text-[10px] text-zinc-500">Flexible</span>
                      </button>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleBack}
                        className="px-6 py-3.5 border border-white/10 text-zinc-400 rounded-2xl hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-wider"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={!formData.budget}
                        className="flex-1 py-3.5 bg-amber-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-400 transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] flex justify-center items-center gap-2"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ════════ STEP 3: PROJECT DETAILS ════════ */}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }} transition={{ duration: 0.25 }}>
                    <div className="flex items-center gap-2 text-zinc-500 mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-amber-400">Step 3 of 3 · Project Overview</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-white font-heading">
                      Tell us about your project
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm mb-6">
                      What are you looking to build? (Website, web app, mobile application, or digital growth).
                    </p>

                    {/* Submit Error Alert */}
                    {submitError && (
                      <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-3">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Summary Badge of User's budget */}
                    {formData.budget && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6 flex items-center justify-between text-xs">
                        <span className="text-zinc-400">Selected Budget:</span>
                        <span className="font-bold text-amber-300 font-mono">{formData.budget}</span>
                      </div>
                    )}

                    <div className="mb-8">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Project Scope & Goals <span className="text-amber-400">*</span>
                      </label>
                      <textarea
                        placeholder="Describe what you need built, your desired timeline, references, or key goals..."
                        value={formData.details}
                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                        className="w-full h-36 bg-white/[0.03] border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-amber-500/60 focus:bg-white/[0.05] text-white text-sm placeholder:text-zinc-600 transition-all resize-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleBack}
                        className="px-6 py-3.5 border border-white/10 text-zinc-400 rounded-2xl hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-wider"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!formData.details.trim() || isSubmitting}
                        className="flex-1 py-3.5 bg-amber-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-400 transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] flex justify-center items-center gap-2 group"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span>Submitting Inquiry</span>
                            <span className="flex gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce" style={{ animationDelay: '300ms' }} />
                            </span>
                          </span>
                        ) : (
                          <>
                            <span>Send Inquiry</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ════════ STEP 4: SUCCESS CONFIRMATION ════════ */}
                {step === 4 && (
                  <motion.div key="s4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 20 }} className="h-full flex flex-col items-center justify-center text-center py-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15, delay: 0.2 }}
                      className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 ring-4 ring-amber-500/10"
                    >
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-white font-heading">
                      Inquiry Received!
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm mb-6 max-w-sm">
                      Thank you <strong className="text-white">{formData.name}</strong>. We've logged your project scope and our team will reply to <span className="text-amber-400">{formData.email}</span> within 24 hours.
                    </p>

                    <div className="flex flex-col gap-3 w-full max-w-sm">
                      <a
                        href={`https://wa.me/2347066620068?text=Hello%20Surprise-MFs%20Tech,%20I%20just%20submitted%20an%20inquiry%20for%20a%20project%20with%20budget%20${encodeURIComponent(formData.budget || 'Flexible')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-4 rounded-2xl btn-whatsapp font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Instant WhatsApp Chat
                      </a>
                      <button
                        onClick={onClose}
                        className="w-full py-3 px-4 rounded-2xl text-zinc-500 hover:text-white text-xs uppercase tracking-wider transition-colors"
                      >
                        Close Window
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-white/[0.03]">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600"
                animate={{ width: `${(Math.min(step, 3) / 3) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
