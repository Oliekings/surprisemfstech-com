import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FolderGit2, Inbox, MailOpen } from 'lucide-react';

export default function Dashboard({ stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-white uppercase tracking-tight">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard — Surprise-MFs Tech" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-zinc-950 border border-white/10 p-8 rounded-3xl group cursor-pointer hover:border-amber-500/30 transition-colors"
                        >
                            <Link href={route('admin.manage-projects.index')} className="block">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-zinc-400 text-xs font-medium uppercase tracking-widest">Active Projects</h3>
                                    <FolderGit2 className="text-amber-400 w-6 h-6 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
                                    {stats?.total_projects || 0}
                                </div>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-zinc-950 border border-white/10 p-8 rounded-3xl group cursor-pointer hover:border-amber-500/30 transition-colors"
                        >
                            <Link href={route('admin.inquiries.index')} className="block">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-zinc-400 text-xs font-medium uppercase tracking-widest">Total Inquiries</h3>
                                    <Inbox className="text-amber-400 w-6 h-6 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
                                    {stats?.total_inquiries || 0}
                                </div>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-zinc-950 border border-amber-500/20 p-8 rounded-3xl group cursor-pointer hover:border-amber-500/40 transition-colors relative overflow-hidden"
                        >
                            <Link href={route('admin.inquiries.index')} className="block">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-amber-400 text-xs font-medium uppercase tracking-widest">New Inquiries</h3>
                                    <MailOpen className="text-amber-400 w-6 h-6 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="text-5xl md:text-6xl font-bold tracking-tighter text-white flex items-center gap-4">
                                    {stats?.new_inquiries || 0}
                                    {(stats?.new_inquiries > 0) && (
                                        <span className="flex h-3 w-3 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                                        </span>
                                    )}
                                </div>
                            </Link>
                        </motion.div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
