import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

export default function Edit({ project }) {
    const isEditing = !!project;

    const { data, setData, post, put, processing, errors } = useForm({
        title: project?.title || '',
        client_name: project?.client_name || '',
        completion_date: project?.completion_date || '',
        summary: project?.summary || '',
        detailed_description: project?.detailed_description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.manage-projects.update', project.id));
        } else {
            post(route('admin.manage-projects.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-6">
                    <Link href={route('admin.manage-projects.index')} className="text-zinc-500 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-2xl font-bold leading-tight text-white uppercase tracking-tighter">
                        {isEditing ? `Edit ${project.title}` : 'Initialize New Project'}
                    </h2>
                </div>
            }
        >
            <Head title={isEditing ? 'Edit Project' : 'New Project'} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-black border border-white/10 rounded-3xl overflow-hidden p-8">
                        <form onSubmit={submit} className="space-y-8">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">Project Title</label>
                                    <input 
                                        type="text" 
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                                        placeholder="e.g. Aura E-Commerce"
                                    />
                                    {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                                </div>
                                
                                <div>
                                    <label className="block font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">Client Name</label>
                                    <input 
                                        type="text" 
                                        value={data.client_name}
                                        onChange={e => setData('client_name', e.target.value)}
                                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                                        placeholder="e.g. Aura Lifestyle"
                                    />
                                    {errors.client_name && <div className="text-red-500 text-sm mt-1">{errors.client_name}</div>}
                                </div>
                                
                                <div className="md:col-span-2">
                                    <label className="block font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">Completion Date</label>
                                    <input 
                                        type="date" 
                                        value={data.completion_date ? data.completion_date.split('T')[0] : ''}
                                        onChange={e => setData('completion_date', e.target.value)}
                                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors [color-scheme:dark]"
                                    />
                                    {errors.completion_date && <div className="text-red-500 text-sm mt-1">{errors.completion_date}</div>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">Brief Summary (Hero)</label>
                                    <textarea 
                                        value={data.summary}
                                        onChange={e => setData('summary', e.target.value)}
                                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors h-24 resize-none"
                                        placeholder="Short punchy summary..."
                                    />
                                    {errors.summary && <div className="text-red-500 text-sm mt-1">{errors.summary}</div>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">Detailed Description</label>
                                    <textarea 
                                        value={data.detailed_description}
                                        onChange={e => setData('detailed_description', e.target.value)}
                                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors h-48 resize-none"
                                        placeholder="The deep dive..."
                                    />
                                    {errors.detailed_description && <div className="text-red-500 text-sm mt-1">{errors.detailed_description}</div>}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex justify-end">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-mono text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    {isEditing ? 'Save Changes' : 'Initialize Project'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
