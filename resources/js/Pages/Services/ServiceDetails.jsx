import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';
import Layout from '../../Layouts/Layout';
import { WHATSAPP_URL, EMAIL } from '../../Components/WhatsAppButton';

export default function ServiceDetails({ slug, serviceData }) {
  const { props } = usePage();
  const settings = props.settings || {};
  const service = serviceData;

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Service not found</h2>
        <Link href="/" className="px-6 py-3 rounded-full bg-amber-500 text-black font-bold text-sm uppercase tracking-widest">
          Return Home
        </Link>
      </div>
    );
  }

  const serviceFeatures = {
    'ui-ux-design': [
      'Interactive User Experience Design',
      'Modern Design Systems & Styleguides',
      'High-Fidelity Wireframes & Prototypes',
      'Conversion-Rate-Optimized User Flows',
    ],
    'custom-web-apps': [
      'High-Performance Web Applications',
      'Scalable Database & API Architectures',
      'Seamless Third-Party Integrations',
      'Robust Security & Authentication',
    ],
    'mobile-apps': [
      'iOS & Android Cross-Platform Apps',
      'Smooth 60FPS Micro-Animations',
      'Offline Storage & Push Notifications',
      'App Store & Play Store Deployment',
    ],
    'digital-advertising': [
      'Targeted Google Search & Display Ads',
      'High-Converting Meta & TikTok Campaigns',
      'Audience Retargeting & Lookalikes',
      'Real-Time Analytics & ROI Tracking',
    ],
    'brand-strategy': [
      'Memorable Logo & Brand Identity',
      'Typography & Color Palette Guidelines',
      'Marketing Collateral & Social Kits',
      'Strategic Market Positioning',
    ],
    'seo-growth': [
      'On-Page & Technical SEO Audits',
      'High-Intent Keyword Strategy',
      'Speed & Core Web Vitals Optimization',
      'Organic Traffic & Conversion Growth',
    ],
    'e-commerce': [
      'Frictionless Checkout & Payment Gateways',
      'Mobile-First Product Catalogues',
      'Inventory & Order Management',
      'Automated Abandoned Cart Recovery',
    ],
    'animations': [
      'Purposeful UI & Micro-Interactions',
      'Scroll-Driven Parallax Dynamics',
      'Interactive 3D & Vector Animations',
      'Optimized Lightweight Assets',
    ],
  };

  const currentFeatures = serviceFeatures[slug] || [
    'Comprehensive Discovery & Strategy',
    'Custom Tailored Execution',
    'High Performance & Scalability',
    'Dedicated Launch & Ongoing Support',
  ];

  return (
    <>
      <Head title={`${service.title} - Surprise-MFs Tech`} />

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full min-h-screen relative">
        {/* Warm ambient background glow */}
        <div className="absolute top-24 left-1/3 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

        <Link
          href="/"
          className="inline-flex items-center text-xs font-medium uppercase tracking-widest text-zinc-500 hover:text-amber-400 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="mb-20 md:w-3/4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 glass-warm text-[10px] font-medium tracking-[0.2em] uppercase text-amber-400 mb-6"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            Service Specialization
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase mb-6 leading-[0.95]"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-zinc-400 font-normal leading-relaxed max-w-3xl"
          >
            {service.description}
          </motion.p>
        </div>

        {/* Approach & Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24 relative z-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-3xl glass"
          >
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-amber-500/30" />
              What We Deliver
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              Built to Scale Your Business
            </h3>
            <p className="text-base text-zinc-400 leading-relaxed mb-8">
              We approach every {service.title} project with precision and a dedication to quality. You get direct collaboration with senior builders focused on delivering real results.
            </p>
            <ul className="space-y-4 text-sm text-zinc-300">
              {currentFeatures.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Feature Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-3xl glass-warm border border-amber-500/20 relative overflow-hidden flex flex-col justify-between min-h-[360px]"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/[0.08] rounded-full blur-[80px] pointer-events-none" />

            <div>
              <span className="text-4xl mb-4 block">🚀</span>
              <h4 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
                Ready to start your {service.title} project?
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Tell us about your timeline, goals, and budget. We’ll provide an honest roadmap and transparent pricing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-6 rounded-full btn-whatsapp font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL}?subject=Inquiry: ${encodeURIComponent(service.title)}`}
                className="flex-1 py-3.5 px-6 rounded-full border border-white/20 text-white hover:bg-white hover:text-black font-medium text-xs uppercase tracking-widest text-center transition-all flex items-center justify-center"
              >
                Email Inquiry
              </a>
            </div>
          </motion.div>
        </div>

        {/* Big Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-teal-500/10 border border-amber-500/20 p-10 md:p-16 text-center relative overflow-hidden"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
            Let's Build Something <span className="text-gradient-static">Exceptional</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Get your project off the ground with a dedicated engineering and design team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-amber-500 text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-amber-400 transition-all flex items-center gap-2 shadow-[0_0_40px_rgba(245,158,11,0.2)]"
            >
              Start Conversation <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/projects"
              className="px-8 py-4 border border-white/20 text-white font-medium uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-all"
            >
              View Our Work
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}

ServiceDetails.layout = page => <Layout children={page} />;
