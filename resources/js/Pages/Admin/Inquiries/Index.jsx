import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, Trash2, Clock, MessageSquare } from 'lucide-react';

export default function Index({ inquiries }) {
    const updateStatus = (id, status) => {
        router.put(route('admin.inquiries.update', id), { status }, {
            preserveScroll: true
        });
    };

    const deleteInquiry = (id) => {
        if (confirm('Are you sure you want to delete this inquiry?')) {
            router.delete(route('admin.inquiries.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-white uppercase tracking-tight">
                    Client Inquiries
                </h2>
            }
        >
            <Head title="Client Inquiries — Admin" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {inquiries.map((inquiry, idx) => (
                            <motion.div
                                key={inquiry.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`bg-zinc-950 border rounded-3xl p-8 flex flex-col md:flex-row gap-8 transition-all ${
                                    inquiry.status === 'new' ? 'border-amber-500/40 bg-amber-500/[0.02] shadow-[0_0_30px_rgba(245,158,11,0.05)]' : 'border-white/10'
                                }`}
                            >
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-4">
                                        {inquiry.status === 'new' ? (
                                            <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" title="New Inquiry"></span>
                                        ) : (
                                            <Clock className="w-4 h-4 text-zinc-500" />
                                        )}
                                        <h3 className="text-xl font-bold text-white tracking-tight">{inquiry.name}</h3>
                                        <a href={`mailto:${inquiry.email}`} className="text-amber-400 hover:underline text-sm font-medium">
                                            {inquiry.email}
                                        </a>
                                    </div>

                                    <div className="bg-zinc-900/60 rounded-2xl p-6 mb-6 border border-white/5">
                                        <p className="text-zinc-200 leading-relaxed whitespace-pre-wrap">{inquiry.details}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-3 items-center">
                                        <div className="px-4 py-1.5 bg-amber-500/10 rounded-full border border-amber-500/20 text-xs font-medium text-amber-400">
                                            Budget: <span className="text-white font-bold">{inquiry.budget || 'Not specified'}</span>
                                        </div>
                                        <div className="px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-xs font-medium text-zinc-400">
                                            Received: {new Date(inquiry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex md:flex-col justify-end gap-3 min-w-[140px]">
                                    <a
                                        href={`mailto:${inquiry.email}?subject=Re: Your Project Inquiry - Surprise-MFs Tech`}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-amber-500 text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-amber-400 transition-all text-center"
                                    >
                                        <Mail className="w-3.5 h-3.5" /> Reply
                                    </a>
                                    {inquiry.status === 'new' && (
                                        <button
                                            onClick={() => updateStatus(inquiry.id, 'read')}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/10 text-white font-medium text-xs uppercase tracking-widest rounded-full hover:bg-white/20 transition-all"
                                        >
                                            <CheckCircle className="w-3.5 h-3.5 text-green-400" /> Mark Read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteInquiry(inquiry.id)}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 text-zinc-500 hover:text-red-400 font-medium text-xs uppercase tracking-widest rounded-full hover:bg-red-500/10 transition-all"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        {inquiries.length === 0 && (
                            <div className="py-32 text-center border border-white/10 rounded-3xl bg-zinc-950">
                                <MessageSquare className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                                <p className="text-zinc-400 text-base font-medium">No client inquiries received yet.</p>
                                <p className="text-zinc-600 text-sm mt-1">Inquiries submitted from the website will appear here in real time.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
