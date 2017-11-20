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
            'fa'=>'fa-tachometer',
            'name'=>'Dashboard',
            'link'=>'/lab/dashboard'
        ]);
        DB::table('menus')->insert([
            'fa'=>'fa-bed',
            'name'=>'test booking',
            'link'=>'/lab/test-booking'
        ]);
        DB::table('menus')->insert([
            'fa'=>'fa-calendar-plus-o',
            'name'=>'reports ',
            'link'=>'/lab/reports'
        ]);
        DB::table('menus')->insert([
            'fa'=>'fa-plus-square',
            'name'=>'add transaction',
            'link'=>'/lab/add-transaction'
        ]);
        DB::table('menus')->insert([
            'fa'=>'fa-eye',
            'name'=>'view transaction',
            'link'=>'/lab/view-transaction'
        ]);
        DB::table('menus')->insert([
            'fa'=>'fa-stethoscope',
            'name'=>'Doctor Commission',
            'link'=>'/lab/doctor-report'
        ]);
        DB::table('menus')->insert([
            'fa'=>'fa-user',
            'name'=>'User',
            'link'=>'/lab/user'
        ]);
        DB::table('menus')->insert([
            'fa'=>'fa-cogs',
            'name'=>'Setting',
            'link'=>'/lab/modify'
        ]);
    }
}
