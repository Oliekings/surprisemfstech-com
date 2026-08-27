<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'site_name', 'contact_email', 'contact_phone', 
        'address', 'social_links'
    ];

    protected $casts = [
        'social_links' => 'array',
    ];
}
