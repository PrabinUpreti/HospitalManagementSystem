<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PatientLadger extends Model
{
    //
    protected $dates = ['deleted_at'];
  protected $fillable = [
    'patient_id','particular', 'invoice_id','dr', 'cr','balance','backed_money', 'remark','print','discount_amt','discount_per','returned_cash','received_cash'
  ];
}
