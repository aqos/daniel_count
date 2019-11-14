<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Count extends Model
{
    protected $casts = [
        'counts' => 'array'
    ];

    protected $fillable = ['user_id', 'road_id', 'weather_id', 'car_category_id', 'time_slot_id', 'counts',];

    public function car_category()
    {
        return $this->belongsTo(CarCategory::class);
    }

    public function weather()
    {
        return $this->belongsTo(Weather::class);
    }

    public function road()
    {
        return $this->belongsTo(Road::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function time_slot()
    {
        return $this->belongsTo(TimeSlot::class);
    }

    /**
     * Get the user's first name.
     *
     * @param  string  $value
     * @return string
     */
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }
}
