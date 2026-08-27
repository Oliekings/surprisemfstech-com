<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\TeamMember;
use App\Models\Setting;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'featuredProjects' => Project::with('teamMembers')->latest()->take(3)->get(),
            'settings' => Setting::all()->pluck('value', 'key'),
        ]);
    }

    public function project(Project $project)
    {
        $project->load('teamMembers.skills');
        return Inertia::render('Project/Show', [
            'project' => $project,
        ]);
    }

    public function team()
    {
        return Inertia::render('Team/Index', [
            'team' => TeamMember::with(['skills', 'projects'])->get(),
        ]);
    }
}
