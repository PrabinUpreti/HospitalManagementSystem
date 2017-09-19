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
        // $this->call(RefferedBy::class);
        // $this->call(SelectAge::class);
        // $this->call(SelectGender::class);        
    }
}
