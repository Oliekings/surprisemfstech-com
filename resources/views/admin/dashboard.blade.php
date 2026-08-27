@extends('layouts.admin')

@section('title', 'Dashboard')
@section('page_title', 'Overview & Performance')
@section('page_subtitle', 'Real-time studio activity and client inquiry metrics')

@section('header_actions')
    <a href="{{ route('admin.projects.create') }}" class="px-5 py-2.5 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        New Project
    </a>
@endsection

@section('content')
<div class="space-y-10">

    <!-- ════════ 1. KPI STAT CARDS ════════ -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <!-- Total Projects -->
        <a href="{{ route('admin.projects.index') }}" class="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/40 hover:bg-zinc-900/40 transition-all duration-300 group relative overflow-hidden block">
            <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Projects</span>
                <div class="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
            </div>
            <div class="text-4xl font-extrabold tracking-tight text-white font-heading">{{ $stats['total_projects'] }}</div>
            <p class="text-[11px] text-zinc-500 mt-2 flex items-center gap-1">
                <span>View portfolio archive</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
            </p>
        </a>

        <!-- Total Inquiries -->
        <a href="{{ route('admin.inquiries.index') }}" class="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/40 hover:bg-zinc-900/40 transition-all duration-300 group relative overflow-hidden block">
            <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Inquiries</span>
                <div class="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                </div>
            </div>
            <div class="text-4xl font-extrabold tracking-tight text-white font-heading">{{ $stats['total_inquiries'] }}</div>
            <p class="text-[11px] text-zinc-500 mt-2 flex items-center gap-1">
                <span>All submitted messages</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
            </p>
        </a>

        <!-- New / Unread Leads -->
        <a href="{{ route('admin.inquiries.index', ['status' => 'new']) }}" class="p-6 rounded-3xl bg-zinc-950/80 border {{ $stats['new_inquiries'] > 0 ? 'border-amber-500/40 bg-amber-500/[0.03] shadow-[0_0_30px_rgba(245,158,11,0.05)]' : 'border-zinc-800/80' }} hover:border-amber-500 transition-all duration-300 group relative overflow-hidden block">
            <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-semibold uppercase tracking-wider text-amber-400">New Inquiries</span>
                <div class="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <div class="text-4xl font-extrabold tracking-tight text-white font-heading">{{ $stats['new_inquiries'] }}</div>
                @if($stats['new_inquiries'] > 0)
                    <span class="flex h-3 w-3 relative">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                @endif
            </div>
            <p class="text-[11px] text-zinc-500 mt-2 flex items-center gap-1">
                <span>Requires review</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
            </p>
        </a>

        <!-- Active Team -->
        <a href="{{ route('admin.team.index') }}" class="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/40 hover:bg-zinc-900/40 transition-all duration-300 group relative overflow-hidden block">
            <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">Team Builders</span>
                <div class="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                </div>
            </div>
            <div class="text-4xl font-extrabold tracking-tight text-white font-heading">{{ $stats['total_team'] }}</div>
            <p class="text-[11px] text-zinc-500 mt-2 flex items-center gap-1">
                <span>Manage team roster</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
            </p>
        </a>

    </div>

    <!-- ════════ 2. RECENT INQUIRIES & RECENT PROJECTS ════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left: Recent Inquiries (7 Cols) -->
        <div class="lg:col-span-7 bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-6 lg:p-8">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-base font-bold tracking-tight text-white font-heading">Recent Client Inquiries</h2>
                    <p class="text-xs text-zinc-400">Latest submissions from the website contact modal</p>
                </div>
                <a href="{{ route('admin.inquiries.index') }}" class="text-xs font-bold text-amber-400 hover:underline">
                    View All &rarr;
                </a>
            </div>

            <div class="space-y-4">
                @forelse($recentInquiries as $inquiry)
                    <div class="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 hover:border-amber-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="space-y-1 min-w-0">
                            <div class="flex items-center gap-2">
                                @if($inquiry->status === 'new')
                                    <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                @endif
                                <h3 class="text-sm font-bold text-white truncate">{{ $inquiry->name }}</h3>
                                <span class="text-xs text-zinc-500 truncate font-mono">({{ $inquiry->email }})</span>
                            </div>
                            <p class="text-xs text-zinc-400 line-clamp-1 italic">"{{ $inquiry->details }}"</p>
                            <div class="flex items-center gap-3 text-[10px] text-zinc-500 pt-1">
                                <span class="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-medium">Budget: {{ $inquiry->budget ?? 'Flexible' }}</span>
                                <span>{{ $inquiry->created_at->diffForHumans() }}</span>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 shrink-0">
                            <a 
                                href="mailto:{{ $inquiry->email }}?subject=Re: Project Inquiry — Surprise-MFs Tech" 
                                class="px-3 py-1.5 rounded-xl bg-amber-500 text-black text-[11px] font-bold uppercase tracking-wider hover:bg-amber-400 transition-all"
                            >
                                Reply
                            </a>
                            <a 
                                href="https://wa.me/2347066620068?text=Hello%20{{ urlencode($inquiry->name) }},%20regarding%20your%20inquiry%20to%20Surprise-MFs%20Tech" 
                                target="_blank"
                                class="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black border border-emerald-500/30 text-[11px] font-bold uppercase tracking-wider transition-all"
                            >
                                WhatsApp
                            </a>
                        </div>
                    </div>
                @empty
                    <div class="py-12 text-center text-zinc-500 text-xs">
                        No client inquiries submitted yet.
                    </div>
                @endforelse
            </div>
        </div>

        <!-- Right: Recent Projects & Quick Actions (5 Cols) -->
        <div class="lg:col-span-5 space-y-8">
            
            <!-- Quick Actions -->
            <div class="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-6 lg:p-8">
                <h2 class="text-base font-bold tracking-tight text-white font-heading mb-4">Quick Actions</h2>
                <div class="grid grid-cols-2 gap-3">
                    <a href="{{ route('admin.projects.create') }}" class="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all text-center group">
                        <span class="text-2xl mb-2 block group-hover:scale-110 transition-transform">📁</span>
                        <span class="text-xs font-bold text-white block">Add Project</span>
                        <span class="text-[10px] text-zinc-500">Showcase new work</span>
                    </a>
                    <a href="{{ route('admin.team.create') }}" class="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all text-center group">
                        <span class="text-2xl mb-2 block group-hover:scale-110 transition-transform">👥</span>
                        <span class="text-xs font-bold text-white block">Add Builder</span>
                        <span class="text-[10px] text-zinc-500">Team member profile</span>
                    </a>
                    <a href="{{ route('admin.services.index') }}" class="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all text-center group">
                        <span class="text-2xl mb-2 block group-hover:scale-110 transition-transform">✨</span>
                        <span class="text-xs font-bold text-white block">Services</span>
                        <span class="text-[10px] text-zinc-500">Edit 8 offerings</span>
                    </a>
                    <a href="{{ route('admin.settings.index') }}" class="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all text-center group">
                        <span class="text-2xl mb-2 block group-hover:scale-110 transition-transform">⚙️</span>
                        <span class="text-xs font-bold text-white block">Studio Info</span>
                        <span class="text-[10px] text-zinc-500">Email, WhatsApp, Socials</span>
                    </a>
                </div>
            </div>

            <!-- Recent Projects Showcase -->
            <div class="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-6 lg:p-8">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-base font-bold tracking-tight text-white font-heading">Recent Projects</h2>
                    <a href="{{ route('admin.projects.index') }}" class="text-xs font-bold text-amber-400 hover:underline">
                        Manage &rarr;
                    </a>
                </div>
                <div class="space-y-3">
                    @forelse($recentProjects as $project)
                        <a href="{{ route('admin.projects.edit', $project) }}" class="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/40 transition-all group">
                            <div class="flex items-center gap-3">
                                @if($project->featured_image)
                                    <img src="{{ $project->featured_image }}" alt="{{ $project->title }}" class="w-10 h-10 rounded-xl object-cover border border-zinc-800">
                                @else
                                    <div class="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-xs font-bold text-amber-400">
                                        {{ substr($project->title, 0, 1) }}
                                    </div>
                                @endif
                                <div>
                                    <h4 class="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">{{ $project->title }}</h4>
                                    <p class="text-[10px] text-zinc-500">{{ $project->client_name ?? 'Internal Project' }}</p>
                                </div>
                            </div>
                            <span class="text-xs text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">Edit →</span>
                        </a>
                    @empty
                        <p class="text-xs text-zinc-500 text-center py-4">No projects added yet.</p>
                    @endforelse
                </div>
            </div>

        </div>

    </div>

</div>
@endsection
