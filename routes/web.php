<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminInquiryController;
use App\Http\Controllers\Admin\AdminProjectController;
use App\Http\Controllers\Admin\AdminServiceController;
use App\Http\Controllers\Admin\AdminTeamController;
use App\Http\Controllers\Admin\AdminSettingController;

Route::post('/inquiry', [InquiryController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('inquiry.store');

Route::get('/', function () {
    $projects = \Illuminate\Support\Facades\Cache::remember('site_featured_projects', 86400, function () {
        try {
            return \App\Models\Project::latest()->take(6)->get();
        } catch (\Throwable $e) {
            return [];
        }
    });

    $team = \Illuminate\Support\Facades\Cache::remember('site_team_members', 86400, function () {
        try {
            return \App\Models\TeamMember::all();
        } catch (\Throwable $e) {
            return [];
        }
    });

    return Inertia::render('Welcome', [
        'projects' => $projects,
        'team' => $team,
    ]);
})->name('home');

Route::get('/team', function () {
    $team = \Illuminate\Support\Facades\Cache::remember('site_team_members', 86400, function () {
        try {
            return \App\Models\TeamMember::all();
        } catch (\Throwable $e) {
            return [];
        }
    });

    return Inertia::render('Team/Index', [
        'team' => $team,
    ]);
})->name('team');

Route::get('/projects', function () {
    $projects = \Illuminate\Support\Facades\Cache::remember('site_all_projects', 86400, function () {
        try {
            return \App\Models\Project::latest()->get();
        } catch (\Throwable $e) {
            return [];
        }
    });

    return Inertia::render('Projects/Index', [
        'projects' => $projects,
    ]);
})->name('portfolio.index');

Route::get('/project/{slug}', function ($slug) {
    if (!\Illuminate\Support\Facades\Schema::hasTable('projects')) {
        return redirect()->route('home');
    }
    
    // Safety check for relationships
    $hasTeam = \Illuminate\Support\Facades\Schema::hasTable('team_members');
    $hasPivot = \Illuminate\Support\Facades\Schema::hasTable('project_team_member');
    
    $query = \App\Models\Project::where('slug', $slug);
    
    if ($hasTeam && $hasPivot) {
        $query->with(['teamMembers.skills']);
    }
    
    $project = $query->firstOrFail();

    $prevProject = \App\Models\Project::where('id', '<', $project->id)->orderBy('id', 'desc')->select('title', 'slug', 'client_name')->first();
    $nextProject = \App\Models\Project::where('id', '>', $project->id)->orderBy('id', 'asc')->select('title', 'slug', 'client_name')->first();
    
    if (!$prevProject) {
        $prevProject = \App\Models\Project::where('id', '!=', $project->id)->orderBy('id', 'desc')->select('title', 'slug', 'client_name')->first();
    }
    if (!$nextProject) {
        $nextProject = \App\Models\Project::where('id', '!=', $project->id)->orderBy('id', 'asc')->select('title', 'slug', 'client_name')->first();
    }
    
    return Inertia::render('ProjectDetails', [
        'slug' => $slug,
        'projectData' => $project,
        'prevProject' => $prevProject,
        'nextProject' => $nextProject,
    ]);
})->name('portfolio.show');

Route::get('/service/{slug}', function ($slug) {
    $service = null;
    try {
        $service = \App\Models\Service::where('slug', $slug)->first();
    } catch (\Throwable $e) {
        $service = null;
    }

    if (!$service) {
        $defaults = [
            'mobile-apps' => ['title' => 'Mobile Apps', 'description' => 'Native and cross-platform apps for iOS and Android that your users will love.'],
            'digital-advertising' => ['title' => 'Digital Advertising', 'description' => 'Google Ads, Meta, and TikTok campaigns that turn clicks into customers.'],
            'brand-strategy' => ['title' => 'Brand Strategy', 'description' => 'Logo design, brand guidelines, and visual identity that sets you apart.'],
            'seo-growth' => ['title' => 'SEO & Growth', 'description' => 'Search engine optimization and growth strategies to get you found online.'],
            'ui-ux-design' => ['title' => 'UI/UX Design', 'description' => 'Visual systems and user interfaces built for emotional connection and conversion.'],
            'custom-web-apps' => ['title' => 'Custom Web Apps', 'description' => 'Complex business logic transformed into high-performance, scalable web applications.'],
            'e-commerce' => ['title' => 'E-Commerce', 'description' => 'Secure, lightning-fast shopping experiences that turn visitors into loyal customers.'],
            'animations' => ['title' => 'Motion & Animations', 'description' => 'Subtle, purposeful motion that guides user attention and brings your brand to life.'],
        ];

        $item = $defaults[$slug] ?? [
            'title' => ucwords(str_replace('-', ' ', $slug)),
            'description' => 'Professional digital service crafted with care, high performance, and human touch.',
        ];

        $service = (object)[
            'id' => 0,
            'slug' => $slug,
            'title' => $item['title'],
            'description' => $item['description'],
        ];
    }

    return Inertia::render('Services/ServiceDetails', ['slug' => $slug, 'serviceData' => $service]);
})->name('services.show');

Route::get('/sitemap.xml', function () {
    $baseUrl = 'https://surprisemfstech.com';
    $now = now()->toAtomString();

    $staticRoutes = [
        ['loc' => $baseUrl . '/', 'priority' => '1.0', 'changefreq' => 'weekly'],
        ['loc' => $baseUrl . '/projects', 'priority' => '0.9', 'changefreq' => 'weekly'],
        ['loc' => $baseUrl . '/team', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ];

    $serviceSlugs = [
        'ui-ux-design',
        'custom-web-apps',
        'mobile-apps',
        'digital-advertising',
        'brand-strategy',
        'seo-growth',
        'e-commerce',
        'animations',
    ];

    $services = [];
    foreach ($serviceSlugs as $slug) {
        $services[] = [
            'loc' => $baseUrl . '/service/' . $slug,
            'priority' => '0.85',
            'changefreq' => 'monthly',
        ];
    }

    $projects = [];
    try {
        $dbProjects = \App\Models\Project::select('slug', 'updated_at')->get();
        foreach ($dbProjects as $p) {
            $projects[] = [
                'loc' => $baseUrl . '/project/' . $p->slug,
                'priority' => '0.8',
                'changefreq' => 'monthly',
                'lastmod' => $p->updated_at ? $p->updated_at->toAtomString() : $now,
            ];
        }
    } catch (\Throwable $e) {
        // Fallback gracefully
    }

    $allUrls = array_merge($staticRoutes, $services, $projects);

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

    foreach ($allUrls as $u) {
        $xml .= "  <url>\n";
        $xml .= "    <loc>" . htmlspecialchars($u['loc']) . "</loc>\n";
        $xml .= "    <lastmod>" . ($u['lastmod'] ?? $now) . "</lastmod>\n";
        $xml .= "    <changefreq>" . ($u['changefreq'] ?? 'weekly') . "</changefreq>\n";
        $xml .= "    <priority>" . ($u['priority'] ?? '0.5') . "</priority>\n";
        $xml .= "  </url>\n";
    }

    $xml .= '</urlset>';

    return response($xml, 200)->header('Content-Type', 'application/xml');
})->name('sitemap');

Route::redirect('/admin/login', '/login');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('index');
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::resource('inquiries', AdminInquiryController::class)->only(['index', 'update', 'destroy']);
    Route::resource('projects', AdminProjectController::class);
    Route::resource('services', AdminServiceController::class)->only(['index', 'edit', 'update']);
    Route::resource('team', AdminTeamController::class);
    Route::get('/settings', [AdminSettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [AdminSettingController::class, 'update'])->name('settings.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

