@extends('layouts.admin')

@section('title', 'Team & Builders')
@section('page_title', 'Meet the Builders')
@section('page_subtitle', 'Manage developer, designer, and strategist profiles')

@section('header_actions')
    <a href="{{ route('admin.team.create') }}" class="px-5 py-2.5 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Add Builder
    </a>
@endsection

@section('content')
<div class="space-y-8">

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        @forelse($team as $member)
            <div class="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group">
                <div class="space-y-4">
                    <div class="aspect-square rounded-2xl bg-zinc-900 overflow-hidden border border-zinc-800 relative">
                        @if($member->avatar_path)
                            <img src="{{ $member->avatar_path }}" alt="{{ $member->name }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        @else
                            <div class="w-full h-full flex items-center justify-center text-4xl font-bold text-amber-400/30">
                                {{ substr($member->name, 0, 1) }}
                            </div>
                        @endif
                    </div>

                    <div>
                        <h3 class="text-base font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors font-heading">
                            {{ $member->name }}
                        </h3>
                        <p class="text-xs uppercase tracking-wider text-amber-400/70 font-semibold mt-0.5">
                            {{ $member->role }}
                        </p>
                        @if($member->bio)
                            <p class="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                                {{ $member->bio }}
                            </p>
                        @endif
                    </div>
                </div>

                <div class="pt-6 mt-6 border-t border-zinc-800/60 flex items-center justify-between">
                    <a 
                        href="{{ route('admin.team.edit', $member) }}" 
                        class="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-white hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"
                    >
                        Edit Profile
                    </a>

                    <form method="POST" action="{{ route('admin.team.destroy', $member) }}" onsubmit="return confirm('Are you sure you want to remove this team member?');">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="p-2 text-zinc-500 hover:text-red-400 transition-colors" title="Delete Member">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                    </form>
                </div>
            </div>
        @empty
            <div class="col-span-full py-24 text-center bg-zinc-950/40 border border-zinc-800/40 rounded-3xl space-y-4">
                <svg class="w-12 h-12 text-zinc-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                <h3 class="text-sm font-bold text-white">No team members added</h3>
                <p class="text-xs text-zinc-500">Click below to introduce the first builder on the team.</p>
                <a href="{{ route('admin.team.create') }}" class="inline-block px-5 py-2.5 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-wider">
                    Add First Builder
                </a>
            </div>
        @endforelse
    </div>

</div>
@endsection
