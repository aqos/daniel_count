<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roads', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('section_code');
            $table->string('origin');
            $table->string('destination');
            $table->double('range');
            $table->unsignedBigInteger('road_type_id');
            $table->unsignedBigInteger('department_couple_id');
            $table->timestamps();

            $table->foreign('road_type_id')->on('road_types')->references('id')
                ->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('department_couple_id')->on('department_couples')->references('id')
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
        Schema::table('roads', function (Blueprint $table) {
            $table->dropForeign(['road_type_id', 'department_couple_id']);
        });        
        Schema::dropIfExists('roads');
    }
}
