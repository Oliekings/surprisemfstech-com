import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Github, Linkedin, Twitter, Instagram, Globe, Mail, Sparkles, MessageCircle, X } from 'lucide-react';
import Layout from '../../Layouts/Layout';
import { WHATSAPP_URL, EMAIL } from '../../Components/WhatsAppButton';

// ─── Social Icon Resolver ───
function SocialIcon({ platform, className }) {
  const p = (platform || '').toLowerCase();
  if (p.includes('github')) return <Github className={className} />;
  if (p.includes('linkedin')) return <Linkedin className={className} />;
  if (p.includes('twitter') || p === 'x') return <Twitter className={className} />;
  if (p.includes('instagram')) return <Instagram className={className} />;
  if (p.includes('mail') || p.includes('email')) return <Mail className={className} />;
  return <Globe className={className} />;
}

// ─── Helper to Normalize Social Links ───
export function normalizeSocialLinks(links) {
  if (!links) return [];
  if (Array.isArray(links)) {
    return links
      .map(item => {
        if (typeof item === 'object' && item !== null) {
          return {
            platform: item.platform || item.name || 'Website',
            url: item.url || item.link || ''
          };
        }
        return null;
      })
      .filter(item => item && item.url);
  }
  if (typeof links === 'object') {
    return Object.entries(links)
      .map(([platform, url]) => ({
        platform,
        url: typeof url === 'string' ? url : (url?.url || '')
      }))
      .filter(item => item.url);
  }
  return [];
}

