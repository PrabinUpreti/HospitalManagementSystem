<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    //
    protected $dates = ['deleted_at'];
  protected $fillable = [
    'testbooking_id','particular', 'cash','balance', 'discount_amount','discount_percentage', 'remark','backed_money'
  ];
  // public function testbookingname(){
  //   return $this->belongsTo(Testbooking::class);
  // }
}
