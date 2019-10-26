<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $fillable = ['first_name', 'last_name', 'birth_date', 'birth_place', 'phone', 'piece_number', 'user_id', ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
