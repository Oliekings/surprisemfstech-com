@extends('layouts.admin')

@section('title', 'Services')
@section('page_title', 'Services & Specializations')
@section('page_subtitle', 'Manage service titles and descriptions displayed across the website')

@section('content')
<div class="space-y-8">

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        @foreach($services as $service)
            <div class="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group">
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                            /service/{{ $service->slug }}
                        </span>
                    </div>

                    <div>
                        <h3 class="text-base font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors font-heading mb-2">
                            {{ $service->title }}
                        </h3>
                        <p class="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                            {{ $service->description }}
                        </p>
                    </div>
                </div>

                <div class="pt-6 mt-6 border-t border-zinc-800/60 flex items-center justify-between">
                    <a 
                        href="{{ route('admin.services.edit', $service) }}" 
                        class="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-white hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"
                    >
                        Edit Offering
                    </a>
                    <a 
                        href="/service/{{ $service->slug }}" 
                        target="_blank" 
                        class="text-[11px] text-zinc-500 hover:text-amber-400"
                    >
                        Preview ↗
                    </a>
                </div>
            </div>
        @endforeach
    </div>

</div>
@endsection
