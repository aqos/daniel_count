<?php

namespace App\Repositories;

use App\Models\Count;
use Carbon\Carbon;

class CountRepository extends ResourceRepository
{

    public function __construct(Count $count)
    {
        $this->model = $count;
    }

    public function store(array $inputs)
    {
        $success = [];
        foreach ($inputs as $input) {
            $this->model->create($input);
        }
        return count($success) == count($inputs) ? 'Success' : 'Failure';
    }

    public function groupByDay($day=null)
    {
        return $this->model->get()->groupBy(function ($count)
        {
            return Carbon::parse($count->created_at)->format('Y-m-d');
        });
    }

}
