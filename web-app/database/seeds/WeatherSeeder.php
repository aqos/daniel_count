<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WeatherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('weathers')->delete();
        $data = [
            [
                'name' => 'Sec',
            ],
            [
                'name' => 'Pluie',
            ],
        ];
        foreach ($data as $occurrence) {
            DB::table('weathers')->insert($occurrence);
        }
    }
}
