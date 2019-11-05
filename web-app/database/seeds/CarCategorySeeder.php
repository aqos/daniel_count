<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('car_categories')->delete();
        $baseUrl = config('app.url');
        $data = [
            [
                'name' => 'Camions à 2 essieux',
                'avatar' => $baseUrl. ':8000/imgs/icones/3.png',
            ],
            [
                'name' => 'Camions à 3 essieux',
                'avatar' => $baseUrl . ':8000/imgs/icones/7.png',
            ],
            [
                'name' => 'Camions à 4 essieux',
                'avatar' => $baseUrl . ':8000/imgs/icones/8.png',
            ],
            [
                'name' => 'Camions à 5 essieux',
                'avatar' => $baseUrl . ':8000/imgs/icones/9.png',
            ],
            [
                'name' => 'Camions à 6 essieux',
                'avatar' => $baseUrl . ':8000/imgs/icones/10.png',
            ],
            [
                'name' => 'Camions à 7 essieux',
                'avatar' => $baseUrl . ':8000/imgs/icones/11.png',
            ],
            [
                'name' => 'Camions à 8 essieux',
                'avatar' => $baseUrl . ':8000/imgs/icones/12.png',
            ],
            [
                'name' => 'Camions à 9 essieux',
                'avatar' => $baseUrl . ':8000/imgs/icones/13.png',
            ],
            [
                'name' => 'Moto',
                'avatar' => $baseUrl . ':8000/imgs/icones/1.png',
            ],
            [
                'name' => 'Minibus',
                'avatar' => $baseUrl . ':8000/imgs/icones/6.png',
            ],
            [
                'name' => 'Camionnette',
                'avatar' => $baseUrl . ':8000/imgs/icones/5.png',
            ],
            [
                'name' => 'Autocar',
                'avatar' => $baseUrl . ':8000/imgs/icones/4.png',
            ],
            [
                'name' => 'Voiture particulière',
                'avatar' => $baseUrl . ':8000/imgs/icones/2.png',
            ]
        ];
        foreach ($data as $occurrence) {
            DB::table('car_categories')->insert($occurrence);
        }
    }
}
