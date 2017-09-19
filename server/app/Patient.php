<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    public function testbooking(){
        return $this->hasOne('Testbooking::class');
    }
}
