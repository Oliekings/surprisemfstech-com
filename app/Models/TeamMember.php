<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name',
        'role',
        'bio',
        'avatar_path',
        'social_links',
    ];

    protected $casts = [
        'social_links' => 'array',
    ];

    /**
     * Get the avatar URL.
     */
    protected function avatarPath(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: fn ($value) => $value && !str_starts_with($value, 'http') && !str_starts_with($value, '/storage/') ? '/storage/' . ltrim($value, '/') : $value,
        );
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class);
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }

    protected static function booted()
    {
        static::saved(fn () => \Illuminate\Support\Facades\Cache::forget('site_team_members'));
        static::deleted(fn () => \Illuminate\Support\Facades\Cache::forget('site_team_members'));
    }
}
