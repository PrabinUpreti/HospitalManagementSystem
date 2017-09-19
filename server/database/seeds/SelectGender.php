<?php

use Illuminate\Database\Seeder;

class SelectGender extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('select_genders')->insert([
            'name' => "Male",
        ]);
        DB::table('select_genders')->insert([
            'name' => "Female",
        ]);
        DB::table('select_genders')->insert([
            'name' => "Others",
        ]);
    }
}
