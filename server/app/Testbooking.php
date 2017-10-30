<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Testbooking extends Model
{
  protected $dates = ['deleted_at'];
  protected $fillable = [
    'patient_id','doctor_list_id', 
  ];
  public function patient(){
    return $this->belongsTo('Patient::class');
  }
}
