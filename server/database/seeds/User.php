<?php

use Illuminate\Database\Seeder;

class User extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name'=>'SoftWeb Developers',
            'email'=>'softwebdevelopers@gmail.com',
            'password' => bcrypt('softwebdevelopers1234'),
            'status'=>'active',
            'hide'=>'is_admin'
        ]);

        DB::table('access_menus')->insert([
            'user_id'=> 1 ,
            'menu_id'=> 1
        ]);

        DB::table('access_menus')->insert([
            'user_id'=> 1 ,
            'menu_id'=> 2
        ]);
        DB::table('access_menus')->insert([
            'user_id'=> 1 ,
            'menu_id'=> 3
        ]);
        DB::table('access_menus')->insert([
            'user_id'=> 1 ,
            'menu_id'=> 4
        ]);
        DB::table('access_menus')->insert([
            'user_id'=> 1 ,
            'menu_id'=> 5
        ]);
        DB::table('access_menus')->insert([
            'user_id'=> 1 ,
            'menu_id'=> 6
        ]);
        DB::table('access_menus')->insert([
            'user_id'=> 1 ,
            'menu_id'=> 7
        ]);
        DB::table('access_menus')->insert([
            'user_id'=> 1 ,
            'menu_id'=> 8
        ]);

    }
}
