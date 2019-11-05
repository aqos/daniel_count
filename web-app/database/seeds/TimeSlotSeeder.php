<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TimeSlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('time_slots')->delete();
        $data = [
            [
                'time_slot' => '00h - 06h',
                'start' => 24,
            ],
            [
                'time_slot' => '06h - 12h',
                'start' => 6,
            ],
            [
                'time_slot' => '12h - 18h',
                'start' => 12,
            ],
            [
                'time_slot' => '18h - 00h',
                'start' => 18,
            ],
        ];
        foreach ($data as $occurrence) {
            DB::table('time_slots')->insert($occurrence);
        }
    }
}
