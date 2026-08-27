import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowUp, Menu, X, ArrowRight, Instagram, Linkedin, Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import WhatsAppButton, { WHATSAPP_URL, EMAIL } from '../Components/WhatsAppButton';
import ContactTerminal from '../Components/ContactTerminal';

// Twitter / X Custom SVG Icon
function TwitterXIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Layout({ children }) {
  const { url, props } = usePage();
  const settings = props.settings || {};
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Global listener so any component can open the inquiry modal
  useEffect(() => {
    const handleOpenContact = () => setIsContactOpen(true);
    window.addEventListener('open-contact-modal', handleOpenContact);
    return () => window.removeEventListener('open-contact-modal', handleOpenContact);
  }, []);

  // Mouse tracking for site-wide dynamic glow
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Close mobile menu on URL change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [url]);

  const backgroundGlow = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(245,158,11,0.025), transparent 80%)`;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialLinks = [
    { key: 'social_instagram', label: 'Instagram', renderIcon: () => <Instagram className="w-4 h-4" /> },
    { key: 'social_twitter', label: 'X (formerly Twitter)', renderIcon: () => <TwitterXIcon className="w-4 h-4" /> },
    { key: 'social_linkedin', label: 'LinkedIn', renderIcon: () => <Linkedin className="w-4 h-4" /> },
    { key: 'social_github', label: 'GitHub', renderIcon: () => <Github className="w-4 h-4" /> },
  ].filter(s => settings[s.key]);

  return (
    <div className="min-h-screen bg-black text-zinc-50 selection:bg-amber-500 selection:text-black font-sans flex flex-col relative overflow-x-hidden">
      {/* Site-wide cursor glow (desktop only) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 hidden md:block"
        style={{ background: backgroundGlow }}
      />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Global Interactive Contact Terminal Modal */}
      <ContactTerminal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* ─── Header ─── */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          borderBottom: scrolled ? '1px solid rgba(245,158,11,0.08)' : '1px solid rgba(255,255,255,0)',
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 flex justify-between items-center"
      >
        <Link href="/" className="flex items-center gap-3 text-lg md:text-xl font-bold tracking-tighter uppercase group">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 group-hover:scale-125 transition-transform" />
          <span className="group-hover:opacity-80 transition-opacity">
            {settings.site_name || 'SURPRISE-MFs TECH'}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#services" className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 hover:text-amber-400 transition-colors relative group py-1">
            Services
            <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/projects" className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 hover:text-amber-400 transition-colors relative group py-1">
            Projects
            <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/team" className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 hover:text-amber-400 transition-colors relative group py-1">
            Team
            <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="px-5 py-2 rounded-full border border-amber-500/40 text-xs font-bold uppercase tracking-widest text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.08)] hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:scale-105"
          >
            Get in Touch
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-full border border-white/10 glass text-zinc-300 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.header>

      {/* ─── Mobile Drawer Menu ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-zinc-950 border-l border-amber-500/10 z-50 p-8 flex flex-col justify-between md:hidden"
            >
              <div>
                <div className="flex justify-between items-center mb-12">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Navigation</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-zinc-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex flex-col gap-6">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold tracking-tight uppercase hover:text-amber-400 transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/#services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold tracking-tight uppercase hover:text-amber-400 transition-colors"
                  >
                    Services
                  </Link>
                  <Link
                    href="/projects"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold tracking-tight uppercase hover:text-amber-400 transition-colors"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/team"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold tracking-tight uppercase hover:text-amber-400 transition-colors"
                  >
                    Team
                  </Link>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 space-y-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 rounded-full btn-whatsapp font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="w-full py-4 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors"
                >
                  Get in Touch <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-zinc-600 text-center pt-2">
                  {EMAIL}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Main Content ─── */}
      <main className="flex-grow pt-24">{children}</main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-amber-500/10 bg-black/60 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            {/* Col 1: Brand & Bio */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <Link href="/" className="inline-flex items-center gap-3 text-lg font-bold tracking-tighter uppercase mb-4 group">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 group-hover:scale-125 transition-transform" />
                  <span>{settings.site_name || 'SURPRISE-MFs TECH'}</span>
                </Link>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                  {settings.about_text || 'Premium software engineering, digital product design, and growth systems for forward-thinking brands globally.'}
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-white/[0.06]">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Direct Contact</p>
                <a href={`mailto:${EMAIL}`} className="text-sm text-zinc-300 hover:text-amber-400 transition-colors">
                  {EMAIL}
                </a>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-2">Explore</span>
              <Link href="/#services" className="text-sm text-zinc-400 hover:text-amber-400 transition-colors w-fit">
                Services
              </Link>
              <Link href="/projects" className="text-sm text-zinc-400 hover:text-amber-400 transition-colors w-fit">
                Featured Projects
              </Link>
              <Link href="/team" className="text-sm text-zinc-400 hover:text-amber-400 transition-colors w-fit">
                Our Team
              </Link>
              <button 
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="text-sm text-zinc-400 hover:text-amber-400 transition-colors w-fit text-left"
              >
                Send Inquiry
              </button>
            </div>

            {/* Col 3: Socials & Back to Top */}
            <div className="md:col-span-4 flex flex-col justify-between">
              {socialLinks.length > 0 && (
                <div className="mb-8">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 block mb-4">Connect</span>
                  <div className="flex flex-wrap gap-2.5">
                    {socialLinks.map(social => (
                      <a
                        key={social.key}
                        href={settings[social.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all"
                        title={social.label}
                        aria-label={social.label}
                      >
                        {social.renderIcon()}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-500 hover:text-amber-400 transition-colors group mt-auto"
              >
                Back to top
                <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-500 transition-all">
                  <ArrowUp className="w-3 h-3" />
                </span>
              </button>
            </div>
          </div>

          {/* Bottom: Signature */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-zinc-500 text-xs tracking-wide">
              Designed & Developed with <span className="text-amber-500">♥</span> by {settings.site_name || 'Surprise-MFs Tech'}
            </p>
            <p className="text-zinc-600 text-xs tracking-wide">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
