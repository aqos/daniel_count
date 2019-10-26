<?php

namespace App\Repositories;
use App\Models\CarCategory;

class CarCategoryRepository extends ResourceRepository {

    public function __construct(CarCategory $carCategory)
    {
        $this->model = $carCategory;
    }
}
