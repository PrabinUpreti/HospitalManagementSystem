<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RelationConstraint extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('test_types', function($table) {
            $table->foreign('department_id')->references('id')->on('departments');
        });

        Schema::table('tests', function($table) {
            $table->foreign('test_type_id')->references('id')->on('test_types');
        });

        Schema::table('access_menus', function($table) {
            $table->foreign('menu_id')->references('id')->on('menus');
            $table->foreign('user_id')->references('id')->on('users');
        });
        Schema::table('test_details', function($table) {
            $table->foreign('test_id')->references('id')->on('tests');
        });

        Schema::table('testbookings', function($table) {
            $table->foreign('patient_id')->references('id')->on('patients');
            $table->foreign('doctor_list_id')->references('id')->on('doctor_lists');

        });

        Schema::table('invoices', function($table) {
            $table->foreign('testbooking_id')->references('id')->on('testbookings');
        });

        Schema::table('patient_ladgers', function($table) {
            $table->foreign('patient_id')->references('id')->on('patients');
            $table->foreign('invoice_id')->references('id')->on('invoices');
        });

        Schema::table('reports', function($table) {
            $table->foreign('test_id')->references('id')->on('tests');
            $table->foreign('testbooking_id')->references('id')->on('testbookings');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('test_types', function($table) {
            $table->dropForeign(['department_id']);
        });
        Schema::table('tests', function($table) {
            $table->dropForeign(['test_type_id']);
        });

        Schema::table('access_menus', function($table) {
            $table->dropForeign(['menu_id']);
            $table->dropForeign(['uesr_id']);
        });

        Schema::table('test_details', function($table) {
            $table->dropForeign(['test_id']);
        });
        Schema::table('testbookings', function($table) {
            $table->dropForeign(['patient_id']);
            $table->dropForeign(['doctor_list_id']);
        });

        Schema::table('invoices', function($table) {
            $table->dropForeign(['testbooking_id']);
        });

        Schema::table('patient_ladgers', function($table) {
            $table->dropForeign(['patient_id']);
            $table->dropForeign(['invoice_id']);
        });
        
        Schema::table('reports', function($table) {
            $table->dropForeign(['test_id']);
            $table->dropForeign(['testbooking_id']);
        });
    }
}
