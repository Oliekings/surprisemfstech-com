<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\Project;
use App\Models\Service;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_projects' => Project::count(),
            'total_inquiries' => Inquiry::count(),
            'new_inquiries' => Inquiry::where('status', 'new')->count(),
            'total_services' => Service::count(),
            'total_team' => TeamMember::count(),
        ];

        $recentInquiries = Inquiry::latest()->take(5)->get();
        $recentProjects = Project::latest()->take(4)->get();

        return view('admin.dashboard', compact('stats', 'recentInquiries', 'recentProjects'));
    }
}
