<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin Portal') — Surprise-MFs Tech</title>

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="alternate icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">

    <!-- Tailwind CSS (via Vite) & Alpine.js -->
    @vite(['resources/css/app.css'])
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>

    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #09090b;
            color: #fafafa;
        }
        .font-heading {
            font-family: 'Space Grotesk', sans-serif;
        }
        [x-cloak] { display: none !important; }
    </style>
</head>
<body class="bg-[#09090b] text-zinc-100 min-h-screen flex antialiased selection:bg-amber-500 selection:text-black" x-data="{ mobileMenuOpen: false }">

    <!-- ════════ MOBILE DRAWER BACKDROP ════════ -->
    <div 
        x-show="mobileMenuOpen" 
        x-transition:enter="transition-opacity ease-linear duration-300"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition-opacity ease-linear duration-300"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        @click="mobileMenuOpen = false" 
        class="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
        x-cloak
    ></div>

    <!-- ════════ SIDEBAR ════════ -->
    <aside 
        :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
        class="fixed top-0 bottom-0 left-0 z-50 w-72 bg-zinc-950 border-r border-zinc-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out"
    >
        <!-- Top: Brand -->
        <div>
            <div class="h-20 px-6 flex items-center justify-between border-b border-zinc-800/60">
                <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3 group">
                    <span class="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)] group-hover:scale-125 transition-transform"></span>
                    <div class="flex flex-col">
                        <span class="text-sm font-bold uppercase tracking-wider text-white font-heading">SURPRISE-MFs</span>
                        <span class="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold -mt-0.5">Admin Studio</span>
                    </div>
                </a>
                <button @click="mobileMenuOpen = false" class="lg:hidden p-2 text-zinc-400 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>

            <!-- Navigation Links -->
            <nav class="p-4 space-y-1.5">
                <a 
                    href="{{ route('admin.dashboard') }}" 
                    class="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all {{ request()->routeIs('admin.dashboard') || request()->routeIs('admin.index') ? 'bg-amber-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.25)] font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80' }}"
                >
                    <svg class="w-4 h-4 {{ request()->routeIs('admin.dashboard') ? 'text-black' : 'text-amber-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                    Dashboard
                </a>

                @php
                    $unreadInquiries = \App\Models\Inquiry::where('status', 'new')->count();
                @endphp
                <a 
                    href="{{ route('admin.inquiries.index') }}" 
                    class="flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all {{ request()->routeIs('admin.inquiries.*') ? 'bg-amber-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.25)] font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80' }}"
                >
                    <div class="flex items-center gap-3">
                        <svg class="w-4 h-4 {{ request()->routeIs('admin.inquiries.*') ? 'text-black' : 'text-amber-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                        Inquiries
                    </div>
                    @if($unreadInquiries > 0)
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold {{ request()->routeIs('admin.inquiries.*') ? 'bg-black text-amber-400' : 'bg-amber-500 text-black animate-pulse' }}">
                            {{ $unreadInquiries }}
                        </span>
                    @endif
                </a>

                <a 
                    href="{{ route('admin.projects.index') }}" 
                    class="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all {{ request()->routeIs('admin.projects.*') ? 'bg-amber-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.25)] font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80' }}"
                >
                    <svg class="w-4 h-4 {{ request()->routeIs('admin.projects.*') ? 'text-black' : 'text-amber-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    Projects
                </a>

                <a 
                    href="{{ route('admin.services.index') }}" 
                    class="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all {{ request()->routeIs('admin.services.*') ? 'bg-amber-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.25)] font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80' }}"
                >
                    <svg class="w-4 h-4 {{ request()->routeIs('admin.services.*') ? 'text-black' : 'text-amber-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                    Services
                </a>

                <a 
                    href="{{ route('admin.team.index') }}" 
                    class="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all {{ request()->routeIs('admin.team.*') ? 'bg-amber-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.25)] font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80' }}"
                >
                    <svg class="w-4 h-4 {{ request()->routeIs('admin.team.*') ? 'text-black' : 'text-amber-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                    Team & Builders
                </a>

                <a 
                    href="{{ route('admin.settings.index') }}" 
                    class="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all {{ request()->routeIs('admin.settings.*') ? 'bg-amber-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.25)] font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80' }}"
                >
                    <svg class="w-4 h-4 {{ request()->routeIs('admin.settings.*') ? 'text-black' : 'text-amber-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Studio Settings
                </a>
            </nav>
        </div>

        <!-- Bottom: User Card & Quick Links -->
        <div class="p-4 border-t border-zinc-800/60 space-y-3">
            <a 
                href="/" 
                target="_blank" 
                class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-amber-400 bg-zinc-900/60 hover:bg-zinc-900 transition-all border border-zinc-800/50"
            >
                <span>Live Website</span>
                <span>↗</span>
            </a>

            <div class="p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/40 flex items-center justify-between">
                <div class="flex items-center gap-3 overflow-hidden">
                    <div class="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xs font-bold text-amber-400 shrink-0">
                        {{ strtoupper(substr(auth()->user()->name ?? 'A', 0, 1)) }}
                    </div>
                    <div class="truncate">
                        <p class="text-xs font-bold text-white truncate">{{ auth()->user()->name }}</p>
                        <p class="text-[10px] text-zinc-500 truncate">{{ auth()->user()->email }}</p>
                    </div>
                </div>

                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="p-2 text-zinc-400 hover:text-red-400 transition-colors" title="Log Out">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    </button>
                </form>
            </div>
        </div>
    </aside>

    <!-- ════════ MAIN CONTENT WRAPPER ════════ -->
    <div class="lg:pl-72 flex-1 flex flex-col min-w-0">

        <!-- Top Header -->
        <header class="h-20 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30">
            <div class="flex items-center gap-4">
                <button @click="mobileMenuOpen = true" class="lg:hidden p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>
                <div>
                    <h1 class="text-lg font-bold tracking-tight text-white font-heading">@yield('page_title', 'Dashboard')</h1>
                    <p class="text-xs text-zinc-400 hidden sm:block">@yield('page_subtitle', 'Surprise-MFs Tech Management System')</p>
                </div>
            </div>

            <div class="flex items-center gap-3">
                @yield('header_actions')
            </div>
        </header>

        <!-- Flash Message Alerts -->
        <div class="px-6 lg:px-10 pt-6">
            @if(session('success'))
                <div 
                    x-data="{ show: true }" 
                    x-show="show" 
                    x-init="setTimeout(() => show = false, 5000)" 
                    class="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-amber-300 text-xs font-semibold"
                >
                    <div class="flex items-center gap-3">
                        <svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        <span>{{ session('success') }}</span>
                    </div>
                    <button @click="show = false" class="text-amber-400/60 hover:text-amber-300">&times;</button>
                </div>
            @endif

            @if(session('error'))
                <div 
                    x-data="{ show: true }" 
                    x-show="show" 
                    class="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-between text-red-300 text-xs font-semibold"
                >
                    <div class="flex items-center gap-3">
                        <svg class="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <span>{{ session('error') }}</span>
                    </div>
                    <button @click="show = false" class="text-red-400/60 hover:text-red-300">&times;</button>
                </div>
            @endif

            @if(isset($errors) && $errors->any())
                <div class="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs space-y-1">
                    <p class="font-bold">Please correct the following errors:</p>
                    <ul class="list-disc list-inside space-y-0.5 opacity-90">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div>

        <!-- Main Body -->
        <main class="flex-1 px-6 lg:px-10 pb-16">
            @yield('content')
        </main>
    </div>

</body>
</html>
