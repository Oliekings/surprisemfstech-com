@extends('layouts.admin')

@section('title', 'Client Inquiries')
@section('page_title', 'Client Inquiries & Leads')
@section('page_subtitle', 'Review, manage, and reply to client inquiries submitted from the website')

@section('content')
<div class="space-y-8" x-data="{ selectedInquiry: null, modalOpen: false }">

    <!-- ════════ TOP BAR: SEARCH & STATUS TABS ════════ -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-950/80 border border-zinc-800/80 p-4 rounded-3xl">
        
        <!-- Status Tabs -->
        <div class="flex flex-wrap items-center gap-2">
            <a 
                href="{{ route('admin.inquiries.index', ['status' => 'all', 'search' => request('search')]) }}" 
                class="px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all {{ $status === 'all' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-900' }}"
            >
                All ({{ \App\Models\Inquiry::count() }})
            </a>
            <a 
                href="{{ route('admin.inquiries.index', ['status' => 'new', 'search' => request('search')]) }}" 
                class="px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 {{ $status === 'new' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-900' }}"
            >
                <span>New</span>
                @if($newCount > 0)
                    <span class="px-2 py-0.5 rounded-full text-[10px] {{ $status === 'new' ? 'bg-black text-amber-400' : 'bg-amber-500 text-black font-bold' }}">
                        {{ $newCount }}
                    </span>
                @endif
            </a>
            <a 
                href="{{ route('admin.inquiries.index', ['status' => 'read', 'search' => request('search')]) }}" 
                class="px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all {{ $status === 'read' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-900' }}"
            >
                Read
            </a>
            <a 
                href="{{ route('admin.inquiries.index', ['status' => 'archived', 'search' => request('search')]) }}" 
                class="px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all {{ $status === 'archived' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-900' }}"
            >
                Archived
            </a>
        </div>

        <!-- Search Bar -->
        <form method="GET" action="{{ route('admin.inquiries.index') }}" class="w-full md:w-72">
            <input type="hidden" name="status" value="{{ $status }}">
            <div class="relative">
                <input 
                    type="text" 
                    name="search" 
                    value="{{ request('search') }}" 
                    placeholder="Search by client or email..." 
                    class="w-full px-4 py-2.5 pl-10 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                >
                <svg class="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
        </form>

    </div>

    <!-- ════════ INQUIRIES LIST ════════ -->
    <div class="space-y-4">
        @forelse($inquiries as $inquiry)
            <div class="p-6 rounded-3xl bg-zinc-950/80 border {{ $inquiry->status === 'new' ? 'border-amber-500/40 bg-amber-500/[0.02] shadow-[0_0_25px_rgba(245,158,11,0.03)]' : 'border-zinc-800/80' }} transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                <div class="space-y-3 flex-1 min-w-0">
                    <div class="flex flex-wrap items-center gap-3">
                        @if($inquiry->status === 'new')
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                                <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                                New Inquiry
                            </span>
                        @elseif($inquiry->status === 'read')
                            <span class="inline-flex items-center px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-[10px] font-medium uppercase tracking-wider">
                                Read
                            </span>
                        @else
                            <span class="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] font-medium uppercase tracking-wider">
                                Archived
                            </span>
                        @endif

                        <h3 class="text-base font-bold text-white tracking-tight">{{ $inquiry->name }}</h3>
                        <a href="mailto:{{ $inquiry->email }}" class="text-xs font-mono text-amber-400/80 hover:text-amber-300 hover:underline">
                            {{ $inquiry->email }}
                        </a>
                        <span class="text-[11px] text-zinc-500">· {{ $inquiry->created_at->format('M j, Y — g:i A') }}</span>
                    </div>

                    <div class="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/40">
                        <p class="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                            {{ $inquiry->details }}
                        </p>
                    </div>

                    <div class="flex items-center gap-3 text-xs">
                        <span class="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]">
                            Budget: <strong class="text-amber-400">{{ $inquiry->budget ?? 'Not Specified' }}</strong>
                        </span>
                        <button 
                            type="button" 
                            @click="selectedInquiry = {{ json_encode($inquiry) }}; modalOpen = true"
                            class="text-xs font-semibold text-amber-400 hover:text-amber-300 underline"
                        >
                            Read Full Details
                        </button>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-wrap lg:flex-col items-center lg:items-end gap-2.5 shrink-0">
                    <div class="flex items-center gap-2">
                        <a 
                            href="mailto:{{ $inquiry->email }}?subject=Re: Your Project Inquiry — Surprise-MFs Tech" 
                            class="px-4 py-2 rounded-full bg-amber-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all flex items-center gap-1.5"
                        >
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            Gmail
                        </a>
                        <a 
                            href="https://wa.me/2347066620068?text=Hello%20{{ urlencode($inquiry->name) }},%20thank%20you%20for%20reaching%20out%20to%20Surprise-MFs%20Tech" 
                            target="_blank"
                            class="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black border border-emerald-500/30 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                        >
                            WhatsApp
                        </a>
                    </div>

                    <div class="flex items-center gap-2">
                        @if($inquiry->status === 'new')
                            <form method="POST" action="{{ route('admin.inquiries.update', $inquiry) }}">
                                @csrf
                                @method('PUT')
                                <input type="hidden" name="status" value="read">
                                <button type="submit" class="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-zinc-400 hover:text-white transition-all">
                                    Mark Read
                                </button>
                            </form>
                        @endif

                        <form method="POST" action="{{ route('admin.inquiries.destroy', $inquiry) }}" onsubmit="return confirm('Are you sure you want to delete this inquiry?')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="p-2 text-zinc-500 hover:text-red-400 transition-colors" title="Delete Inquiry">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        @empty
            <div class="py-24 text-center bg-zinc-950/40 border border-zinc-800/40 rounded-3xl space-y-3">
                <svg class="w-12 h-12 text-zinc-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                <h3 class="text-sm font-bold text-white">No inquiries found</h3>
                <p class="text-xs text-zinc-500">There are no client inquiries in this filter.</p>
            </div>
        @endforelse
    </div>

    <!-- Pagination -->
    <div class="pt-4">
        {{ $inquiries->links() }}
    </div>

    <!-- ════════ INQUIRY DETAILS MODAL ════════ -->
    <div 
        x-show="modalOpen" 
        class="fixed inset-0 z-50 overflow-y-auto" 
        x-cloak
    >
        <div class="flex items-center justify-center min-h-screen p-4 text-center">
            <div class="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" @click="modalOpen = false"></div>

            <div 
                x-show="modalOpen"
                x-transition:enter="ease-out duration-300"
                x-transition:enter-start="opacity-0 scale-95"
                x-transition:enter-end="opacity-100 scale-100"
                x-transition:leave="ease-in duration-200"
                x-transition:leave-start="opacity-100 scale-100"
                x-transition:leave-end="opacity-0 scale-95"
                class="relative bg-zinc-950 border border-zinc-800 rounded-3xl p-6 lg:p-8 max-w-2xl w-full text-left shadow-2xl overflow-hidden"
            >
                <div class="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
                    <div>
                        <h3 class="text-lg font-bold text-white font-heading" x-text="selectedInquiry?.name"></h3>
                        <p class="text-xs text-amber-400 font-mono" x-text="selectedInquiry?.email"></p>
                    </div>
                    <button @click="modalOpen = false" class="p-2 text-zinc-400 hover:text-white">&times;</button>
                </div>

                <div class="space-y-4">
                    <div>
                        <span class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Budget Allocation</span>
                        <p class="text-sm font-bold text-amber-400" x-text="selectedInquiry?.budget || 'Not specified'"></p>
                    </div>

                    <div>
                        <span class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Project Scope & Details</span>
                        <div class="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto" x-text="selectedInquiry?.details"></div>
                    </div>
                </div>

                <div class="pt-6 mt-6 border-t border-zinc-800 flex justify-end gap-3">
                    <a 
                        :href="'mailto:' + selectedInquiry?.email + '?subject=Re: Your Inquiry — Surprise-MFs Tech'" 
                        class="px-5 py-2.5 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all"
                    >
                        Send Email Reply
                    </a>
                    <button 
                        type="button" 
                        @click="modalOpen = false"
                        class="px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>

</div>
@endsection
