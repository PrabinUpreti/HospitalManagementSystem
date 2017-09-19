<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TestType extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
    
    protected $fillable = [
        'department_id','name', 'description'
    ];
    public function Test()
    {
        return $this->hasMany(Test::class)->orderBy("created_at" , "desc");
    }
}
