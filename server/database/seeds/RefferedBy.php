<?php

use Illuminate\Database\Seeder;

class RefferedBy extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('reffered_bies')->insert([
            'name' => "Dr.Prabin Raj Upreti",
        ]);
        DB::table('reffered_bies')->insert([
            'name' => "Dr.Pravash Raj Upreti",
        ]);
        DB::table('reffered_bies')->insert([
            'name' => "Dr.Shulav Paudel",
        ]);
        DB::table('reffered_bies')->insert([
            'name' => "Dr.Prayas Sapkota",
        ]);
        DB::table('reffered_bies')->insert([
            'name' => "Dr.Bibek Lama",
        ]);
        DB::table('reffered_bies')->insert([
            'name' => "Dr.Bipin Dhimal",
        ]);
    }
}
