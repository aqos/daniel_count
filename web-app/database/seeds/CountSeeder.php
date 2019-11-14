<?php

use App\Models\Count;
use App\Providers\UtilsProvider;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('counts')->delete();
        $util = new UtilsProvider();
        $data = $util->createCountForAllTimeSlots('2019-11-13 10:02:01');
        $data = array_merge($data, $util->createCountForAllTimeSlots('2019-11-14 10:02:01'));
        foreach ($data as $occurrence) {
            Count::create($occurrence);
        }
    }
}
