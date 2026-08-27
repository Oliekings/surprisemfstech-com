<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'icon',
    ];

    protected static function booted()
    {
        static::saved(fn () => \Illuminate\Support\Facades\Cache::forget('site_services'));
        static::deleted(fn () => \Illuminate\Support\Facades\Cache::forget('site_services'));
    }
}
