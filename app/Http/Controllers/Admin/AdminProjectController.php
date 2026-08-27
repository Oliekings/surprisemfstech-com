<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class AdminProjectController extends Controller
{
    public function index()
    {
        $projects = Project::latest()->paginate(15);
        return view('admin.projects.index', compact('projects'));
    }

    public function create()
    {
        $teamMembers = TeamMember::all();
        return view('admin.projects.create', compact('teamMembers'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:projects,slug',
            'client_name' => 'nullable|string|max:255',
            'summary' => 'required|string|max:500',
            'detailed_description' => 'nullable|string',
            'live_url' => 'nullable|url|max:255',
            'completion_date' => 'nullable|date',
            'featured_image_file' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:5120',
            'featured_image_url' => 'nullable|string|max:500',
            'gallery_urls' => 'nullable|string',
            'gallery_files.*' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:5120',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
            $count = Project::where('slug', 'like', $validated['slug'] . '%')->count();
            if ($count > 0) {
                $validated['slug'] .= '-' . ($count + 1);
            }
        }

        if ($request->hasFile('featured_image_file')) {
            $path = $request->file('featured_image_file')->store('projects/featured', 'public');
            $validated['featured_image'] = 'projects/featured/' . $path;
        } elseif (!empty($validated['featured_image_url'])) {
            $validated['featured_image'] = $validated['featured_image_url'];
        }

        $gallery = [];
        if (!empty($validated['gallery_urls'])) {
            $urls = array_filter(array_map('trim', explode("\n", $validated['gallery_urls'])));
            $gallery = array_values($urls);
        }
        if ($request->hasFile('gallery_files')) {
            foreach ($request->file('gallery_files') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $gallery[] = 'projects/gallery/' . $path;
            }
        }
        if (!empty($gallery)) {
            $validated['gallery'] = $gallery;
        }

        unset(
            $validated['featured_image_file'],
            $validated['featured_image_url'],
            $validated['gallery_urls'],
            $validated['gallery_files']
        );

        $project = Project::create($validated);

        if ($request->has('team_members')) {
            $project->teamMembers()->sync($request->input('team_members', []));
        }

        Cache::flush();

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        $teamMembers = TeamMember::all();
        return view('admin.projects.edit', compact('project', 'teamMembers'));
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,' . $project->id,
            'client_name' => 'nullable|string|max:255',
            'summary' => 'required|string|max:500',
            'detailed_description' => 'nullable|string',
            'live_url' => 'nullable|url|max:255',
            'completion_date' => 'nullable|date',
            'featured_image_file' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:5120',
            'featured_image_url' => 'nullable|string|max:500',
            'gallery_urls' => 'nullable|string',
            'gallery_files.*' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:5120',
        ]);

        if ($request->hasFile('featured_image_file')) {
            $path = $request->file('featured_image_file')->store('projects/featured', 'public');
            $validated['featured_image'] = 'projects/featured/' . $path;
        } elseif (!empty($validated['featured_image_url'])) {
            $validated['featured_image'] = $validated['featured_image_url'];
        }

        $gallery = is_array($project->gallery) ? $project->gallery : [];
        if (isset($validated['gallery_urls'])) {
            $urls = array_filter(array_map('trim', explode("\n", $validated['gallery_urls'])));
            $gallery = array_values($urls);
        }
        if ($request->hasFile('gallery_files')) {
            foreach ($request->file('gallery_files') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $gallery[] = 'projects/gallery/' . $path;
            }
        }
        $validated['gallery'] = $gallery;

        unset(
            $validated['featured_image_file'],
            $validated['featured_image_url'],
            $validated['gallery_urls'],
            $validated['gallery_files']
        );

        $project->update($validated);

        if ($request->has('team_members')) {
            $project->teamMembers()->sync($request->input('team_members', []));
        }

        Cache::flush();

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->teamMembers()->detach();
        $project->delete();

        Cache::flush();

        return back()->with('success', 'Project deleted successfully.');
    }
}
