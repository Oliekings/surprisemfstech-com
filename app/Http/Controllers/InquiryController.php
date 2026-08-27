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
        // Honeypot spam trap check
        if (!empty($request->input('hp_address'))) {
            // Silently pretend success to fool bots
            return back()->with('success', 'Inquiry received.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => ['required', 'string', 'email:rfc,filter', 'max:255'],
            'budget' => ['nullable', 'string', 'max:100'],
            'details' => ['required', 'string', 'min:10', 'max:5000'],
        ]);

        Inquiry::create([
            'name' => trim($validated['name']),
            'email' => strtolower(trim($validated['email'])),
            'budget' => $validated['budget'] ?? 'Flexible',
            'details' => trim($validated['details']),
            'status' => 'new',
        ]);

        return back()->with('success', 'Thank you! Your message has been received. We will be in touch shortly.');
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
