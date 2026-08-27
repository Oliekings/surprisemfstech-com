<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AdminSettingController extends Controller
{
    public function index()
    {
        $settings = Setting::pluck('value', 'key')->toArray();
        return view('admin.settings.index', compact('settings'));
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'contact_phone' => 'nullable|string|max:50',
            'hero_text' => 'nullable|string|max:500',
            'hero_subtitle' => 'nullable|string|max:1000',
            'about_text' => 'nullable|string|max:1000',
            'about_subtext' => 'nullable|string|max:1000',
            'social_instagram' => 'nullable|url|max:255',
            'social_twitter' => 'nullable|url|max:255',
            'social_linkedin' => 'nullable|url|max:255',
            'social_github' => 'nullable|url|max:255',
            'pricing_standard_title' => 'nullable|string|max:255',
            'pricing_standard_desc' => 'nullable|string|max:1000',
            'pricing_standard_cta' => 'nullable|string|max:255',
            'pricing_popular_title' => 'nullable|string|max:255',
            'pricing_popular_desc' => 'nullable|string|max:1000',
            'pricing_popular_cta' => 'nullable|string|max:255',
            'pricing_flex_title' => 'nullable|string|max:255',
            'pricing_flex_desc' => 'nullable|string|max:1000',
            'pricing_flex_cta' => 'nullable|string|max:255',
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value ?? '']);
        }

        Cache::flush();

        return back()->with('success', 'Studio and homepage settings updated successfully.');
    }
}
