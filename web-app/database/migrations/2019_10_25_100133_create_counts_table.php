<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('counts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('road_id');
            $table->unsignedBigInteger('weather_id');
            $table->unsignedBigInteger('car_category_id');
            $table->unsignedBigInteger('time_slot_id');
            $table->json('counts');
            $table->timestamps();

            $table->foreign('user_id')->on('users')->references('id')
                ->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('road_id')->on('roads')->references('id')
                ->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('weather_id')->on('weathers')->references('id')
                ->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('car_category_id')->on('car_categories')->references('id')
                ->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('time_slot_id')->on('time_slots')->references('id')
                ->onDelete('restrict')->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('counts', function (Blueprint $table) {
            $table->dropForeign(['user_id', 'road_id', 'weather_id', 'car_category_id', 'time_slot_id']);
        });        

        Schema::dropIfExists('counts');
    }
}
