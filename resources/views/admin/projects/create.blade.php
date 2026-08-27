@extends('layouts.admin')

@section('title', 'Add Project')
@section('page_title', 'Create Project')
@section('page_subtitle', 'Publish a new client case study or showcase build')

@section('content')
<div class="max-w-4xl" x-data="{
    title: '{{ old('title') }}',
    slug: '{{ old('slug') }}',
    imagePreview: null,
    generateSlug() {
        this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    },
    previewImage(event) {
        const file = event.target.files[0];
        if (file) {
            this.imagePreview = URL.createObjectURL(file);
        }
    }
}">

    <form method="POST" action="{{ route('admin.projects.store') }}" enctype="multipart/form-data" class="space-y-8">
        @csrf

        <!-- Card: Basic Information -->
        <div class="p-6 lg:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
            <h2 class="text-base font-bold text-white font-heading border-b border-zinc-800 pb-3">Project Details</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Title -->
                <div class="space-y-1.5">
                    <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Project Title *</label>
                    <input 
                        type="text" 
                        name="title" 
                        x-model="title"
                        @input="generateSlug()"
                        required
                        placeholder="e.g. Bridge Protocol" 
                        class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                </div>

                <!-- Slug -->
                <div class="space-y-1.5">
                    <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">URL Slug *</label>
                    <input 
                        type="text" 
                        name="slug" 
                        x-model="slug"
                        required
                        placeholder="e.g. bridge-protocol" 
                        class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Client Name -->
                <div class="space-y-1.5">
                    <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Client / Brand</label>
                    <input 
                        type="text" 
                        name="client_name" 
                        value="{{ old('client_name') }}" 
                        placeholder="e.g. Bridge Global" 
                        class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                </div>

                <!-- Live URL -->
                <div class="space-y-1.5">
                    <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Live Website URL</label>
                    <input 
                        type="url" 
                        name="live_url" 
                        value="{{ old('live_url') }}" 
                        placeholder="https://..." 
                        class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                </div>

                <!-- Completion Date -->
                <div class="space-y-1.5">
                    <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Completion Date</label>
                    <input 
                        type="date" 
                        name="completion_date" 
                        value="{{ old('completion_date', now()->format('Y-m-d')) }}" 
                        class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                </div>
            </div>

            <!-- Summary -->
            <div class="space-y-1.5">
                <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Short Summary (for grid) *</label>
                <textarea 
                    name="summary" 
                    rows="3" 
                    required
                    placeholder="Brief description that displays on the portfolio card..."
                    class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                >{{ old('summary') }}</textarea>
            </div>

            <!-- Detailed Description -->
            <div class="space-y-1.5">
                <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Detailed Description / Case Study</label>
                <textarea 
                    name="detailed_description" 
                    rows="6" 
                    placeholder="Full explanation of the problem, tech stack, and solution delivered..."
                    class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                >{{ old('detailed_description') }}</textarea>
            </div>
        </div>

        <!-- Card: Media & Cover Image -->
        <div class="p-6 lg:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
            <h2 class="text-base font-bold text-white font-heading border-b border-zinc-800 pb-3">Cover Image</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <!-- File Upload -->
                <div class="space-y-2">
                    <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Upload Image File</label>
                    <input 
                        type="file" 
                        name="featured_image_file" 
                        accept="image/*"
                        @change="previewImage($event)"
                        class="w-full text-xs text-zinc-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-black hover:file:bg-amber-400 cursor-pointer"
                    >
                    <p class="text-[11px] text-zinc-500">Max size 5MB (PNG, JPG, WebP)</p>

                    <div class="pt-2">
                        <label class="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">Or provide Image URL</label>
                        <input 
                            type="text" 
                            name="featured_image_url" 
                            value="{{ old('featured_image_url') }}"
                            placeholder="https://..." 
                            class="w-full px-4 py-2.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                        >
                    </div>
                </div>

                <!-- Preview Box -->
                <div class="space-y-2">
                    <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Image Preview</label>
                    <div class="aspect-video rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
                        <template x-if="imagePreview">
                            <img :src="imagePreview" class="w-full h-full object-cover">
                        </template>
                        <template x-if="!imagePreview">
                            <span class="text-xs text-zinc-600">No image chosen yet</span>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card: Gallery Screenshots -->
        <div class="p-6 lg:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 class="text-base font-bold text-white font-heading border-b border-zinc-800 pb-3">Visual Showcase (Gallery Screenshots)</h2>
            <p class="text-xs text-zinc-400">Add high-resolution screenshots to appear in the project details showcase section.</p>

            <div class="space-y-3">
                <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Upload Gallery Images</label>
                <input 
                    type="file" 
                    name="gallery_files[]" 
                    multiple
                    accept="image/*"
                    class="w-full text-xs text-zinc-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
                >
            </div>

            <div class="space-y-1.5 pt-2">
                <label class="text-xs font-semibold uppercase tracking-wider text-zinc-400">Or Paste Image URLs (one per line)</label>
                <textarea 
                    name="gallery_urls" 
                    rows="3" 
                    placeholder="https://.../screenshot-1.png&#10;https://.../screenshot-2.png"
                    class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                >{{ old('gallery_urls') }}</textarea>
            </div>
        </div>

        <!-- Submit Bar -->
        <div class="flex items-center justify-between pt-4">
            <a href="{{ route('admin.projects.index') }}" class="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white transition-all">
                Cancel
            </a>
            <button type="submit" class="px-8 py-3.5 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-all">
                Save & Publish Project
            </button>
        </div>

    </form>

</div>
@endsection
