<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEasyAccessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('easy_accesses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('testbooking_id')->unsigned();
            $table->integer('patient_id')->unsigned();
            $table->integer('test_id')->unsigned();
            $table->string('age_group');
            $table->string('gender');
            $table->string('lbound');
            $table->string('ubound');
            $table->string('rate');
            $table->string('unit');
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('easy_accesses');
    }
}
