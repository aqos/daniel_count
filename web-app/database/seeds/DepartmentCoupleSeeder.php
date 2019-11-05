<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentCoupleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('department_couples')->delete();
        $data = [
            [
                'name' => 'Borgou - Alibori',
            ],
            [
                'name' => 'Atacora - Donga',
            ],
            [
                'name' => 'Atlantique - Littoral',
            ],
            [
                'name' => 'Ouémé - Plateau',
            ],
            [
                'name' => 'Mono - Couffo',
            ],
            [
                'name' => 'Zou - Collines',
            ],
        ];
        foreach ($data as $occurrence) {
            DB::table('department_couples')->insert($occurrence);
        }
    }
}
