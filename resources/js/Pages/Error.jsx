import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Home, AlertCircle, ArrowLeft } from 'lucide-react';

export default function Error({ status }) {
  const title = {
    503: '503: Service Unavailable',
    500: '500: Server Error',
    404: '404: Page Not Found',
    403: '403: Forbidden',
  }[status] || `${status}: Error`;

  const description = {
    503: "We're currently performing a quick update. Please check back in a few moments.",
    500: "Something went wrong on our end. We're looking into it right away.",
    404: "The page you're looking for doesn't exist or may have been moved.",
    403: "You don't have permission to access this page.",
  }[status] || 'An unexpected error occurred.';

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-black font-sans flex items-center justify-center p-6 relative overflow-hidden">
      <Head title={title} />

      {/* Warm Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 glass-warm text-xs font-medium uppercase tracking-[0.2em] text-amber-400"
        >
           <AlertCircle className="w-3.5 h-3.5" />
           Page Status
        </motion.div>

        <h1 className="text-[7rem] md:text-[10rem] font-bold tracking-tighter leading-none mb-4 text-gradient-static">
          {status}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-4">
            {title.includes(':') ? title.split(':')[1].trim() : title}
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-amber-500 text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-amber-400 transition-all duration-300 shadow-[0_0_40px_rgba(245,158,11,0.2)]"
            >
              <Home className="w-4 h-4" /> Return to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 rounded-full text-xs font-medium uppercase tracking-widest hover:bg-white/10 transition-all duration-300 text-zinc-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
