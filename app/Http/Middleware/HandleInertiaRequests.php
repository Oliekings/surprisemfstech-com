<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'settings' => fn () => \Illuminate\Support\Facades\Cache::remember('site_settings', 86400, function () {
                try {
                    return \App\Models\Setting::pluck('value', 'key')->toArray();
                } catch (\Throwable $e) {
                    return [];
                }
            }),
            'services' => fn () => \Illuminate\Support\Facades\Cache::remember('site_services', 86400, function () {
                try {
                    return \App\Models\Service::all();
                } catch (\Throwable $e) {
                    return [];
                }
            }),
            'ziggy' => fn () => [
                ...(new \Tighten\Ziggy\Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
