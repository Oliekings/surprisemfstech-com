<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AdminTeamController extends Controller
{
    public function index()
    {
        $team = TeamMember::latest()->get();
        return view('admin.team.index', compact('team'));
    }

    public function create()
    {
        return view('admin.team.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'avatar_file' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:5120',
            'avatar_url' => 'nullable|string|max:500',
            'instagram_url' => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'twitter_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'website_url' => 'nullable|url|max:255',
        ]);

        if ($request->hasFile('avatar_file')) {
            $path = $request->file('avatar_file')->store('team-avatars', 'public');
            $validated['avatar_path'] = 'team-avatars/' . $path;
        } elseif (!empty($validated['avatar_url'])) {
            $validated['avatar_path'] = $validated['avatar_url'];
        }

        $socialLinks = [];
        if (!empty($validated['instagram_url'])) {
            $socialLinks[] = ['platform' => 'Instagram', 'url' => $validated['instagram_url']];
        }
        if (!empty($validated['linkedin_url'])) {
            $socialLinks[] = ['platform' => 'LinkedIn', 'url' => $validated['linkedin_url']];
        }
        if (!empty($validated['twitter_url'])) {
            $socialLinks[] = ['platform' => 'X', 'url' => $validated['twitter_url']];
        }
        if (!empty($validated['github_url'])) {
            $socialLinks[] = ['platform' => 'GitHub', 'url' => $validated['github_url']];
        }
        if (!empty($validated['website_url'])) {
            $socialLinks[] = ['platform' => 'Website', 'url' => $validated['website_url']];
        }

        $validated['social_links'] = $socialLinks;

        unset(
            $validated['avatar_file'],
            $validated['avatar_url'],
            $validated['instagram_url'],
            $validated['linkedin_url'],
            $validated['twitter_url'],
            $validated['github_url'],
            $validated['website_url']
        );

        TeamMember::create($validated);

        Cache::flush();

        return redirect()->route('admin.team.index')->with('success', 'Team member added successfully.');
    }

    public function edit(TeamMember $team)
    {
        $member = $team;
        return view('admin.team.edit', compact('member'));
    }

    public function update(Request $request, TeamMember $team)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'avatar_file' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:5120',
            'avatar_url' => 'nullable|string|max:500',
            'instagram_url' => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'twitter_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'website_url' => 'nullable|url|max:255',
        ]);

        if ($request->hasFile('avatar_file')) {
            $path = $request->file('avatar_file')->store('team-avatars', 'public');
            $validated['avatar_path'] = 'team-avatars/' . $path;
        } elseif (!empty($validated['avatar_url'])) {
            $validated['avatar_path'] = $validated['avatar_url'];
        }

        $socialLinks = [];
        if (!empty($validated['instagram_url'])) {
            $socialLinks[] = ['platform' => 'Instagram', 'url' => $validated['instagram_url']];
        }
        if (!empty($validated['linkedin_url'])) {
            $socialLinks[] = ['platform' => 'LinkedIn', 'url' => $validated['linkedin_url']];
        }
        if (!empty($validated['twitter_url'])) {
            $socialLinks[] = ['platform' => 'X', 'url' => $validated['twitter_url']];
        }
        if (!empty($validated['github_url'])) {
            $socialLinks[] = ['platform' => 'GitHub', 'url' => $validated['github_url']];
        }
        if (!empty($validated['website_url'])) {
            $socialLinks[] = ['platform' => 'Website', 'url' => $validated['website_url']];
        }

        $validated['social_links'] = $socialLinks;

        unset(
            $validated['avatar_file'],
            $validated['avatar_url'],
            $validated['instagram_url'],
            $validated['linkedin_url'],
            $validated['twitter_url'],
            $validated['github_url'],
            $validated['website_url']
        );

        $team->update($validated);

        Cache::flush();

        return redirect()->route('admin.team.index')->with('success', 'Team member updated successfully.');
    }

    public function destroy(TeamMember $team)
    {
        $team->delete();

        Cache::flush();

        return back()->with('success', 'Team member removed successfully.');
    }
}
