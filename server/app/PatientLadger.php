<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PatientLadger extends Model
{
    //
    protected $dates = ['deleted_at'];
  protected $fillable = [
    'patient_id','particular', 'invoice_id','dr', 'cr','balance','backed_money', 'remark'
  ];
}
