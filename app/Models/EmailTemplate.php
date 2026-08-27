<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailTemplate extends Model
{
    protected $fillable = [
        'name', 'identifier', 'subject', 'content', 'variables'
    ];

    protected $casts = [
        'variables' => 'array',
    ];
}
