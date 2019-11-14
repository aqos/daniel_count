<?php

use App\Models\Person;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();
        DB::table('people')->delete();
        $user = User::create([
            'name' => 'houaitod',
            'email' => 'houaitod@gmail.com',
            'password' => Hash::make('password'),
            'email_verified_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        Person::create([
            'first_name' => 'Daniel', 
            'last_name' => 'Affo', 
            'birth_date' => '1996-06-14', 
            'birth_place' => 'Porto-Novo', 
            'phone' => '+229 96 42 39 55', 
            'piece_number' => 'B0504867', 
            'user_id' => $user->id
        ]);
    }
}
