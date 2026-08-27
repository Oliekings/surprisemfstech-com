@extends('layouts.admin')

@section('title', 'Add Builder')
@section('page_title', 'Add Team Member')
@section('page_subtitle', 'Create a builder profile for the team page')

@section('content')
<div class="max-w-2xl" x-data="{
    avatarPreview: null,
    previewAvatar(event) {
        const file = event.target.files[0];
        if (file) {
            this.avatarPreview = URL.createObjectURL(file);
        }
    }
}">

    <form method="POST" action="{{ route('admin.team.store') }}" enctype="multipart/form-data" class="p-6 lg:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
        @csrf

        <div class="space-y-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Full Name *</label>
            <input 
                type="text" 
                name="name" 
                value="{{ old('name') }}" 
                placeholder="e.g. Olie Kings" 
                required
                class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
            >
        </div>

        <div class="space-y-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Role / Specialization *</label>
            <input 
                type="text" 
                name="role" 
                value="{{ old('role') }}" 
                placeholder="e.g. Lead Developer / UI Strategist" 
                required
                class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
            >
        </div>

        <div class="space-y-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Bio / About</label>
            <textarea 
                name="bio" 
                rows="4" 
                placeholder="A short introduction about their skills and craft..."
                class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
            >{{ old('bio') }}</textarea>
        </div>

        <!-- Avatar Upload -->
        <div class="space-y-2 pt-2 border-t border-zinc-800">
            <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Profile Photo</label>
            <div class="flex items-center gap-6">
                <div class="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                    <template x-if="avatarPreview">
                        <img :src="avatarPreview" class="w-full h-full object-cover">
                    </template>
                    <template x-if="!avatarPreview">
                        <span class="text-xs text-zinc-600">Photo</span>
                    </template>
                </div>
                <div class="flex-1 space-y-1.5">
                    <input 
                        type="file" 
                        name="avatar_file" 
                        accept="image/*"
                        @change="previewAvatar($event)"
                        class="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-black hover:file:bg-amber-400 cursor-pointer"
                    >
                    <input 
                        type="text" 
                        name="avatar_url" 
                        value="{{ old('avatar_url') }}"
                        placeholder="Or paste image URL (https://...)" 
                        class="w-full px-4 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                </div>
            </div>
        </div>

        <!-- Social Media Links -->
        <div class="space-y-4 pt-4 border-t border-zinc-800">
            <h3 class="text-xs font-bold uppercase tracking-wider text-amber-400">Social Media & Portfolio Links</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                    <label class="text-[11px] font-semibold text-zinc-400">Instagram Profile URL</label>
                    <input 
                        type="url" 
                        name="instagram_url" 
                        value="{{ old('instagram_url') }}" 
                        placeholder="https://instagram.com/username"
                        class="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500"
                    >
                </div>
                <div class="space-y-1">
                    <label class="text-[11px] font-semibold text-zinc-400">LinkedIn Profile URL</label>
                    <input 
                        type="url" 
                        name="linkedin_url" 
                        value="{{ old('linkedin_url') }}" 
                        placeholder="https://linkedin.com/in/username"
                        class="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500"
                    >
                </div>
                <div class="space-y-1">
                    <label class="text-[11px] font-semibold text-zinc-400">X / Twitter Profile URL</label>
                    <input 
                        type="url" 
                        name="twitter_url" 
                        value="{{ old('twitter_url') }}" 
                        placeholder="https://x.com/username"
                        class="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500"
                    >
                </div>
                <div class="space-y-1">
                    <label class="text-[11px] font-semibold text-zinc-400">GitHub Profile URL</label>
                    <input 
                        type="url" 
                        name="github_url" 
                        value="{{ old('github_url') }}" 
                        placeholder="https://github.com/username"
                        class="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500"
                    >
                </div>
            </div>

            <div class="space-y-1">
                <label class="text-[11px] font-semibold text-zinc-400">Personal Website / Portfolio URL</label>
                <input 
                    type="url" 
                    name="website_url" 
                    value="{{ old('website_url') }}" 
                    placeholder="https://mywebsite.com"
                    class="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500"
                >
            </div>
        </div>

        <div class="flex items-center justify-between pt-6 border-t border-zinc-800">
            <a href="{{ route('admin.team.index') }}" class="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white transition-all">
                Cancel
            </a>
            <button type="submit" class="px-8 py-3.5 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-all">
                Add Team Member
            </button>
        </div>
    </form>

</div>
@endsection
