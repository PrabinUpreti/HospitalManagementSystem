<?php

use Illuminate\Database\Seeder;

class CommonCodes extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('common_codes')->insert([
            'common_code' => "gen",
            'common_description' => "Male",
        ]);

        DB::table('common_codes')->insert([
            'common_code' => "gen",
            'common_description' => "Female",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "gen",
            'common_description' => "Others",
        ]);

        DB::table('common_codes')->insert([
            'common_code' => "mrt",
            'common_description' => "Married",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "mrt",
            'common_description' => "Unmarried",
        ]);

        DB::table('common_codes')->insert([
            'common_code' => "mrt",
            'common_description' => "Devorce",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "agp",
            'common_description' => "below 5",
        ]);

        DB::table('common_codes')->insert([
            'common_code' => "agp",
            'common_description' => "6 to 12",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "agp",
            'common_description' => "13 to 19",
        ]);

        DB::table('common_codes')->insert([
            'common_code' => "agp",
            'common_description' => "20 to 39",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "agp",
            'common_description' => "40 to 59",
        ]);

        DB::table('common_codes')->insert([
            'common_code' => "agp",
            'common_description' => "60 above",
        ]);





        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "mg%",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "mg/dl",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "U/L",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "gm%",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "mEq/L",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "IU/L",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "mmol/L",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "mg/L",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "ug/dl",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "S.units",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "cell/cumm",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "mm/1st",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "%",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "/Cu.mm",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "Millions",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "Lakhs/cumm",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "Minutes",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "Sec",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "fl",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "pg",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "ugm/dl",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "gms/dl",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "IU/mL",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "SU",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "unit",
            'common_description' => "NV",
        ]);


        
        DB::table('common_codes')->insert([
            'common_code' => "pfx",
            'common_description' => "Dr",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "pfx",
            'common_description' => "Nurse",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "pfx",
            'common_description' => "Mr",
        ]);
        DB::table('common_codes')->insert([
            'common_code' => "pfx",
            'common_description' => "Miss",
        ]);        
        DB::table('common_codes')->insert([
            'common_code' => "pfx",
            'common_description' => "Proff",
        ]);
    }
}