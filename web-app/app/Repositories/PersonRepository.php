<?php

namespace App\Repositories;
use App\Models\Person;

class PersonRepository extends ResourceRepository {

    public function __construct(Person $person)
    {
        $this->model = $person;
    }
}
