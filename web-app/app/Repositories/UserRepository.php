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
        $last = $this->getAll()->last();
        return is_null($last) ? 0 : $last->id;
    }

    public function getWhere($column, $value)
    {
        return $this->model->where($column, '=', $value)->first();
    }
}
