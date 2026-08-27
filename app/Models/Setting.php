<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'key',
        'value',
    ];

    protected static function booted()
    {
        static::saved(fn () => \Illuminate\Support\Facades\Cache::forget('site_settings'));
        static::deleted(fn () => \Illuminate\Support\Facades\Cache::forget('site_settings'));
    }
}
