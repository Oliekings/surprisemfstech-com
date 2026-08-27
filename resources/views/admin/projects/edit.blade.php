@extends('layouts.admin')

@section('title', 'Edit Project')
@section('page_title', 'Edit: ' . $project->title)
@section('page_subtitle', 'Update project details, case study, and live link')

@section('content')
<div class="max-w-4xl" x-data="{
    title: '{{ addslashes($project->title) }}',
    slug: '{{ $project->slug }}',
    imagePreview: '{{ $project->featured_image }}',
    previewImage(event) {
        const file = event.target.files[0];
        if (file) {
            this.imagePreview = URL.createObjectURL(file);
        }
    }
}">

    <form method="POST" action="{{ route('admin.projects.update', $project) }}" enctype="multipart/form-data" class="space-y-8">
        @csrf
        @method('PUT')

        <!-- Card: Core Details -->
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
                        value="{{ old('title', $project->title) }}" 
                        required
                        class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                </div>

                <!-- Slug -->
                <div class="space-y-1.5">
                    <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Slug (URL Path) *</label>
                    <input 
                        type="text" 
                        name="slug" 
                        x-model="slug"
                        value="{{ old('slug', $project->slug) }}" 
                        required
                        class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-zinc-400 font-mono focus:outline-none focus:border-amber-500 transition-colors"
                    >
                </div>

                <!-- Client Name -->
                <div class="space-y-1.5">
                    <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Client / Brand Name</label>
                    <input 
                        type="text" 
                        name="client_name" 
                        value="{{ old('client_name', $project->client_name) }}" 
                        class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                </div>

                <!-- Live URL -->
                <div class="space-y-1.5">
                    <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Live Website URL</label>
                    <input 
                        type="url" 
                        name="live_url" 
                        value="{{ old('live_url', $project->live_url) }}" 
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
                        value="{{ old('completion_date', $project->completion_date ? \Carbon\Carbon::parse($project->completion_date)->format('Y-m-d') : '') }}" 
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
                    class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                >{{ old('summary', $project->summary) }}</textarea>
            </div>

            <!-- Detailed Description -->
            <div class="space-y-1.5">
                <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Detailed Description / Case Study</label>
                <textarea 
                    name="detailed_description" 
                    rows="6" 
                    class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                >{{ old('detailed_description', $project->detailed_description) }}</textarea>
            </div>
        </div>

        <!-- Card: Media & Cover Image -->
        <div class="p-6 lg:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
            <h2 class="text-base font-bold text-white font-heading border-b border-zinc-800 pb-3">Cover Image</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <!-- File Upload -->
                <div class="space-y-2">
                    <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Upload New Image File</label>
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
                            value="{{ old('featured_image_url', $project->featured_image) }}"
                            placeholder="https://..." 
                            class="w-full px-4 py-2.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                        >
                    </div>
                </div>

                <!-- Preview Box -->
                <div class="space-y-2">
                    <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Current / New Preview</label>
                    <div class="aspect-video rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
                        <template x-if="imagePreview">
                            <img :src="imagePreview" class="w-full h-full object-cover">
                        </template>
                        <template x-if="!imagePreview">
                            <span class="text-xs text-zinc-600">No image chosen</span>
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
                <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Upload Additional Gallery Images</label>
                <input 
                    type="file" 
                    name="gallery_files[]" 
                    multiple
                    accept="image/*"
                    class="w-full text-xs text-zinc-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
                >
            </div>

            <div class="space-y-1.5 pt-2">
                <label class="text-xs font-semibold uppercase tracking-wider text-zinc-400">Gallery Image URLs (one per line)</label>
                <textarea 
                    name="gallery_urls" 
                    rows="4" 
                    placeholder="https://.../screenshot-1.png&#10;https://.../screenshot-2.png"
                    class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                >{{ old('gallery_urls', is_array($project->gallery) ? implode("\n", $project->gallery) : '') }}</textarea>
            </div>
        </div>

        <!-- Submit Bar -->
        <div class="flex items-center justify-between pt-4">
            <a href="{{ route('admin.projects.index') }}" class="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white transition-all">
                Cancel
            </a>
            <button type="submit" class="px-8 py-3.5 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-all">
                Save Changes
            </button>
        </div>

    </form>

</div>
@endsection
