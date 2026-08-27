<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Setting;
use App\Models\Project;
use App\Models\TeamMember;
use App\Models\Service;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin User
        User::updateOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Admin User', 'password' => bcrypt('password')]
        );

        // Site Settings
        $settings = array (
  'site_name' => 'Surprise-MFs Tech',
  'hero_text' => 'We build your digital future.',
  'about_text' => 'We\'re a small, senior team of designers and developers who care about your business like it\'s our own. Since 2025, we\'ve been building websites, apps, and digital campaigns that actually bring in customers.',
  'contact_email' => 'surprisemfstech@gmail.com',
  'social_instagram' => 'https://instagram.com/surprisemfs',
  'social_twitter' => 'https://x.com/surprisemfs',
  'social_linkedin' => 'https://linkedin.com/company/surprisemfs',
  'social_github' => 'https://github.com/surprisemfs',
  'pricing_standard_title' => 'Custom Project',
  'pricing_standard_desc' => 'One-time build tailored to your exact needs. High-performing websites, web apps, or mobile applications.',
  'pricing_standard_price' => 'Fixed Price',
  'pricing_standard_features' => 'Custom UI/UX Design,Full Development,30 Days Support',
  'pricing_standard_cta' => 'Get Custom Quote',
  'pricing_popular_title' => 'Flexible Retainer',
  'pricing_popular_desc' => 'Ongoing development, design updates, feature additions, and maintenance as your business scales.',
  'pricing_popular_price' => 'From $3k',
  'pricing_popular_period' => '/mo',
  'pricing_popular_features' => 'Unlimited Small Tasks,Priority Support,Ad Management',
  'pricing_popular_cta' => 'Partner With Us',
  'pricing_flex_title' => 'Budget-First',
  'pricing_flex_desc' => 'Tell us what you have to invest and we\'ll architect the best possible solution.',
  'pricing_flex_price' => 'Flexible',
  'pricing_flex_features' => 'Tailored Features,Scalable Roadmap,Budget-First Design',
  'pricing_flex_cta' => 'Share Your Budget',
  'contact_phone' => '+2347066620068',
  'hero_subtitle' => 'From idea to launch;  websites, apps, and digital growth. Let\'s build something great together.',
  'about_subtext' => 'Surprise-MFs Tech was founded to make professional-grade digital solutions accessible to businesses of all sizes. We don\'t just deliver projects, we build partnerships.',
);
        foreach ($settings as $key => $val) {
            Setting::updateOrCreate(['key' => $key], ['value' => $val]);
        }

        // Projects
        $projects = array (
  0 => 
  array (
    'id' => 3,
    'title' => 'Temitope Initiative',
    'slug' => 'temitope-initiative',
    'summary' => 'An engaging, community-focused web platform for the Temitope Societal Sustainability and Development Initiative (TSSDI). Designed to connect donors, volunteers, and partners with ongoing community projects through real-time impact stories and volunteer sign-ups.',
    'detailed_description' => '<p><strong>Project Overview</strong></p><p>The Temitope Societal Sustainability and Development Initiative (TSSDI) website serves as the digital home for Dr. Mrs. Elizabeth Egbetokun\'s NGO. Surprise-MFs Tech designed and built a welcoming, credible platform that communicates the organization\'s community interventions and drives donor and volunteer participation.</p><p><strong>Key Features</strong></p><ul><li><p><strong>Project & Impact Stories:</strong> Dynamic updates showcasing community outreach, education initiatives, and healthcare support in real time.</p></li><li><p><strong>Volunteer & Partner Sign-Ups:</strong> Simple, secure registration forms for individuals and organizations looking to support the mission.</p></li><li><p><strong>Newsletter & Events:</strong> Direct subscription tools to keep the community informed of upcoming outreaches and reports.</p></li><li><p><strong>Clean, Accessible Design:</strong> Warm, trustworthy visual identity that looks great and loads quickly on all devices.</p></li></ul><p><strong>Tech Stack</strong></p><p>Laravel, Tailwind CSS, and Alpine.js.</p>',
    'featured_image' => '/storage/projects/featured/01KNRW5WH1ARSKCVDY47X9JQQW.png',
    'gallery' => 
    array (
      0 => '/storage/projects/gallery/01KNRW5WH5EBY9G4TZ3XYVX0MN.png',
      1 => '/storage/projects/gallery/01KNRW5WH6H3MXFTXJXAZ5AEMD.png',
      2 => '/storage/projects/gallery/01KNRW5WH7DFS5A3A4YRW7TJVF.png',
    ),
    'process' => 
    array (
      0 => 
      array (
        'step' => '01',
        'title' => 'Hero ',
        'description' => 'Beat all expectations ',
      ),
    ),
    'client_name' => 'Temitope Initiative',
    'completion_date' => '2026-03-25T00:00:00.000000Z',
    'created_at' => '2026-04-08T15:03:45.000000Z',
    'updated_at' => '2026-08-27T17:05:43.000000Z',
    'live_url' => 'https://temitopessdi.org/',
  ),
  1 => 
  array (
    'id' => 4,
    'title' => 'Bridge',
    'slug' => 'bridge',
    'summary' => 'A high-performance fintech web application built for seamless cross-border payments and settlements. Built with a responsive React frontend and a fast PHP/MySQL backend, Bridge delivers real-time FX synchronization, automated ledger tracking, and instant capital transfers in a sleek dark interface.',
    'detailed_description' => '<p><strong>Project Overview</strong></p><p>Bridge is a modern financial technology platform created to make international payments and business settlements fast, affordable, and transparent. It eliminates the delays and high fees of traditional cross-border wire transfers by providing smart routing across international currency pools.</p><p><strong>Key Features</strong></p><ul><li><p><strong>Smart Payment Routing:</strong> Automatically finds the lowest-cost and fastest transfer routes for global payments.</p></li><li><p><strong>Live FX Synchronization:</strong> Instant foreign exchange rates updated in real-time for transparent transfers.</p></li><li><p><strong>Client & Admin Portals:</strong> Intuitive dashboard for businesses to track pending payments, complete transfers, and export monthly statements.</p></li><li><p><strong>Automated Transaction Ledger:</strong> Clear, immutable records for accounting, compliance, and regulatory audits.</p></li><li><p><strong>Fast, Modern Interface:</strong> Built with React and fluid micro-animations for an effortless user experience on mobile and desktop.</p></li></ul><p><strong>Tech Stack</strong></p><p>React, Tailwind CSS, PHP REST API, and MySQL.</p>',
    'featured_image' => '/storage/projects/featured/01KP9F4JH4T2PGWQ6JN36BPWAP.png',
    'gallery' => 
    array (
      0 => '/storage/projects/gallery/01KP9F4JH8694CTEZ5KFVV6DEW.png',
      1 => '/storage/projects/gallery/01KP9F4JH951TDPGDGD42519VM.png',
      2 => '/storage/projects/gallery/01KP9F4JHBS9ZN86G3BBTDAKFJ.png',
    ),
    'process' => NULL,
    'client_name' => 'Surprise-MFs Tech',
    'completion_date' => '2026-04-10T00:00:00.000000Z',
    'created_at' => '2026-08-27T16:42:13.000000Z',
    'updated_at' => '2026-08-27T17:05:43.000000Z',
    'live_url' => 'https://bridge.surprisemfstech.com/',
  ),
  2 => 
  array (
    'id' => 5,
    'title' => 'Surprise Legal',
    'slug' => 'surprise-legal',
    'summary' => 'A modern, high-end web experience designed for corporate legal advisories and law firms. Built with React and fluid scroll animations, the platform delivers clear case overviews, partner profiles, and consultation booking with a sharp, professional dark aesthetic.',
    'detailed_description' => '<p><strong>Project Overview</strong></p><p>Surprise Legal was created to give law firms and corporate legal advisories a digital presence that reflects authority, prestige, and trust. Instead of dense, outdated legal layouts, the site uses clean typography, thoughtful whitespace, and smooth interactions to clearly showcase legal expertise and practice areas.</p><p><strong>Key Features</strong></p><ul><li><p><strong>Practice Area Overviews:</strong> Clear breakdowns of corporate, litigation, and regulatory compliance services.</p></li><li><p><strong>Partner & Team Profiles:</strong> Individual profiles highlighting attorney credentials, publications, and notable cases.</p></li><li><p><strong>Direct Consultation Booking:</strong> Streamlined scheduling for prospective clients to book confidential consultations.</p></li><li><p><strong>Mobile-First Design:</strong> Fully responsive navigation and fluid scroll animations optimized for speed on any device.</p></li></ul><p><strong>Tech Stack</strong></p><p>React, Framer Motion, and Tailwind CSS.</p>',
    'featured_image' => '/storage/projects/featured/01KNV9WKRSXGDV2SA4TEVXPEY2.png',
    'gallery' => 
    array (
      0 => '/storage/projects/gallery/01KNV9WKS0EER1PTDFF50Q35GA.png',
      1 => '/storage/projects/gallery/01KNV9WKS27TA97MNZDXNFWCA8.png',
    ),
    'process' => NULL,
    'client_name' => 'Surprise-MFs Tech',
    'completion_date' => '2026-02-12T00:00:00.000000Z',
    'created_at' => '2026-08-27T16:42:13.000000Z',
    'updated_at' => '2026-08-27T17:05:43.000000Z',
    'live_url' => 'https://surpriselegal.surprisemfstech.com/',
  ),
  3 => 
  array (
    'id' => 6,
    'title' => 'VogueCut',
    'slug' => 'voguecut',
    'summary' => 'A stylish digital storefront and booking website for VogueCut, a luxury unisex salon and styling academy in Abuja. The platform features instant online appointment booking, detailed service and stylist menus, and a training academy enrollment portal.',
    'detailed_description' => '<p><strong>Project Overview</strong></p><p>VogueCut is a premier unisex salon, spa, and beauty academy located in Abuja. Surprise-MFs Tech built an all-in-one digital platform that allows clients to book appointments, explore salon services, and apply for hands-on styling courses online.</p><p><strong>Key Features</strong></p><ul><li><p><strong>Online Appointment Booking:</strong> Clients can choose their favorite stylist, select services, and pick convenient appointment slots directly from their phones.</p></li><li><p><strong>Full Service & Price Catalog:</strong> Comprehensive menu covering precision haircuts, luxury spa treatments, braids, and grooming packages.</p></li><li><p><strong>Styling Academy Portal:</strong> Course descriptions, training schedules, and easy registration forms for aspiring stylists.</p></li><li><p><strong>Visual Portfolio:</strong> High-resolution photo gallery showcasing the salon interior and client transformations.</p></li></ul><p><strong>Tech Stack</strong></p><p>React, PHP, Tailwind CSS, and Mobile Booking Engine.</p>',
    'featured_image' => '/storage/projects/featured/01KNRWQZM0WBJ7MH4N6ZP7ZTNM.png',
    'gallery' => 
    array (
    ),
    'process' => NULL,
    'client_name' => 'VogueCut',
    'completion_date' => '2026-04-02T00:00:00.000000Z',
    'created_at' => '2026-08-27T16:42:13.000000Z',
    'updated_at' => '2026-08-27T17:05:43.000000Z',
    'live_url' => 'https://voguecut.com/',
  ),
);
        foreach ($projects as $p) {
            unset($p['id'], $p['created_at'], $p['updated_at']);
            Project::updateOrCreate(['slug' => $p['slug']], $p);
        }

        // Team Members
        $team = array (
  0 => 
  array (
    'id' => 1,
    'name' => 'Olie Kings',
    'role' => 'Lead Developer',
    'bio' => 'Full-stack developer and technical lead passionate about crafting fast, beautiful web applications. With deep expertise across Laravel, React, and modern cloud databases, I turn complex business requirements into sleek, reliable digital products that are easy for users and built to scale.',
    'avatar_path' => '/storage/team-avatars/01KP921VP0MXCGQ3N61N0AB1HR.jpg',
    'social_links' => 
    array (
      0 => 
      array (
        'platform' => 'Instagram',
        'url' => 'https://www.instagram.com/onlyoneolie',
      ),
    ),
    'created_at' => '2026-04-08T15:13:12.000000Z',
    'updated_at' => '2026-08-27T17:05:43.000000Z',
  ),
  1 => 
  array (
    'id' => 2,
    'name' => 'YARO BITRUS ELISHA',
    'role' => 'Digital Marketing & Systems Specialist',
    'bio' => 'Digital marketing strategist and systems specialist focused on growing businesses through targeted online advertising. I create high-converting ad campaigns across Google, Meta, and TikTok, combining clear data analytics with creative messaging to turn online visibility into paying customers.',
    'avatar_path' => '/storage/team-avatars/01KPZP10AAPRBW9QVKH7P6900Y.jpeg',
    'social_links' => 
    array (
    ),
    'created_at' => '2026-08-27T16:42:13.000000Z',
    'updated_at' => '2026-08-27T17:05:43.000000Z',
  ),
);
        foreach ($team as $t) {
            unset($t['id'], $t['created_at'], $t['updated_at']);
            TeamMember::updateOrCreate(['name' => $t['name']], $t);
        }

        // Services
        $services = array (
  0 => 
  array (
    'id' => 1,
    'title' => 'UI/UX Design',
    'slug' => 'ui-ux-design',
    'description' => 'Visual systems and user interfaces built for emotional connection and conversion.',
    'icon' => NULL,
    'created_at' => '2026-04-07T22:35:59.000000Z',
    'updated_at' => '2026-04-07T22:35:59.000000Z',
  ),
  1 => 
  array (
    'id' => 2,
    'title' => 'Custom Web Apps',
    'slug' => 'custom-web-apps',
    'description' => 'Complex business logic transformed into high-performance, scalable web applications.',
    'icon' => NULL,
    'created_at' => '2026-04-07T22:35:59.000000Z',
    'updated_at' => '2026-04-07T22:35:59.000000Z',
  ),
  2 => 
  array (
    'id' => 3,
    'title' => 'E-Commerce',
    'slug' => 'e-commerce',
    'description' => 'Secure, lightning-fast shopping experiences that turn visitors into loyal customers.',
    'icon' => NULL,
    'created_at' => '2026-04-07T22:35:59.000000Z',
    'updated_at' => '2026-04-07T22:35:59.000000Z',
  ),
  3 => 
  array (
    'id' => 4,
    'title' => 'Motion & Animations',
    'slug' => 'animations',
    'description' => 'Subtle, purposeful motion that guides user attention and brings your brand to life.',
    'icon' => NULL,
    'created_at' => '2026-04-07T22:35:59.000000Z',
    'updated_at' => '2026-04-07T22:35:59.000000Z',
  ),
  4 => 
  array (
    'id' => 5,
    'title' => 'Mobile Apps',
    'slug' => 'mobile-apps',
    'description' => 'Native and cross-platform apps for iOS and Android that your users will love.',
    'icon' => NULL,
    'created_at' => '2026-08-27T16:16:58.000000Z',
    'updated_at' => '2026-08-27T16:16:58.000000Z',
  ),
  5 => 
  array (
    'id' => 6,
    'title' => 'Digital Advertising',
    'slug' => 'digital-advertising',
    'description' => 'Google Ads, Meta, and TikTok campaigns that turn clicks into customers.',
    'icon' => NULL,
    'created_at' => '2026-08-27T16:16:58.000000Z',
    'updated_at' => '2026-08-27T16:16:58.000000Z',
  ),
  6 => 
  array (
    'id' => 7,
    'title' => 'Brand Strategy',
    'slug' => 'brand-strategy',
    'description' => 'Logo design, brand guidelines, and visual identity that sets you apart.',
    'icon' => NULL,
    'created_at' => '2026-08-27T16:16:58.000000Z',
    'updated_at' => '2026-08-27T16:16:58.000000Z',
  ),
  7 => 
  array (
    'id' => 8,
    'title' => 'SEO & Growth',
    'slug' => 'seo-growth',
    'description' => 'Search engine optimization and growth strategies to get you found online.',
    'icon' => NULL,
    'created_at' => '2026-08-27T16:16:58.000000Z',
    'updated_at' => '2026-08-27T16:16:58.000000Z',
  ),
);
        foreach ($services as $s) {
            unset($s['id'], $s['created_at'], $s['updated_at']);
            Service::updateOrCreate(['slug' => $s['slug']], $s);
        }
    }
}
