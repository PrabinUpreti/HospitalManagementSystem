<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Access_menu extends Model
{
    protected $fillable = [
        'id', 'menu_id','user_id'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
