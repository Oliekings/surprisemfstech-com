import { motion } from 'framer-motion';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px'
            }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.04] rounded-full blur-[120px] animate-float pointer-events-none" />
            
            <div className="w-full max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
