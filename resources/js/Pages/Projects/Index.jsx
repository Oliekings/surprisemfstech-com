import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Filter, Sparkles, MessageCircle } from 'lucide-react';
import Layout from '../../Layouts/Layout';
import { WHATSAPP_URL, EMAIL } from '../../Components/WhatsAppButton';

// ─── Project Card Component ───
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  // Asymmetrical layout logic: Large, Small, Small, Large...
  const isLarge = index % 3 === 0;

  return (
    <motion.div
      layout
      key={project.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}
    >
      <Link href={`/project/${project.slug}`} className="block">
        {/* Image Container */}
        <div className={`relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/[0.06] transition-all duration-700 group-hover:border-amber-500/30 ${isLarge ? 'aspect-[21/10]' : 'aspect-[4/5] md:aspect-[3/4]'}`}>
          {project.featured_image && !imgError ? (
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              src={project.featured_image}
              alt={project.title}
              className="w-full h-full object-cover brightness-[0.75] group-hover:brightness-100 transition-all duration-700"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-900">
              <span className="text-6xl md:text-8xl font-bold text-amber-500/[0.1] uppercase select-none">
                {project.title?.charAt(0) || '✦'}
              </span>
            </div>
          )}

          {/* Warm Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-8 md:p-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="flex items-center gap-4"
            >
              <span className="px-5 py-2.5 rounded-full bg-amber-500 text-black text-xs font-bold uppercase tracking-widest shadow-lg">
                View Project
              </span>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white group-hover:border-amber-400 transition-colors">
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </div>
            </motion.div>
          </div>

          {/* Index Number */}
          <div className="absolute top-6 left-8 mix-blend-difference opacity-50 group-hover:opacity-100 transition-opacity duration-700">
            <span className="text-xs font-medium text-amber-400 tracking-[0.3em] uppercase">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-amber-400/70">
                {project.client_name}
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                {new Date(project.completion_date).getFullYear()}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase group-hover:text-amber-300 transition-colors duration-300">
              {project.title}
            </h3>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs hidden lg:block">
            {project.summary}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Projects Page ───
export default function Projects({ projects }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Derived categories from projects
  const categories = ['All', ...new Set(projects.map(p => p.summary?.split(' ')[0] || 'Digital'))].slice(0, 5);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p =>
        p.title?.toLowerCase().includes(activeFilter.toLowerCase()) ||
        p.summary?.toLowerCase().includes(activeFilter.toLowerCase())
      );

  return (
    <>
      <Head title="Our Work & Recent Projects — Surprise-MFs Tech" />

      <div className="flex flex-col w-full bg-black min-h-screen">

        {/* ════════ HEADER SECTION ════════ */}
        <section ref={headerRef} className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
          {/* Warm Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="max-w-7xl mx-auto relative z-10"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 glass-warm text-[10px] font-medium tracking-[0.2em] uppercase text-amber-400 mb-8"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Our Portfolio
                </motion.div>

                <div className="overflow-hidden mb-2">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] uppercase"
                  >
                    Recent
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-8">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                    className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] uppercase text-gradient-static"
                  >
                    Projects
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-lg md:text-2xl text-zinc-400 font-normal leading-relaxed max-w-2xl"
                >
                  Explore some of the websites, web applications, and digital platforms we've designed and built for our clients.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="hidden lg:block text-right"
              >
                <div className="text-[100px] font-bold text-amber-500/[0.06] leading-none select-none">
                  {projects.length}
                </div>
                <div className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/60 -mt-2">
                  Projects Completed
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="line-glow mx-6 md:mx-12" />

        {/* ════════ FILTER BAR ════════ */}
        <section className="px-6 md:px-12 py-6 sticky top-[72px] z-40 bg-black/85 backdrop-blur-xl border-b border-amber-500/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-2 text-zinc-500">
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] hidden sm:block">Categories</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:scale-[1.02] ${
                      activeFilter === cat
                        ? 'bg-amber-500 text-black font-bold shadow-md'
                        : 'text-zinc-400 border border-white/10 hover:border-amber-500/30 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 hidden md:block"
            >
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
            </motion.div>
          </div>
        </section>

        {/* ════════ ASYMMETRICAL GRID ════════ */}
        <section className="px-6 md:px-12 py-20 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-40 text-center"
              >
                <p className="text-zinc-500 uppercase tracking-widest text-sm mb-6">No projects found in this category.</p>
                <button
                  onClick={() => setActiveFilter('All')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-widest"
                >
                  Reset Filter <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* ════════ NEXT STEPS CTA ════════ */}
        <section className="px-6 md:px-12 py-24 bg-gradient-to-b from-zinc-950 to-black relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 glass-warm text-[10px] font-medium tracking-[0.2em] uppercase text-amber-400 mb-8">
              Start Your Project
            </div>
            <h3 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight mb-8">
              HAVE AN IDEA?<br />
              <span className="text-gradient-static">LET'S BRING IT TO LIFE.</span>
            </h3>
            <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-xl mx-auto">
              Whether you need a full web platform or a high-converting mobile app, we’re ready to help you build it.
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

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        </section>

      </div>
    </>
  );
}

Projects.layout = page => <Layout children={page} />;
