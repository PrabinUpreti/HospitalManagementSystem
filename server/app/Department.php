<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
    
    protected $fillable = [
        'name', 'description'
    ];
    public function TestType()
    {
        return $this->hasMany(TestType::class)->orderBy("created_at" , "desc");
    }
}
