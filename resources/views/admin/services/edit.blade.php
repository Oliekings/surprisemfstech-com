@extends('layouts.admin')

@section('title', 'Edit Service')
@section('page_title', 'Edit: ' . $service->title)
@section('page_subtitle', 'Update service title and descriptive copy')

@section('content')
<div class="max-w-2xl">

    <form method="POST" action="{{ route('admin.services.update', $service) }}" class="p-6 lg:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
        @csrf
        @method('PUT')

        <div class="space-y-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Service Slug (Read-only)</label>
            <input 
                type="text" 
                value="{{ $service->slug }}" 
                disabled 
                class="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-500 cursor-not-allowed"
            >
        </div>

        <div class="space-y-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Service Title *</label>
            <input 
                type="text" 
                name="title" 
                value="{{ old('title', $service->title) }}" 
                required
                class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
            >
        </div>

        <div class="space-y-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Description *</label>
            <textarea 
                name="description" 
                rows="5" 
                required
                class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
            >{{ old('description', $service->description) }}</textarea>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-zinc-800">
            <a href="{{ route('admin.services.index') }}" class="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white transition-all">
                Cancel
            </a>
            <button type="submit" class="px-8 py-3.5 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-all">
                Save Service
            </button>
        </div>
    </form>

</div>
@endsection
