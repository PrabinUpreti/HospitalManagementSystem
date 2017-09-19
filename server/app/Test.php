<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Test extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
    
    protected $fillable = [
        'test_type_id','name', 'description'
    ];
    public function TestDetail()
    {
        return $this->hasMany(TestDetail::class) ->orderBy("created_at" , "desc");
    }
}
