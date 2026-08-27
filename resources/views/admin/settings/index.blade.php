@extends('layouts.admin')

@section('title', 'Studio Settings')
@section('page_title', 'Studio & Homepage Settings')
@section('page_subtitle', 'Manage brand identity, official email, WhatsApp contact number, and homepage text copy')

@section('content')
<div class="max-w-4xl" x-data="{ activeTab: 'brand' }">

    <!-- Tab Bar -->
    <div class="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-4 mb-8">
        <button 
            type="button" 
            @click="activeTab = 'brand'"
            :class="activeTab === 'brand' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white bg-zinc-900'"
            class="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all"
        >
            Brand & Hero
        </button>
        <button 
            type="button" 
            @click="activeTab = 'pricing'"
            :class="activeTab === 'pricing' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white bg-zinc-900'"
            class="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all"
        >
            Collaboration & Pricing Tiers
        </button>
        <button 
            type="button" 
            @click="activeTab = 'socials'"
            :class="activeTab === 'socials' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white bg-zinc-900'"
            class="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all"
        >
            Social Media
        </button>
    </div>

    <form method="POST" action="{{ route('admin.settings.update') }}" class="space-y-8">
        @csrf

        <!-- ════════ TAB 1: BRAND & HOMEPAGE TEXT ════════ -->
        <div x-show="activeTab === 'brand'" class="space-y-8">
            <div class="p-6 lg:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
                <h2 class="text-base font-bold text-white font-heading border-b border-zinc-800 pb-3">Primary Studio Identity</h2>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Studio Name *</label>
                        <input 
                            type="text" 
                            name="site_name" 
                            value="{{ old('site_name', $settings['site_name'] ?? 'Surprise-MFs Tech') }}" 
                            required
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Official Contact Email *</label>
                        <input 
                            type="email" 
                            name="contact_email" 
                            value="{{ old('contact_email', $settings['contact_email'] ?? 'surprisemfstech@gmail.com') }}" 
                            required
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Direct WhatsApp Number</label>
                        <input 
                            type="text" 
                            name="contact_phone" 
                            value="{{ old('contact_phone', $settings['contact_phone'] ?? '+2347066620068') }}" 
                            placeholder="+2347066620068"
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >
                    </div>
                </div>

                <div class="space-y-6 pt-4 border-t border-zinc-800">
                    <h3 class="text-xs font-bold uppercase tracking-wider text-amber-400">Homepage Hero Section</h3>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Hero Main Headline</label>
                        <input 
                            type="text" 
                            name="hero_text" 
                            value="{{ old('hero_text', $settings['hero_text'] ?? 'We build your digital future.') }}" 
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Hero Subtitle</label>
                        <input 
                            type="text" 
                            name="hero_subtitle" 
                            value="{{ old('hero_subtitle', $settings['hero_subtitle'] ?? 'From idea to launch — websites, apps, and digital growth. Let\'s build something great together.') }}" 
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >
                    </div>
                </div>

                <div class="space-y-6 pt-4 border-t border-zinc-800">
                    <h3 class="text-xs font-bold uppercase tracking-wider text-amber-400">Who We Are / About Section</h3>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">About Headline Paragraph</label>
                        <textarea 
                            name="about_text" 
                            rows="3" 
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >{{ old('about_text', $settings['about_text'] ?? 'We\'re a small, senior team of designers and developers who care about your business like it\'s our own. Since 2019, we\'ve been building websites, apps, and digital campaigns that actually bring in customers.') }}</textarea>
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">About Sub-Paragraph</label>
                        <textarea 
                            name="about_subtext" 
                            rows="2" 
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >{{ old('about_subtext', $settings['about_subtext'] ?? 'Surprise-MFs Tech was founded to make professional-grade digital solutions accessible to businesses of all sizes. We don\'t just deliver projects — we build partnerships.') }}</textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- ════════ TAB 2: COLLABORATION & PRICING TIERS ════════ -->
        <div x-show="activeTab === 'pricing'" class="space-y-8" x-cloak>
            <div class="p-6 lg:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
                <h2 class="text-base font-bold text-white font-heading border-b border-zinc-800 pb-3">Homepage Collaboration Tiers (Quote-Based)</h2>

                <!-- Tier 1 -->
                <div class="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                    <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Tier 1: Custom Project</span>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="text-xs text-zinc-400">Title</label>
                            <input type="text" name="pricing_standard_title" value="{{ old('pricing_standard_title', $settings['pricing_standard_title'] ?? 'Custom Project') }}" class="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500">
                        </div>
                        <div class="space-y-1.5">
                            <label class="text-xs text-zinc-400">Button CTA</label>
                            <input type="text" name="pricing_standard_cta" value="{{ old('pricing_standard_cta', $settings['pricing_standard_cta'] ?? 'Get Custom Quote') }}" class="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500">
                        </div>
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-xs text-zinc-400">Description</label>
                        <textarea name="pricing_standard_desc" rows="2" class="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500">{{ old('pricing_standard_desc', $settings['pricing_standard_desc'] ?? 'One-time build tailored to your exact needs. High-performing websites, web apps, or mobile applications.') }}</textarea>
                    </div>
                </div>

                <!-- Tier 2 -->
                <div class="p-4 rounded-2xl bg-zinc-900/50 border border-amber-500/30 space-y-4">
                    <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Tier 2: Flexible Retainer (Highlighted)</span>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="text-xs text-zinc-400">Title</label>
                            <input type="text" name="pricing_popular_title" value="{{ old('pricing_popular_title', $settings['pricing_popular_title'] ?? 'Flexible Retainer') }}" class="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500">
                        </div>
                        <div class="space-y-1.5">
                            <label class="text-xs text-zinc-400">Button CTA</label>
                            <input type="text" name="pricing_popular_cta" value="{{ old('pricing_popular_cta', $settings['pricing_popular_cta'] ?? 'Partner With Us') }}" class="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500">
                        </div>
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-xs text-zinc-400">Description</label>
                        <textarea name="pricing_popular_desc" rows="2" class="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500">{{ old('pricing_popular_desc', $settings['pricing_popular_desc'] ?? 'Ongoing development, design updates, feature additions, and maintenance as your business scales.') }}</textarea>
                    </div>
                </div>

                <!-- Tier 3 -->
                <div class="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                    <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Tier 3: Budget-First</span>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="text-xs text-zinc-400">Title</label>
                            <input type="text" name="pricing_flex_title" value="{{ old('pricing_flex_title', $settings['pricing_flex_title'] ?? 'Budget-First') }}" class="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500">
                        </div>
                        <div class="space-y-1.5">
                            <label class="text-xs text-zinc-400">Button CTA</label>
                            <input type="text" name="pricing_flex_cta" value="{{ old('pricing_flex_cta', $settings['pricing_flex_cta'] ?? 'Share Your Budget') }}" class="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500">
                        </div>
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-xs text-zinc-400">Description</label>
                        <textarea name="pricing_flex_desc" rows="2" class="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500">{{ old('pricing_flex_desc', $settings['pricing_flex_desc'] ?? 'Tell us what you have to invest and we\'ll architect the best possible solution.') }}</textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- ════════ TAB 3: SOCIAL MEDIA ════════ -->
        <div x-show="activeTab === 'socials'" class="space-y-8" x-cloak>
            <div class="p-6 lg:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
                <h2 class="text-base font-bold text-white font-heading border-b border-zinc-800 pb-3">Social Profiles</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">Instagram URL</label>
                        <input 
                            type="url" 
                            name="social_instagram" 
                            value="{{ old('social_instagram', $settings['social_instagram'] ?? '') }}" 
                            placeholder="https://instagram.com/surprisemfs" 
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">X / Twitter URL</label>
                        <input 
                            type="url" 
                            name="social_twitter" 
                            value="{{ old('social_twitter', $settings['social_twitter'] ?? '') }}" 
                            placeholder="https://x.com/surprisemfs" 
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">LinkedIn Company URL</label>
                        <input 
                            type="url" 
                            name="social_linkedin" 
                            value="{{ old('social_linkedin', $settings['social_linkedin'] ?? '') }}" 
                            placeholder="https://linkedin.com/company/surprisemfs" 
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold uppercase tracking-wider text-zinc-300">GitHub Organization URL</label>
                        <input 
                            type="url" 
                            name="social_github" 
                            value="{{ old('social_github', $settings['social_github'] ?? '') }}" 
                            placeholder="https://github.com/surprisemfs" 
                            class="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >
                    </div>
                </div>
            </div>
        </div>

        <div class="pt-4 flex justify-end">
            <button type="submit" class="px-8 py-3.5 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-all">
                Save Studio Settings
            </button>
        </div>

    </form>

</div>
@endsection
