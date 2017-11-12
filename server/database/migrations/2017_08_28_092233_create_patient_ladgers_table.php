<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePatientLadgersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_ladgers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('patient_id')->unsigned();
            $table->integer('invoice_id')->unsigned();
            $table->string('particular');
            $table->string('dr');
            $table->string('cr');
            $table->string('discount_amt')->default(0);
            $table->string('discount_per')->default(0);
            $table->string('balance');
            $table->string('received_cash')->default(0);
            $table->string('returned_cash')->default(0);
            $table->string('remark')->nullable();
            $table->string('print')->default(0);
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
        Schema::dropIfExists('patient_ladgers');
    }
}
