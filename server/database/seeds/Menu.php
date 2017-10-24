<?php

use Illuminate\Database\Seeder;

class Menu extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('menus')->insert([
            'name'=>'Dashboard',
            'link'=>'/lab/dashboard'
        ]);
        DB::table('menus')->insert([
            'name'=>'test booking',
            'link'=>'/lab/test-booking'
        ]);
        DB::table('menus')->insert([
            'name'=>'reports ',
            'link'=>'/lab/reports'
        ]);
        DB::table('menus')->insert([
            'name'=>'add transaction',
            'link'=>'/lab/add-transaction'
        ]);
        DB::table('menus')->insert([
            'name'=>'view transaction',
            'link'=>'/lab/view-transaction'
        ]);
        DB::table('menus')->insert([
            'name'=>'User',
            'link'=>'/lab/user'
        ]);
        DB::table('menus')->insert([
            'name'=>'Setting',
            'link'=>'/lab/modify'
        ]);
        DB::table('menus')->insert([
            'name'=>'Doctor Report',
            'link'=>'/lab/doctor-report'
        ]);
    }
}
