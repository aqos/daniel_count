<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(CarCategorySeeder::class);
        $this->call(WeatherSeeder::class);
        $this->call(TimeSlotSeeder::class);
        $this->call(DepartmentCoupleSeeder::class);
        $this->call(RoadTypeSeeder::class);
        $this->call(RoadSeeder::class);
        $this->call(CountSeeder::class);
    }
}
