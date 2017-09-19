<?php

use Illuminate\Database\Seeder;

class SelectAge extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('select_ages')->insert([
            'name' => "Below 5",
        ]);
        DB::table('select_ages')->insert([
            'name' => "6-12",
        ]);
        DB::table('select_ages')->insert([
            'name' => "13-19",
        ]);
        DB::table('select_ages')->insert([
            'name' => "20-49",
        ]);
        DB::table('select_ages')->insert([
            'name' => "50-70",
        ]);
        DB::table('select_ages')->insert([
            'name' => "70 Above",
        ]);
    }
}
