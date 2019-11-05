<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoadTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('road_types')->delete();
        $data = [
            [
                'name' => 'Revêtue',
            ],
            [
                'name' => 'Non revêtue',
            ],
        ];
        foreach ($data as $occurrence) {
            DB::table('road_types')->insert($occurrence);
        }
    }
}
