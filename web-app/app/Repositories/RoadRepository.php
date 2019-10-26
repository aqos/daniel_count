<?php

namespace App\Repositories;
use App\Models\Road;

class RoadRepository extends ResourceRepository {

    public function __construct(Road $road)
    {
        $this->model = $road;
    }

    public function getAll()
    {
        return $this->model->with('department_couple', 'road_type')->get();
    }

    public function getById($id)
    {
        return $this->model->where('id', $id)->with('department_couple', 'road_type')->first();
    }

    public function getByDepartmentCoupleId($id)
    {
        return $this->model->where('department_couple_id', $id)->with('department_couple', 'road_type')->get();
    }
}
