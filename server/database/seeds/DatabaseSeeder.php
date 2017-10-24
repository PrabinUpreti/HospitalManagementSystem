<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CommonCodes::class);
        $this->call(Menu::class);
        // $this->call(SelectAge::class);
        $this->call(User::class);
    }
}
