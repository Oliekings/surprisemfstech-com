<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">

        <title inertia>{{ config('app.name', 'Surprise-MFs Tech') }} — Web & App Development Studio</title>

        <!-- SEO & Meta -->
        <meta name="description" content="Surprise-MFs Tech is a web & mobile app development studio. We craft bespoke websites, high-performance web applications, iOS/Android apps, and digital ad campaigns tailored to your budget.">
        <meta name="keywords" content="Surprise-MFs Tech, web development, mobile app development, UI/UX design, custom software company, react developers, laravel agency, digital advertising, google ads, nigerian tech studio, hire developers, website designers">
        <meta name="author" content="Surprise-MFs Tech">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="theme-color" content="#000000">

        <!-- Favicon -->
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">
        <link rel="alternate icon" href="/favicon.ico">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <!-- Geo & Language Meta for Global & Local SEO -->
        <meta name="geo.region" content="NG">
        <meta name="geo.placename" content="Nigeria">
        <meta name="language" content="English">

        <!-- Open Graph / Facebook / LinkedIn / WhatsApp -->
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Surprise-MFs Tech">
        <meta property="og:title" content="Surprise-MFs Tech — Web & App Development Studio">
        <meta property="og:description" content="From idea to launch — bespoke websites, mobile apps, and digital growth engineered to convert. Let's build something great together.">
        <meta property="og:url" content="https://surprisemfstech.com">
        <meta property="og:image" content="https://surprisemfstech.com/favicon.ico">
        <meta property="og:image:alt" content="Surprise-MFs Tech Studio Logo">
        <meta property="og:locale" content="en_US">

        <!-- Twitter / X Cards -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@olie_kings">
        <meta name="twitter:creator" content="@olie_kings">
        <meta name="twitter:title" content="Surprise-MFs Tech — Web & App Development Studio">
        <meta name="twitter:description" content="From idea to launch — websites, mobile apps, and digital growth. Let's build something great together.">
        <meta name="twitter:image" content="https://surprisemfstech.com/favicon.ico">

        <!-- Comprehensive JSON-LD Structured Data for Google Rich Snippets & AI (GEO/AEO) -->
        <script type="application/ld+json">
        {
          "@@context": "https://schema.org",
          "@@graph": [
            {
              "@@type": "Organization",
              "@@id": "https://surprisemfstech.com/#organization",
              "name": "Surprise-MFs Tech",
              "alternateName": ["Surprise-MFs", "Surprise MFs Tech", "Surprise Tech Studio"],
              "url": "https://surprisemfstech.com",
              "logo": {
                "@@type": "ImageObject",
                "url": "https://surprisemfstech.com/favicon.ico"
              },
              "image": "https://surprisemfstech.com/favicon.ico",
              "description": "Surprise-MFs Tech is a digital product agency and software engineering studio building custom websites, mobile apps, and conversion-focused growth campaigns.",
              "email": "surprisemfstech@gmail.com",
              "telephone": "+2347066620068",
              "foundingDate": "2019",
              "areaServed": [
                { "@@type": "Country", "name": "Nigeria" },
                { "@@type": "Country", "name": "United States" },
                { "@@type": "Country", "name": "United Kingdom" },
                { "@@type": "Country", "name": "Canada" },
                { "@@type": "GeoShape", "name": "Worldwide" }
              ],
              "contactPoint": [
                {
                  "@@type": "ContactPoint",
                  "telephone": "+2347066620068",
                  "contactType": "customer service",
                  "availableLanguage": ["English"],
                  "contactOption": ["WhatsApp", "TollFree"]
                },
                {
                  "@@type": "ContactPoint",
                  "email": "surprisemfstech@gmail.com",
                  "contactType": "sales",
                  "availableLanguage": ["English"]
                }
              ],
              "sameAs": [
                "https://x.com/olie_kings",
                "https://instagram.com/surprisemfstech",
                "https://linkedin.com/company/surprisemfs"
              ],
              "knowsAbout": [
                "Web Development",
                "Mobile App Development",
                "iOS & Android Apps",
                "UI/UX Design",
                "Custom Software Engineering",
                "Digital Advertising",
                "Google Ads",
                "Meta Ads",
                "Search Engine Optimization (SEO)",
                "E-Commerce Solutions",
                "React",
                "Next.js",
                "Laravel",
                "Tailwind CSS"
              ]
            },
            {
              "@@type": "WebSite",
              "@@id": "https://surprisemfstech.com/#website",
              "url": "https://surprisemfstech.com",
              "name": "Surprise-MFs Tech",
              "publisher": {
                "@@id": "https://surprisemfstech.com/#organization"
              },
              "inLanguage": "en-US"
            },
            {
              "@@type": "ProfessionalService",
              "@@id": "https://surprisemfstech.com/#service",
              "name": "Surprise-MFs Tech Digital Services",
              "url": "https://surprisemfstech.com",
              "priceRange": "$$",
              "provider": {
                "@@id": "https://surprisemfstech.com/#organization"
              },
              "hasOfferCatalog": {
                "@@type": "OfferCatalog",
                "name": "Digital Services",
                "itemListElement": [
                  {
                    "@@type": "Offer",
                    "itemOffered": {
                      "@@type": "Service",
                      "name": "UI/UX Design",
                      "description": "Visual systems and user interfaces built for emotional connection and conversion."
                    }
                  },
                  {
                    "@@type": "Offer",
                    "itemOffered": {
                      "@@type": "Service",
                      "name": "Custom Web Applications",
                      "description": "Complex business logic transformed into high-performance, scalable web applications."
                    }
                  },
                  {
                    "@@type": "Offer",
                    "itemOffered": {
                      "@@type": "Service",
                      "name": "Mobile App Development",
                      "description": "Native and cross-platform apps for iOS and Android with smooth 60fps micro-animations."
                    }
                  },
                  {
                    "@@type": "Offer",
                    "itemOffered": {
                      "@@type": "Service",
                      "name": "Digital Advertising",
                      "description": "Targeted Google Ads, Meta, and TikTok campaigns that turn clicks into paying customers."
                    }
                  }
                ]
              }
            },
            {
              "@@type": "FAQPage",
              "@@id": "https://surprisemfstech.com/#faq",
              "mainEntity": [
                {
                  "@@type": "Question",
                  "name": "What is Surprise-MFs Tech?",
                  "acceptedAnswer": {
                    "@@type": "Answer",
                    "text": "Surprise-MFs Tech (surprisemfstech.com) is a full-service digital product and engineering studio specializing in bespoke web development, mobile applications, UI/UX design, and digital advertising."
                  }
                },
                {
                  "@@type": "Question",
                  "name": "What services does Surprise-MFs Tech provide?",
                  "acceptedAnswer": {
                    "@@type": "Answer",
                    "text": "Surprise-MFs Tech provides UI/UX Design, Custom Web Application Development, iOS & Android Mobile Apps, E-Commerce Systems, Digital Advertising (Google/Meta/TikTok Ads), Brand Identity, and SEO Optimization."
                  }
                },
                {
                  "@@type": "Question",
                  "name": "How does Surprise-MFs Tech charge for projects?",
                  "acceptedAnswer": {
                    "@@type": "Answer",
                    "text": "Surprise-MFs Tech offers flexible, transparent pricing models including Fixed Scope Project Quotes, Monthly Tech Partnerships, and Budget-First builds where roadmaps are engineered to fit the client's available budget."
                  }
                },
                {
                  "@@type": "Question",
                  "name": "How do I contact Surprise-MFs Tech?",
                  "acceptedAnswer": {
                    "@@type": "Answer",
                    "text": "You can contact Surprise-MFs Tech directly via WhatsApp at +2347066620068, email surprisemfstech@gmail.com, or submit an inquiry on surprisemfstech.com."
                  }
                }
              ]
            }
          ]
        }
        </script>

        <!-- Optimized Fonts: Preconnect & Essential Weights (Inter + JetBrains Mono) -->
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link rel="dns-prefetch" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800|jetbrains-mono:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-black text-white selection:bg-amber-500 selection:text-black">
        @inertia
    </body>
</html>
