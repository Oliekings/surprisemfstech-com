import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link, Head, usePage } from '@inertiajs/react';
import { ArrowRight, Check, Palette, Code, ShoppingCart, Sparkles, BarChart3, Megaphone, Globe, Smartphone } from 'lucide-react';
import Layout from '../Layouts/Layout';
import ContactTerminal from '../Components/ContactTerminal';
import { MemberDetail } from './Team/Index';
import { WHATSAPP_URL } from '../Components/WhatsAppButton';

// ─── Animated Counter Component ───
function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const num = parseFloat(value) || 0;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(current * 10) / 10);
    }, (duration * 1000) / steps);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{isInView ? count : 0}{suffix}</span>;
}

// ─── Section Divider ───
function SectionDivider() {
  return <div className="line-glow mx-6 md:mx-12" />;
}

// ─── Service Icon Map ───
const serviceIcons = {
  'ui-ux-design': Palette,
  'custom-web-apps': Code,
  'e-commerce': ShoppingCart,
  'animations': Sparkles,
  'default': Globe,
};

export default function Home({ projects, team, settings, services }) {
  const { props } = usePage();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const heroY = useTransform(smoothProgress, [0, 0.2], ["0%", "40%"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  const projectCount = (projects || []).length;

  // Collaboration & Engagement models (no rigid amounts to avoid chasing clients away)
  const pricingPlans = [
    {
      badge: 'Fixed Scope',
      title: settings?.pricing_standard_title || 'Custom Project',
      desc: settings?.pricing_standard_desc || 'One-time build tailored to your exact needs. High-performing websites, web apps, or mobile applications.',
      price: 'Custom Quote',
      priceSubtitle: 'Bespoke pricing based on project deliverables',
      features: (settings?.pricing_standard_features || 'Custom UI/UX Design,Modern Tech Stack,30 Days Post-Launch Support,Complete Source Code Ownership').split(','),
      cta: settings?.pricing_standard_cta || 'Get Custom Quote',
      highlighted: false,
    },
    {
      badge: 'Most Popular',
      title: settings?.pricing_popular_title || 'Flexible Retainer',
      desc: settings?.pricing_popular_desc || 'Ongoing development, design updates, feature additions, and maintenance as your business scales.',
      price: 'Tailored Monthly',
      priceSubtitle: 'Agile sprints aligned with your milestones',
      features: (settings?.pricing_popular_features || 'Dedicated Senior Engineering,Weekly Sprint Cycles & Demos,Continuous Optimization,Priority Direct Communication').split(','),
      cta: settings?.pricing_popular_cta || 'Partner With Us',
      highlighted: true,
    },
    {
      badge: 'Startup & SME Friendly',
      title: settings?.pricing_flex_title || 'Budget-First',
      desc: settings?.pricing_flex_desc || 'Tell us what you have to invest and we\'ll architect the best possible solution.',
      price: 'Your Budget',
      priceSubtitle: 'We build to fit your numbers',
      features: (settings?.pricing_flex_features || 'High-Impact Feature Strategy,Scalable MVP Architecture,Transparent Cost Breakdown,Step-by-Step Growth Roadmap').split(','),
      cta: settings?.pricing_flex_cta || 'Share Your Budget',
      highlighted: false,
    },
  ];

  return (
    <>
      <Head title="Web & App Development Studio" />
      <ContactTerminal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <AnimatePresence>
        {selectedMember && (
          <MemberDetail
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
      <div ref={containerRef} className="flex flex-col w-full bg-black min-h-screen">

        {/* ════════ 1. HERO ════════ */}
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-12 z-10">
          {/* Warm gradient glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-gradient-to-b from-amber-500/[0.07] via-teal-500/[0.03] to-transparent blur-[120px] animate-float pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-amber-500/[0.04] blur-[80px] pointer-events-none" />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-6xl mx-auto w-full flex flex-col items-center text-center relative z-10"
          >
            {/* Badge */}
            <div className="overflow-hidden mb-10">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-warm text-[10px] font-medium tracking-[0.2em] uppercase text-amber-400/80"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Web & App Development Studio
              </motion.div>
            </div>

            {/* Main heading */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9] uppercase font-heading">
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                    className="text-white"
                  >
                    {settings?.hero_text ? (
                      (() => {
                        const words = settings.hero_text.trim().split(' ');
                        if (words.length <= 2) return words.join(' ');
                        return words.slice(0, -2).join(' ');
                      })()
                    ) : 'We build your'}
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
                    className="text-gradient-static"
                  >
                    {settings?.hero_text ? (
                      (() => {
                        const words = settings.hero_text.trim().split(' ');
                        if (words.length <= 2) return '';
                        return words.slice(-2).join(' ');
                      })()
                    ) : 'digital future.'}
                  </motion.div>
                </div>
              </h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="max-w-lg text-zinc-400 text-base md:text-lg font-normal tracking-wide leading-relaxed mb-10"
            >
              {settings?.hero_subtitle || "From idea to launch — websites, apps, and digital growth. Let's build something great together."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-amber-500 text-black font-bold text-sm uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_50px_rgba(245,158,11,0.25)] inline-flex items-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="relative z-10">Let's Talk</span>
              </a>
              <Link
                href="/projects"
                className="px-8 py-4 border border-white/15 text-sm uppercase tracking-widest rounded-full hover:bg-white/5 hover:border-amber-500/30 transition-all duration-300 font-medium text-center"
              >
                See Our Work
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-zinc-700"
          >
            <span className="text-[9px] font-medium uppercase tracking-[0.4em]">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-amber-500/30 to-transparent"
            />
          </motion.div>
        </section>

        {/* ════════ 2. WHAT WE DO — Services Grid ════════ */}
        <section id="services" className="px-6 md:px-12 py-24 bg-black z-20 relative scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-4 flex items-center justify-center gap-3">
                <span className="w-8 h-px bg-amber-500/30" />
                What We Do
                <span className="w-8 h-px bg-amber-500/30" />
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                Everything You Need to <br /><span className="text-gradient-static">Go Digital</span>
              </h3>
              <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto">
                Whether you need a stunning website, a powerful app, or a complete digital strategy — we've got you covered.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(services || []).map((service, i) => {
                const IconComponent = serviceIcons[service.slug] || serviceIcons.default;
                return (
                  <motion.div
                    key={service.id || i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={`/service/${service.slug}`}
                      className="block p-6 rounded-2xl glass group hover:bg-amber-500/[0.04] hover:border-amber-500/30 transition-all duration-500 h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all">
                          <IconComponent className="w-5 h-5 text-amber-400" />
                        </div>
                        <h4 className="text-lg font-bold tracking-tight mb-2 group-hover:text-amber-300 transition-colors">{service.title}</h4>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-4">{service.description}</p>
                      </div>
                      <span className="text-xs font-medium text-amber-400/80 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Additional service cards for clarity */}
              {[
                { slug: 'mobile-apps', icon: Smartphone, title: 'Mobile Apps', desc: 'Native and cross-platform apps for iOS and Android that your users will love.' },
                { slug: 'digital-advertising', icon: BarChart3, title: 'Digital Advertising', desc: 'Google Ads, Meta, and TikTok campaigns that turn clicks into customers.' },
                { slug: 'brand-strategy', icon: Megaphone, title: 'Brand Strategy', desc: 'Logo design, brand guidelines, and visual identity that sets you apart.' },
                { slug: 'seo-growth', icon: Globe, title: 'SEO & Growth', desc: 'Search engine optimization and growth strategies to get you found online.' },
              ].filter((_, i) => i < (4 - (services || []).length)).map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ((services || []).length + i) * 0.1 }}
                >
                  <Link
                    href={`/service/${item.slug}`}
                    className="block p-6 rounded-2xl glass group hover:bg-amber-500/[0.04] hover:border-amber-500/30 transition-all duration-500 h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all">
                        <item.icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <h4 className="text-lg font-bold tracking-tight mb-2 group-hover:text-amber-300 transition-colors">{item.title}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                    </div>
                    <span className="text-xs font-medium text-amber-400/80 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ 3. MARQUEE ════════ */}
        <section className="py-6 border-y border-amber-500/[0.08] bg-black z-20 overflow-hidden flex whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            className="flex gap-12 text-3xl md:text-5xl font-bold tracking-tighter uppercase"
            style={{ WebkitTextStroke: '1px rgba(245,158,11,0.15)' }}
          >
            {(services || []).length > 0 ? [...services, ...services, ...services].map((service, index) => (
              <div key={`${service.id}-${index}`} className="flex items-center gap-12">
                <Link href={`/service/${service.slug}`} className="text-transparent hover:text-amber-400 transition-all duration-500 whitespace-nowrap" style={{ WebkitTextStroke: 'inherit' }}>
                  {service.title}
                </Link>
                <span className="text-amber-500/20 text-lg">·</span>
              </div>
            )) : (
              <span className="opacity-10 uppercase tracking-widest">Loading services...</span>
            )}
          </motion.div>
        </section>

        <SectionDivider />

        {/* ════════ 4. WHO WE ARE ════════ */}
        <section className="px-6 md:px-12 py-32 bg-black z-20 relative">
          {/* Warm glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-amber-500/30" />
                  Who We Are
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] mb-8">
                  Your Tech Team,<br />
                  <span className="text-gradient-static">On Demand</span>
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-4">
                  {settings?.about_text || "We're a small, senior team of designers and developers who care about your business like it's our own. Since 2019, we've been building websites, apps, and digital campaigns that actually bring in customers."}
                </p>
                <p className="text-zinc-500 text-base leading-relaxed mb-10">
                  {settings?.about_subtext || "Surprise-MFs Tech was founded to make professional-grade digital solutions accessible to businesses of all sizes. We don't just deliver projects — we build partnerships."}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '🎨', label: 'Beautiful Design' },
                    { icon: '⚡', label: 'Fast & Reliable' },
                    { icon: '📈', label: 'Built to Convert' },
                    { icon: '🤝', label: 'Dedicated Support' },
                  ].map(({ icon, label }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-4 rounded-2xl glass group hover:bg-amber-500/[0.04] transition-colors"
                    >
                      <span className="text-xl">{icon}</span>
                      <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">{label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: projectCount || 5, suffix: '+', label: 'Projects Delivered', color: 'amber' },
                  { value: 7, suffix: '+', label: 'Years Building', color: 'teal' },
                  { value: 100, suffix: '%', label: 'Client Satisfaction', color: 'amber' },
                  { value: 24, suffix: '/7', label: 'Support Available', color: 'teal' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`p-6 md:p-8 rounded-2xl glass hover:bg-${stat.color === 'amber' ? 'amber' : 'teal'}-500/[0.04] transition-all duration-500 text-center`}
                  >
                    <p className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color === 'amber' ? 'text-amber-400' : 'text-teal-400'}`}>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ════════ 5. PROJECTS ════════ */}
        <section className="px-6 md:px-12 py-32 bg-black z-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-24">
              <div>
                <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-amber-500/30" />
                  Recent Work
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">
                  Featured<br /><span className="text-gradient-static">Projects</span>
                </h3>
              </div>
              <Link href="/projects" className="hidden md:flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-zinc-500 hover:text-amber-400 transition-colors group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex flex-col gap-32">
              {(projects || []).map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {/* Mobile view all */}
            <div className="mt-16 md:hidden text-center">
              <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest border border-amber-500/20 px-6 py-3 rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 group">
                View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ════════ 6. DIGITAL ADVERTISING ════════ */}
        <section className="px-6 md:px-12 py-32 bg-black z-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-4 flex items-center justify-center gap-3">
                <span className="w-8 h-px bg-amber-500/30" />
                Grow Your Business
                <span className="w-8 h-px bg-amber-500/30" />
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                Get More Customers<br /><span className="text-gradient-static">Online</span>
              </h3>
              <p className="text-zinc-500 text-lg leading-relaxed">
                We take the guesswork out of digital marketing. Whether it's Google, Meta, or TikTok — we create ads that turn into sales.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { metric: "Google Ads", label: "Search & Display", desc: "Appear right when customers are looking for what you offer." },
                { metric: "Social Ads", label: "Meta & TikTok", desc: "Stop the scroll with content that actually converts." },
                { metric: "Retargeting", label: "Stay Top of Mind", desc: "Bring back visitors who didn't buy the first time." }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl glass group hover:bg-amber-500/[0.04] hover:border-amber-500/20 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="text-2xl font-bold tracking-tighter mb-3 text-amber-400 uppercase">{stat.metric}</div>
                  <h4 className="text-lg font-semibold mb-2 text-zinc-300">{stat.label}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ════════ 7. COLLABORATION & PRICING ════════ */}
        <section id="pricing" className="px-6 md:px-12 py-32 bg-black z-20 relative scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-4 flex items-center justify-center gap-3">
                <span className="w-8 h-px bg-amber-500/30" />
                Transparent Collaboration
                <span className="w-8 h-px bg-amber-500/30" />
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                Tell Us What You Need,<br /><span className="text-gradient-static">We'll Make It Work</span>
              </h3>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                No rigid price tags or surprises. Whether you have a strict budget or need a full-scale custom solution, we adapt our roadmap and send a clear, tailored quotation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-16">
              {pricingPlans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className={`p-8 lg:p-10 rounded-3xl flex flex-col justify-between relative overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                    plan.highlighted
                      ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-black border-gradient scale-[1.02] shadow-[0_0_60px_rgba(245,158,11,0.15)]'
                      : 'glass hover:bg-amber-500/[0.04] border border-white/10 hover:border-amber-500/30'
                  }`}
                >
                  {plan.badge && (
                    <div className={`absolute top-0 right-0 text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest ${
                      plan.highlighted
                        ? 'bg-black text-amber-400'
                        : 'bg-amber-500/10 text-amber-400 border-l border-b border-amber-500/20'
                    }`}>
                      {plan.badge}
                    </div>
                  )}
                  <div>
                    <h4 className="text-2xl font-bold tracking-tight mb-2 uppercase">{plan.title}</h4>
                    <p className={`text-sm mb-6 ${plan.highlighted ? 'text-amber-950/80 font-medium' : 'text-zinc-400'}`}>{plan.desc}</p>
                    <div className="mb-6 pb-6 border-b border-black/10">
                      <div className="text-3xl font-bold tracking-tight mb-1">
                        {plan.price}
                      </div>
                      <p className={`text-xs ${plan.highlighted ? 'text-amber-950/70' : 'text-zinc-500'}`}>
                        {plan.priceSubtitle}
                      </p>
                    </div>
                    <ul className={`space-y-3 text-sm mb-8 ${plan.highlighted ? 'text-amber-950 font-medium' : 'text-zinc-300'}`}>
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? 'text-black' : 'text-amber-400'}`} />
                          <span>{f.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className={`w-full py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 ${
                      plan.highlighted
                        ? 'bg-black text-amber-400 hover:bg-zinc-900 shadow-md'
                        : 'border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black'
                    }`}
                  >
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Direct Contact reassurance banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-2xl glass-warm border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
            >
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Have a specific idea or budget in mind?</h4>
                <p className="text-sm text-zinc-400">Tell us what you're looking to build. We'll reply with an honest estimate and free project roadmap.</p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0 justify-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full btn-whatsapp font-bold text-xs uppercase tracking-widest flex items-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-6 py-3 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-all"
                >
                  Send Inquiry Form
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* ════════ 8. TEAM ════════ */}
        <section className="px-6 md:px-12 py-32 bg-black z-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-amber-500/30" />
                  The Team
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">
                  Meet the <span className="text-gradient-static">Builders</span>
                </h3>
              </div>
              <Link href="/team" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest border border-amber-500/20 px-6 py-3 rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 group">
                View Full Team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(team || []).slice(0, 4).map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="aspect-[3/4] bg-zinc-900 mb-4 overflow-hidden rounded-2xl grayscale group-hover:grayscale-0 group-hover:border-amber-500/30 border border-transparent transition-all duration-700 relative">
                    <img
                      src={member.avatar_path}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-amber-500 px-3.5 py-1.5 rounded-full shadow-lg">
                        View Profile
                      </span>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors font-heading">{member.name}</h4>
                  <p className="text-xs text-amber-400/80 uppercase tracking-widest">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ════════ 9. CTA SECTION ════════ */}
        <section id="contact" className="px-6 md:px-12 py-32 bg-black z-20 relative scroll-mt-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 p-12 lg:p-16 rounded-3xl glass relative overflow-hidden flex flex-col justify-between min-h-[300px]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.05] rounded-full blur-[80px] pointer-events-none" />
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-12 relative z-10">
                Let's Build Something<br /><span className="text-gradient-static">Great Together.</span>
              </h3>
              <div className="flex gap-12 md:gap-16 relative z-10">
                <div>
                  <p className="text-4xl lg:text-5xl font-bold mb-2 text-amber-400">
                    <AnimatedCounter value={projectCount || 5} suffix="+" />
                  </p>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Projects Delivered</p>
                </div>
                <div>
                  <p className="text-4xl lg:text-5xl font-bold mb-2 text-teal-400">
                    <AnimatedCounter value={7} suffix="+" />
                  </p>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Years Building</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="p-10 lg:p-12 rounded-3xl bg-gradient-to-b from-amber-500 to-amber-600 text-black flex flex-col justify-between min-h-[300px] group hover:shadow-[0_0_80px_rgba(245,158,11,0.15)] transition-shadow duration-700"
            >
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-3">
                  Ready to<br />get started?
                </h3>
                <p className="text-amber-900 text-sm leading-relaxed">Start a conversation. We'll help turn your vision into reality.</p>
              </div>
              <div className="flex flex-col gap-3 mt-8">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-black text-amber-400 font-bold uppercase tracking-widest text-sm py-3 px-6 rounded-full hover:bg-zinc-900 transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm group/btn border-2 border-black/20 py-3 px-6 rounded-full hover:bg-black/10 transition-all"
                >
                  Fill Out Form <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

Home.layout = page => <Layout children={page} />;

// ─── Project Card ───
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1 }}
      className="group relative"
    >
      {/* Project number */}
      <div className="absolute -left-2 md:left-0 top-0 text-[8rem] md:text-[12rem] font-bold text-amber-500/[0.04] leading-none tracking-tighter pointer-events-none select-none z-0">
        {number}
      </div>

      <div className={`relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-center`}>
        <div className={`w-full md:w-2/3 overflow-hidden rounded-2xl bg-zinc-900 aspect-[16/10] relative ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
          <Link href={`/project/${project.slug}`} className="absolute inset-0 z-20" />
          {project.featured_image && !imgError ? (
            <motion.img
              style={{ y, scale: 1.15 }}
              src={project.featured_image}
              alt={project.title}
              className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-100 transition-all duration-700"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-900 border border-white/5">
              <span className="text-6xl font-bold text-amber-500/[0.1] uppercase select-none">
                {project.title?.charAt(0) || '✦'}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
        </div>

        <div className={`w-full md:w-1/3 flex flex-col ${index % 2 !== 0 ? 'md:order-1 md:items-end md:text-right' : ''}`}>
          <div className="overflow-hidden mb-4">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs font-medium uppercase tracking-[0.2em] text-amber-400/60"
            >
              {project.client_name} · {new Date(project.completion_date).getFullYear()}
            </motion.p>
          </div>

          <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 uppercase">
            <Link href={`/project/${project.slug}`} className="hover:text-amber-300 transition-colors">
              {project.title}
            </Link>
          </h3>

          <p className="text-zinc-500 text-base leading-relaxed mb-8">{project.summary}</p>

          <Link
            href={`/project/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest border border-amber-500/20 px-6 py-3 rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 w-fit group/link"
          >
            View Project <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
