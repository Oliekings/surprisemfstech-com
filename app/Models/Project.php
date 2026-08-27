<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'summary',
        'detailed_description',
        'featured_image',
        'live_url',
        'gallery',
        'process',
        'client_name',
        'completion_date',
    ];

    protected $casts = [
        'gallery' => 'array',
        'process' => 'array',
        'completion_date' => 'date',
    ];

    /**
     * Get the featured image URL.
     */
    protected function featuredImage(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: fn ($value) => $value && !str_starts_with($value, 'http') && !str_starts_with($value, '/storage/') ? '/storage/' . ltrim($value, '/') : $value,
        );
    }

    /**
     * Get the gallery URLs.
     */
    protected function gallery(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: function ($value) {
                $images = json_decode($value, true) ?: [];
                return array_map(function ($image) {
                    return $image && !str_starts_with($image, 'http') ? '/storage/' . $image : $image;
                }, $images);
            },
        );
    }

    public function teamMembers()
    {
        return $this->belongsToMany(TeamMember::class);
    }

    protected static function booted()
    {
        static::saved(function () {
            \Illuminate\Support\Facades\Cache::forget('site_featured_projects');
            \Illuminate\Support\Facades\Cache::forget('site_all_projects');
        });
        static::deleted(function () {
            \Illuminate\Support\Facades\Cache::forget('site_featured_projects');
            \Illuminate\Support\Facades\Cache::forget('site_all_projects');
        });
    }
}
