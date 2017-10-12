<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PatientLadger extends Model
{
    //
  protected $fillable = [
    'patient_id','particular', 'invoice_id','dr', 'cr','balance', 'remark'
  ];
}
