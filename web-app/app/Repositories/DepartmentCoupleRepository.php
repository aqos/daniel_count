<?php

namespace App\Repositories;

use App\Models\DepartmentCouple;

class DepartmentCoupleRepository extends ResourceRepository
{

    public function __construct(DepartmentCouple $departmentCouple)
    {
        $this->model = $departmentCouple;
    }
}
