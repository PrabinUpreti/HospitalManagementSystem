<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    //
    protected $dates = ['deleted_at'];
  protected $fillable = [
    'testbooking_id','patient_id','particular', 'cash','balance', 'discount_amount','discount_percentage', 'remark','backed_money','sub_total','total_balance','print','received_cash','returned_cash','narration'
  ];
  // public function testbookingname(){
  //   return $this->belongsTo(Testbooking::class);
  // }
}
