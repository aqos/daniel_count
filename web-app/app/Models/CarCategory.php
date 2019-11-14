<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarCategory extends Model
{
    protected $fillable = ['name', 'avatar', 'avatar_xs'];

    public function counts()
    {
        return $this->hasMany(Count::class);
    }
}
