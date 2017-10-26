<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DoctorList extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
    
    protected $fillable = [
        'name', 'address','phone','registration_no','email','department','gender','day','month','year','prefix','commission'
    ];
    // public function TestType()
    // {
    //     return $this->hasMany(TestType::class)->orderBy("created_at" , "desc");
    // }
}
