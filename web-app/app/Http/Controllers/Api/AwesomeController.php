<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\DepartmentCoupleRepository;
use App\Repositories\TimeSlotRepository;
use App\Repositories\WeatherRepository;
use Illuminate\Http\Request;

class AwesomeController extends Controller
{
    protected $weatherRepository, $timeSlotRepository, $departmentCoupleRepository;

    public function __construct(
        WeatherRepository $weatherRepository,
        DepartmentCoupleRepository $departmentCoupleRepository,
        TimeSlotRepository $timeSlotRepository
    ) {
        $this->timeSlotRepository = $timeSlotRepository;
        $this->weatherRepository = $weatherRepository;
        $this->departmentCoupleRepository = $departmentCoupleRepository;
    }

    public function getAllTimeSlotWeatherAndDepartmentCouple()
    {
        return response()->json([
            'status' => 'SUCCESS',
            'time_slots' => $this->timeSlotRepository->getAll(),
            'department_couples' => $this->departmentCoupleRepository->getAll(),
            'weathers' => $this->weatherRepository->getAll(),
        ]);
    }
}
