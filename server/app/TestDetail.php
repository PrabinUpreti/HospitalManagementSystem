<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TestDetail extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];
    
    protected $fillable = [
        'test_id','age_group','gender', 'lower_bound','upper_bound','unit','rate'
    ];
}
