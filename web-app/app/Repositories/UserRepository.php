<?php

namespace App\Repositories;
use App\Models\User;

class UserRepository extends ResourceRepository {

    public function __construct(User $user)
    {
        $this->model = $user;
    }

    public function getUserWithPerson(int $userId)
    {
        return $this->model->where('id', $userId)->with('person')->first();
    }

    public function getLastIndex()
    {
        return $this->getAll()->last()->id;
    }
}
