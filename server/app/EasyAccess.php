<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EasyAccess extends Model
{
    //
    protected $fillable = [
        'testbooking_id','patient_id','test_id','age_group', 'gender', 'lbound','ubound','rate','unit',
    ];
}
