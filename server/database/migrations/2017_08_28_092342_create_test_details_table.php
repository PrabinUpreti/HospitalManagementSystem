<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTestDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('test_details', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('test_id')->unsigned();
            $table->string('age_group');
            $table->string('gender');
            $table->string('lower_bound');
            $table->string('upper_bound');
            $table->string('rate');
            $table->string('unit');
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('test_details');
    }
}
