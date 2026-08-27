<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InquiryController extends Controller
{
    /**
     * Store a newly created inquiry in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'budget' => ['nullable', 'string', 'max:100'],
            'details' => ['required', 'string', 'max:10000'],
        ]);

        $inquiry = Inquiry::create([
            'name' => trim($validated['name']),
            'email' => strtolower(trim($validated['email'])),
            'budget' => !empty($validated['budget']) ? trim($validated['budget']) : 'Flexible Scope',
            'details' => trim($validated['details']),
            'status' => 'new',
        ]);

        return back()->with('success', 'Thank you! Your message has been received.');
    }

    /**
     * Display a listing of inquiries for admins.
     */
    public function index()
    {
        $inquiries = Inquiry::latest()->get();
        return Inertia::render('Admin/Inquiries/Index', [
            'inquiries' => $inquiries
        ]);
    }
    
    /**
     * Update the status of an inquiry.
     */
    public function update(Request $request, Inquiry $inquiry)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,read,archived',
        ]);

        $inquiry->update($validated);

        return back();
    }

    /**
     * Remove the specified inquiry from storage.
     */
    public function destroy(Inquiry $inquiry)
    {
        $inquiry->delete();

        return back();
    }
}
