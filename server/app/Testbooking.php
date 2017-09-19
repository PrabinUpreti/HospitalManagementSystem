<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Testbooking extends Model
{
  protected $fillable = [
      'patientid', 'patient_name', 'patient_address', 'age', 'gender', 'year', 'month', 'day', 'marital_status', 'phone', 'email', 'identity_card', 'reff_by', 
  ];
  public function patient(){
    return $this->belongsTo('Patient::class');
  }
}
