<?php

use App\Providers\UtilsProvider;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roads')->delete();
        if ($data = (new UtilsProvider)->getCsvAsAssociativeArray('/home/sharpdev/dev-projects/mobile-projects/third-party-projects/count-civil-engineering-5/web-app/public/stuffs/roads.csv')) {
            foreach ($data as $occurrence) {
                DB::table('roads')->insert($occurrence);
            }
        }
    }
}
