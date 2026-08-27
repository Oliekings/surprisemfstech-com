@extends('layouts.admin')

@section('title', 'Projects')
@section('page_title', 'Portfolio Projects')
@section('page_subtitle', 'Manage case studies, live demo links, and portfolio assets')

@section('header_actions')
    <a href="{{ route('admin.projects.create') }}" class="px-5 py-2.5 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Add Project
    </a>
@endsection

@section('content')
<div class="space-y-8">

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @forelse($projects as $project)
            <div class="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group">
                
                <!-- Project Image -->
                <div>
                    <div class="aspect-video bg-zinc-900 relative overflow-hidden border-b border-zinc-800/60">
                        @if($project->featured_image)
                            <img 
                                src="{{ $project->featured_image }}" 
                                alt="{{ $project->title }}" 
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            >
                        @else
                            <div class="w-full h-full flex items-center justify-center text-3xl font-bold text-amber-500/20 font-heading">
                                {{ substr($project->title, 0, 1) }}
                            </div>
                        @endif

                        <div class="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-white/10">
                            {{ $project->client_name ?? 'Showcase' }}
                        </div>
                    </div>

                    <!-- Details -->
                    <div class="p-6 space-y-3">
                        <h3 class="text-lg font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors font-heading">
                            {{ $project->title }}
                        </h3>
                        <p class="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                            {{ $project->summary }}
                        </p>
                        @if($project->live_url)
                            <a 
                                href="{{ $project->live_url }}" 
                                target="_blank" 
                                class="text-[11px] font-semibold text-amber-400 hover:underline inline-flex items-center gap-1 pt-1"
                            >
                                <span>Visit Live</span>
                                <span>↗</span>
                            </a>
                        @endif
                    </div>
                </div>

                <!-- Card Bottom Actions -->
                <div class="px-6 py-4 border-t border-zinc-800/60 bg-zinc-900/30 flex items-center justify-between">
                    <a 
                        href="{{ route('admin.projects.edit', $project) }}" 
                        class="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-white hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"
                    >
                        Edit Details
                    </a>

                    <form method="POST" action="{{ route('admin.projects.destroy', $project) }}" onsubmit="return confirm('Are you sure you want to delete this project?');">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="p-2 text-zinc-500 hover:text-red-400 transition-colors" title="Delete Project">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                    </form>
                </div>

            </div>
        @empty
            <div class="col-span-full py-24 text-center bg-zinc-950/40 border border-zinc-800/40 rounded-3xl space-y-4">
                <svg class="w-12 h-12 text-zinc-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <h3 class="text-sm font-bold text-white">No projects published</h3>
                <p class="text-xs text-zinc-500">Click below to add your first work to the portfolio.</p>
                <a href="{{ route('admin.projects.create') }}" class="inline-block px-5 py-2.5 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-wider">
                    Add First Project
                </a>
            </div>
        @endforelse
    </div>

    <div class="pt-4">
        {{ $projects->links() }}
    </div>

</div>
@endsection
