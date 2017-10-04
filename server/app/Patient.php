<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'reg_no', 'patient_name', 'patient_address', 'age', 'gender', 'year', 'month', 'day', 'marital_status', 'phone', 'email', 'nationality', 'patient_id', 'identity_number', 'doctor_list_id', 'testbooking_id', 'test_id', 
    ];
    public function testbooking(){
        return $this->hasOne('Testbooking::class');
    }
}
