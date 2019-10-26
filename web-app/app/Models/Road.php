<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Road extends Model
{
    protected $fillable = ['name', 'section_code', 'origin', 'destination', 'range', 'road_type_id', 'department_couple_id',];

    public function counts()
    {
        return $this->hasMany(Count::class);
    }

    public function department_couple()
    {
        return $this->belongsTo(DepartmentCouple::class);
    }
    
    public function road_type()
    {
        return $this->belongsTo(RoadType::class);
    }
}
