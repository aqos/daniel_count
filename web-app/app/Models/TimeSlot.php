<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    protected $fillable = ['time_slot', 'start'];

    public function counts()
    {
        return $this->hasMany(Count::class);
    }
}
