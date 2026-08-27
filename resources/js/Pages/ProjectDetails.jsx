import { Link, Head, usePage } from '@inertiajs/react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Globe, Layout as LayoutIcon, Cpu, MessageCircle, Sparkles, X, ZoomIn } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Layout from '../Layouts/Layout';
import { WHATSAPP_URL, EMAIL } from '../Components/WhatsAppButton';

// ─── Team Member Mini-Card ───
function TeamMemberCard({ member, idx }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href="/team"
      className="group relative flex items-center gap-4 p-4 rounded-2xl glass hover:bg-amber-500/[0.04] hover:border-amber-500/20 transition-all duration-300 block"
    >
      <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-900 border border-white/10 group-hover:border-amber-500/30 transition-colors shrink-0">
        {member.avatar_path && !imgError ? (
          <img
            src={member.avatar_path}
            alt={member.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-xs font-bold text-amber-400">
            {member.name?.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <h4 className="text-sm font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors font-heading">{member.name}</h4>
        <p className="text-xs uppercase tracking-widest text-amber-400/70">{member.role}</p>
      </div>
    </Link>
  );
}

// ─── Project Details Page ───
export default function ProjectDetails({ projectData, prevProject, nextProject }) {
  const { props } = usePage();
  const settings = props.settings || {};
  const project = projectData;
  const containerRef = useRef(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 0.4], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Handle ESC key for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    if (lightboxImage) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
          <h1 className="text-2xl font-bold mb-8 uppercase tracking-tighter">Project Not Found</h1>
          <Link href="/projects" className="px-8 py-4 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-widest">
            Back to Projects
          </Link>
        </div>
      </Layout>
    );
  }

  const galleryImages = Array.isArray(project.gallery) ? project.gallery.filter(Boolean) : [];

  return (
    <>
      <Head title={`${project.title} — Project Details | Surprise-MFs Tech`} />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-2xl"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition-all z-10"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxImage}
              alt="Gallery Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={containerRef} className="flex flex-col w-full bg-black min-h-screen selection:bg-amber-500 selection:text-black font-sans">

        {/* ════════ 1. IMMERSIVE HERO ════════ */}
        <section className="relative h-screen flex flex-col justify-end overflow-hidden">
          {/* Parallax Background Image */}
          <motion.div
            style={{ y: heroImageY }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
            <img
              src={project.featured_image}
              alt={project.title}
              className="w-full h-full object-cover grayscale brightness-[0.6]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Hero Content */}
          <div className="relative z-20 px-6 md:px-12 pb-20 md:pb-32 max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <Link
                  href="/projects"
                  className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
                  Client Project · {new Date(project.completion_date).getFullYear()}
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] uppercase mb-10 text-white font-heading">
                {project.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 !== 0 ? 'text-gradient-static block' : 'block'}>
                    {word}
                  </span>
                ))}
              </h1>

              <div className="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between">
                <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl">
                  {project.summary}
                </p>

                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-amber-400 hover:shadow-[0_0_60px_rgba(245,158,11,0.3)] transition-all duration-300 group"
                  >
                    Visit Live Website
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-amber-400/60"
          >
            <span className="text-[9px] font-medium uppercase tracking-[0.4em]">Scroll to explore</span>
            <div className="w-px h-10 bg-gradient-to-b from-amber-400/50 to-transparent" />
          </motion.div>
        </section>

        {/* ════════ 2. THE STATS ════════ */}
        <section className="px-6 md:px-12 py-16 bg-zinc-950/80 border-y border-amber-500/10 relative z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-2">Client</h4>
              <p className="text-lg font-bold uppercase tracking-tight text-white font-heading">{project.client_name}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-2">Year</h4>
              <p className="text-lg font-bold uppercase tracking-tight text-white font-heading">{new Date(project.completion_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-2">Scope</h4>
              <p className="text-lg font-bold uppercase tracking-tight text-white font-heading">Design & Development</p>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-2">Status</h4>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-lg font-bold uppercase tracking-tight text-white font-heading">Live & Active</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ 3. OVERVIEW & APPROACH ════════ */}
        <section className="px-6 md:px-12 py-32 bg-black relative z-20 overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4">
                <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-amber-500/30" />
                  About the Project
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-white font-heading">
                  How We <span className="text-gradient-static">Built It.</span>
                </h3>
              </div>
              <div className="lg:col-span-8 flex flex-col gap-10">
                <div
                  className="text-lg md:text-xl text-zinc-300 font-normal leading-relaxed prose prose-invert prose-amber max-w-none"
                  dangerouslySetInnerHTML={{ __html: project.detailed_description || project.summary }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: LayoutIcon, title: "Modern UI/UX", desc: "Designed to be intuitive, clean, and engaging for every user." },
                    { icon: Cpu, title: "Fast & Scalable Code", desc: "Built with modern frameworks for speed, security, and long-term growth." },
                  ].map((feat, i) => (
                    <div key={i} className="p-6 rounded-2xl glass hover:bg-amber-500/[0.04] hover:border-amber-500/20 transition-colors group">
                      <feat.icon className="w-5 h-5 text-amber-400 mb-4 transition-colors" />
                      <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-white font-heading">{feat.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ 4. VISUAL SHOWCASE / GALLERY ════════ */}
        {galleryImages.length > 0 && (
          <section className="px-6 md:px-12 py-24 bg-zinc-950/60 border-t border-white/[0.06] relative z-20">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-3 flex items-center gap-3">
                    <span className="w-8 h-px bg-amber-500/30" />
                    Visual Showcase
                  </h2>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-white font-heading">
                    Platform <span className="text-gradient-static">Screenshots</span>
                  </h3>
                </div>
                <span className="text-xs text-zinc-500 uppercase tracking-widest">Click to expand</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((imgUrl, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-amber-500/40 cursor-pointer group shadow-xl"
                    onClick={() => setLightboxImage(imgUrl)}
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} Screenshot ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-3 rounded-full bg-amber-500 text-black shadow-lg">
                        <ZoomIn className="w-5 h-5" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ════════ 5. TEAM CONTRIBUTORS ════════ */}
        {project.team_members && project.team_members.length > 0 && (
          <section className="px-6 md:px-12 py-20 bg-zinc-950/40 border-t border-white/[0.04]">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-amber-500/30" />
                Builders On This Project
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.team_members.map((member, idx) => (
                  <TeamMemberCard key={member.id} member={member} idx={idx} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ════════ 6. PREVIOUS / NEXT PROJECT NAVIGATION ════════ */}
        {(prevProject || nextProject) && (
          <section className="px-6 md:px-12 py-16 bg-black border-t border-white/[0.06] relative z-20">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
              {prevProject ? (
                <Link
                  href={`/project/${prevProject.slug}`}
                  className="flex items-center gap-4 group p-4 rounded-2xl hover:bg-zinc-900/60 transition-all text-left w-full sm:w-auto"
                >
                  <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-500 transition-all shrink-0">
                    <ArrowLeft className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 block">Previous Project</span>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors font-heading">{prevProject.title}</h4>
                  </div>
                </Link>
              ) : <div />}

              <Link
                href="/projects"
                className="px-6 py-2.5 rounded-full border border-white/15 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white hover:border-amber-500 transition-all"
              >
                All Projects
              </Link>

              {nextProject ? (
                <Link
                  href={`/project/${nextProject.slug}`}
                  className="flex items-center justify-end gap-4 group p-4 rounded-2xl hover:bg-zinc-900/60 transition-all text-right w-full sm:w-auto"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 block">Next Project</span>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors font-heading">{nextProject.title}</h4>
                  </div>
                  <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-500 transition-all shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ) : <div />}
            </div>
          </section>
        )}

        {/* ════════ 7. CTA BANNER ════════ */}
        <section className="px-6 md:px-12 py-32 bg-zinc-950 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 mb-6 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-amber-500/30" />
              Let's Build Your Project
              <span className="w-8 h-px bg-amber-500/30" />
            </h2>
            <h3 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight mb-8 font-heading text-white">
              Need something like <br />
              <span className="text-gradient-static">{project.title}?</span>
            </h3>
            <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-xl mx-auto">
              Tell us about your timeline, ideas, and budget. We’ll provide a free consultation and roadmap for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full btn-whatsapp font-bold text-xs uppercase tracking-widest shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-amber-400 transition-all duration-300 group"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

ProjectDetails.layout = page => <Layout children={page} />;
