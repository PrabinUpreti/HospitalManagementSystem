<?php

use Illuminate\Database\Seeder;

class InitHospital extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::table('init_hospitals')->insert([
            'name' => "Hospital Name",
            'address' => "Hospital Address",
            'reg_no' => "Registration No",
            'pan_no' => "pan No",
            'phone1' => "Phone No One",
            'phone2' => "Phone No Two",
            'phone3' => "Phone No Three",
            'phone4' => "Phone No Four",
            'request_URL' => "http://server.hms.com/",
            'established' => "Established",
            'email' => "email",
            'website' => "website",
            'country' => "country",
            'software_identity' => "YwvPmvAvSxjlhF3fRlq9GjiQnPZAJWEyeNPiP8t1",
            'created_by' => "Prabin Raj Upreti",
            'updated_by' => "Prabin Raj Upreti",
            ]);
    }
}
