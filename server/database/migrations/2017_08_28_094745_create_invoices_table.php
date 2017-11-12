<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('testbooking_id')->unsigned()->nullable();
            $table->integer('patient_id')->unsigned()->nullable();
            $table->string('particular');
            $table->string('cash');
            $table->string('balance');
            $table->string('discount_amount');
            $table->string('discount_percentage');
            $table->string('sub_total')->default(0);
            $table->string('total_balance')->default(0);
            $table->string('print')->default(0);
            $table->string('received_cash')->default(0);
            $table->string('returned_cash')->default(0);
            $table->string('narration')->nullable();
            $table->string('remark')->nullable();
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
        Schema::dropIfExists('invoices');
    }
}
