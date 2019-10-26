<?php

namespace App\Repositories;

use App\Models\TimeSlot;

class TimeSlotRepository extends ResourceRepository
{

    public function __construct(TimeSlot $timeSlot)
    {
        $this->model = $timeSlot;
    }
}
