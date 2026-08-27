import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function Index({ projects }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-tight text-white uppercase tracking-tighter">
                        Manage Projects
                    </h2>
                    <Link
                        href={route('admin.manage-projects.create')}
                        className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> New Project
                    </Link>
                </div>
            }
        >
            <Head title="Manage Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-black border border-white/10 rounded-3xl overflow-hidden">
                        <table className="w-full text-left text-sm text-zinc-400">
                            <thead className="bg-zinc-900 text-xs uppercase font-mono tracking-widest text-zinc-500 border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-4 font-normal">Title</th>
                                    <th className="px-6 py-4 font-normal">Client</th>
                                    <th className="px-6 py-4 font-normal">Date</th>
                                    <th className="px-6 py-4 font-normal text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {projects.map((project, idx) => (
                                    <motion.tr 
                                        key={project.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="hover:bg-zinc-950/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4 border-l-2 border-transparent group-hover:border-white transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-md overflow-hidden bg-zinc-900 flex-shrink-0">
                                                    {project.featured_image ? (
                                                        <img src={project.featured_image} alt={project.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full border border-white/10 flex items-center justify-center text-zinc-700">?</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium text-base">{project.title}</div>
                                                    <div className="text-xs font-mono text-zinc-600 mt-1">{project.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-white">
                                            {project.client_name || '-'}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs">
                                            {project.completion_date ? new Date(project.completion_date).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link 
                                                    href={route('admin.manage-projects.edit', project.id)}
                                                    className="p-2 text-zinc-500 hover:text-white bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={route('admin.manage-projects.destroy', project.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="p-2 text-zinc-500 hover:text-red-500 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
                                                    preserveScroll
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                        {projects.length === 0 && (
                            <div className="p-12 text-center text-zinc-500 font-mono text-sm uppercase tracking-widest">
                                No projects initialized.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
