<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->increments('id');
            $table->string('reg_no');
            $table->string('patient_name');
            $table->string('patient_address');
            $table->integer('age');
            $table->string('gender');
            $table->integer('year');
            $table->string('month');
            $table->integer('day');
            $table->integer('marital_status');
            $table->bigInteger('phone');
            $table->string('email')->nullable();
            $table->string('identity_number');
            $table->string('nationality');
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            // $table->string('reff_by');
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
        Schema::dropIfExists('patients');
    }
}
