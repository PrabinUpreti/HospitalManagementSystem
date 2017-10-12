<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    //
  protected $fillable = [
    'testbooking_id','particular', 'cash','balance', 'discount_amount','discount_percentage', 'remark'
  ];
}
