@php
    $slug = request()->path() === '/' ? 'home' : request()->path();
    $meta = \App\Models\SeoMeta::where('slug', $slug)->first();
@endphp

@if($meta)
    @if($meta->title)
        <title>{{ $meta->title }}</title>
        <meta name="title" content="{{ $meta->title }}">
    @endif
    @if($meta->description)
        <meta name="description" content="{{ $meta->description }}">
    @endif

    {{-- Open Graph --}}
    @if($meta->og_title)
        <meta property="og:title" content="{{ $meta->og_title }}">
    @endif
    @if($meta->og_description)
        <meta property="og:description" content="{{ $meta->og_description }}">
    @endif
    @if($meta->og_image)
        <meta property="og:image" content="{{ asset('storage/' . $meta->og_image) }}">
    @endif

    {{-- Twitter --}}
    @if($meta->twitter_title)
        <meta property="twitter:title" content="{{ $meta->twitter_title }}">
    @endif
    @if($meta->twitter_description)
        <meta property="twitter:description" content="{{ $meta->twitter_description }}">
    @endif
    @if($meta->twitter_image)
        <meta property="twitter:image" content="{{ asset('storage/' . $meta->twitter_image) }}">
    @endif

    {{-- Canonical --}}
    @if($meta->canonical_url)
        <link rel="canonical" href="{{ $meta->canonical_url }}">
    @endif
@endif
