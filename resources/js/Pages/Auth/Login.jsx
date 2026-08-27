import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(window.route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Access Portal" />

            <div className="mb-12 text-center">
               <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 glass text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 mb-6"
               >
                  <ShieldCheck className="w-3 h-3 text-green-500" />
                  Secure Access
               </motion.div>
               <h1 className="text-4xl font-bold tracking-tighter uppercase mb-4">Admin Portal</h1>
               <p className="text-zinc-500 font-light tracking-wide text-sm">Enter your credentials to manage the studio.</p>
            </div>

            {status && (
                <div className="mb-6 text-sm font-mono text-green-500 bg-green-500/10 p-4 rounded-xl border border-green-500/20 text-center animate-pulse">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="relative group">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-2 block group-focus-within:text-white transition-colors">
                       Identity / Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all placeholder:text-zinc-700"
                            placeholder="name@agency.com"
                            required
                            autoFocus
                        />
                    </div>
                    {errors.email && <p className="mt-2 text-[10px] font-mono text-red-500 uppercase tracking-widest">{errors.email}</p>}
                </div>

                <div className="relative group">
                    <div className="flex justify-between items-end mb-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 group-focus-within:text-white transition-colors">
                           Security / Password
                        </label>
                        {canResetPassword && (
                            <Link
                                href={window.route('password.request')}
                                className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
                            >
                                Recover
                            </Link>
                        )}
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all placeholder:text-zinc-700"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {errors.password && <p className="mt-2 text-[10px] font-mono text-red-500 uppercase tracking-widest">{errors.password}</p>}
                </div>

                <div className="flex items-center gap-3 py-2">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="w-4 h-4 rounded-md border-white/10 bg-white/[0.03] text-white focus:ring-0 focus:ring-offset-0"
                    />
                    <label htmlFor="remember" className="text-xs font-mono uppercase tracking-widest text-zinc-500 cursor-pointer select-none">
                        Maintain Session
                    </label>
                </div>

                <button
                    disabled={processing}
                    className="w-full group relative overflow-hidden bg-white text-black font-bold uppercase tracking-widest text-xs py-5 rounded-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-50"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center justify-center gap-2">
                        Initialize Session {processing ? '...' : <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </span>
                </button>

                <div className="pt-8 text-center text-zinc-600 text-[10px] font-mono uppercase tracking-[0.2em]">
                    Surprise-MFs Technologies // v1.0.0
                </div>
            </form>
        </GuestLayout>
    );
}
