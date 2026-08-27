@extends('layouts.admin')

@section('title', 'Admin Profile & Security')
@section('page_title', 'Account & Security')
@section('page_subtitle', 'Manage your administrator email and login password')

@section('content')
<div class="max-w-5xl space-y-10">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- ════════ 1. PROFILE DETAILS FORM ════════ -->
        <div class="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-6 lg:p-8 flex flex-col justify-between">
            <div>
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    </div>
                    <div>
                        <h2 class="text-base font-bold tracking-tight text-white font-heading">Profile Information</h2>
                        <p class="text-xs text-zinc-400">Update your account name and login email address</p>
                    </div>
                </div>

                <form method="POST" action="{{ route('admin.profile.update') }}" class="space-y-5">
                    @csrf
                    @method('PUT')

                    <!-- Name -->
                    <div>
                        <label for="name" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                            Full Name <span class="text-amber-400">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            value="{{ old('name', $user->name) }}" 
                            required
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white text-sm transition-all"
                            placeholder="e.g. Alex Morgan"
                        >
                        @error('name')
                            <p class="text-red-400 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Email -->
                    <div>
                        <label for="email" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                            Login Email Address <span class="text-amber-400">*</span>
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value="{{ old('email', $user->email) }}" 
                            required
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white text-sm transition-all"
                            placeholder="e.g. surprisemfstech@gmail.com"
                        >
                        @error('email')
                            <p class="text-red-400 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="pt-4 border-t border-zinc-800/80 flex justify-end">
                        <button 
                            type="submit" 
                            class="px-6 py-3 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all flex items-center gap-2"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- ════════ 2. CHANGE PASSWORD FORM ════════ -->
        <div class="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-6 lg:p-8 flex flex-col justify-between">
            <div>
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    </div>
                    <div>
                        <h2 class="text-base font-bold tracking-tight text-white font-heading">Update Password</h2>
                        <p class="text-xs text-zinc-400">Ensure your account is using a secure, strong password</p>
                    </div>
                </div>

                <form method="POST" action="{{ route('admin.profile.password') }}" class="space-y-5">
                    @csrf
                    @method('PUT')

                    <!-- Current Password -->
                    <div>
                        <label for="current_password" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                            Current Password <span class="text-amber-400">*</span>
                        </label>
                        <input 
                            type="password" 
                            name="current_password" 
                            id="current_password" 
                            required
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white text-sm transition-all"
                            placeholder="Enter your current password"
                        >
                        @error('current_password', 'updatePassword')
                            <p class="text-red-400 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- New Password -->
                    <div>
                        <label for="password" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                            New Password <span class="text-amber-400">*</span>
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            required
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white text-sm transition-all"
                            placeholder="Minimum 8 characters"
                        >
                        @error('password', 'updatePassword')
                            <p class="text-red-400 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Confirm Password -->
                    <div>
                        <label for="password_confirmation" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                            Confirm New Password <span class="text-amber-400">*</span>
                        </label>
                        <input 
                            type="password" 
                            name="password_confirmation" 
                            id="password_confirmation" 
                            required
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white text-sm transition-all"
                            placeholder="Re-enter your new password"
                        >
                    </div>

                    <div class="pt-4 border-t border-zinc-800/80 flex justify-end">
                        <button 
                            type="submit" 
                            class="px-6 py-3 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all flex items-center gap-2"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </div>

</div>
@endsection