// ─── Member Expanded Detail Panel ───
export function MemberDetail({ member, onClose }) {
  const [imgError, setImgError] = useState(false);
  const socialList = normalizeSocialLinks(member?.social_links);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!member) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
      />

      {/* Content Modal */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden glass-strong border border-amber-500/20 shadow-2xl bg-zinc-950/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Portrait */}
        <div className="aspect-square md:aspect-auto bg-zinc-900 relative overflow-hidden min-h-[300px]">
          {member.avatar_path && !imgError ? (
            <img
              src={member.avatar_path}
              alt={member.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[120px] font-bold text-amber-500/[0.15] uppercase select-none">
                {member.name?.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/60" />
        </div>

        {/* Info & Bio */}
        <div className="p-8 md:p-10 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
          <div>
            {/* Header / Close */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Team Builder
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all text-xs text-zinc-400"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/80 mb-1.5">
              {member.role}
            </p>

            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 text-white font-heading">
              {member.name}
            </h2>

            <div className="text-zinc-300 text-xs md:text-sm leading-relaxed mb-6 space-y-3 whitespace-pre-line border-t border-zinc-800/80 pt-4">
              {member.bio || 'Dedicated to crafting high-performance digital experiences and scalable software systems.'}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-800">
            {/* Social Links */}
            {socialList.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {socialList.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/10 text-zinc-400 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all text-xs font-medium"
                  >
                    <SocialIcon platform={item.platform} className="w-3.5 h-3.5" />
                    <span>{item.platform}</span>
                  </a>
                ))}
              </div>
            )}

            {/* Direct Connect CTA */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/2347066620068?text=Hello%20Surprise-MFs%20Tech,%20I'd%20like%20to%20collaborate%20with%20${encodeURIComponent(member.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-amber-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Work with {member.name.split(' ')[0]}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Initial Letter Fallback ───
function AvatarFallback({ name, className = '' }) {
  return (
    <div className={`w-full h-full flex items-center justify-center relative ${className}`}>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px'
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-500/[0.04] rounded-full blur-[60px] group-hover:bg-amber-500/[0.08] transition-all duration-700" />
      <span className="text-[100px] font-bold text-amber-500/[0.08] uppercase select-none group-hover:text-amber-500/[0.15] transition-colors duration-700 relative z-10">
        {name?.charAt(0)}
      </span>
    </div>
  );
}

// ─── Individual Member Card ───
function MemberCard({ member, index, onClick }) {
  const cardRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      layout
      key={member.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onClick={() => onClick(member)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-zinc-900/60 rounded-2xl overflow-hidden mb-5 border border-white/[0.06] group-hover:border-amber-500/40 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-500">
        {member.avatar_path && !imgError ? (
          <img
            src={member.avatar_path}
            alt={member.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <AvatarFallback name={member.name} />
        )}

        {/* Hover overlay with button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-black bg-amber-500 px-4 py-2 rounded-full shadow-lg">
              View Profile
            </span>
            <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Name & Role */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors duration-300 font-heading">
            {member.name}
          </h3>
          <p className="text-xs uppercase tracking-widest text-amber-400/80 mt-1">
            {member.role}
          </p>
        </div>
        <span className="text-xs font-mono text-zinc-600 mt-1">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main Team Page ───
export default function Team({ team }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.6], ["0%", "15%"]);

  const roles = Array.from(new Set((team || []).map(m => m.role).filter(Boolean)));
  const filteredMembers = activeFilter
    ? (team || []).filter(m => m.role === activeFilter)
    : (team || []);

  return (
    <>
      <Head title="Meet the Builders — Surprise-MFs Tech" />

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <MemberDetail
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col w-full bg-black min-h-screen">

        {/* ════════ HERO HEADER ════════ */}
        <section ref={headerRef} className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
            className="max-w-7xl mx-auto relative z-10"
          >
            {/* Breadcrumb nav */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 glass-warm text-[10px] font-medium tracking-[0.2em] uppercase text-amber-400 mb-8"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              The People Behind the Code
            </motion.div>

            {/* Main heading */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <div className="overflow-hidden mb-2">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] uppercase font-heading text-white"
                  >
                    Meet the
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] uppercase font-heading text-gradient-static"
                  >
                    Builders
                  </motion.h1>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="lg:pb-2"
              >
                <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-normal mb-6">
                  A small, senior collective of designers, software engineers, and product strategists focused on building software that solves real business problems.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="line-glow mx-6 md:mx-12" />

        {/* ════════ FILTER BAR ════════ */}
        {roles.length > 1 && (
          <section className="px-6 md:px-12 py-6 sticky top-[72px] z-40 bg-black/85 backdrop-blur-xl border-b border-amber-500/10">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6"
              >
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 hidden md:block">
                  Filter
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveFilter(null)}
                    className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:scale-[1.02] ${
                      activeFilter === null
                        ? 'bg-amber-500 text-black font-bold shadow-md'
                        : 'text-zinc-400 border border-white/10 hover:border-amber-500/30 hover:text-white'
                    }`}
                  >
                    All ({(team || []).length})
                  </button>
                  {roles.map(role => {
                    const count = (team || []).filter(m => m.role === role).length;
                    return (
                      <button
                        key={role}
                        onClick={() => setActiveFilter(role)}
                        className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:scale-[1.02] ${
                          activeFilter === role
                            ? 'bg-amber-500 text-black font-bold shadow-md'
                            : 'text-zinc-400 border border-white/10 hover:border-amber-500/30 hover:text-white'
                        }`}
                      >
                        {role} ({count})
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ════════ TEAM GRID ════════ */}
        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-14"
            >
              <AnimatePresence mode="popLayout">
                {filteredMembers.map((member, idx) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    index={idx}
                    onClick={setSelectedMember}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredMembers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32"
              >
                <p className="text-zinc-500 text-lg mb-2">No team members found in this discipline.</p>
                <button
                  onClick={() => setActiveFilter(null)}
                  className="px-6 py-2 rounded-full border border-amber-500/30 text-amber-400 text-xs uppercase tracking-widest mt-4 hover:bg-amber-500 hover:text-black transition-all"
                >
                  Reset Filter
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* ════════ JOIN / WORK WITH US CTA ════════ */}
        <section className="px-6 md:px-12 py-24 relative overflow-hidden bg-zinc-950">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-6 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-amber-500/30" />
              Build With Us
              <span className="w-8 h-px bg-amber-500/30" />
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] mb-8 font-heading text-white">
              Want to join the <br /><span className="text-gradient-static">Roster?</span>
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto font-normal">
              We're always looking for senior developers, world-class designers, and growth strategists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-amber-500 text-black font-bold text-xs uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_50px_rgba(245,158,11,0.25)] inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Talk to Us</span>
              </a>
              <a
                href={`mailto:${EMAIL}?subject=Joining the Surprise-MFs Tech Team`}
                className="px-8 py-4 border border-white/15 text-xs uppercase tracking-widest rounded-full hover:bg-white/5 hover:border-amber-500/30 transition-all duration-300 font-medium"
              >
                Send Resume & Portfolio
              </a>
            </div>
          </motion.div>
        </section>

      </div>
    </>
  );
}

Team.layout = page => <Layout children={page} />;
