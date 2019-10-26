<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Weather extends Model
{
    protected $fillable = ['name'];

    public function counts()
    {
        return $this->hasMany(Count::class);
    }
}
