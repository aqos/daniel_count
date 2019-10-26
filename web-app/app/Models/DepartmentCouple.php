<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentCouple extends Model
{
    protected $fillable = ['name'];

    public function roads()
    {
        return $this->hasMany(Road::class);
    }
}
